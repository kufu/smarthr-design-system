---
name: dialog
description: "ページ前面に表示されるダイアログ領域のプリミティブコンポーネントです。ActionDialog/MessageDialog/ModelessDialog/FormDialog/StepFormDialogで実現できない独自のダイアログを提供するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2
---

ページ前面に表示されるダイアログ領域のプリミティブコンポーネントです。ActionDialog/MessageDialog/ModelessDialog/FormDialog/StepFormDialogで実現できない独自のダイアログを提供するときに使います。

ダイアログは、ユーザーに入力や選択などの操作を求めたり、情報を提示するために使われます。ユーザーの操作を起点として表示され、ユーザーの操作によって閉じられます。

## import

```ts
import { DialogWrapper, DialogTrigger, DialogContent, DialogCloser, Dialog } from 'smarthr-ui'
```

## Props

### DialogWrapper
（固有 Props なし）

### DialogTrigger
（固有 Props なし）

### DialogContent
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| size | "XS" \| "S" \| "M" \| "L" \| "XL" \| "XXL" \| "FULL" | - | - | ダイアログの大きさ |
| width | string \| number | - | - | @deprecated ダイアログの幅を指定する場合は、`width` ではなく `size` を使用してください。 ダイアログの幅 |
| firstFocusTarget | RefObject<HTMLElement> | - | - | ダイアログを開いた時にフォーカスする対象 |
| ariaLabel | string | - | - | ダイアログの `aria-label` |
| ariaLabelledby | string | - | - | ダイアログの `aria-labelledby` |
| portalParent | HTMLElement \| RefObject<HTMLElement> | - | - | DOM 上でダイアログの要素を追加する親要素 |

### DialogCloser
（固有 Props なし）

### Dialog
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| size | "XS" \| "S" \| "M" \| "L" \| "XL" \| "XXL" \| "FULL" | - | - | ダイアログの大きさ |
| width | string \| number | - | - | @deprecated ダイアログの幅を指定する場合は、`width` ではなく `size` を使用してください。 ダイアログの幅 |
| firstFocusTarget | RefObject<HTMLElement> | - | - | ダイアログを開いた時にフォーカスする対象 |
| ariaLabel | string | - | - | ダイアログの `aria-label` |
| ariaLabelledby | string | - | - | ダイアログの `aria-labelledby` |
| isOpen | boolean | - | ✓ | ダイアログを開いているかどうか |
| onClickOverlay | () => void | - | - | オーバーレイをクリックした時に発火するコールバック関数 |
| onPressEscape | () => void | - | - | エスケープキーを押下した時に発火するコールバック関数 |
| portalParent | HTMLElement \| RefObject<HTMLElement> | - | - | DOM 上でダイアログの要素を追加する親要素 |

## 実装ルール

### a11y-trigger-has-button
DropdownTriggerやDialogTrigger, DisclosureTrigger内にbutton要素を設置することを強制するルールです。

❌ NG:

```jsx
// Triggerの子はbutton要素のみである必要がある
<DialogTrigger>
  <Button />
  <Any />
</DialogTrigger>
```

✅ OK:

```jsx
<DialogTrigger>
  <XxxButton />
</DialogTrigger>
```

### best-practice-for-remote-trigger-dialog
RemoteDialogTrigger、RemoteTriggerXxxxDialogのベストプラクティスをチェックするルールです。

### design-system-guideline-prohibit-dialog-button-icon
Dialogのボタンテキストにアイコンコンポーネント（名前が"Icon"で終わるコンポーネント）を含めることを禁止するルールです。

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
