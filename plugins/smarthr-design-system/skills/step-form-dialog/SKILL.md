---
name: step-form-dialog
description: "複数ステップに分けたフォームを内包するダイアログコンポーネントです。ウィザード形式で複数の操作を順に進めるタスクをダイアログで提供するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

複数ステップに分けたフォームを内包するダイアログコンポーネントです。ウィザード形式で複数の操作を順に進めるタスクをダイアログで提供するときに使います。

複数ステップに分けたフォームを内包するダイアログコンポーネントです。[ウィザード](/products/design-patterns/wizard/)形式で複数の操作を順に進めるタスクをダイアログで提供するときに使います。

## import

```ts
import { StepFormDialog } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| size | "XS" \| "S" \| "M" \| "L" \| "XL" \| "XXL" \| "FULL" | - | - | ダイアログの大きさ |
| width | string \| number | - | - | @deprecated ダイアログの幅を指定する場合は、`width` ではなく `size` を使用してください。 ダイアログの幅 |
| className | string | - | - | - |
| onSubmit | (e: FormEvent<HTMLFormElement>, helpers: StepFormHelpers) => void | - | ✓ | アクションボタンをクリックした時に発火するコールバック関数 @param e フォームイベント @param helpers ステップ操作用のヘルパー関数群 |
| heading | ReactNode \| ObjectHeadingType | - | ✓ | - |
| closeButton | ButtonArgType \| ObjectButtonType | - | - | - |
| responseStatus | ResponseStatus | - | - | - |
| firstFocusTarget | RefObject<HTMLElement> | - | - | ダイアログを開いた時にフォーカスする対象 |
| onClickOverlay | () => void | - | - | オーバーレイをクリックした時に発火するコールバック関数 |
| onPressEscape | (() => void) & ((close: () => void) => void) | - | - | エスケープキーを押下した時に発火するコールバック関数 |
| ariaLabel | string | - | - | ダイアログの `aria-label` |
| ariaLabelledby | string | - | - | ダイアログの `aria-labelledby` |
| portalParent | HTMLElement \| RefObject<HTMLElement> | - | - | DOM 上でダイアログの要素を追加する親要素 |
| contentBgColor | "BACKGROUND" \| "COLUMN" \| "BASE_GREY" \| "OVER_BACKGROUND" \| "HEAD" \| ... 他8個 | - | - | - |
| contentPadding | Gap \| { block?: Gap; inline?: Gap; } | - | - | - |
| submitButton | ButtonArgType \| ObjectButtonType | - | ✓ | - |
| backButton | ButtonArgType \| ObjectButtonType | - | - | - |
| firstStep | { id: string; stepNumber: number; } | - | ✓ | - |
| stepLength | number | - | ✓ | ステップの総数 |
| onClickBack | () => void | - | - | - |
| onClickClose | (close: () => void) => void | - | - | - |
| onToggle | (isOpen: boolean) => void | - | - | - |
| onOpen | () => void | - | - | - |
| onClose | () => void | - | - | - |

## 実装ルール

StepFormDialog に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
