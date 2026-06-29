# AGENTS.md

このリポジトリで AI コーディングエージェント（Claude Code / Cursor / Codex など）が作業する際のコンテキストです。

## リポジトリ概要

[SmartHR Design System](https://smarthr.design/) のドキュメントサイトです。Astro + MDX で構築されています。

- ビルド: `pnpm dev`（ローカル開発）/ `pnpm build`（本番ビルド）
- フレームワーク: Astro
- 記事フォーマット: MDX

## PR を作成するときの注意

PR 作成前に必ず `.github/PULL_REQUEST_TEMPLATE.md` を読み、その見出し構成（課題・背景 / やったこと / やらなかったこと / 動作確認 / checklist.yaml の更新 / キャプチャ）に沿って本文を書くこと。

- `gh pr create` や API で PR を作る場合、テンプレートは本文に自動挿入されない。必ず自分でテンプレートを開いて構成を写すこと。
- 該当しない節は「特になし」と明記するか、テンプレート内のコメントの指示に従って削除する。
- 「checklist.yaml の更新」節は、コンポーネントの `index.mdx` / `_components` を変更した場合に必ず記入する（記入基準は CONTRIBUTING.md「smarthr-ui コンポーネント向け AI スキルの整備」を参照）。

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
- `checklist.yaml` — AI エージェント向けのルールチェックリスト（YAML 形式）。

## checklist.yaml と SKILL.md の関係

`checklist.yaml` は SKILL.md 合成スクリプト（`scripts/generate-skills/`）の入力になります。

```
Layer 1: metadata.json（コンポーネント基本情報）
Layer 2: eslint-plugin-smarthr のルール README（自動検出可能なルール）
Layer 3: checklist.yaml（このリポジトリで管理する人手作成ルール）
        ↓
     SKILL.md（smarthr-ui を使う AI エージェント向けスキル）
```

`checklist.yaml` は `index.mdx` および `_components/*.mdx` の差分から抽出・更新します。「対象外ルール」の判定はプロンプト側で行うため、このリポジトリにそのリストは持ちません。

## eslint-plugin-smarthr のルール名一覧

`tamatebako` リポジトリの `packages/eslint-plugin-smarthr/rules/` 配下のディレクトリ名一覧を `.github/data/eslint-rule-names.txt` に配置しています。`checklist.yaml` のルール候補と eslint ルールを対応付ける際の参照情報です。

- 配置: `.github/data/eslint-rule-names.txt`
- 形式: 1 行 1 ルール名
- 全ルールを含みます（対象外判定はプロンプト側）

更新方法: `scripts/generate-skills` の `pnpm generate` 実行時に、eslint ルール README を上流から取得する処理の副産物として自動更新されます。手動更新は不要です（GitHub API 認証付きでの実行を推奨。`GITHUB_TOKEN` 環境変数を設定してください）。
