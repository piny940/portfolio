package usecase

import (
	"backend/domain"
	"slices"
)

type IProjectUsecase interface {
	List() ([]*domain.Project, error)
	Find(id string) (*domain.Project, error)
	Create(input domain.ProjectInput) (*domain.Project, error)
	Update(input domain.ProjectInput) (*domain.Project, error)
	UpdatePositions(input domain.UpdateProjectOrderInput) ([]*domain.Project, error)
	Delete(id string) (*domain.Project, error)
	ListTags(projectIds []string) ([]*domain.ProjectTag, error)
	UpdateTags(projectId string, technologyIds []uint) ([]*domain.ProjectTag, error)
}
type projectUsecase struct {
	repo domain.IProjectRepo
}

func (u *projectUsecase) Create(input domain.ProjectInput) (*domain.Project, error) {
	if err := input.IsTitleValid(); err != nil {
		return nil, err
	}
	if err := input.IsDescriptionValid(); err != nil {
		return nil, err
	}
	return u.repo.Create(input)
}

func (u *projectUsecase) Delete(id string) (*domain.Project, error) {
	return u.repo.Delete(id)
}

func (u *projectUsecase) Find(id string) (*domain.Project, error) {
	return u.repo.Find(id)
}

func (u *projectUsecase) List() ([]*domain.Project, error) {
	return u.repo.List()
}

func (u *projectUsecase) Update(input domain.ProjectInput) (*domain.Project, error) {
	if err := input.IsTitleValid(); err != nil {
		return nil, err
	}
	if err := input.IsDescriptionValid(); err != nil {
		return nil, err
	}
	return u.repo.Update(input)
}

func (u *projectUsecase) ListTags(projectIds []string) ([]*domain.ProjectTag, error) {
	return u.repo.ListTags(projectIds)
}

func (u *projectUsecase) UpdateTags(projectId string, technologyIds []uint) ([]*domain.ProjectTag, error) {
	return u.repo.UpdateTags(projectId, technologyIds)
}

func (u *projectUsecase) UpdatePositions(input domain.UpdateProjectOrderInput) ([]*domain.Project, error) {
	allProjects, err := u.repo.List()
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
		newProject, err := u.repo.Update(projectInput)
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
