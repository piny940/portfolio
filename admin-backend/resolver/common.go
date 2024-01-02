package resolver

import (
	"context"
	"fmt"

	"github.com/labstack/echo/v4"
)

func echoContextFromContext(ctx context.Context) (echo.Context, error) {
	echoContext := ctx.Value("echoContext")
	if echoContext == nil {
		err := fmt.Errorf("could not retrieve echo.Context")
		return nil, err
	}

	ec, ok := echoContext.(echo.Context)
	if !ok {
		err := fmt.Errorf("echo.Context has wrong type")
		return nil, err
	}
	return ec, nil
}

func newError(err error, message string) error {
	fmt.Println(err)
	return fmt.Errorf(message)
}
