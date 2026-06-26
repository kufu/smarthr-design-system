# MessageDialog

ユーザーに情報を提示するためのダイアログコンポーネントです。入力などの操作を伴わずにメッセージや情報をダイアログで提示するときに使います。

モーダルなダイアログです。ダイアログの表示中、ダイアログの裏側の領域はスクリム（幕）で隠され、操作を受け付けません。

## import

```ts
import { MessageDialog } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.1.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| children | ReactNode | - | - | ダイアログの説明 |
| size | "XS" \| "S" \| "M" \| "L" \| "XL" \| "XXL" \| "FULL" | - | - | ダイアログの大きさ |
| width | string \| number | - | - | @deprecated ダイアログの幅を指定する場合は、`width` ではなく `size` を使用してください。 ダイアログの幅 |
| className | string | - | - | - |
| heading | ReactNode \| ObjectHeadingType | - | ✓ | - |
| closeButton | ReactNode | - | - | 閉じるボタン |
| firstFocusTarget | RefObject<HTMLElement> | - | - | ダイアログを開いた時にフォーカスする対象 |
| onClickOverlay | () => void | - | - | オーバーレイをクリックした時に発火するコールバック関数 |
| onPressEscape | (() => void) & ((close: () => void) => void) | - | - | エスケープキーを押下した時に発火するコールバック関数 |
| ariaLabel | string | - | - | ダイアログの `aria-label` |
| ariaLabelledby | string | - | - | ダイアログの `aria-labelledby` |
| portalParent | HTMLElement \| RefObject<HTMLElement> | - | - | DOM 上でダイアログの要素を追加する親要素 |
| contentBgColor | "BACKGROUND" \| "COLUMN" \| "BASE_GREY" \| "OVER_BACKGROUND" \| "HEAD" \| ... 他8個 | - | - | - |
| contentPadding | Gap \| { block?: Gap; inline?: Gap; } | - | - | - |
| onClickClose | (close: () => void) => void | - | - | - |
| onToggle | (isOpen: boolean) => void | - | - | - |
| onOpen | () => void | - | - | - |
| onClose | () => void | - | - | - |

## 実装ルール

MessageDialog に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > ダイアログを乱用しない
- [should] ダイアログとして表示する・操作させるべき内容なのか、慎重にユースケースを定義し使用を検討する

### 使用上の注意 > 複数のモーダルダイアログを同時に表示しない (via MultipleModalWarning.mdx)
- [avoid] モーダルダイアログ（ActionDialog や MessageDialog）を 1 つの操作で複数個表示したり、モーダルダイアログ上の操作によって 2 つ目のモーダルダイアログを表示しない

### 使用上の注意 > フィードバックとして使わない
- [must] MessageDialog を原則として処理結果のフィードバックには使わず、フィードバックには NotificationBar や ResponseMessage などを使う

### 構成 > 1. タイトル
- [must] このダイアログで表示する情報を簡潔に表現するタイトルをつける
- [should] サブタイトルは基本的に使わない

### 構成 > 2. 本文
- [must] 入力要素を含めたい場合は MessageDialog ではなく ActionDialog を使用する

### 構成 > 3. アクションボタン
- [must] ダイアログを閉じるボタンを配置し、ラベルは `閉じる` とする

### モバイル
- [should] モバイルで情報量が多い場合は拡大したダイアログの採用を検討する
  - 採用を検討するケース: ダイアログ内で多くのスクロールを伴う場合・入力や編集などキーボード入力操作が多い場合
  - ［閉じる］ボタンはタイトルの右端に配置する
  - ダイアログの左右と裏側の領域（スクリムで隠されている領域）のパディングは `0（0px）` とする
