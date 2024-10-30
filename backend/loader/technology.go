package loader

import (
	"backend/domain"
	"backend/usecase"
	"context"

	"github.com/graph-gophers/dataloader/v7"
)

type technologyLoader struct {
	uc usecase.ITechnologyUsecase
}

type ITechnologyLoader dataloader.Interface[uint, *domain.Technology]

func (t *technologyLoader) TechnologyBatch(ctx context.Context, ids []uint) []*dataloader.Result[*domain.Technology] {
	results := make([]*dataloader.Result[*domain.Technology], len(ids))
	technologies, err := t.uc.FindAll(ctx, ids)
	if err != nil {
		for i := range results {
			results[i] = &dataloader.Result[*domain.Technology]{Error: err}
		}
		return results
	}
	idToIdx := mapIdToIndex(ids)
	for _, tech := range technologies {
		idx := idToIdx[tech.ID]
		results[idx] = &dataloader.Result[*domain.Technology]{Data: tech}
	}
	return results
}
