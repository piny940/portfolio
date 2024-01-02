package model

import "admin-backend/domain"

func NewProject(project *domain.Project) *Project {
	return &Project{
		ID:          project.ID,
		Title:       project.Title,
		Description: project.Description,
		IsFavorite:  project.IsFavorite,
		CreatedAt:   project.CreatedAt,
		UpdatedAt:   project.UpdatedAt,
	}
}
func NewProjects(projects []*domain.Project) []*Project {
	var result = make([]*Project, 0)
	for _, project := range projects {
		result = append(result, NewProject(project))
	}
	return result
}
