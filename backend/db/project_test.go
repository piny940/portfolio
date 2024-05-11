package db

import (
	"backend/domain"
	"fmt"
	"testing"

	"github.com/bluele/factory-go/factory"
)

var defaultPosition = 0
var projectF = factory.NewFactory(
	&domain.ProjectInput{
		Description: "This is a project",
		IsFavorite:  false,
		Position:    &defaultPosition,
	},
).SeqInt("ID", func(n int) (interface{}, error) {
	return fmt.Sprintf("Project%d", n), nil
}).Attr("Title", func(args factory.Args) (interface{}, error) {
	project := args.Instance().(*domain.ProjectInput)
	return project.ID, nil
})

func TestCreateProject(t *testing.T) {
	tt := map[string]*domain.ProjectInput{
		"Position not null": {ID: "Project1", Position: &defaultPosition},
		"Position null":     {ID: "Project2", IsFavorite: false},
	}
	repo := NewProjectRepo(db)
	for name, project := range tt {
		t.Run(name, func(t *testing.T) {
			var beforeCount int
			db.Client.Raw("select count(*) from projects").Scan(&beforeCount)
			repo.Create(*project)
			var afterCount int
			db.Client.Raw("select count(*) from projects").Scan(&afterCount)
			if afterCount != beforeCount+1 {
				t.Errorf("project not created")
			}
			var actual domain.Project
			result := db.Client.First(&actual, "id = ?", project.ID)
			fmt.Println(actual)
			if result.Error != nil || actual.ID != project.ID {
				t.Errorf("project not found: %v", result.Error)
			}
		})
	}
}

func TestListProjects(t *testing.T) {
	length := 2
	repo := NewProjectRepo(db)
	projects := make([]*domain.ProjectInput, length)
	for i := 0; i < length; i++ {
		project := projectF.MustCreate().(*domain.ProjectInput)
		projects[i] = project
	}
	repo.Create(*projects[0])
	repo.Create(*projects[1])
	actual, err := repo.List()
	if err != nil {
		t.Errorf("failed to list projects: %v", err)
	}
	if len(actual) != 2 {
		t.Errorf("expected 2 projects, got %d", len(actual))
	}
}
