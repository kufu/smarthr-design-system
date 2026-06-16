# Scroller

コンテンツをスクロール可能な領域に収めるためのコンポーネントです。広いテーブルや要素群を限られた領域に収めて任意方向にスクロール表示するときに使います。

## import

```ts
import { Scroller } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.0.1** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| direction | "both" \| "horizontal" \| "vertical" | - | - | - |
| styleType | "auto" \| "scroll" | - | - | - |

## 実装ルール

### a11y-scroller-has-tabindex
scroll可能な要素にtabindex属性を設定することを推奨し、インタラクティブでない要素に不要なtabindex属性が設定されていないかをチェックするルールです。

✅ OK:

```jsx
// smarthr-ui/Scrollerコンポーネントを利用（推奨）
// tabIndexは自動的に設定されるため手動設定不要
<Scroller>
  <Table />
</Scroller>
```

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

使い方チェックリスト（Layer 3）は設定されていません。
