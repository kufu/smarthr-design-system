# FormDialog

フォーム要素を内包し、ユーザーに入力や選択などの操作を求めるためのActionDialog派生のダイアログコンポーネントです。ダイアログ内で入力フォームを送信するとき、Enterキーでの送信が必要なときに使います。

各種基準はActionDialogと共通です。

## import

```ts
import { FormDialog } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v97.0.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| size | "XS" \| "S" \| "M" \| "L" \| "XL" \| "XXL" \| "FULL" | - | - | ダイアログの大きさ |
| width | string \| number | - | - | @deprecated ダイアログの幅を指定する場合は、`width` ではなく `size` を使用してください。 ダイアログの幅 |
| className | string | - | - | - |
| onSubmit | (e: FormEvent<HTMLFormElement>, helpers: FormDialogHelpers) => void | - | ✓ | アクションボタンをクリックした時に発火するコールバック関数 @param e フォームイベント @param helpers ダイアログ操作のためのヘルパー関数 |
| heading | ReactNode \| ObjectHeadingType | - | ✓ | - |
| closeButton | ReactNode \| { text: ReactNode; disabled?: boolean; } | - | - | - |
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
| actionButton | ReactNode \| { text: ReactNode; theme?: "primary" \| "danger" \| "secondary"; disabled?: boolean; } | - | ✓ | - |
| onClickClose | (close: () => void) => void | - | - | - |
| onToggle | (isOpen: boolean) => void | - | - | - |
| onOpen | () => void | - | - | - |
| onClose | () => void | - | - | - |

## 実装ルール

FormDialog に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > ダイアログコンテンツにフォームが含まれている場合は、FormDialogの使用を検討する
- [should] ダイアログコンテンツにフォーム要素を含む場合は FormDialog の使用を検討する
  - `Enter` キーの押下でアクションボタンの送信処理を実行する
  - アクション系コールバックは `onSubmit` で、引数は `FormEvent<HTMLFormElement>` を受け取る
