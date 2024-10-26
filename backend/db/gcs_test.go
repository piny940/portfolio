package db

import (
	"backend/db/gcs"
	"context"
)

type storage struct {
	files []*gcs.File
}

// Create implements gcs.IStorage.
func (s *storage) Create(ctx context.Context, file *gcs.File) error {
	s.files = append(s.files, file)
	return nil
}

// Delete implements gcs.IStorage.
func (s *storage) Delete(ctx context.Context, fileName string) error {
	files := make([]*gcs.File, 0, len(s.files))
	for _, file := range s.files {
		if file.Filename != fileName {
			files = append(files, file)
		}
	}
	s.files = files
	return nil
}

// ObjectName implements gcs.IStorage.
func (s *storage) ObjectName(url string) string {
	return ""
}

// ObjectURL implements gcs.IStorage.
func (s *storage) ObjectURL(objectName string) string {
	return ""
}

var _ gcs.IStorage = &storage{}
