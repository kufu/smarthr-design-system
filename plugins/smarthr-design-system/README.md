# smarthr-design-system プラグイン

SmartHR Design SystemのコンポーネントガイドラインとデザインパターンガイドラインをAIコーディングエージェント（Claude Code / Cursor / Codex）に提供するプラグイン。

- smarthr-uiのコンポーネントを正しく選択・使用するための知識（Props仕様・eslintルール・使い方チェックリスト）
- SmartHRプロダクトのページレイアウトやUIパターンを正しく実装するためのデザインパターンガイドライン
- 実装の変更差分を上の2つのガイドに照らしてレビューするデザインレビュー

をスキルとして配布する。

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

プラグインは**3つのスキル**を提供する。ガイドの2つは[Progressive Disclosureパターン](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices#progressive-disclosure-patterns)を採用しており、AIが必要に応じて段階的にドキュメントを読み込む。`design-review`はこの2つのガイドを使ってレビューする。

### `component-guidelines`

smarthr-uiの各コンポーネントを正しく使うためのガイド。

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

### `design-pattern-guidelines`

SmartHRプロダクトのページレイアウトやUIパターンを正しく実装するためのガイド。

```
skills/design-pattern-guidelines/
├── SKILL.md                       エントリポイント（手動管理）
├── pattern-selector.md            パターン選定ガイド（手動管理）
└── patterns/                      各パターンガイド（src/content へのシンボリックリンク）
    ├── page-layout.mdx
    ├── smarthr-table.mdx
    └── ...（24件）
```

### `design-review`

変更差分（`.tsx`/`.jsx`）を`component-guidelines`と`design-pattern-guidelines`に照らしてレビューし、重大度1〜5を付けて報告する。`--fix`を付けたときだけ、閾値以上の指摘を直す。

```
skills/design-review/
├── SKILL.md                       エントリポイント（手動管理）
└── references/
    ├── reviewer-prompt.md         レビュアー（サブエージェント）への指示の雛形（手動管理）
    └── doc-urls.md                ガイド → 公式ドキュメントのURLの対応表（自動生成）
```

使い方（Claude Code）:

```
/smarthr-design-system:design-review                  # 未コミットの変更をレビュー（報告のみ）
/smarthr-design-system:design-review --fix            # レビューして、閾値以上の指摘を直す
/smarthr-design-system:design-review 123              # PR #123 の差分
/smarthr-design-system:design-review main             # main との差分
/smarthr-design-system:design-review src/Foo.tsx      # 指定したファイルだけ
/smarthr-design-system:design-review threshold=3      # 「要修正」にする重大度の下限を3にする（既定は4）
```

- pattern（`design-pattern-guidelines`）とcomponent（`component-guidelines`）の2つの観点を、サブエージェントが並列にレビューする
- 根拠はガイドの文の引用。余白の値など、コードだけで判定できない指摘は「確認事項」に、既存のコードと同じ書き方は「リポジトリ全体の課題」に分けて出す
- レビューのスキルは、AIが自分でできると判断して起動しないことがある。確実に使うときは名前で呼ぶ
- `kufu/mio-claude-plugin`の`shr-design-review`を元にしている

## 開発者向け情報

### component-guidelines

`components/*.md`と`component-selector.md`は`scripts/generate-skills/`で自動生成される。直接編集せず、入力ソースを更新して再生成すること。`SKILL.md`のみ手動管理。

### design-pattern-guidelines

`patterns/*.mdx`はデザインシステムサイトのコンテンツ（`src/content/articles/products/design-patterns/`）へのシンボリックリンク。既存パターンの更新にはそのまま追従するが、新規パターンを追加した場合はシンボリックリンクを手動で追加する必要がある。`SKILL.md`と`pattern-selector.md`は手動管理。

### design-review

`references/doc-urls.md`は`scripts/generate-skills/`で自動生成される。コンポーネントの対応はcomponent-guidelinesの生成と同じ対応付け（専用のページが無いものは`relatedComponents`の親のページ）から、パターンの対応は`patterns/*.mdx`のシンボリックリンクの先から作る。URLは人間向けの情報なので、AIが読むガイド本体には入れない。`SKILL.md`と`references/reviewer-prompt.md`は手動管理。

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
