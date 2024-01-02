package registry

import (
	"admin-backend/db"
)

type registry struct {
	db *db.DB
}

var reg *registry

func Init(db *db.DB) {
	reg = &registry{db: db}
}

func GetRegistry() *registry {
	return reg
}
