---
name: combobox
description: "smarthr-ui の Memoized を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。smarthr-ui の Memoized コンポーネントの使い方ガイド。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

## import

```ts
import { Memoized } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| option | ComboboxOption<T> | - | ✓ | - |
| onAdd | (option: ComboboxOption<T>) => void | - | - | - |
| onSelect | (option: ComboboxOption<T>) => void | - | ✓ | - |
| onMouseOver | (option: ComboboxOption<T>) => void | - | ✓ | - |
| activeRef | RefObject<HTMLButtonElement> | - | ✓ | - |

## 実装ルール

Combobox に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
