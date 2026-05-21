---
name: smarthr-ui-controlled-message-dialog
description: "MessageDialogの開閉状態を外部stateで制御する派生コンポーネントです。開閉状態をアプリケーション側で管理するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer3
---

MessageDialogの開閉状態を外部stateで制御する派生コンポーネントです。開閉状態をアプリケーション側で管理するときに使います。

モーダルなダイアログです。ダイアログの表示中、ダイアログの裏側の領域はスクリム（幕）で隠され、操作を受け付けません。

## import

```ts
import { ControlledMessageDialog } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| children | ReactNode | - | - | ダイアログの説明 |
| className | string | - | - | - |
| decorators | DecoratorsType<"closeButtonLabel"> | - | - | コンポーネント内の文言を変更するための関数を設定 |
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

## 実装ルール

ControlledMessageDialog に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

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
