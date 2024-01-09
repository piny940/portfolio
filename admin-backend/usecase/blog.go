package usecase

import "admin-backend/domain"

type IBlogUsecase interface {
	List() ([]*domain.Blog, error)
	Find(id uint) (*domain.Blog, error)
	Create(input domain.BlogInput) (*domain.Blog, error)
	Update(id uint, input domain.BlogInput) (*domain.Blog, error)
	Delete(id uint) (*domain.Blog, error)
}
type blogUsecase struct {
	repo domain.IBlogRepo
}

// Create implements IBlogUsecase.
func (u *blogUsecase) Create(input domain.BlogInput) (*domain.Blog, error) {
	return u.repo.Create(input)
}

// Delete implements IBlogUsecase.
func (u *blogUsecase) Delete(id uint) (*domain.Blog, error) {
	return u.repo.Delete(id)
}

// Find implements IBlogUsecase.
func (u *blogUsecase) Find(id uint) (*domain.Blog, error) {
	return u.repo.Find(id)
}

// List implements IBlogUsecase.
func (u *blogUsecase) List() ([]*domain.Blog, error) {
	return u.repo.List()
}

// Update implements IBlogUsecase.
func (u *blogUsecase) Update(id uint, input domain.BlogInput) (*domain.Blog, error) {
	return u.repo.Update(id, input)
}

func NewBlogUsecase(repo domain.IBlogRepo) IBlogUsecase {
	return &blogUsecase{repo: repo}
}
