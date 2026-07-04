# smarthr-design-system: checklist.yaml 差分更新プロンプト

あなたは SmartHR Design System のコンポーネントページ（index.mdx）の変更に応じて、既存の checklist.yaml を差分更新する作業者です。

このプロンプトは **既存 checklist.yaml と再抽出結果の突き合わせ・差分マージ方法** に専念します。

- **ルール抽出方法**（どの記述を拾うか・除外するか、見出し処理、severity 推測、Do/Don't 変換、sub_items 判別など）は `.github/prompts/generate-checklist.md` を参照する。新規項目はそちらのステップに従って抽出する。
- **スキップ判定・Layer 2 取扱い・親ページの扱い・severity 横串確認・Layer 1 重複等の運用判断** は `.claude/skills/update-checklist/SKILL.md` を参照する。

## 差分更新の原則

1. **既存項目は極力維持する**: 人間レビューで確定済みの severity・text・sub_items・note を上書きしない
2. **変更が必要な項目のみ更新する**: index.mdx の変更に影響を受ける項目を特定し、その項目だけを更新する
3. **新規項目には severity を提案する**: 既存項目の severity パターンをコンテキストとして参照し、整合性のある提案をする
4. **削除が必要な項目を明示する**: index.mdx から削除された記述に対応する checklist 項目は、削除する

## 絶対に守る原則

1. **元資料にないものは生成しない**。あなたの仕事はテキストの整形・分類・対応付け・文体変換に限る。
2. **リンク先を辿らない**。入力として与えられた本文のみから抽出する。
3. **コード例を創作しない**。原文に存在するコード例のみ参照可能。
4. **内部 MDX は「リンク」ではない**。入力に含まれる `import X from '...'` の参照先は展開して入力されている前提で処理する。

## 入力

### 主入力

- 対象コンポーネントの `index.mdx` 本文（**変更後**の最新版）

### 補助入力

- `index.mdx` に `import` されている外部 MDX の本文（`.mdx` 拡張子のもののみ）
  - 各 MDX にはファイルパス（例: `_components/MultipleModalWarning.mdx`）をラベルとして付与する
  - 親 index.mdx に配置されている位置情報も含める

### 既存の checklist.yaml

- 対象コンポーネントの現在の `checklist.yaml`（**更新前**の確定版）

### 参照情報

- eslint-plugin-smarthr のルール名一覧（`.github/data/eslint-rule-names.txt`）

## やる作業

### ステップ 0: 既存 checklist.yaml を読み込み、項目一覧を把握する

既存 checklist.yaml のすべての項目を読み込み、以下を把握する：

- 各項目の `text`（ルール本文）
- 各項目の `source_section`（元資料の見出し）
- 各項目の `severity`・`sub_items`・`note`

この一覧が「確定済みベースライン」となる。

### ステップ 1: 変更後 index.mdx からルール候補を再抽出する

`.github/prompts/generate-checklist.md` のステップ 1〜6 に従って、変更後の `index.mdx` 全体からルール候補を抽出する。抽出対象・除外パターン・見出し処理・sub_items 判別・severity 推測・Do/Don't 変換は **すべて generate-checklist.md と同じロジック** を用いる。重複定義は本プロンプトには持たない。

### ステップ 2: Layer 2 対応候補を判定する

eslint-plugin-smarthr のルール名一覧を参照し、各ルール候補に対応する ESLint ルール名がある場合は **出力から除外する**（Layer 2 で自動取り込みされるため、checklist.yaml には含めない）。除外した項目はコミットメッセージに「Layer 2 でカバー済み」として列挙する。

判断できない場合は除外しない（推測しない）。

> 新規生成側（`generate-checklist`）と方針を統一。`layer2_candidate` フィールドは廃止し、Layer 2 でカバーされる項目は最初から出力に含めない。

### ステップ 3: 既存 checklist.yaml と突き合わせて差分を特定する

ステップ 1〜2 で得た「最新の抽出結果」と、ステップ 0 で読み込んだ「確定済みベースライン」を突き合わせる。

**突き合わせの基準**: `source_section` と `text` の意味的一致で対応を取る。text の表現が多少異なっても、同じルールを指していれば「同一項目」と判断する。

分類：

- **維持**: 既存項目と対応する抽出結果がある → 既存項目をそのまま出力（severity・text・sub_items・note すべて既存のまま）
- **新規**: 抽出結果にあるが既存項目に対応がない → generate-checklist.md ステップ 5・6 で生成した severity・text で出力する
- **削除**: 既存項目にあるが抽出結果に対応がない（index.mdx から該当記述が消えた） → 出力から除外する。削除した項目はコミットメッセージに列挙する
- **更新**: 既存項目に対応する抽出結果があるが、index.mdx の該当記述が変更されている（source_section の変更、ルール内容の実質的変更） → 変更箇所のみ更新する。severity は既存を維持する

> 新規・更新・削除の区別は **チャットの変更レポートとコミットメッセージで示す**。checklist.yaml 本体に `# NEW` / `# UPDATED` のようなマーカーコメントを書いてはいけない。`#` コメント行はパーサ（`parse-checklist.ts`）がカテゴリ見出しとして解釈するため、マーカーを書くと生成されるコンポーネントガイドに不正な見出しが混入する。yaml に書いてよいコメントは `# カテゴリ名`（= `source_section` のグループ見出し）のみ。

**「更新」の判断基準**:
- source_section（見出し）が変わった → source_section を更新
- ルール本文の意味が変わった（単なる表現の微調整ではなく、条件や対象が変わった） → text を更新
- sub_items の内容が変わった → sub_items を更新
- severity は既存を維持する（変更が必要な場合は note で提案する）

### ステップ 4: 出力を構成する

ステップ 3 の分類に基づいて checklist.yaml を出力する。運用判断（スキップ・親ページ扱い・severity 横串確認・Layer 1 重複チェック等）は `.claude/skills/update-checklist/SKILL.md` を参照する。

## 出力形式

以下のフォーマットで checklist.yaml を出力する。

=== 出力例ここから ===

items:
  # 種類 > Primary
  - severity: must
    text: "Primary ボタンは 1 画面に最大 1 つにする"
    source_section: "種類 > Primary"

  - severity: avoid
    text: "注目を集める目的だけで Primary を使わない"
    source_section: "種類 > Primary"

  # 種類 > Secondary
  - severity: should
    text: "Secondary は Primary の次に重要度の高い操作に使う"
    source_section: "種類 > Secondary"

  # 新しいセクション
  - severity: should
    text: "新しく追加されたルールの text"
    source_section: "新しいセクション"

=== 出力例ここまで ===

出力ルール：
- 1 コンポーネント = 1 ファイル（拡張子 `.yaml`）
- トップレベルは `items:` キー、その配下に配列で項目を並べる（Astro Content Layer の collection entry として読み込むため）
- カテゴリ区切りは YAML コメント（`# カテゴリ名`）。Markdown の `##` は使わない
- フィールド順: `severity` → `text` → `source_section` → `sub_items` → `note`
- null のフィールド（`sub_items` / `note`）は省略する。出力に含めない
- sub_items は見出し単体では不完全な場合のみ付与する
- note は定量化不能な語を含む項目にのみ付与する（その他の運用判断由来の note は SKILL.md 側で扱う）
- **`#` コメントは `# カテゴリ名`（source_section のグループ見出し）のみ。`# NEW` / `# UPDATED` 等のマーカーコメントは書かない**（パーサがカテゴリ見出しとして解釈し、生成物に不正な見出しが混入するため）
- **新規・更新・削除はチャットの変更レポートとコミットメッセージで示す（yaml 本体には書かない）**

## コミットメッセージ

checklist.yaml を更新したら、以下の形式でコミットメッセージを構成する：

```
fix: <コンポーネント名> checklist.yaml を差分更新

変更サマリ:
- 新規: <N> 項目（<項目の概要>）
- 更新: <N> 項目（<変更内容の概要>）
- 削除: <N> 項目（<削除理由の概要>）
- 維持: <N> 項目
- Layer 2 でカバー済みのため除外: <N> 項目（<該当ルール名>）
```

## 自己チェック

出力を返す前に以下を確認する：

- [ ] 既存項目の severity を変更していないか
- [ ] 既存項目の text を変更していないか（index.mdx の該当記述が変わっていない場合）
- [ ] 既存項目の sub_items を変更していないか（index.mdx の該当記述が変わっていない場合）
- [ ] 新規項目の text の意味が元資料の原文と一致しているか（文体変換のみで意味を変えていないか）
- [ ] `#` コメントが `# カテゴリ名` のみで、`# NEW` / `# UPDATED` 等のマーカーが混入していないか
- [ ] 新規・更新・削除をチャットの変更レポートとコミットメッセージに列挙しているか
- [ ] Layer 2 でカバー済みの項目を出力に含めていないか（除外できたものはコミットメッセージに列挙）
- [ ] 元資料にない抽象化・一般化をしていないか
- [ ] 外部リンク先を参照して内容を補完していないか
- [ ] source_section は元資料の見出し階層と一致しているか
- [ ] 外部 MDX 由来のルールに via 表記がついているか
