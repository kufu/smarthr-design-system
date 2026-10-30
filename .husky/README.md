<!-- textlint-disable -->
# gitのフックとして実行する処理

## フックの管理

処理はhuskyをとおして登録・実行しています。現状は、コミット時に実行すもののみなので、`.husky/pre-commit`にあるものが全てです。
※.git/hooks以下にフックを登録しても実行されますが、gitのバージョン管理下にないためhuskyでの管理が良いと考えます。

## 実行しているもの

### ダウンロード用zipファイルの作成

以下のディレクトリ内のファイル（アイコン画像を想定）に変化があった場合に、zipファイルを作り直します。

- `/src/content/articles/basics/icons/images`

また、同行するreadmeファイル（`/scripts/downloads/readme.txt`）に変更があった場合も作り直します。zipを作成するスクリプトは`/scripts/zipImages.ts`です。

### lint-staged

lint-stagedをとおして、ステージングされているファイルを対象に以下を実行しています。lint-stagedの設定は`lint-staged.config.mjs`にあります。

- `src/`以下の`.astro`/`.ts`/`.tsx`：型チェック（tsc・astro check）、ESLint、Prettier
- `src/`以下の`.md`/`.mdx`：astro check、textlint
- それ以外のファイル：Prettier

型チェックや astro check などプロジェクト全体を対象にするチェックは、`.astro`/`.ts`/`.tsx`と`.md`/`.mdx`を同時にコミットしても1回だけ実行します。

リンクチェック（`/scripts/content-checker/linkChecker.ts`）はコミット時には実行しません。GitHub Actionsで毎週実行しています。
