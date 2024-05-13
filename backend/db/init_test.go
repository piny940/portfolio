package db

import (
	"os"
	"testing"

	"github.com/joho/godotenv"
	"gorm.io/gorm"
)

var gormClient *gorm.DB

func TestMain(m *testing.M) {
	err := godotenv.Load("../.env.test")
	if err != nil {
		panic(err)
	}
	Init()
	gormClient = db.Client
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
