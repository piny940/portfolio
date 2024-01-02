package model

import "admin-backend/domain"

var blogKindMap = map[domain.BlogKind]BlogKind{
	domain.BlogQiita: BlogKindQiita,
}

func NewBlog(blog *domain.Blog) *Blog {
	return &Blog{
		ID:        blog.ID,
		Title:     blog.Title,
		URL:       blog.Url,
		Kind:      blogKindMap[blog.Kind],
		CreatedAt: blog.CreatedAt,
		UpdatedAt: blog.UpdatedAt,
	}
}
