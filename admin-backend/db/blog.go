package db

import (
	"admin-backend/domain"
)

type blogRepo struct {
	db *DB
}

// Create implements domain.IBlogRepo.
func (r *blogRepo) Create(blog *domain.Blog) error {
	result := r.db.Client.Create(blog)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// Delete implements domain.IBlogRepo.
func (r *blogRepo) Delete(id uint) (*domain.Blog, error) {
	var blog *domain.Blog
	result := r.db.Client.Delete(blog, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return blog, nil
}

// Find implements domain.IBlogRepo.
func (r *blogRepo) Find(id uint) (*domain.Blog, error) {
	var blog *domain.Blog
	result := r.db.Client.First(&blog, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return blog, nil
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
func (r *blogRepo) Update(blog *domain.Blog) error {
	result := r.db.Client.Save(blog)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func NewBlogRepo(db *DB) domain.IBlogRepo {
	return &blogRepo{db: db}
}
