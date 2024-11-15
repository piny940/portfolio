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

データベースは以下のように設計しました。

<a href="https://mermaid.live/edit#pako:eNqtlb1OwzAQx1_F8ty-QGfEwoLEhipFJjlaiya2_FEobYe2C0ggJsSIhFhg6cAD8DAWiMfAjtM0TdMPaLfk7n93v_NdnD4OWQS4gUEcUNISJG4mCGkJQqLBoF5nfRR2KCRKogZqYjOemsmbGb-a8YuZfJjJTRO7gJkmCxEQUQGhCrSgPtDLFvISrdqBq-4VP-_3Xw9TM3oyo-fKpCv0j2Z8l4cUNOWoQIaMw2oazgXrko4XfN9-2vzrYCrliyy5pBRTJpmz9N0jQme0ZV8p6SAaoeMjb-wSEbaJQAmJYdECSSh6XEEUcCLlJROR9ysag1Qk5uoahQKIUxC17NM8KviGHmjWb4aktUWpoJnXlmBrqLwBmqi0qcAGHa5s4d-IqLRj25ycb6kKyKbYmWc-7nUs2ckso6w4sj0AzdYtw3JVUkuwjJWHFFy7EMy_xm3mYwtr2DSyDatV3IosgLGOk1d8FHDFrVhWtpOyO8P-TuEvg8hjdp8EruEYRExoZK_5tHYTqzbYzrC7gSIiLtwt5HS2LDvpJSFuKKGhhn2m7MeAG-d2u61VMN1q52-cJKeMzbzDX18iSOw" target="_blank">
<img class="on-light custom" src="https://mermaid.ink/svg/pako:eNqtlb1OwzAQx1_F8gwvkBmxICQkNlQpMs6RWEpiyx-FUjqQLiCBmBAjEmKBhYEH4GEsEI-BXafpVwqFssXn_939znex-5jyBHCEQW4xkkpSdEqEjAKp0NnZ5ibvI5ozKLVCEepgW73Y4ZOtHm31YIevdnjRwd5hrKldJCRMAtWxkSw4BtlMXGJ0FvvsQfH5fP1-82LP7-z5fWvQJfpbW101LlOaea9YUS5gOY0QkndJHgQfl28u_ncwrfJZlkYy5zNPMmHp-0-EDlnqlozkiCVobycYu0TSjEhUkgJmLVBS2RMaklgQpY65TMK-ZgUoTQqhTxGVQLyC6MU9I5KpvUEAGtdbIxnjUFpoJrkVuBy6KYCVelRU7Jy2l5bwZ0Q0N2OrnFwoqQ3IhVibZ9Lu71jqk1lEWXJk_wA0Hrcay2cZWeJFrMZlamsdgsnfuEp_XGIDP7Xsh9GanoragfPcy1t-CjgRTqxayxmxe8P_ncJvGtH4rN8JvIELkAVhibvmR7k7WGfgKsP-BspZmml_DXmhy8v3eyXFkZYGNnAIVb8MY6PkJs1wdORm3a0EKQ84L5q1a4Dmcje8KpSXRyzFgy8DylCH" />
<img class="on-dark custom" src="https://mermaid.ink/svg/pako:eNqtVTtOAzEQvYrlGi6QGtEgJCQ6FGllvJPEIru2xnYgBAqSBiQQFaJEQjTQUHAADmOBOAZ2vNn8NgkQuvXMezNvPmv3KJcp0BoF3BKsiSyr54RYDajJ2dnmpuwR3haQG01qpE5d_9UNnl3_yfUf3eDNDS7rNBBGmIKCkAoEbhKLIhIjbCous6aVhOwR8fVy83H76i7u3cVDZdAF-DvXvy4pE5hZVqK5VLBYjVIoO6wdAZ9X7z7-MjGV8GktJWSGM6tkrKUXPgk5FE1_FKxNREr2dqKxw5C3GJKcZTBtgZxjVxlIE8W0PpaYRr8RGWjDMmVOCUdgAcHMvM-qdMJ3HgWN6i0kWeulVKgZ59bgc5iyAJGbYVGJJ20vLOHPEsnMjv2kc7GkKkE-xNp6xuNepqXozLyUBS37B0GjdStkhSxDSzIvq6RMuNZRMP4bfzIfn9jCqpGtWK3JrSgIUrYDvOKngBPlwbqynKH2YPi_LvxmECVn_UnQDZoBZkyk_pof5q5T0wJfGQ03UMrwKNxCAefTyv1uzmnNoIUNGiMVD8PIiNI2W7TW8KvuT4rlB1Jm5dn330jcjY8Kl3lDNOn5N6h-UBE" />
</a>

### 実装で悩んだ点

実装する際に悩んだのは、[認可リクエスト](https://openid-foundation-japan.github.io/rfc6749.ja.html#code-authz-req)をどのようにバックエンドに送るか、ということです。

通常、Backendサーバーのページにユーザーが直接アクセスするのは稀で、JSでBackendサーバーのエンドポイントを叩くということが多いです。しかし、認可リクエストの場合は、リダイレクトレスポンスを返すようRFCに定められているため、JSでリクエストを送るという方法とは相性が悪いです。

これに対する方法として以下の2つの方法を考えました。

- 通常通りJSでリクエストを送り、レスポンスが302であれば `next/router` を用いてリダイレクトする
- Backendのエンドポイント（ `/authorize` など）に直接アクセスする

1つ目の方法は、「通常通りBackendのエンドポイントはJSから叩く」という意味で一貫性があって分かりやすいです。一方で、「リダイレクト」というOAuthのコアな仕様に関する処理がFrontendのコードにまで入ってしまうため、セキュリティ的にはあまりよくありません。

2つ目の方法は、Backendのエンドポイントにユーザーが直接アクセスする、という点で若干の気持ち悪さがありますが、コアロジックをGoサーバーに集約することができるため、セキュリティ的に安心です。

以上を考えた結果、認可リクエストに関しては直接Backendのエンドポイントにアクセスする2つ目の方法を採用しました。

### 工夫した点

#### domainロジックの分離

Backendのコードは、今回レイヤード・アーキテクチャを採用し、domain層・usecase層・infrastructure層・api層に分割しました。  
ドメインロジックをdomain層に集約することで、バグが起こりづらくし、また、テストもしやすくなりました。

#### コードの自動生成

上述の通り、Backendではレイヤード・アーキテクチャを採用しました。レイヤード・アーキテクチャでは、domain層、infrastructure層、api層でそれぞれの役割が異なるため、それぞれの層でモデルを定義する必要があります。また、各層の間の依存関係の注入（以下、DI）も大変です。これらをすべて手動で記述するのは大変ですし、ミスも起こりやすいです。

そこで、今回のプロジェクトでは以下の自動生成ツールを導入しました。

- infrastracture層：[go-gorm/gorm](https://github.com/go-gorm/gorm)の[Gen](https://gorm.io/gen/index.html)
- api層：[oapi-codegen/oapi-codegen](https://github.com/oapi-codegen/oapi-codegen)
- DI：[google/wire](https://github.com/google/wire)

これにより、Backendのコードの自動生成を行うことができ、コードの品質を保つとともに、実装コストを大幅に削減することができました。

Frontendでも[openapi-ts/openapi-typescript](https://github.com/openapi-ts/openapi-typescript)を用いて自動生成を行うことで、APIの型安全性を保つことができました。

## 今後について

現状、課題をいくつか抱えています。

1. ID Tokenの有効性をサーバーに問い合わせることができない  
  現状、1度発行したトークンは有効期限が切れるまで失効させることができないため、ID Tokenが漏洩した場合などでも、有効期限が切れるまでそのトークンを使い続けることができてしまいます。これに対応するために、トークンを失効させる仕組みを導入する必要があります。

1. リフレッシュトークンが発行されていない  
  現状、リフレッシュトークンを発行していないため、アクセストークンの有効期限が切れると再度認可フローを行う必要があります。これでは利便性が落ちてしまうため、リフレッシュトークンを導入したいと考えています。

こういった点の改善を徐々に行っていきたいと考えています。

## おわりに

今回はOAuth2.0・OpenID Connectの認証サーバーを自作しました。開発を通して、OAuth2.0・OpenID Connect・JWTの仕様について理解を深めることができました。今後も、セキュリティに関する知識を深めていきたいと考えています。
