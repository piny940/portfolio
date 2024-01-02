package usecase

import "admin-backend/domain"

type IProjectUsecase interface {
	List() ([]*domain.Project, error)
	Find(id uint) (*domain.Project, error)
	Create(project *domain.Project) error
	Update(project *domain.Project) error
	Delete(id uint) (*domain.Project, error)
}
type projectUsecase struct {
	repo domain.IProjectRepo
}

func (u *projectUsecase) Create(project *domain.Project) error {
	return u.repo.Create(project)
}

func (u *projectUsecase) Delete(id uint) (*domain.Project, error) {
	return u.repo.Delete(id)
}

func (u *projectUsecase) Find(id uint) (*domain.Project, error) {
	return u.repo.Find(id)
}

func (u *projectUsecase) List() ([]*domain.Project, error) {
	return u.repo.List()
}

func (u *projectUsecase) Update(project *domain.Project) error {
	return u.repo.Update(project)
}

func NewProjectUsecase(repo domain.IProjectRepo) IProjectUsecase {
	return &projectUsecase{repo: repo}
}
