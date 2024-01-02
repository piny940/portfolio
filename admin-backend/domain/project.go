package domain

import (
	"time"

	"gorm.io/gorm"
)

type Project struct {
	gorm.Model

	ID          uint
	Title       string
	Description string
	IsFavorite  bool
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

type IProjectRepo interface {
	List() ([]Project, error)
	Get(id uint) (*Project, error)
	Create(project *Project) error
	Update(project *Project) error
	Delete(id uint) (*Project, error)
}
