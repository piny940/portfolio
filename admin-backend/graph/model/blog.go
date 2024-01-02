package model

import "admin-backend/domain"

var BlogKindToModel = map[domain.BlogKind]BlogKind{
	domain.BlogQiita: BlogKindQiita,
}
var BlogKindToDomain = map[BlogKind]domain.BlogKind{
	BlogKindQiita: domain.BlogQiita,
}

func NewBlog(blog *domain.Blog) *Blog {
	return &Blog{
		ID:        blog.ID,
		Title:     blog.Title,
		URL:       blog.Url,
		Kind:      BlogKindToModel[blog.Kind],
		CreatedAt: blog.CreatedAt,
		UpdatedAt: blog.UpdatedAt,
	}
}

func NewBlogs(blogs []*domain.Blog) []*Blog {
	var result = make([]*Blog, 0, len(blogs))
	for _, blog := range blogs {
		result = append(result, NewBlog(blog))
	}
	return result
}
