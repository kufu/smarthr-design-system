# ControlledFormDialog

FormDialogの開閉状態を外部stateで制御する派生コンポーネントです。開閉状態をアプリケーション側で管理するときに使います。

各種基準はActionDialogと共通です。

## import

```ts
import { ControlledFormDialog } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.1.1** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| className | string | - | - | - |
| onSubmit | (e: FormEvent<HTMLFormElement>, helpers: FormDialogHelpers) => void | - | ✓ | アクションボタンをクリックした時に発火するコールバック関数 @param e フォームイベント @param helpers ダイアログ操作のためのヘルパー関数 |
| subActionArea | ReactNode | - | - | ダイアログフッターの左端操作領域 |
| responseStatus | ResponseStatus | - | - | - |
| contentBgColor | "BACKGROUND" \| "COLUMN" \| "BASE_GREY" \| "OVER_BACKGROUND" \| "HEAD" \| ... 他8個 | - | - | - |
| contentPadding | Gap \| { block?: Gap; inline?: Gap; } | - | - | - |
| onClickClose | () => void | - | ✓ | - |
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
| actionButton | ReactNode \| { text: ReactNode; theme?: "primary" \| "danger" \| "secondary"; disabled?: boolean; } | - | ✓ | - |
| closeButton | ReactNode \| { text: ReactNode; disabled?: boolean; } | - | - | - |

## 実装ルール

ControlledFormDialog に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > ダイアログコンテンツにフォームが含まれている場合は、FormDialogの使用を検討する
- [should] ダイアログコンテンツにフォーム要素を含む場合は FormDialog の使用を検討する
  - `Enter` キーの押下でアクションボタンの送信処理を実行する
  - アクション系コールバックは `onSubmit` で、引数は `FormEvent<HTMLFormElement>` を受け取る
