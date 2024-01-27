package usecase

import (
	"backend/domain"
	"fmt"
	"slices"
	"testing"

	"github.com/maxatome/go-testdeep/td"
)

type projectRepo struct {
	Projects []*domain.Project
}

func (repo *projectRepo) Create(input domain.ProjectInput) (*domain.Project, error) {
	panic("create unimplemented")
}
func (repo *projectRepo) Delete(id string) (*domain.Project, error) {
	panic("delete unimplemented")
}
func (repo *projectRepo) Find(id string) (*domain.Project, error) {
	panic("find unimplemented")
}
func (repo *projectRepo) List() ([]*domain.Project, error) {
	return repo.Projects, nil
}
func (repo *projectRepo) ListByIds(ids []string) (map[string]*domain.Project, error) {
	projects := make(map[string]*domain.Project, len(ids))
	for _, id := range ids {
		idx := slices.IndexFunc(repo.Projects, func(project *domain.Project) bool {
			return project.ID == id
		})
		projects[id] = repo.Projects[idx]
	}
	return projects, nil
}
func (repo *projectRepo) ListTags(projectIds []string) ([]*domain.Technology, error) {
	panic("list tags unimplemented")
}
func (repo *projectRepo) Update(input domain.ProjectInput) (*domain.Project, error) {
	for _, project := range repo.Projects {
		if project.ID != input.ID {
			continue
		}
		project.Position = *input.Position
		return project, nil
	}
	return nil, fmt.Errorf("project not found")
}
func (repo *projectRepo) UpdateTags(projectId string, technologyIds []uint) ([]*domain.Technology, error) {
	panic("update tags unimplemented")
}

var sampleProjects = []*domain.Project{
	{
		ID:         "1",
		IsFavorite: false,
		Position:   2,
	},
	{
		ID:         "2",
		IsFavorite: true,
		Position:   3,
	},
	{
		ID:         "3",
		IsFavorite: false,
		Position:   1,
	},
}

func TestList(t *testing.T) {
	usecase := NewProjectUsecase(&projectRepo{Projects: sampleProjects})
	actual, err := usecase.List()
	if err != nil {
		t.Errorf("should not fail: %s", err)
	}
	td.Cmp(t, actual, sampleProjects)
}

func TestUpdateOrder(t *testing.T) {
	usecase := NewProjectUsecase(&projectRepo{Projects: sampleProjects})
	usecase.UpdatePositions(domain.UpdateProjectOrderInput{
		Ids: []string{"2", "3"},
	})
	expected := []*domain.Project{
		{
			ID:         "1",
			IsFavorite: false,
			Position:   4,
		},
		{
			ID:         "2",
			IsFavorite: true,
			Position:   1,
		},
		{
			ID:         "3",
			IsFavorite: false,
			Position:   2,
		},
	}
	actual, err := usecase.List()
	if err != nil {
		t.Errorf("should not fail: %s", err)
	}
	td.Cmp(t, actual, expected)
}
