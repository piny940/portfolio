package loader

import (
	"backend/domain"
	"backend/registry"

	"github.com/graph-gophers/dataloader/v7"
)

type Loaders struct {
	BlogTagLoader IBlogTagLoader
}

func NewLoaders(reg registry.IRegistry) *Loaders {
	blogLoader := &blogLoader{reg}
	return &Loaders{
		BlogTagLoader: dataloader.NewBatchedLoader(
			blogLoader.BlogTagsBatch,
			dataloader.WithClearCacheOnBatch[uint, []*domain.BlogTag](),
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
