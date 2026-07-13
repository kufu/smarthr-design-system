# SideNav

同一画面内のビューを縦方向に並べて切り替えるためのナビゲーションコンポーネントです。「コレクションとシングルの2カラム」ページレイアウトのコレクション領域で一覧から選んだオブジェクトの詳細を切り替えるとき、設定画面などで1つの画面内に並ぶビューを切り替えるときに使います。

## import

```ts
import { SideNavItemButton, SideNavItemAnchor, SideNav } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v97.0.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

### SideNavItemButton
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| title | ReactNode | - | - | アイテムのタイトル @deprecated SideNav で items を使う時の props です。children を使ってください。 |
| prefix | ReactNode | - | - | タイトルのプレフィックスの内容。通常、StatusLabelやIconの配置に用います。 |
| suffix | ReactNode | - | - | タイトルのサフィックスの内容。通常、Prefixを使用済みの場合にStatusLabelやChipの配置に用います。 |
| current | boolean | - | - | 選択されているアイテムかどうか |
| size | "S" \| "M" | - | - | アイテムの大きさ |
| onClick | (e: MouseEvent<HTMLAnchorElement \| HTMLButtonElement, MouseEvent>) => void | - | - | アイテムを押下したときに発火するコールバック関数 |

### SideNavItemAnchor
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| title | ReactNode | - | - | アイテムのタイトル @deprecated SideNav で items を使う時の props です。children を使ってください。 |
| prefix | ReactNode | - | - | タイトルのプレフィックスの内容。通常、StatusLabelやIconの配置に用います。 |
| suffix | ReactNode | - | - | タイトルのサフィックスの内容。通常、Prefixを使用済みの場合にStatusLabelやChipの配置に用います。 |
| current | boolean | - | - | 選択されているアイテムかどうか |
| size | "S" \| "M" | - | - | アイテムの大きさ |
| onClick | (e: MouseEvent<HTMLAnchorElement \| HTMLButtonElement, MouseEvent>) => void | - | - | アイテムを押下したときに発火するコールバック関数 |
| href | string | - | ✓ | - |
| elementAs | ElementType | - | - | next/link などのカスタムコンポーネントを指定します。指定がない場合はデフォルトで `a` タグが使用されます。 |

### SideNav
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| items | SideNavItemButtonProps[] | - | - | 各アイテムのデータの配列 @deprecated SideNavItemButton を使ってください |
| size | "S" \| "M" | M | - | 各アイテムの大きさ |
| onClick | (e: MouseEvent<HTMLAnchorElement \| HTMLButtonElement, MouseEvent>, id: string) => void | - | - | アイテムを押下したときに発火するコールバック関数 |
| className | string | - | - | コンポーネントに適用するクラス名 |
| rounded | boolean \| "all" \| "top" \| "bottom" \| "left" \| "right" | - | - | - |

## 実装ルール

SideNav に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > TabBarで代用できないか検討する
- [should] スタックするアイテムが多くなくナビゲーション機能が不要な場合は TabBar の使用を検討する

### 使用上の注意 > 入れ子で使用しない
- [avoid] SideNav の影響範囲内のビューで SideNav を使わない
  - SideNav 内のビューを分割したい場合は TabBar を使う
  - TabBar 内でビューを分割したい場合は SideNav を使う

### モバイル
- [must] SideNav を使った 2 カラムのレイアウトはモバイルに適さないため、ページを分割するか SideNav をドロワーで表示する
