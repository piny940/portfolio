## はじめに

今回OpenID Connectの認証サーバーを自作してみたのでその記録を残しておきます。

## システムの概要

OAuthの認可機能と、OpenID Connectによるシングル・サイン・オン（以下、SSO）機能を提供しています。  
認証・認可のフローは下図のとおりです。

![流れ](https://i.gyazo.com/cc4b5c615b548d9a4fa30b3eaf42f447.png)

OpenID Connectの仕様に完全準拠させるのは大変なので、OpenID Connectの中核となるフローを実装しました。他の仕様については徐々に対応させていきたいと思っています。

### アプリ画面

以下のリンクから、開発した認証サーバーを用いたSSOのデモを行うことができます。

<https://auth-example.piny940.com>

![デモ画面](https://i.gyazo.com/8b71c84e0f6f0de850e0d1d351fe78ca.png)

ボタンをクリックすると、認証ページに飛びます。アカウントを持っていない場合は、アカウントを作成することができます。

![認証ページ](https://i.gyazo.com/ee5c45d2e6037a87e72dfb777a4c5d17.png)

ログインすると、認可チェックのページにリダイレクトされます。（この画面のUIは追々改善したいなーと思ってます。）

![認可画面](https://i.gyazo.com/ff940bcd9fdfd70fa6460c5ecc63e007.png)

Approveすると、最初のデモサイトにリダイレクトされます。デモサイトはサーバーサイドで認証サーバーにトークンリクエストを送信しており、アクセストークンとIDトークンを取得しています。

![認証済み画面](https://i.gyazo.com/895b82d14653cb3dea61e06611443782.png)

## 開発

今回の開発ではあえてOAuth向けのライブラリやフレームワークを使わずに1から実装をしてみました（JWTの生成などはライブラリを使用しています）。

フレームワークを使ったほうが楽だしセキュリティ的にも確実ですが、今回の開発は「OpenID Connectについての理解を深める」ということを大きな目的としていたため、あえてフレームワークを使わないという選択をしました。

### 設計

まずは、OpenID Connectの仕様に基づいて、認証サーバーのAPI・データベースの設計を行いました。

#### API設計

API設計はOpenAPIの形式で記述し、以下のサイトで公開しています。

<https://auth-doc.piny940.com>

OpenAPIの仕様書をYamlで書くのは面倒なので、OpenAPIの仕様書をTypeScriptのような記法で書ける[TypeSpec](https://typespec.io)を活用しました。

#### データベース設計

[![](https://mermaid.ink/img/pako:eNqtlb1OwzAQx1_F8ty-QGfEwoLEhipFJjlaiya2_FEobYe2C0ggJsSIhFhg6cAD8DAWiMfAjtM0TdMPaLfk7n93v_NdnD4OWQS4gUEcUNISJG4mCGkJQqLBoF5nfRR2KCRKogZqYjOemsmbGb-a8YuZfJjJTRO7gJkmCxEQUQGhCrSgPtDLFvISrdqBq-4VP-_3Xw9TM3oyo-fKpCv0j2Z8l4cUNOWoQIaMw2oazgXrko4XfN9-2vzrYCrliyy5pBRTJpmz9N0jQme0ZV8p6SAaoeMjb-wSEbaJQAmJYdECSSh6XEEUcCLlJROR9ysag1Qk5uoahQKIUxC17NM8KviGHmjWb4aktUWpoJnXlmBrqLwBmqi0qcAGHa5s4d-IqLRj25ycb6kKyKbYmWc-7nUs2ckso6w4sj0AzdYtw3JVUkuwjJWHFFy7EMy_xm3mYwtr2DSyDatV3IosgLGOk1d8FHDFrVhWtpOyO8P-TuEvg8hjdp8EruEYRExoZK_5tHYTqzbYzrC7gSIiLtwt5HS2LDvpJSFuKKGhhn2m7MeAG-d2u61VMN1q52-cJKeMzbzDX18iSOw?type=png)](https://mermaid.live/edit#pako:eNqtlb1OwzAQx1_F8ty-QGfEwoLEhipFJjlaiya2_FEobYe2C0ggJsSIhFhg6cAD8DAWiMfAjtM0TdMPaLfk7n93v_NdnD4OWQS4gUEcUNISJG4mCGkJQqLBoF5nfRR2KCRKogZqYjOemsmbGb-a8YuZfJjJTRO7gJkmCxEQUQGhCrSgPtDLFvISrdqBq-4VP-_3Xw9TM3oyo-fKpCv0j2Z8l4cUNOWoQIaMw2oazgXrko4XfN9-2vzrYCrliyy5pBRTJpmz9N0jQme0ZV8p6SAaoeMjb-wSEbaJQAmJYdECSSh6XEEUcCLlJROR9ysag1Qk5uoahQKIUxC17NM8KviGHmjWb4aktUWpoJnXlmBrqLwBmqi0qcAGHa5s4d-IqLRj25ycb6kKyKbYmWc-7nUs2ckso6w4sj0AzdYtw3JVUkuwjJWHFFy7EMy_xm3mYwtr2DSyDatV3IosgLGOk1d8FHDFrVhWtpOyO8P-TuEvg8hjdp8EruEYRExoZK_5tHYTqzbYzrC7gSIiLtwt5HS2LDvpJSFuKKGhhn2m7MeAG-d2u61VMN1q52-cJKeMzbzDX18iSOw)


### 実装・テスト

## おわりに

