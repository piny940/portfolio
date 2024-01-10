package domain

import (
	"time"

	"gorm.io/gorm"
)

type BlogKind int

const (
	BlogKindQiita BlogKind = iota
)

type Blog struct {
	gorm.Model
	Title string        `gorm:"type:varchar(255); not null"`
	Url   string        `gorm:"type:varchar(255); not null"`
	Kind  BlogKind      `gorm:"not null"`
	Tags  []*Technology `gorm:"many2many:blog_technology_tags;"`
}

type BlogTechnologyTag struct {
	BlogID       uint `gorm:"primary_key"`
	Blog         Blog
	TechnologyID uint `gorm:"primary_key"`
	Technology   Technology
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

type IBlogRepo interface {
	List() ([]*Blog, error)
	Find(id uint) (*Blog, error)
	Create(input BlogInput) (*Blog, error)
	Update(id uint, input BlogInput) (*Blog, error)
	Delete(id uint) (*Blog, error)
	ListTags(blogIds []uint) ([]*Technology, error)
	UpdateTags(blogId uint, technologyIds []uint) ([]*Technology, error)
}
