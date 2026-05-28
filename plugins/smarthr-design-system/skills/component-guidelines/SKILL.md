---
name: component-guidelines
description: >-
  Guides correct usage of smarthr-ui React components.
  Helps select the right component, verify props and API,
  and follow design system conventions and eslint-plugin-smarthr rules.
  Use when writing or reviewing JSX/TSX that imports from smarthr-ui,
  choosing between similar components, or fixing eslint-plugin-smarthr violations.
paths: "**/*.tsx, **/*.jsx"
---

# smarthr-ui コンポーネントガイド

smarthr-ui のコンポーネントを正しく選択・使用するためのガイド。

## どのコンポーネントを使うか迷っているとき

→ [component-selector.md](component-selector.md) を参照
  UI 要件からコンポーネントを選定するための対応表。

## 対象コンポーネントが分かっているとき

→ `components/<ComponentName>.md` を参照
  コード中の import 名がそのままファイル名になっている。
  例: `import { ActionDialog } from 'smarthr-ui'` → `components/ActionDialog.md`

## ガイドの構成

各コンポーネントガイドは 3 層で構成される:
- **Props・型情報**: smarthr-ui の公開 API（自動生成）
- **実装ルール**: eslint-plugin-smarthr のルールに基づく Do/Don't
- **使い分けチェックリスト**: デザインシステムの運用知識（一部未整備）
