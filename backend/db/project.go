package db

import (
	"backend/domain"
	"context"
	"time"

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
	ID        uint `gorm:"primarykey"`
	ProjectID string
	Project   domain.Project  `gorm:"constraint:OnDelete:CASCADE;"`
	Url       string          `gorm:"type:varchar(255); not null"`
	Kind      ProjectLinkKind `gorm:"not null"`
	CreatedAt time.Time       `gorm:"type:timestamp; not null;"`
	UpdatedAt time.Time       `gorm:"type:timestamp; not null;"`
}

type ProjectTechnologyTag struct {
	ProjectID    string            `gorm:"primary_key"`
	Project      domain.Project    `gorm:"constraint:OnDelete:CASCADE;"`
	TechnologyID uint              `gorm:"primary_key"`
	Technology   domain.Technology `gorm:"constraint:OnDelete:CASCADE;"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

func NewProjectRepo(db *DB) domain.IProjectRepo {
	return &projectRepo{db: db}
}

func (r *projectRepo) GetLinksByProjectIds(ctx context.Context, projectIds []string) (map[string][]*ProjectLink, error) {
	var links []*ProjectLink
	result := r.db.Client.WithContext(ctx).Where("project_id in ?", projectIds).Find(&links)
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
func (r *projectRepo) ListTags(ctx context.Context, projectIds []string) ([]*domain.ProjectTag, error) {
	var projectTechnologyTags []*ProjectTechnologyTag
	result := r.db.Client.WithContext(ctx).Where("project_id in ?", projectIds).Find(&projectTechnologyTags)
	if result.Error != nil {
		return nil, result.Error
	}
	technologyIds := make([]uint, len(projectTechnologyTags))
	for i, tag := range projectTechnologyTags {
		technologyIds[i] = tag.TechnologyID
	}
	var technologies []*domain.Technology
	result = r.db.Client.WithContext(ctx).Where("id in ?", technologyIds).Find(&technologies)
	if result.Error != nil {
		return nil, result.Error
	}
	technologiesById := make(map[uint]*domain.Technology, len(technologies))
	for _, tech := range technologies {
		technologiesById[tech.ID] = tech
	}
	projectTags := make([]*domain.ProjectTag, len(projectTechnologyTags))
	for i, projectTechTag := range projectTechnologyTags {
		projectTags[i] = &domain.ProjectTag{
			ProjectID:  projectTechTag.ProjectID,
			Technology: technologiesById[projectTechTag.TechnologyID],
		}
	}
	return projectTags, nil
}

// UpdateTags implements domain.IProjectRepo.
func (r *projectRepo) UpdateTags(ctx context.Context, projectId string, technologyIds []uint) ([]*domain.ProjectTag, error) {
	existing := make([]*ProjectTechnologyTag, 0)
	result := r.db.Client.WithContext(ctx).Where("project_id = ?", projectId).Find(&existing)
	if result.Error != nil {
		return nil, result.Error
	}
	actual := make([]uint, len(existing))
	for i, tag := range existing {
		actual[i] = tag.TechnologyID
	}
	toCreate, toDelete := diff(actual, technologyIds)

	// Delete
	result = r.db.Client.WithContext(ctx).Where("project_id = ? and technology_id in ?", projectId, toDelete).Delete(&ProjectTechnologyTag{})
	if result.Error != nil {
		return nil, result.Error
	}
	// Create
	for _, id := range toCreate {
		new := ProjectTechnologyTag{
			ProjectID:    projectId,
			TechnologyID: id,
		}
		result = r.db.Client.WithContext(ctx).Create(&new)
		if result.Error != nil {
			return nil, result.Error
		}
	}
	return []*domain.ProjectTag{}, nil
}

func (r *projectRepo) Create(ctx context.Context, input domain.ProjectInput) (*domain.Project, error) {
	project := domain.Project{
		ID:          input.ID,
		Title:       input.Title,
		Description: input.Description,
		IsFavorite:  input.IsFavorite,
		Position:    0,
	}
	if input.Position != nil {
		project.Position = *input.Position
	}
	result := r.db.Client.WithContext(ctx).Clauses(clause.Returning{}).Create(&project)
	if result.Error != nil {
		return nil, result.Error
	}
	if err := r.updateLinks(ctx, input, project.ID); err != nil {
		return nil, err
	}
	if err := r.setLinks(ctx, []*domain.Project{&project}); err != nil {
		return nil, err
	}
	return &project, nil
}

func (r *projectRepo) Delete(ctx context.Context, id string) (*domain.Project, error) {
	var projectLinks []*ProjectLink
	result := r.db.Client.WithContext(ctx).Where("project_id = ?", id).Delete(&projectLinks)
	if result.Error != nil {
		return nil, result.Error
	}
	var project domain.Project
	result = r.db.Client.WithContext(ctx).Clauses(clause.Returning{}).Where("id = ?", id).Delete(&project)
	if result.Error != nil {
		return nil, result.Error
	}
	if err := r.setLinks(ctx, []*domain.Project{&project}); err != nil {
		return nil, err
	}
	return &project, nil
}

func (r *projectRepo) Find(ctx context.Context, id string) (*domain.Project, error) {
	var project domain.Project
	result := r.db.Client.WithContext(ctx).First(&project, "id = ?", id)
	if result.Error != nil {
		return nil, result.Error
	}
	if err := r.setLinks(ctx, []*domain.Project{&project}); err != nil {
		return nil, err
	}
	return &project, nil
}

func (r *projectRepo) List(ctx context.Context) ([]*domain.Project, error) {
	var projects []*domain.Project
	result := r.db.Client.WithContext(ctx).Order("is_favorite desc").Order("position asc").Find(&projects)
	if result.Error != nil {
		return nil, result.Error
	}
	if err := r.setLinks(ctx, projects); err != nil {
		return nil, err
	}
	return projects, nil
}

func (r *projectRepo) ListByIds(ctx context.Context, ids []string) (map[string]*domain.Project, error) {
	var projects []*domain.Project
	projectsMap := make(map[string]*domain.Project, len(ids))
	if len(ids) == 0 {
		return projectsMap, nil
	}
	result := r.db.Client.WithContext(ctx).Where("id in ?", ids).Find(&projects)
	if result.Error != nil {
		return nil, result.Error
	}
	if err := r.setLinks(ctx, projects); err != nil {
		return nil, err
	}
	for _, project := range projects {
		projectsMap[project.ID] = project
	}
	return projectsMap, nil
}

func (r *projectRepo) Update(ctx context.Context, input domain.ProjectInput) (*domain.Project, error) {
	var project domain.Project
	r.db.Client.WithContext(ctx).First(&project, "id = ?", input.ID)
	project.Title = input.Title
	project.Description = input.Description
	project.IsFavorite = input.IsFavorite
	if input.Position != nil {
		project.Position = *input.Position
	}
	result := r.db.Client.WithContext(ctx).Clauses(clause.Returning{}).Save(&project)
	if result.Error != nil {
		return nil, result.Error
	}
	if err := r.updateLinks(ctx, input, project.ID); err != nil {
		return nil, err
	}
	if err := r.setLinks(ctx, []*domain.Project{&project}); err != nil {
		return nil, err
	}
	return &project, nil
}

func (r *projectRepo) updateLinks(ctx context.Context, input domain.ProjectInput, projectId string) error {
	if err := r.updateLink(ctx, input.AppLink, projectId, projectLinkKindApp); err != nil {
		return err
	}
	if err := r.updateLink(ctx, input.QiitaLink, projectId, projectLinkKindQiita); err != nil {
		return err
	}
	if err := r.updateLink(ctx, input.GithubLink, projectId, projectLinkKindGithub); err != nil {
		return err
	}
	return nil
}

func (r *projectRepo) updateLink(ctx context.Context, link *string, projectId string, kind ProjectLinkKind) error {
	var projectLink = &ProjectLink{}
	result := r.db.Client.WithContext(ctx).Where("project_id = ? and kind = ?", projectId, kind).Limit(1).Find(projectLink)
	if result.Error != nil {
		return result.Error
	}
	if isLinkEmpty(link) && projectLink != nil {
		result = r.db.Client.WithContext(ctx).Where("id = ?", projectLink.ID).Delete(&projectLink)
		if result.Error != nil {
			return result.Error
		}
		return nil
	} else if !isLinkEmpty(link) {
		projectLink.Url = *link
		projectLink.Kind = kind
		projectLink.ProjectID = projectId
		result = r.db.Client.WithContext(ctx).Save(projectLink)
		if result.Error != nil {
			return result.Error
		}
	}
	return nil
}

func (r *projectRepo) setLinks(ctx context.Context, projects []*domain.Project) error {
	projectIds := make([]string, len(projects))
	for i, project := range projects {
		projectIds[i] = project.ID
	}
	links, err := r.GetLinksByProjectIds(ctx, projectIds)
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
