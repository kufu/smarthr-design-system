# VisuallyHiddenText

視覚的には隠しつつスクリーンリーダーには読み上げさせたいテキスト用のコンポーネントです。見出しやラベルが自明で、表示すると視覚的に冗長になるときなどに使います。

## import

```ts
import { VisuallyHiddenText } from 'smarthr-ui'
```

## Props

（固有 Props なし）

## 実装ルール

VisuallyHiddenText に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意
- [avoid] VisuallyHiddenText を必要以上に使いすぎない
- [should] 文脈をしっかり考慮し、スクリーンリーダーユーザーにとって価値のある情報を提供する
