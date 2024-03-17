package loader

import (
	"backend/domain"
	"backend/usecase"
	"context"

	dataloader "github.com/graph-gophers/dataloader/v7"
)

type projectLoader struct {
	uc usecase.IProjectUsecase
}

type IProjectTagLoader dataloader.Interface[string, []*domain.ProjectTag]

func (p *projectLoader) projectTagsBatch(_ context.Context, projectIds []string) []*dataloader.Result[[]*domain.ProjectTag] {
	results := make([]*dataloader.Result[[]*domain.ProjectTag], len(projectIds))
	projectTags, err := p.uc.ListTags(projectIds)
	if err != nil {
		for i := range results {
			results[i] = &dataloader.Result[[]*domain.ProjectTag]{Error: err}
		}
		return results
	}
	projectTagsByProjectId := make(map[string][]*domain.ProjectTag, len(projectTags))
	for _, tag := range projectTags {
		projectTagsByProjectId[tag.ProjectID] = append(projectTagsByProjectId[tag.ProjectID], tag)
	}
	for i, projectId := range projectIds {
		tags, ok := projectTagsByProjectId[projectId]
		if !ok {
			tags = []*domain.ProjectTag{}
		}
		results[i] = &dataloader.Result[[]*domain.ProjectTag]{Data: tags}
	}
	return results
}
