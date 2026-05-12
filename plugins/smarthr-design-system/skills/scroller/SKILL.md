---
name: scroller
description: "コンテンツを横スクロール可能領域に収めるとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するときに使う。smarthr-ui の Scroller コンポーネントの使い方ガイド。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2
---

## import

```ts
import { Scroller } from 'smarthr-ui'
```

## Props

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

_checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
