# ModelessDialog

背面の画面操作を妨げないモードレスダイアログコンポーネントです。ダイアログと背面の画面を同時並行で閲覧・操作するときに使います。

## import

```ts
import { ModelessDialog } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v103.1.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| footer | ReactNode | - | - | ダイアログのフッタ部分の内容 |
| right | string \| number | - | - | ダイアログを開いたときの初期 right 位置 |
| left | string \| number | - | - | ダイアログを開いたときの初期 left 位置 |
| top | string \| number | - | - | ダイアログを開いたときの初期 top 位置 |
| bottom | string \| number | - | - | ダイアログを開いたときの初期 bottom 位置 |
| heading | ReactNode | - | ✓ | ダイアログのタイトルの内容 |
| size | "XS" \| "S" \| "M" \| "L" \| "XL" \| "XXL" \| "FULL" | - | - | ダイアログの大きさ |
| height | string \| number | - | - | ダイアログの高さ |
| contentBgColor | "WHITE" \| "OVER_BACKGROUND" \| "BACKGROUND" \| "COLUMN" \| "BASE_GREY" \| ... 他8個 | - | - | コンテンツ部分の背景色 |
| contentPadding | Gap \| { block?: Gap; inline?: Gap; } | - | - | - |
| onPressEscape | (e: KeyboardEvent) => void | - | - | ダイアログが開いている状態で Escape キーを押下したときのハンドラ |
| isOpen | boolean | - | ✓ | ダイアログが開かれているかどうかの真偽値 |
| portalParent | HTMLElement | - | - | ポータルの container となる DOM 要素を追加する親要素。 ダイアログのマウントと同時に確定していない要素（例: ダイアログの祖先要素の ref）を 渡すと、その要素がまだ DOM に存在しない可能性があるため意図通りに動作しない。 呼び出し側で要素が確定してから渡すこと。 |
| onClickClose | (e?: MouseEvent<HTMLButtonElement, MouseEvent> \| KeyboardEvent) => void | - | - | 閉じるボタンを押下したときのハンドラ |
| resizable | boolean | false | - | リサイズ可能かどうか |
| padding | Gap \| { block?: Gap; inline?: Gap; } | - | - | 境界とコンテンツの間の余白 |
| bgColor | "WHITE" \| "OVER_BACKGROUND" | - | - | 背景色 |

## 実装ルール

ModelessDialog に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

> ℹ️ 各項目は SmartHR Design System の基準であり、守らなければならない規則ではありません。`[must]` は基本的に合わせる基準、`[should]` は状況に応じて判断する推奨、`[avoid]` は避けることを推奨する使い方です。`[must]` に合わせない場合や `[avoid]` の使い方を採用する場合は、理由を明示してください。

### 使用上の注意 > ダイアログを乱用しない
- [should] ダイアログとして表示する・操作させるべき内容なのか、慎重にユースケースを定義し使用を検討する

### レイアウト > 基準サイズ > `XS`
- [should] 入力要素を 1 つだけ持つなど、内容が極めて少ないダイアログには `XS` を使う

### レイアウト > 基準サイズ > `S`
- [should] 要素が少なく、要素が垂直方向に並ぶ、広い横幅を必要としないダイアログには `S` を使う

### レイアウト > 基準サイズ > `M`
- [should] 数行に渡るテキストの表示や、水平方向に要素を並べて表示する標準的なダイアログには `M` を使う

### レイアウト > 基準サイズ > `L`
- [should] テーブルの表示やダイアログを複数カラムに分割するなど、広い横幅が必要なダイアログには `L` を使う

### レイアウト > 基準サイズ > `XL`
- [should] 広い横幅が必要で、`L` ではコンテンツが収まりきらないダイアログには `XL` を使う

### レイアウト > 基準サイズ > `XXL`
- [should] 広い横幅が必要で、`XL` ではコンテンツが収まりきらないダイアログには `XXL` を使う

### レイアウト > 基準サイズ > `FULL`
- [should] 広い横幅が必要で、`XXL` ではコンテンツが収まりきらないダイアログには `FULL` を使う

### レイアウト > 表示位置
- [must] ModelessDialog はダイアログを開く操作をした箇所の付近に表示する

### 構成 > 1. ヘッダーエリア
- [must] ダイアログのタイトルは、表示する情報を簡潔に表現するものをつける

### モバイル
- [must] モバイルでは ModelessDialog の代わりに MessageDialog を利用する
