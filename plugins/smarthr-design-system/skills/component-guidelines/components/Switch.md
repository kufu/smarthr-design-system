# Switch

オン/オフを即時に切り替えるスイッチコンポーネントです。機能の有効/無効や表示切替をユーザー操作で即座にシステムに反映させるときに使います。

## import

```ts
import { Switch } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| unrecommendedLabelHidden | boolean | - | - | ラベルを視覚的に隠すかどうか |

## 実装ルール

Switch に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > SegmentedControl との違い
- [must] 異なる状態（オン/オフ以外）を表す場合は Switch ではなく SegmentedControl を使う

### 使用上の注意 > ラベルの表示
- [must] Switch にはラベルをつける
  - 周囲のコンテキストによって省略できる
  - Switch の状態が切り替わってもラベルは変更しない

### レイアウト > [WIP] モバイル
- [must] モバイルでは Switch のサイズを大きくする
