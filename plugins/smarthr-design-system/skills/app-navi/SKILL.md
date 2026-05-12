---
name: app-navi
description: "smarthr-ui の AppNaviDropdownMenuButton / AppNaviDropdown / AppNaviCustomTag / AppNaviButton / AppNaviAnchor / AppNavi を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。プロダクト内の主要な機能を切り替えるためのコンポーネントです。機能の切り替えだけでなく、プロダクト全体に影響を及ぼす頻繁に行なう操作を埋め込めます。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

プロダクト内の主要な機能を切り替えるためのコンポーネントです。機能の切り替えだけでなく、プロダクト全体に影響を及ぼす頻繁に行なう操作を埋め込めます。

レイアウトなどは[AppHeader](/products/components/app-header/)を参照してください。

## import

```ts
import { AppNaviDropdownMenuButton, AppNaviDropdown, AppNaviCustomTag, AppNaviButton, AppNaviAnchor, AppNavi } from 'smarthr-ui'
```

## Props

### AppNaviDropdownMenuButton
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| label | ReactNode | - | ✓ | 引き金となるボタンラベル |
| onOpen | () => void | - | - | - |
| onClose | () => void | - | - | - |

### AppNaviDropdown
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| dropdownContent | ReactNode | - | ✓ | ドロップダウンのコンテンツ |
| icon | ComponentType<any> | - | - | 表示するアイコンタイプ |
| current | boolean | - | - | アクティブ状態であるかどうか |
| displayCaret | boolean | - | - | - |

### AppNaviCustomTag
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| tag | ComponentType<any> | - | ✓ | このボタンのカスタムタグ |
| icon | ComponentType<any> | - | - | 表示するアイコンタイプ |
| current | boolean | - | - | アクティブ状態であるかどうか |

### AppNaviButton
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| icon | ComponentType<any> | - | - | 表示するアイコンタイプ |
| current | boolean | - | - | アクティブ状態であるかどうか |
| onClick | (e: MouseEvent<HTMLButtonElement, MouseEvent>) => void | - | - | クリックイベントのハンドラ |

### AppNaviAnchor
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| href | string | - | - | アンカーの href |
| icon | ComponentType<any> | - | - | 表示するアイコンタイプ |
| current | boolean | - | - | アクティブ状態であるかどうか |
| elementAs | ElementType | - | - | next/link などのカスタムコンポーネントを指定します。指定がない場合はデフォルトで `a` タグが使用されます。 |
| ref | any | - | - | - |

### AppNavi
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| label | ReactNode | - | - | ラベルのテキスト |
| buttons | (AppNaviDropdownProps \| AppNaviCustomTagProps \| AppNaviButtonProps \| AppNaviAnchorProps)[] | - | - | 表示するボタンの Props の配列 @deprecated AppNaviButton などのコンポーネントを組み合わせて組み上げてください |
| displayDropdownCaret | boolean | - | - | ドロップダウンにキャレットを表示するかどうか @deprecated キャレットの省略は非推奨です |
| additionalArea | ReactNode | - | - | 追加の領域 |

## 実装ルール

AppNavi に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
