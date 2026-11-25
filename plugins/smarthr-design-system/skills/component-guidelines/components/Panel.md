# Panel

ページ背景の上に一段重ねて置き、矩形で視覚的に要素をグルーピングするコンポーネントです。ページ背景上でコンテンツを囲んで「セクション」領域として示すときに使います。

## import

```ts
import { Panel } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v103.1.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| padding | Gap \| { block?: Gap; inline?: Gap; } | - | - | 境界とコンテンツの間の余白 |
| overflow | "auto" \| "hidden" \| "visible" \| "clip" \| "scroll" \| { x: "auto" \| "hidden" \| "visible" \| "clip" \| "scroll"; y: "auto" \| "hidden" \| "visible" \| "clip" \| "scroll"; } | - | - | コンテンツが要素内に収まらない場合の処理方法 |
| radius | "s" \| "m" | - | - | 角丸の大きさ |
| layer | 0 \| 1 \| 2 \| 3 \| 4 | - | - | 影のレイヤー |
| bgColor | "WHITE" \| "OVER_BACKGROUND" | - | - | 背景色 |

## 実装ルール

### design-system-guideline-prohibit-information-panel-in-white-bg
InformationPanelを白背景に配置することを禁止します。

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

> ℹ️ 各項目は SmartHR Design System の基準であり、守らなければならない規則ではありません。`[must]` は基本的に合わせる基準、`[should]` は状況に応じて判断する推奨、`[avoid]` は避けることを推奨する使い方です。`[must]` に合わせない場合や `[avoid]` の使い方を採用する場合は、理由を明示してください。

### 使用上の注意 > レイヤー順序に注意する
- [avoid] レイヤー順序が 2 以上の要素（InformationPanel など）を Panel の上に配置しない
- [should] Panel の上で矩形によるグルーピングをする場合は基本的に Groupbox を使う
- [must] レイアウト上 Panel を重ねる必要がある場合は、背景色が同色（WHITE）にならないよう OVER_BACKGROUND などに変更してレイヤー順序を表現する
