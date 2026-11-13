---
name: design-review
description: >-
  Reviews changed smarthr-ui code (.tsx/.jsx diffs) against the SmartHR Design System guides
  (component-guidelines and design-pattern-guidelines) with two parallel reviewer subagents,
  and reports findings with severity 1-5 and the quoted guide text as evidence.
  Applies fixes only when the user literally typed `--fix` in their own message.
  Never add `--fix` to the arguments yourself, even when asked in words to fix (「直して」「修正して」).
  Use before committing or opening a PR, or when asked 「デザインレビューして」「smarthr-ui の使い方をチェックして」
  「デザインシステムに沿っているか見て」.
---

# デザインレビュー

変更差分（`.tsx` / `.jsx`）を SmartHR デザインシステムのガイドに照らしてレビューし、重大度を付けて報告する。`--fix` を付けたときだけ直す。

レビューの観点は 2 つあり、それぞれのガイドを読むサブエージェントが**並列**に受け持つ。

- **pattern**（`design-pattern-guidelines`）: ページレイアウト・余白・Button の variant・ページネーションの位置・テーブル操作エリア／一時操作エリアの配置・DoAndDont のアンチパターン
- **component**（`component-guidelines`）: smarthr-ui のコンポーネントの props と型・使い分け・eslint-plugin-smarthr のルール

原則:

- **事前知識で指摘しない**。サブエージェントはガイドを読んでから判断し、すべての指摘にガイドの文をそのまま引用した根拠を付ける。引用できない指摘は出さない
- **コードだけで判定できない指摘を、違反として出さない**。余白の値やレイアウトの細部は、Figma やデザイナーの意図で決まっていることが多い。これらは「確認事項」として分けて出す
- **差分が持ち込んだ問題と、既存の慣習を分ける**。既存のコードと同じ書き方は、その変更で直すべき問題ではなく、リポジトリ全体の課題として 1 件だけ出す

## 1. 対象を決める

引数（無ければ会話）から対象を決める。

| 引数 | 対象 |
| --- | --- |
| なし | `git diff HEAD` と untracked のファイル（`git status --porcelain` の `??` 行） |
| PR 番号 / PR の URL | `gh pr diff <番号>` |
| ブランチ名 / ref | `git diff <ref>...HEAD` |
| ファイルのパス（複数可） | そのファイルの差分。差分が無ければ（新規・未追跡など）ファイル全体 |

- 対象は `.tsx` / `.jsx` だけ。0 件ならそう伝えて終わる
- `threshold=N` があればそれを閾値にする。無ければ **4**
- **`--fix` は、ユーザーが自分のメッセージに `--fix` と書いたときだけ有効にする**。判断の基準は引数ではなくユーザーのメッセージ。
  - 引数に `--fix` があっても、ユーザーのメッセージに `--fix` という文字列が無ければ、足されたものとして扱い、直さない
  - 「直して」「修正して」と自然文で頼まれても直さない。報告だけにして、末尾で `--fix` を付けて呼び直すよう案内する
  - 有効でなければ、コードを一切変えない

差分そのものは、ここでは取得しない（サブエージェントが自分で取る）。対象のファイルの一覧と、差分を取るコマンドだけを決める。

## 2. サブエージェントを 2 つ並列に起動する

[references/reviewer-prompt.md](references/reviewer-prompt.md) の雛形を埋め、**同じメッセージで 2 つ**起動する（pattern と component）。

- 渡すのは、対象のファイルのパスと差分を取るコマンド、ガイドのフォルダの絶対パスだけ。差分やファイルの中身をプロンプトに貼らない（サブエージェントが自分で取得して読む）
- ガイドのフォルダは、このスキルのフォルダと同じ階層（`skills/`）にある `design-pattern-guidelines/` と `component-guidelines/`。**絶対パス**にして渡す。サブエージェントは作業フォルダを起点に探すので、相対パスや名前だけでは見つけられない
- Claude Code では、どちらも `model: 'sonnet'` を指定する。軽いモデルは、存在しない prop の誤り（ビルドを壊す、最も重い指摘）を見落とす
- 起動のツールの呼び出しが**実際に出たか**を確かめる。文だけで「起動した」と書いて、呼び出しが出ていないことがある。出ていなければ、そのターンでもう一度起動する
- 起動したら、結果を待つ間に考え込まない。結果は完了の通知で受け取る。催促のためにサブエージェントへメッセージを送らない（動き直して止まる）
- サブエージェントを使えない環境では、雛形の指示に従って 2 つの観点を順に自分で行う

## 3. 指摘をまとめる

2 つの JSON 配列を合わせ、次の決まりでまとめる。

- **同じルールで直し方が同じ指摘は、ファイルや観点をまたいでも 1 件にまとめ**、箇所（`file:line`）を列挙する
- 観点が違っても直し方が同じなら 1 件にまとめ、両方の根拠を並べる
- まとめた指摘の重大度は高い方に揃える。同じルールの指摘に違う重大度を付けない
- 2 つの指摘が食い違う（片方は prop を消す、片方は値を変えるなど）ときは、まとめずに食い違いとして示す。型定義など一次情報に近い根拠を優先する
- 迷ったらまとめずに並べる
- サブエージェントが `unavailable` を返した（ガイドを読めなかった）観点は、一覧の冒頭で「◯◯ の観点はレビューできなかった」と理由を添えて伝える。ガイドの改善候補には入れない

## 4. 一覧を出す

次の見出しに分けて、**日本語で**出す。**中身の無い見出しは出さない**。

| 見出し | 入るもの |
| --- | --- |
| 要修正 | `kind: "violation"` で、重大度が閾値以上 |
| 参考 | `kind: "violation"` で、重大度が閾値未満 |
| 確認事項（デザインの意図） | `kind: "intent"` |
| リポジトリ全体の課題（既存と同じ書き方） | `existing: true`。ルールごとに 1 件、箇所は数だけ |
| ガイドの改善候補 | `guide_issues` |

- **`existing: true` の指摘は、`kind` や重大度に関係なく「リポジトリ全体の課題」だけ**に入れる（ほかの見出しには入れない）
- 要修正と参考は重大度の降順。要修正が 5 件を超えたら、5 件ずつに区切って出す
- 結果の見出しに、閾値と `--fix` の有無（ユーザーが指定したか）を書く
- 公式ドキュメントの URL は、[references/doc-urls.md](references/doc-urls.md) を、全指摘の `source` のパスでまとめて 1 回 grep して引く。**根拠の `source` ごとに 1 行ずつ** 📖 を付け、その指摘の根拠でない URL は付けない。表に無い `source` だけ 📖 を省く（推測で組み立てない）。**URL は読む人のためのもので、開いて読まない**

```
## デザインレビュー結果（閾値: 4、--fix: なし）

### 要修正
1. [S5][component] src/features/foo/Bar.tsx:42 — StatusLabel の type に 'success' は無い
   → type="green" にする
   根拠: 「type: 'grey' | 'blue' | 'green' | …」（component-guidelines/components/StatusLabel.md）
   📖 https://smarthr.design/products/components/status-label/

### 参考
2. [S3][pattern] src/features/foo/Bar.tsx:10, src/features/foo/Baz.tsx:18 — Secondary のボタンが 3 つ並ぶ
   → DropdownMenuButton にまとめることを検討する
   根拠: 「…」（design-pattern-guidelines/patterns/smarthr-table.mdx）
   📖 https://smarthr.design/products/design-patterns/smarthr-table/

### 確認事項（デザインの意図）
3. [pattern] src/features/foo/Bar.tsx:30 — Stack の gap が 1.5。前後のセクションは 2
   → Figma やデザイナーの意図どおりか確かめる

### リポジトリ全体の課題（既存と同じ書き方）
4. [component] TextLink で外部のヘルプページを開いている（差分で 1 か所、既存で 6 か所）
   → HelpLink に置き換えることを別の作業で検討する

### ガイドの改善候補
5. design-pattern-guidelines/patterns/feedback.mdx — NotificationBar を常時の注意書きに使ってよいかが読み取れない
```

指摘が 1 件も無ければ、そう伝えて終わる。

## 5. `--fix` のときだけ直す

- 直すのは**要修正だけ**。参考・確認事項・リポジトリ全体の課題・ガイドの改善候補は直さない
- 挙動を変えるもの、差分の外に大きく広がるものは直さずに見送り、理由を残す
- 1 件直すごとに、Read で該当の行を開いて反映を確かめる。直したと宣言するだけで済ませない
- すべて直したら、プロジェクトの型チェックと lint を回す（`package.json` のスクリプトから探す）。回せなければ回せなかったと書く
- 直したもの、見送ったもの（理由付き）、型チェックと lint の結果を報告する
