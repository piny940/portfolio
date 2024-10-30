package loader

import (
	"backend/domain"
	"backend/usecase"
	"context"
	"testing"

	"github.com/graph-gophers/dataloader/v7"
	"github.com/maxatome/go-testdeep/td"
)

type technologyUsecase struct {
	Technologies []*domain.Technology
}

// Delete implements usecase.ITechnologyUsecase.
func (t *technologyUsecase) Delete(ctx context.Context, id uint) (*domain.Technology, error) {
	panic("unimplemented")
}

// Find implements usecase.ITechnologyUsecase.
func (t *technologyUsecase) Find(ctx context.Context, id uint) (*domain.Technology, error) {
	panic("unimplemented")
}

// List implements usecase.ITechnologyUsecase.
func (t *technologyUsecase) List(ctx context.Context) ([]*domain.Technology, error) {
	panic("unimplemented")
}

// Create implements usecase.ITechnologyUsecase.
func (t *technologyUsecase) Create(ctx context.Context, input domain.TechnologyInput) (*domain.Technology, error) {
	panic("unimplemented")
}

// FindAll implements usecase.ITechnologyUsecase.
func (t *technologyUsecase) FindAll(ctx context.Context, ids []uint) ([]*domain.Technology, error) {
	techs := make([]*domain.Technology, len(ids))
	allTechsById := make(map[uint]*domain.Technology, len(t.Technologies))
	for _, tech := range t.Technologies {
		allTechsById[tech.ID] = tech
	}
	for i, id := range ids {
		// 順序はidsとは異なるようにする
		techs[len(techs)-i-1] = allTechsById[id]
	}
	return techs, nil
}

// Update implements usecase.ITechnologyUsecase.
func (t *technologyUsecase) Update(ctx context.Context, id uint, input domain.TechnologyInput) (*domain.Technology, error) {
	panic("unimplemented")
}

func newTechnologyUsecase(technologies []*domain.Technology) usecase.ITechnologyUsecase {
	return &technologyUsecase{Technologies: technologies}
}

func TestEmptyTechnology(t *testing.T) {
	uc := newTechnologyUsecase([]*domain.Technology{})
	loader := &technologyLoader{uc}
	actual := loader.TechnologyBatch(context.Background(), []uint{})
	expected := []*dataloader.Result[*domain.Technology]{}
	td.Cmp(t, actual, expected)
}

func TestGetNoTechnology(t *testing.T) {
	uc := newTechnologyUsecase([]*domain.Technology{
		{ID: 0, Name: "tech0"},
	})
	loader := &technologyLoader{uc}
	actual := loader.TechnologyBatch(context.Background(), []uint{})
	expected := []*dataloader.Result[*domain.Technology]{}
	td.Cmp(t, actual, expected)
}

func TestGetSingleTechnology(t *testing.T) {
	techs := []*domain.Technology{{ID: 0, Name: "tech0"}}
	uc := newTechnologyUsecase(techs)
	loader := &technologyLoader{uc}
	actual := loader.TechnologyBatch(context.Background(), []uint{0})
	expected := []*dataloader.Result[*domain.Technology]{
		{Data: techs[0]},
	}
	td.Cmp(t, actual, expected)
}

func TestMultipleTechnologiesOrder(t *testing.T) {
	techs := []*domain.Technology{
		{ID: 0, Name: "tech0"},
		{ID: 1, Name: "tech1"},
		{ID: 2, Name: "tech2"},
	}
	uc := newTechnologyUsecase(techs)
	loader := &technologyLoader{uc}
	actual := loader.TechnologyBatch(context.Background(), []uint{2, 0})
	expected := []*dataloader.Result[*domain.Technology]{
		{Data: techs[2]}, {Data: techs[0]},
	}
	td.Cmp(t, actual, expected)
}
