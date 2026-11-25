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

## ガイドラインの位置づけ

このガイドが伝える使い分けや使い方チェックリストは、SmartHR Design System の基準・ガイドラインであり、守らなければならない規則ではない。プロダクト開発を助けるための「補助線」で、どこまで合わせるかは開発の現場の判断が優先される（[ガイドラインとの向き合いかた](https://smarthr.design/products/#h2-2)）。

- 「必ず読む」は、記憶ではなく最新の基準を確認するための指示であり、「必ず従う」という意味ではない。
- 実装では基準に沿うことを既定とする。ただし、既存画面との整合・要件・ユーザーの指示など、基準に合わせない理由がある場合は外してよい。そのときは基準との差分と理由を明示する。
- 基準が書かれていないことは、その使い方を禁止しているという意味ではない。
- コードをレビューするときは、基準との差分を「違反」と断定せず、差分と、意図を確認する問いとして伝える。
- 基準に合わせるか迷うときは、[基準判定フローチャート](https://smarthr.design/products/usability/usability-checklist/#h3-6)の判断の流れを参考にする。

Props・型情報はコンポーネントの事実であり、判断の対象ではない。実装ルール（eslint-plugin-smarthr）は、利用しているプロジェクトの lint 設定に従う。

## どのコンポーネントを使うか迷っているとき

使うコンポーネントが未確定なら、**まず [component-selector.md](component-selector.md) を読む**こと（事前知識でコンポーネントを列挙しない）。UI 要件からコンポーネントを選定するための対応表があり、ここで対象を特定してから次のステップに進む。

## 対象コンポーネントが分かっているとき

**`components/<ComponentName>.md` を必ず読んでから**実装・回答すること。
コード中の import 名がそのままファイル名になっている。
例: `import { ActionDialog } from 'smarthr-ui'` → `components/ActionDialog.md`

ガイドの冒頭に「⚠️ **非推奨**」とある場合、そのコンポーネントは新しく使わず、案内されている代替コンポーネントのガイドを読んでから実装すること。既存コードで使われている場合も、代替コンポーネントへの置き換えを提案する。
例: `import { Base } from 'smarthr-ui'` → `components/Base.md`（非推奨。`Panel` に名称変更）→ `components/Panel.md`

## ガイドの構成

各コンポーネントガイドは 3 層で構成される:
- **Props・型情報**: smarthr-ui の公開 API（自動生成）
- **実装ルール**: eslint-plugin-smarthr のルールに基づく Do/Don't
- **使い分けチェックリスト**: デザインシステムの運用知識（一部未整備）。各項目の `[must]` / `[should]` / `[avoid]` は基準の強さを表す（凡例は各ガイドのチェックリスト冒頭にある）

## smarthr-ui のバージョンについて

各ガイドの Props・型情報は、ガイド生成時点の smarthr-ui バージョンを基準にしている（基準バージョンは各ガイドの Props セクションと [component-selector.md](component-selector.md) の冒頭に明記）。利用しているプロジェクトの smarthr-ui バージョンが基準と異なる場合、props がずれていることがある（例: 型・必須・デフォルト値・追加/削除された props）。

その場合は **実際の型定義を正とすること**:
- エディタの型補完
- プロジェクトの `node_modules/smarthr-ui` の `.d.ts` / `metadata.json`

ガイドの props と実装が食い違って表示・挙動が崩れるときは、まずバージョン差異を疑う。
