---
name: component-guidelines
description: >-
  Guides correct usage of smarthr-ui React components.
  Helps select the right component, verify props and API,
  and follow design system conventions and eslint-plugin-smarthr rules.
  Use when writing or reviewing JSX/TSX that imports from smarthr-ui,
  choosing between similar components, or fixing eslint-plugin-smarthr violations.
paths: ["**/*.tsx", "**/*.jsx"]
---

# smarthr-ui コンポーネントガイド

smarthr-ui のコンポーネントを正しく選択・使用するためのガイド。

**重要**: smarthr-ui に関する回答は、事前知識のみで答えず、必ず下記の該当ドキュメントを実際に読んでから回答すること。Props・実装ルール・使い分けは頻繁に更新されるため、記憶に頼ると古い情報や誤った API を案内する恐れがある。

## どのコンポーネントを使うか迷っているとき

使うコンポーネントが未確定なら、**まず [component-selector.md](component-selector.md) を読む**こと（事前知識でコンポーネントを列挙しない）。UI 要件からコンポーネントを選定するための対応表があり、ここで対象を特定してから次のステップに進む。

## 対象コンポーネントが分かっているとき

**`components/<ComponentName>.md` を必ず読んでから**実装・回答すること。
コード中の import 名がそのままファイル名になっている。
例: `import { ActionDialog } from 'smarthr-ui'` → `components/ActionDialog.md`

## ガイドの構成

各コンポーネントガイドは 3 層で構成される:
- **Props・型情報**: smarthr-ui の公開 API（自動生成）
- **実装ルール**: eslint-plugin-smarthr のルールに基づく Do/Don't
- **使い分けチェックリスト**: デザインシステムの運用知識（一部未整備）

## smarthr-ui のバージョンについて

各ガイドの Props・型情報は、ガイド生成時点の smarthr-ui バージョンを基準にしている（基準バージョンは各ガイドの Props セクションと [component-selector.md](component-selector.md) の冒頭に明記）。利用しているプロジェクトの smarthr-ui バージョンが基準と異なる場合、props がずれていることがある（例: 型・必須・デフォルト値・追加/削除された props）。

その場合は **実際の型定義を正とすること**:
- エディタの型補完
- プロジェクトの `node_modules/smarthr-ui` の `.d.ts` / `metadata.json`

ガイドの props と実装が食い違って表示・挙動が崩れるときは、まずバージョン差異を疑う。
