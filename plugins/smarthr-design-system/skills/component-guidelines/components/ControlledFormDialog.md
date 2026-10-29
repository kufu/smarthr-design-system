# ControlledFormDialog

FormDialogの開閉状態を外部stateで制御する派生コンポーネントです。開閉状態をアプリケーション側で管理するときに使います。

各種基準はActionDialogと共通です。

## import

```ts
import { ControlledFormDialog } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v100.1.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| ref | Ref<HTMLDivElement> | - | - | - |
| width | string \| number | - | - | @deprecated ダイアログの幅を指定する場合は、`width` ではなく `size` を使用してください。 ダイアログの幅 |
| onSubmit | (e: FormEvent<HTMLFormElement>, helpers: { close: () => void; }) => void | - | ✓ | フォーム送信時に発火するコールバック関数 |
| size | "XS" \| "S" \| "M" \| "L" \| "XL" \| "XXL" \| "FULL" | - | - | ダイアログの大きさ |
| heading | ReactNode \| ObjectHeadingType | - | ✓ | - |
| subActionArea | ReactNode | - | - | ダイアログフッターの左端操作領域 |
| responseStatus | ResponseStatus | - | - | - |
| firstFocusTarget | RefObject<HTMLElement> | - | - | ダイアログを開いた時にフォーカスする対象 |
| isOpen | boolean | - | ✓ | ダイアログを開いているかどうか |
| onClickOverlay | () => void | - | - | オーバーレイをクリックした時に発火するコールバック関数 @todo イベントハンドラー命名規則に従い handleClickOverlay に変更すべき（影響範囲大のため別PR） |
| onPressEscape | (e: KeyboardEvent) => void | - | - | エスケープキーを押下した時に発火するコールバック関数 @todo イベントハンドラー命名規則に従い handlePressEscape に変更すべき（影響範囲大のため別PR） |
| ariaLabel | string | - | - | ダイアログの `aria-label` |
| ariaLabelledby | string | - | - | ダイアログの `aria-labelledby` |
| contentBgColor | "BACKGROUND" \| "COLUMN" \| "BASE_GREY" \| "OVER_BACKGROUND" \| "HEAD" \| ... 他8個 | - | - | コンテンツ部分の背景色 |
| contentPadding | Gap \| { block?: Gap; inline?: Gap; } | - | - | - |
| portalParent | HTMLElement | - | - | DOM 上でダイアログの要素を追加する親要素。 ダイアログのマウントと同時に確定していない要素（例: ダイアログの祖先要素の ref）を 渡すと、その要素がまだ DOM に存在しない可能性があるため意図通りに動作しない。 呼び出し側で要素が確定してから渡すこと。 |
| closeButton | ReactNode \| any | - | - | - |
| onClickClose | (e?: MouseEvent<HTMLButtonElement, MouseEvent> \| KeyboardEvent) => void | - | ✓ | 閉じるボタンをクリックした時に発火するコールバック関数 |
| actionButton | ReactNode \| any | - | ✓ | - |

## 実装ルール

ControlledFormDialog に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > ダイアログコンテンツにフォームが含まれている場合は、FormDialogの使用を検討する
- [should] ダイアログコンテンツにフォーム要素を含む場合は FormDialog の使用を検討する
  - `Enter` キーの押下でアクションボタンの送信処理を実行する
  - アクション系コールバックは `onSubmit` で、引数は `FormEvent<HTMLFormElement>` を受け取る
