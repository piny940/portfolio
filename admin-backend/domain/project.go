package domain

import "gorm.io/gorm"

type Project struct {
	gorm.Model

	ID          string `gorm:"primaryKey; type:varchar(127); not null"`
	Title       string `gorm:"type:varchar(127); not null"`
	Description string `gorm:"type:varchar(255); not null"`
	IsFavorite  bool   `gorm:"not null"`
}

type IProjectRepo interface {
	List() ([]*Project, error)
	Find(id uint) (*Project, error)
	Create(project *Project) error
	Update(project *Project) error
	Delete(id uint) (*Project, error)
}
