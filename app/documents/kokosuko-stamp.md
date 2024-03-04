## 目次
[1. はじめに](#1-はじめに)  
[2. 作ったアプリについて](#2-作ったアプリについて)  
[3. 開発の流れ](#3-開発の流れ)  
[4. プロジェクトを通して学んだこと](#4-プロジェクトを通して学んだこと)  

## 1. はじめに
Youtubeでタイムスタンプを手軽に打てるようにする拡張機能を作成したのでその記録を記します。

**参考: Youtubeのタイムスタンプ機能とは**  
Youtubeでは、コメント欄に「11:03」のように時間を記載すると、動画内のその時間へ移るリンクを
書くことができます。  
本アプリは、このような動画内の特定の時間を表すタイムスタンプを手軽に残せるようにした拡張機能です。

## 2. 作ったアプリについて
[2-1 アプリの概要](#2-1-アプリの概要)  
[2-2 アプリの3つの特徴](#2-2-アプリの3つの特徴)  
[2-3 アプリの画面](#2-3-アプリの画面)  

### 2-1 アプリの概要
Youtubeで動画を視聴中に「+ボタン」を押すとその時点でのタイムスタンプを押すことができます。  
「コピーボタン」を押すとタイムスタンプの内容をクリップボードにコピーしてそのままコメントすることができます。

![アプリ画面](https://i.gyazo.com/1afc8fbfc80847c29bf486aae6b3998b.png)

### 2-2 アプリの特徴
[1. タイムスタンプの時間を一括で変更できる](#1-タイムスタンプの時間を一括で変更できる)  
[2. Youtubeの見た目に溶け込んでいる](#2-Youtubeの見た目に溶け込んでいる)

#### 1. タイムスタンプの時間を一括で変更できる
タイムスタンプを作っていると、しばしば「全部の時間を5秒早めたい」ということがあります。  
例えば、何か面白いポイントでタイムスタンプをつけたとき、文脈を把握するために、その少し前から
再生ができるようにしたくなります。

このような需要に対応するために、時間を一括で⚪︎秒ずらすことができる、オフセット機能を搭載しました。

#### 2. Youtubeの見た目に溶け込んでいる
この拡張機能は、見た目についてもこだわりました。Youtubeで使われているテーマ(ライトテーマ、ダークテーマ)
を自動で読み取り、そのテーマに合った配色になるようにしました。

![ライトテーマ](https://i.gyazo.com/976fbff7d419913728a00759bb442655.png)
![ダークテーマ](https://i.gyazo.com/f4547116f7ba73ae93c3481ac3b5f13e.png)

### 2-3 アプリの使い方
![アプリ画面](https://i.gyazo.com/1afc8fbfc80847c29bf486aae6b3998b.png)

- スタンプを追加  
プラスボタンを押すとスタンプを追加することができます
- リンクへ飛ぶ  
タイムスタンプを残した動画内のポイントに移ることができます
- 並び替えon/off
並び替えをonにすると時間順に並びます。offにするとタイムスタンプを追加した順に並びます。


## 3. 開発の流れ
2023年2月〜3月で要件定義・開発を行いました。開発全体を通して設計・実装を全て1人で行いました。

|時期|内容|
|--|--|
|2月|要件定義・開発|
|3月|開発|

### 使用技術

- Typescript
- React
- テスト: jest

## 4. プロジェクトを通して学んだこと
- chrome拡張機能の作成・公開の流れを把握できた
- 既存の拡張機能を調査して、新たにどのような機能があると便利か考えるという事業的な思考を体験できた