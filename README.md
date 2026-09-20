# Portfolio

[![Test](https://github.com/piny940/portfolio/actions/workflows/test.yml/badge.svg)](https://github.com/piny940/portfolio/actions/workflows/test.yml)
[![Deploy](https://github.com/piny940/portfolio/actions/workflows/deploy.yaml/badge.svg)](https://github.com/piny940/portfolio/actions/workflows/deploy.yaml)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fwww.piny940.com&up_message=healthy&up_color=blue)

site: https://www.piny940.com

Next.js の静的出力（`output: 'export'`）だけで構成されたポートフォリオ。
サーバもデータベースも持たず、コンテンツは `app/content/` の YAML と
`app/documents/` の Markdown に置く。

## 構成

| パス | 役割 |
| --- | --- |
| `app/` | Next.js (Pages Router)。`pnpm build` で `app/out/` に静的 HTML を出力する |
| `app/content/*.yml` | 技術スタック・プロジェクト・ブログ・プロフィールのデータ |
| `app/documents/*.md` | プロジェクトの解説記事。ファイル名が `projects.yml` の `id` と対応する |

## コンテンツの追加

- 技術: `app/content/technologies.yml` に追記し、ロゴを `app/public/images/technologies/` に置く
- プロジェクト: `app/content/projects.yml` に追記し、解説を書くなら `app/documents/<id>.md` を追加する
- ブログ: `app/content/blogs.yml` に手書きで追記する（`title` / `url` / `publishedAt` / `tags`）

タグの参照先が無い、ロゴのファイルが無いといった不整合は `pnpm build` が検出して失敗する。

## デプロイ

`main` への push で GitHub Actions が Cloudflare Pages に公開する。

必要な設定:

- Secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- Variables: `CLOUDFLARE_PAGES_PROJECT`
