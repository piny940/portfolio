package server

import (
	"backend/auth"
	"backend/config"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/labstack/echo/v4"
)

func authHandler() echo.MiddlewareFunc {
	return echo.MiddlewareFunc(func(next echo.HandlerFunc) echo.HandlerFunc {
		return echo.HandlerFunc(func(c echo.Context) error {
			conf := config.GetConfig()
			if c.Path() == fmt.Sprintf("/%s/login", conf.GetString("server.version")) {
				return next(c)
			}

			authorization := c.Request().Header.Get("Authorization")
			token := strings.TrimPrefix(authorization, "Bearer ")

			userId, err := auth.VerifyJWTToken(token)
			if err != nil || (userId != os.Getenv("ADMIN_ID") && (userId != os.Getenv("OIDC_SUB"))) {
				return c.JSON(http.StatusUnauthorized, echo.Map{
					"message": "invalid token",
				})
			}

			return next(c)
		})
	})
}

func loginHandler() echo.HandlerFunc {
	return func(c echo.Context) error {
		userId := c.FormValue("id")
		password := c.FormValue("password")
		if userId != os.Getenv("ADMIN_ID") || password != os.Getenv("ADMIN_PASSWORD") {
			return c.JSON(http.StatusBadRequest, echo.Map{
				"message": "invalid id or password",
			})
		}
		token, err := auth.CreateJWTToken(userId)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}
		return c.JSON(http.StatusOK, echo.Map{
			"token": token,
		})
	}
}
