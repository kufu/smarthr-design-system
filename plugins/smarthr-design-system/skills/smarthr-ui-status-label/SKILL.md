---
name: smarthr-ui-status-label
description: "オブジェクトの状態を短いラベルで伝えるためのコンポーネントです。Table内のステータス欄や、オブジェクト詳細の画面タイトルで状態を提示するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer3
---

オブジェクトの状態を短いラベルで伝えるためのコンポーネントです。Table内のステータス欄や、オブジェクト詳細の画面タイトルで状態を提示するときに使います。

オブジェクトの状態を短いラベルで伝えるためのコンポーネントです。[Table](/products/components/table/)内のステータス欄や、オブジェクト詳細の画面タイトルで状態を提示するときに使います。

## import

```ts
import { StatusLabel } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| type | "error" \| "grey" \| "blue" \| "green" \| "red" \| "warning" | - | - | - |
| bold | boolean | - | - | - |

## 実装ルール

StatusLabel に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > オブジェクト名自体をStatusLabelで表現しない
- [avoid] オブジェクト名そのものを StatusLabel で表現しない

### 使用上の注意 > StatusLabelをリンクやアクションボタンの代替にしない
- [avoid] StatusLabel 単体でリンクやアクションボタンの機能を持たせない

### 種類
- [must] ステータスの種類に応じて色を使い分ける
  - 特殊なステータス（警告・エラー）を表す場合は、背景色に警告色やエラー色を使う
  - その他のステータスを表す場合は、プロダクトに応じて適宜色を選択する
- [must] 色のみでステータスを伝えず、適切な名前を付ける

### 状態 > 強調の有無
- [should] 他のステータスと区別して視覚的に目立たせたい場合は、背景色と文字色を反転させた「強調あり」のラベルを使う
