# scripts

コンテンツの生成やチェックに使うスクリプトです。`pnpm tsx [ファイルパス]`で実行します。

## fetch-ui-data.ts

GitHubからSmartHR UIのリリース情報を、ChromaticからStory、Propsの情報を取得しJSON形式で保存するスクリプトです。

```sh
pnpm tsx ./scripts/fetch-ui-data.ts
```

生成したJSONは`src/cache/smarthr-ui.json`に保存されます。

このスクリプトは`pnpm dev` `pnpm build`で自動的に実行されるので、基本的に手動で実行する必要はありません。

## update-algoliasearch.ts

Algoliaのインデックスを更新するスクリプトです。

安全のため、CI環境でのみ実行できるようにしています。ローカルでは以下のように実行してください。

```sh
CI=1 pnpm tsx --env-file './.env' ./scripts/update-algoliasearch.ts
```

インデックスのオブジェクトIDにはページのパスを使用しているため、パスに変更があった場合インデックスが重複することがあります。

その場合は **本番環境のAlgoliaの認証情報を使用して** 以下のコマンドを実行することで、インデックスの入れ替えが可能です。

```sh
CI=1 pnpm tsx --env-file './.env' ./scripts/update-algoliasearch.ts --replace-all
```

## update-smarthr-ui-css.ts

SmartHR UIのCSSをunpkg.com経由で取得し、`public/smarthr-ui.css`として保存するスクリプトです。

```sh
pnpm tsx ./scripts/update-smarthr-ui-css.ts
```

## zipImages.ts

イラストレーションやロゴのダウンロード用ZIPファイルを生成するスクリプトです。

対象のディレクトリは`src/constants/zip.ts`に定義されています。

```sh
pnpm tsx ./scripts/zipImages.ts
```
