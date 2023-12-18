# gatsby-source-ui-versions

[SmartHR UIのGitHubリポジトリ](https://api.github.com/repos/kufu/smarthr-ui)とChromaticから各バージョンのデータを取得し、GatsbyのGraphQL Data Layerに追加するプラグインです。

## データの取得

1. GitHubのAPIから、リリースのバージョン番号とコミットハッシュを取得
2. 取得した各バージョンの`smarthr-ui-props.json`を取得
3. 取得した各バージョンの`stories.json`を取得

各バージョンのデータ取得・処理には、バージョンごとに1〜2秒程度かかります。キャッシュがない状態で多くのバージョンを取得すると、数分かかる場合があります。

### オプション指定

`gatsby-config.js`で、GitHubリポジトリの情報や、取得するバージョンの最大数などのオプションを指定してください。

### Gatsby GraphQL Data Layerへの追加

バージョンごとに、propsやストーリー名などをJSONから抜き出し、GatsbyのGraphQL Data Layerに追加しています。


#### 登録したデータを使っている場所

- `/src/components/ComponentPropsTable` から、`useStaticQuery`で取得
- `/src/components/ComponentStory` から、`useStaticQuery`で取得

### キャッシュ

GraphQL Data Layerに追加したのと同じデータをキャッシュするようにしています。リリースのバージョン番号とコミットハッシュの一覧は毎回取得しますが、各バージョンについてキャッシュが存在した場合は、そのバージョンの`stories.json`と`smarthr-ui-props.json`の再取得は行いません。

キャッシュを削除するには、`gatsby clean`（`yarn clean`）を実行してください。
