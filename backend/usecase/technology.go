package usecase

import (
	"backend/domain"
	"context"
)

type ITechnologyUsecase interface {
	List() ([]*domain.Technology, error)
	Find(id uint) (*domain.Technology, error)
	FindAll(ids []uint) ([]*domain.Technology, error)
	Create(ctx context.Context, input domain.TechnologyInput) (*domain.Technology, error)
	Update(ctx context.Context, id uint, input domain.TechnologyInput) (*domain.Technology, error)
	Delete(id uint) (*domain.Technology, error)
}

type technologyUsecase struct {
	Repo domain.ITechnologyRepo
}

// Create implements ITechnologyUsecase.
func (u *technologyUsecase) Create(ctx context.Context, input domain.TechnologyInput) (*domain.Technology, error) {
	return u.Repo.Create(ctx, input)
}

// Delete implements ITechnologyUsecase.
func (u *technologyUsecase) Delete(id uint) (*domain.Technology, error) {
	return u.Repo.Delete(id)
}

// Find implements ITechnologyUsecase.
func (u *technologyUsecase) Find(id uint) (*domain.Technology, error) {
	return u.Repo.Find(id)
}

func (u *technologyUsecase) FindAll(ids []uint) ([]*domain.Technology, error) {
	return u.Repo.FindAll(ids)
}

// List implements ITechnologyUsecase.
func (u *technologyUsecase) List() ([]*domain.Technology, error) {
	return u.Repo.List()
}

// Update implements ITechnologyUsecase.
func (u *technologyUsecase) Update(ctx context.Context, id uint, input domain.TechnologyInput) (*domain.Technology, error) {
	return u.Repo.Update(ctx, id, input)
}

func NewTechnologyUsecase(repo domain.ITechnologyRepo) ITechnologyUsecase {
	return &technologyUsecase{Repo: repo}
}
