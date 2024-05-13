package db

import (
	"backend/domain"
	"fmt"

	"github.com/bluele/factory-go/factory"
)

var defaultLogoURL = "https://example.com/logo.png"
var technologyF = factory.NewFactory(
	&domain.TechnologyInput{LogoURL: &defaultLogoURL, TagColor: "#000000"},
).SeqInt("Name", func(n int) (interface{}, error) {
	return fmt.Sprintf("Technology%d", n), nil
})
