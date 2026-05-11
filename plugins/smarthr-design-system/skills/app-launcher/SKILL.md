---
name: app-launcher
description: "smarthr-ui の AppLauncher を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。smarthr-ui の AppLauncher コンポーネントの使い方ガイド。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

## import

```ts
import { AppLauncher } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| apps | Category[] | - | ✓ | - |
| urlToShowAll | string | - | - | - |
| decorators | DecoratorsType<"triggerLabel"> | - | - | コンポーネント内の文言を変更するための関数を設定 |
| enableNew | boolean | - | - | - |

## 実装ルール

AppLauncher に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
