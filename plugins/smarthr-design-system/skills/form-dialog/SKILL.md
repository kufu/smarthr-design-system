---
name: form-dialog
description: "フォームをダイアログ内に表示するとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するときに使う。フォーム要素を内包し、ユーザーに入力や選択などの操作を求めるためのActionDialog派生のダイアログコンポーネントです。ダイアログ内で入力フォームを送信するとき、Enterキーでの送信が必要なときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

フォーム要素を内包し、ユーザーに入力や選択などの操作を求めるためのActionDialog派生のダイアログコンポーネントです。ダイアログ内で入力フォームを送信するとき、Enterキーでの送信が必要なときに使います。

フォーム要素を内包し、ユーザーに入力や選択などの操作を求めるための[ActionDialog](/products/components/dialog/action-dialog/)派生のダイアログコンポーネントです。ダイアログ内で入力フォームを送信するとき、`Enter`キーでの送信が必要なときに使います。

## import

```ts
import { FormDialog } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| size | "XS" \| "S" \| "M" \| "L" \| "XL" \| "XXL" \| "FULL" | - | - | ダイアログの大きさ |
| width | string \| number | - | - | @deprecated ダイアログの幅を指定する場合は、`width` ではなく `size` を使用してください。 ダイアログの幅 |
| className | string | - | - | - |
| onSubmit | (e: FormEvent<HTMLFormElement>, helpers: FormDialogHelpers) => void | - | ✓ | アクションボタンをクリックした時に発火するコールバック関数 @param e フォームイベント @param helpers ダイアログ操作のためのヘルパー関数 |
| heading | ReactNode \| ObjectHeadingType | - | ✓ | - |
| decorators | DecoratorsType<"closeButtonLabel"> | - | - | コンポーネント内の文言を変更するための関数を設定 |
| subActionArea | ReactNode | - | - | ダイアログフッターの左端操作領域 |
| responseStatus | ResponseStatus | - | - | - |
| firstFocusTarget | RefObject<HTMLElement> | - | - | ダイアログを開いた時にフォーカスする対象 |
| onClickOverlay | () => void | - | - | オーバーレイをクリックした時に発火するコールバック関数 |
| onPressEscape | (() => void) & ((close: () => void) => void) | - | - | エスケープキーを押下した時に発火するコールバック関数 |
| ariaLabel | string | - | - | ダイアログの `aria-label` |
| ariaLabelledby | string | - | - | ダイアログの `aria-labelledby` |
| portalParent | HTMLElement \| RefObject<HTMLElement> | - | - | DOM 上でダイアログの要素を追加する親要素 |
| contentBgColor | "BACKGROUND" \| "COLUMN" \| "BASE_GREY" \| "OVER_BACKGROUND" \| "HEAD" \| ... 他8個 | - | - | - |
| contentPadding | Gap \| { block?: Gap; inline?: Gap; } | - | - | - |
| actionText | ReactNode | - | ✓ | アクションボタンのラベル |
| actionTheme | "primary" \| "secondary" \| "danger" | - | - | アクションボタンのスタイル |
| actionDisabled | boolean | - | - | アクションボタンを無効にするかどうか |
| closeDisabled | boolean | - | - | 閉じるボタンを無効にするかどうか |
| onClickClose | (close: () => void) => void | - | - | - |
| onToggle | (isOpen: boolean) => void | - | - | - |
| onOpen | () => void | - | - | - |
| onClose | () => void | - | - | - |

## 実装ルール

FormDialog に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
