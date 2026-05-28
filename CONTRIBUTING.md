# Contribution guide

このドキュメントはSmartHR Design Systemの開発者向けです。Astroに関すること、独自に実装している機能、デプロイなどについて記載します。

ローカルでの環境構築や、サイトのコンテンツに関することは[README.md](./README.md)を参照してください。

## Astroに関すること

Astroの機能や導入しているプラグインの概要です。

### Astro本体

バージョン4系を使っています。

### ページとルーティング

`src/pages/`以下にあります。

|ファイル|対応するパス|
|-|-|
| index.astro | / (= トップページ) |
| 404.astro | /404 (= 404ページ) |
| search.astro | /search |
| [...slug].astro | /{slug} |

`[...slug].astro`は、`src/content/articles/`以下にある.mdxファイルから生成しています。

### コンテンツとMDX

[@astrojs/mdx](https://github.com/withastro/astro/tree/main/packages/integrations/mdx/)を使っています。
内部で使用されているMDXのバージョンは3系です。

ページ生成時には、`src/layouts/ArticleLayout.astro`をレイアウトに使用し、`[...slug].astro`でMDXをレンダリングしています。

#### ArticleLayout.astro でやっていること

- 左サイドバーに表示するメニューの生成
- 右サイドバーに表示する目次の生成
- 各ページ最後にある「前へ」「次へ」リンクの生成

詳しくはテンプレート内のコメントもあわせて参照してください。

#### [...slug].astro でやっていること

- 目次のための見出し情報の生成
- タグ変換時のカスタムコンポーネントの適用
- MDXのレンダリング

#### remarkプラグイン

以下のプラグインで、マークダウン変換時に絵文字の変換やマークアップに必要なデータの生成などを行なっています。

- remark-emoji
- remark-code-block (独自)
- remark-index-id-header (独自)

詳しくは独自プラグインの階層にある[README.md](./src/remark/README.md)を参照してください。

### コンポーネント

`src/components/article/`以下には、MDX内から呼び出すコンポーネントがあります。

また、コードの表示・ライブエディタやSmartHR UIのStorybookを表示しているコンポーネントなどは、Reactで実装されています。
詳しくはそれぞれの階層以下にあるREADME.mdを参照してください。

### キャッシュ

ビルド時に`scripts/fetch-ui-data.ts`を実行してSmartHR UIのデータを取得し、`src/cache/`以下に保存しています。

このディレクトリは`.gitignore`に登録されているため、リポジトリには含まれません。

## SDS独自の機能

Astroと直接関連しない、独自の機能もいくつかあります。

### スクリプトと自動実行

`/scripts`以下に、コンテンツの生成やチェックに使うスクリプトがあります。また、それらのスクリプトやLinterを、GitHub Actionsやhuskyなどで自動実行しています。詳しくは以下の各ディレクトリを参照してください。

- `/scripts` : 独自に用意しているスクリプト
- `.husky` : コミット時に自動実行されるもの
- `.github/workflows` : GitHub Actionsで自動実行されるもの

## 外部サービスの利用

### Algolia

検索機能にAlgoliaを利用しています。Algoliaのインデックスは、mainブランチのビルド時に更新されます。

インデックスの登録には`scripts/update-algoliasearch.ts`を、検索UIには[algloliasearch](https://www.npmjs.com/package/algoliasearch)と[react-instantsearch-dom](https://www.npmjs.com/package/react-instantsearch-dom)を使っています。

### Cloudinary

OGP画像の動的生成とGoatcha画像のホスティングに[Cloudinary](https://cloudinary.com/)を利用しています。

----
## smarthr-uiコンポーネント向けAIスキルの整備

このセクションは、コンポーネントページ（`index.mdx`）を執筆する人向けの説明です。

smarthr-uiを使うAIエージェント（Claude Code / Cursorなど）向けに、コンポーネントごとの利用ガイドを`SKILL.md`として配布しています。`SKILL.md`は以下の3層から自動合成されます。

- Layer 1: `metadata.json`（コンポーネント基本情報）
- Layer 2: `eslint-plugin-smarthr`のルールREADME（自動検出可能なルール）
- Layer 3: `checklist.yaml`（このリポジトリで管理する人手作成ルール）

このうちLayer 3の`checklist.yaml`は、`index.mdx`から「AIエージェントに伝えたいルール」を抜き出したファイルです。AIアシスタントに依頼すれば自動で作成・更新できるため、YAMLを手書きする必要はありません。あわせて`index.mdx`のfrontmatterで宣言する`relatedComponents`の運用についても本セクションで説明します。

### 事前準備

ターミナル操作は、本リポジトリのルートディレクトリ（`smarthr-design-system/`）で実行します。初回のみ、依存パッケージのインストールが必要です。

```sh
pnpm install
```

### checklist.yamlの新規作成

1. 対象コンポーネントの`index.mdx`を整備します。
2. Claude CodeまたはCursorのAgentモードのチャットで、コンポーネント名を明示して依頼します。

   ```
   Button の checklist.yaml を作って
   ```

   複数のコンポーネントを同時に作成する場合は、対象をすべて列挙します。

   ```
   Button と Dialog の checklist.yaml を作って
   ```

   依頼すると`generate-checklist` SKILLが自動で読み込まれ、`index.mdx`と`_components/*.mdx`からルールを抽出します。Cursorでも同じSKILLが動作します。

3. バリデーションを実行し、形式エラーがないことを確認します。

   ```sh
   pnpm --filter ./scripts/generate-skills validate
   ```

   `error`が出た場合は、AIアシスタントに「validateのエラーを直して」と依頼すれば自動修正できます。`warn`の対処は[出力の見方](#バリデーション出力の見方)を参照してください。

4. `checklist.yaml`の内容を確認します。以下の観点でチェックし、必要に応じて修正します。
   - **`severity`の妥当性**: 各項目の`severity`（`must` / `should` / `avoid`）が`index.mdx`の語気と一致しているか
   - **項目の網羅性**: `index.mdx`に書かれているルールが漏れなく抽出されているか
   - **不要項目の混入**: 自動挙動の説明やprops規約のみの項目など、AIエージェント向けの判断材料にならない項目が含まれていないか
   - **`text`の表現**: Do/Don't形・終止形になっているか（「〜してください」など強い指示の言い回しが残っていないか）
5. 以下のコマンドを実行して、`checklist.yaml`を`SKILL.md`に反映します。

   ```sh
   pnpm --filter ./scripts/generate-skills generate
   ```

   成功すると、`plugins/smarthr-design-system/skills/<コンポーネント名>/SKILL.md`が追加されます。

### checklist.yamlの更新

`index.mdx`を変更した場合、既存の`checklist.yaml`に差分を反映します。

1. AIアシスタントに依頼します。

   ```
   Button の checklist.yaml を更新して
   ```

   依頼すると`update-checklist` SKILLが自動で読み込まれ、差分のみを既存の項目にマージします。レビュー済みの項目（`severity`・本文・補足など）は自動的に保護されます。

2. バリデーションを実行し、形式エラーがないことを確認します。

   ```sh
   pnpm --filter ./scripts/generate-skills validate
   ```

3. 差分の内容を確認します。AIアシスタントは追加・削除・更新の差分をレポートするため、以下の観点でチェックし、必要に応じて修正します。
   - **追加項目**: 提案された`severity`（`must` / `should` / `avoid`）が`index.mdx`の語気と一致しているか
   - **削除項目**: 該当ルールが`index.mdx`から本当に削除されているか（誤削除でないか）
   - **更新項目**: 変更前後のdiffが`index.mdx`の変更意図と一致しているか
   - **無変更項目**: 既存のレビュー済み項目が誤って書き換わっていないか
4. `SKILL.md`を再生成します。

   ```sh
   pnpm --filter ./scripts/generate-skills generate
   ```

   成功すると、`plugins/smarthr-design-system/skills/<コンポーネント名>/SKILL.md`が更新されます。

### CIでの自動チェック（`validate-skills` ワークフロー）

PRを出すと、GitHub Actionsで以下が自動実行されます。

- **`validate`**: 上記の`pnpm --filter ./scripts/generate-skills validate`をCI上で実行します。`error`があるとマージブロックされます。
- **`checklist-sync`**: `index.mdx`または`_components/*.mdx`を変更したコンポーネントについて、同一PR内で`checklist.yaml`も更新されているかを確認します。未更新の場合はマージブロックされます。
- **`coverage`**: smarthr-uiの`metadata.json`と設計システム側`index.mdx`/`relatedComponents`の追従整合性をチェックします。`scripts/generate-skills/coverage-baseline.json`に列挙された既知違反は除外され、新規違反のみPRブロックの対象になります。

`checklist-sync`が失敗した場合の対応は以下のいずれか:

1. ローカルで`checklist.yaml`を更新（または新規作成）してPRに追加
2. `generate-checklist` SKILLの判定で「スキップ対象」だった場合 → スキップ理由をPR descriptionに書き、PRに `skip-checklist-update` ラベルを付与
3. typo / description のみ等の軽微修正で更新不要な場合 → PRに `skip-checklist-update` ラベルを付与

**スキップ判定の典型例**（`generate-checklist` SKILLが自動判定します）:

- Every Layout の外部委譲（`Stack` / `Cluster` / `Center` / `Sidebar` / `Reel`）
- 索引のみの親ページ（`Combobox` 親、`Dropdown` 親）
- 機能説明のみで指示文がないコンポーネント
- 自動挙動・props 規約のみ（`AppHeader` 等）
- `deprecated: true` 指定（`deprecatedMessage` で代替を示すため不要）
- `description`で十分カバーされる内容
- `index.mdx`冒頭の説明文がそのまま`SKILL.md`の Layer 1 に取り込まれるケース

新規コンポーネント追加時は、`generate-checklist` SKILLを実行すると上記スキップ判定パターンに該当する場合は自動的に作成をスキップし、理由を報告します。報告された理由をPR descriptionに転記してラベルを付与してください。

#### `coverage`が失敗した場合の対応

`coverage`ジョブは、smarthr-uiに新しく追加された未対応コンポーネントや、`relatedComponents`の`name`がsmarthr-uiの公開exportに存在しないケース（typo・rename等）を検知します。

対応のいずれか:

1. 該当コンポーネントの`index.mdx`を新規作成、または親mdxの`relatedComponents`で紐付ける
2. 別PRでの対応にしたい場合（smarthr-uiアップデートPRで新コンポーネント追加だけ後回しにする等）→ `scripts/generate-skills/coverage-baseline.json`に追加してCIを通す
3. baselineに追加した違反は別PRで解消したら、`coverage-baseline.json`から削除する（解消済みエントリは`coverage`実行時に警告として通知されます）

### マージ後の自動再生成（`generate-skills` ワークフロー）

`feature/ai-agent-skills`（リリース後は`main`）にマージされると、`SKILL.md`が自動再生成され、差分があれば `github-actions[bot]` が自動コミット&pushします。手動で`pnpm --filter ./scripts/generate-skills generate`を実行する必要はありません。

### バリデーション出力の見方

- **`error`**: 必須項目の欠落、型の不正、YAML構文エラーなど。CIで失敗するため必ず修正します。AIアシスタントに「validateのエラーを直して」と依頼すれば自動修正できます。
- **`warn`**: 項目数の上限超過、`relatedComponents`の`description`欠落（`missingDescriptions`）など。内容に応じて対応します。なお`relatedComponents`の`description`欠落はCIでも失敗扱いです。

### relatedComponentsの宣言

`relatedComponents`は、`index.mdx`の先頭にあるfrontmatter（`---`で囲まれたYAMLブロック）で宣言する項目です。「このコンポーネントに付随する派生コンポーネントや内部部品の一覧」を記載し、ドキュメントページ上での関連コンポーネント表示と、AIエージェント向け`SKILL.md`の関連情報の両方に使われます。

書き方は、`name`（smarthr-uiのコンポーネント名）と、必要に応じて`description`（説明文）を並べます。

```yaml
---
relatedComponents:
  - name: Th
    description: 'th要素の代替としてテーブルの列見出しセルを表すコンポーネントです。'
  - name: Td
    description: 'td要素の代替としてテーブルのデータセルを表すコンポーネントです。'
---
```

`description`が必要かどうかは、サブコンポーネントが独自のページ（子`index.mdx`）を持っているかで決まります。

- **子`index.mdx`あり**（`Dialog`配下の`ActionDialog`など）: `description`は省略できます。子`index.mdx`の冒頭説明文が自動で採用されます。
- **子`index.mdx`なし**（`Table`配下の`Th` / `Td`など）: `description`を必ず書きます。書き忘れるとバリデーションで警告（`missingDescriptions`）となり、CIでも失敗します。

サブコンポーネントの典型的な分類:

|分類|例|子`index.mdx`|`description`|
|-|-|-|-|
| 派生継承 | `ControlledDialog`などの`Controlled*` | なし | 必須 |
| 内部部品 | `Th` / `Td`など | なし | 必須 |
| カテゴリメンバー | `Dialog` / `ErrorScreen` / `Picker`配下 | あり | 省略可 |

### 関連ファイル（参考）

仕組みを詳しく知りたい開発者向けの参照先です。通常の運用では触りません。

|ファイル|役割|
|-|-|
| `.claude/skills/generate-checklist/SKILL.md` | 新規生成用のSKILL定義 |
| `.claude/skills/update-checklist/SKILL.md` | 差分更新用のSKILL定義 |
| `.github/prompts/generate-checklist.md` | 抽出ルールの詳細仕様 |
| `.github/prompts/update-checklist.md` | 差分更新プロンプトの詳細仕様 |
| `scripts/generate-skills/validate.ts` | バリデーションスクリプト |
| `scripts/generate-skills/index.ts` | `SKILL.md`再生成スクリプト |
