# GitHub Actionsで実行できるワークフロー

## PR作成時に実行するワークフロー

- `lint.yml`

mainブランチに対するPRの作成時に、`pnpm lint`を実行します。ESLint、コードブロックの型チェック（tsc）、astro check、textlintです。

- `validate-skills.yml`

PRの作成・更新時に、`checklist.yaml`の形式検証、カバー率のチェック、`index.mdx`の変更が`checklist.yaml`に反映されているかのチェックを実行します。

## 毎週のコンテンツチェック

毎週月曜日に以下を実行します。

- `link-check.yml`
- `storybook-check.yml`

リンク切れやsmarthr-uiのコンポーネントに関するデータが取得できているかをチェックします。

## mainへのマージ時に実行するワークフロー

- `generate-skills.yml`

コンポーネントの`index.mdx`や`checklist.yaml`などが変更されたときに、`plugins/smarthr-design-system/skills/`以下のコンポーネントガイドを再生成し、差分があればmainへ直接コミットします。

## デプロイ関連

Netlifyのビルドを手動でトリガーするワークフローです。

### deploy-to-netlify.yml

ビルド後の`dist`ディレクトリをNetlifyにデプロイします。

### netlify-clear-cache-deploy.yml

Netlify上でのビルドをトリガーします。その際、キャッシュクリア（キャッシュを使わないビルド）を指定します。mainブランチでもPRブランチでもキャッシュクリアできるようになっています。ローカルではビルドできているものが、Netlify上のPRプレビューや本番環境でビルドエラーになる場合などを想定しています。
