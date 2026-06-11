# ModelessDialog

背面の画面操作を妨げないモードレスダイアログコンポーネントです。ダイアログと背面の画面を同時並行で閲覧・操作するときに使います。

## import

```ts
import { ModelessDialog } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v95.0.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| heading | ReactNode | - | ✓ | ダイアログのタイトルの内容 |
| footer | ReactNode | - | - | ダイアログのフッタ部分の内容 |
| isOpen | boolean | - | ✓ | ダイアログが開かれているかどうかの真偽値 |
| onClickClose | (e: MouseEvent<HTMLButtonElement, MouseEvent>) => void | - | - | 閉じるボタンを押下したときのハンドラ |
| onPressEscape | () => void | - | - | ダイアログが開いている状態で Escape キーを押下したときのハンドラ |
| width | string \| number | - | - | @deprecated ダイアログの幅を指定する場合は、`width` ではなく `size` を使用してください。 ダイアログの幅 |
| size | "XS" \| "S" \| "M" \| "L" \| "XL" \| "XXL" \| "FULL" | - | - | ダイアログの大きさ |
| height | string \| number | - | - | ダイアログの高さ |
| top | string \| number | - | - | ダイアログを開いたときの初期 top 位置 |
| left | string \| number | - | - | ダイアログを開いたときの初期 left 位置 |
| right | string \| number | - | - | ダイアログを開いたときの初期 right 位置 |
| bottom | string \| number | - | - | ダイアログを開いたときの初期 bottom 位置 |
| portalParent | HTMLElement \| RefObject<HTMLElement> | - | - | ポータルの container となる DOM 要素を追加する親要素 |
| className | string | - | - | - |
| contentBgColor | "BACKGROUND" \| "COLUMN" \| "BASE_GREY" \| "OVER_BACKGROUND" \| "HEAD" \| ... 他8個 | - | - | - |
| contentPadding | Gap \| { block?: Gap; inline?: Gap; } | - | - | - |
| resizable | boolean | false | - | - |

## 実装ルール

ModelessDialog に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > ダイアログを乱用しない
- [should] ダイアログとして表示する・操作させるべき内容なのか、慎重にユースケースを定義し使用を検討する

### レイアウト > 表示位置
- [must] ModelessDialog はダイアログを開く操作をした箇所の付近に表示する

### 構成 > 1. ヘッダーエリア
- [must] ダイアログのタイトルは、表示する情報を簡潔に表現するものをつける

### モバイル
- [must] モバイルでは ModelessDialog の代わりに MessageDialog を利用する
