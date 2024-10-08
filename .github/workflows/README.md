# GitHub Actionsで実行できるワークフロー

## PR作成時に実行するワークフロー

- `lint.yml`

mainブランチに対するPRの作成時に、`yarn lint`を実行します。ESLint/Stylelint/textlintです。

## 毎週のコンテンツチェック

毎週月曜日に以下を実行します。

- `link-check.yml`
- `storybook-url-check.yml`

リンク切れやsmarthr-uiのコンポーネントに関するデータが取得できているかをチェックします。

## デプロイ関連

Netlifyのビルドを手動でトリガーするワークフローです。

### deploy-to-netlify.yml

ビルド後の`public`ディレクトリをNetlifyにデプロイします。

### netlify-clear-cache-deploy.yml

Netlify上でのビルドをトリガーします。その際、キャッシュクリア（キャッシュを使わないビルド）を指定します。mainブランチでもPRブランチでもキャッシュクリアできるようになっています。ローカルではビルドできているものが、Netlify上のPRプレビューや本番環境でビルドエラーになる場合などを想定しています。
