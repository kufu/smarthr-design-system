---
name: error-screen
description: "smarthr-ui の ErrorScreen を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。エラーを全画面で表示するためのプリミティブコンポーネントです。Auth/Forbidden/NotFound/Unauthorized/Unexpectedの各ErrorScreenで実現できない独自のエラー画面を提供するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

エラーを全画面で表示するためのプリミティブコンポーネントです。Auth/Forbidden/NotFound/Unauthorized/Unexpectedの各ErrorScreenで実現できない独自のエラー画面を提供するときに使います。

なんらかのエラーによってユーザーが操作できなくなった場合や、ユーザーに操作をさせたくない場合に使用してください。

## import

```ts
import { ErrorScreen } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| logo | ReactNode | - | - | ロゴ |
| title | ReactNode | - | - | コンテンツの上に表示されるタイトル |
| links | { label: ReactNode; url: string; target?: string; }[] | - | - | コンテンツの下に表示されるアンカー要素のリスト |
| children | ReactNode | - | - | 表示するコンテンツ |
| className | string | - | - | コンポーネントに適用するクラス名 |

## 実装ルール

ErrorScreen に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
