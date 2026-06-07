# Chip

テキストをタグのように装飾して表示するためのコンポーネントです。

Chipを用いて装飾するのに向いているテキストはオブジェクトのプロパティで、タグやカテゴリーなどが該当します。

## import

```ts
import { Chip } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| disabled | boolean | - | - | - |
| size | "s" | - | - | - |

## 実装ルール

Chip に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > オブジェクトのステータス表示に使用しない
- [must] オブジェクトのステータス表示には Chip を使わず、StatusLabel を使う

### 使用上の注意 > 操作フィードバックの表示に使用しない
- [should] 操作フィードバックの表示には Chip を使わず、ResponseMessage や NotificationBar の使用を検討する

### 使用上の注意 > 重要な情報の表示に使用しない
- [must] 入力の必須条件や必ず確認させたいメッセージなど重要な情報の表示には Chip を使わず、ResponseMessage や InformationPanel を使う

### 使用上の注意 > リンクを含めない
- [must] Chip 内のテキストの一部または全部にリンクを含めず、リンクを使用したい場合は TextLink を使う

### 使用上の注意 > アクションの要素を含めない
- [should] Chip にアクションの要素を含めず、アクション要素を持たせたい場合は Button などの使用を検討する
