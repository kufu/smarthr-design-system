# content-checker

コンテンツ内のリンク切れなどをある程度自動的にチェック・修復するためのスクリプトです。

## linkChecker.ts

MDXファイル内のリンク（アンカーリンク含む）と画像について、リンク切れがないかチェックします。また、末尾のスラッシュがない場合は追加します。外部リンクはチェックの対象外です（`https://smarthr.design/`から始まるサイト内リンクはチェックします）。

### 使い方

#### 手動での実行
```sh
pnpx tsx scripts/content-checker/linkChecker.ts --fix ./src/content/articles/**/*.mdx
```

- `--fix`オプションをつけると、末尾スラッシュについては自動的に修正します。
- 対象ファイルはglob形式で複数指定できます。指定がない場合は`src/content/articles/**/*.mdx`が対象になります。

#### 自動実行
- コミット時に、ステージングされているファイルを対象に自動的に実行します。
- GitHub Actionsにより毎週月曜日の午前11時（UTC+9）にも実行されます。

## storybookUrlChecker.ts

デフォルトバージョン（`package.json`に書かれているバージョン）のsmarthr-uiを対象に、以下をチェックします。

- GitHubのAPIからそのバージョンのコミットハッシュが取得できるか
- `src/content/articles/products/components/**/*.mdx`のファイルを対象に、そこに埋め込まれている`<ComponentStory>`コンポーネントの`name`propsに指定された名前のUIコンポーネントが、Storybookの`stories.json`に存在するか
- またそのコンポーネントのソースコードがGitHub上に存在するか

データ取得のコードは`src/lib/getUIData`のものを`import`して使っているので、動作検証の面もあります。UI側で何か変更があった場合など、うまく取得できなくなるかもしれません。

### 使い方

#### 手動での実行
```
pnpx tsx ./scripts/content-checker/storybookUrlChecker.ts
```

指定できるオプションはありません。

#### 自動実行
- GitHub Actionsにより毎週月曜日の午前11時30分（UTC+9）にも実行されます。
