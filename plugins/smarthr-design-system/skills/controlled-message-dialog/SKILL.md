---
name: controlled-message-dialog
description: "MessageDialog の開閉状態を外部 state で制御するとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するときに使う。smarthr-ui の ControlledMessageDialog コンポーネントの使い方ガイド。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

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

_checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
