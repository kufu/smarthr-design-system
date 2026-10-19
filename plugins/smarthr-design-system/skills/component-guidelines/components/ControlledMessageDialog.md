# ControlledMessageDialog

MessageDialogの開閉状態を外部stateで制御する派生コンポーネントです。開閉状態をアプリケーション側で管理するときに使います。

モーダルなダイアログです。ダイアログの表示中、ダイアログの裏側の領域はスクリム（幕）で隠され、操作を受け付けません。

## import

```ts
import { ControlledMessageDialog } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v99.9.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| children | ReactNode | - | - | ダイアログの説明 |
| ref | Ref<HTMLDivElement> | - | - | - |
| className | string | - | - | - |
| contentBgColor | "BACKGROUND" \| "COLUMN" \| "BASE_GREY" \| "OVER_BACKGROUND" \| "HEAD" \| ... 他8個 | - | - | コンテンツ部分の背景色 |
| contentPadding | Gap \| { block?: Gap; inline?: Gap; } | - | - | - |
| closeButton | ReactNode | - | - | 閉じるボタン |
| size | "XS" \| "S" \| "M" \| "L" \| "XL" \| "XXL" \| "FULL" | - | - | ダイアログの大きさ |
| width | string \| number | - | - | @deprecated ダイアログの幅を指定する場合は、`width` ではなく `size` を使用してください。 ダイアログの幅 |
| firstFocusTarget | RefObject<HTMLElement> | - | - | ダイアログを開いた時にフォーカスする対象 |
| ariaLabel | string | - | - | ダイアログの `aria-label` |
| ariaLabelledby | string | - | - | ダイアログの `aria-labelledby` |
| portalParent | HTMLElement \| RefObject<HTMLElement> | - | - | DOM 上でダイアログの要素を追加する親要素 |
| isOpen | boolean | - | ✓ | ダイアログを開いているかどうか |
| onClickOverlay | () => void | - | - | オーバーレイをクリックした時に発火するコールバック関数 @todo イベントハンドラー命名規則に従い handleClickOverlay に変更すべき（影響範囲大のため別PR） |
| onPressEscape | () => void | - | - | エスケープキーを押下した時に発火するコールバック関数 @todo イベントハンドラー命名規則に従い handlePressEscape に変更すべき（影響範囲大のため別PR） |
| heading | ReactNode \| ObjectHeadingType | - | ✓ | - |
| onClickClose | () => void | - | ✓ | - |

## 実装ルール

ControlledMessageDialog に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > ダイアログを乱用しない
- [should] ダイアログとして表示する・操作させるべき内容なのか、慎重にユースケースを定義し使用を検討する

### 使用上の注意 > 複数のモーダルダイアログを同時に表示しない (via MultipleModalWarning.mdx)
- [avoid] モーダルダイアログ（ActionDialog や MessageDialog）を 1 つの操作で複数個表示したり、モーダルダイアログ上の操作によって 2 つ目のモーダルダイアログを表示しない

### 使用上の注意 > フィードバックとして使わない
- [must] MessageDialog を原則として処理結果のフィードバックには使わず、フィードバックには NotificationBar や ResponseMessage などを使う

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

### 構成 > 1. タイトル
- [must] このダイアログで表示する情報を簡潔に表現するタイトルをつける
- [should] サブタイトルは基本的に使わない

### 構成 > 2. 本文
- [must] 入力要素を含めたい場合は MessageDialog ではなく ActionDialog を使用する

### 構成 > 3. アクションボタン
- [must] ダイアログを閉じるボタンを配置し、ラベルは `閉じる` とする
