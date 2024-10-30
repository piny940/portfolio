package usecase

import (
	"backend/domain"
	"context"
)

type ITechnologyUsecase interface {
	List(ctx context.Context) ([]*domain.Technology, error)
	Find(ctx context.Context, id uint) (*domain.Technology, error)
	FindAll(ctx context.Context, ids []uint) ([]*domain.Technology, error)
	Create(ctx context.Context, input domain.TechnologyInput) (*domain.Technology, error)
	Update(ctx context.Context, id uint, input domain.TechnologyInput) (*domain.Technology, error)
	Delete(ctx context.Context, id uint) (*domain.Technology, error)
}

type technologyUsecase struct {
	Repo domain.ITechnologyRepo
}

// Create implements ITechnologyUsecase.
func (u *technologyUsecase) Create(ctx context.Context, input domain.TechnologyInput) (*domain.Technology, error) {
	return u.Repo.Create(ctx, input)
}

// Delete implements ITechnologyUsecase.
func (u *technologyUsecase) Delete(ctx context.Context, id uint) (*domain.Technology, error) {
	return u.Repo.Delete(ctx, id)
}

// Find implements ITechnologyUsecase.
func (u *technologyUsecase) Find(ctx context.Context, id uint) (*domain.Technology, error) {
	return u.Repo.Find(ctx, id)
}

func (u *technologyUsecase) FindAll(ctx context.Context, ids []uint) ([]*domain.Technology, error) {
	return u.Repo.FindAll(ctx, ids)
}

// List implements ITechnologyUsecase.
func (u *technologyUsecase) List(ctx context.Context) ([]*domain.Technology, error) {
	return u.Repo.List(ctx)
}

// Update implements ITechnologyUsecase.
func (u *technologyUsecase) Update(ctx context.Context, id uint, input domain.TechnologyInput) (*domain.Technology, error) {
	return u.Repo.Update(ctx, id, input)
}

func NewTechnologyUsecase(repo domain.ITechnologyRepo) ITechnologyUsecase {
	return &technologyUsecase{Repo: repo}
}
