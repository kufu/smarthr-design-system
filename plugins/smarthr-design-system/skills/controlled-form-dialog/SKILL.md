---
name: controlled-form-dialog
description: "FormDialog の開閉状態を外部 state で制御するとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するときに使う。FormDialogの開閉状態を外部stateで制御する派生コンポーネントです。開閉状態をアプリケーション側で管理するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

FormDialogの開閉状態を外部stateで制御する派生コンポーネントです。開閉状態をアプリケーション側で管理するときに使います。

ダイアログコンテンツにフォームが含まれている場合に使用する[ActionDialog](/products/components/dialog/action-dialog/)の派生コンポーネントです。 ユーザーに入力や選択などの操作を求め、入力内容をシステムに送信するために使います。

## import

```ts
import { ControlledFormDialog } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| className | string | - | - | - |
| onSubmit | (e: FormEvent<HTMLFormElement>, helpers: FormDialogHelpers) => void | - | ✓ | アクションボタンをクリックした時に発火するコールバック関数 @param e フォームイベント @param helpers ダイアログ操作のためのヘルパー関数 |
| decorators | DecoratorsType<"closeButtonLabel"> | - | - | コンポーネント内の文言を変更するための関数を設定 |
| subActionArea | ReactNode | - | - | ダイアログフッターの左端操作領域 |
| responseStatus | ResponseStatus | - | - | - |
| contentBgColor | "BACKGROUND" \| "COLUMN" \| "BASE_GREY" \| "OVER_BACKGROUND" \| "HEAD" \| ... 他8個 | - | - | - |
| contentPadding | Gap \| { block?: Gap; inline?: Gap; } | - | - | - |
| onClickClose | () => void | - | ✓ | - |
| actionText | ReactNode | - | ✓ | アクションボタンのラベル |
| actionTheme | "primary" \| "secondary" \| "danger" | - | - | アクションボタンのスタイル |
| actionDisabled | boolean | - | - | アクションボタンを無効にするかどうか |
| closeDisabled | boolean | - | - | 閉じるボタンを無効にするかどうか |
| size | "XS" \| "S" \| "M" \| "L" \| "XL" \| "XXL" \| "FULL" | - | - | ダイアログの大きさ |
| width | string \| number | - | - | @deprecated ダイアログの幅を指定する場合は、`width` ではなく `size` を使用してください。 ダイアログの幅 |
| firstFocusTarget | RefObject<HTMLElement> | - | - | ダイアログを開いた時にフォーカスする対象 |
| ariaLabel | string | - | - | ダイアログの `aria-label` |
| ariaLabelledby | string | - | - | ダイアログの `aria-labelledby` |
| isOpen | boolean | - | ✓ | ダイアログを開いているかどうか |
| onClickOverlay | () => void | - | - | オーバーレイをクリックした時に発火するコールバック関数 |
| onPressEscape | () => void | - | - | エスケープキーを押下した時に発火するコールバック関数 |
| portalParent | HTMLElement \| RefObject<HTMLElement> | - | - | DOM 上でダイアログの要素を追加する親要素 |
| heading | ReactNode \| ObjectHeadingType | - | ✓ | - |

## 実装ルール

ControlledFormDialog に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
