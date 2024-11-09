package server

import (
	"backend/auth"
	"backend/config"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"slices"
	"strings"

	"github.com/labstack/echo/v4"
)

var skipAuthPaths = []string{
	"/login",
	"/healthz",
}

func authHandler() echo.MiddlewareFunc {
	return echo.MiddlewareFunc(func(next echo.HandlerFunc) echo.HandlerFunc {
		return echo.HandlerFunc(func(c echo.Context) error {
			conf := config.GetConfig()
			for _, path := range skipAuthPaths {
				if c.Path() == fmt.Sprintf("/%s%s", conf.GetString("server.version"), path) {
					return next(c)
				}
			}
			if os.Getenv("SKIP_AUTH") == "true" {
				return next(c)
			}

			authorization := c.Request().Header.Get("Authorization")
			token := strings.TrimPrefix(authorization, "Bearer ")

			userId, err := auth.VerifyJWTToken(token)
			if err != nil {
				slog.Info(fmt.Sprintf("error: %v", err))
				return c.JSON(http.StatusUnauthorized, echo.Map{
					"message": "invalid token",
				})
			}
			if !userApproved(userId) {
				slog.Info(fmt.Sprintf("unapproved user: %s", userId))
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

func userApproved(userId string) bool {
	if userId == os.Getenv("ADMIN_ID") {
		return true
	}
	subs := strings.Split(os.Getenv("AUTH_OIDC_SUB"), ",")
	return slices.Contains(subs, userId)
}
