package domain

import "gorm.io/gorm"

type Technology struct {
	gorm.Model

	Name     string  `gorm:"not null; type:varchar(127)"`
	LogoURL  *string `gorm:"type:varchar(255)"`
	TagColor string  `gorm:"not null; varchar(30)"`
}

type ITechnologyRepo interface {
	List() ([]*Technology, error)
	Find(id uint) (*Technology, error)
	Create(input TechnologyInput) (*Technology, error)
	Update(id uint, input TechnologyInput) (*Technology, error)
	Delete(id uint) (*Technology, error)
}
