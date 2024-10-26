package db

import (
	"backend/domain"
	"context"
	"io"
	"os"
	"path"
	"strings"
	"time"

	"cloud.google.com/go/storage"
	"gorm.io/gorm/clause"
)

type technologyRepo struct {
	db         *DB
	storage    *storage.BucketHandle
	bucketName string
}

// Create implements domain.ITechnologyRepo.
func (r *technologyRepo) Create(ctx context.Context, input domain.TechnologyInput) (*domain.Technology, error) {
	logoURL := ""
	if input.Logo != nil {
		writer := r.storage.Object(input.Logo.Filename).NewWriter(ctx)
		defer writer.Close()
		if _, err := io.Copy(writer, input.Logo.File); err != nil {
			return nil, err
		}
		url := gcsURL(r.bucketName, input.Logo.Filename)
		logoURL = url
	}
	technology := domain.Technology{
		Name:     input.Name,
		LogoURL:  &logoURL,
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
func (r *technologyRepo) Update(ctx context.Context, id uint, input domain.TechnologyInput) (*domain.Technology, error) {
	var technology domain.Technology
	r.db.Client.First(&technology, id)
	if technology.LogoURL != nil && strings.HasPrefix(*technology.LogoURL, gcsHost) {
		obj := gcsObjectName(r.bucketName, *technology.LogoURL)
		if err := r.storage.Object(obj).Delete(ctx); err != nil {
			return nil, err
		}
	}
	if input.Logo != nil {
		writer := r.storage.Object(input.Logo.Filename).NewWriter(ctx)
		defer writer.Close()
		if _, err := io.Copy(writer, input.Logo.File); err != nil {
			return nil, err
		}
		url := gcsURL(r.bucketName, input.Logo.Filename)
		technology.LogoURL = &url
	}
	technology.Name = input.Name
	technology.TagColor = input.TagColor
	result := r.db.Client.Clauses(clause.Returning{}).Save(&technology)
	if result.Error != nil {
		return nil, result.Error
	}
	return &technology, nil
}

func NewTechnologyRepo(db *DB) domain.ITechnologyRepo {
	const TIMEOUT = 30 * time.Second
	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()
	client, err := storage.NewClient(ctx)
	if err != nil {
		panic(err)
	}
	bucketName := os.Getenv("GOOGLE_BUCKET_NAME")
	bucket := client.Bucket(bucketName)
	return &technologyRepo{db: db, storage: bucket, bucketName: bucketName}
}

const gcsHost = "https://storage.googleapis.com"

func gcsURL(bucketName, objectName string) string {
	return path.Join(gcsHost, bucketName, objectName)
}
func gcsObjectName(bucketName, url string) string {
	return url[len(path.Join(gcsHost, bucketName)+"/"):]
}
