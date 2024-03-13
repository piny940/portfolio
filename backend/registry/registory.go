package registry

import (
	"backend/db"
	"backend/usecase"
)

type registry struct {
	db *db.DB
}
type IRegistry interface {
	ProjectUsecase() usecase.IProjectUsecase
	BlogUsecase() usecase.IBlogUsecase
	TechnologyUsecase() usecase.ITechnologyUsecase
	TechStackUsecase() usecase.ITechStackUsecase
}

var reg *registry

func Init(db *db.DB) {
	reg = &registry{db: db}
}

func GetRegistry() IRegistry {
	return reg
}

func (r *registry) ProjectUsecase() usecase.IProjectUsecase {
	repo := db.NewProjectRepo(r.db)
	return usecase.NewProjectUsecase(repo)
}

func (r *registry) BlogUsecase() usecase.IBlogUsecase {
	repo := db.NewBlogRepo(r.db)
	return usecase.NewBlogUsecase(repo)
}

func (r *registry) TechnologyUsecase() usecase.ITechnologyUsecase {
	repo := db.NewTechnologyRepo(r.db)
	return usecase.NewTechnologyUsecase(repo)
}

func (r *registry) TechStackUsecase() usecase.ITechStackUsecase {
	repo := db.NewTechStackRepo(r.db)
	return usecase.NewTechStackUsecase(repo)
}
