package domain

import (
	"gorm.io/gorm"
)

type TechStack struct {
	gorm.Model
	TechnologyID uint
	Technology   Technology `gorm:"constraint:OnDelete:RESTRICT;"`
	Proficiency  int        `gorm:"not null"`
}

type ITechStackRepo interface {
	List() ([]*TechStack, error)
	Find(id uint) (*TechStack, error)
	Create(input TechStackInput) (*TechStack, error)
	Update(id uint, input TechStackInput) (*TechStack, error)
	Delete(id uint) (*TechStack, error)
}
