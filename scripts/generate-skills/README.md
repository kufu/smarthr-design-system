# generate-skills

`smarthr-design-system` プラグインの `SKILL.md` を生成するスクリプト。3 レイヤー（Layer 1: smarthr-ui `metadata.json` / Layer 2: `eslint-plugin-smarthr` の各ルール README / Layer 3: `src/content/articles/products/components/**/checklist.yaml`）を合成し、`plugins/smarthr-design-system/skills/` 配下に書き出します。

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

- `plugins/smarthr-design-system/skills/<kebab-name>/SKILL.md`（個別スキル 102 個。コンポーネントごとに 1 ディレクトリ）
- `plugins/smarthr-design-system/skills/component-selector/SKILL.md`（ルータースキル）

## 入力ソース

| Layer | ソース | 取得方法 |
| --- | --- | --- |
| 1 (Props) | `smarthr-ui/metadata.json` | npm パッケージ同梱、直接 import |
| 1 (description / deprecated / relatedComponents) | `src/content/articles/products/components/**/index.mdx` の frontmatter | 同リポジトリ内、`parseIndexMdx` で抽出 |
| 2 (eslint) | `kufu/tamatebako` の `packages/eslint-plugin-smarthr/rules/*/README.md` | GitHub API 経由で取得し `.cache/eslint-rules.json` にキャッシュ |
| 3 (checklist) | `src/content/articles/products/components/**/checklist.yaml` | 同リポジトリ内、直接読み込み |

Layer 2 のキャッシュ更新は `.cache/eslint-rules.json` を削除して再実行。GitHub API のレートリミット回避のため、`GITHUB_TOKEN` 環境変数を設定すると認証付きでリクエストされます（未設定時は警告を出力）。レートリミット遭遇時は `X-RateLimit-Reset` / `Retry-After` を見て自動的に待機・再試行します（最大 3 回）。

`pnpm generate` 実行時、上流の全ルール名（除外前）一覧を `.github/data/eslint-rule-names.txt` に自動書き出しします。これは Claude の `checklist.yaml` 生成プロンプト (`.github/prompts/checklist-v3.md` 等) が参照する AI 向けリファレンスです。手動更新は不要です。

## 環境変数

| 変数 | デフォルト | 用途 |
| --- | --- | --- |
| `GITHUB_TOKEN` | なし | GitHub API 認証（レートリミット緩和） |
| `OUTPUT_DIR` | `<repoRoot>/plugins/smarthr-design-system/skills` | 出力先 |
| `DESIGN_SYSTEM_DIR` | `<repoRoot>/src/content/articles/products/components` | Layer 3 入力 |

## 設計

- 整備済み（`checklist.yaml` がある）コンポーネントは Layer 1+2+3 の完全版を、それ以外は Layer 1+2 のみの簡易版を生成します。
- 出力 SKILL.md の冒頭には Agent Skills 規格準拠の YAML frontmatter（`name` / `description` / `metadata`）を付けます。
- 個別スキルの `description` は `index.mdx` frontmatter の `description` をそのまま採用します（M5 Phase 4 で旧 `skill-triggers.json` を廃止）。`deprecated:true` のコンポーネントには「【非推奨】」プレフィックスを付与します。
- ルータースキル（component-selector）の `description` は「head 文 + 代表シナリオ 5 件（パターン C）」で構成します。代表として採用するコンポーネント名は `lib/render-router-skill.ts` 内の `REPRESENTATIVE_COMPONENTS` にコード化しており、シナリオ文は対応する `index.mdx` の `description` から自動抽出します。詳細は下記「代表シナリオの選定ルール」を参照してください。
- ルータースキルにのみ `paths: ["**/*.tsx", "**/*.jsx"]` を付与します。個別スキルには付与しません（M5 Phase 3 §8 で決定）。
- サブコンポーネント（`Controlled*` 派生、Table 系内部部品、Dialog/ErrorScreen/Picker 配下のカテゴリメンバーなど）は親 mdx の `relatedComponents` 宣言で接続し、本文・checklist を継承します。`description` のみ派生先固有の文を採用します。smarthr-ui の親ディレクトリ単位グループから `relatedComponents` 宣言済みの displayName を自動分離し、個別 SKILL を生成します（`scripts/generate-skills/mapping/group-split.json` の旧手動マッピングは廃止）。
- スクリプトの詳細仕様は Notion の「M1: SKILL.md 自動生成スクリプト 入出力仕様書」と「M4 プラグイン設計調査」を参照してください。

## 代表シナリオの選定ルール

`component-selector` の frontmatter `description` 末尾に並べる代表シナリオ 5 件は、`lib/render-router-skill.ts` の `REPRESENTATIVE_COMPONENTS` にコンポーネント名のみを列挙し、シナリオ文は対応する `index.mdx` の `description` から自動抽出します（末尾の「〜ときに使います。」を「〜とき」に変換）。文の手書き管理は行いません。

### 選定基準

1. **件数は 5 件で固定**: M4-S8 で 34 件全列挙（パターン A）と 5 件抜粋（パターン C）を比較した結果、5 件で発火率が頭打ちになり、増やすと frontmatter 字数（Agent Skills 仕様上 1500 字程度が実用上限）を圧迫するだけで効果が薄いことが確認されました。
2. **使用頻度（import 数）の高いコンポーネントを優先**: [`kufu/smarthr-ui-stats`](https://github.com/kufu/smarthr-ui-stats) の集計を客観指標とします。M6（全件 checklist.yaml 一斉生成）の着手順序と同じデータソースです。
3. **smarthr-ui の主要カテゴリを 1 件ずつカバー**: 上位を機械的に採用するとレイアウト系（Text / Stack / Cluster 等）に偏り、AI クエリ語彙性（「ボタン」「ダイアログ」のような自然語）が弱まるため、カテゴリ網羅を併用します。現行 5 件は次のように対応します。
   - 操作: `Button`
   - 入力: `Input`
   - データ表示: `Table`
   - オーバーレイ: `ActionDialog`
   - 遷移: `TextLink`
4. **AI クエリ語彙性**: 「ボタン」「テーブル」「ダイアログ」「リンク」など、AI への問い合わせで自然語として登場しやすいコンポーネントを選びます。
5. **非推奨・サブコンポーネントは含めない**: `deprecated:true` のコンポーネントや `relatedComponents` で親に紐づくサブコンポーネント（`Controlled*` 派生、Table 系内部部品、Dialog/ErrorScreen/Picker 配下のカテゴリメンバーなど）は代表として不適切なため除外します。

### 差し替えの判断基準

次のいずれかに該当する場合に `REPRESENTATIVE_COMPONENTS` を見直します。

- 5 件のうちいずれかが smarthr-ui から削除・非推奨化された
- `kufu/smarthr-ui-stats` の更新でカテゴリ内の代表順位が大きく入れ替わった
- 利用ログや M4-S8 系の検証で発火率の改善余地が確認された
- 主要カテゴリの構成が変わった（例: 新カテゴリ追加で代表が必要になった）

差し替え時は M4-S8 のテストクエリ（および後続の Q16–Q20）を回し、発火率回帰がないことを確認してから反映してください。
