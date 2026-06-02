# generate-skills

`smarthr-design-system` プラグインのコンポーネントガイドドキュメントを生成するスクリプト。3 レイヤー（Layer 1: smarthr-ui `metadata.json` / Layer 2: `eslint-plugin-smarthr` の各ルール README / Layer 3: `src/content/articles/products/components/**/checklist.yaml`）を合成し、`plugins/smarthr-design-system/skills/component-guidelines/` 配下に書き出します。

## セットアップ

```sh
cd scripts/generate-skills
pnpm install
```

## 実行

```sh
# scripts/generate-skills/ で
pnpm generate
```

出力先（リポジトリルートから相対）:

- `plugins/smarthr-design-system/skills/component-guidelines/components/<PascalCase>.md`（個別コンポーネントドキュメント）
- `plugins/smarthr-design-system/skills/component-guidelines/component-selector.md`（コンポーネント選定ガイド）

エントリポイントの `plugins/smarthr-design-system/skills/component-guidelines/SKILL.md` は手動管理であり、`pnpm generate` では上書きしません。

## 入力ソース

| Layer | ソース | 取得方法 |
| --- | --- | --- |
| 1 (Props) | `smarthr-ui/metadata.json` | npm パッケージ同梱、直接 import |
| 1 (description / deprecated / relatedComponents) | `src/content/articles/products/components/**/index.mdx` の frontmatter | 同リポジトリ内、`parseIndexMdx` で抽出 |
| 2 (eslint) | `kufu/tamatebako` の `packages/eslint-plugin-smarthr/rules/*/README.md` | コミット済みスナップショット `eslint-rules-snapshot.json` を読み込み（無い場合のみ GitHub API から取得） |
| 3 (checklist) | `src/content/articles/products/components/**/checklist.yaml` | 同リポジトリ内、直接読み込み |

Layer 2 のルール README はリポジトリにコミット済みのスナップショット `eslint-rules-snapshot.json` から読み込みます。**通常の `pnpm generate` はこのスナップショットを使うため、ネットワークも `GITHUB_TOKEN` も不要**です。

上流（`kufu/tamatebako`）のルールが更新されたときだけ、スナップショットを再生成します。

```sh
rm eslint-rules-snapshot.json
GITHUB_TOKEN=<token> pnpm generate   # API から取得し直しスナップショットを更新
```

スナップショットが無い状態で実行すると GitHub API から取得します。`GITHUB_TOKEN` 未設定だと unauthenticated rate limit (60 req/hour) にかかる可能性があるため、再生成時は設定を推奨します（未設定時は警告を出力）。レートリミット遭遇時は `X-RateLimit-Reset` / `Retry-After` を見て自動的に待機・再試行します（最大 3 回）。再生成後は更新された `eslint-rules-snapshot.json` をコミットしてください。

`pnpm generate` 実行時、上流の全ルール名（除外前）一覧を `.github/data/eslint-rule-names.txt` に自動書き出しします。これは Claude の `checklist.yaml` 生成プロンプト (`.github/prompts/generate-checklist.md` 等) が参照する AI 向けリファレンスです。手動更新は不要です。

## 環境変数

| 変数 | デフォルト | 用途 |
| --- | --- | --- |
| `GITHUB_TOKEN` | なし | GitHub API 認証（レートリミット緩和）。スナップショット再生成時のみ使用。通常の生成では不要 |
| `OUTPUT_DIR` | `<repoRoot>/plugins/smarthr-design-system/skills` | 出力先 |
| `DESIGN_SYSTEM_DIR` | `<repoRoot>/src/content/articles/products/components` | Layer 3 入力 |

## 設計

- 整備済み（`checklist.yaml` がある）コンポーネントは Layer 1+2+3 の完全版を、それ以外は Layer 1+2 のみの簡易版を生成します。
- 個別コンポーネントドキュメント（`.md`）は YAML frontmatter を持ちません。skill ではなくドキュメントとして配置されるためです（Phase 7: Progressive Disclosure 化）。
- エントリポイント `SKILL.md` は手動管理の固定ファイルで、`description` と `paths` を持ちます。コンポーネントの増減で変更不要です。
- コンポーネント選定ガイド（`component-selector.md`）はコンポーネント一覧とガイドファイルへの相対パスを持つドキュメントです。
- サブコンポーネント（`Controlled*` 派生、Table 系内部部品、Dialog/ErrorScreen/Picker 配下のカテゴリメンバーなど）は親 mdx の `relatedComponents` 宣言で接続し、本文・checklist を継承します。`description` のみ派生先固有の文を採用します。smarthr-ui の親ディレクトリ単位グループから `relatedComponents` 宣言済みの displayName を自動分離し、個別ドキュメントを生成します（`scripts/generate-skills/mapping/group-split.json` の旧手動マッピングは廃止）。
- スクリプトの詳細仕様は Notion の「M1: SKILL.md 自動生成スクリプト 入出力仕様書」と「M4 プラグイン設計調査」を参照してください。

### SKILL.md 本文の整形方針

`index.mdx` は人間向けドキュメントのため Markdown 記法のまま維持し、SKILL.md 本文（frontmatter `description` 直下の段落と `leadParagraph`）のみ `lib/format-skill-body-text.ts` の `formatSkillBodyText` でエージェント向けプレーンテキストに変換します。

- **対象**: 個別スキル本文の定義文・追記段落（`render-skill.ts`）
- **対象外**: YAML frontmatter の `description`（ルーティング用・プレーンのまま）、`component-selector` の一覧表・frontmatter、checklist / eslint セクション
- **重複除去**: `stripMarkdownInline` による一致に加え、本文が frontmatter の略称版（先頭文同一かつ短い）や lead が description の追記のみ（先頭一致かつ長い）のケースも除外（`isSubstantivelyDuplicate` / `isLeadSupersetOfDescription`）
- **import の除外**: `extractLeadParagraph` は `import` 文（複数行 import の途中行・`} from '...'` 行を含む）をスキップする。`index.mdx` は import ブロックを本文より前に置く convention を推奨
- **リンク変換**:
  - `/products/components/` 配下 → ラベルのみ（例: `[Table](/products/components/table/)` → `Table`）
  - その他の相対パス → ラベル + 絶対 URL（例: `[よくあるテーブル](/products/design-patterns/smarthr-table/)` → `よくあるテーブル（https://smarthr.design/...）`）
  - 絶対 URL → ラベル + URL（括弧付き）
- **インラインコード**: バッククォートを除去（例: `` `table` `` → `table`）。`input[type="text"]` や JSX 属性の引用符は保持する（引用符除去は重複比較用の `stripMarkdownInline` のみ）

## Progressive Disclosure アーキテクチャ

Phase 7 で導入した構成。105 個の個別スキルを 1 つのエントリポイントスキル（`component-guidelines/SKILL.md`）配下のドキュメントファイルに変換し、Claude Code の `skillListingBudgetFraction` 超過問題を解消しています。

```
skills/component-guidelines/
├── SKILL.md                  ← 唯一のスキル（手動管理）
├── component-selector.md     ← 自動生成（コンポーネント一覧）
└── components/               ← 自動生成（PascalCase = import 名）
    ├── Button.md
    ├── Table.md
    └── ...
```
