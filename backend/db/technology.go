package db

import (
	"backend/domain"

	"gorm.io/gorm/clause"
)

type technologyRepo struct {
	db *DB
}

// Create implements domain.ITechnologyRepo.
func (r *technologyRepo) Create(input domain.TechnologyInput) (*domain.Technology, error) {
	technology := domain.Technology{
		Name:     input.Name,
		LogoURL:  input.LogoURL,
		TagColor: input.TagColor,
	}
	result := r.db.Client.Create(&technology)
	if result.Error != nil {
		return nil, result.Error
	}
	return &technology, nil
}

// Delete implements domain.ITechnologyRepo.
func (r *technologyRepo) Delete(id uint) (*domain.Technology, error) {
	var technology domain.Technology
	result := r.db.Client.Clauses(clause.Returning{}).Delete(&technology, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &technology, nil
}

// Find implements domain.ITechnologyRepo.
func (r *technologyRepo) Find(id uint) (*domain.Technology, error) {
	var technology domain.Technology
	result := r.db.Client.Find(&technology, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &technology, nil
}

func (r *technologyRepo) FindAll(ids []uint) ([]*domain.Technology, error) {
	var technologies []*domain.Technology
	result := r.db.Client.Where("id in ?", ids).Find(&technologies)
	if result.Error != nil {
		return nil, result.Error
	}
	return technologies, nil
}

// List implements domain.ITechnologyRepo.
func (r *technologyRepo) List() ([]*domain.Technology, error) {
	var technologies []*domain.Technology
	result := r.db.Client.Find(&technologies)
	if result.Error != nil {
		return nil, result.Error
	}
	return technologies, nil
}

// Update implements domain.ITechnologyRepo.
func (r *technologyRepo) Update(id uint, input domain.TechnologyInput) (*domain.Technology, error) {
	var technology domain.Technology
	r.db.Client.First(&technology, id)
	technology.Name = input.Name
	technology.LogoURL = input.LogoURL
	technology.TagColor = input.TagColor
	result := r.db.Client.Clauses(clause.Returning{}).Save(&technology)
	if result.Error != nil {
		return nil, result.Error
	}
	return &technology, nil
}

func NewTechnologyRepo(db *DB) domain.ITechnologyRepo {
	return &technologyRepo{db: db}
}
