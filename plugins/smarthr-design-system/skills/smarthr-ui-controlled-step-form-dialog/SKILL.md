---
name: smarthr-ui-controlled-step-form-dialog
description: "ControlledStepFormDialogは、StepFormDialogの開閉状態を外部stateで制御する派生コンポーネントです。開閉状態をアプリケーション側で管理するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer3
---

StepFormDialogの開閉状態を外部stateで制御する派生コンポーネントです。開閉状態をアプリケーション側で管理するときに使います。

複数ステップに分けたフォームを内包するダイアログコンポーネントです。[ウィザード](/products/design-patterns/wizard/)形式で複数の操作を順に進めるタスクをダイアログで提供するときに使います。

## import

```ts
import { StepFormDialogItem, ControlledStepFormDialog } from 'smarthr-ui'
```

## Props

### StepFormDialogItem
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| stepNumber | number | - | ✓ | 何ステップ目か |

### ControlledStepFormDialog
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| className | string | - | - | - |
| onSubmit | (e: FormEvent<HTMLFormElement>, helpers: StepFormHelpers) => void | - | ✓ | アクションボタンをクリックした時に発火するコールバック関数 @param e フォームイベント @param helpers ステップ操作用のヘルパー関数群 |
| responseStatus | ResponseStatus | - | - | - |
| contentBgColor | "BACKGROUND" \| "COLUMN" \| "BASE_GREY" \| "OVER_BACKGROUND" \| "HEAD" \| ... 他8個 | - | - | - |
| contentPadding | Gap \| { block?: Gap; inline?: Gap; } | - | - | - |
| firstStep | { id: string; stepNumber: number; } | - | ✓ | - |
| onClickClose | () => void | - | ✓ | - |
| stepLength | number | - | ✓ | ステップの総数 |
| onClickBack | () => void | - | - | - |
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
| submitButton | ButtonArgType \| ObjectButtonType | - | ✓ | - |
| closeButton | ButtonArgType \| ObjectButtonType | - | - | - |
| backButton | ButtonArgType \| ObjectButtonType | - | - | - |

## 実装ルール

ControlledStepFormDialog に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### モバイル > 表示する情報量に応じて拡大したダイアログの採用を検討する
- [should] モバイルで表示する情報量に応じて拡大したダイアログの採用を検討する
  - ダイアログ内で多くのスクロールを伴う場合
  - 入力や編集など、キーボードでの入力操作が多い場合

### モバイル > レイアウト > 余白
- [must] 拡大したダイアログの左右と裏側の領域（スクリムで隠されている領域）のパディングは `0（0px）` とする
  - 基本的には代表的なダイアログ内レイアウトのパディングに従って配置する

### モバイル > レイアウト > フッターエリアのレイアウト
- [must] モバイルで［戻る］ボタンと Primary ボタンを Cluster で横いっぱいに並べる
  - ［キャンセル］ボタンは Button 群の下部に配置する
