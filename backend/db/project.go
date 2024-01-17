package db

import (
	"backend/domain"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type projectRepo struct {
	db *DB
}
type ProjectLinkKind int

const (
	projectLinkKindApp ProjectLinkKind = iota
	projectLinkKindQiita
	projectLinkKindGithub
)

type ProjectLink struct {
	gorm.Model
	ProjectID string
	Project   domain.Project  `gorm:"constraint:OnDelete:CASCADE;"`
	Url       string          `gorm:"type:varchar(255); not null"`
	Kind      ProjectLinkKind `gorm:"not null"`
}

func NewProjectRepo(db *DB) domain.IProjectRepo {
	return &projectRepo{db: db}
}

func (r *projectRepo) GetLinksByProjectIds(projectIds []string) (map[string][]*ProjectLink, error) {
	var links []*ProjectLink
	result := r.db.Client.Where("project_id in ?", projectIds).Find(&links)
	if result.Error != nil {
		return nil, result.Error
	}
	var linksByProjectId = make(map[string][]*ProjectLink, len(projectIds))
	for _, link := range links {
		linksByProjectId[link.ProjectID] = append(linksByProjectId[link.ProjectID], link)
	}
	return linksByProjectId, nil
}

// ListTags implements domain.IProjectRepo.
func (r *projectRepo) ListTags(projectIds []string) ([]*domain.Technology, error) {
	var projectTechnologyTags []*domain.ProjectTechnologyTag
	result := r.db.Client.Where("project_id in ?", projectIds).Find(&projectTechnologyTags)
	if result.Error != nil {
		return nil, result.Error
	}
	if len(projectTechnologyTags) == 0 {
		return []*domain.Technology{}, nil
	}
	technologyIds := make([]string, len(projectTechnologyTags))
	for i, tag := range projectTechnologyTags {
		technologyIds[i] = tag.TechnologyID
	}
	var technologies []*domain.Technology
	result = r.db.Client.Find(&technologies, technologyIds)
	if result.Error != nil {
		return nil, result.Error
	}
	return technologies, nil
}

// UpdateTags implements domain.IProjectRepo.
func (r *projectRepo) UpdateTags(projectId string, technologyIds []uint) ([]*domain.Technology, error) {
	var project domain.Project
	result := r.db.Client.Where("id = ?", projectId).First(&project)
	if result.Error != nil {
		return nil, result.Error
	}
	if len(technologyIds) == 0 {
		if err := r.db.Client.Model(&project).Association("Tags").Clear(); err != nil {
			return nil, err
		}
		return []*domain.Technology{}, nil
	}
	var technologies []*domain.Technology
	result = r.db.Client.Find(&technologies, technologyIds)
	if result.Error != nil {
		return nil, result.Error
	}
	if err := r.db.Client.Model(&project).Association("Tags").Replace(&technologies); err != nil {
		return nil, err
	}
	return technologies, nil
}

func (r *projectRepo) Create(input domain.ProjectInput) (*domain.Project, error) {
	project := domain.Project{
		ID:          input.ID,
		Title:       input.Title,
		Description: input.Description,
		IsFavorite:  input.IsFavorite,
	}
	result := r.db.Client.Clauses(clause.Returning{}).Create(&project)
	if result.Error != nil {
		return nil, result.Error
	}
	if err := r.updateLinks(input, project.ID); err != nil {
		return nil, err
	}
	if err := r.setLinks([]*domain.Project{&project}); err != nil {
		return nil, err
	}
	return &project, nil
}

func (r *projectRepo) Delete(id string) (*domain.Project, error) {
	var projectLinks []*ProjectLink
	result := r.db.Client.Where("project_id = ?", id).Delete(&projectLinks)
	if result.Error != nil {
		return nil, result.Error
	}
	var project domain.Project
	result = r.db.Client.Clauses(clause.Returning{}).Where("id = ?", id).Delete(&project)
	if result.Error != nil {
		return nil, result.Error
	}
	if err := r.setLinks([]*domain.Project{&project}); err != nil {
		return nil, err
	}
	return &project, nil
}

func (r *projectRepo) Find(id string) (*domain.Project, error) {
	var project domain.Project
	result := r.db.Client.First(&project, "id = ?", id)
	if result.Error != nil {
		return nil, result.Error
	}
	if err := r.setLinks([]*domain.Project{&project}); err != nil {
		return nil, err
	}
	return &project, nil
}

func (r *projectRepo) List() ([]*domain.Project, error) {
	var projects []*domain.Project
	result := r.db.Client.Find(&projects)
	if result.Error != nil {
		return nil, result.Error
	}
	if err := r.setLinks(projects); err != nil {
		return nil, err
	}
	return projects, nil
}

func (r *projectRepo) Update(input domain.ProjectInput) (*domain.Project, error) {
	var project domain.Project
	r.db.Client.First(&project, "id = ?", input.ID)
	project.Title = input.Title
	project.Description = input.Description
	project.IsFavorite = input.IsFavorite
	result := r.db.Client.Clauses(clause.Returning{}).Save(&project)
	if result.Error != nil {
		return nil, result.Error
	}
	if err := r.updateLinks(input, project.ID); err != nil {
		return nil, err
	}
	if err := r.setLinks([]*domain.Project{&project}); err != nil {
		return nil, err
	}
	return &project, nil
}

func (r *projectRepo) updateLinks(input domain.ProjectInput, projectId string) error {
	if err := r.updateLink(input.AppLink, projectId, projectLinkKindApp); err != nil {
		return err
	}
	if err := r.updateLink(input.QiitaLink, projectId, projectLinkKindQiita); err != nil {
		return err
	}
	if err := r.updateLink(input.GithubLink, projectId, projectLinkKindGithub); err != nil {
		return err
	}
	return nil
}

func (r *projectRepo) updateLink(link *string, projectId string, kind ProjectLinkKind) error {
	var projectLink = &ProjectLink{}
	result := r.db.Client.Where("project_id = ? and kind = ?", projectId, kind).Limit(1).Find(projectLink)
	if result.Error != nil {
		return result.Error
	}
	if isLinkEmpty(link) && projectLink != nil {
		result = r.db.Client.Where("id = ?", projectLink.ID).Delete(&projectLink)
		if result.Error != nil {
			return result.Error
		}
		return nil
	} else if !isLinkEmpty(link) {
		projectLink.Url = *link
		projectLink.Kind = kind
		projectLink.ProjectID = projectId
		result = r.db.Client.Save(projectLink)
		if result.Error != nil {
			return result.Error
		}
	}
	return nil
}

func (r *projectRepo) setLinks(projects []*domain.Project) error {
	projectIds := make([]string, len(projects))
	for i, project := range projects {
		projectIds[i] = project.ID
	}
	links, err := r.GetLinksByProjectIds(projectIds)
	if err != nil {
		return err
	}
	for _, project := range projects {
		for _, link := range links[project.ID] {
			switch link.Kind {
			case projectLinkKindApp:
				project.AppLink = &link.Url
			case projectLinkKindQiita:
				project.QiitaLink = &link.Url
			case projectLinkKindGithub:
				project.GithubLink = &link.Url
			}
		}
	}
	return nil
}

func isLinkEmpty(link *string) bool {
	return link == nil || *link == ""
}
