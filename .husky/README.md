<!-- textlint-disable -->
# gitのフックとして実行する処理

## フックの管理

処理はhuskyをとおして登録・実行しています。現状は、コミット時に実行すもののみなので、`.husky/pre-commit`にあるものが全てです。
※.git/hooks以下にフックを登録しても実行されますが、gitのバージョン管理下にないためhuskyでの管理が良いと考えます。

## 実行しているもの

### ダウンロード用zipファイルの作成

以下のディレクトリ内のファイル（画像ファイルを想定）に変化があった場合に、zipファイルを作り直します。

- `/src/content/articles/basics/illustration/images`
- `/src/content/articles/basics/icons/images`

また、同行するreadmeファイル（`/scripts/downloads/readme.txt`）に変更があった場合も作り直します。zipを作成するスクリプトは`/scripts/zipImages.ts`です。

### lint-staged

lint-stagedをとおして、ステージングされているファイルを対象にLint（ESLint/Stylelint/textlint）とリンクチェックを実行しています。リンクチェックのスクリプトは`/scripts/content-checker/linkChecker.ts`です。また、lint-stagedの設定は`package.json`にあります。
