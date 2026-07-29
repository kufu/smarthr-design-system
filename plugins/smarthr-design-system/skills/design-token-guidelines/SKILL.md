---
name: design-token-guidelines
description: >-
  Guides correct selection of SmartHR design token values.
  Use when choosing spacing (Stack gap, Base padding, margin), colors (bgColor, text color, border),
  font sizes, line heights, or container/dialog widths.
  Covers semantic vs primitive token distinction, deprecated token warnings,
  and when each token value should (and should not) be used.
---

# SmartHR デザイントークン ガイド

SmartHRプロダクトで使用するデザイントークン値を正しく選択するためのガイド。

**重要**: トークン値は事前知識で決めず、必ず下記の該当ドキュメントを実際に読んでから実装すること。各トークンには「以下の場合に使います」「使用上の注意」があり、見た目が同じでも使ってはいけないケースが定義されている。

## どのトークンを使うか迷っているとき

**まず [token-selector.md](token-selector.md) を読む**こと。実装シーンからどのファイルを読むべきかの対応表がある。

## 対象トークンが分かっているとき

**`tokens/<token-category>.mdx` を必ず読んでから**実装すること。

| カテゴリ | ファイル | 主な用途 | ページレイアウト実装時の確認タイミング |
|---------|---------|---------|--------------------------------------|
| 余白 | `tokens/spacing.mdx` | `gap`、`padding`、`margin` の数値 | コンポーネントを配置するとき |
| 色 | `tokens/color.mdx` | `bgColor`、テキスト色、枠線色 | 背景色／テキスト色のクラスを書くとき |
| タイポグラフィ | `tokens/typography.mdx` | フォントサイズ、テキストスタイル | テキストスタイルを選ぶとき |
| 行送り | `tokens/leading.mdx` | `line-height` | `line-height` を指定するとき |
| 幅 | `tokens/width.mdx` | `Container` の `size`、`Dialog` の `width` | `Container`／`Dialog` を使うとき |
| 影 | `tokens/shadow.mdx` | `Base` の `layer` や `shr-shadow-layer-1` などのTailwind CSSのクラス名 | `Base` の `layer` を指定するとき |
| 角丸 | `tokens/radius.mdx` | `Base` の `radius` や `shr-rounded-m` などのTailwind CSSのクラス名 | `Base` の `radius` を指定するとき |

## ドキュメントの読み方

各トークンファイルは以下の構成になっている:
- **トークン一覧表**: トークン名と値（rem/px）の対応
- **「以下の場合に使います」**: そのトークンが適切なユースケース
- **「使用上の注意」**: 混同しやすい別トークンへの誘導（「〇〇には使わない → △△を使ってください」）

「使用上の注意」は特に重要。色トークンでは `BACKGROUND`/`COLUMN`/`OVER_BACKGROUND` など視覚的に似ていても使い分けが必要なものがある。

## よくある間違い

各トークンファイルの「使用上の注意」に記載されている。トークンファイルを読む際に必ず確認すること。

## 未整備のトークン

以下は現時点でこのスキルの対象外。別リポジトリである`https://github.com/kufu/smarthr-design-system.git`の`src/content/articles/products/design-tokens/` を直接参照すること:

- z-index
- media-query

