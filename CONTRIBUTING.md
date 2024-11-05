# Contribution guide

このドキュメントはSmartHR Design Systemの開発者向けです。Astroに関すること、独自に実装している機能、デプロイなどについて記載します。

ローカルでの環境構築や、サイトのコンテンツに関することは[README.md](https://github.com/kufu/smarthr-design-system#readme)を参照してください。

## Astroに関すること

Astroの機能や導入しているプラグインの概要です。

### Astro本体

バージョン4系を使っています。

### ページとルーティング

`/src/pages`以下にあります。

|ファイル|対応するパス|
|-|-|
| index.astro | / (= トップページ) |
| 404.astro | /404 (= 404ページ) |
| search.astro | /search |
| [...slug].astro | /{slug} |

`[...slug].astro`は、`/src/content/articles`以下にある.mdxファイルから生成しています。

### コンテンツとMDX

[@astrojs/mdx](https://github.com/withastro/astro/tree/main/packages/integrations/mdx/)を使っています。
内部で使用されているMDXのバージョンは3系です。

ページ生成時には、`src/layouts/ArticleLayout.astro`をテンプレートとして使っています。

#### テンプレート内でやっていること

- 左サイドバーに表示するメニューの生成
- 右サイドバーに表示する目次の生成
- 各ページ最後にある「前へ」「次へ」リンクの生成
- タグ変換時のカスタムコンポーネントの適用

詳しくはテンプレート内のコメントもあわせて参照してください。

#### remarkプラグイン

以下のプラグインで、マークダウン変換時に絵文字の変換やマークアップに必要なデータの生成などを行なっています。

- remark-emoji
- remark-code-block (独自)
- remark-index-id-header (独自)

詳しくは独自プラグインの階層にある`src/remark/README.md`を参照してください。

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
