package loader

import (
	"backend/domain"
	"testing"
)

var sampleTechnologies = []*domain.Technology{
	{ID: 1, Name: "tech1"},
	{ID: 2, Name: "tech2"},
	{ID: 3, Name: "tech3"},
	{ID: 4, Name: "tech4"},
}
var sampleBlogs = []*domain.Blog{
	{ID: 1, Title: "title1", Url: "url1", Kind: domain.BlogKindQiita},
}

func TestGetBlogTags(t *testing.T) {

}
