---
name: smarthr-ui-language-switcher
description: "LanguageSwitcherは、表示言語を切り替えるためのコンポーネントです。多言語対応したアプリケーションで利用者に言語選択UIを提供するときに使います。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1
---

表示言語を切り替えるためのコンポーネントです。多言語対応したアプリケーションで利用者に言語選択UIを提供するときに使います。

通常はAppHeaderの中に組み込んで使用します。詳細は[AppHeader](/products/components/app-header/)を参照してください。

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

使い方チェックリスト（Layer 3）は設定されていません。
