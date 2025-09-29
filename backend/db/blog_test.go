package db

import (
	"backend/domain"
	"context"
	"fmt"
	"math/rand"
	"slices"
	"testing"
	"time"

	"github.com/bluele/factory-go/factory"
	"github.com/maxatome/go-testdeep/td"
)

var blogF = factory.NewFactory(
	&domain.BlogInput{
		URL:         "https://example.com",
		Kind:        int(domain.BlogKindQiita),
		PublishedAt: time.Now().UTC(),
	},
).SeqInt("Title", func(n int) (interface{}, error) {
	return fmt.Sprintf("Blog%d", n), nil
})

func createBlogTechnologyTag(t *testing.T, blogID uint, technologyID uint) error {
	t.Helper()
	now := time.Now().UTC()
	result := db.Client.Exec(
		"insert into blog_technology_tags (blog_id, technology_id, created_at, updated_at) values (?, ?, ?, ?)",
		blogID,
		technologyID,
		now, now,
	)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func TestCreateBlog(t *testing.T) {
	setup(t)
	repo := NewBlogRepo(db)
	var beforeCount int
	db.Client.Raw("select count(*) from blogs").Scan(&beforeCount)

	blog := blogF.MustCreate().(*domain.BlogInput)
	repo.Create(context.Background(), *blog)
	var afterCount int
	db.Client.Raw("select count(*) from blogs").Scan(&afterCount)
	if afterCount != beforeCount+1 {
		t.Errorf("blog not created")
	}
	fmt.Println(afterCount)
	var actual domain.Blog
	result := db.Client.Last(&actual)
	if result.Error != nil || actual.Title != blog.Title {
		t.Errorf("blog not found: %v", result.Error)
	}
}

func TestListBlogsOrder(t *testing.T) {
	setup(t)
	length := 3
	repo := NewBlogRepo(db)
	blogs := make([]*domain.Blog, length)
	publishedAts := make([]time.Time, length)
	publishedAts[0], _ = time.Parse("2006-01-02-15:04:05", "2021-01-02-00:00:00")
	publishedAts[1], _ = time.Parse("2006-01-02-15:04:05", "2021-01-01-00:00:00")
	publishedAts[2], _ = time.Parse("2006-01-02-15:04:05", "2021-01-03-00:00:00")
	for i, publishedAt := range publishedAts {
		blog := blogF.MustCreateWithOption(map[string]interface{}{"PublishedAt": publishedAt}).(*domain.BlogInput)
		newBlog, err := repo.Create(context.Background(), *blog)
		if err != nil {
			t.Errorf("failed to create blog: %v", err)
		}
		blogs[i] = newBlog
	}
	actual, err := repo.List(context.Background(), nil)
	if err != nil {
		t.Errorf("failed to list blogs: %v", err)
	}
	fmt.Println(len(actual))
	orderedBlogs := []*domain.Blog{blogs[2], blogs[0], blogs[1]}
	td.Cmp(t, actual, orderedBlogs)
}

func TestListBlogsLimit(t *testing.T) {
	setup(t)
	repo := NewBlogRepo(db)
	blogs := make([]*domain.Blog, 0)
	for i := 0; i < 10; i++ {
		blog := blogF.MustCreate().(*domain.BlogInput)
		newBlog, err := repo.Create(context.Background(), *blog)
		if err != nil {
			t.Errorf("failed to create blog: %v", err)
		}
		blogs = append(blogs, newBlog)
	}
	actual, err := repo.List(context.Background(), &domain.ListOpt{Limit: 5})
	if err != nil {
		t.Errorf("failed to list blogs: %v", err)
	}
	td.Cmp(t, actual, blogs[:5])
}

func TestListBlogsOffset(t *testing.T) {
	setup(t)
	repo := NewBlogRepo(db)
	blogs := make([]*domain.Blog, 0)
	for i := 0; i < 15; i++ {
		blog := blogF.MustCreate().(*domain.BlogInput)
		blog.PublishedAt = time.Now().Add(time.Duration(rand.Intn(1000)) * time.Second).UTC()
		newBlog, err := repo.Create(context.Background(), *blog)
		if err != nil {
			t.Errorf("failed to create blog: %v", err)
		}
		blogs = append(blogs, newBlog)
	}
	actual, err := repo.List(context.Background(), &domain.ListOpt{Offset: 5, Limit: 5})
	if err != nil {
		t.Errorf("failed to list blogs: %v", err)
	}
	slices.SortFunc(blogs, func(a, b *domain.Blog) int {
		if a.PublishedAt.After(b.PublishedAt) {
			return -1
		}
		if a.PublishedAt.Before(b.PublishedAt) {
			return 1
		}
		return 0
	})
	td.Cmp(t, actual, blogs[5:10])
}

func TestListBlogTagsComplex(t *testing.T) {
	setup(t)
	length := 5
	bRepo := NewBlogRepo(db)
	tRepo := NewTechnologyRepo(db, &storage{})
	techs := make([]*domain.Technology, length)
	for i := 0; i < length; i++ {
		tech := technologyF.MustCreate().(*domain.TechnologyInput)
		newTech, err := tRepo.Create(context.Background(), *tech)
		if err != nil {
			t.Errorf("failed to create technology: %v", err)
		}
		techs[i] = newTech
	}
	blogs := make([]*domain.Blog, length)
	for i := 0; i < length; i++ {
		blog := blogF.MustCreate().(*domain.BlogInput)
		newBlog, _ := bRepo.Create(context.Background(), *blog)
		blogs[i] = newBlog
	}
	for bi := 0; bi < 3; bi++ {
		for ti := bi; ti < bi+2; ti++ {
			createBlogTechnologyTag(t, blogs[bi].ID, techs[ti].ID)
		}
	}
	var count int
	db.Client.Raw("select count(*) from blog_technology_tags").Scan(&count)
	tags, err := bRepo.ListTags(context.Background(), []uint{blogs[0].ID, blogs[1].ID})
	if err != nil {
		t.Errorf("should not fail: %v", err)
	}
	expected := []*domain.BlogTag{
		{BlogID: blogs[0].ID, Technology: *techs[0]},
		{BlogID: blogs[0].ID, Technology: *techs[1]},
		{BlogID: blogs[1].ID, Technology: *techs[1]},
		{BlogID: blogs[1].ID, Technology: *techs[2]},
	}
	if len(tags) != len(expected) {
		t.Errorf("expected %d tags, got %d", len(expected), len(tags))
	}
	for i, tag := range tags {
		if tag.BlogID != expected[i].BlogID {
			t.Errorf("expected %d, got %d", expected[i].BlogID, tag.BlogID)
		}
		if tag.Technology.ID != expected[i].Technology.ID {
			t.Errorf("expected %d, got %d", expected[i].Technology.ID, tag.Technology.ID)
		}
	}
}

func TestUpdateBlogTags(t *testing.T) {
	setup(t)
	length := 5
	bRepo := NewBlogRepo(db)
	tRepo := NewTechnologyRepo(db, &storage{})
	techs := make([]*domain.Technology, length)
	for i := 0; i < length; i++ {
		tech := technologyF.MustCreate().(*domain.TechnologyInput)
		newTech, err := tRepo.Create(context.Background(), *tech)
		if err != nil {
			t.Errorf("failed to create technology: %v", err)
		}
		techs[i] = newTech
	}
	blog, _ := bRepo.Create(context.Background(), *blogF.MustCreate().(*domain.BlogInput))
	t.Run("Add tags", func(t *testing.T) {
		_, err := bRepo.UpdateTags(context.Background(), blog.ID, []uint{techs[0].ID, techs[1].ID})
		if err != nil {
			t.Errorf("should not fail: %v", err)
		}
		tags, _ := bRepo.ListTags(context.Background(), []uint{blog.ID})
		if len(tags) != 2 {
			t.Errorf("expected 2 tags, got %d", len(tags))
		}
		if tags[0].Technology.ID != techs[0].ID || tags[1].Technology.ID != techs[1].ID {
			t.Errorf("expected %d and %d, got %d and %d", techs[0].ID, techs[1].ID, tags[0].Technology.ID, tags[1].Technology.ID)
		}
	})
	t.Run("Remove tags", func(t *testing.T) {
		_, err := bRepo.UpdateTags(context.Background(), blog.ID, []uint{techs[0].ID})
		if err != nil {
			t.Errorf("should not fail: %v", err)
		}
		tags, _ := bRepo.ListTags(context.Background(), []uint{blog.ID})
		if len(tags) != 1 {
			t.Errorf("expected 1 tag, got %d", len(tags))
		}
		if tags[0].Technology.ID != techs[0].ID {
			t.Errorf("expected %d, got %d", techs[0].ID, tags[0].Technology.ID)
		}
	})
}

func TestBlogCount(t *testing.T) {
	setup(t)
	repo := NewBlogRepo(db)
	length := 5
	for i := 0; i < length; i++ {
		blog := blogF.MustCreate().(*domain.BlogInput)
		repo.Create(context.Background(), *blog)
	}
	count, err := repo.TotalCount(context.Background())
	if err != nil {
		t.Errorf("should not fail: %v", err)
	}
	if count != int64(length) {
		t.Errorf("expected %d, got %d", length, count)
	}
}
