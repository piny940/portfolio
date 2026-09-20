# Portfolio App

## 開発

1. `pnpm i`
2. `pnpm dev`

## コード整形

`pnpm lint --fix`

## テスト

`pnpm test`

## ビルド

`pnpm build` で `out/` に静的 HTML を出力する。
`content/*.yml` の検証（タグ参照・ロゴの実在・重複）もここで走る。

確認するときは `npx serve out` 。
