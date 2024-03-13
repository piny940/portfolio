package loader

type Loaders struct {
	BlogTagLoader IBlogTagLoader
}

func NewLoaders() *Loaders {
	return &Loaders{
		BlogTagLoader: newBlogTagLoader(),
	}
}

func mapIdToIndex(ids []uint) map[uint]int {
	result := make(map[uint]int, len(ids))
	for i, id := range ids {
		result[id] = i
	}
	return result
}
