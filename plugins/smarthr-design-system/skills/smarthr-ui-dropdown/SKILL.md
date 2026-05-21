---
name: smarthr-ui-dropdown
description: "ボタンを押すとパネルが開く動作を提供するプリミティブコンポーネントです。DropdownMenuButton/FilterDropdown/SortDropdownで実現できない独自のドロップダウンUIを提供するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2
---

ボタンを押すとパネルが開く動作を提供するプリミティブコンポーネントです。DropdownMenuButton/FilterDropdown/SortDropdownで実現できない独自のドロップダウンUIを提供するときに使います。

大きく分けるとパネルを開くための引き金となるDropdownTriggerとパネル自体を指すDropdownContentから構成されます。

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

使い方チェックリスト（Layer 3）は設定されていません。
