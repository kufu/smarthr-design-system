---
name: language-switcher
description: "表示言語を切り替えるUIを置くとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するときに使う。smarthr-ui の LanguageSwitcher コンポーネントの使い方ガイド。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

## import

```ts
import { LanguageSwitcher } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| narrow | boolean | - | - | - |
| localeMap | Partial<Record<"ja" \| "en-us" \| "id-id" \| "pt" \| "vi" \| "ko" \| "zh-cn" \| "zh-tw" \| "ja-easy", string>> | - | ✓ | - |
| locale | string | - | - | - |
| defaultLocale | string | - | - | - |
| decorators | DecoratorsType<DecoratorKeyTypes> | - | - | コンポーネント内の文言を変更するための関数を設定 |
| onLanguageSelect | (code: string) => void | - | - | 言語切替UIで言語を選択した時に発火するコールバック関数 |
| enableNew | boolean | - | - | - |
| invert | boolean | - | - | - |

## 実装ルール

LanguageSwitcher に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

checklist.yaml は未作成です。Layer 3（使い方チェックリスト）は今後追加されます。
