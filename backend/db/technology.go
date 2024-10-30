package db

import (
	"backend/db/gcs"
	"backend/domain"
	"context"
	"strings"

	"gorm.io/gorm/clause"
)

type technologyRepo struct {
	db      *DB
	storage gcs.IStorage
}

// Create implements domain.ITechnologyRepo.
func (r *technologyRepo) Create(ctx context.Context, input domain.TechnologyInput) (*domain.Technology, error) {
	logoURL := ""
	var err error
	if input.Logo != nil {
		logoURL, err = r.storage.Create(ctx, &gcs.File{
			Filename: input.Logo.Filename,
			File:     input.Logo.File,
		})
		if err != nil {
			return nil, err
		}
	}
	technology := domain.Technology{
		Name:     input.Name,
		LogoURL:  &logoURL,
		TagColor: input.TagColor,
	}
	result := r.db.Client.WithContext(ctx).Create(&technology)
	if result.Error != nil {
		return nil, result.Error
	}
	return &technology, nil
}

// Delete implements domain.ITechnologyRepo.
func (r *technologyRepo) Delete(ctx context.Context, id uint) (*domain.Technology, error) {
	var technology domain.Technology
	result := r.db.Client.WithContext(ctx).Clauses(clause.Returning{}).Delete(&technology, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &technology, nil
}

// Find implements domain.ITechnologyRepo.
func (r *technologyRepo) Find(ctx context.Context, id uint) (*domain.Technology, error) {
	var technology domain.Technology
	result := r.db.Client.WithContext(ctx).Find(&technology, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &technology, nil
}

func (r *technologyRepo) FindAll(ctx context.Context, ids []uint) ([]*domain.Technology, error) {
	var technologies []*domain.Technology
	result := r.db.Client.WithContext(ctx).Where("id in ?", ids).Find(&technologies)
	if result.Error != nil {
		return nil, result.Error
	}
	return technologies, nil
}

// List implements domain.ITechnologyRepo.
func (r *technologyRepo) List(ctx context.Context) ([]*domain.Technology, error) {
	var technologies []*domain.Technology
	result := r.db.Client.WithContext(ctx).Find(&technologies)
	if result.Error != nil {
		return nil, result.Error
	}
	return technologies, nil
}

// Update implements domain.ITechnologyRepo.
func (r *technologyRepo) Update(ctx context.Context, id uint, input domain.TechnologyInput) (*domain.Technology, error) {
	var technology domain.Technology
	r.db.Client.WithContext(ctx).First(&technology, id)
	if technology.LogoURL != nil && strings.HasPrefix(*technology.LogoURL, gcs.GOOGLE_STORAGE_HOST) {
		err := r.storage.Delete(ctx, gcs.NewStorage().ObjectName(*technology.LogoURL))
		if err != nil {
			return nil, err
		}
	}
	if input.Logo != nil {
		url, err := r.storage.Create(ctx, &gcs.File{
			Filename: input.Logo.Filename,
			File:     input.Logo.File,
		})
		if err != nil {
			return nil, err
		}
		technology.LogoURL = &url
	}
	technology.Name = input.Name
	technology.TagColor = input.TagColor
	result := r.db.Client.WithContext(ctx).Clauses(clause.Returning{}).Save(&technology)
	if result.Error != nil {
		return nil, result.Error
	}
	return &technology, nil
}

func NewTechnologyRepo(db *DB, storage gcs.IStorage) domain.ITechnologyRepo {
	return &technologyRepo{db: db, storage: storage}
}
