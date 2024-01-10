package db

import (
	"admin-backend/domain"

	"gorm.io/gorm/clause"
)

type projectRepo struct {
	db *DB
}

// ListTags implements domain.IProjectRepo.
func (r *projectRepo) ListTags(projectIds []string) ([]*domain.Technology, error) {
	var projectTechnologyTags []*domain.ProjectTechnologyTag
	result := r.db.Client.Where("project_id in ?", projectIds).Find(&projectTechnologyTags)
	if result.Error != nil {
		return nil, result.Error
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
	return &project, nil
}

func (r *projectRepo) Delete(id string) (*domain.Project, error) {
	var project domain.Project
	result := r.db.Client.Clauses(clause.Returning{}).Where("id = ?", id).Delete(&project)
	if result.Error != nil {
		return nil, result.Error
	}
	return &project, nil
}

func (r *projectRepo) Find(id string) (*domain.Project, error) {
	var project domain.Project
	result := r.db.Client.First(&project, "id = ?", id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &project, nil
}

func (r *projectRepo) List() ([]*domain.Project, error) {
	var projects []*domain.Project
	result := r.db.Client.Find(&projects)
	if result.Error != nil {
		return nil, result.Error
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
	return &project, nil
}

func NewProjectRepo(db *DB) domain.IProjectRepo {
	return &projectRepo{db: db}
}
