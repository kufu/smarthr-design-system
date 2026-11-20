# VisuallyHiddenText

視覚的には隠しつつスクリーンリーダーには読み上げさせたいテキスト用のコンポーネントです。見出しやラベルが自明で、表示すると視覚的に冗長になるときなどに使います。

## import

```ts
import { VisuallyHiddenText } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v102.0.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

（固有 Props なし）

## 実装ルール

VisuallyHiddenText に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

> ℹ️ 各項目は SmartHR Design System の基準であり、守らなければならない規則ではありません。`[must]` は基本的に合わせる基準、`[should]` は状況に応じて判断する推奨、`[avoid]` は避けることを推奨する使い方です。`[must]` に合わせない場合や `[avoid]` の使い方を採用する場合は、理由を明示してください。

### 使用上の注意
- [avoid] VisuallyHiddenText を必要以上に使いすぎない
- [should] 文脈をしっかり考慮し、スクリーンリーダーユーザーにとって価値のある情報を提供する
