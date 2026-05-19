---
name: float-area
description: "smarthr-ui の FloatArea を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。画面内に固定表示する領域のためのコンポーネントです。スクロール位置によらずフォーム送信ボタンや主要アクションを常時見せるときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

画面内に固定表示する領域のためのコンポーネントです。スクロール位置によらずフォーム送信ボタンや主要アクションを常時見せるときに使います。

主に[モーダルなUI](/products/design-patterns/modal-ui/)を作るために使います。

## import

```ts
import { FloatArea } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| primaryButton | ReactNode | - | ✓ | 表示する `Button` または `AnchorButton` コンポーネント |
| secondaryButton | ReactNode | - | - | 表示する `Button` または `AnchorButton` コンポーネント |
| tertiaryButton | ReactNode | - | - | tertiary 領域に表示するボタン |
| responseStatus | ResponseStatusWithoutProcessing | - | - | 操作に対するフィードバックメッセージ |
| bottom | 0 \| 1 \| 2 \| 0.25 \| 0.5 \| 0.75 \| 1.25 \| 1.5 \| 2.5 \| 3 \| 3.5 \| 4 \| 8 \| -0.25 \| -0.5 \| -0.75 \| -1 \| -1.25 \| -1.5 \| -2 \| -2.5 \| -3 \| -3.5 \| -4 \| -8 \| keyof CreatedSpacingTheme | - | - | コンポーネントの下端から、包含ブロックの下端までの間隔（基準フォントサイズの相対値または抽象値） |
| zIndex | number | - | - | コンポーネントの `z-index` 値 |

## 実装ルール

FloatArea に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
