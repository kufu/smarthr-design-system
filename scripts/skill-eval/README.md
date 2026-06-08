# sds-skill-eval — M8 Skill実効性ベンチ（最小ハーネス）

`component-guidelines`（Progressive Disclosure 構成）の Layer 3 コンテンツが、AI エージェントの
smarthr-ui 実装品質を実際に上げているかを `with_skill` / `without_skill` で定量比較するハーネス。

設計の出典: Notion「M8 組織全体共有の前準備」Phase 1（2026-06-08 確定）。

## 方式（Notion Phase 1 の確定設計）

- **コンテンツ単離（オラクル注入）**: テストプロンプトごとに「正解コンポーネントのガイド doc」を
  context に入れる/入れないを比較。ルーティングのノイズを排除し Layer 3 の実効性だけを測る。
  - 直球 4 件 = 正解 doc を単一注入
  - 境界 8 件 = 競合候補 doc + `component-selector.md` を候補セット注入
- **共通ベースライン**: 両条件に「smarthr-ui を使うプロジェクト」文脈を共通付与。差は **ガイド doc の有無のみ**。
- **採点 二層**:
  1. 機械チェック（最小ハードゲート = パース可能 + smarthr-ui import）→ 通過分のみ Judge へ
  2. 減点シグナル = eslint(smarthr/\*) 違反数 / props 照合（metadata.json）/ 独自 native HTML 検出
  3. LLM-as-Judge = 4 観点（Outcome / Process / Style / Efficiency）× 5 点リッカート
- **反復**: 各（プロンプト × 条件）N=5 生成・中央値集計。
- **不合格ライン**: 観点別・効果量ベース。4 観点いずれかで with が without を下回ったらフラグ
  （p 値検定は Stage 2 全件ベンチで追加）。

## 実行

```sh
cd scripts/skill-eval

# 配線の検証（API を叩かない。オラクル doc 解決と context 組み立てを確認）
pnpm eval:dry

# 本実行（要 ANTHROPIC_API_KEY）
ANTHROPIC_API_KEY=sk-ant-... pnpm eval

# 一部プロンプトだけ / イテレーション番号指定 / 同時実行数
pnpm eval -- --only d1-primary-button,b3-delete-confirm-dialog --iteration 2 --concurrency 4
```

### 環境変数

| 変数 | 既定 | 説明 |
|---|---|---|
| `ANTHROPIC_API_KEY` | （必須） | 生成・Judge 用 |
| `ANTHROPIC_BASE_URL` | – | 設定時は SDK が自動参照 |
| `SKILL_EVAL_GEN_MODEL` | `claude-sonnet-4-6` | 生成モデル（with/without 同一） |
| `SKILL_EVAL_JUDGE_MODEL` | `claude-opus-4-8` | Judge モデル（上位モデル） |
| `SKILL_EVAL_N` | `5` | 反復回数 |

## 出力（agentskills.io 標準の `iteration-N/eval-*/with_skill` 構造を参考）

```
workspace/
└── iteration-1/
    ├── eval-d1-primary-button/
    │   ├── with_skill/
    │   │   ├── user-message.txt      # 実際にモデルへ送った context
    │   │   └── rep-1/ … rep-5/
    │   │       ├── raw.txt            # モデル生出力
    │   │       ├── generation.tsx     # 抽出したコード
    │   │       ├── machine.json       # 機械チェック結果
    │   │       └── judge.json         # Judge 採点（ゲート通過時のみ）
    │   ├── without_skill/ …
    │   └── result.json                # この eval の with/without 集計
    ├── summary.json                   # iteration 全体の集計
    └── summary.md                     # 人が読むサマリ（要修正フラグ一覧含む）
```

`workspace/` は `.gitignore` 済み（成果物はコミットしない。共有は Notion へ転記）。

## 層2: 静的監査（`audit/`・全104件・LLM不使用・決定的）

各ガイド doc（`components/<PascalCase>.md`）の中身が単一ソースと整合しているかを全件検査する。
生成パイプライン（`scripts/generate-skills`）のライブラリを流用し、生成器の出力を忠実に再現して突き合わせる。

```sh
cd scripts/skill-eval
pnpm audit                 # 全104件
pnpm audit -- --only Button,DatePicker
```

出力: `audit/output/audit-summary.md`（要修正フラグ + 指摘詳細）と `findings.json`（`.gitignore` 済み）。

### チェック4種

| # | チェック | 単一ソース | 主な検出 |
|---|---|---|---|
| 1 | metadata.json照合 | `smarthr-ui/metadata.json` | 存在しないprops / 型不一致 / 必須フラグ不一致 / 取りこぼし / デフォルト値差異 |
| 2 | 非推奨参照検出 | index.mdx + metadata.json | 非推奨なのにバナー無し / 非推奨コンポーネントの言及 / ソース間不一致 |
| 3 | mdx整合 | コンポーネント index.mdx | タイトル不一致 / 説明文が生成結果と乖離 |
| 4 | 構造lint | テンプレ（render-skill） | 必須セクション欠落 / 並び順 / import不正 / checklist未反映 |

### 重大度区分（Phase 4 で確定する叩き台）

- **error（hard）**: 単一ソースに対する事実誤り。エージェントを誤誘導しうる。
  存在しないprops記載 / 型・必須の不一致 / 「固有Propsなし」だが実際はある / 必須セクション欠落 /
  非推奨なのにバナー無し / 説明文が空。
- **warning**: 陳腐化・取りこぼし・ソース間不整合。要再生成・要確認。
  metadataにあるがガイドに無いprops / デフォルト値差異 / 説明文の生成結果との不一致 /
  非推奨ステータスのmdx↔metadata食い違い / 非推奨コンポーネントの言及 / セクション並び順 / checklist未反映。
- **info**: 参考。監査不能・未整備。
  対応index.mdx無し（派生コンポーネント）/ metadata非公開のimport名 / props説明文中の非推奨ヒント /
  checklist.yaml無しだが本文あり。

### 非推奨ステータスの取得元（調査結果と方針案）

- **コンポーネント単位の非推奨は2ソースに存在**:
  - index.mdx frontmatter `deprecated: true` / `deprecatedMessage` ← **生成器が ⚠️ バナーをレンダリングする canonical ソース**
  - metadata.json `tags.deprecated`（文字列）← 6コンポーネントのみ保持。mdx 側より少ない
  - → **方針案**: ガイドの非推奨表示は **index.mdx を正** とし、metadata との食い違いは warning で報告（実際 AppLauncher で検出）。
- **props 単位の非推奨は機械可読フィールドが metadata に無い**（`tags.deprecated` を持つ prop はゼロ）。
  → props説明文の「非推奨」キーワードを info で拾うのみ（誤検出ありうるため要確認扱い）。

## ファイル構成

- `config.ts` — パス・モデル・反復数
- `prompts.ts` — テストプロンプト 12 件（直球 4 + 境界 8）と正解/候補定義
- `lib/context.ts` — 共通プロジェクト文脈 + オラクル注入の組み立て
- `lib/generate.ts` / `lib/anthropic.ts` — 生成（API 直叩き）
- `lib/machine-check.ts` / `lib/eslint-runner.ts` / `lib/metadata.ts` — 機械チェック
- `lib/judge.ts` — LLM-as-Judge
- `lib/aggregate.ts` / `lib/stats.ts` / `lib/report.ts` — 集計・回帰抽出・サマリ生成
- `run.ts` — オーケストレータ（層1）
- `audit/run-audit.ts` — 静的監査オーケストレータ（層2）
- `audit/lib/sources.ts` — 単一ソース読み込み（metadata flat map / 非推奨registry / dirMapping / index.mdx / checklist存在）。generate-skills のライブラリを流用
- `audit/lib/guide-parser.ts` — ガイド `.md` の構造化パース
- `audit/lib/checks.ts` — チェック4種
- `audit/lib/finding.ts` / `audit/lib/audit-report.ts` — finding 型・重大度・レポート生成
