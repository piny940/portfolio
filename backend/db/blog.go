package db

import (
	"backend/domain"
	"time"

	"gorm.io/gorm/clause"
)

type blogRepo struct {
	db *DB
}

type BlogTechnologyTag struct {
	BlogID       uint              `gorm:"primary_key"`
	Blog         domain.Blog       `gorm:"constraint:OnDelete:CASCADE;"`
	TechnologyID uint              `gorm:"primary_key"`
	Technology   domain.Technology `gorm:"constraint:OnDelete:CASCADE;"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

// ListTags implements domain.IBlogRepo.
func (*blogRepo) ListTags(blogIds []uint) ([]*domain.Technology, error) {
	blogTechnologyTags := []*BlogTechnologyTag{}
	result := db.Client.Where("blog_id IN ?", blogIds).Find(&blogTechnologyTags)
	if result.Error != nil {
		return nil, result.Error
	}
	if len(blogTechnologyTags) == 0 {
		return []*domain.Technology{}, nil
	}
	technologyIds := make([]uint, len(blogTechnologyTags))
	for i, blogTechnologyTag := range blogTechnologyTags {
		technologyIds[i] = blogTechnologyTag.TechnologyID
	}
	technologies := []*domain.Technology{}
	result = db.Client.Find(&technologies, technologyIds)
	if result.Error != nil {
		return nil, result.Error
	}
	return technologies, nil
}

func (r *blogRepo) UpdateTags(blogId uint, technologyIds []uint) ([]*domain.Technology, error) {
	var blog domain.Blog
	result := r.db.Client.First(&blog, blogId)
	if result.Error != nil {
		return nil, result.Error
	}
	if len(technologyIds) == 0 {
		if err := r.db.Client.Model(&blog).Association("Tags").Clear(); err != nil {
			return nil, err
		}
		return []*domain.Technology{}, nil
	}
	technologies := []*domain.Technology{}
	result = r.db.Client.Find(&technologies, technologyIds)
	if result.Error != nil {
		return nil, result.Error
	}
	if err := r.db.Client.Model(&blog).Association("Tags").Replace(technologies); err != nil {
		return nil, err
	}
	return technologies, nil
}

// Create implements domain.IBlogRepo.
func (r *blogRepo) Create(input domain.BlogInput) (*domain.Blog, error) {
	blog := domain.Blog{
		Title:       input.Title,
		Kind:        domain.BlogKind(input.Kind),
		Url:         input.URL,
		PublishedAt: input.PublishedAt,
	}
	result := r.db.Client.Clauses(clause.Returning{}).Create(&blog)
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
	result := r.db.Client.Order("published_at DESC").Find(&blogs)
	if result.Error != nil {
		return nil, result.Error
	}
	return blogs, nil
}

// Update implements domain.IBlogRepo.
func (r *blogRepo) Update(id uint, input domain.BlogInput) (*domain.Blog, error) {
	var blog domain.Blog
	result := r.db.Client.First(&blog, id)
	if result.Error != nil {
		return nil, result.Error
	}
	blog.Title = input.Title
	blog.Kind = domain.BlogKind(input.Kind)
	blog.Url = input.URL
	blog.PublishedAt = input.PublishedAt
	result = r.db.Client.Clauses(clause.Returning{}).Save(&blog)
	if result.Error != nil {
		return nil, result.Error
	}
	return &blog, nil
}

func NewBlogRepo(db *DB) domain.IBlogRepo {
	return &blogRepo{db: db}
}
