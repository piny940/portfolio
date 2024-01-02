package main

import (
	"admin-backend/config"
	"admin-backend/db"
	"admin-backend/registry"
	"admin-backend/server"
	"flag"
)

func main() {
	env := flag.String("e", "development", "set environment")
	flag.Parse()

	config.Init(*env)
	db.Init()
	registry.Init(db.GetDB())
	defer db.Close()

	if err := server.Init(); err != nil {
		panic(err)
	}
}
