---
name: dropdown-menu-button
description: "smarthr-ui の DropdownMenuGroup / DropdownMenuButton を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。同じ対象に関連する複数の操作をまとめてドロップダウン表示するメニューボタンコンポーネントです。編集・複製・削除など、オブジェクトに対する複数アクションをまとめるときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
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

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
