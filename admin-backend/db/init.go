package db

import (
	"admin-backend/config"
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

type DB struct {
	Client *sql.DB
}

var db *DB

func Init() {
	c := config.GetConfig()
	dsn := fmt.Sprintf("user=%s password=%s host=%s dbname=%s sslmode=%s",
		os.Getenv("POSTGRES_USER"), os.Getenv("POSTGRES_PASSWORD"), os.Getenv("POSTGRES_HOST"),
		os.Getenv("POSTGRES_NAME"), os.Getenv("POSTGRES_SSLMODE"))
	client, err := sql.Open(c.GetString("db.provider"), dsn)
	if err != nil {
		panic(err)
	}
	db = &DB{Client: client}
}

func GetDB() *DB {
	return db
}

func Close() {
	db.Client.Close()
}
