package domain

type Technology struct {
	ID        uint    `json:"id"`
	Name      string  `json:"name"`
	LogoURL   *string `json:"logo_url,omitempty"`
	TagColor  string  `json:"tag_color"`
	CreatedAt string  `json:"createdAt"`
	UpdatedAt string  `json:"updatedAt"`
}

type ITechnologyRepo interface {
	List() ([]*Technology, error)
	Find(id uint) (*Technology, error)
	Create(input TechnologyInput) (*Technology, error)
	Update(id uint, input TechnologyInput) (*Technology, error)
	Delete(id uint) (*Technology, error)
}
