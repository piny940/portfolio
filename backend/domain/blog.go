package domain

import (
	"context"
	"time"
)

type BlogKind int

const (
	BlogKindQiita BlogKind = iota
	BlogKindExternal
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
	List(ctx context.Context, opt *ListOpt) ([]*Blog, error)
	Find(ctx context.Context, id uint) (*Blog, error)
	Create(ctx context.Context, input BlogInput) (*Blog, error)
	Update(ctx context.Context, id uint, input BlogInput) (*Blog, error)
	Delete(ctx context.Context, id uint) (*Blog, error)
	ListTags(ctx context.Context, blogIds []uint) ([]*BlogTag, error)
	UpdateTags(ctx context.Context, blogId uint, technologyIds []uint) ([]*BlogTag, error)
	TotalCount(ctx context.Context) (int64, error)
}
