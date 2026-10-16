# LineClamp

> ⚠️ **非推奨**: LineClampは非推奨です。TextのmaxLines（オブジェクト形式）を使ってください。LineClampのmaxLines={2}は、TextのmaxLines={{ max: 2, tooltip: true }}に置き換えられます。

テキストが指定幅・高さを超えるときに省略表示しTooltipで全文を見せるためのコンポーネントです。長い文字列を行数制限で省略させるときに使います。

最大行数maxLinesに1〜6を指定すると、その行数に収まらなかったテキストが「…」で省略されます。

## import

```ts
import { LineClamp } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v99.9.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| maxLines | 1 \| 2 \| 3 \| 4 \| 5 \| 6 | 3 | - | - |
| ref | Ref<HTMLSpanElement> | - | - | - |

## 実装ルール

LineClamp に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

使い方チェックリスト（Layer 3）は設定されていません。
