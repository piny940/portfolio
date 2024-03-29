package server

import (
	"backend/graph"
	"backend/loader"
	"backend/registry"
	"backend/resolver"
	"context"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/labstack/echo/v4"
)

func graphqlHandler() echo.HandlerFunc {
	reg := registry.GetRegistry()
	graphql := handler.NewDefaultServer(
		graph.NewExecutableSchema(
			graph.Config{
				Resolvers: &resolver.Resolver{
					Loaders: loader.NewLoaders(reg),
					Reg:     reg,
				},
			},
		),
	)

	return func(c echo.Context) error {
		graphql.ServeHTTP(c.Response(), c.Request())
		return nil
	}
}
func playgroundHandler() echo.HandlerFunc {
	handler := playground.Handler("GraphQL playground", "/v1/query")

	return func(c echo.Context) error {
		handler.ServeHTTP(c.Response(), c.Request())
		return nil
	}
}
func EchoContextToContextMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		ctx := context.WithValue(c.Request().Context(), "echoContext", c)
		c.SetRequest(c.Request().WithContext(ctx))
		return next(c)
	}
}
