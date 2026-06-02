# TextLink

a要素の代わりに使用する汎用テキストリンクコンポーネントです。本文中にリンクを置くとき、HelpLinkやUpwardLinkで表現できないテキストリンクを提供するときに使います。

## import

```ts
import { TextLink } from 'smarthr-ui'
```

## Props

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| size | "XS" \| "S" \| "M" | - | - | - |
| onClick | (e: MouseEvent<Element, MouseEvent>) => void | - | - | リンクをクリックした時に発火するコールバック関数 |
| prefix | ReactNode | - | - | テキストの前に表示するアイコン |
| suffix | ReactNode | - | - | テキストの後ろに表示するアイコン |
| elementAs | ElementType | - | - | TextLinkを利用しつつnext/linkなどと併用する場合に指定する |
| ref | any | - | - | - |

## 実装ルール

### design-system-guideline-prohibit-double-icons
要素の前後両方にアイコンの使用を禁止するルールです。`Button` や `TextLink` において、`prefix` と `suffix` が同時に設定されている場合、エラーとなります。

✅ OK:

```jsx
<Button>hoge</Button>
<Button suffix={SUFFIX}>hoge</Button>
<Button prefix="PREFIX">hoge</Button>
<TextLink>hoge</TextLink>
<TextLink suffix="SUFFIX">hoge</TextLink>
<TextLink prefix={PREFIX}>hoge</TextLink>
<StyledButton>hoge</StyledButton>
<StyledLink>hoge</StyledLink>
<Input prefix={PREFIX} suffix={SUFFIX} />
```

詳細は eslint-plugin-smarthr の各ルール README を参照してください。

## 使い方チェックリスト

### 使用上の注意 > ボタンとして使わない
- [avoid] TextLink はページを移動するためのリンク用途で使い、それ以外の処理を実行するボタンとして使わない
- [must] 視覚的優先度の低いボタンを表現したい場合は Tertiary ボタンを使う

### レイアウト > アイコンの有無 > アイコン付きテキストリンク
- [must] アイコンは左右どちらかにのみ指定する

### レイアウト > アイコンの有無 > アイコン付きテキストリンク > アイコン付き（左）
- [should] アイコン付き（左）はテキストリンクを押した移動先の意味・内容を想起させるために使用する

### レイアウト > アイコンの有無 > アイコン付きテキストリンク > アイコン付き（右）
- [should] アイコン付き（右）はテキストリンクを押したときの挙動を表現するために使用する

### デザインパターン > 特別なテキストリンク > 新規ウィンドウで開くテキストリンク
- [should] 別画面に移動することで現在の画面での入力や作業が中断され作業効率が著しく落ちる場合は、新規ウィンドウ（新規タブ）でテキストリンクを開くことを検討する
- [avoid] 新規ウィンドウで開くテキストリンクには `アイコン付き（左）`（プレフィックス）を指定しない

### デザインパターン > 特別なテキストリンク > ヘルプセンターを開くテキストリンク
- [should] ヘルプセンターを開くテキストリンクには HelpLink を使う

### デザインパターン > 特別なテキストリンク > 一階層上のコンテンツに戻るテキストリンク
- [should] 一階層上のコンテンツに戻るテキストリンクには UpwardLink を使う
- [avoid] UpwardLink には `アイコン付き（右）`（サフィックス）を指定しない
