---
name: sort-dropdown
description: "コレクションの並べ替えを提供するためのドロップダウンコンポーネントです。主にテーブル以外のリストやカード一覧の並べ替え項目と並び順を設定するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer3
---

コレクションの並べ替えを提供するためのドロップダウンコンポーネントです。主にテーブル以外のリストやカード一覧の並べ替え項目と並び順を設定するときに使います。

## import

```ts
import { SortDropdown } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| sortFields | SortFieldType[] | - | ✓ | 並び替え項目 |
| defaultOrder | "desc" \| "asc" | - | ✓ | 並び順の初期値 |
| sortFieldLabel | ReactNode | - | - | - |
| sortOrderLegend | ReactNode | - | - | - |
| ascLabel | ReactNode | - | - | - |
| descLabel | ReactNode | - | - | - |
| applyText | ReactNode | - | - | - |
| cancelText | ReactNode | - | - | - |
| onApply | (args: ArgsOnApply) => void | - | ✓ | 適用時に発火するイベント |
| onCancel | MouseEventHandler<HTMLButtonElement> | - | - | キャンセル時に発火するイベント |
| ref | Ref<HTMLButtonElement> | - | - | - |

## 実装ルール

SortDropdown に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意
- [must] テーブルを並べ替える場合は Th の `sort` プロパティを使う

### レイアウト > [WIP] モバイル > ドロップダウンパネル
- [must] モバイル端末ではドロップダウンパネルを ActionDialog を用いてモーダルに表示する
