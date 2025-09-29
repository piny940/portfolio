package resolver

import (
	"context"
	"errors"

	"github.com/labstack/echo/v4"
)

func echoContextFromContext(ctx context.Context) (echo.Context, error) {
	echoContext := ctx.Value("echoContext")
	if echoContext == nil {
		err := errors.New("could not retrieve echo.Context")
		return nil, err
	}

	ec, ok := echoContext.(echo.Context)
	if !ok {
		err := errors.New("echo.Context has wrong type")
		return nil, err
	}
	return ec, nil
}
