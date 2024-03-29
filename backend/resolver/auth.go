package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.42

import (
	"backend/auth"
	"context"
	"strings"
)

func (r *queryResolver) Me(ctx context.Context) (*string, error) {
	echoCtx, err := echoContextFromContext(ctx)
	if err != nil {
		return nil, err
	}
	authorization := echoCtx.Request().Header.Get("Authorization")
	token := strings.TrimPrefix(authorization, "Bearer ")
	userId, err := auth.VerifyJWTToken(token)
	if err != nil {
		return nil, err
	}
	return &userId, nil
}
