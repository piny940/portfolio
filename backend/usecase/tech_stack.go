package usecase

import (
	"backend/domain"
	"context"
)

type ITechStackUsecase interface {
	List(ctx context.Context) ([]*domain.TechStack, error)
	Find(ctx context.Context, id uint) (*domain.TechStack, error)
	Create(ctx context.Context, input domain.TechStackInput) (*domain.TechStack, error)
	Update(ctx context.Context, id uint, input domain.TechStackInput) (*domain.TechStack, error)
	Delete(ctx context.Context, id uint) (*domain.TechStack, error)
}

type techStackUsecase struct {
	repo domain.ITechStackRepo
}

func NewTechStackUsecase(repo domain.ITechStackRepo) ITechStackUsecase {
	return &techStackUsecase{repo}
}

func (u *techStackUsecase) List(ctx context.Context) ([]*domain.TechStack, error) {
	return u.repo.List(ctx)
}

func (u *techStackUsecase) Find(ctx context.Context, id uint) (*domain.TechStack, error) {
	return u.repo.Find(ctx, id)
}

func (u *techStackUsecase) Create(ctx context.Context, input domain.TechStackInput) (*domain.TechStack, error) {
	return u.repo.Create(ctx, input)
}

func (u *techStackUsecase) Update(ctx context.Context, id uint, input domain.TechStackInput) (*domain.TechStack, error) {
	return u.repo.Update(ctx, id, input)
}

func (u *techStackUsecase) Delete(ctx context.Context, id uint) (*domain.TechStack, error) {
	return u.repo.Delete(ctx, id)
}
