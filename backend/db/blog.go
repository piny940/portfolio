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
func (*blogRepo) ListTags(blogIds []uint) ([]*domain.BlogTag, error) {
	blogTechnologyTags := []*BlogTechnologyTag{}
	result := db.Client.Where("blog_id IN ?", blogIds).Find(&blogTechnologyTags)
	if result.Error != nil {
		return nil, result.Error
	}
	technologyIds := make([]uint, len(blogTechnologyTags))
	for i, blogTechnologyTag := range blogTechnologyTags {
		technologyIds[i] = blogTechnologyTag.TechnologyID
	}
	technologies := []*domain.Technology{}
	result = db.Client.Where("id IN ?", technologyIds).Find(&technologies)
	if result.Error != nil {
		return nil, result.Error
	}
	technologiesById := make(map[uint]*domain.Technology, len(technologies))
	for _, tech := range technologies {
		technologiesById[tech.ID] = tech
	}
	blogTags := []*domain.BlogTag{}
	for _, blogTechTag := range blogTechnologyTags {
		blogTags = append(blogTags, &domain.BlogTag{
			BlogID:     blogTechTag.BlogID,
			Technology: *technologiesById[blogTechTag.TechnologyID],
		})
	}
	return blogTags, nil
}

func (r *blogRepo) UpdateTags(blogId uint, technologyIds []uint) ([]*domain.BlogTag, error) {
	existing := make([]*BlogTechnologyTag, 0)
	result := r.db.Client.Where("blog_id = ?", blogId).Find(&existing)
	if result.Error != nil {
		return nil, result.Error
	}
	actual := make([]uint, len(existing))
	for i, tag := range existing {
		actual[i] = tag.TechnologyID
	}
	toCreate, toDelete := diff(actual, technologyIds)

	// Delete
	result = r.db.Client.Where("blog_id = ? and technology_id in ?", blogId, toDelete).Delete(&BlogTechnologyTag{})
	if result.Error != nil {
		return nil, result.Error
	}
	// Create
	for _, id := range toCreate {
		new := BlogTechnologyTag{
			BlogID:       blogId,
			TechnologyID: id,
		}
		result = r.db.Client.Create(&new)
		if result.Error != nil {
			return nil, result.Error
		}
	}
	return []*domain.BlogTag{}, nil
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

func (r *blogRepo) List(opt *domain.ListOpt) ([]*domain.Blog, error) {
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
