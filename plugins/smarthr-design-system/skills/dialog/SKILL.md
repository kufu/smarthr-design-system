---
name: dialog
description: "smarthr-ui の FocusTrap / DialogWrapper / DialogTrigger / DialogOverlap / DialogHeading / DialogContentResponseStatusMessage / DialogContentInner / DialogContent / DialogCloser / DialogBody / Dialog を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。ダイアログボックス（もしくは単に「ダイアログ」）と呼ばれる、ページの前面に表示される領域のためのコンポーネントです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2
---

ダイアログボックス（もしくは単に「ダイアログ」）と呼ばれる、ページの前面に表示される領域のためのコンポーネントです。

Dialogコンポーネントは、ダイアログボックス（もしくは単に「ダイアログ」）と呼ばれる、ページの前面に表示される領域のためのコンポーネントです。

## import

```ts
import { FocusTrap, DialogWrapper, DialogTrigger, DialogOverlap, DialogHeading, DialogContentResponseStatusMessage, DialogContentInner, DialogContent, DialogCloser, DialogBody, Dialog } from 'smarthr-ui'
```

## Props

### FocusTrap
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| firstFocusTarget | RefObject<HTMLElement> | - | - | - |

### DialogWrapper
（固有 Props なし）

### DialogTrigger
（固有 Props なし）

### DialogOverlap
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| isOpen | boolean | - | ✓ | - |

### DialogHeading
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| text | ReactNode | - | ✓ | ダイアログタイトル |
| sub | ReactNode | - | - | ダイアログサブタイトル |

### DialogContentResponseStatusMessage
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| responseStatus | { isProcessing: boolean; status: "error" \| "success"; message: ReactNode; } | - | ✓ | - |
| className | string | - | - | - |

### DialogContentInner
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| onClickOverlay | () => void | - | - | オーバーレイをクリックした時に発火するコールバック関数 |
| onPressEscape | () => void | - | - | エスケープキーを押下した時に発火するコールバック関数 |
| isOpen | boolean | - | ✓ | ダイアログを開いているかどうか |
| width | string \| number | - | - | @deprecated ダイアログの幅を指定する場合は、`width` ではなく `size` を使用してください。 ダイアログの幅 |
| size | "XS" \| "S" \| "M" \| "L" \| "XL" \| "XXL" \| "FULL" | - | - | ダイアログの大きさ |
| firstFocusTarget | RefObject<HTMLElement> | - | - | ダイアログを開いた時にフォーカスする対象 |
| ariaLabel | string | - | - | ダイアログの `aria-label` |
| ariaLabelledby | string | - | - | ダイアログの `aria-labelledby` |
| focusTrapRef | RefObject<FocusTrapRef> | - | - | ダイアログトップのフォーカストラップへの ref |

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

### DialogBody
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| contentBgColor | "BACKGROUND" \| "COLUMN" \| "BASE_GREY" \| "OVER_BACKGROUND" \| "HEAD" \| ... 他8個 | - | - | - |
| contentPadding | Gap \| { block?: Gap; inline?: Gap; } | - | - | - |
| className | string | - | - | - |

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
