package db

import (
	"fmt"
	"os"
	"testing"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var gormClient *gorm.DB

func TestMain(m *testing.M) {
	err := godotenv.Load("../.env.test")
	if err != nil {
		panic(err)
	}
	initDB()
	code := m.Run()
	os.Exit(code)
}

func setup(t *testing.T) {
	t.Helper()
	t.Cleanup(teardown)
	tx := gormClient.Begin()
	db = &DB{Client: tx.Debug()}
}
func teardown() {
	db.Client.Rollback()
}

func initDB() {
	dsn := fmt.Sprintf("user=%s password=%s host=%s dbname=%s sslmode=%s",
		os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_HOST"),
		os.Getenv("DB_NAME"), os.Getenv("DB_SSLMODE"))
	client, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	gormClient = client
}
