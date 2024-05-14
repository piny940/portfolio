package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.42

import (
	"backend/domain"
	"backend/graph"
	"context"
)

func (r *blogResolver) Kind(ctx context.Context, obj *domain.Blog) (int, error) {
	return int(obj.Kind), nil
}

func (r *blogResolver) Tags(ctx context.Context, obj *domain.Blog) ([]*domain.BlogTag, error) {
	tags, err := r.Loaders.BlogTagLoader.Load(ctx, obj.ID)()
	if err != nil {
		return nil, err
	}
	return tags, nil
}

func (r *mutationResolver) CreateBlog(ctx context.Context, input domain.BlogInput) (*domain.Blog, error) {
	blog, err := r.Reg.BlogUsecase().Create(input)
	if err != nil {
		return nil, err
	}
	return blog, nil
}

func (r *mutationResolver) UpdateBlog(ctx context.Context, id uint, input domain.BlogInput) (*domain.Blog, error) {
	blog, err := r.Reg.BlogUsecase().Update(id, input)
	if err != nil {
		return nil, err
	}
	return blog, nil
}

func (r *mutationResolver) DeleteBlog(ctx context.Context, id uint) (*domain.Blog, error) {
	blog, err := r.Reg.BlogUsecase().Delete(id)
	if err != nil {
		return nil, err
	}
	return blog, nil
}

func (r *mutationResolver) UpdateBlogTags(ctx context.Context, id uint, tags []uint) ([]*domain.BlogTag, error) {
	technologies, err := r.Reg.BlogUsecase().UpdateTags(id, tags)
	if err != nil {
		return nil, err
	}
	return technologies, nil
}

func (r *queryResolver) Blogs(ctx context.Context, opt *domain.ListOpt) (*domain.BlogConnection, error) {
	connection, err := r.Reg.BlogUsecase().List(opt)
	if err != nil {
		return nil, err
	}
	return connection, nil
}

func (r *queryResolver) Blog(ctx context.Context, id uint) (*domain.Blog, error) {
	blog, err := r.Reg.BlogUsecase().Find(id)
	if err != nil {
		return nil, err
	}
	return blog, nil
}

func (r *Resolver) Blog() graph.BlogResolver { return &blogResolver{r} }

type blogResolver struct{ *Resolver }
