package registry

import (
	"admin-backend/db"
	"admin-backend/usecase"
)

type registry struct {
	db *db.DB
}

var reg *registry

func Init(db *db.DB) {
	reg = &registry{db: db}
}

func GetRegistry() *registry {
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
