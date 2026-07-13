# TabBar

異なるオブジェクトやビューを横方向のタブで切り替えるためのコンポーネントです。同一画面内で並列関係にあるビューを切り替えるとき、影響範囲を下線で明確にしながらタブを並べるときに使います。

## import

```ts
import { TabItem, TabBar } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v97.0.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

### TabItem
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| suffix | ReactNode | - | - | ボタン内の末尾に表示する内容 |
| selected | boolean | false | - | `true` のとき、タブが選択状態のスタイルになる |
| disabled | boolean | - | - | `true` のとき、タブを無効状態にしてクリック不能にする |
| disabledReason | { icon?: ReactNode; message: ReactNode; } | - | - | 無効な理由 |
| onClick | (e: MouseEvent<HTMLButtonElement, MouseEvent>) => void | - | ✓ | タブをクリックした時に発火するコールバック関数 |

### TabBar
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| bordered | boolean | - | - | `true` のとき、TabBar に下線を表示する |

## 実装ルール

TabBar に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > 同じオブジェクトの異なる状態を切り替えて表示する目的に使用しない
- [should] TabBar は異なるオブジェクトやビューを切り替えるために使用し、同じオブジェクトの異なる状態を切り替えたい場合は SegmentedControl の使用を検討する

### 使用上の注意 > ビューへの影響範囲を明確にする
- [must] TabBar を使用する際は、影響するビューの範囲を明確にする
  - 基本的には、下線を設けることで影響するビューの範囲を明確にする

### レイアウト > IconやBadgeの有無
- [must] TabBarItem 内の Icon には、視覚情報と同等の情報を代替テキストなどを使って提供する

### モバイル > スクロールですべてのタブを操作できるようにする
- [should] モバイル表示など横幅の狭い画面で TabBar が画面に収まらない場合、Reel を使って水平方向にスクロールできるようにする

### モバイル > タブが少ない場合の表示
- [should] タブが 2〜3 程度の場合、TabBar を画面幅いっぱいに広げて各タブを均等に配置する
  - タブに表示するテキストが長い場合は、このパターンには適していない
