---
name: common
description: "smarthr-ui の Translate / commonButtonClassNameGenerator / CommonButton / AppLauncherSortDropdown / AppLauncherFeatures を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。smarthr-ui の Translate / commonButtonClassNameGenerator / CommonButton / AppLauncherSortDropdown / AppLauncherFeatures コンポーネントの使い方ガイド。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

## import

```ts
import { Translate, commonButtonClassNameGenerator, CommonButton, AppLauncherSortDropdown, AppLauncherFeatures } from 'smarthr-ui'
```

## Props

### Translate
（固有 Props なし）

### commonButtonClassNameGenerator
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| prefix | boolean | - | - | - |
| current | boolean | - | - | - |
| rounded | boolean | - | - | - |
| boldWhenCurrent | boolean | - | - | - |
| class | ClassNameValue | - | - | - |
| className | ClassNameValue | - | - | - |

### CommonButton
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| elementAs | "a" \| "button" | - | ✓ | - |
| prefix | ReactNode | - | - | - |
| current | boolean | - | - | - |
| boldWhenCurrent | boolean | - | - | - |

### AppLauncherSortDropdown
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| sortType | "default" \| "name/asc" \| "name/desc" | - | ✓ | - |
| onSelectSortType | (sortType: "default" \| "name/asc" \| "name/desc") => void | - | ✓ | - |

### AppLauncherFeatures
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| features | { id: string; name: string; url: string; favorite: boolean; position?: number; }[] | - | ✓ | - |
| page | "all" \| "favorite" | - | ✓ | - |

## 実装ルール

common に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
