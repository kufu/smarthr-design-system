---
name: design-review
description: >-
  Reviews changed smarthr-ui code (.tsx/.jsx diffs) against the SmartHR Design System guides
  (component-guidelines and design-pattern-guidelines) with two parallel reviewer subagents,
  and reports where the code differs from the guides, with severity 1-4 and the quoted guide text as evidence.
  The guides are guidelines, not rules: findings are recommendations, and the design intent decides.
  Applies fixes only when the user literally typed `--fix` in their own message.
  Never add `--fix` to the arguments yourself, even when asked in words to fix (「直して」「修正して」).
  `--no-existing` reviews the whole target as new code without comparing it with existing code;
  it changes no code, so a calling skill may pass it.
  Use before committing or opening a PR, or when asked 「デザインレビューして」「smarthr-ui の使い方をチェックして」
  「デザインシステムに沿っているか見て」.
---

# デザインレビュー

smarthr-ui を使った実装（`.tsx` / `.jsx`）を SmartHR デザインシステムのガイドラインに照らしてレビューし、ガイドラインと異なる箇所を重大度を付けて報告する。`--fix` を付けたときだけ直す。

レビューの観点は 2 つあり、それぞれのガイドラインを読むサブエージェントが**並列**に受け持つ。

- **pattern**（`design-pattern-guidelines`）: ページレイアウト・余白・Button の variant・ページネーションの位置・テーブル操作エリア／一時操作エリアの配置・DoAndDont のアンチパターン
- **component**（`component-guidelines`）: smarthr-ui のコンポーネントの props と型・使い分け・eslint-plugin-smarthr のルール

原則:

- **ガイドラインはルールではなく補助線**。SmartHR デザインシステムは基準・ガイドラインで、規則ではない。ガイドラインに沿わせるかは、デザインの意図を確かめて決める。指摘は「違反」と断定せず、「ガイドラインと異なる箇所」と「どれくらい直すことを勧めるか」として伝える
- **事前知識で指摘しない**。サブエージェントはガイドラインを読んでから判断し、すべての指摘にガイドラインの文をそのまま引用した根拠を付ける。引用できない指摘は出さない
- **重大度は、ガイドラインの文の強さで決める**。どれくらい困るかをモデルが見積もらない。コードだけで判定できない指摘（余白の値やレイアウトの細部など）は、「デザインの意図を確かめる」より上にしない
- **差分が持ち込んだものと、既存の書き方を分ける**。既存のコードと同じ書き方は、その変更で直すものではなく、リポジトリ全体の課題として 1 件だけ出す。`--no-existing` のときは分けず、対象の全部を新しいコードとして扱う

重大度は 4 段（定義は [references/reviewer-prompt.md](references/reviewer-prompt.md) の「severity の基準」）。

- **S4 動かない**: 存在しない prop や値、eslint-plugin-smarthr のルールへの違反
- **S3 基本は直す**: ガイドラインが求めている（`[must]` など）
- **S2 意図を確かめて決める**: ガイドラインが勧めている（`[should]` など）、またはコードだけでは決められない
- **S1 参考**: 選択肢や参考になる情報

## 1. 対象を決める

引数（無ければ会話）から対象を決める。

| 引数 | 対象 |
| --- | --- |
| なし | `git diff HEAD` と untracked のファイル（`git status --porcelain --untracked-files=all` の `??` 行。付けないと、新しいディレクトリの中のファイルがディレクトリ名だけになる） |
| PR 番号 / PR の URL | `gh pr diff <番号>`（下の「PR を対象にするとき」を先に確かめる） |
| ブランチ名 / ref | `git diff <ref>...HEAD` |
| ファイルのパス（複数可） | そのファイルの差分。差分が無ければ（新規・未追跡など）ファイル全体 |

- 対象は `.tsx` / `.jsx` だけ。0 件ならそう伝えて終わる
- **PR を対象にするとき**: サブエージェントは差分のほかに作業ツリーのファイルや型定義も読むので、作業ツリーが PR と同じ版でないと、違う内容で判断してしまう。`gh pr view <番号> --json headRefOid -q .headRefOid` と `git rev-parse HEAD` を比べ、一致しなければレビューせずに止める。ブランチを切り替えたりチェックアウトしたりはせず、「PR のブランチをチェックアウトしてから呼び直す」よう案内する
- **`--fix` は、ユーザーが自分のメッセージに `--fix` と書いたときだけ有効にする**。判断の基準は引数ではなくユーザーのメッセージ。
  - 引数に `--fix` があっても、ユーザーのメッセージに `--fix` という文字列が無ければ、足されたものとして扱い、直さない
  - 「直して」「修正して」と自然文で頼まれても直さない。報告だけにして、末尾で `--fix` を付けて呼び直すよう案内する
  - 有効でなければ、コードを一切変えない
- **`--no-existing` は、引数にあれば有効にする**。`--fix` と違ってコードを変えないので、別のスキルなどの呼び出し側が付けてかまわない。ユーザーのメッセージに書かれているかは確かめない
  - 既存のコードとの比較をしない。対象の全部を新しいコードとして扱う
  - サブエージェントに既存のコードを grep させない。既存と同じ書き方を理由に重大度を下げない。「リポジトリ全体の課題」にも回さない
  - 使い道: 独立した試作やサンプルがたくさん並ぶリポジトリのように、ほかのファイルの書き方に合わせる理由が無いとき

差分そのものは、ここでは取得しない（サブエージェントが自分で取る）。対象のファイルの一覧と、差分を取るコマンドだけを決める。

## 2. サブエージェントを 2 つ並列に起動する

[references/reviewer-prompt.md](references/reviewer-prompt.md) の雛形を埋め、**同じメッセージで 2 つ**起動する（pattern と component）。

- 渡すのは、対象のファイルのパスと差分を取るコマンド、ガイドラインのフォルダの絶対パス、既存のコードと比べるか（`--no-existing` の有無）だけ。差分やファイルの中身をプロンプトに貼らない（サブエージェントが自分で取得して読む）
- ガイドラインのフォルダは、このスキルのフォルダと同じ階層（`skills/`）にある `design-pattern-guidelines/` と `component-guidelines/`。**絶対パス**にして渡す。サブエージェントは作業フォルダを起点に探すので、相対パスや名前だけでは見つけられない
- Claude Code では、どちらも `model: 'sonnet'` を指定する。軽いモデルは、存在しない prop の誤り（ビルドを壊す、最も重い指摘）を見落とす
- 起動のツールの呼び出しが**実際に出たか**を確かめる。文だけで「起動した」と書いて、呼び出しが出ていないことがある。出ていなければ、そのターンでもう一度起動する
- 起動したら、結果を待つ間に考え込まない。結果は完了の通知で受け取る。催促のためにサブエージェントへメッセージを送らない（動き直して止まる）
- サブエージェントを使えない環境では、雛形の指示に従って 2 つの観点を順に自分で行う

## 3. 指摘をまとめる

2 つの JSON 配列を合わせ、次の決まりでまとめる。

- **同じガイドラインの項目で直し方が同じ指摘は、ファイルや観点をまたいでも 1 件にまとめ**、箇所（`file:line`）を列挙する
- 観点が違っても直し方が同じなら 1 件にまとめ、両方の根拠を並べる
- まとめた指摘の重大度は高い方に揃える。同じガイドラインの項目の指摘に違う重大度を付けない
- 2 つの指摘が食い違う（片方は prop を消す、片方は値を変えるなど）ときは、まとめずに食い違いとして示す。型定義など一次情報に近い根拠を優先する
- 食い違いがあっても、**型定義で確かめた誤り（存在しない prop や値）は S4 のまま残す**。もう片方の S2 以下の指摘にまとめて消さない
- 同じ行で直し方がぶつかる 2 つの S3 以上の指摘は、別々に並べず、1 件の食い違いとして示す
- 迷ったらまとめずに並べる
- `existing: true` の指摘も、ガイドラインの項目ごとに 1 件にまとめ、差分側の箇所（`file:line`）をすべて残す。ガイドラインの項目が違う指摘（非推奨の 2 つのコンポーネントなど）はまとめない。2 つの観点が同じ項目に違う `existing_count` を付けたら、同じ箇所を数えているので足さずに大きい方を使う
- サブエージェントが `unavailable` を返した（ガイドラインを読めなかった）観点は、一覧の冒頭で「◯◯ の観点はレビューできなかった」と理由を添えて伝える。その理由をメイン自身で確かめ直したり、ガイドラインの改善候補に足したりしない（読めなかったのは探し方や権限の問題のことが多い）

## 4. 一覧を出す

次の見出しに分けて、**日本語で**出す。**中身の無い見出しは出さない**。

| 見出し | 入るもの |
| --- | --- |
| 直すことを勧める | S4・S3 |
| デザインの意図を確かめる | S2 |
| 参考 | S1 |
| リポジトリ全体の課題（既存と同じ書き方） | `existing: true`。ガイドラインの項目ごとに 1 件。差分側の箇所は `file:line` で列挙し、既存の側は数（`existing_count`）だけ。`--no-existing` のときは出さない |
| ガイドラインの改善候補 | `guide_issues` |

- **`existing: true` の指摘は、重大度に関係なく「リポジトリ全体の課題」だけ**に入れる（ほかの見出しには入れない）
- 各見出しの中は重大度の降順。「直すことを勧める」が 5 件を超えたら、5 件ずつに区切って出す
- 「違反」「NG」「必須」のような、ルールとして断定する言い方をしない。「ガイドラインでは〜とされている」「〜にすることを勧める」のように書く
- 各指摘の → の行には、ガイドラインに沿わせる場合の直し方か、確かめることを書く。今のままにするかどうかの判断は書かない（それはユーザーが決める）
- 結果の見出しに、`--fix` の有無（ユーザーが指定したか）と `--no-existing` の有無を並べて書く
- 公式ドキュメントの URL は、[references/doc-urls.md](references/doc-urls.md) を、全指摘の `source` のパスでまとめて 1 回 grep して引く。**根拠の `source` ごとに 1 行ずつ** 📖 を付け、その指摘の根拠でない URL（直し方の先のコンポーネントなど）は付けない。表に無い `source` だけ 📖 を省く（推測で組み立てない）。**URL は読む人のためのもので、開いて読まない**
  - 📖 を付けるのは、根拠の行がある指摘（直すことを勧める・デザインの意図を確かめる・参考）だけ。ガイドラインの改善候補には付けない
  - 同じ URL は、1 つの指摘に 1 回だけ付ける

「直すことを勧める」か「デザインの意図を確かめる」に 1 件でもあれば、一覧の最後に「ガイドラインと異なる箇所の扱い」を付ける（下の例の文をそのまま使ってよい）。

```
## デザインレビュー結果（--fix: なし / --no-existing: なし）

ガイドラインは補助線で、ルールではありません。ガイドラインと異なる箇所は、デザインの意図を確かめて扱いを決めてください。

### 直すことを勧める
1. [S4][component] src/features/foo/Bar.tsx:42 — StatusLabel の type に 'success' は無い
   → type="green" にする
   根拠: 「type: 'grey' | 'blue' | 'green' | …」（component-guidelines/components/StatusLabel.md）
   📖 https://smarthr.design/products/components/status-label/

### デザインの意図を確かめる
2. [S2][pattern] src/features/foo/Bar.tsx:30 — Stack の gap が 1.5。前後のセクションは 2
   → Figma やデザインの意図どおりか確かめる
   根拠: 「…」（design-pattern-guidelines/patterns/spacing-layout-pattern.mdx）
   📖 https://smarthr.design/products/design-patterns/spacing-layout-pattern/

### 参考
3. [S1][pattern] src/features/foo/Bar.tsx:10 — 一覧の上に件数を出すこともできる
   → 必要なら PageCounter を置く
   根拠: 「…」（design-pattern-guidelines/patterns/smarthr-table.mdx）
   📖 https://smarthr.design/products/design-patterns/smarthr-table/

### リポジトリ全体の課題（既存と同じ書き方）
4. [component] TextLink で外部のヘルプページを開いている（既存のコードにも 6 か所）
   箇所: src/features/foo/Bar.tsx:55, src/features/foo/Baz.tsx:12
   → HelpLink に置き換えることを別の作業で検討する

### ガイドラインの改善候補
5. design-pattern-guidelines/patterns/feedback.mdx — NotificationBar を常時の注意書きに使ってよいかが読み取れない

### ガイドラインと異なる箇所の扱い
- 該当部分の Figma の URL を渡してもらえれば、余白や色などのずれが、Figma（デザインカンプ）の意図どおりかを機械的に確かめられます。同じマーケットプレイスの figma-inventory プラグインを入れておくと、Figma の大きな応答を小さくまとめて突き合わせやすくなります
- デザインの意図を確かめ、ガイドラインに沿わせるか、今のやり方にするかを決めてください。判断に迷ったら、基準判定フローチャート（https://smarthr.design/products/usability/usability-checklist/#h3-6）を参考にしてください
```

指摘が 1 件も無ければ、そう伝えて終わる。

## 5. `--fix` のときだけ直す

- 直すのは**「直すことを勧める」（S4・S3）だけ**。デザインの意図を確かめる・参考・リポジトリ全体の課題・ガイドラインの改善候補は直さない
- 挙動を変えるもの、差分の外に大きく広がるものは直さずに見送り、理由を残す
- 1 件直すごとに、Read で該当の行を開いて反映を確かめる。直したと宣言するだけで済ませない
- すべて直したら、プロジェクトの型チェックと lint を回す（`package.json` のスクリプトから探す）。回せなければ回せなかったと書く
- 直したもの、見送ったもの（理由付き）、型チェックと lint の結果を報告する
