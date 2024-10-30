package usecase

import (
	"backend/domain"
	"context"
)

type IBlogUsecase interface {
	List(ctx context.Context, opt *domain.ListOpt) (*domain.BlogConnection, error)
	Find(ctx context.Context, id uint) (*domain.Blog, error)
	Create(ctx context.Context, input domain.BlogInput) (*domain.Blog, error)
	Update(ctx context.Context, id uint, input domain.BlogInput) (*domain.Blog, error)
	Delete(ctx context.Context, id uint) (*domain.Blog, error)
	ListTags(ctx context.Context, blogIds []uint) ([]*domain.BlogTag, error)
	UpdateTags(ctx context.Context, blogId uint, technologyIds []uint) ([]*domain.BlogTag, error)
}
type blogUsecase struct {
	repo domain.IBlogRepo
}

// Create implements IBlogUsecase.
func (u *blogUsecase) Create(ctx context.Context, input domain.BlogInput) (*domain.Blog, error) {
	return u.repo.Create(ctx, input)
}

// Delete implements IBlogUsecase.
func (u *blogUsecase) Delete(ctx context.Context, id uint) (*domain.Blog, error) {
	return u.repo.Delete(ctx, id)
}

// Find implements IBlogUsecase.
func (u *blogUsecase) Find(ctx context.Context, id uint) (*domain.Blog, error) {
	return u.repo.Find(ctx, id)
}

// List implements IBlogUsecase.
func (u *blogUsecase) List(ctx context.Context, opt *domain.ListOpt) (*domain.BlogConnection, error) {
	blogs, err := u.repo.List(ctx, opt)
	if err != nil {
		return nil, err
	}
	count, err := u.repo.TotalCount(ctx)
	if err != nil {
		return nil, err
	}
	connection := &domain.BlogConnection{
		Items:      blogs,
		TotalCount: count,
	}
	return connection, nil
}

// Update implements IBlogUsecase.
func (u *blogUsecase) Update(ctx context.Context, id uint, input domain.BlogInput) (*domain.Blog, error) {
	return u.repo.Update(ctx, id, input)
}

func (u *blogUsecase) ListTags(ctx context.Context, blogIds []uint) ([]*domain.BlogTag, error) {
	return u.repo.ListTags(ctx, blogIds)
}
func (u *blogUsecase) UpdateTags(ctx context.Context, blogId uint, technologyIds []uint) ([]*domain.BlogTag, error) {
	return u.repo.UpdateTags(ctx, blogId, technologyIds)
}

func NewBlogUsecase(repo domain.IBlogRepo) IBlogUsecase {
	return &blogUsecase{repo: repo}
}
