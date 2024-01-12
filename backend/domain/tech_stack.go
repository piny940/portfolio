package domain

import "time"

type TechStack struct {
	ID           uint `gorm:"primarykey"`
	TechnologyID uint
	Technology   Technology `gorm:"constraint:OnDelete:RESTRICT;"`
	Proficiency  int        `gorm:"not null"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

type ITechStackRepo interface {
	List() ([]*TechStack, error)
	Find(id uint) (*TechStack, error)
	Create(input TechStackInput) (*TechStack, error)
	Update(id uint, input TechStackInput) (*TechStack, error)
	Delete(id uint) (*TechStack, error)
}
