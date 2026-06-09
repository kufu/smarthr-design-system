---
name: design-token-guidelines
description: >-
  Guides correct selection of SmartHR design token values.
  Use when choosing spacing (Stack gap, Base padding, margin), colors (bgColor, text color, border),
  font sizes, line heights, or container/dialog widths.
  Covers semantic vs primitive token distinction, deprecated token warnings,
  and when each token value should (and should not) be used.
paths: ["**/*.tsx", "**/*.jsx", "**/*.css", "**/*.scss"]
---

# SmartHR デザイントークン ガイド

SmartHRプロダクトで使用するデザイントークン値を正しく選択するためのガイド。

**重要**: トークン値は事前知識で決めず、必ず下記の該当ドキュメントを実際に読んでから実装すること。各トークンには「以下の場合に使います」「使用上の注意」があり、見た目が同じでも使ってはいけないケースが定義されている。

## どのトークンを使うか迷っているとき

**まず [token-selector.md](token-selector.md) を読む**こと。実装シーンからどのファイルを読むべきかの対応表がある。

## 対象トークンが分かっているとき

**`tokens/<token-category>.mdx` を必ず読んでから**実装すること。

| カテゴリ | ファイル | 主な用途 |
|---------|---------|---------|
| 余白 | `tokens/spacing.mdx` | `gap`、`padding`、`margin` の数値 |
| 色 | `tokens/color.mdx` | `bgColor`、テキスト色、枠線色 |
| タイポグラフィ | `tokens/typography.mdx` | フォントサイズ、テキストスタイル |
| 行送り | `tokens/leading.mdx` | `line-height` |
| 幅 | `tokens/width.mdx` | `Container` の `size`、`Dialog` の `width` |

## ドキュメントの読み方

各トークンファイルは以下の構成になっている:
- **トークン一覧表**: トークン名と値（rem/px）の対応
- **「以下の場合に使います」**: そのトークンが適切なユースケース
- **「使用上の注意」**: 混同しやすい別トークンへの誘導（「〇〇には使わない → △△を使ってください」）

「使用上の注意」は特に重要。色トークンでは `BACKGROUND`/`COLUMN`/`OVER_BACKGROUND` など視覚的に似ていても使い分けが必要なものがある。

## よくある間違い

- 余白のセマンティックトークン（`XS`、`S`、`M` など）を使う → **非推奨**。数値（`0.5`、`1`、`1.5` など）で指定すること
- `BACKGROUND` 色を `WHITE` の上に重ねる → **誤り**。`WHITE` の上は `COLUMN` を使う
- `COLUMN` 色を `BACKGROUND` の上に置く → **誤り**。`BACKGROUND` の上は `OVER_BACKGROUND` を使う
- `MAIN` をテキスト色に使う → **誤り**。テキストリンク色は `TEXT_LINK` を使う
- `DANGER` を警告（削除前の注意）に使う → **誤り**。警告は `WARNING_YELLOW`、実行時のエラー・破壊的操作は `DANGER`

## 未整備のトークン

以下は現時点でこのスキルの対象外。`src/content/articles/products/design-tokens/` を直接参照すること:
- shadow（`shadow-layer-1` などの Tailwind クラス）
- radius（角丸）
- z-index
- media-query
