# Disclosure

トリガーやコンテンツに装飾を持たない、コンテンツの表示・非表示を切り替えるためのプリミティブコンポーネントです。開閉動作だけを提供するとき、AccordionPanelで実現できない独自の開閉UIを提供するときに使います。

## import

```ts
import { DisclosureTrigger, DisclosureContent } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.1.1** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

### DisclosureTrigger
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| targetId | string | - | ✓ | DisclosureContentのidと紐づける文字列 |
| onClick | (open: () => void, e: MouseEvent) => void | - | - | 開閉時のハンドラー |

### DisclosureContent
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| isOpen | boolean | - | - | 開閉状態。デフォルトは閉じている |
| visuallyHidden | boolean | - | - | 閉じた状態でContentを要素として存在させるか。デフォルトでは要素は存在しない |

## 実装ルール

### a11y-trigger-has-button
DropdownTriggerやDialogTrigger, DisclosureTrigger内にbutton要素を設置することを強制するルールです。

❌ NG:

```jsx
// AnchorButtonは実体はa要素のためNG
<DisclosureTrigger>
  <YyyAnchorButton />
</DisclosureTrigger>
```

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

使い方チェックリスト（Layer 3）は設定されていません。
