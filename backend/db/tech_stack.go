package db

import (
	"backend/domain"
	"context"

	"gorm.io/gorm/clause"
)

type techStackRepo struct {
	db *DB
}

func NewTechStackRepo(db *DB) domain.ITechStackRepo {
	return &techStackRepo{db}
}

func (r *techStackRepo) List(ctx context.Context) ([]*domain.TechStack, error) {
	var techStacks []*domain.TechStack
	result := r.db.Client.WithContext(ctx).Order("proficiency desc").Find(&techStacks)
	if result.Error != nil {
		return nil, result.Error
	}
	return techStacks, nil
}

func (r *techStackRepo) Find(ctx context.Context, id uint) (*domain.TechStack, error) {
	var techStack *domain.TechStack
	result := r.db.Client.WithContext(ctx).First(&techStack, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return techStack, nil
}

func (r *techStackRepo) Create(ctx context.Context, input domain.TechStackInput) (*domain.TechStack, error) {
	techStack := domain.TechStack{
		TechnologyID: input.TechnologyID,
		Proficiency:  input.Proficiency,
	}
	result := r.db.Client.WithContext(ctx).Clauses(clause.Returning{}).Create(&techStack)
	if result.Error != nil {
		return nil, result.Error
	}
	return &techStack, nil
}

func (r *techStackRepo) Update(ctx context.Context, id uint, input domain.TechStackInput) (*domain.TechStack, error) {
	var techStack domain.TechStack
	r.db.Client.WithContext(ctx).First(&techStack, id)
	techStack.TechnologyID = input.TechnologyID
	techStack.Proficiency = input.Proficiency
	result := r.db.Client.WithContext(ctx).Clauses(clause.Returning{}).Save(&techStack)
	if result.Error != nil {
		return nil, result.Error
	}
	return &techStack, nil
}

func (r *techStackRepo) Delete(ctx context.Context, id uint) (*domain.TechStack, error) {
	var techStack domain.TechStack
	result := r.db.Client.WithContext(ctx).Clauses(clause.Returning{}).Delete(&techStack, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &techStack, nil
}
