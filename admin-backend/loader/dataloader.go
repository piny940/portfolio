package loader

type Loaders struct {
}

func NewLoaders() *Loaders {
	return &Loaders{}
}

func mapIdToIndex(ids []uint) map[uint]int {
	result := make(map[uint]int, len(ids))
	for i, id := range ids {
		result[id] = i
	}
	return result
}
