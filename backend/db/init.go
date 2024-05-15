package db

import (
	"fmt"
	"os"
	"time"

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
	client, err := connect(dsn)
	if err != nil {
		panic(err)
	}
	db = &DB{Client: client.Debug()}
}

func GetDB() *DB {
	return db
}

const RETRY_INTERVAL = 5

func connect(dsn string) (*gorm.DB, error) {
	var client *gorm.DB
	var err error
	for {
		client, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err != nil {
			fmt.Printf("Failed to connect to database. Retrying in %d seconds.\n", RETRY_INTERVAL)
			time.Sleep(RETRY_INTERVAL * time.Second)
			continue
		}
		db, err := client.DB()
		if err != nil {
			fmt.Printf("Failed to access to database. Retrying in %d seconds.\n", RETRY_INTERVAL)
			time.Sleep(RETRY_INTERVAL * time.Second)
			continue
		}
		err = db.Ping()
		if err != nil {
			fmt.Printf("Failed to ping database. Retrying in %d seconds.\n", RETRY_INTERVAL)
			time.Sleep(RETRY_INTERVAL * time.Second)
			continue
		}
		break
	}
	return client, nil
}
