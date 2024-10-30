package domain

import (
	"context"
	"time"
)

type TechStack struct {
	ID           uint `gorm:"primarykey"`
	TechnologyID uint
	Technology   Technology
	Proficiency  int `gorm:"not null"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

type ITechStackRepo interface {
	List(ctx context.Context) ([]*TechStack, error)
	Find(ctx context.Context, id uint) (*TechStack, error)
	Create(ctx context.Context, input TechStackInput) (*TechStack, error)
	Update(ctx context.Context, id uint, input TechStackInput) (*TechStack, error)
	Delete(ctx context.Context, id uint) (*TechStack, error)
}
