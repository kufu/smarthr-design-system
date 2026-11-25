# SearchInput

検索キーワードを入力させるためのコンポーネントです。検索フォームで検索語句を入力させるときに使います。

よくあるテーブルのオブジェクトの検索（https://smarthr.design/products/design-patterns/smarthr-table/#h4-4）などに使用します。 prefixは検索アイコン「<FaMagnifyingGlassIcon alt="FaMagnifyingGlassIcon 虫眼鏡のアイコン" />」に固定されています。

## import

```ts
import { SearchInput } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v103.1.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| autoFocus | boolean | - | - | オートフォーカスを行うかどうか |
| type | string | - | - | input 要素の `type` 値 |
| suffix | ReactNode | - | - | コンポーネント内の末尾に表示する内容 |
| error | boolean | - | - | フォームにエラーがあるかどうか |
| placeholder | string | - | - | @deprecated placeholder属性は非推奨です。別途ヒント用要素を設置するか、それらの領域を確保出来ない場合はTooltipコンポーネントの利用を検討してください。 |
| width | string \| number | - | - | コンポーネントの幅 |
| bgColor | "OVER_BACKGROUND" \| "BACKGROUND" \| "COLUMN" \| "BASE_GREY" \| "HEAD" \| "BORDER" \| "ACTION_BACKGROUND" | - | - | 背景色。readOnly を下地の上に載せる場合に使う |
| subActionArea | ReactNode | - | - | コンポーネント内の、inputとsuffixの間に表示する操作用の要素（ボタン等） |
| tooltipMessage | ReactNode | - | ✓ | 入力欄に紐付けるツールチップに表示するメッセージ |
| variant | "ai" | - | - | `'ai'` のとき、検索アイコンをAIサービスのブランドカラー(グラデーション)で表示する |

## 実装ルール

SearchInput に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

> ℹ️ 各項目は SmartHR Design System の基準であり、守らなければならない規則ではありません。`[must]` は基本的に合わせる基準、`[should]` は状況に応じて判断する推奨、`[avoid]` は避けることを推奨する使い方です。`[must]` に合わせない場合や `[avoid]` の使い方を採用する場合は、理由を明示してください。

### 使用上の注意 > tooltipMessageで入力内容を補足する
- [must] `tooltipMessage` を使用して入力内容に対する説明を補足する
