package main

import (
	"backend/config"
	"backend/db"
	"backend/registry"
	"backend/server"
	"flag"
)

func main() {
	env := flag.String("e", "development", "set environment")
	flag.Parse()

	config.Init(*env)
	db.Init()
	registry.Init(db.GetDB())

	if err := server.Init(); err != nil {
		panic(err)
	}
}
