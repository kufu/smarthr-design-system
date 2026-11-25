# FormDialog

フォーム要素を内包し、ユーザーに入力や選択などの操作を求めるためのActionDialog派生のダイアログコンポーネントです。ダイアログ内で入力フォームを送信するとき、Enterキーでの送信が必要なときに使います。

各種基準はActionDialogと共通です。

## import

```ts
import { FormDialog } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v103.1.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| onToggle | (isOpen: boolean) => void | - | - | - |
| onClose | () => void | - | - | - |
| onOpen | () => void | - | - | - |
| onPressEscape | (close: () => void) => void | - | - | - |
| onClickClose | (close: () => void) => void | - | - | - |
| onSubmit | (e: FormEvent<HTMLFormElement>, helpers: { close: () => void; }) => void | - | ✓ | フォーム送信時に発火するコールバック関数 |
| heading | ReactNode \| ObjectHeadingType | - | ✓ | - |
| size | "XS" \| "S" \| "M" \| "L" \| "XL" \| "XXL" \| "FULL" | - | - | ダイアログの大きさ |
| subActionArea | ReactNode | - | - | ダイアログフッターの左端操作領域 |
| responseStatus | ResponseStatus | - | - | - |
| contentBgColor | "WHITE" \| "OVER_BACKGROUND" \| "BACKGROUND" \| "COLUMN" \| "BASE_GREY" \| ... 他8個 | - | - | コンテンツ部分の背景色 |
| contentPadding | Gap \| { block?: Gap; inline?: Gap; } | - | - | - |
| onClickOverlay | () => void | - | - | オーバーレイをクリックした時に発火するコールバック関数 @todo イベントハンドラー命名規則に従い handleClickOverlay に変更すべき（影響範囲大のため別PR） |
| firstFocusTarget | RefObject<HTMLElement> | - | - | ダイアログを開いた時にフォーカスする対象 |
| ariaLabel | string | - | - | ダイアログの `aria-label` |
| ariaLabelledby | string | - | - | ダイアログの `aria-labelledby` |
| portalParent | HTMLElement | - | - | DOM 上でダイアログの要素を追加する親要素。 ダイアログのマウントと同時に確定していない要素（例: ダイアログの祖先要素の ref）を 渡すと、その要素がまだ DOM に存在しない可能性があるため意図通りに動作しない。 呼び出し側で要素が確定してから渡すこと。 |
| closeButton | ReactNode \| { text?: ReactNode; disabled?: boolean; } | - | - | - |
| actionButton | ReactNode \| { text: ReactNode; theme?: "primary" \| "danger" \| "secondary"; disabled?: boolean; } | - | ✓ | - |

## 実装ルール

FormDialog に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

> ℹ️ 各項目は SmartHR Design System の基準であり、守らなければならない規則ではありません。`[must]` は基本的に合わせる基準、`[should]` は状況に応じて判断する推奨、`[avoid]` は避けることを推奨する使い方です。`[must]` に合わせない場合や `[avoid]` の使い方を採用する場合は、理由を明示してください。

### 使用上の注意 > ダイアログコンテンツにフォームが含まれている場合は、FormDialogの使用を検討する
- [should] ダイアログコンテンツにフォーム要素を含む場合は FormDialog の使用を検討する
  - `Enter` キーの押下でアクションボタンの送信処理を実行する
  - アクション系コールバックは `onSubmit` で、引数は `FormEvent<HTMLFormElement>` を受け取る
