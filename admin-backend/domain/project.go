package domain

import (
	"time"

	"gorm.io/gorm"
)

type Project struct {
	gorm.Model

	ID          string        `gorm:"primaryKey; type:varchar(127); not null"`
	Title       string        `gorm:"type:varchar(127); not null"`
	Description string        `gorm:"type:varchar(255); not null"`
	IsFavorite  bool          `gorm:"not null"`
	Tags        []*Technology `gorm:"many2many:project_technology_tags"`
}

type ProjectTechnologyTag struct {
	ProjectID    string `gorm:"primary_key"`
	Project      Project
	TechnologyID string `gorm:"primary_key"`
	Technology   Technology
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

type IProjectRepo interface {
	List() ([]*Project, error)
	Find(id string) (*Project, error)
	Create(input ProjectInput) (*Project, error)
	Update(input ProjectInput) (*Project, error)
	Delete(id string) (*Project, error)
	ListTags(projectIds []string) ([]*Technology, error)
	UpdateTags(projectId string, technologyIds []uint) ([]*Technology, error)
}
