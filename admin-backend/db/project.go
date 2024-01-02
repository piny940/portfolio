package db

import "admin-backend/domain"

type projectRepo struct {
	db *DB
}

func (r *projectRepo) Create(project *domain.Project) error {
	result := r.db.Client.Create(project)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (r *projectRepo) Delete(id uint) (*domain.Project, error) {
	var project domain.Project
	result := r.db.Client.Delete(&project, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &project, nil
}

func (r *projectRepo) Get(id uint) (*domain.Project, error) {
	var project domain.Project
	result := r.db.Client.First(&project, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &project, nil
}

func (r *projectRepo) List() ([]domain.Project, error) {
	var projects []domain.Project
	result := r.db.Client.Find(projects)
	if result.Error != nil {
		return nil, result.Error
	}
	return projects, nil
}

func (r *projectRepo) Update(project *domain.Project) error {
	result := r.db.Client.Save(project)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func NewProjectRepo(db *DB) domain.IProjectRepo {
	return &projectRepo{db: db}
}
