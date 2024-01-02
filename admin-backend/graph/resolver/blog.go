package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.42

import (
	"admin-backend/domain"
	"admin-backend/graph"
	"admin-backend/graph/model"
	"admin-backend/registry"
	"context"

	"gorm.io/gorm"
)

func (r *mutationResolver) CreateBlog(ctx context.Context, title string, url string, kind model.BlogKind) (*model.Blog, error) {
	reg := registry.GetRegistry()
	blog := &domain.Blog{
		Title: title,
		Url:   url,
		Kind:  model.BlogKindToDomain[kind],
	}
	if err := reg.BlogUsecase().Create(blog); err != nil {
		return nil, err
	}
	return model.NewBlog(blog), nil
}

func (r *mutationResolver) UpdateBlog(ctx context.Context, id uint, title string, url string, kind model.BlogKind) (*model.Blog, error) {
	reg := registry.GetRegistry()
	blog := &domain.Blog{
		Model: gorm.Model{ID: id},
		Title: title,
		Url:   url,
		Kind:  model.BlogKindToDomain[kind],
	}
	if err := reg.BlogUsecase().Update(blog); err != nil {
		return nil, err
	}
	return model.NewBlog(blog), nil
}

func (r *mutationResolver) DeleteBlog(ctx context.Context, id uint) (*model.Blog, error) {
	reg := registry.GetRegistry()
	blog, err := reg.BlogUsecase().Delete(id)
	if err != nil {
		return nil, err
	}
	return model.NewBlog(blog), nil
}

func (r *queryResolver) Blogs(ctx context.Context) ([]*model.Blog, error) {
	reg := registry.GetRegistry()
	blogs, err := reg.BlogUsecase().List()
	if err != nil {
		return nil, err
	}
	return model.NewBlogs(blogs), nil
}

func (r *queryResolver) Blog(ctx context.Context, id uint) (*model.Blog, error) {
	reg := registry.GetRegistry()
	blog, err := reg.BlogUsecase().Find(id)
	if err != nil {
		return nil, err
	}
	return model.NewBlog(blog), nil
}

func (r *Resolver) Mutation() graph.MutationResolver { return &mutationResolver{r} }

func (r *Resolver) Query() graph.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
