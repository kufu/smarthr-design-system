---
name: smarthr-ui-upward-link
description: "UpwardLinkは、一階層上のコンテンツに戻るためのテキストリンクコンポーネントです。詳細画面から一覧画面など親階層へ戻る導線を置くときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer3
---

一階層上のコンテンツに戻るためのテキストリンクコンポーネントです。詳細画面から一覧画面など親階層へ戻る導線を置くときに使います。

## import

```ts
import { UpwardLink } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| indent | boolean | - | - | - |
| elementAs | ElementType | - | - | `TextLink`に渡す `elementAs` をオプションで指定 |

## 実装ルール

UpwardLink に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### レイアウト > インデント
- [must] UpwardLink のリンクテキストとメインコンテンツの左端を揃える
- [must] メインコンテンツにサイドナビゲーションが隣接する場合は、`indent` を無効にする
- [must] モバイルなど画面幅が狭い場合は、`indent` を無効にする

### ライティング
- [must] リンクテキストは基本的に `{一階層上の画面名}に戻る` と表記する
  - パーマリンクで直接移動してきた場合など一階層上のコンテンツの特定や類推が難しい場合は、`{一階層上の画面名}{一階層上のコンテンツの種類}に戻る` と表記する（例: コレクションは `{画面名}一覧に戻る`）
