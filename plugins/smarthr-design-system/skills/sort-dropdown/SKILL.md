---
name: sort-dropdown
description: "smarthr-ui の SortDropdown を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。主に表の並べ替え操作を統一するためのコンポーネントです。並べ替え項目と並び順を指定でき、ボタンラベルとアイコンで現在の並び順を表します。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

主に表の並べ替え操作を統一するためのコンポーネントです。並べ替え項目と並び順を指定でき、ボタンラベルとアイコンで現在の並び順を表します。

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

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
