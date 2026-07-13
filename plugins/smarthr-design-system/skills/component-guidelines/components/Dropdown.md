# Dropdown

ボタンを押すとパネルが開く動作を提供するプリミティブコンポーネントです。DropdownMenuButton/FilterDropdown/SortDropdownで実現できない独自のドロップダウンUIを提供するときに使います。

大きく分けるとパネルを開くための引き金となるDropdownTriggerとパネル自体を指すDropdownContentから構成されます。

## import

```ts
import { DropdownTrigger, DropdownContent, DropdownCloser, Dropdown } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v97.0.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

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
