# scripts

コンテンツの生成やチェックに使うスクリプトです。`pnpm tsx [ファイルパス]`で実行します。

## fetch-ui-data.ts

GitHubからSmartHR UIのリリース情報を、ChromaticからStory、Propsの情報を取得しJSON形式で保存するスクリプトです。
あわせて、コンポーネント一覧（`/products/components/`）の生成に使うstory情報をChromaticから取得します。

```sh
pnpm tsx ./scripts/fetch-ui-data.ts
```

生成したJSONは`node_modules/.cache/smarthr-ui@v[バージョン]/data.json`に保存されます。
保存済みのキャッシュがある場合はネットワークアクセスをせず、キャッシュをそのまま使います。

このスクリプトは`pnpm dev` `pnpm build` `pnpm generate:thumbnails`で自動的に実行されるので、基本的に手動で実行する必要はありません。

保存したデータは`src/lib/getUIData.ts`から提供される`getUIStories()`、`getUIProps()`、`UI_STORY_INDEX`を介して利用されます。

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
