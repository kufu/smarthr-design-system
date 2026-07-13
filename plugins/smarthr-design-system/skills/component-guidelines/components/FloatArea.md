# FloatArea

画面内に固定表示する領域のためのコンポーネントです。スクロール位置によらずフォーム送信ボタンや主要アクションを常時見せるときに使います。

主にモーダルなUI（https://smarthr.design/products/design-patterns/modal-ui/）を作るために使います。

## import

```ts
import { FloatArea } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v97.0.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| primaryButton | ReactNode | - | ✓ | 表示する `Button` または `AnchorButton` コンポーネント |
| secondaryButton | ReactNode | - | - | 表示する `Button` または `AnchorButton` コンポーネント |
| tertiaryButton | ReactNode | - | - | tertiary 領域に表示するボタン |
| responseStatus | ResponseStatusWithoutProcessing | - | - | 操作に対するフィードバックメッセージ |
| bottom | 0 \| 1 \| 2 \| 0.25 \| 0.5 \| 0.75 \| 1.25 \| 1.5 \| 2.5 \| 3 \| 3.5 \| 4 \| 8 \| -0.25 \| -0.5 \| -0.75 \| -1 \| -1.25 \| -1.5 \| -2 \| -2.5 \| -3 \| -3.5 \| -4 \| -8 \| keyof CreatedSpacingTheme | - | - | コンポーネントの下端から、包含ブロックの下端までの間隔（基準フォントサイズの相対値または抽象値） |
| zIndex | number | - | - | コンポーネントの `z-index` 値 |

## 実装ルール

FloatArea に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### レイアウト > 基本的な考え方
- [must] FloatArea は画面内のどの部分が対象の領域なのかを視覚的に示すことを目指して、位置・幅・レイヤー順序を調整する

### レイアウト > レイアウト例 > スクロール固定中
- [must] スクロール固定中の FloatArea は、対象の領域の左右に 0.5（8px）ずつはみ出し、画面の下辺から 1.5（24px）の余白をとった位置に置く

### レイアウト > レイアウト例 > スクロール固定解除後
- [must] スクロール固定解除後の FloatArea は、対象の領域の下辺との間に 1.5（24px）の余白を取る

### モバイル
- [should] モバイルでは FloatArea を画面の下部に固定せず、対象の領域の末尾に置く
- [must] モバイルで FloatArea を画面の下部に固定する場合は、キーボード入力時（入力要素にフォーカス中）に FloatArea の固定を解除して操作領域を確保する

### モバイル > レイアウト > 画面の下部に固定する場合
- [must] モバイルで FloatArea を画面の下部に固定する場合、左右の余白をなくし画面幅いっぱいに表示する
- [must] モバイルで Secondary ボタン（任意）と Primary ボタンは横いっぱいに並べる
- [must] モバイルで Tertiary ボタン（任意）は、Secondary・Primary ボタン群の下部に配置する
