---
name: dropdown
description: "smarthr-ui の DropdownTrigger / DropdownContent / DropdownCloser / Dropdown を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。ボタンを押すとパネルが開く機能の抽象コンポーネントです。パネルを開くための引き金となるDropdownTriggerとパネル自体を指すDropdownContentから構成されます。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2
---

ボタンを押すとパネルが開く機能の抽象コンポーネントです。パネルを開くための引き金となるDropdownTriggerとパネル自体を指すDropdownContentから構成されます。

ボタンを押すとパネルが開く機能の抽象コンポーネントです。大きく分けるとパネルを開くための引き金となるDropdownTriggerとパネル自体を指すDropdownContentから構成されます。

## import

```ts
import { DropdownTrigger, DropdownContent, DropdownCloser, Dropdown } from 'smarthr-ui'
```

## Props

### DropdownTrigger
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| tooltip | { message: ReactNode; show?: boolean; } | - | - | - |

### DropdownContent
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| controllable | boolean | false | - | `true` のとき、ドロップダウン内のコンテンツをクリックしてもドロップダウンが閉じなくなる。。  この場合は、 `DropdownCloser` を用いてドロップダウンを閉じることができる。 |

### DropdownCloser
（固有 Props なし）

### Dropdown
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| onOpen | () => void | - | - | - |
| onClose | () => void | - | - | - |

## 実装ルール

### a11y-trigger-has-button
DropdownTriggerやDialogTrigger, DisclosureTrigger内にbutton要素を設置することを強制するルールです。

❌ NG:

```jsx
// Triggerの子はbutton要素である必要がある
<DropdownTrigger>
  <Xxx />
</DropdownTrigger>
```

✅ OK:

```jsx
<DropdownTrigger>
  <Button />
</DropdownTrigger>
```

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

_checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
