---
name: dropdown-menu-button
description: "同じ対象に関連する複数の操作をまとめてドロップダウン表示するメニューボタンコンポーネントです。編集・複製・削除など、オブジェクトに対する複数アクションをまとめるときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer3
---

同じ対象に関連する複数の操作をまとめてドロップダウン表示するメニューボタンコンポーネントです。編集・複製・削除など、オブジェクトに対する複数アクションをまとめるときに使います。

## import

```ts
import { DropdownMenuGroup, DropdownMenuButton } from 'smarthr-ui'
```

## Props

### DropdownMenuGroup
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| name | ReactNode | - | - | - |

### DropdownMenuButton
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| trigger | ReactNode \| { children: ReactNode; size?: ButtonProps; onlyIcon?: boolean \| { component?: ComponentType<any>; }; } | - | ✓ | 引き金となるボタン |
| children | ReactNode \| ReactElement<any, string \| JSXElementConstructor<any>> \| ReactElement<any, string \| JSXElementConstructor<any>> \| ReactElement<...> \| ReactNode \| ReactElement<any, string \| JSXElementConstructor<any>> \| ReactElement<any, string \| JSXElementConstructor<any>> \| ReactElement<...>[] | - | ✓ | 操作群 |
| onOpen | () => void | - | - | ドロップダウンメニューが開かれた際のイベント |
| onClose | () => void | - | - | ドロップダウンメニューが閉じられた際のイベント |
| ref | Ref<HTMLButtonElement> | - | - | - |

## 実装ルール

DropdownMenuButton に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > 操作の個数
- [should] DropdownMenuButton の操作はひと目で把握できるようできるだけ少ない個数にする

### 使用上の注意 > 操作の順序
- [should] DropdownMenuButton の操作は使用頻度が高い順に並べる
  - 典型的な順序の例: 編集 → 複製 → 削除
- [must] 破壊的なアクション（例: オブジェクトの削除）は操作の順序を下げて配置する

### レイアウト > [WIP] モバイル > 操作項目の高さは通常サイズのボタンに揃える
- [must] モバイルでは、ドロップダウンパネル内の操作項目の高さを通常サイズのボタンに揃える

### レイアウト > [WIP] モバイル > 横幅は画面幅の2/3程度までに収まるように調整する
- [must] モバイルでは、ドロップダウンパネルの横幅を画面幅の 2/3 程度までに収まるように調整する

### レイアウト > [WIP] モバイル > 縦幅は画面内に収まるように調整する
- [must] モバイルでは、ドロップダウンパネルの縦幅を画面内に収まるように調整し、必要に応じてスクロールできるようにする

### デザインパターン > A. 単一のオブジェクトに対する操作
- [must] トリガーのラベルを `{オブジェクト名}の操作` とする

### デザインパターン > B. 単一のオブジェクトに対する操作(オブジェクト名省略)
- [should] 操作の対象がレイアウト上明らかなとき・狭い場所にレイアウトするときに使う
- [must] トリガーのラベルを `操作` にする

### デザインパターン > C. 同一の操作
- [must] トリガーのラベルを操作をまとめるラベルにする

### デザインパターン > D. 異なる複数の操作
- [must] トリガーのラベルを `その他の操作` とする

### デザインパターン > E. ラベル省略(デスクトップでは非推奨)
- [avoid] デスクトップでは利用を避ける
- [avoid] モバイルでも可能な限り利用を避ける
- [avoid] 標準アイコン（`FaEllipsisIcon`）の変更は避ける
- [must] 何のボタンか識別できるよう必ず `trigger.children` を設定する

### 状態 > 無効(disabled) > ドロップダウンパネルの操作の無効
- [must] ドロップダウンパネル内の操作を無効にする場合、Button の `disabledReason` を使って無効状態の理由を表示する
