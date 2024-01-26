package domain

import (
	"time"
)

type Project struct {
	ID          string        `gorm:"primaryKey; type:varchar(127); not null"`
	Title       string        `gorm:"type:varchar(127); not null"`
	Description string        `gorm:"type:varchar(255); not null"`
	IsFavorite  bool          `gorm:"not null"`
	Position    int           `gorm:"not null; default:0"`
	Tags        []*Technology `gorm:"many2many:project_technology_tags"`
	GithubLink  *string       `gorm:"-"`
	QiitaLink   *string       `gorm:"-"`
	AppLink     *string       `gorm:"-"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

type ProjectTechnologyTag struct {
	ProjectID    string     `gorm:"primary_key"`
	Project      Project    `gorm:"constraint:OnDelete:CASCADE;"`
	TechnologyID string     `gorm:"primary_key"`
	Technology   Technology `gorm:"constraint:OnDelete:CASCADE;"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

type IProjectRepo interface {
	List() ([]*Project, error)
	ListByIds(ids []string) (map[string]*Project, error)
	Find(id string) (*Project, error)
	Create(input ProjectInput) (*Project, error)
	Update(input ProjectInput) (*Project, error)
	Delete(id string) (*Project, error)
	ListTags(projectIds []string) ([]*Technology, error)
	UpdateTags(projectId string, technologyIds []uint) ([]*Technology, error)
}

func (p *Project) ToInput() ProjectInput {
	return ProjectInput{
		ID:          p.ID,
		Title:       p.Title,
		Description: p.Description,
		IsFavorite:  p.IsFavorite,
		Position:    p.Position,
		GithubLink:  p.GithubLink,
		QiitaLink:   p.QiitaLink,
		AppLink:     p.AppLink,
	}
}
