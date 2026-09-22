# Portfolio

[![Test](https://github.com/piny940/portfolio/actions/workflows/test.yml/badge.svg)](https://github.com/piny940/portfolio/actions/workflows/test.yml)
[![Deploy](https://github.com/piny940/portfolio/actions/workflows/deploy.yaml/badge.svg)](https://github.com/piny940/portfolio/actions/workflows/deploy.yaml)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fwww.piny940.com&up_message=healthy&up_color=blue)

site: https://www.piny940.com

Next.js の静的出力（`output: 'export'`）だけで構成されたポートフォリオ。
サーバもデータベースも持たず、コンテンツは `content/` の YAML と
`documents/` の Markdown に置く。

## 構成

| パス | 役割 |
| --- | --- |
| `src/` | Next.js (Pages Router)。`pnpm build` で `out/` に静的 HTML を出力する |
| `content/*.yml` | 技術スタック・プロジェクト・ブログ・プロフィールのデータ |
| `documents/*.md` | プロジェクトの解説記事。ファイル名が `projects.yml` の `id` と対応する |

## 開発

1. `pnpm i`
2. `pnpm dev`

コード整形は `pnpm lint`、テストは `pnpm test`。

`pnpm build` で `out/` に静的 HTML を出力する。確認するときは `npx serve out` 。

## コンテンツの追加

- 技術: `content/technologies.yml` に追記し、ロゴを `public/images/technologies/` に置く
- プロジェクト: `content/projects.yml` に追記し、解説を書くなら `documents/<id>.md` を追加する
- ブログ: `content/blogs.yml` に手書きで追記する（`title` / `url` / `publishedAt` / `tags`）

タグの参照先が無い、ロゴのファイルが無いといった不整合は `pnpm build` が検出して失敗する。

## デプロイ

`main` への push で GitHub Actions が Cloudflare Pages に公開する。

必要な設定:

- Secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- Variables: `CLOUDFLARE_PAGES_PROJECT`
