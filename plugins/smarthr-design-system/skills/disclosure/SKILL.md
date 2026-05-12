---
name: disclosure
description: "smarthr-ui の DisclosureTrigger / DisclosureContent を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。コンテンツの表示・非表示を切り替えるUIを作るためのアクセシブルなコンポーネントです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2
---

コンテンツの表示・非表示を切り替えるUIを作るためのアクセシブルなコンポーネントです。

## import

```ts
import { DisclosureTrigger, DisclosureContent } from 'smarthr-ui'
```

## Props

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

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
