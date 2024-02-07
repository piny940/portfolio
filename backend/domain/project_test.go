package domain_test

import (
	"backend/domain"
	"testing"
)

func TestProjectIsTitleValid(t *testing.T) {
	cases := map[string]struct {
		title     string
		expectErr bool
	}{
		"empty title":    {"", true},
		"short title":    {"a", false},
		"long title":     {"あいうえおかきくけこさしすせそたちつてと", false},
		"too long title": {"abcdeFGHIJklmnoPQRSTu", true},
	}
	for _, c := range cases {
		err := domain.ProjectInput{Title: c.title}.IsTitleValid()
		if c.expectErr && err == nil {
			t.Errorf("should fail: %s", c.title)
		} else if !c.expectErr && err != nil {
			t.Errorf("should not fail: %s", c.title)
		}
	}
}

func TestProjectIsDescriptionValid(t *testing.T) {
	cases := map[string]struct {
		description string
		expectErr   bool
	}{
		"empty description":    {"", true},
		"short description":    {"a", false},
		"long description":     {"あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやいゆえよらりるれろわいうえをアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ", false},
		"too long description": {"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABC", true},
	}
	for _, c := range cases {
		err := domain.ProjectInput{Description: c.description}.IsDescriptionValid()
		if c.expectErr && err == nil {
			t.Errorf("should fail: %s", c.description)
		} else if !c.expectErr && err != nil {
			t.Errorf("should not fail: %s", c.description)
		}
	}
}
