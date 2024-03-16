package loader

import (
	"backend/domain"
	"backend/registry"
	"backend/usecase"
	"context"
	"testing"

	dataloader "github.com/graph-gophers/dataloader/v7"
	"github.com/maxatome/go-testdeep/td"
)

var sampleTechnologies = []*domain.Technology{
	{ID: 0, Name: "tech0"},
	{ID: 1, Name: "tech1"},
	{ID: 2, Name: "tech2"},
	{ID: 3, Name: "tech3"},
	{ID: 4, Name: "tech4"},
}
var sampleBlogs = []*domain.Blog{
	{ID: 0, Title: "title0", Url: "url0", Kind: domain.BlogKindQiita},
	{ID: 1, Title: "title1", Url: "url1", Kind: domain.BlogKindQiita},
	{ID: 2, Title: "title2", Url: "url2", Kind: domain.BlogKindQiita},
	{ID: 3, Title: "title3", Url: "url3", Kind: domain.BlogKindQiita},
}
var tagsByBlogId = map[uint][]*domain.BlogTag{
	0: {
		{Technology: *sampleTechnologies[0], BlogID: 0},
	},
	1: {},
	2: {
		{Technology: *sampleTechnologies[0], BlogID: 2},
		{Technology: *sampleTechnologies[1], BlogID: 2},
		{Technology: *sampleTechnologies[2], BlogID: 2},
		{Technology: *sampleTechnologies[3], BlogID: 2},
	},
	3: {
		{Technology: *sampleTechnologies[2], BlogID: 3},
		{Technology: *sampleTechnologies[3], BlogID: 3},
	},
}

type blogUsecase struct{}

func (b *blogUsecase) Create(input domain.BlogInput) (*domain.Blog, error) {
	panic("unimplemented")
}

func (b *blogUsecase) Delete(id uint) (*domain.Blog, error) {
	panic("unimplemented")
}

func (b *blogUsecase) Find(id uint) (*domain.Blog, error) {
	panic("unimplemented")
}

func (b *blogUsecase) List() ([]*domain.Blog, error) {
	panic("unimplemented")
}

func (b *blogUsecase) Update(id uint, input domain.BlogInput) (*domain.Blog, error) {
	panic("unimplemented")
}
func (b *blogUsecase) ListTags(blogIds []uint) ([]*domain.BlogTag, error) {
	blogTags := make([]*domain.BlogTag, 0)
	for _, blogId := range blogIds {
		blogTags = append(blogTags, tagsByBlogId[blogId]...)
	}
	return blogTags, nil
}

func (b *blogUsecase) UpdateTags(blogId uint, technologyIds []uint) ([]*domain.BlogTag, error) {
	panic("unimplemented")
}

type regMock struct{}

func (r regMock) BlogUsecase() usecase.IBlogUsecase {
	return &blogUsecase{}
}
func (r regMock) ProjectUsecase() usecase.IProjectUsecase {
	panic("unimplemented")
}
func (r regMock) TechStackUsecase() usecase.ITechStackUsecase {
	panic("unimplemented")
}
func (r regMock) TechnologyUsecase() usecase.ITechnologyUsecase {
	panic("unimplemented")
}

func newRegistry() registry.IRegistry {
	return regMock{}
}

func TestGetBlogTagsEmpty(t *testing.T) {
	reg := newRegistry()
	blogLoader := &blogLoader{reg}
	actual := blogLoader.BlogTagsBatch(context.Background(), []uint{})
	expected := []*dataloader.Result[[]*domain.BlogTag]{}
	td.Cmp(t, actual, expected)
}

func TestGetBlogTagsSingle(t *testing.T) {
	reg := newRegistry()
	blogLoader := &blogLoader{reg}
	actual := blogLoader.BlogTagsBatch(context.Background(), []uint{0})
	expected := []*dataloader.Result[[]*domain.BlogTag]{
		{Data: tagsByBlogId[0]},
	}
	td.Cmp(t, actual, expected)
}

func TestGetBlogTagsEmptyTag(t *testing.T) {
	reg := newRegistry()
	blogLoader := &blogLoader{reg}
	actual := blogLoader.BlogTagsBatch(context.Background(), []uint{1})
	expected := []*dataloader.Result[[]*domain.BlogTag]{
		{Data: tagsByBlogId[1]},
	}
	td.Cmp(t, actual, expected)
}

func TestBlogTagsOrder(t *testing.T) {
	reg := newRegistry()
	blogLoader := &blogLoader{reg}
	actual := blogLoader.BlogTagsBatch(context.Background(), []uint{2, 3, 0})
	expected := []*dataloader.Result[[]*domain.BlogTag]{
		{Data: tagsByBlogId[2]},
		{Data: tagsByBlogId[3]},
		{Data: tagsByBlogId[0]},
	}
	td.Cmp(t, actual, expected)
}
func TestGetBlogTagsComplex(t *testing.T) {
	reg := newRegistry()
	blogLoader := &blogLoader{reg}
	actual := blogLoader.BlogTagsBatch(context.Background(), []uint{3, 0, 1})
	expected := []*dataloader.Result[[]*domain.BlogTag]{
		{Data: tagsByBlogId[3]},
		{Data: tagsByBlogId[0]},
		{Data: tagsByBlogId[1]},
	}
	td.Cmp(t, actual, expected)
}
