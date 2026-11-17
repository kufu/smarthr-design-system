---
name: design-pattern-guidelines
description: >-
  Guides correct implementation of SmartHR product page layout patterns.
  Use when implementing collection (table/list) pages, single-object detail pages,
  or any page that follows the SmartHR design system layout conventions.
  Covers spacing, button variants, pagination placement, テーブル操作エリア/一時操作エリアの配置ルール,
  and DoAndDont avoid-patterns to prevent common mistakes.
paths: ["**/*.tsx", "**/*.jsx"]
---

# SmartHR デザインパターン ガイド

SmartHRプロダクトのページレイアウトパターンを正しく実装するためのガイド。

**重要**: デザインパターンに関する実装は、事前知識のみで答えず、必ず下記の該当ドキュメントを実際に読んでから実装すること。余白トークン・Button variant・ページネーション位置・テーブル操作エリアの構造は頻繁に更新される。また、`<DoAndDont type="dont">` に記載されたアンチパターンには、一見正しく見えても誤りのある実装が含まれているため、必ず確認すること。

## ガイドラインの位置づけ

デザインパターンは SmartHR Design System の基準・ガイドラインであり、守らなければならない規則ではない。プロダクト開発を助けるための「補助線」で、どこまで合わせるかは開発の現場の判断が優先される（[ガイドラインとの向き合いかた](https://smarthr.design/products/#h2-2)）。

- 「必ず読む」は、記憶ではなく最新の基準を確認するための指示であり、「必ず従う」という意味ではない。
- 実装ではパターンに沿うことを既定とする。ただし、既存画面との整合・要件・ユーザーの指示など、パターンに合わせない理由がある場合は外してよい。そのときはパターンとの差分と理由を明示する。
- パターンが用意されていないことは、その UI を禁止しているという意味ではない。
- コードをレビューするときは、パターンとの差分を「違反」と断定せず、差分と、意図を確認する問いとして伝える。
- パターンに合わせるか迷うときは、[基準判定フローチャート](https://smarthr.design/products/usability/usability-checklist/#h3-6)の判断の流れを参考にする。

## どのパターンを実装するか迷っているとき

パターンが未確定なら、**まず [pattern-selector.md](pattern-selector.md) を読む**こと。UI要件からパターンを特定してから次のステップに進む。

## 対象パターンが分かっているとき

**`patterns/<pattern-name>.mdx` を必ず読んでから**実装すること。
どのファイルを読むべきかは **[pattern-selector.md](pattern-selector.md)** を参照すること（ページレイアウト・テーブル/リスト・ダイアログ・フォーム・権限など全パターンの対応表がある）。

## コンポーネントの props を必ず確認する

デザインパターンの実装例に登場するコンポーネントを使う際は、**`component-guidelines` スキルを併用して props・型・使用ルールを確認してから実装すること**。

パターンドキュメントはレイアウト構造を示すものであり、各コンポーネントの正確な prop 値（型の選択肢・デフォルト値・必須フラグなど）は記載されていない。事前知識で prop 値を推測すると、存在しない値を渡す誤りが生じる（例: `StatusLabel` の `type` に `'inactive'` や `'success'` を渡すなど）。

### 手順

1. デザインパターンドキュメント（`patterns/*.mdx`）で実装の全体構造を把握する
2. 実装例に含まれる smarthr-ui コンポーネントについて、`component-guidelines` スキルの `components/<ComponentName>.md` を読んで props を確認する
3. 確認した props に基づいて実装する

## MDXの読み方

各パターンファイルは以下を含む:
- **実装例（`tsx editable` コードブロック）**: 正しい構造・コンポーネント・propsの組み合わせ。そのまま参考にすること。
- **`<DoAndDont type="dont">` ブロック**: 避けるべき実装。Astroコンポーネントの記法だが、内容は必ず読むこと。避けるのが既定で、あえて採用する場合は理由を明示する。
- **散文の基準**: 余白・構造・命名に関する基準。
