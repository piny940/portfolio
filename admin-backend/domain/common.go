package domain

import "time"

type Common struct {
	ID        uint      `gorm:"primarykey; autoIncrement; not null;"`
	CreatedAt time.Time `gorm:"type:timestamp; not null;"`
	UpdatedAt time.Time `gorm:"type:timestamp; not null;"`
}
