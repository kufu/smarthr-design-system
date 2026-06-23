# デザイントークン セレクター

実装シーンからどのトークンドキュメントを読むべきかを決定するための対応表。
**事前知識でトークン値を決めず、必ず対応するファイルを読んでから実装すること。**

## 対応表

| 実装シーン | 読むべきファイル |
|-----------|----------------|
| `Stack` の `gap`、`Cluster` の `gap`、`Base` の `padding`、`margin`、`padding`、`top`/`left` などの余白指定 | `tokens/spacing.mdx` |
| `BaseColumn` の `bgColor`、`StatusLabel` の `type` 以外で色を指定する場合、背景色・テキスト色・枠線色の選択 | `tokens/color.mdx` |
| フォントサイズ（`Text` の `size`）、テキストスタイル（見出し・段落・ラベル）の選択 | `tokens/typography.mdx` |
| `line-height`（行送り）の指定 | `tokens/leading.mdx` |
| `Container` の `size`、`Dialog` の `width` の選択 | `tokens/width.mdx` |

## よくある使用箇所とトークンの対応

### 余白（spacing）
- `<Stack gap={1.5}>` → `tokens/spacing.mdx` の `1.5`（24px）セクション
- `<Cluster gap={0.5}>` → `tokens/spacing.mdx` の `0.5`（8px）セクション
- `<Base padding={1.5}>` → `tokens/spacing.mdx` の `1.5`（24px）セクション
- `className="shr-p-1"` → `tokens/spacing.mdx` の `1`（16px）セクション

### 色（color）
- `<BaseColumn bgColor="COLUMN">` → `tokens/color.mdx` の `COLUMN` セクション
- `<div className="shr-bg-background">` → `tokens/color.mdx` の `BACKGROUND` セクション
- テキスト色・枠線色・アイコン色 → `tokens/color.mdx` のセマンティックトークン

### フォントサイズ（typography）
- `<Text size="S">` → `tokens/typography.mdx` のフォントサイズセクション

### 行送り（leading）
- `line-height` を指定する場合 → `tokens/leading.mdx`

### 幅（width）
- `<Container size="WIDE">` → `tokens/width.mdx` の Container セクション
- ダイアログのサイズ指定 → `tokens/width.mdx` の Dialog セクション

## 注意

- 更新済みのトークンは色・余白・タイポグラフィ・行送り・幅・shadow（`shadow-layer-1` など）・radiusの7種類。z-index・media-query は現時点では未整備のため、`src/content/articles/products/design-tokens/` を直接参照すること。
- 余白トークンは、プリミティブトークン（数値）で指定すること（`tokens/spacing.mdx` 参照）。
