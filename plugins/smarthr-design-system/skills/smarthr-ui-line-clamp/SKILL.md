---
name: smarthr-ui-line-clamp
description: "LineClampは、テキストが指定幅・高さを超えるときに省略表示しTooltipで全文を見せるためのコンポーネントです。長い文字列を行数制限で省略させるときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer3
---

テキストが指定幅・高さを超えるときに省略表示しTooltipで全文を見せるためのコンポーネントです。長い文字列を行数制限で省略させるときに使います。

最大行数maxLinesに1〜6を指定すると、その行数に収まらなかったテキストが「…」で省略されます。

## import

```ts
import { LineClamp } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| maxLines | 1 \| 2 \| 3 \| 4 \| 5 \| 6 | 3 | - | - |
| ref | Ref<HTMLSpanElement> | - | - | - |

## 実装ルール

LineClamp に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > LineClampの使用を推奨するケース > 付加的な情報を表示する場合
- [should] ユーザーの操作過程で「確認が必須ではない」程度の情報を表示する場合は LineClamp の使用を検討してよい

### 使用上の注意 > LineClampの使用を推奨するケース > 全文表示するとレイアウトが崩れて視認性が下がる場合
- [should] テーブルのセル内やリスト形式の UI で視認性を確保する場合は LineClamp の使用を検討してよい

### 使用上の注意 > LineClampの使用を避けるケース > 単に情報を省略して小さく表示する場合
- [avoid] 単に情報を省略する目的では LineClamp を使用しない

### 使用上の注意 > LineClampの使用を避けるケース > 重要な情報を省略する場合
- [avoid] ユーザーが把握しておかないと操作が進められないような重要な情報には LineClamp を使用せず、常に表示することを検討する
  - パスワードに使用できる文字や、エラーになる入力値などの入力要件
  - 入力エラーとなった際のエラーメッセージ
  - 操作補助になる情報（ショートカットなど）
  - ボタンなどの操作 UI のラベル

### モバイル
- [must] タッチデバイスでは hover 表示を前提とした Tooltip は使用せず、Disclosure を使用する
