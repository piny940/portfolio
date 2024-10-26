package gcs

import (
	"context"
	"io"
	"os"
	"path"
	"time"

	"cloud.google.com/go/storage"
)

type File struct {
	Filename string
	File     io.ReadSeeker
}
type IStorage interface {
	Create(ctx context.Context, file *File) error
	Delete(ctx context.Context, fileName string) error
	ObjectURL(objectName string) string
	ObjectName(url string) string
}

type Storage struct {
	storage    *storage.BucketHandle
	bucketName string
}

var _ IStorage = &Storage{}

const GOOGLE_STORAGE_HOST = "https://storage.googleapis.com"

func NewStorage() *Storage {
	const TIMEOUT = 30 * time.Second
	ctx, cancel := context.WithTimeout(context.Background(), TIMEOUT)
	defer cancel()
	client, err := storage.NewClient(ctx)
	if err != nil {
		panic(err)
	}
	bucketName := os.Getenv("GOOGLE_BUCKET_NAME")
	bucket := client.Bucket(bucketName)
	return &Storage{storage: bucket, bucketName: bucketName}
}

func (s *Storage) Create(ctx context.Context, file *File) error {
	writer := s.storage.Object(file.Filename).NewWriter(ctx)
	defer writer.Close()
	if _, err := io.Copy(writer, file.File); err != nil {
		return err
	}
	return nil
}

func (s *Storage) Delete(ctx context.Context, filename string) error {
	if err := s.storage.Object(filename).Delete(ctx); err != nil {
		return err
	}
	return nil
}

func (s *Storage) ObjectURL(objectName string) string {
	return path.Join(GOOGLE_STORAGE_HOST, s.bucketName, objectName)
}
func (s *Storage) ObjectName(url string) string {
	return url[len(path.Join(GOOGLE_STORAGE_HOST, s.bucketName)+"/"):]
}
