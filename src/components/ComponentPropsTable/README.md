# ComponentPropsTable

smarthr-uiコンポーネントのPropsを一覧にして表示するコンポーネントです。

## 使い方

MDXファイルから`import`して使います。コンポーネントの名前などをpropsに指定すると、自動的にそのコンポーネントのprops情報を取得・表示します。

## props情報の取得

Gatsbyのビルド時に、gatsby-source-ui-versionsがGraphQL Data Layerにコンポーネントのprops情報を登録しているので、そこから取得します。具体的にはバージョンごとの`smarthr-ui-props.json`の内容が取得できます。

### バージョン切り替え

バージョンごとにデータが存在するため、コンポーネントページ上部のプルダウンメニューでバージョンを切り替えた際（クエリストリングに反映された際）には、ComponentPropsTableの内容も切り替わります。
