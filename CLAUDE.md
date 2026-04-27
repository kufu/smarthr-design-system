# CLAUDE.md

このリポジトリで Claude Code / Claude Code Action が作業する際のコンテキストです。

## リポジトリ概要

[SmartHR Design System](https://smarthr.design/) のドキュメントサイトです。Astro + MDX で構築されています。

- ビルド: `pnpm dev`（ローカル開発）/ `pnpm build`（本番ビルド）
- フレームワーク: Astro
- 記事フォーマット: MDX

## コンポーネントドキュメントの場所

各 smarthr-ui コンポーネントのドキュメントは `src/content/articles/products/components/` 配下に、コンポーネント名のディレクトリとして配置されています。

```
src/content/articles/products/components/
├── index.mdx                    # コンポーネント一覧トップ
├── button/
│   ├── index.mdx
│   ├── _components/
│   └── images/
├── dialog/
│   ├── index.mdx
│   ├── _components/
│   ├── images/
│   ├── action-dialog/           # サブコンポーネントは入れ子ディレクトリ
│   ├── message-dialog/
│   └── ...
└── ...
```

## ディレクトリ構成の説明

各コンポーネントディレクトリは以下の構造を持ちます。

- `index.mdx` — コンポーネントの本文（ガイドライン）。デザイナー / エンジニア向けの利用ルールが記述されます。
- `_components/` — `index.mdx` から `import` される部品ファイルを置くディレクトリ。
  - `.mdx` ファイル: ガイドライン本文の一部（ルール記述を含みうる）として import されます。
  - `.tsx` / `.astro` / `.scss` ファイル: 表示用コンポーネント（プレビュー、サンプル、図版用スタイルなど）。
- `images/` — ガイドラインで参照する画像。
- `checklist.mdx` — AI エージェント向けのルールチェックリスト（M2 で生成・更新するファイル。現時点では未配置）。

## checklist.mdx と SKILL.md の関係

`checklist.mdx` は smarthr-component-skills リポジトリ側の SKILL.md 合成スクリプト（`scripts/generate-skills.ts`）の入力になります。

```
Layer 1: metadata.json（コンポーネント基本情報）
Layer 2: eslint-plugin-smarthr のルール README（自動検出可能なルール）
Layer 3: checklist.mdx（このリポジトリで管理する人手作成ルール）
        ↓
     SKILL.md（smarthr-ui を使う AI エージェント向けスキル）
```

`checklist.mdx` は `index.mdx` および `_components/*.mdx` の差分から Claude Code Action が抽出・更新します。M1 で定義された「対象外ルール」の判定はプロンプト側で行うため、このリポジトリにそのリストは持ちません。

## eslint-plugin-smarthr のルール名一覧

`tamatebako` リポジトリの `packages/eslint-plugin-smarthr/rules/` 配下のディレクトリ名一覧を `.github/data/eslint-rule-names.txt` に配置しています。Claude が `checklist.mdx` のルール候補と eslint ルールを対応付ける際の参照情報です。

- 配置: `.github/data/eslint-rule-names.txt`
- 形式: 1 行 1 ルール名
- 全ルールを含みます（対象外判定はプロンプト側）

更新方法（手動）:

```sh
gh api repos/kufu/tamatebako/contents/packages/eslint-plugin-smarthr/rules \
  --paginate --jq '.[] | select(.type=="dir") | .name' \
  > .github/data/eslint-rule-names.txt
```
