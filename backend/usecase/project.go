package usecase

import "backend/domain"

type IProjectUsecase interface {
	List() ([]*domain.Project, error)
	Find(id string) (*domain.Project, error)
	Create(input domain.ProjectInput) (*domain.Project, error)
	Update(input domain.ProjectInput) (*domain.Project, error)
	Delete(id string) (*domain.Project, error)
	ListTags(projectIds []string) ([]*domain.Technology, error)
	UpdateTags(projectId string, technologyIds []uint) ([]*domain.Technology, error)
}
type projectUsecase struct {
	repo domain.IProjectRepo
}

func (u *projectUsecase) Create(input domain.ProjectInput) (*domain.Project, error) {
	return u.repo.Create(input)
}

func (u *projectUsecase) Delete(id string) (*domain.Project, error) {
	return u.repo.Delete(id)
}

func (u *projectUsecase) Find(id string) (*domain.Project, error) {
	return u.repo.Find(id)
}

func (u *projectUsecase) List() ([]*domain.Project, error) {
	return u.repo.List()
}

func (u *projectUsecase) Update(input domain.ProjectInput) (*domain.Project, error) {
	return u.repo.Update(input)
}

func (u *projectUsecase) ListTags(projectIds []string) ([]*domain.Technology, error) {
	return u.repo.ListTags(projectIds)
}

func (u *projectUsecase) UpdateTags(projectId string, technologyIds []uint) ([]*domain.Technology, error) {
	return u.repo.UpdateTags(projectId, technologyIds)
}

func NewProjectUsecase(repo domain.IProjectRepo) IProjectUsecase {
	return &projectUsecase{repo: repo}
}
