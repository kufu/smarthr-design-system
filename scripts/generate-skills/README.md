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

- `plugins/smarthr-design-system/skills/components/<kebab-name>/SKILL.md`（89 個）
- `plugins/smarthr-design-system/skills/component-selector/SKILL.md`（ルータースキル）

## 入力ソース

| Layer | ソース | 取得方法 |
| --- | --- | --- |
| 1 (Props) | `smarthr-ui/metadata.json` | npm パッケージ同梱、直接 import |
| 2 (eslint) | `kufu/tamatebako` の `packages/eslint-plugin-smarthr/rules/*/README.md` | GitHub API 経由で取得し `.cache/eslint-rules.json` にキャッシュ |
| 3 (checklist) | `src/content/articles/products/components/**/checklist.yaml` | 同リポジトリ内、直接読み込み |

Layer 2 のキャッシュ更新は `.cache/eslint-rules.json` を削除して再実行。GitHub API のレートリミット回避のため、`GITHUB_TOKEN` 環境変数を設定すると認証付きでリクエストされます。

## 環境変数

| 変数 | デフォルト | 用途 |
| --- | --- | --- |
| `GITHUB_TOKEN` | なし | GitHub API 認証（レートリミット緩和） |
| `OUTPUT_DIR` | `<repoRoot>/plugins/smarthr-design-system/skills` | 出力先 |
| `DESIGN_SYSTEM_DIR` | `<repoRoot>/src/content/articles/products/components` | Layer 3 入力 |

## 設計

- 整備済み（`checklist.yaml` がある）コンポーネントは Layer 1+2+3 の完全版を、それ以外は Layer 1+2 のみの簡易版を生成します。
- 出力 SKILL.md の冒頭には Agent Skills 規格準拠の YAML frontmatter（`name` / `description` / `metadata`）を付けます。
- スクリプトの詳細仕様は Notion の「M1: SKILL.md 自動生成スクリプト 入出力仕様書」と「M4 プラグイン設計調査」を参照してください。
