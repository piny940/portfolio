package db

func diff[T comparable](actual, desired []T) ([]T, []T) {
	var (
		toDelete   []T
		toCreate  []T
		actualMap      = make(map[T]struct{})
		desiredMap     = make(map[T]struct{})
	)

	for _, a := range actual {
		actualMap[a] = struct{}{}
	}

	for _, d := range desired {
		desiredMap[d] = struct{}{}
	}

	for _, a := range actual {
		if _, ok := desiredMap[a]; !ok {
			toDelete = append(toDelete, a)
		}
	}

	for _, d := range desired {
		if _, ok := actualMap[d]; !ok {
			toCreate = append(toCreate, d)
		}
	}

	return toCreate, toDelete
}
