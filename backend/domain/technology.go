package domain

import (
	"context"
	"time"
)

type Technology struct {
	ID        uint    `gorm:"primarykey"`
	Name      string  `gorm:"not null; type:varchar(127)"`
	LogoURL   *string `gorm:"type:varchar(255)"`
	TagColor  string  `gorm:"not null; varchar(30)"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type ITechnologyRepo interface {
	List() ([]*Technology, error)
	Find(id uint) (*Technology, error)
	FindAll(ids []uint) ([]*Technology, error)
	Create(ctx context.Context, input TechnologyInput) (*Technology, error)
	Update(ctx context.Context, id uint, input TechnologyInput) (*Technology, error)
	Delete(id uint) (*Technology, error)
}
