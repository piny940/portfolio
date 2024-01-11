package server

import (
	"admin-backend/config"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func Init() error {
	c := config.GetConfig()
	e := echo.New()
	router := e.Group(c.GetString("server.version"))

	router.Use(EchoContextToContextMiddleware)
	router.Any("/query", graphqlHandler())
	router.GET("", playgroundHandler())
	e.Use(corsHandler())
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Logger.Fatal(e.Start(":" + c.GetString("server.port")))
	return nil
}
