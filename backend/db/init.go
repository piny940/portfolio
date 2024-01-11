package db

import (
	"backend/domain"
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
	if err = client.AutoMigrate(
		&domain.Project{},
		&domain.Blog{},
		&domain.Technology{},
		&domain.BlogTechnologyTag{},
		&domain.ProjectTechnologyTag{},
		&ProjectLink{},
	); err != nil {
		panic(err)
	}
	if err = client.SetupJoinTable(&domain.Blog{}, "Tags", &domain.BlogTechnologyTag{}); err != nil {
		panic(err)
	}
	if err = client.SetupJoinTable(&domain.Project{}, "Tags", &domain.ProjectTechnologyTag{}); err != nil {
		panic(err)
	}
	db = &DB{Client: client.Debug()}
}

func GetDB() *DB {
	return db
}