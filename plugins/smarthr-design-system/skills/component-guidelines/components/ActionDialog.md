# ActionDialog

ユーザーに確認や単純な操作を求めるためのダイアログコンポーネントです。フォーム要素を含まない確認・実行のダイアログを表示するときに使います。

モーダルなダイアログです。ダイアログの表示中、ダイアログの裏側の領域はスクリム（幕）で隠され、操作を受け付けません。

## import

```ts
import { ActionDialog } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.1.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| size | "XS" \| "S" \| "M" \| "L" \| "XL" \| "XXL" \| "FULL" | - | - | ダイアログの大きさ |
| width | string \| number | - | - | @deprecated ダイアログの幅を指定する場合は、`width` ではなく `size` を使用してください。 ダイアログの幅 |
| className | string | - | - | - |
| heading | ReactNode \| ObjectHeadingType | - | ✓ | - |
| closeButton | ReactNode \| { text: ReactNode; disabled?: boolean; } | - | - | - |
| subActionArea | ReactNode | - | - | ダイアログフッターの左端操作領域 |
| responseStatus | ResponseStatus | - | - | - |
| firstFocusTarget | RefObject<HTMLElement> | - | - | ダイアログを開いた時にフォーカスする対象 |
| onClickOverlay | () => void | - | - | オーバーレイをクリックした時に発火するコールバック関数 |
| onPressEscape | (() => void) & ((close: () => void) => void) | - | - | エスケープキーを押下した時に発火するコールバック関数 |
| ariaLabel | string | - | - | ダイアログの `aria-label` |
| ariaLabelledby | string | - | - | ダイアログの `aria-labelledby` |
| portalParent | HTMLElement \| RefObject<HTMLElement> | - | - | DOM 上でダイアログの要素を追加する親要素 |
| contentBgColor | "BACKGROUND" \| "COLUMN" \| "BASE_GREY" \| "OVER_BACKGROUND" \| "HEAD" \| ... 他8個 | - | - | - |
| contentPadding | Gap \| { block?: Gap; inline?: Gap; } | - | - | - |
| actionButton | ReactNode \| { text: ReactNode; theme?: "primary" \| "danger" \| "secondary"; disabled?: boolean; } | - | ✓ | - |
| onClickAction | (e: MouseEvent<Element, MouseEvent>, helpers: ActionDialogHelpers) => void | - | ✓ | アクションボタンをクリックした時に発火するコールバック関数 @param e マウスイベント @param helpers ダイアログ操作のためのヘルパー関数 |
| onClickClose | (close: () => void) => void | - | - | - |
| onToggle | (isOpen: boolean) => void | - | - | - |
| onOpen | () => void | - | - | - |
| onClose | () => void | - | - | - |

## 実装ルール

ActionDialog に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > ダイアログを乱用しない
- [should] ダイアログとして表示する・操作させるべき内容なのか慎重にユースケースを定義し、使用を検討する

### 使用上の注意 > 複数のモーダルダイアログを同時に表示しない (via MultipleModalWarning.mdx)
- [avoid] モーダルダイアログを 1 つの操作で複数個表示したり、モーダルダイアログ上の操作によって 2 つ目のモーダルダイアログを表示したりしない
