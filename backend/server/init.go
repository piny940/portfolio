package server

import (
	"backend/auth"
	"backend/config"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func Init() error {
	c := config.GetConfig()
	auth.Init()
	e := echo.New()

	router := e.Group(c.GetString("server.version"))

	router.Use(EchoContextToContextMiddleware)
	router.Use(authHandler())
	router.POST("/login", loginHandler())
	router.Any("/query", graphqlHandler())
	router.GET("", playgroundHandler())
	e.Use(corsHandler())
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Logger.Fatal(e.Start(":" + c.GetString("server.port")))
	return nil
}
