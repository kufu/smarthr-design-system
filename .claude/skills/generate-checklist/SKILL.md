---
description: >-
  smarthr-design-system のコンポーネント mdx から checklist.yaml を生成・更新する。
  「checklist を作って」「checklist.yaml を生成して」「Layer 3 を整備して」等の
  依頼に対応する。対象コンポーネントの index.mdx を読み、使い分けガイドを
  YAML 形式で抽出し、pnpm generate で SKILL.md に反映する。
globs:
  - "src/content/articles/products/components/**/index.mdx"
  - "src/content/articles/products/components/**/checklist.yaml"
---

# checklist.yaml 生成 SKILL

## このスキルについて

smarthr-design-system のコンポーネントページ（index.mdx）から、AI エージェント向けの使い分けガイド（checklist.yaml）を生成する手順書。

生成した checklist.yaml は `pnpm generate` で SKILL.md に Layer 3 として取り込まれ、エンジニアが smarthr-ui コンポーネントを正しく使うためのガイドになる。

## 前提条件

- リポジトリ: `kufu/smarthr-design-system`
- ブランチ: `feature/ai-agent-skills` から作業ブランチを切る
- 抽出ルール詳細: `.github/prompts/checklist-v3.md`（severity 推測の語気手がかり、Do/Don't 変換の具体例等）
- ディレクトリ名解決: `scripts/generate-skills/mapping/component-dir-map.json`

## 生成フロー

### Step 1: 対象コンポーネントの index.mdx を読む

パスの解決:
- `component-dir-map.json` でコンポーネント名 → ディレクトリ名を確認
- 基本パス: `src/content/articles/products/components/<dir>/index.mdx`
- ネストあり: `dialog/message-dialog/`, `dialog/modeless-dialog/`, `combobox/single-combobox/` 等

sub-mdx がある場合（index.mdx 内で import されている .mdx）はそれも読む。

### Step 2: FIX-10 判定（スキップ判定）

index.mdx を読んだ後、**ルール候補が 0〜1 件しかない場合は checklist.yaml を作らずスキップ**する。

スキップになりやすいパターン:
- **Every Layout 外部委譲**: Stack / Cluster / Center / Sidebar / Reel 等。機能説明のみで指示文がない
- **索引のみの親ページ**: Combobox 親、Dropdown 親。子コンポーネントへのリンク集のみ
- **機能説明のみ**: SectioningContent 等。「〜できます」の記述はあるが Do/Don't がない

スキップ時は理由を報告して次へ進む。

### Step 3: checklist.yaml をドラフト生成

`.github/prompts/checklist-v3.md` のルールに従い生成する。以下は運用で確立した追加ルール:

#### 絶対ルール

1. **ハルシネーション禁止**: mdx に書かれていない知識は使わない。リンク先も辿らない
2. **「冒頭」見出しの記述は含めない**: 記事先頭の見出しなし文は description と重複する
3. **layer2_candidate 付き項目は checklist.yaml に入れない**: `render-skill.ts` は layer2_candidate フィールドを参照せず全項目を SKILL.md に出力するため、Layer 2（eslint ルール自動取込）と重複する。eslint ルールでカバーされる項目は除外し、コミットメッセージで「Layer 2 でカバー済み」と記録するだけでよい

#### 文体・表現ルール

4. **severity は提案**: must / should / avoid は元資料の語気から推測。人間レビューで確定
5. **「使用を推奨します」→「検討してよい」**: 原文の推奨表現をそのまま text にすると強い指示に誤読される
6. **text からパターン名を除去**: source_section が SKILL.md の見出しになるため、text 内に「パターン A」等を含めると重複する

#### 構造ルール

7. **同見出し下の avoid + 代替ペアは 1 項に統合**: 「使わない」と「代わりに〜を使う」が同じ見出し下にある場合、1 つの項目にまとめる
8. **同見出し下の関連ルール群は sub_items で階層化**: 親ルール + sub_items の構造にすると読みやすい
9. **sub-mdx は source_section に `via xxx.mdx` 表記**: index.mdx から import される sub-mdx 由来の項目は出典を明示
10. **WIP モバイルルール**: smarthr-ui 未実装だが mdx に記載されているルールは `note: "smarthr-ui未実装（モバイル対応時に有効化）"` 付きで残す

#### 親ページの扱い

11. **索引のみの親ページ → FIX-10 スキップ**: Combobox 親、Dropdown 親
12. **子への使い分けガイドがある親ページ → 生成する**: Dialog 親（Action/Form/Message/Modeless/StepForm の使い分け）、ErrorScreen 親（子5種の使い分け）

### Step 4: 人間レビュー

生成結果を見せて確認を取る。**自動で次のコンポーネントに進まない。**

よくあるレビュー指摘:
- 重複ルールの削除（同義ルールが複数見出しに登場）
- severity の調整（must ↔ should）
- sub_items への統合
- 不要項目の削除（description と重複、Layer 2 と重複）

### Step 5: バリデーション

```bash
# YAML 構文チェック
python3 -c "import yaml; yaml.safe_load(open('path/to/checklist.yaml')); print('OK')"

# 項目数カウント
grep -c "^- severity:" path/to/checklist.yaml
```

期待範囲: 2〜20 項目。極端に多い（20 超）場合は統合の余地あり。

### Step 6: SKILL.md 再生成

```bash
pnpm generate
```

Layer 3 あり件数が増えていることを確認。

### Step 7: コミットと PR

```bash
git add src/content/articles/products/components/**/checklist.yaml
git commit -m "feat(m6-sN): <区分> checklist.yaml 生成

Session N: <コンポーネント名一覧>

Co-Authored-By: Claude <noreply@anthropic.com>"

git add plugins/smarthr-design-system/skills/
git commit -m "chore(m6-sN): SKILL.md 再生成"

git push origin feature/m6-sessionN
```

PR 作成:
- **Draft PR** で作成
- **base**: `feature/ai-agent-skills`
- **概要**: `.github/PULL_REQUEST_TEMPLATE.md` を読み、そのフォーマットに従って記述
- pre-commit hook が rate limit でエラーになる場合は `--no-verify` で回避可（SKILL.md は自動生成物のためリスク低い）

## checklist.yaml のフォーマット

```yaml
items:
  # カテゴリ名（mdx の見出し構造から決定）
  - severity: must | should | avoid
    text: "Do/Don't 形・終止形の1行要約"
    source_section: "元 mdx の見出しパス（h2 > h3 > h4）"
    sub_items:
      - "関連する補足ルール1"
      - "関連する補足ルール2"
    note: "補足情報（WIP モバイル等）"
```

フィールド順: severity → text → source_section → sub_items → note
null フィールドは省略（sub_items / note がない場合は書かない）

## 参考例: Button の checklist.yaml

以下は整備済みの Button の checklist.yaml（27 項目）。形式・粒度・文体はこれに合わせる。

```yaml
items:
  # 使用上の注意 > type="button" について
  - severity: must
    text: "form submit を使う場合は `type=\"submit\"` を明記する"
    source_section: "使用上の注意 > type=\"button\" について"
  
  # 種類 > Primary
  - severity: must
    text: "1 つの画面で Primary ボタンは最大 1 つまでにする"
    source_section: "種類 > Primary"
    sub_items:
      - "主要な操作が複数ある場合は、画面内の主要な操作が 1 つになるように情報設計と画面構成を見直す"
  
  - severity: avoid
    text: "ユーザーからの注目（視線）を集めることだけを目的に Primary ボタンを使用しない"
    source_section: "種類 > Primary"
  
  # 種類 > Secondary
  - severity: should
    text: "Secondary ボタンが多い場合は情報設計・画面構成の見直しや DropdownMenuButton の利用を検討する"
    source_section: "種類 > Secondary"
    note: "多すぎる の定義不在。除外検討"
  
  # 種類 > Tertiary
  - severity: should
    text: "Tertiary ボタンは Secondary ボタンより重要度の低い操作に使う"
    source_section: "種類 > Tertiary"
  
  - severity: must
    text: "他の画面へ移動するリンクとして使いたい場合は TextLink を使う"
    source_section: "種類 > Tertiary"
  
  # 種類 > Danger
  - severity: should
    text: "Danger ボタンは主に削除ダイアログで使用する"
    source_section: "種類 > Danger"
  
  - severity: should
    text: "警告色（DANGER）に頼らず、ボタン配置のコンテキストやラベルテキストだけでもユーザーに伝わるよう検討する"
    source_section: "種類 > Danger"
  
  # 種類 > Text
  - severity: should
    text: "Text ボタンは Secondary ボタンの装飾（枠線）が過剰な場合に使う"
    source_section: "種類 > Text"
    sub_items:
      - "コンポーネントに内包する場合（例: DropdownMenuButton）"
      - "多くのボタンを並べて表示する場合"
  
  - severity: must
    text: "Text ボタンを単独で使う場合は prefix または suffix にアイコンを設定する"
    source_section: "種類 > Text"
  
  # 種類 > AnchorButton
  - severity: must
    text: "アクションボタンとして表現したい場合は Button を使用する"
    source_section: "種類 > AnchorButton"
  
  # レイアウト > ボタンサイズ
  - severity: should
    text: "レイアウトの都合上スペースを節約したいときはサイズ `小` を使う"
    source_section: "レイアウト > ボタンサイズ"
  
  # レイアウト > アイコンの有無 > アイコン付きボタン
  - severity: should
    text: "アイコン付き（左）はボタンを押したときに実行される操作を想起させるために使用する"
    source_section: "レイアウト > アイコンの有無 > アイコン付きボタン"
  
  - severity: must
    text: "同じ操作のボタンには同じアイコンを指定する"
    source_section: "レイアウト > アイコンの有無 > アイコン付きボタン"
  
  - severity: should
    text: "アイコン付き（右）はボタンを押したときに特定の UI が表示される場合に使用する"
    source_section: "レイアウト > アイコンの有無 > アイコン付きボタン"
  
  # レイアウト > アイコンの有無 > アイコン付きボタン > `アイコン付き`にする判断基準
  - severity: must
    text: "アイコンは左右どちらかにのみ指定する"
    source_section: "レイアウト > アイコンの有無 > アイコン付きボタン > `アイコン付き`にする判断基準"
    sub_items:
      - "どちらにもアイコンをつけられそうな場合は、アイコン付き（右）（サフィックス）を優先し、アイコン付き（左）（プレフィックス）には指定しない"
  
  # レイアウト > アイコンの有無 > アイコン付きボタン > `アイコン付き（左）`（プレフィックス）の判断基準
  - severity: should
    text: "SmartHR 上で頻出する操作に関してはアイコンをつけるのを推奨する"
    source_section: "レイアウト > アイコンの有無 > アイコン付きボタン > `アイコン付き（左）`（プレフィックス）の判断基準"
    note: "頻出する の定義不在。除外検討"
  
  - severity: avoid
    text: "明確な必要性や理由がなければ、アイコンをつけることは極力避ける"
    source_section: "レイアウト > アイコンの有無 > アイコン付きボタン > `アイコン付き（左）`（プレフィックス）の判断基準"
    note: "明確な必要性 の定義不在。除外検討"
  
  # レイアウト > アイコンの有無 > アイコンボタン
  - severity: should
    text: "アイコンのみのボタンは、ラベルテキストを表示するレイアウト上の余裕がない場合に使う"
    source_section: "レイアウト > アイコンの有無 > アイコンボタン"
  
  - severity: must
    text: "アイコンには必ず代替テキストを含める"
    source_section: "レイアウト > アイコンの有無 > アイコンボタン"
  
  # 状態 > 無効（disabled）
  - severity: avoid
    text: "無効状態のボタンはできるだけ使わない"
    source_section: "状態 > 無効（disabled）"
    sub_items:
      - "そもそも無効ではなくボタン自体を非表示にしたり、無効状態の理由を付近に表示することを検討する"
      - "無効状態の理由を配置するスペースがどうしてもない場合、`disabledReason` props で理由を表示することを検討する"
  
  # ライティング
  - severity: must
    text: "ボタンラベルには動詞の終止形を使用する"
    source_section: "ライティング"
  
  # モバイル > ボタンの大きさ > 通常サイズのボタンを使う
  - severity: should
    text: "モバイルでは基本的に `通常` サイズを使用する"
    source_section: "モバイル > ボタンの大きさ > 通常サイズのボタンを使う"
  
  - severity: avoid
    text: "モバイルで `サイズ小` のボタンを使うことは避ける"
    source_section: "モバイル > ボタンの大きさ > 通常サイズのボタンを使う"
  
  - severity: must
    text: "レイアウトの都合上 `サイズ小` のボタンにする必要がある場合、間隔を十分にあける"
    source_section: "モバイル > ボタンの大きさ > 通常サイズのボタンを使う"
    sub_items:
      - "その場合、アイコンボタンとして使うことはなるべく避ける"
  
  # モバイル > 複数のボタンの並べ方 > ボタンを並べる方向
  - severity: should
    text: "複数のボタンは基本的に垂直方向に並べる"
    source_section: "モバイル > 複数のボタンの並べ方 > ボタンを並べる方向"
  
  # モバイル > 複数のボタンの並べ方 > ボタンを並べる順番
  - severity: must
    text: "複数の操作を並べる場合は Primary ボタンの位置を一貫させる"
    source_section: "モバイル > 複数のボタンの並べ方 > ボタンを並べる順番"
    sub_items:
      - "水平方向に並べる場合は、識字方向の後方に Primary ボタンが来るようにレイアウトする（LTR では右側）"
      - "垂直方向に並べる場合は、Primary ボタンの下に Secondary ボタンを置く"
```

## よくある判断パターン

| パターン | 判断 |
|---------|------|
| Every Layout 委譲（Stack/Cluster/Center/Sidebar/Reel） | FIX-10 スキップ |
| 索引のみの親ページ（Combobox/Dropdown） | FIX-10 スキップ |
| 子への使い分けガイドがある親ページ（Dialog/ErrorScreen） | 生成する |
| eslint ルールでカバーされる項目 | checklist.yaml に含めない |
| WIP モバイルルール | note 付きで残す |
| 同見出し下の avoid + 代替 | 1 項に統合 |
| description と重複する冒頭記述 | 含めない |
| sub-mdx import がある | 読み込んで source_section に via 表記 |
| text にパターン名が含まれる | source_section と重複するため除去 |
