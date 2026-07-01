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

## どのパターンを実装するか迷っているとき

パターンが未確定なら、**まず [pattern-selector.md](pattern-selector.md) を読む**こと。UI要件からパターンを特定してから次のステップに進む。

## 対象パターンが分かっているとき

**`patterns/<pattern-name>.mdx` を必ず読んでから**実装すること。
どのファイルを読むべきかは **[pattern-selector.md](pattern-selector.md)** を参照すること（ページレイアウト・テーブル/リスト・ダイアログ・フォーム・権限など全パターンの対応表がある）。

## コンポーネントの props・デザイントークンを必ず確認する

デザインパターンの実装例に登場するコンポーネントを使う際は、**`component-guidelines` スキルを併用して props・型・使用ルールを確認してから実装すること**。

また、色・行送り・角丸・影・余白・タイポグラフィ・幅などのデザイントークン値を指定する際は、**`design-token-guidelines` スキルを併用して正しいトークンを選択すること**。

デザインパターンのドキュメントはレイアウト構造を示すものであり、各コンポーネントの正確な prop 値（型の選択肢・デフォルト値・必須フラグなど）やデザイントークンの使い分けルールは記載されていない。事前知識で prop 値やトークン値を推測すると、存在しない値を渡す誤りが生じる（例: `StatusLabel` の `type` に `'inactive'` や `'success'` を渡す、意味の異なる色トークンを使うなど）。

### 手順

1. デザインパターンドキュメント（`patterns/*.mdx`）で実装の全体構造を把握する
2. 実装例に含まれる smarthr-ui コンポーネントについて、`component-guidelines` スキルの `components/<ComponentName>.md` を読んで props を確認する
3. 色・行送り・角丸・影・余白・タイポグラフィ・幅などのトークン値について、`design-token-guidelines` スキルの `tokens/<category>.mdx` を読んで正しいトークンを確認する
4. 確認した props・トークンに基づいて実装する

## MDXの読み方

各パターンファイルは以下を含む:
- **実装例（`tsx editable` コードブロック）**: 正しい構造・コンポーネント・propsの組み合わせ。そのまま参考にすること。
- **`<DoAndDont type="dont">` ブロック**: やってはいけない実装。Astroコンポーネントの記法だが、内容は必ず読み、避けること。
- **散文のルール**: 余白・構造・命名に関する制約。
