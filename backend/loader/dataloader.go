package loader

import (
	"backend/domain"
	"backend/registry"

	"github.com/graph-gophers/dataloader/v7"
)

type Loaders struct {
	BlogTagLoader    IBlogTagLoader
	ProjectTagLoader IProjectTagLoader
}

func NewLoaders(reg registry.IRegistry) *Loaders {
	blogLoader := &blogLoader{reg.BlogUsecase()}
	projectLoader := &projectLoader{reg.ProjectUsecase()}
	return &Loaders{
		BlogTagLoader: dataloader.NewBatchedLoader(
			blogLoader.blogTagsBatch,
			dataloader.WithClearCacheOnBatch[uint, []*domain.BlogTag](),
		),
		ProjectTagLoader: dataloader.NewBatchedLoader(
			projectLoader.projectTagsBatch,
			dataloader.WithClearCacheOnBatch[string, []*domain.ProjectTag](),
		),
	}
}

func mapIdToIndex(ids []uint) map[uint]int {
	result := make(map[uint]int, len(ids))
	for i, id := range ids {
		result[id] = i
	}
	return result
}
