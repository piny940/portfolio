package db

import (
	"backend/domain"
	"fmt"
	"testing"
	"time"

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

func createProjectTechnologyTag(t *testing.T, projectID string, technologyID uint) error {
	t.Helper()
	now := time.Now().UTC()
	result := db.Client.Exec(
		"insert into project_technology_tags (project_id, technology_id, created_at, updated_at) values (?, ?, ?, ?)",
		projectID,
		technologyID,
		now, now,
	)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func TestCreateProject(t *testing.T) {
	setup(t)
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
			if result.Error != nil || actual.ID != project.ID {
				t.Errorf("project not found: %v", result.Error)
			}
		})
	}
}

func TestListProjects(t *testing.T) {
	setup(t)
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

func TestListProjectTagsComplex(t *testing.T) {
	setup(t)
	length := 5
	pRepo := NewProjectRepo(db)
	tRepo := NewTechnologyRepo(db)
	techs := make([]*domain.Technology, length)
	for i := 0; i < length; i++ {
		tech := technologyF.MustCreate().(*domain.TechnologyInput)
		newTech, err := tRepo.Create(*tech)
		if err != nil {
			t.Errorf("failed to create technology: %v", err)
		}
		techs[i] = newTech
	}
	projects := make([]*domain.ProjectInput, length)
	for i := 0; i < length; i++ {
		project := projectF.MustCreate().(*domain.ProjectInput)
		projects[i] = project
		pRepo.Create(*project)
	}
	for pi := 0; pi < 3; pi++ {
		for ti := pi; ti < pi+2; ti++ {
			createProjectTechnologyTag(t, projects[pi].ID, techs[ti].ID)
		}
	}
	var count int
	db.Client.Raw("select count(*) from project_technology_tags").Scan(&count)
	tags, err := pRepo.ListTags([]string{projects[0].ID, projects[1].ID})
	if err != nil {
		t.Errorf("should not fail: %v", err)
	}
	expected := []*domain.ProjectTag{
		{ProjectID: projects[0].ID, Technology: techs[0]},
		{ProjectID: projects[0].ID, Technology: techs[1]},
		{ProjectID: projects[1].ID, Technology: techs[1]},
		{ProjectID: projects[1].ID, Technology: techs[2]},
	}
	if len(tags) != len(expected) {
		t.Errorf("expected %d tags, got %d", len(expected), len(tags))
	}
	for i, tag := range tags {
		if tag.ProjectID != expected[i].ProjectID {
			t.Errorf("expected %s, got %s", expected[i].ProjectID, tag.ProjectID)
		}
		if tag.Technology.ID != expected[i].Technology.ID {
			t.Errorf("expected %d, got %d", expected[i].Technology.ID, tag.Technology.ID)
		}
	}
}

func TestUpdateProjectTags(t *testing.T) {
	setup(t)
	length := 5
	pRepo := NewProjectRepo(db)
	tRepo := NewTechnologyRepo(db)
	techs := make([]*domain.Technology, length)
	for i := 0; i < length; i++ {
		tech := technologyF.MustCreate().(*domain.TechnologyInput)
		newTech, err := tRepo.Create(*tech)
		if err != nil {
			t.Errorf("failed to create technology: %v", err)
		}
		techs[i] = newTech
	}
	project := projectF.MustCreate().(*domain.ProjectInput)
	pRepo.Create(*project)
	t.Run("Add tags", func(t *testing.T) {
		_, err := pRepo.UpdateTags(project.ID, []uint{techs[0].ID, techs[1].ID})
		if err != nil {
			t.Errorf("should not fail: %v", err)
		}
		tags, _ := pRepo.ListTags([]string{project.ID})
		if len(tags) != 2 {
			t.Errorf("expected 2 tags, got %d", len(tags))
		}
		if tags[0].Technology.ID != techs[0].ID || tags[1].Technology.ID != techs[1].ID {
			t.Errorf("expected %d and %d, got %d and %d", techs[0].ID, techs[1].ID, tags[0].Technology.ID, tags[1].Technology.ID)
		}
	})
	t.Run("Remove tags", func(t *testing.T) {
		_, err := pRepo.UpdateTags(project.ID, []uint{techs[0].ID})
		if err != nil {
			t.Errorf("should not fail: %v", err)
		}
		tags, _ := pRepo.ListTags([]string{project.ID})
		if len(tags) != 1 {
			t.Errorf("expected 1 tag, got %d", len(tags))
		}
		if tags[0].Technology.ID != techs[0].ID {
			t.Errorf("expected %d, got %d", techs[0].ID, tags[0].Technology.ID)
		}
	})
}
