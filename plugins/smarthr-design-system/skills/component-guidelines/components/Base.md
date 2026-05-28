# Base

矩形で視覚的に要素をグルーピングするコンポーネントです。ページ背景上でコンテンツを囲んで「セクション」領域として示すときに使います。

## import

```ts
import { Base } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| overflow | "hidden" \| "auto" \| "clip" \| "scroll" \| "visible" \| { x: "hidden" \| "auto" \| "clip" \| "scroll" \| "visible"; y: "hidden" \| "auto" \| "clip" \| "scroll" \| "visible"; } | - | - | コンテンツが要素内に収まらない場合の処理方法 |
| radius | "s" \| "m" | - | - | - |
| padding | Gap \| { block?: Gap; inline?: Gap; narrowModeBlock?: Gap; narrowModeInline?: Gap; } | - | - | 境界とコンテンツの間の余白 |
| layer | 0 \| 1 \| 2 \| 3 \| 4 | - | - | - |

## 実装ルール

Base に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > レイヤー順序に注意する
- [avoid] レイヤー順序が 2 以上の要素（InformationPanel など）を Base の上に配置しない
- [should] Base の上で矩形によるグルーピングをする場合は基本的に BaseColumn を使う
- [must] レイアウト上 Base を重ねる必要がある場合は、背景色が同色（WHITE）にならないよう OVER_BACKGROUND などに変更してレイヤー順序を表現する
