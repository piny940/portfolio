## はじめに

本記事は、Vtuber が歌枠で歌った曲を検索できるサービスを作成した記録を書き連ねたものです。

サービスリンク: [https://song-list.piny940.com](https://song-list.piny940.com)  
Github: [https://github.com/piny940/song-list](https://github.com/piny940/song-list)

## 使用技術

### バックエンド

- Ruby 3.1.2
- Ruby on Rails 7.0.5

### 主な Gem

- rspec-rails  
  テストは Rspec を用いて行いました。
- haml
- rack-cors  
  フロントエンドとの通信を可能とするために使用しました。
- selenium-webdriver, nokogiri  
  スクレイピング・HTML 解析のために使用しました。
- kaminari  
  ページング機能をつけるために使用しました。

### フロントエンド

- React 18.2.0
- Next 13.4.4
- Typescript 5.0.4
- eslint 8.41.0
- prettier ^2.8.8
- sass ^1.62.1
- Bootstrap ^5.3.0

### インフラ

- kagoya VPS
- Nginx

### 外部 API

- Youtube API  
  チャンネルや動画の詳細を取得したり、セトリ作成のためにコメントを取得するために使用しました。
- Spotify API  
  歌手名を検索するために使用しました。
- OpenAI
  動画のコメントからセトリ(JSON 形式)に変換するために使用しました。

## 作成の動機

## 機能

## 実装

## 苦労した点
