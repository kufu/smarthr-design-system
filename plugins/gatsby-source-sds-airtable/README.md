# gatsby-source-sds-airtable

[airtable](https://www.airtable.com/)にあるデータをAPI経由で取得し、GasbyのGraphQL Data Layerに追加するプラグインです。また、取得したデータをテーブルごとにCSVファイルとして出力もします。

## 準備

環境変数に`AIRTABLE_PERSONAL_ACCESS_TOKEN`と`AIRTABLE_BASE_ID`を設定する必要があります。

### モックデータ

環境変数に上記2つが設定されておらず、本番環境でもない場合は、モックデータを使ってビルドします。モックの実装には[gatsby-source-mock](https://www.gatsbyjs.com/plugins/gatsby-source-mock/)を使っています。

## データの取得

AirtableのAPIから、登録された`AIRTABLE_BASE_ID`で取得できるテーブル**すべて**を取得します（そのため、現在のSDSでは表示していないテーブルも含みます）。

### Gatsby GraphQL Data Layerへの追加

取得したテーブルデータは、1レコード（テーブルの"行"に当たるもの）を1ノードとしてGraphQL Data Layerに追加します。

#### 登録したデータを使っている場所

- `/src/components/contents/IdiomaticUsageTable` から、`useStaticQuery`で取得
- `/src/templates/article.tsx` から、`useStaticQuery`で取得→右サイドバーの目次で利用
  - `/src/constants/airtable.ts`で、どのテーブルをどのページで利用するかなどを定義してあり、`/src/gatsby-node/index.ts`で、その定義を元に、ページのデータとテーブル名を結びつけています
- `/gatsby-plugin-algolia-config.ts`で、検索用のデータとして利用するために取得
  - 対象のテーブルは`/src/constants/airtable.ts`から取得しています

### CSVファイルの出力

取得したテーブルデータは、`/static/csv`以下にCSVファイルとしても出力します。これは、Airtableデータをiframe埋め込みする際に、CSVダウンロードボタンを表示するためです。Airtableが提供するembed用のHTMLにも、CSVダウンロードボタンがありますが、表示が目立たないため、独自にファイルを用意・ボタンを表示しています（参考：https://github.com/kufu/smarthr-design-system-issues/issues/1250）。

CSV生成処理は、ビルド時に毎回行われるため、Airtable上のデータに変更があった場合は、CSVファイルに差分が出ます。

---

## Airtable用のプラグイン
[gatsby-source-airtable](https://www.gatsbyjs.com/plugins/gatsby-source-airtable/)というコミュニティプラグインもありますが、メンテナーが変わったりしていること、使用していない機能がある一方、独自にCSVの出力をしていることなどから、独自のプラグインを作成しています。
参考：https://github.com/kufu/smarthr-design-system-issues/issues/1203
