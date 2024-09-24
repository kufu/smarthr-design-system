## fetchComponentCaptures

[SmartHR UIのStorybook](https://story.smarthr-ui.dev/)上の各コンポーネントグループの名前やサムネイル画像のパスなどを取得します。

## データの取得

1. 最新バージョン（https://story.smarthr-ui.devにデプロイされているもの）の`stories.json`を取得
2. `stories.json`から各コンポーネントの名前、属するグループ名などを抜き出す。

### 登録したデータを使っている場所

WIP

### サムネイル画像の生成

この関数では画像そのものの生成はしていません。
画像は、`/scripts/component-thumbnails` でスクリプトを実行して生成します。
