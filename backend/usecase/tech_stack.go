package usecase

import "backend/domain"

type ITechStackUsecase interface {
	List() ([]*domain.TechStack, error)
	Find(id uint) (*domain.TechStack, error)
	Create(input domain.TechStackInput) (*domain.TechStack, error)
	Update(id uint, input domain.TechStackInput) (*domain.TechStack, error)
	Delete(id uint) (*domain.TechStack, error)
}

type techStackUsecase struct {
	repo domain.ITechStackRepo
}

func NewTechStackUsecase(repo domain.ITechStackRepo) ITechStackUsecase {
	return &techStackUsecase{repo}
}

func (u *techStackUsecase) List() ([]*domain.TechStack, error) {
	return u.repo.List()
}

func (u *techStackUsecase) Find(id uint) (*domain.TechStack, error) {
	return u.repo.Find(id)
}

func (u *techStackUsecase) Create(input domain.TechStackInput) (*domain.TechStack, error) {
	return u.repo.Create(input)
}

func (u *techStackUsecase) Update(id uint, input domain.TechStackInput) (*domain.TechStack, error) {
	return u.repo.Update(id, input)
}

func (u *techStackUsecase) Delete(id uint) (*domain.TechStack, error) {
	return u.repo.Delete(id)
}
