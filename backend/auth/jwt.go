package auth

import (
	"context"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"path/filepath"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/kelseyhightower/envconfig"
	"github.com/lestrrat-go/jwx/jwk"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/util/homedir"
)

type Config struct {
	JwtSecret        string   `required:"true" split_words:"true"`
	Local            bool     `default:"false"`
	OidcSub          []string `split_words:"true" required:"true"`
	AuthServerUrl    string   `split_words:"true" required:"true"`
	AuthServerIssuer string   `split_words:"true" required:"true"`
	AuthAudience     string   `split_words:"true" required:"true"`
	ClusterIssuer    string   `split_words:"true" required:"true"`
	ClusterAudience  string   `split_words:"true" required:"true"`

	clusterJwks jwk.Set
	authJwks    jwk.Set
}

var conf = &Config{}

const oidcAud = "portfolio.piny940.com"

func Init() {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	if err := envconfig.Process("auth", conf); err != nil {
		panic(err)
	}

	clusterjwks, err := getClusterJwks(ctx)
	if err != nil {
		panic(err)
	}
	conf.clusterJwks = clusterjwks

	authjwks, err := getAuthJwks(ctx)
	if err != nil {
		panic(err)
	}
	conf.authJwks = authjwks
}

const ISS = "portfolio.piny940.com"
const TTL_SEC = 60 * 60 * 24 * 3 // 3 days
func CreateJWTToken(userId string) (string, error) {
	claims := jwt.MapClaims{
		"sub": userId,
		"exp": time.Now().Add(time.Second * TTL_SEC).Unix(),
		"iss": ISS,
		"aud": oidcAud,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(conf.JwtSecret))
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
		issuer, ok := claims["iss"].(string)
		if !ok {
			return nil, fmt.Errorf("failed to parse issuer")
		}
		if issuer == conf.AuthServerIssuer {
			key, err := keyFromJwks(conf.authJwks, token)
			if err != nil {
				return nil, fmt.Errorf("failed to get auth server key: %w", err)
			}
			return key, nil
		} else if issuer == conf.ClusterIssuer {
			key, err := keyFromJwks(conf.clusterJwks, token)
			if err != nil {
				return nil, fmt.Errorf("failed to get cluster key: %w", err)
			}
			return key, nil
		}
		return nil, fmt.Errorf("invalid issuer")
	})
	if err != nil {
		return "", err
	}
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return "", fmt.Errorf("failed to parse claims")
	}
	if !token.Valid {
		return "", fmt.Errorf("invalid token")
	}
	if int64(claims["exp"].(float64)) < time.Now().Unix() {
		return "", fmt.Errorf("expired token")
	}
	if !validAud(claims) {
		return "", fmt.Errorf("invalid audience. got %v", claims["aud"])
	}
	return claims["sub"].(string), nil
}

func keyFromJwks(jwks jwk.Set, token *jwt.Token) (interface{}, error) {
	var key jwk.Key
	kid, ok := token.Header["kid"].(string)
	if ok {
		key, ok = jwks.LookupKeyID(kid)
	}
	if !ok {
		return nil, fmt.Errorf("failed to get key")
	}
	var pubKey interface{}
	if err := key.Raw(&pubKey); err != nil {
		return nil, fmt.Errorf("failed to get raw key: %w", err)
	}
	return pubKey, nil
}

func newK8sClient() (*kubernetes.Clientset, error) {
	var config *rest.Config
	var err error
	if conf.Local {
		configPath := filepath.Join(homedir.HomeDir(), ".kube", "config")
		config, err = clientcmd.BuildConfigFromFlags("", configPath)
	} else {
		config, err = rest.InClusterConfig()
	}
	if err != nil {
		return nil, err
	}

	client, err := kubernetes.NewForConfig(config)
	if err != nil {
		return nil, err
	}
	return client, nil
}

func getClusterJwks(ctx context.Context) (jwk.Set, error) {
	k8sClient, err := newK8sClient()
	if err != nil {
		return nil, err
	}
	result := k8sClient.RESTClient().Get().AbsPath("/openid/v1/jwks").Do(ctx)
	raw, err := result.Raw()
	if err != nil {
		return nil, fmt.Errorf("failed to get jwks: %w", err)
	}
	slog.Info(fmt.Sprintf("cluster jwks: %v", string(raw)))
	set, err := jwk.Parse(raw)
	if err != nil {
		return nil, fmt.Errorf("failed to parse jwks: %w", err)
	}
	return set, nil
}

func getAuthJwks(ctx context.Context) (jwk.Set, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, conf.AuthServerUrl+"/oauth/jwks", nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to get jwks: %w", err)
	}
	defer res.Body.Close()
	data, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read body: %w", err)
	}
	slog.Info(fmt.Sprintf("auth jwks: %v", string(data)))
	set, err := jwk.Parse(data)
	if err != nil {
		return nil, fmt.Errorf("failed to parse jwks: %w", err)
	}
	return set, nil
}

func validAud(claims jwt.MapClaims) bool {
	aud, ok := claims["aud"]
	if !ok {
		return false
	}
	iss, ok := claims["iss"]
	if !ok {
		return false
	}
	var validAud string
	if iss == conf.AuthServerIssuer {
		validAud = conf.AuthAudience
	} else if iss == conf.ClusterIssuer {
		validAud = conf.ClusterAudience
	} else {
		return false
	}
	audStr, ok := aud.(string)
	if ok {
		return audStr == validAud
	}
	audArr, ok := aud.([]interface{})
	if ok {
		for _, a := range audArr {
			if a == validAud {
				return true
			}
		}
	}
	return false
}
