## 目次
[1. はじめに](#1-はじめに)  
[2. 作ったアプリについて](#2-作ったアプリについて)  
[3. 開発の流れ](#3-開発の流れ)  
[4. プロジェクトを通して学んだこと](#4-プロジェクトを通して学んだこと)  

## 1. はじめに
discordのようにグループトークができるチャットアプリを開発したのでその記録を記します。

## 2. 作ったアプリについて
[2-1 アプリの概要](#2-1-アプリの概要)  
[2-2 アプリの3つの特徴](#2-2-アプリの3つの特徴)  
[2-3 アプリの画面](#2-3-アプリの画面)  

### 2-1 アプリの概要
このチャットアプリは部活動やサークルで使われることを想定して制作しました。部活ごとに「グループ」を作成し、グループごとに複数のトークルームを作ることができます。

![アプリ画面](https://i.gyazo.com/f52ca83a56757a43dabe11d5e46c0e42.png)

### 2-2 アプリの3つの特徴
[1. グループごとにトークルームを整理できる](#1-グループごとにトークルームを整理できる)  
[2. トークルームに簡単に招待ができる](#2-トークルームに簡単に招待ができる)  
[3. レスポンシブデザイン](#3-レスポンシブデザイン)  

#### 1. グループごとにトークルームを整理できる
このアプリは、LINEにおいて1つのサークルで「学園祭用のグループ」や「合宿用のグループ」「団体戦用のグループ」など複数のグループチャットを作成してトークルームがごちゃついてしまうという問題を解消するという目的で作成しました。  
このアプリでは、グループごとに複数のトークルームを作ることができ、トークルームをわかりやすく整理することができます。

1枚目: サッカー部のグループ、2枚目: 3年1組のグループ
![サッカー部のグループ](https://i.gyazo.com/f52ca83a56757a43dabe11d5e46c0e42.png)
![3年1組のグループ](https://i.gyazo.com/6beee4fb89d3f3baaae179ad2827ff41.png)

#### 2. トークルームに簡単に招待ができる
LINEなどではグループチャットにクラスのメンバーを招待するために全員を招待する手間が必要でした。  
このアプリでは、複数のメンバーをグループやトークルームに手軽に招待できるよう、1つの招待リンクを使って複数の友達を招待できるようにしました。

たくさんの友達を招待したい時は、招待リンクを渡すだけで招待ができます！

左: グループ設定画面、右: トークルーム招待画面  
<img src="https://i.gyazo.com/8e9729828a73045ef6b66066c35c0e51.png" alt="グループ招待" width="400" class="custom">
<img src="https://i.gyazo.com/f55885c6f073664d74dd8029c89c7931.png" alt="トークルーム招待" width="400" class="custom">

#### 3. レスポンシブデザイン
スマートフォンから見てもレイアウトが崩れないよう工夫しました。  
<img src="https://i.gyazo.com/24e21b68c9d9b3b9575e85daa6619150.png" alt="スマホ画面" width="400" class="custom">

### 2-3 アプリの画面
- **メイン画面**  
左のトークルーム一覧からトークルームを選択し、グループトークをすることができます。
![メイン画面](https://i.gyazo.com/f52ca83a56757a43dabe11d5e46c0e42.png)

- **トーク設定画面**  
トークルーム名の右の歯車を押すとトークルーム設定を開くことができ、招待リンクをコピーすることができます。

<img src="https://i.gyazo.com/f55885c6f073664d74dd8029c89c7931.png" alt="トーク設定画面" width="400" class="custom">

- **グループ新規作成**  
右上のグループ名をクリックするとグループ新規作成ができます。グループを作った人は自動的にそのグループの管理者となり、新規メンバーの招待・グループの削除をする権限が付与されます。
<img src="https://i.gyazo.com/d64af715dd48bb05acda2cf2456d73b2.png" alt="グループ新規作成" width="400" class="custom">

- **グループ設定画面**  
右上のアイコンを押すとグループ設定を開くことができ、招待リンクをコピーすることができます。
<img src="https://i.gyazo.com/8e9729828a73045ef6b66066c35c0e51.png" alt="トーク設定画面" width="400" class="custom"> 

## 3. 開発の流れ
2022年7月〜11月で要件定義・開発を行いました。開発全体を通して設計・実装を全て1人で行いました。

|時期|内容|
|--|--|
|7月|要件定義・設計|
|8〜11月|開発|

### 使用技術
**バックエンド**  
- Rails

**フロントエンド**  
- Next.js(React.js)
- Typescript
- テスト: jest・cypress

## 4. プロジェクトを通して学んだこと
### 4-1. 多対多構造を持つデータベース
今回のアプリでは、「ユーザーとグループ」と「ユーザーとトークルーム」が多対多の関係になります。また、ユーザーは属している各グループにおいて**管理者**か**一般メンバー**かが決まっており、その情報も保持する必要があります。

そこで、本アプリではユーザーとグループの間に中間テーブル***joinings***を定義し、ロールに関する情報を*joinings*テーブルに保持する設計にしました。

この開発を通して、中間テーブルを通した多対多構造の扱い方、***has_many :through***の扱いなどを学ぶことができました。

![多対多構造のER図](https://i.gyazo.com/da9e8140ac3a7a06054818b14e769e60.png)

### 4-2. Reactコードの設計
このアプリでは、バックエンドとの通信などの含めた複雑なフロントエンドを扱う必要がありました。そのため、ステートを扱うコンポーネントと見た目を扱うコンポーネント等、コンポーネントごとの役割を明確化してコードを整理する勉強ができました。
