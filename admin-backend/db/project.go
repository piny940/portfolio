package db

import (
	"admin-backend/domain"

	"gorm.io/gorm/clause"
)

type projectRepo struct {
	db *DB
}

func (r *projectRepo) Create(input domain.ProjectInput) (*domain.Project, error) {
	project := domain.Project{
		ID:          input.ID,
		Title:       input.Title,
		Description: input.Description,
		IsFavorite:  input.IsFavorite,
	}
	result := r.db.Client.Create(&project)
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
	result := r.db.Client.Save(&project)
	if result.Error != nil {
		return nil, result.Error
	}
	return &project, nil
}

func NewProjectRepo(db *DB) domain.IProjectRepo {
	return &projectRepo{db: db}
}
