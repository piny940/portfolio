package domain

import "gorm.io/gorm"

type Technology struct {
	gorm.Model

	Name     string  `gorm:"not null; type:varchar(127)" json:"name"`
	LogoURL  *string `gorm:"type:varchar(255)" json:"logo_url,omitempty"`
	TagColor string  `gorm:"not null; varchar(30)" json:"tag_color"`
}

type ITechnologyRepo interface {
	List() ([]*Technology, error)
	Find(id uint) (*Technology, error)
	Create(input TechnologyInput) (*Technology, error)
	Update(id uint, input TechnologyInput) (*Technology, error)
	Delete(id uint) (*Technology, error)
}
