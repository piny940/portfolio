package db

import (
	"backend/domain"
	"fmt"

	"github.com/bluele/factory-go/factory"
)

var technologyF = factory.NewFactory(
	&domain.TechnologyInput{Logo: nil, TagColor: "#000000"},
).SeqInt("Name", func(n int) (interface{}, error) {
	return fmt.Sprintf("Technology%d", n), nil
})
