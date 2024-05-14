package domain

import (
	"time"
)

type BlogKind int

const (
	BlogKindQiita BlogKind = iota
)

type Blog struct {
	ID          uint          `gorm:"primarykey"`
	Title       string        `gorm:"type:varchar(255); not null"`
	Url         string        `gorm:"type:varchar(255); not null"`
	Kind        BlogKind      `gorm:"not null"`
	Tags        []*Technology `gorm:"many2many:blog_technology_tags;"`
	PublishedAt time.Time
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
type BlogTag struct {
	Technology
	BlogID uint
}

type IBlogRepo interface {
	List(opt *ListOpt) ([]*Blog, error)
	Find(id uint) (*Blog, error)
	Create(input BlogInput) (*Blog, error)
	Update(id uint, input BlogInput) (*Blog, error)
	Delete(id uint) (*Blog, error)
	ListTags(blogIds []uint) ([]*BlogTag, error)
	UpdateTags(blogId uint, technologyIds []uint) ([]*BlogTag, error)
	TotalCount() (int64, error)
}
