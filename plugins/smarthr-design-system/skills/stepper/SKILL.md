---
name: stepper
description: "複数ステップに分かれた操作の進行状況を示すコンポーネントです。手続きの現在位置や全体ステップ数を可視化するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer3
---

複数ステップに分かれた操作の進行状況を示すコンポーネントです。手続きの現在位置や全体ステップ数を可視化するときに使います。

ステップの進行状況に応じて、現在地や完了のステータスを適切に表現してください。

## import

```ts
import { Stepper } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| type | "horizontal" \| "vertical" | - | ✓ | - |
| steps | Step[] \| VerticalStep[] | - | ✓ | type=vertical では子要素を持てる |
| activeIndex | number | - | - | 現在地。0始まり。 |

## 実装ルール

Stepper に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### モバイル
- [must] モバイル環境で `type="horizontal"` を使用すると水平方向のスクロールが生じる場合は `type="vertical"` を使う
- [should] 隣接するセクションとのレイアウト調整が困難な場合は Stepper を使用せず他の表現方法を検討する
