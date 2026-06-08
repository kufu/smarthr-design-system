---
description: >-
  smarthr-design-system のコンポーネント mdx の変更に応じて、既存の
  checklist.yaml を差分更新する。「checklist を更新して」「checklist.yaml を
  更新して」「index.mdx の変更を checklist に反映して」等の依頼に対応する。
  対象の index.mdx と既存 checklist.yaml を読み、差分のみを既存 items に
  マージする。
globs:
  - "src/content/articles/products/components/**/index.mdx"
  - "src/content/articles/products/components/**/checklist.yaml"
---

# checklist.yaml 差分更新 SKILL

## このスキルについて

`index.mdx` の変更に応じて、既存の `checklist.yaml` を差分更新する手順書。新規生成（`generate-checklist` SKILL）と異なり、人間レビューで確定済みの項目（severity・text・sub_items・note）を保護しつつ、変更が必要な項目のみを更新する。

## 関連プロンプト・SKILL の役割分担

- **`.github/prompts/generate-checklist.md`**: ルール抽出方法の詳細仕様（抽出対象・除外パターン・見出し処理・sub_items 判別・severity 推測・Do/Don't 変換）。新規項目の抽出はこのプロンプトを参照する。
- **`.github/prompts/update-checklist.md`**: 既存 checklist.yaml と再抽出結果の突き合わせ・差分マージ方法に専念。Layer 2 除外方針も含む。
- **本 SKILL**: スキップ判定・親ページの扱い・severity 横串確認・Layer 1 重複チェック・文体パターン等の **運用判断** を担う。

## 前提条件

- 既存 `checklist.yaml` の確認: `src/content/articles/products/components/<dir>/checklist.yaml`
- ディレクトリ名解決: `src/content/articles/products/components/` 配下を直接探索する（コンポーネント名を kebab-case 化したディレクトリ名。ネストする場合あり）
- 参考例: `src/content/articles/products/components/button/checklist.yaml`

## 更新フロー

### Step 1: 対象を特定

依頼文から対象コンポーネントを抽出。複数指定可。コンポーネント名 → ディレクトリ名の解決は `src/content/articles/products/components/` 配下を `find` / glob で探索する（コンポーネント名を kebab-case 化したディレクトリ名。ネストする場合あり）。

### Step 2: 入力を読み込む

各対象について以下を読む。

- 変更後の `index.mdx`
- `index.mdx` から import されている `.mdx`（`_components/*.mdx` 等）
- 既存の `checklist.yaml`（更新前の確定版）
- eslint ルール名一覧: `.github/data/eslint-rule-names.txt`

### Step 3: スキップ判定（更新後の index.mdx で再評価）

`index.mdx` の変更内容によっては、既存 checklist.yaml ごと不要になる場合がある。以下のパターンに該当するか再評価する。

スキップになりやすいパターン:

- **Every Layout 外部委譲**: Stack / Cluster / Center / Sidebar / Reel 等。機能説明のみで指示文がない
- **索引のみの親ページ**: Combobox 親、Dropdown 親。子コンポーネントへのリンク集のみ
- **機能説明のみ**: SectioningContent 等。「〜できます」の記述はあるが Do/Don't がない
- **自動挙動・props 規約のみ**: AppHeader 等。「props を渡すと自動で〜になる」「props に入れる内容のフォーマット規約」のみ
- **deprecated 指定**: frontmatter に `deprecated: true` がセットされているコンポーネントは `deprecatedMessage` で代替を示すため checklist.yaml 不要 (例: AppLauncher)
- **description で十分カバーされる内容**: 「〜の場合に使う」「〜の場合は使わない」が description と重複している場合 (例: Header / Calendar / LanguageSwitcher / Disclosure)
- **mdx 冒頭の見出しなし説明文に規定が含まれ Layer 1 でカバーされる場合**: 冒頭文がそのまま Layer 1 として SKILL.md に取り込まれるため、Layer 3 に入れると重複する

スキップ判定の例外（1 項目でも残すべきケース）:

- **a11y 必須ルール**: アクセシブルな名前付与・代替テキスト等 (例: Badge のドット表示時のアクセシブル名)
- **レイアウト判断ルール**: 他コンポーネントとの組み合わせ判断 (例: SpreadsheetTable の Reel 組み合わせ)

スキップが妥当と判断したら、既存項目をすべて削除する旨を報告して更新を打ち切る。

### Step 4: 差分マージ案を作成

`.github/prompts/update-checklist.md` のステップ 0〜4 に従う。要点:

- **既存項目は極力維持**: severity・text・sub_items・note を上書きしない
- **変更が必要な項目のみ更新**: index.mdx の変更に影響を受ける項目を特定
- **新規項目は severity を提案**: 既存項目の severity パターンを参照して整合性を取る
- **削除が必要な項目を明示**: index.mdx から削除された記述に対応する項目は削除
- **Layer 2 でカバー済みの項目は除外**: eslint ルール名と意味的に一致するものは出力に含めない
- **ハルシネーション禁止**: mdx に書かれていない知識は使わない。リンク先も辿らない

### Step 5: 運用観点のセルフレビュー

差分マージ案を出力する前に、運用観点で精査する。

#### 5-1. 各新規項目の精査

新規項目に対して以下を自問する。Yes が出たら削除候補としてマークする。

- これは smarthr-ui の自動挙動の説明か？（props を渡すと自動で〜になる、等）
- これは props 規約のフォーマット指定のみか？（実装者の判断材料を含まないか）
- description で同等内容が既に言及されているか？

#### 5-2. severity 横串確認

新規項目および severity 提案を含む項目について、特徴的な表現（「モーダルに表示します」「を使わない」等）を、既存の checklist.yaml で検索する。

```bash
grep -r "<特徴的な表現>" src/content/articles/products/components/**/checklist.yaml
```

同じ表現に異なる severity が当たっていれば整合性を取る（例: 「モーダルに表示します」は FilterDropdown も SortDropdown も must）。

#### 5-3. 文体パターンの検知

新規項目・更新項目に対して以下を確認する。

- 「適していません」「不適切」等の否定的事実記述に must が当たっていないか → avoid に変更検討
- 「〜を推奨します」「〜が望ましい」を text にそのまま入れていないか → 「検討してよい」表現に変更
- text にパターン名（「パターン A」等）が含まれていないか → source_section と重複するため除去
- 同見出し下の avoid + 代替ペアが分離していないか → 1 項に統合
- sub-mdx 由来の項目に `via xxx.mdx` 表記があるか
- WIP モバイルルールに `note: "smarthr-ui未実装（モバイル対応時に有効化）"` が付いているか

### Step 6: 変更内容をレポート

人間レビューに渡す前に、以下を明示する。

- 追加項目（severity 提案理由を併記）
- 削除項目（削除理由として該当 mdx 記述の削除箇所を併記）
- 更新項目（変更前 → 変更後の diff、変更理由）
- Layer 2 でカバー済みのため除外した項目（該当 eslint ルール名を併記）
- 無変更で維持した項目数

### Step 7: バリデーション

```sh
pnpm --filter ./scripts/generate-skills validate
```

`error` がないことを確認。`warn` は内容に応じて対応。

### Step 8: SKILL.md 再生成

```sh
pnpm --filter ./scripts/generate-skills generate
```

`plugins/smarthr-design-system/skills/<component>/SKILL.md` に Layer 3 が反映されることを確認。

### Step 9: Layer 1 重複チェック

生成された SKILL.md の Layer 1 部分（mdx 冒頭の説明文）を読み、checklist.yaml の各項目と同内容が含まれていないか確認する。

```bash
cat plugins/smarthr-design-system/skills/<component>/SKILL.md
```

mdx 本文が短く「冒頭説明 + props」構造のコンポーネント（ErrorScreen 子等）では、mdx 冒頭の見出しなし説明文がそのまま Layer 1 として SKILL.md に取り込まれることが多い。その場合、Layer 3 で同内容を含めると重複出力されるため、checklist.yaml の該当項目を削除し、Step 8 を再実行する。

## やってはいけないこと

- 既存項目を「より良い表現」に書き換える（人間レビュー済みの確定値）
- mdx 差分外の既存項目に手を入れる
- 元資料にないルールを創作する
- リンク先（外部 URL や別 mdx）を辿って情報を取り込む
- フィールド順を変える（`severity → text → source_section → sub_items → note` を維持）
- Layer 2 でカバーされる項目を `note` 付きで出力に残す（generate-checklist と方針統一）

## よくある判断パターン

| パターン | 判断 |
|---------|------|
| Every Layout 委譲（Stack/Cluster/Center/Sidebar/Reel） | スキップ |
| 索引のみの親ページ（Combobox/Dropdown） | スキップ |
| 自動挙動・props 規約のみ（AppHeader 等） | スキップ |
| deprecated 指定のコンポーネント（AppLauncher 等） | スキップ |
| description と内容が重複する記述しかない | スキップ |
| mdx 冒頭の見出しなし説明文に規定が含まれる（Layer 1 でカバー） | スキップ |
| 子への使い分けガイドがある親ページ（Dialog/ErrorScreen） | 更新する |
| a11y 必須ルール / レイアウト判断ルール | 1 項目でも残す |
| eslint ルールでカバーされる項目 | 除外（コミットメッセージに記録） |
| WIP モバイルルール | note 付きで残す |
| 同見出し下の avoid + 代替 | 1 項に統合 |
| sub-mdx import がある | 読み込んで source_section に via 表記 |
| text にパターン名が含まれる | source_section と重複するため除去 |
| 「適していません」「不適切」等の否定的事実 | severity avoid 推奨 |
| 同じ表現の severity | 他コンポーネントと整合性を取る |
