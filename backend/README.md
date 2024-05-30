# Backend

## 開発環境

- `.env.sample`に従って環境変数を記述
- `go run .`

## テスト

- `go test ./...`

## 本番環境

- `go build .`
- `./backend`

## DB migration

- `sql-migrate new {name}`で migration ファイルを作成
