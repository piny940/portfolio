package db

import (
	"admin-backend/domain"
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DB struct {
	Client *gorm.DB
}

var db *DB

func Init() {
	dsn := fmt.Sprintf("user=%s password=%s host=%s dbname=%s sslmode=%s",
		os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_HOST"),
		os.Getenv("DB_NAME"), os.Getenv("DB_SSLMODE"))
	client, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	client.AutoMigrate(&domain.Project{}, &domain.Blog{}, &domain.Technology{})
	db = &DB{Client: client}
}

func GetDB() *DB {
	return db
}
