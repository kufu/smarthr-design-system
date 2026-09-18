# AGENTS.md

このリポジトリで AI コーディングエージェント（Claude Code / Cursor / Codex など）が作業する際のコンテキストです。

## リポジトリ概要

[SmartHR Design System](https://smarthr.design/) のドキュメントサイトです。Astro + MDX で構築されています。記事コンテンツ（`src/content/articles/`）が本体で、デザインガイドラインやコンポーネントの利用ルールを掲載しています。

- フレームワーク: Astro（v4 系）/ 記事フォーマット: MDX
- ローカル環境構築・コンテンツの書き方 → [README.md](./README.md)
- Astro の内部構成・独自機能・デプロイ → [CONTRIBUTING.md](./CONTRIBUTING.md)

## セットアップ / よく使うコマンド

- 初回: `pnpm install`（Node は `.node-version` 準拠）
- 開発: `pnpm dev` / ビルド: `pnpm build`
- Lint: `pnpm lint`（TS・コードブロック・astro check・textlint をまとめて実行）
- 整形: `pnpm format`
- コンテンツ（MDX）の文章チェック: `pnpm lint:text`（textlint。日本語の表記ルールを強制）
- `checklist.yaml` の形式検証: `pnpm --filter ./scripts/generate-skills validate`

コミット前に、変更内容に関連する lint / validate を実行して通すこと。

## ディレクトリ構成

- `src/pages/` — ルーティング（`[...slug].astro` が `src/content/articles/` の MDX からページを生成）
- `src/content/articles/` — 記事（MDX）。サイト本文の実体
- `src/components/` — 記事から呼び出すコンポーネント（Astro / React）
- `src/layouts/` — ページレイアウト
- `src/remark/` — 独自 remark プラグイン
- `scripts/` — コンテンツ生成・チェック用スクリプト（`generate-skills` など）
- `plugins/` — 配布する AI スキルプラグイン（`component-guidelines` / `design-pattern-guidelines`）
- `public/` — 静的アセット / `.github/workflows/` — CI

## PR を作成するときの注意

PR 作成前に必ず `.github/PULL_REQUEST_TEMPLATE.md` を読み、その見出し構成（課題・背景 / やったこと / やらなかったこと / 動作確認 / checklist.yaml の更新 / キャプチャ）に沿って本文を書くこと。

- `gh pr create` や API で PR を作る場合、テンプレートは本文に自動挿入されない。必ず自分でテンプレートを開いて構成を写すこと。
- 該当しない節は「特になし」と明記するか、テンプレート内のコメントの指示に従って削除する。
- 「checklist.yaml の更新」節は、コンポーネントの `index.mdx` / `_components` を変更した場合に必ず記入する（記入基準は CONTRIBUTING.md「smarthr-ui コンポーネント向け AI スキルの整備」を参照）。

## コミットメッセージ

Conventional Commits（`feat:` / `fix:` / `docs:` / `chore:` など）に従う。

## 配布しているプラグイン

ドキュメントサイトに加えて、smarthr-ui を使う AI コーディングエージェント（Claude Code / Cursor / Codex）向けのスキルプラグインを `plugins/smarthr-design-system/` で配布しています。コンポーネントの利用ガイドやデザインパターンをスキルとして提供するものです。

- 概要・構成・開発方法 → [plugins/smarthr-design-system/README.md](./plugins/smarthr-design-system/README.md)
- スキルの合成元になる `checklist.yaml` の作成・更新（AI スキルに任せられます）→ [CONTRIBUTING.md](./CONTRIBUTING.md)「smarthr-ui コンポーネント向け AI スキルの整備」
