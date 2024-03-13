package loader

import (
	"backend/domain"
	"backend/registry"
	"context"
	"fmt"

	dataloader "github.com/graph-gophers/dataloader/v7"
)

type IBlogTagLoader dataloader.Interface[uint, []*domain.BlogTag]

func newBlogTagLoader() IBlogTagLoader {
	return dataloader.NewBatchedLoader(getBlogTags)
}

func getBlogTags(ctx context.Context, blogIds []uint) []*dataloader.Result[[]*domain.BlogTag] {
	reg := registry.GetRegistry()
	idToIndex := mapIdToIndex(blogIds)
	results := make([]*dataloader.Result[[]*domain.BlogTag], len(blogIds))
	blogTags, err := reg.BlogUsecase().ListTags(blogIds)
	if err != nil {
		for i := range results {
			results[i] = &dataloader.Result[[]*domain.BlogTag]{Error: err}
		}
		return results
	}

	tagsByBlogId := make(map[uint][]*domain.BlogTag, len(blogTags))
	fmt.Println(tagsByBlogId)
	for _, tag := range blogTags {
		tagsByBlogId[tag.BlogID] = append(tagsByBlogId[tag.BlogID], tag)
	}
	fmt.Println(tagsByBlogId)
	for blogId, tags := range tagsByBlogId {
		idx := idToIndex[blogId]
		results[idx] = &dataloader.Result[[]*domain.BlogTag]{Data: tags}
		for _, tag := range tags {
			fmt.Println(tag)
		}
	}
	return results
}
