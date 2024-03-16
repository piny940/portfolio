package loader

import "backend/registry"

type Loaders struct {
	BlogTagLoader IBlogTagLoader
}

func NewLoaders(reg registry.IRegistry) *Loaders {
	return &Loaders{
		BlogTagLoader: newBlogTagLoader(reg),
	}
}

func mapIdToIndex(ids []uint) map[uint]int {
	result := make(map[uint]int, len(ids))
	for i, id := range ids {
		result[id] = i
	}
	return result
}
