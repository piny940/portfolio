package usecase

import "backend/domain"

type ITechnologyUsecase interface {
	List() ([]*domain.Technology, error)
	Find(id uint) (*domain.Technology, error)
	Create(input domain.TechnologyInput) (*domain.Technology, error)
	Update(id uint, input domain.TechnologyInput) (*domain.Technology, error)
	Delete(id uint) (*domain.Technology, error)
}

type technologyUsecase struct {
	Repo domain.ITechnologyRepo
}

// Create implements ITechnologyUsecase.
func (u *technologyUsecase) Create(input domain.TechnologyInput) (*domain.Technology, error) {
	return u.Repo.Create(input)
}

// Delete implements ITechnologyUsecase.
func (u *technologyUsecase) Delete(id uint) (*domain.Technology, error) {
	return u.Repo.Delete(id)
}

// Find implements ITechnologyUsecase.
func (u *technologyUsecase) Find(id uint) (*domain.Technology, error) {
	return u.Repo.Find(id)
}

// List implements ITechnologyUsecase.
func (u *technologyUsecase) List() ([]*domain.Technology, error) {
	return u.Repo.List()
}

// Update implements ITechnologyUsecase.
func (u *technologyUsecase) Update(id uint, input domain.TechnologyInput) (*domain.Technology, error) {
	return u.Repo.Update(id, input)
}

func NewTechnologyUsecase(repo domain.ITechnologyRepo) ITechnologyUsecase {
	return &technologyUsecase{Repo: repo}
}
