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

## `coverage-baseline.json` の運用

`scripts/generate-skills/coverage-baseline.json` は `pnpm coverage`（および `pnpm generate` 内部の整合性チェック）における既知違反の例外リストです。ここに列挙されたエントリは違反として報告されず、CI でも `exit 1` しません。新規違反のみ PR ブロック対象になります。

### ファイル構造

| キー | 内容 | 用途 |
| --- | --- | --- |
| `newComponents` | smarthr-ui の `metadata.json` には存在するが設計システム側 `index.mdx` が未対応な displayName | smarthr-ui 新規追加コンポーネントの段階的取り込み |
| `orphanDirs` | 設計システムに `index.mdx` あるが smarthr-ui 側 displayName が消えた dir | smarthr-ui 側 rename / 削除の追従猶予 |
| `missingDescriptions` | 子 dir なし & `relatedComponents.description` 未指定 (形式: `"<name> (parent: <parentName>)"`) | 親 mdx 側で description を追加するまでの猶予 |
| `unknownRelatedNames` | `relatedComponents.name` が smarthr-ui の公開 export に存在しない (形式: `"<name> (parent: <parentName>)"`) | typo / smarthr-ui 内部実装参照を別 PR で解消するまでの猶予 |

### 追加するタイミング

PR で coverage チェックに新規違反が出たとき、以下のいずれかで対処します。

1. **その PR で解消する** (推奨): `index.mdx` を作成する、`relatedComponents` を修正する等で違反を解消
2. **別 PR に切り出す**: smarthr-ui アップデート PR で新規コンポーネント追加だけ後回しにする等のケース。違反エントリを `coverage-baseline.json` の該当キー配列に追加して CI を通す

### 削除するタイミング

baseline に登録された違反を別 PR で解消したら、対応するエントリを `coverage-baseline.json` から削除してください。削除を忘れた場合、`pnpm coverage` が次のように通知します。

```
ℹ️  baseline に列挙されているが既に解消済みのエントリ (N):
   - newComponents: Foo
   → scripts/generate-skills/coverage-baseline.json からこれらを削除してください
```

この通知は exit code に影響しません（CI を fail させない）。気付いたタイミングで削除 PR を出してください。

### ローカル動作確認

```sh
pnpm --filter ./scripts/generate-skills coverage
```

baseline 適用後の結果のみが表示されます。baseline で隠れている内容を確認したい場合は、一時的に `coverage-baseline.json` を空にして実行してください。

### 例

```json
{
  "$comment": "coverage チェックの既知違反リスト。運用方法は scripts/generate-skills/README.md の「coverage-baseline.json の運用」を参照。",
  "newComponents": ["Balloon"],
  "orphanDirs": [],
  "missingDescriptions": [],
  "unknownRelatedNames": []
}
```

## 設計

- 整備済み（`checklist.yaml` がある）コンポーネントは Layer 1+2+3 の完全版を、それ以外は Layer 1+2 のみの簡易版を生成します。
- 個別コンポーネントドキュメント（`.md`）は YAML frontmatter を持ちません。skill ではなくドキュメントとして配置されるためです（Phase 7: Progressive Disclosure 化）。
- エントリポイント `SKILL.md` は手動管理の固定ファイルで、`description` と `paths` を持ちます。コンポーネントの増減で変更不要です。
- コンポーネント選定ガイド（`component-selector.md`）はコンポーネント一覧とガイドファイルへの相対パスを持つドキュメントです。
- サブコンポーネント（`Controlled*` 派生、Table 系内部部品、Dialog/ErrorScreen/Picker 配下のカテゴリメンバーなど）は親 mdx の `relatedComponents` 宣言で接続し、本文・checklist を継承します。`description` のみ派生先固有の文を採用します。smarthr-ui の親ディレクトリ単位グループから `relatedComponents` 宣言済みの displayName を自動分離し、個別ドキュメントを生成します（`scripts/generate-skills/mapping/group-split.json` の旧手動マッピングは廃止）。
- スクリプトの詳細仕様は Notion の「M1: SKILL.md 自動生成スクリプト 入出力仕様書」と「M4 プラグイン設計調査」を参照してください。

### コンポーネントドキュメント本文の整形方針

`index.mdx` は人間向けドキュメントのため Markdown 記法のまま維持し、生成される個別ドキュメント（`components/<Name>.md`）の `# <Name>` 見出し直下の説明段落（`description` と `leadParagraph` 相当）のみ `lib/format-skill-body-text.ts` の `formatSkillBodyText` でエージェント向けプレーンテキストに変換します。

> 注: Phase 7 以降、個別ドキュメントは frontmatter を持ちません。ここでの「`description`」は `index.mdx` の frontmatter から抽出した定義文を指し、出力側ドキュメントでは見出し直下の段落として描画されます。

- **対象**: コンポーネントドキュメント本文の定義文・追記段落（`render-skill.ts`）
- **対象外**: `index.mdx` 由来の定義文を整形する前のソース、`component-selector.md` の一覧表、checklist / eslint セクション
- **重複除去**: `stripMarkdownInline` による一致に加え、本文が定義文の略称版（先頭文同一かつ短い）や lead が定義文の追記のみ（先頭一致かつ長い）のケースも除外（`isSubstantivelyDuplicate` / `isLeadSupersetOfDescription`）
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
