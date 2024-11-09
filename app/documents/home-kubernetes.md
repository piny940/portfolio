## はじめに

現在、自宅サーバー上では2つのKubernetesクラスタを動かしています。（production環境とstaging環境）  
構築にあたって、様々な苦労や工夫をしてきたので、この記事では実際にクラスタ構築をどのような流れで行ってきたのか、そしてどういった工夫をしてきたのかをまとめていきます。

## 動機

Kubernetesクラスタを立てる前は、自宅サーバー上でDockerを使ってサービスを公開していました。
しかし、Dockerを単純に使うだけだと、デプロイをするために毎回サーバーにログインして `git pull` ・ `docker compose up` する必要がありました。結果としてデプロイを後回しにしてしまい、デプロイ頻度が低下するという問題がありました。

デプロイを自動化するだけであれば、他のツールを使うという選択肢もありますが、当時Kubernetesに興味が合ったこともあり、Kubernetesクラスタを構築することにしました。

## 開発期間

||期間|
|---|---|
|Kubernetesの勉強|2023年11月|
|クラスタ構築|2023年12月〜現在|

## 開発の流れ

### 0. Kubernetesの勉強

当時はKubernetesについてはほとんど知識がなかったため、まずはKubernetesの基本的な概念や使い方について学習しました。その際には、以下の書籍を参考にしました。

[Kubernetes実践ガイド クラウドネイティブアプリケーションを支える技術](https://book.impress.co.jp/books/1118101053)

### 1. VPSでのクラスタ構築

自宅サーバー上では既に公開しているサービスがあったため、自宅サーバー上でKubernetesの動作検証をすることはできませんでした。そのため、はじめはVPS上でKubernetesクラスタを構築し、動作検証を行いました。

クラスタ内ネットワークがうまく動作しないなどの問題に遭遇しましたが、サークルの先輩に相談しながら解決していきました。

このあたりの話は別の記事にまとめています。↓

<https://qiita.com/piny940/items/3c1c10b80c7e173d527d>

### 2. VPSのクラスタ公開

Podを作成することはできたものの、外部からアクセスできるようにするためには、Ingressリソースを使ってサービスを公開する必要があります。

ただ、ここでまた問題が生じます。クラウド上にKubernetesクラスタを立てる場合はクラウドが提供するロードバランサーを使ってIngressリソースを公開することができますが、ベアメタルサーバー上でKubernetesクラスタを構築した場合、ロードバランサーを使うことができません。

そのため、[MetalLB](https://metallb.universe.tf)というツールを使って、ベアメタルサーバー上のサービスを公開できるようにしました。

<https://qiita.com/piny940/items/0ee6a391802c21ab48c1>

### 3. CSIドライバの導入

データベースを使う場合、Persistent Volumeを使うことになります。
そのとき必要になってくるのがCSIドライバです。

使用するCSIドライバの候補としては、分散ストレージを提供する[Ceph](https://docs.ceph.com/en/reef/)と[Longhorn](https://longhorn.io)が挙がりました。  
ただ、調べたところCephは1つのVolumeでも複数のノードにデータを分散させて保存するため、クラスタが壊れたときにデータの修復が難しいという問題がありました。

もちろんCephのようにデータを分散させることで並列IOが可能になり、パフォーマンスが向上するというメリットもありますが、今回はそれほどパフォーマンスが必要になるケースはないだろうと考え、Longhornを採用しています。

### 4. 自動デプロイ基盤の構築

Kubernetesクラスタが構築できたので、次は自動デプロイ基盤を構築しました。

IaC・デプロイツールとしては、以下の2つのツールが候補として挙がりました。

- [ArgoCD](https://argo-cd.readthedocs.io/en/stable/)
- [FluxCD](https://fluxcd.io)

ArgoCDは多くの企業で採用されており、UIが充実しているというメリットがあります。

ただ、調べたところ、ArgoCDはFluxに比べて早くに登場したツールのため、よく使う設定がCustom Resourceの設計に上手く組み込まれておらず、大量のannotationを書かなければならないという不便さがありました。

その点、FluxはCustom Resourceの設計がよくできており、設定がシンプルであるというメリットがあります。

UIについては、そもそもUIではなくYamlファイルをGitHubにpushするというデプロイ方法を採用する予定だったため、UIの充実度はあまり重要ではありませんでした。

以上のことから、デプロイツールにはFluxCDを採用しました。

実装の話は別の記事にまとめています。↓

<https://qiita.com/piny940/items/536123b1c4b1884180fe>

### 5. 自宅サーバー上でのクラスタ構築

VPS上でのクラスタ構築がうまくいったため、自宅サーバー上でのクラスタ構築に取り掛かりました。

VPSで動作確認をしてきただけあって、自宅サーバー上でのクラスタ構築はスムーズに進みました。

<https://qiita.com/piny940/items/699120125d3701eea662>

### 6. Secret管理基盤の構築

Kubernetesクラスタを構築すると、Secretの管理が必要になります。

KubernetesのSecretはBase64エンコードされているだけで、暗号化されていないため、マニフェストに記述してGitHubにpushするという方法はセキュリティ上よろしくありません。
とはいえ、毎回サーバー上で `kubectl apply -f`するのも面倒ですしミスが発生する可能性が高まります。

そのため、Secret管理基盤を構築することにしました。

候補としては、以下の2つのツールが挙がりました。

- [External Secret Operator](https://external-secrets.io/latest/)
- [Secret Store CSI Driver](https://github.com/kubernetes-sigs/secrets-store-csi-driver)

各ツールのドキュメントを読んだところ、Secret Store CSI DriverはSecretをPodにマウントするという仕組みでSecretがPodに渡されるようになっているようでした。
一方External Secret Operatorは、Secretそのものを作ってくれるので、汎用性が高いというメリットがあります。

以上のことから、Secret管理基盤にはExternal Secret Operatorを採用しました。

実装の話は別の記事にまとめています。↓

<https://qiita.com/piny940/items/66214e8f7c8af18ba014>

### 7. DNS設定の自動化

Kubernetesクラスタを構築すると、サービスを公開するためにはDNS設定が必要になります。  
しかし、毎回手動でDNS設定を変更するのは面倒ですし、ミスが発生する可能性が高まります。

そのため、DNS設定を自動化することにしました。

DNSの自動化には、[External DNS](https://github.com/kubernetes-sigs/external-dns)が使えそうです。

しかし、自宅サーバーの公開には[Cloudflare Tunnel](https://www.cloudflare.com/products/tunnel/)を使っているため、External DNSをそのまま使うことはできませんでした。

そのため、External DNSをforkして、Cloudflare Tunnelに対応させることにしました。

この辺の話は別の記事にまとめています。↓

<https://qiita.com/piny940/items/a151757676beda68e7ae>

### 8. ステージング環境の構築

クラスタ上では、止めたくないサービスが複数稼働しています。
しかし、新しい機能を追加する際に、なにかバグがあってサービスが停止してしまうということがしばしばありました。

そのため、クラスタを安定して運用するためにはステージング環境の構築が不可欠だと感じ、ステージング環境の構築に取り掛かりました。

実装については別の記事にまとめています。↓

<https://qiita.com/piny940/items/063db2490b257299caac>

### 9. Kubernetesのバックアップ

現在、お金の関係でクラスタをHA構成にすることができていません。そのためサーバーが壊れた場合、クラスタのデータがすべて消えてしまうというリスクがあります。

そのため、クラスタのバックアップを取ることにしました。

[Velero](https://velero.io)を使ってGCSにバックアップを取ることで、ボリュームの内容も含めてバックアップを取ることができるようになりました。

詳しい話は別の記事にまとめています。↓

<https://qiita.com/piny940/items/6e44ad469be5814acd50>

### 10. ログ収集基盤の構築

Fluentd・Elastic Search・Kibanaを使ってログ収集基盤を構築しました。  
Elastic Searchに保存したログはGrafanaからも見られるようになっています。

<https://qiita.com/piny940/items/d47653982670fc10c1c5>

### 11. モニタリング基盤の構築

PrometheusとAlertmanagerを使ってモニタリング基盤を構築しました。ロール周りで苦労しましたが、なんとか解決することができました。

<https://qiita.com/piny940/items/1e44d8caf936216ca93e>

Alertmanagerを使ったアラートでは、Kubernetesクラスタそのものがダウンしたときに通知が来なくなるという問題がありました。そこで、AWSのlambdaを使って、Kubernetesクラスタのダウンを検知する仕組みを作りました。

<https://qiita.com/piny940/items/417aeb6460a8c285f902>

## 今後について

これまで、Kubernetesクラスタの構築・運用で様々な工夫を行ってきました。  
とはいえ、まだまだKubernetesの機能で使ったことがないものもたくさんあります。今後はCustom Resourceの自作やHookなどを使って、より効率的な運用を目指していきたいと考えています。
