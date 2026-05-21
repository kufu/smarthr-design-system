---
name: empty-table-body
description: "テーブルにデータがない場合に空状態を表示するtbodyコンポーネントです。空状態のメッセージを提示するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer3
---

テーブルにデータがない場合に空状態を表示するtbodyコンポーネントです。空状態のメッセージを提示するときに使います。

`table`要素の代替として表形式でデータを表示するためのコンポーネントです。データを行列で一覧表示するとき、レコードを並べて比較するビューを提示するときに使います。

## import

```ts
import { EmptyTableBody } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| padding | any | - | - | 境界とコンテンツの間の余白 |
| ref | Ref<HTMLTableSectionElement> | - | - | - |

## 実装ルール

EmptyTableBody に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### アクセシビリティ > セル内にチェックボックスやラジオボタンをそのまま配置しない
- [avoid] セルの内部に Checkbox や RadioButton をそのまま配置せず、TdCheckbox / ThCheckbox / TdRadioButton を利用する

### アクセシビリティ > TdCheckboxおよびTdRadioButtonでは行を特定できる要素をIDで参照する
- [must] TdCheckbox および TdRadioButton を利用する場合は `aria-labelledby` 属性を必ず指定し、それだけで行を一意に判別できる要素への ID 参照を指定する
- [must] オブジェクト名だけで一意に判別できないオブジェクトでは、複数の要素の ID 参照をスペース区切りで指定する
