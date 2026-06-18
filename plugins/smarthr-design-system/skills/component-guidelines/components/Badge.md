# Badge

件数などの数値を視覚的に表すためのコンポーネントです。Iconなどの視覚情報が少ない要素に変化が発生していることを通知バッジとして知らせるときにも使います。

## import

```ts
import { Badge } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.0.1** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| count | number | - | - | 件数 |
| overflowCount | number | - | - | 最大表示件数。この数を超えた場合は{最大表示件数+}と表示される |
| showZero | boolean | - | - | 0値を表示するかどうか |
| type | "grey" \| "blue" \| "red" \| "yellow" | - | - | 色の種類 |
| dot | boolean | - | - | ドット表示するかどうか |

## 実装ルール

Badge に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### アクセシビリティ
- [must] ドット表示の場合は視覚情報しか持たないため、何らかの形で必ずアクセシブルな名前を与える
