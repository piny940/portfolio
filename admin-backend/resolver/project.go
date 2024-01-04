package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.42

import (
	"admin-backend/domain"
	"admin-backend/registry"
	"context"
)

func (r *mutationResolver) CreateProject(ctx context.Context, input domain.ProjectInput) (*domain.Project, error) {
	reg := registry.GetRegistry()
	project := &domain.Project{
		ID:          input.ID,
		Title:       input.Title,
		Description: input.Description,
		IsFavorite:  input.IsFavorite,
	}
	err := reg.ProjectUsecase().Create(project)
	if err != nil {
		return nil, err
	}
	return project, nil
}

func (r *mutationResolver) UpdateProject(ctx context.Context, input domain.ProjectInput) (*domain.Project, error) {
	reg := registry.GetRegistry()
	project := &domain.Project{
		ID:          input.ID,
		Title:       input.Title,
		Description: input.Description,
		IsFavorite:  input.IsFavorite,
	}
	err := reg.ProjectUsecase().Update(project)
	if err != nil {
		return nil, err
	}
	return project, nil
}

func (r *mutationResolver) DeleteProject(ctx context.Context, id string) (*domain.Project, error) {
	reg := registry.GetRegistry()
	project, err := reg.ProjectUsecase().Delete(id)
	if err != nil {
		return nil, err
	}
	return project, nil
}

func (r *queryResolver) Projects(ctx context.Context) ([]*domain.Project, error) {
	reg := registry.GetRegistry()
	projects, err := reg.ProjectUsecase().List()
	if err != nil {
		return nil, err
	}
	return projects, nil
}

func (r *queryResolver) Project(ctx context.Context, id string) (*domain.Project, error) {
	reg := registry.GetRegistry()
	project, err := reg.ProjectUsecase().Find(id)
	if err != nil {
		return nil, err
	}
	return project, nil
}
