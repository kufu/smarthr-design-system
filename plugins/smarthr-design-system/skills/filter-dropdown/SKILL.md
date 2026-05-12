---
name: filter-dropdown
description: "smarthr-ui の FilterDropdown を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。一覧の絞り込みを行なうためのコンポーネントで、パネル内に自由に入力要素を配置できるほか、絞り込みを適用したり解除したりするための機能も有しています。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

一覧の絞り込みを行なうためのコンポーネントで、パネル内に自由に入力要素を配置できるほか、絞り込みを適用したり解除したりするための機能も有しています。

FilterDropdownは一覧の絞り込みを行なうためのコンポーネントで、パネル内に自由に入力要素を配置できるほか、絞り込みを適用したり解除したりするための機能も有しています。

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
