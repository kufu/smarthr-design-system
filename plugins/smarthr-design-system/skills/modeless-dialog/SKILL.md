---
name: modeless-dialog
description: "背面の画面操作を妨げないモードレスダイアログコンポーネントです。ダイアログと背面の画面を同時並行で閲覧・操作するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

背面の画面操作を妨げないモードレスダイアログコンポーネントです。ダイアログと背面の画面を同時並行で閲覧・操作するときに使います。

## import

```ts
import { ModelessDialog } from 'smarthr-ui'
```

## Props

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

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
