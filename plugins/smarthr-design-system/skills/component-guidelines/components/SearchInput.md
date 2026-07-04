# SearchInput

検索キーワードを入力させるためのコンポーネントです。検索フォームで検索語句を入力させるときに使います。

よくあるテーブルのオブジェクトの検索（https://smarthr.design/products/design-patterns/smarthr-table/#h4-4）などに使用します。 prefixは検索アイコン「<FaMagnifyingGlassIcon alt="FaMagnifyingGlassIcon 虫眼鏡のアイコン" />」に固定されています。

## import

```ts
import { SearchInput } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.1.1** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| placeholder | string | - | - | @deprecated placeholder属性は非推奨です。別途ヒント用要素を設置するか、それらの領域を確保出来ない場合はTooltipコンポーネントの利用を検討してください。 |
| type | string | - | - | input 要素の `type` 値 |
| width | string \| number | - | - | コンポーネントの幅 |
| autoFocus | boolean | - | - | オートフォーカスをするかどうか |
| error | boolean | - | - | フォームにエラーがあるかどうか |
| suffix | ReactNode | - | - | コンポーネント内の末尾に表示する内容 |
| bgColor | "BACKGROUND" \| "COLUMN" \| "BASE_GREY" \| "OVER_BACKGROUND" \| "HEAD" \| "BORDER" \| "ACTION_BACKGROUND" | - | - | 背景色。readOnly を下地の上に載せる場合に使う |
| tooltipMessage | ReactNode | - | ✓ | 入力欄の説明を紐付けるツールチップに表示するメッセージ |

## 実装ルール

SearchInput に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > tooltipMessageで入力内容を補足する
- [must] `tooltipMessage` を使用して入力内容に対する説明を補足する
