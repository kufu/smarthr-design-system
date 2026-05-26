---
name: smarthr-ui-date-formatter
description: "DateFormatterは、日付データを任意の形式にフォーマットして表示するコンポーネントです。日付をユーザーの言語や地域設定に適した形式で表示するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer3
---

日付データを任意の形式にフォーマットして表示するコンポーネントです。日付をユーザーの言語や地域設定に適した形式で表示するときに使います。

日付データを任意の形式にフォーマットして表示するコンポーネントです。日付を[ユーザーの言語や地域設定に適した形式](/products/contents/idiomatic-usage/count/#h4-0)で表示するときに使います。

## import

```ts
import { DateFormatter } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| parts | readonly [DatePart, ...DatePart[]] | - | - | 表示する日付のパーツ。指定しない場合は全て表示 |
| options | DateTimeFormatOptions & { disableSlashInJa?: boolean; capitalizeFirstLetter?: boolean; } | - | - | フォーマットオプション |
| date | string \| Date | - | ✓ | - |

## 実装ルール

DateFormatter に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > 日付をフォーマットする機能だけ必要な場合
- [must] フォーマットされた日付の文字列だけが必要な場合は `useIntl` の `formatDate` を使う
