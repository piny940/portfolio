package loader

import (
	"backend/domain"
	"backend/usecase"
	"context"
	"testing"

	dataloader "github.com/graph-gophers/dataloader/v7"
	"github.com/maxatome/go-testdeep/td"
)

var sampleProjectTechnologies = []*domain.Technology{
	{ID: 0, Name: "tech0"},
	{ID: 1, Name: "tech1"},
	{ID: 2, Name: "tech2"},
	{ID: 3, Name: "tech3"},
	{ID: 4, Name: "tech4"},
}
var sampleProjects = []*domain.Project{
	{ID: "1", IsFavorite: false, Position: 2},
	{ID: "2", IsFavorite: true, Position: 3},
	{ID: "3", IsFavorite: false, Position: 1},
	{ID: "4", IsFavorite: true, Position: 4},
}
var tagsByProjectId = map[string][]*domain.ProjectTag{
	"1": {
		{Technology: sampleProjectTechnologies[0], ProjectID: "1"},
		{Technology: sampleProjectTechnologies[1], ProjectID: "1"},
	},
	"2": {},
	"3": {
		{Technology: sampleProjectTechnologies[0], ProjectID: "3"},
		{Technology: sampleProjectTechnologies[2], ProjectID: "3"},
		{Technology: sampleProjectTechnologies[3], ProjectID: "3"},
	},
	"4": {
		{Technology: sampleProjectTechnologies[3], ProjectID: "4"},
		{Technology: sampleProjectTechnologies[4], ProjectID: "4"},
	},
}

type projectUsecase struct {
	Technologies    []*domain.Technology
	Projects        []*domain.Project
	TagsByProjectId map[string][]*domain.ProjectTag
}

// Create implements usecase.IProjectUsecase.
func (p *projectUsecase) Create(ctx context.Context, input domain.ProjectInput) (*domain.Project, error) {
	panic("unimplemented")
}

// Delete implements usecase.IProjectUsecase.
func (p *projectUsecase) Delete(ctx context.Context, id string) (*domain.Project, error) {
	panic("unimplemented")
}

// Find implements usecase.IProjectUsecase.
func (p *projectUsecase) Find(ctx context.Context, id string) (*domain.Project, error) {
	panic("unimplemented")
}

// List implements usecase.IProjectUsecase.
func (p *projectUsecase) List(ctx context.Context) ([]*domain.Project, error) {
	panic("unimplemented")
}

// Update implements usecase.IProjectUsecase.
func (p *projectUsecase) Update(ctx context.Context, input domain.ProjectInput) (*domain.Project, error) {
	panic("unimplemented")
}

// UpdatePositions implements usecase.IProjectUsecase.
func (p *projectUsecase) UpdatePositions(ctx context.Context, input domain.UpdateProjectOrderInput) ([]*domain.Project, error) {
	panic("unimplemented")
}

// UpdateTags implements usecase.IProjectUsecase.
func (p *projectUsecase) UpdateTags(ctx context.Context, projectId string, technologyIds []uint) ([]*domain.ProjectTag, error) {
	panic("unimplemented")
}
func (p *projectUsecase) ListTags(ctx context.Context, projectIds []string) ([]*domain.ProjectTag, error) {
	projectTags := []*domain.ProjectTag{}
	for _, tags := range p.TagsByProjectId {
		projectTags = append(projectTags, tags...)
	}
	return projectTags, nil
}

var _ usecase.IProjectUsecase = &projectUsecase{}

func TestGetProjectTagsEmpty(t *testing.T) {
	uc := &projectUsecase{
		Technologies: []*domain.Technology{
			{ID: 0, Name: "tech0"},
		},
		Projects: []*domain.Project{
			{ID: "1", IsFavorite: false, Position: 2},
		},
		TagsByProjectId: map[string][]*domain.ProjectTag{
			"1": {
				{Technology: sampleProjectTechnologies[0], ProjectID: "1"},
			},
		},
	}
	loader := &projectLoader{uc: uc}
	actual := loader.projectTagsBatch(context.Background(), []string{})
	expected := []*dataloader.Result[[]*domain.ProjectTag]{}
	td.Cmp(t, actual, expected)
}

func TestGetProjectTagsSingle(t *testing.T) {
	techs := []*domain.Technology{{ID: 0, Name: "tech0"}}
	projects := []*domain.Project{{ID: "1", IsFavorite: false, Position: 2}}
	tagsByProjectId := map[string][]*domain.ProjectTag{
		"1": {{Technology: techs[0], ProjectID: "1"}},
	}
	uc := &projectUsecase{Technologies: techs, Projects: projects, TagsByProjectId: tagsByProjectId}
	loader := &projectLoader{uc: uc}
	actual := loader.projectTagsBatch(context.Background(), []string{"1"})
	expected := []*dataloader.Result[[]*domain.ProjectTag]{
		{Data: tagsByProjectId["1"]},
	}
	td.Cmp(t, actual, expected)
}
func TestGetProjectTagsEmptyTag(t *testing.T) {
	uc := &projectUsecase{
		Technologies: []*domain.Technology{
			{ID: 0, Name: "tech0"},
		},
		Projects: []*domain.Project{
			{ID: "1", IsFavorite: false, Position: 2},
		},
		TagsByProjectId: map[string][]*domain.ProjectTag{
			"1": {},
		},
	}
	loader := &projectLoader{uc: uc}
	actual := loader.projectTagsBatch(context.Background(), []string{"1"})
	expected := []*dataloader.Result[[]*domain.ProjectTag]{
		{Data: []*domain.ProjectTag{}},
	}
	td.Cmp(t, actual, expected)
}
func TestProjectTagsOrder(t *testing.T) {
	loader := &projectLoader{&projectUsecase{
		Technologies:    sampleProjectTechnologies,
		Projects:        sampleProjects,
		TagsByProjectId: tagsByProjectId,
	}}
	actual := loader.projectTagsBatch(context.Background(), []string{"3", "4", "1"})
	expected := []*dataloader.Result[[]*domain.ProjectTag]{
		{Data: tagsByProjectId["3"]},
		{Data: tagsByProjectId["4"]},
		{Data: tagsByProjectId["1"]},
	}
	td.Cmp(t, actual, expected)
}
func TestGetProjectTagsComplex(t *testing.T) {
	loader := &projectLoader{&projectUsecase{
		Technologies:    sampleProjectTechnologies,
		Projects:        sampleProjects,
		TagsByProjectId: tagsByProjectId,
	}}
	actual := loader.projectTagsBatch(context.Background(), []string{"4", "1", "2"})
	expected := []*dataloader.Result[[]*domain.ProjectTag]{
		{Data: tagsByProjectId["4"]},
		{Data: tagsByProjectId["1"]},
		{Data: tagsByProjectId["2"]},
	}
	td.Cmp(t, actual, expected)
}
