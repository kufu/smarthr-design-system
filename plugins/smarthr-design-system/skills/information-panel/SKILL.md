---
name: information-panel
description: "smarthr-ui の InformationPanel を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。ユーザーに伝えたい情報を他の要素より視覚的に目立たせるためのコンポーネントです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

ユーザーに伝えたい情報を他の要素より視覚的に目立たせるためのコンポーネントです。

ユーザーに伝えたい情報を他の要素より視覚的に目立たせるためのコンポーネントです。伝えたい情報の種類によってアイコンを切り替えて使います。

## import

```ts
import { InformationPanel } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| heading | ReactNode \| ObjectHeadingType | - | ✓ | パネルのタイトル |
| toggleable | boolean | - | - | `true` のとき、開閉ボタンを表示する |
| onClickTrigger | (active: boolean) => void | - | - | 開閉ボタン押下時に発火するコールバック関数 |
| type | "error" \| "warning" \| "info" \| "success" \| "sync" | info | - | - |
| bold | boolean | - | - | - |
| active | boolean | true | - | - |
| ref | Ref<HTMLDivElement> | - | - | - |

## 実装ルール

InformationPanel に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

_checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
