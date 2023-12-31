package domain

import "gorm.io/gorm"

type BlogKind int

const (
	BlogKindQiita BlogKind = iota
)

type Blog struct {
	gorm.Model
	Title string   `gorm:"type:varchar(255); not null"`
	Url   string   `gorm:"type:varchar(255); not null"`
	Kind  BlogKind `gorm:"not null"`
}

type IBlogRepo interface {
	List() ([]*Blog, error)
	Find(id uint) (*Blog, error)
	Create(blog *Blog) error
	Update(blog *Blog) error
	Delete(id uint) (*Blog, error)
}
