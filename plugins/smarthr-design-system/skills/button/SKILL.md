---
name: button
description: "smarthr-ui の UnstyledButton / DisabledReason / ButtonWrapper / Button / AnchorButton を使うとき、props を選ぶとき、関連するアクセシビリティ・デザインシステムのルールを確認するとき、コンポーネントの組み合わせを判断するときに使う。Buttonコンポーネントは、押すことで特定の操作や処理を実行するコンポーネントです。"
metadata:
  version: "1.0.0"
  source: smarthr-design-system
  generated-from: layer1+layer2+layer3
---

Buttonコンポーネントは、押すことで特定の操作や処理を実行するコンポーネントです。

## import

```ts
import { UnstyledButton, DisabledReason, ButtonWrapper, Button, AnchorButton } from 'smarthr-ui'
```

## Props

### UnstyledButton
（固有 Props なし）

### DisabledReason
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| button | Element | - | ✓ | - |
| disabledReason | { icon?: FunctionComponent<{}>; message: ReactNode; } | - | ✓ | - |

### ButtonWrapper
（固有 Props なし）

### Button
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| size | "S" \| "M" | M | - | ボタンの大きさ |
| disabledReason | { icon?: FunctionComponent<{}>; message: ReactNode; } | - | - | 無効な理由 |
| prefix | ReactNode | - | - | ボタン内の先頭に表示する内容。 通常は、アイコンを表示するために用いる。 |
| suffix | ReactNode | - | - | ボタン内の末尾に表示する内容。 通常は、アイコンを表示するために用いる。 |
| wide | boolean | false | - | `true` のとき、ボタンの `width` を 100% にする。 |
| variant | "text" \| "primary" \| "secondary" \| "tertiary" \| "danger" \| "skeleton" | secondary | - | ボタンのスタイルの種類 |
| loading | boolean | false | - | 処理が走ってるかどうか |

### AnchorButton
| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| size | "S" \| "M" | M | - | ボタンの大きさ |
| prefix | ReactNode | - | - | ボタン内の先頭に表示する内容。 通常は、アイコンを表示するために用いる。 |
| suffix | ReactNode | - | - | ボタン内の末尾に表示する内容。 通常は、アイコンを表示するために用いる。 |
| loading | boolean | - | - | 処理が走ってるかどうか |
| wide | boolean | false | - | `true` のとき、ボタンの `width` を 100% にする。 |
| elementAs | ElementType | - | - | next/linkなどのカスタムコンポーネントを指定します。指定がない場合はデフォルトで `a` タグが使用されます。 |
| variant | "text" \| "primary" \| "secondary" \| "danger" \| "skeleton" | secondary | - | - |
| inactiveReason | { icon?: FunctionComponent<{}>; message: ReactNode; } | - | - | - |
| ref | any | - | - | - |

## 実装ルール

### best-practice-for-button-element
button要素ではなく、smarthr-ui/Button、もしくはsmarthr-ui/UnstyledButtonの利用を促すルールです

### a11y-clickable-element-has-text
ButtonやAnchor,Link コンポーネントなどクリック可能（クリッカブル）な要素にテキストを設定することを促すルールです。

### a11y-trigger-has-button
DropdownTriggerやDialogTrigger, DisclosureTrigger内にbutton要素を設置することを強制するルールです。

❌ NG:

```jsx
// Triggerの子はbutton要素のみである必要がある
<DialogTrigger>
  <Button />
  <Any />
</DialogTrigger>
```

✅ OK:

```jsx
<DropdownTrigger>
  <Button />
</DropdownTrigger>
```

### design-system-guideline-prohibit-dialog-button-icon
Dialogのボタンテキストにアイコンコンポーネント（名前が"Icon"で終わるコンポーネント）を含めることを禁止するルールです。

### design-system-guideline-prohibit-double-icons
要素の前後両方にアイコンの使用を禁止するルールです。`Button` や `TextLink` において、`prefix` と `suffix` が同時に設定されている場合、エラーとなります。

❌ NG:

```jsx
<Button suffix={SUFFIX} prefix={PREFIX}>hoge</Button>
<Button suffix prefix>hoge</Button>
<StyledButton suffix={undefined} prefix={null}>hoge</StyledButton>
<Link prefix="PREFIX" suffix="SUFFIX">hoge</Link>
<StyledLink prefix="PREFIX" suffix="SUFFIX">hoge</StyledLink>
```

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

### 使用上の注意 > type="button" について
- [must] form submit を使う場合は `type="submit"` を明記する

### 種類 > Primary
- [must] 1 つの画面で Primary ボタンは最大 1 つまでにする
  - 主要な操作が複数ある場合は、画面内の主要な操作が 1 つになるように情報設計と画面構成を見直す
- [avoid] ユーザーからの注目（視線）を集めることだけを目的に Primary ボタンを使用しない

### 種類 > Secondary
- [should] Secondary ボタンが多い場合は情報設計・画面構成の見直しや DropdownMenuButton の利用を検討する

### 種類 > Tertiary
- [should] Tertiary ボタンは Secondary ボタンより重要度の低い操作に使う
- [must] 他の画面へ移動するリンクとして使いたい場合は TextLink を使う

### 種類 > Danger
- [should] Danger ボタンは主に削除ダイアログで使用する
- [should] 警告色（DANGER）に頼らず、ボタン配置のコンテキストやラベルテキストだけでもユーザーに伝わるよう検討する

### 種類 > Text
- [should] Text ボタンは Secondary ボタンの装飾（枠線）が過剰な場合に使う
  - コンポーネントに内包する場合（例: DropdownMenuButton）
  - 多くのボタンを並べて表示する場合
- [must] Text ボタンを単独で使う場合は prefix または suffix にアイコンを設定する

### 種類 > AnchorButton
- [must] アクションボタンとして表現したい場合は Button を使用する

### レイアウト > ボタンサイズ
- [should] レイアウトの都合上スペースを節約したいときはサイズ `小` を使う

### レイアウト > アイコンの有無 > アイコン付きボタン
- [should] アイコン付き（左）はボタンを押したときに実行される操作を想起させるために使用する
- [must] 同じ操作のボタンには同じアイコンを指定する
- [should] アイコン付き（右）はボタンを押したときに特定の UI が表示される場合に使用する

### レイアウト > アイコンの有無 > アイコン付きボタン > `アイコン付き`にする判断基準
- [must] アイコンは左右どちらかにのみ指定する
  - どちらにもアイコンをつけられそうな場合は、アイコン付き（右）（サフィックス）を優先し、アイコン付き（左）（プレフィックス）には指定しない

### レイアウト > アイコンの有無 > アイコン付きボタン > `アイコン付き（左）`（プレフィックス）の判断基準
- [should] SmartHR 上で頻出する操作に関してはアイコンをつけるのを推奨する
- [avoid] 明確な必要性や理由がなければ、アイコンをつけることは極力避ける

### レイアウト > アイコンの有無 > アイコンボタン
- [should] アイコンのみのボタンは、ラベルテキストを表示するレイアウト上の余裕がない場合に使う
- [must] アイコンには必ず代替テキストを含める

### 状態 > 無効（disabled）
- [avoid] 無効状態のボタンはできるだけ使わない
  - そもそも無効ではなくボタン自体を非表示にしたり、無効状態の理由を付近に表示することを検討する
  - 無効状態の理由を配置するスペースがどうしてもない場合、`disabledReason` props で理由を表示することを検討する

### ライティング
- [must] ボタンラベルには動詞の終止形を使用する

### モバイル > ボタンの大きさ > 通常サイズのボタンを使う
- [should] モバイルでは基本的に `通常` サイズを使用する
- [avoid] モバイルで `サイズ小` のボタンを使うことは避ける
- [must] レイアウトの都合上 `サイズ小` のボタンにする必要がある場合、間隔を十分にあける
  - その場合、アイコンボタンとして使うことはなるべく避ける

### モバイル > 複数のボタンの並べ方 > ボタンを並べる方向
- [should] 複数のボタンは基本的に垂直方向に並べる

### モバイル > 複数のボタンの並べ方 > ボタンを並べる順番
- [must] 複数の操作を並べる場合は Primary ボタンの位置を一貫させる
  - 水平方向に並べる場合は、識字方向の後方に Primary ボタンが来るようにレイアウトする（LTR では右側）
  - 垂直方向に並べる場合は、Primary ボタンの下に Secondary ボタンを置く
