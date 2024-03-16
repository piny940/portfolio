package loader

import (
	"backend/domain"
	"backend/registry"
	"context"

	dataloader "github.com/graph-gophers/dataloader/v7"
)

type IBlogTagLoader dataloader.Interface[uint, []*domain.BlogTag]

func newBlogTagLoader(reg registry.IRegistry) IBlogTagLoader {
	return dataloader.NewBatchedLoader(
		getBlogTagsFunc(reg),
		dataloader.WithClearCacheOnBatch[uint, []*domain.BlogTag](),
	)
}

func getBlogTagsFunc(reg registry.IRegistry) dataloader.BatchFunc[uint, []*domain.BlogTag] {
	return func(ctx context.Context, blogIds []uint) []*dataloader.Result[[]*domain.BlogTag] {
		results := make([]*dataloader.Result[[]*domain.BlogTag], len(blogIds))
		blogTags, err := reg.BlogUsecase().ListTags(blogIds)
		if err != nil {
			for i := range results {
				results[i] = &dataloader.Result[[]*domain.BlogTag]{Error: err}
			}
			return results
		}

		tagsByBlogId := make(map[uint][]*domain.BlogTag, len(blogTags))
		for _, tag := range blogTags {
			tagsByBlogId[tag.BlogID] = append(tagsByBlogId[tag.BlogID], tag)
		}
		for i, blogId := range blogIds {
			tags, ok := tagsByBlogId[blogId]
			if !ok {
				tags = []*domain.BlogTag{}
			}
			results[i] = &dataloader.Result[[]*domain.BlogTag]{Data: tags}
		}
		return results
	}
}
