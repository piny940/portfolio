package db

import (
	"fmt"
	"strings"
)

type queryObj map[string]interface{}

func (q queryObj) add(key string, value interface{}) {
	q[key] = value
}
func (q queryObj) toFilter(otherArgs []interface{}) (string, []interface{}) {
	count := 1
	filters := make([]string, len(q))
	params := otherArgs
	for key, value := range q {
		filters[count-1] = fmt.Sprintf("%s$%d", key, count+len(otherArgs))
		params = append(params, value)
		count++
	}
	return strings.Join(filters, " and "), params
}
func (q queryObj) exists() bool {
	return len(q) > 0
}

type uintNumber interface {
	~uint
}

func arrayParam[T uintNumber](ids []T) (string, []interface{}) {
	args := make([]interface{}, len(ids))
	strParams := make([]string, len(ids))
	for i, id := range ids {
		args[i] = id
		strParams[i] = fmt.Sprintf("$%d", i+1)
	}
	return strings.Join(strParams, ", "), args
}
