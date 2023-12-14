# Contribution guide

このドキュメントはSmartHR Design Systemの開発者向けです。Gatsbyフレームワークに関すること、独自に実装している機能、デプロイなどについて記載します。

ローカルでの環境構築や、サイトのコンテンツに関することは[README.md](https://github.com/kufu/smarthr-design-system#readme)を参照してください。

## Gatsbyフレームワークの機能

Gatsbyの機能やプラグインの概要です。各データソースについては、プラグインのディレクトリ内のREADMEも参照してください。

### Gatsby本体
バージョン4系を使っています。バージョン5へのアップデートは、メモリ使用量が増大する問題があり実現していません。

- メモリについてのissue: https://github.com/gatsbyjs/gatsby/issues/36899

（バージョンが上がるにつれて改善しているようですが、バージョン5.12.11でも4GBでは不足でした。）

### ページとルーティング

`/src/pages`以下にあり、Gatsbyが生成するページ

- / (index.html = トップページ)
- /404/
- /search/
- /login/

それ以外のページは、`/content/articles`以下にある.mdxファイルから、gatsby-source-filesystemプラグインを使って生成しています。

### コンテンツとMDX

MDXはバージョン1系を使っています。Gatsbyからはgatsby-plugin-mdxプラグインを通して処理しています。ページ生成時には、`/src/templates/article.tsx`をテンプレートとしてレンダリングします。

#### テンプレート内でやっていること
- 左サイドバーに表示する目次の生成
- 各ページ最後にある「前へ」「次へ」リンクの生成
- タグ変換時のカスタムコンポーネントの適用

詳しくはテンプレート内のコメントもあわせて参照してください。

#### MDXのプラグイン

以下のプラグインで、マークダウン変換時に画像のマークアップや、絵文字の変換などを行っています。

- gatsby-remark-images
- gatsby-remark-image-attributes
- gatsby-remark-gifs
- remark-emoji

また、独自にgatsby-remark-index-id-headerというプラグインを作成し、hタグに連番のidを付与しています。詳しくはプラグインのある`/src/plugins/gatsby-remark-index-id-header` ディレクトリを参照してください。

#### MDXをバージョン2系にアップデートするときの注意点

gatsby-plugin-mdxはバージョン4からMDXバージョン2になります。現在は、Gatsbyのバージョン4系を使っているので、gatsby-plugin-mdxのバージョンも3系=MDX v1系を使っています。

### MDX以外のデータソース

Gatsbyのデータソースとして、MDX以外にも以下があり、GraphQL Data Layerからデータが取得できます。

- gatsby-source-sds-airtable
- gatsby-source-ui-versions
- gatsby-source-component-captures

`/plugins` 以下の各プラグインのディレクトリに詳細を記載します（TBD）。

### コンポーネント

`/src/components`以下には、MDX内から呼び出すコンポーネントがあります。

コードの表示・ライブエディタやSmartHR UIのStorybookを表示しているコンポーネントなどは、やや込み入った実装になっています。詳しくはコンポーネントディレクトリ内のREADMEを参照してください。


## SDS独自の機能

Gatsbyと直接関連しない、独自の機能もいくつかあります。

### ログイン

従業員限定コンテンツにアクセスするためのログイン機能です。従業員限定コンテンツは[smarthr-design-system-private](https://github.com/kufu/smarthr-design-system-private)にあり、別のサイトとしてNetlifyにデプロイされています。

PrivateサイトにはBasic認証が設定されています。SDS本体サイトからは、Netlify Edge functionsを利用して認証を行なうしくみです。Edge functionsのコードは`/netlify/edge-functions`にあります。

### スクリプトと自動実行

`/scripts`以下に、コンテンツの生成やチェックに使うスクリプトがあります。また、それらのスクリプトやLinterを、GitHub Actionsやhuskyなどで自動実行しています。詳しくは以下の各ディレクトリを参照してください。

- `/scripts` : 独自に用意しているスクリプト
- `.husky` : コミット時に自動実行されるもの
- `.github/workflows` : GitHub Actionsで自動実行されるもの

## 外部サービスの利用

### Algolia
検索機能にAlgoliaを利用しています。Algoliaのインデックスは、mainブランチのビルド時に更新されます。インデックスの登録には[gatsby-plugin-algolia](https://www.gatsbyjs.com/plugins/gatsby-plugin-algolia/)を、検索UIには[algloliasearch](https://www.npmjs.com/package/algoliasearch)と[react-instantsearch-dom](https://www.npmjs.com/package/react-instantsearch-dom)を使っています。

### Cloudinary
OGP画像の動的生成とGoatcha画像のホスティングに[Cloudinary](https://cloudinary.com/)を利用しています。
