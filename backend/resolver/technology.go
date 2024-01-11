package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.42

import (
	"backend/domain"
	"backend/graph"
	"backend/registry"
	"context"
)

func (r *mutationResolver) CreateTechnology(ctx context.Context, input domain.TechnologyInput) (*domain.Technology, error) {
	reg := registry.GetRegistry()
	technology, err := reg.TechnologyUsecase().Create(input)
	if err != nil {
		return nil, err
	}
	return technology, nil
}

func (r *mutationResolver) UpdateTechnology(ctx context.Context, id uint, input domain.TechnologyInput) (*domain.Technology, error) {
	reg := registry.GetRegistry()
	technology, err := reg.TechnologyUsecase().Update(id, input)
	if err != nil {
		return nil, err
	}
	return technology, nil
}

func (r *mutationResolver) DeleteTechnology(ctx context.Context, id uint) (*domain.Technology, error) {
	reg := registry.GetRegistry()
	technology, err := reg.TechnologyUsecase().Delete(id)
	if err != nil {
		return nil, err
	}
	return technology, nil
}

func (r *queryResolver) Technologies(ctx context.Context) ([]*domain.Technology, error) {
	reg := registry.GetRegistry()
	technologies, err := reg.TechnologyUsecase().List()
	if err != nil {
		return nil, err
	}
	return technologies, nil
}

func (r *queryResolver) Technology(ctx context.Context, id uint) (*domain.Technology, error) {
	reg := registry.GetRegistry()
	technology, err := reg.TechnologyUsecase().Find(id)
	if err != nil {
		return nil, err
	}
	return technology, nil
}

func (r *Resolver) Mutation() graph.MutationResolver { return &mutationResolver{r} }

func (r *Resolver) Query() graph.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
