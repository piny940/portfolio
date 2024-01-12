package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.42

import (
	"backend/auth"
	"backend/domain"
	"context"
	"fmt"
	"os"
)

func (r *mutationResolver) Login(ctx context.Context, input domain.AuthInput) (string, error) {
	if input.ID != os.Getenv("ADMIN_ID") || input.Password != os.Getenv("ADMIN_PASSWORD") {
		return "", fmt.Errorf("invalid id or password")
	}
	token, err := auth.CreateJWTToken(input.ID)
	if err != nil {
		return "", err
	}
	return token, nil
}
