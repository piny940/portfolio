package auth

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"path/filepath"
	"strings"
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
	JwtSecret  string   `required:"true" split_words:"true"`
	Local      bool     `default:"false"`
	OidcSub    []string `split_words:"true" required:"true"`
	OidcIssuer string   `split_words:"true" required:"true"`
}
type ClusterConfig struct {
	Issuer  string
	JwksURI string
	Jwks    string
}

var conf = &Config{}
var clusterConf = &ClusterConfig{}
var k8sClient *kubernetes.Clientset

func Init() {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	if err := envconfig.Process("auth", conf); err != nil {
		panic(err)
	}
	var err error
	k8sClient, err = newClient()
	if err != nil {
		panic(err)
	}
	result := k8sClient.RESTClient().Get().AbsPath("/.well-known/openid-configuration").Do(ctx)
	raw, err := result.Raw()
	if err != nil {
		panic(err)
	}
	decoder := json.NewDecoder(bytes.NewBuffer(raw))
	oidcConf := make(map[string]interface{})
	if err := decoder.Decode(&oidcConf); err != nil {
		panic(err)
	}
	fmt.Println("OIDC Configuration: ", oidcConf)
	clusterConf.Issuer = oidcConf["issuer"].(string)
	clusterConf.JwksURI = oidcConf["jwks_uri"].(string)
	if err := updateJwks(ctx); err != nil {
		panic(err)
	}
}

const ISS = "portfolio.piny940.com"
const TTL_SEC = 60 * 60 * 24 * 3 // 3 days
func CreateJWTToken(userId string) (string, error) {
	claims := jwt.MapClaims{
		"sub": userId,
		"exp": time.Now().Add(time.Second * TTL_SEC).Unix(),
		"iss": ISS,
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
		if claims["iss"].(string) == ISS {
			return hmacKeyFunc(token)
		}
		if claims["iss"].(string) == clusterConf.Issuer {
			return clusterKeyFunc(token)
		}
		return nil, fmt.Errorf("invalid issuer")
	})
	if err != nil {
		return "", err
	}
	if claims, ok := token.Claims.(jwt.MapClaims); ok &&
		token.Valid &&
		int64(claims["exp"].(float64)) > time.Now().Unix() &&
		(claims["iss"] == ISS || claims["iss"] == clusterConf.Issuer) {
		return claims["sub"].(string), nil
	} else {
		return "", err
	}
}

func hmacKeyFunc(_ *jwt.Token) (interface{}, error) {
	return []byte(conf.JwtSecret), nil
}

func clusterKeyFunc(token *jwt.Token) (interface{}, error) {
	set, err := jwk.Parse([]byte(clusterConf.Jwks))
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

func newClient() (*kubernetes.Clientset, error) {
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
func updateJwks(ctx context.Context) error {
	uri := strings.Join(strings.Split(clusterConf.JwksURI, "/")[3:], "/") // remove https://example.com/
	result := k8sClient.RESTClient().Get().AbsPath(uri).Do(ctx)
	raw, err := result.Raw()
	if err != nil {
		return fmt.Errorf("failed to get jwks: %w", err)
	}
	clusterConf.Jwks = string(raw)
	return nil
}
