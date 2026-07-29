# SmartHR Design System ドキュメントサイト

SmartHRのデザインシステムドキュメントサイト（Astro + MDX）。smarthr-uiのコンポーネントの使い方・ガイドラインを公開している。

## コンポーネントドキュメントの構造

### ファイルの場所
```
src/content/articles/products/components/{コンポーネント名（ケバブケース）}/
├── index.mdx        # メインドキュメント
├── _check/          # コード例の自動検証用（自動生成）
├── _components/     # ページ専用のカスタムコンポーネント（任意）
└── images/          # 画像（任意）
```

### index.mdx の基本構造

```mdx
---
title: 'ComponentName'
description: 'コンポーネントの一言説明。'
---
import ComponentPropsTable from '@/components/article/ComponentPropsTable.astro'
import ComponentStory from '@/components/article/ComponentStory.astro'
import { ComponentName, ... } from 'smarthr-ui'

コンポーネントの概要説明（1〜2文）。

<ComponentStory name="ComponentName" />

## 使用上の注意

...

## （機能・バリアントの説明セクション）

コード例は ```tsx editable ブロックで書く。

## props

<ComponentPropsTable name="ComponentName" />
```

### 新コンポーネントページを作成するときのルール
- ディレクトリ名はケバブケース（例：`error-screen`、`app-navi`）
- ComponentStoryのnameはPascalCase（Storybookのコンポーネント名と一致させる）
- ComponentPropsTableのnameもPascalCase
- コード例には必ず `className="shr-w-full"` などでレイアウト調整を入れる
- 既存ページ（例：`error-screen/index.mdx`）を参考に同じトーン・構成で書く

## smarthr-ui アップグレード時の作業

`pnpm upgrade:smarthr-ui` を実行すると以下が自動処理される：
1. smarthr-ui を最新バージョンにアップグレード
2. `public/` に `smarthr-ui.css` をコピー
3. コンポーネントサムネイルを再生成

その後、リリースノートの「プロダクト側で対応が必要な事項」に記載された内容に従い、ドキュメントサイトを修正する。

## よく参照するパス
- コンポーネントドキュメント: `src/content/articles/products/components/`
- デザインパターン: `src/content/articles/products/design-patterns/`
- デザイントークン: `src/content/articles/products/design-tokens/`
