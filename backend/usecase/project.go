package usecase

import (
	"backend/domain"
	"context"
	"slices"
)

type IProjectUsecase interface {
	List(ctx context.Context) ([]*domain.Project, error)
	Find(ctx context.Context, id string) (*domain.Project, error)
	Create(ctx context.Context, input domain.ProjectInput) (*domain.Project, error)
	Update(ctx context.Context, input domain.ProjectInput) (*domain.Project, error)
	UpdatePositions(ctx context.Context, input domain.UpdateProjectOrderInput) ([]*domain.Project, error)
	Delete(ctx context.Context, id string) (*domain.Project, error)
	ListTags(ctx context.Context, projectIds []string) ([]*domain.ProjectTag, error)
	UpdateTags(ctx context.Context, projectId string, technologyIds []uint) ([]*domain.ProjectTag, error)
}
type projectUsecase struct {
	repo domain.IProjectRepo
}

func (u *projectUsecase) Create(ctx context.Context, input domain.ProjectInput) (*domain.Project, error) {
	if err := input.IsTitleValid(); err != nil {
		return nil, err
	}
	if err := input.IsDescriptionValid(); err != nil {
		return nil, err
	}
	return u.repo.Create(ctx, input)
}

func (u *projectUsecase) Delete(ctx context.Context, id string) (*domain.Project, error) {
	return u.repo.Delete(ctx, id)
}

func (u *projectUsecase) Find(ctx context.Context, id string) (*domain.Project, error) {
	return u.repo.Find(ctx, id)
}

func (u *projectUsecase) List(ctx context.Context) ([]*domain.Project, error) {
	return u.repo.List(ctx)
}

func (u *projectUsecase) Update(ctx context.Context, input domain.ProjectInput) (*domain.Project, error) {
	if err := input.IsTitleValid(); err != nil {
		return nil, err
	}
	if err := input.IsDescriptionValid(); err != nil {
		return nil, err
	}
	return u.repo.Update(ctx, input)
}

func (u *projectUsecase) ListTags(ctx context.Context, projectIds []string) ([]*domain.ProjectTag, error) {
	return u.repo.ListTags(ctx, projectIds)
}

func (u *projectUsecase) UpdateTags(ctx context.Context, projectId string, technologyIds []uint) ([]*domain.ProjectTag, error) {
	return u.repo.UpdateTags(ctx, projectId, technologyIds)
}

func (u *projectUsecase) UpdatePositions(ctx context.Context, input domain.UpdateProjectOrderInput) ([]*domain.Project, error) {
	allProjects, err := u.repo.List(ctx)
	if err != nil {
		return nil, err
	}
	newProjects := make([]*domain.Project, len(input.Ids))
	for _, project := range allProjects {
		pos := slices.Index(input.Ids, project.ID)
		projectInput := project.ToInput()
		if pos < 0 {
			newPos := project.Position + len(input.Ids)
			projectInput.Position = &newPos
		} else {
			newPos := pos + 1
			projectInput.Position = &newPos
		}
		newProject, err := u.repo.Update(ctx, projectInput)
		if err != nil {
			return nil, err
		}
		if pos >= 0 {
			newProjects[pos] = newProject
		}
	}
	return newProjects, nil
}

func NewProjectUsecase(repo domain.IProjectRepo) IProjectUsecase {
	return &projectUsecase{repo: repo}
}
