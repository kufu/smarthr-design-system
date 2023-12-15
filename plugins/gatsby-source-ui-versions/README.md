# gatsby-source-ui-versions

[SmartHR UIのGitHubリポジトリ](https://api.github.com/repos/kufu/smarthr-ui)とChromaticから各バージョンのデータを取得し、GatsbyのGraphQL Data Layerに追加するプラグインです。

## データの取得

1. GitHubのAPIから、リリースのバージョン番号とコミットハッシュを取得
2. 取得した各バージョンの`smarthr-ui-props.json`を取得
3. 取得した各バージョンの`stories.json`を取得

### Gatsby GraphQL Data Layerへの追加

バージョンごとに、propsやストーリー名などをJSONから抜き出し、GatsbyのGraphQL Data Layerに追加しています。


#### 登録したデータを使っている場所

- `/src/components/ComponentPropsTable` から、`useStaticQuery`で取得
- `/src/components/ComponentStory` から、`useStaticQuery`で取得
