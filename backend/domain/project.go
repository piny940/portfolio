package domain

import (
	"fmt"
	"time"
	"unicode/utf8"
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

type ProjectTag struct {
	ProjectID  string      `json:"projectId"`
	Technology *Technology `json:"technology"`
}

type IProjectRepo interface {
	List() ([]*Project, error)
	ListByIds(ids []string) (map[string]*Project, error)
	Find(id string) (*Project, error)
	Create(input ProjectInput) (*Project, error)
	Update(input ProjectInput) (*Project, error)
	Delete(id string) (*Project, error)
	ListTags(projectIds []string) ([]*ProjectTag, error)
	UpdateTags(projectId string, technologyIds []uint) ([]*ProjectTag, error)
}

const (
	MIN_TITLE_LENGTH       = 1
	MAX_TITLE_LENGTH       = 20
	MIN_DESCRIPTION_LENGTH = 1
	MAX_DESCRIPTION_LENGTH = 80
)

type invalidTitleLengthError struct{}
type invalidDescriptionLengthError struct{}

func (e *invalidTitleLengthError) Error() string {
	return fmt.Sprintf("title length must be between %d and %d", MIN_TITLE_LENGTH, MAX_TITLE_LENGTH)
}
func (e *invalidDescriptionLengthError) Error() string {
	return fmt.Sprintf("description length must be between %d and %d", MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH)
}

func (p ProjectInput) IsTitleValid() error {
	length := utf8.RuneCountInString(p.Title)
	if MIN_TITLE_LENGTH <= length && length <= MAX_TITLE_LENGTH {
		return nil
	}
	return &invalidDescriptionLengthError{}
}
func (p ProjectInput) IsDescriptionValid() error {
	length := utf8.RuneCountInString(p.Description)
	if MIN_DESCRIPTION_LENGTH <= length && length <= MAX_DESCRIPTION_LENGTH {
		return nil
	}
	return &invalidDescriptionLengthError{}
}

func (p *Project) ToInput() ProjectInput {
	return ProjectInput{
		ID:          p.ID,
		Title:       p.Title,
		Description: p.Description,
		IsFavorite:  p.IsFavorite,
		Position:    &p.Position,
		GithubLink:  p.GithubLink,
		QiitaLink:   p.QiitaLink,
		AppLink:     p.AppLink,
	}
}
