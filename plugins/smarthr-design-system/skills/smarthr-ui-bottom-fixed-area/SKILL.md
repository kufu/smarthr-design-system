---
name: smarthr-ui-bottom-fixed-area
description: "【非推奨】BottomFixedAreaは、画面下部に固定表示する領域のためのコンポーネントです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

> ⚠️ **非推奨**: FloatAreaと役割が重複しているためBottomFixedAreaは非推奨です。より柔軟に使えるFloatAreaを使ってください。

画面下部に固定表示する領域のためのコンポーネントです。

画面下部に固定で表示する操作パネルです。主にモーダルなUI（https://smarthr.design/products/design-patterns/modal-ui/）を作るために使います。

## import

```ts
import { BottomFixedArea } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| description | ReactNode | - | - | この領域の説明 |
| primaryButton | FunctionComponentElement<any> \| FunctionComponentElement<any> | - | - | 表示する `Button` または `AnchorButton` （`variant="primary"` である必要がある） |
| secondaryButton | FunctionComponentElement<any> \| FunctionComponentElement<any> | - | - | 表示する `Button` または `AnchorButton` （`variant="secondary"` である必要がある） |
| tertiaryLinks | (Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & { ...; } & { ...; })[] | - | - | 表示する tertialy link のプロパティの配列 |
| zIndex | number | - | - | コンポーネントに適用する z-index 値 |
| ref | Ref<HTMLDivElement> | - | - | - |

## 実装ルール

BottomFixedArea に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

使い方チェックリスト（Layer 3）は設定されていません。
