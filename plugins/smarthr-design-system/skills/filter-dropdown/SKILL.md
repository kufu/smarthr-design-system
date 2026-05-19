---
name: filter-dropdown
description: "smarthr-ui の FilterDropdown を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。「よくあるテーブル」などで絞り込み条件を入力するためのドロップダウンコンポーネントです。Checkbox/RadioButton/日付などの入力要素をドロップダウンパネル内に配置し、絞り込みの適用・解除を提供するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

「よくあるテーブル」などで絞り込み条件を入力するためのドロップダウンコンポーネントです。Checkbox/RadioButton/日付などの入力要素をドロップダウンパネル内に配置し、絞り込みの適用・解除を提供するときに使います。

「[よくあるテーブル](/products/design-patterns/smarthr-table/)」などで絞り込み条件を入力するためのドロップダウンコンポーネントです。[Checkbox](/products/components/check-box/)/[RadioButton](/products/components/radio-button/)/日付などの入力要素をドロップダウンパネル内に配置し、絞り込みの適用・解除を提供するときに使います。

## import

```ts
import { FilterDropdown } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| trigger | ReactNode \| { children: ReactNode; size?: ButtonProps; onlyIcon?: boolean \| { component?: ComponentType<any>; }; } | - | - | 引き金となるボタン |
| applyText | ReactNode | - | - | - |
| cancelText | ReactNode | - | - | - |
| resetText | ReactNode | - | - | - |
| filtered | boolean \| { iconAlt?: ReactNode; } | - | - | - |
| responseStatus | ResponseStatus | - | - | - |
| onApply | MouseEventHandler<HTMLButtonElement> | - | ✓ | - |
| onCancel | MouseEventHandler<HTMLButtonElement> | - | - | - |
| onReset | MouseEventHandler<HTMLButtonElement> | - | - | - |
| onOpen | () => void | - | - | - |
| onClose | () => void | - | - | - |

## 実装ルール

FilterDropdown に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
