package auth

import (
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/lestrrat-go/jwx/jwk"
)

const ISS = "portfolio.piny940.com"
const TTL_SEC = 60 * 60 * 24 * 3 // 3 days
func CreateJWTToken(userId string) (string, error) {
	claims := jwt.MapClaims{
		"sub": userId,
		"exp": time.Now().Add(time.Second * TTL_SEC).Unix(),
		"iss": ISS,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

func VerifyJWTToken(tokenString string) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			return nil, fmt.Errorf("failed to parse claims")
		}
		if claims["iss"].(string) == ISS {
			return hmacKeyFunc(token)
		}
		if claims["iss"].(string) == os.Getenv("OIDC_ISSUER") {
			return oidcKeyFunc(token)
		}
		return nil, fmt.Errorf("invalid issuer")
	})
	if err != nil {
		return "", err
	}
	if claims, ok := token.Claims.(jwt.MapClaims); ok &&
		token.Valid &&
		int64(claims["exp"].(float64)) > time.Now().Unix() &&
		(claims["iss"] == ISS || claims["iss"] == os.Getenv("OIDC_ISSUER")) {
		return claims["sub"].(string), nil
	} else {
		return "", err
	}
}

func hmacKeyFunc(_ *jwt.Token) (interface{}, error) {
	return []byte(os.Getenv("JWT_SECRET")), nil
}

func oidcKeyFunc(token *jwt.Token) (interface{}, error) {
	set, err := jwk.Parse([]byte(os.Getenv("OIDC_JWKS")))
	if err != nil {
		return nil, fmt.Errorf("failed to parse jwks: %w", err)
	}
	kid, ok := token.Header["kid"].(string)
	if !ok {
		return nil, fmt.Errorf("failed to parse kid")
	}
	key, ok := set.LookupKeyID(kid)
	if !ok {
		return nil, fmt.Errorf("failed to lookup key")
	}
	var pubKey interface{}
	if err := key.Raw(&pubKey); err != nil {
		return nil, fmt.Errorf("failed to get raw key: %w", err)
	}
	return pubKey, nil
}
