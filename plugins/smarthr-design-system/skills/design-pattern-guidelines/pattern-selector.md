# デザインパターン セレクター

UI要件からどのパターンドキュメントを読むべきかを決定するための対応表。
**事前知識で実装せず、必ず対応するファイルを読んでから実装すること。**

## ページレイアウト

| UI要件 | 読むべきファイル |
|--------|----------------|
| テーブルでオブジェクトを一覧表示する（よくあるテーブル） | `patterns/page-layout.mdx`（コレクション（テーブル）セクション） + `patterns/smarthr-table.mdx` |
| リストでオブジェクトを一覧表示する（よくあるリスト） | `patterns/page-layout.mdx`（コレクション（リスト）セクション） + `patterns/smarthr-list.mdx` |
| オブジェクトの詳細を1カラムで表示する | `patterns/page-layout.mdx`（シングル（1カラム）セクション） |
| オブジェクトの詳細を2カラムで表示する | `patterns/page-layout.mdx`（シングル（2カラム）セクション） |
| サイドナビゲーション付きページ | `patterns/page-layout.mdx`（サイドナビゲーションとコンテンツの2カラムセクション） |
| 余白の取り方・spacing トークン | `patterns/spacing-layout-pattern.mdx` |
| 視覚的グルーピング・Base/Section の使い分け | `patterns/visual-grouping.mdx` |
| 視線誘導 | `patterns/visual-guidance.mdx` |
| モバイルレイアウト | `patterns/mobile-friendly-layout.mdx` |

## テーブル・リスト操作

| UI要件 | 読むべきファイル |
|--------|----------------|
| テーブルの構成・見出し・操作エリア・ボタン配置 | `patterns/smarthr-table.mdx` |
| テーブル内の一括操作（チェックボックス＋まとめて操作） | `patterns/table-bulk-action.mdx` |
| リストの構成 | `patterns/smarthr-list.mdx` |

## ダイアログ・モーダル・フロー

| UI要件 | 読むべきファイル |
|--------|----------------|
| 削除ダイアログ | `patterns/delete-dialog.mdx` |
| モーダルなUI（ダイアログ・ドロワー全般） | `patterns/modal-ui.mdx` |
| ワンクッション必要な操作（確認ステップ） | `patterns/confirmation-step.mdx` |
| ウィザード（多ステップフォーム） | `patterns/wizard.mdx` |
| フィードバック（成功・エラー・処理中の通知） | `patterns/feedback.mdx` |
| バックグラウンド処理の結果表示 | `patterns/background-jobs-results.mdx` |

## フォーム・入力

| UI要件 | 読むべきファイル |
|--------|----------------|
| デフォルト値の表示 | `patterns/default_value.mdx` |
| 値がない項目の表示（空欄・未設定） | `patterns/empty-data.mdx` |
| 選択コンポーネントの使い分け（Select/RadioButton/Checkboxなど） | `patterns/selection-component-usage.mdx` |

## 権限・アクセス制御

| UI要件 | 読むべきファイル |
|--------|----------------|
| 権限による表示制御 | `patterns/access-control-pattern.mdx` |
| 権限設定UI | `patterns/permissions-settings.mdx` |
| 「基本機能」の共通設定 | `patterns/main-admin-core-features.mdx` |
| 「基本機能」の共通設定の操作権限項目 | `patterns/access-control-setting-pattern-core-features.mdx` |
| 企業アカウント選択 | `patterns/select-company-account.mdx` |

## 注意

- 各mdxファイルには `<DoAndDont type="dont">` によるアンチパターンが含まれている場合がある。mustで確認すること。
- 上記に該当しないパターンは `src/content/articles/products/design-patterns/` 以下を直接参照すること。
