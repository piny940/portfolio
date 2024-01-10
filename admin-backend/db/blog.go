package db

import (
	"admin-backend/domain"

	"gorm.io/gorm/clause"
)

type blogRepo struct {
	db *DB
}

// Create implements domain.IBlogRepo.
func (r *blogRepo) Create(input domain.BlogInput) (*domain.Blog, error) {
	blog := domain.Blog{
		Title: input.Title,
		Kind:  domain.BlogKind(input.Kind),
		Url:   input.URL,
	}
	result := r.db.Client.Create(&blog)
	if result.Error != nil {
		return nil, result.Error
	}
	return &blog, nil
}

// Delete implements domain.IBlogRepo.
func (r *blogRepo) Delete(id uint) (*domain.Blog, error) {
	var blog domain.Blog
	result := r.db.Client.Clauses(clause.Returning{}).Delete(&blog, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &blog, nil
}

// Find implements domain.IBlogRepo.
func (r *blogRepo) Find(id uint) (*domain.Blog, error) {
	var blog domain.Blog
	result := r.db.Client.First(&blog, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &blog, nil
}

func (r *blogRepo) List() ([]*domain.Blog, error) {
	var blogs []*domain.Blog
	result := r.db.Client.Find(&blogs)
	if result.Error != nil {
		return nil, result.Error
	}
	return blogs, nil
}

// Update implements domain.IBlogRepo.
func (r *blogRepo) Update(id uint, input domain.BlogInput) (*domain.Blog, error) {
	var blog domain.Blog
	r.db.Client.First(&blog, id)
	blog.Title = input.Title
	blog.Kind = domain.BlogKind(input.Kind)
	blog.Url = input.URL
	result := r.db.Client.Save(&blog)
	if result.Error != nil {
		return nil, result.Error
	}
	return &blog, nil
}

func NewBlogRepo(db *DB) domain.IBlogRepo {
	return &blogRepo{db: db}
}
