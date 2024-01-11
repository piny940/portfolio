package config

import (
	"fmt"

	"github.com/joho/godotenv"
	"github.com/spf13/viper"
)

var c *viper.Viper

func Init(env string) {
	loadDotenv(env)
	c = viper.New()
	c.SetConfigFile("yaml")
	c.SetConfigName(env)
	c.AddConfigPath("config/environments/")
	if err := c.ReadInConfig(); err != nil {
		panic(err)
	}
}

func GetConfig() *viper.Viper {
	return c
}

func loadDotenv(env string) {
	if env != "production" {
		if err := godotenv.Load(fmt.Sprintf(".env.%s", env)); err != nil {
			panic(err)
		}
	}
}
