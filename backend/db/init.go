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
		&BlogTechnologyTag{},
		&ProjectTechnologyTag{},
		&ProjectLink{},
		&domain.TechStack{},
	); err != nil {
		panic(err)
	}
	db = &DB{Client: client.Debug()}
	db.Migrate()
}

func GetDB() *DB {
	return db
}

func (db *DB) Migrate() {
	if err := db.Client.SetupJoinTable(&domain.Blog{}, "Tags", &BlogTechnologyTag{}); err != nil {
		panic(err)
	}
	if err := db.Client.SetupJoinTable(&domain.Project{}, "Tags", &ProjectTechnologyTag{}); err != nil {
		panic(err)
	}
	if err := db.Client.Migrator().DropConstraint(&ProjectLink{}, "fk_project_links_project"); err != nil {
		panic(err)
	}
	if err := db.Client.Migrator().CreateConstraint(&ProjectLink{}, "fk_project_links_project"); err != nil {
		panic(err)
	}
	if err := db.Client.Migrator().DropConstraint(&ProjectTechnologyTag{}, "fk_project_technology_tags_project"); err != nil {
		panic(err)
	}
	if err := db.Client.Migrator().CreateConstraint(&ProjectTechnologyTag{}, "fk_project_technology_tags_project"); err != nil {
		panic(err)
	}
	if err := db.Client.Migrator().DropConstraint(&BlogTechnologyTag{}, "fk_blog_technology_tags_blog"); err != nil {
		panic(err)
	}
	if err := db.Client.Migrator().CreateConstraint(&BlogTechnologyTag{}, "fk_blog_technology_tags_blog"); err != nil {
		panic(err)
	}
}
