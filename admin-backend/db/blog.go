package db

import "admin-backend/domain"

type blogRepo struct {
	db *DB
}

// Create implements domain.IBlogRepo.
func (r *blogRepo) Create(blog *domain.Blog) error {
	panic("unimplemented")
}

// Delete implements domain.IBlogRepo.
func (r *blogRepo) Delete(id uint) (*domain.Blog, error) {
	panic("unimplemented")
}

// Find implements domain.IBlogRepo.
func (r *blogRepo) Find(id uint) (*domain.Blog, error) {
	panic("unimplemented")
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
	panic("unimplemented")
}

func NewBlogRepo(db *DB) domain.IBlogRepo {
	return &blogRepo{db: db}
}
