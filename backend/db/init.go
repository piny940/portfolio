package db

import (
	"database/sql"
	"fmt"
	"os"
	"strconv"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/kelseyhightower/envconfig"
	migrate "github.com/rubenv/sql-migrate"
)

type DB struct {
	Client *gorm.DB
}
type Config struct {
	User          string `required:"true"`
	Password      string `required:"true"`
	Host          string `required:"true"`
	DBName        string `envconfig:"NAME" required:"true"`
	SSLMode       string `required:"true" split_words:"true"`
	TryLimit      int    `default:"0" split_words:"true"`
	MigrationsDir string `required:"true" split_words:"true"`
	Debug         bool   `default:"false"`
}

var db *DB

func Init() {
	conf := &Config{}
	err := envconfig.Process("DB", conf)
	if err != nil {
		panic(err)
	}
	dsn := fmt.Sprintf("user=%s password=%s host=%s dbname=%s sslmode=%s",
		conf.User, conf.Password, conf.Host, conf.DBName, conf.SSLMode)
	tryLimit, err := strconv.Atoi(os.Getenv("DB_TRY_LIMIT"))
	if err != nil {
		tryLimit = 0
	}
	client, err := connect(dsn, tryLimit)
	if err != nil {
		panic(err)
	}
	sql, err := client.DB()
	if err != nil {
		panic(err)
	}
	err = Migrate(sql, conf)
	if err != nil {
		panic(err)
	}
	if conf.Debug {
		client = client.Debug()
	}
	db = &DB{Client: client}
}

func GetDB() *DB {
	return db
}

const RETRY_INTERVAL = 5

func connect(dsn string, tryLimit int) (*gorm.DB, error) {
	var client *gorm.DB
	var err error
	tryCount := 0
	for {
		if tryLimit > 0 && tryCount >= tryLimit {
			return nil, fmt.Errorf("failed to connect to database %d times", tryCount)
		}
		tryCount += 1
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

func Migrate(db *sql.DB, conf *Config) error {
	migrations := &migrate.FileMigrationSource{Dir: conf.MigrationsDir}

	n, err := migrate.Exec(db, "postgres", migrations, migrate.Up)
	if err != nil {
		return err
	}
	fmt.Println("Applied", n, "migrations")
	return nil
}
