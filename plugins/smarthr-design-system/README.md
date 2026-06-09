# smarthr-design-system プラグイン

SmartHR Design SystemのコンポーネントガイドラインをAIコーディングエージェント（Claude Code / Cursor / Codex）に提供するプラグイン。

smarthr-uiのコンポーネントを正しく選択・使用するための知識（Props仕様・eslintルール・使い方チェックリスト）をスキルとして配布する。

## 導入方法

プラグインはマーケットプレイス経由でインストールする。詳細な手順はNotionの「SmartHR Design SystemのAIコーディングエージェント向けスキルプラグイン」を参照。

### Claude Code

```sh
/plugin marketplace add kufu/smarthr-design-system
/plugin install smarthr-design-system@smarthr-design-system
```

### Cursor

Settings > Plugins > Browse Marketplaceから「SmartHR Design System」を検索してインストール。

## スキル構成

プラグインは**1つのスキル（`component-guidelines`）**を提供する。[Progressive Disclosureパターン](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices#progressive-disclosure-patterns)を採用しており、AIが必要に応じて段階的にドキュメントを読み込む。

```
skills/component-guidelines/
├── SKILL.md                       エントリポイント（手動管理）
├── component-selector.md          コンポーネント選定ガイド（自動生成）
└── components/                    各コンポーネントガイド（自動生成）
    ├── Button.md
    ├── ActionDialog.md
    └── ...（104件）
```

各コンポーネントガイドは3層で構成される:

| 層 | 内容 | ソース |
|-|-|-|
| Layer 1 | Props・型情報 | `smarthr-ui/metadata.json` |
| Layer 2 | 実装ルール（Do/Don't） | `eslint-plugin-smarthr`のルールREADME |
| Layer 3 | 使い方チェックリスト | `checklist.yaml`（人手レビュー済み） |

## 開発者向け情報

`components/*.md`と`component-selector.md`は`scripts/generate-skills/`で自動生成される。直接編集せず、入力ソースを更新して再生成すること。`SKILL.md`のみ手動管理。

### ローカル動作確認

```sh
claude --plugin-dir ./plugins/smarthr-design-system
```

### 再生成

```sh
pnpm --filter ./scripts/generate-skills generate
```

### バリデーション

```sh
pnpm --filter ./scripts/generate-skills validate
```

### 関連ドキュメント

- 生成スクリプト仕様: `scripts/generate-skills/README.md`
- checklist.yamlの運用: `CONTRIBUTING.md`の「smarthr-uiコンポーネント向けAIスキルの整備」
- プロジェクト詳細: Notion「SmartHR Design SystemのAIコーディングエージェント向けスキルプラグイン」
