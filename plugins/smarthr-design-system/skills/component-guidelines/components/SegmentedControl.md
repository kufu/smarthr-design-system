# SegmentedControl

同一オブジェクトの異なる状態や視点を切り替えるためのコンポーネントです。リスト表示とカード表示の切替など、選択と同時に即座に表示を変えるときに使います。

特定のオブジェクトに対して異なる状態を切り替える具体例としては、以下が挙げられます。

## import

```ts
import { SegmentedControl } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v102.0.0** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| options | Option[] | - | ✓ | 選択肢の配列 |
| defaultValue | string | - | - | デフォルトで選択する値 |
| value | string | - | - | 選択中の値 |
| size | "S" \| "M" | M | - | 各ボタンの大きさ |
| onClickOption | (value: string) => void | - | - | 選択肢を押下したときに発火するコールバック関数 |

## 実装ルール

SegmentedControl に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

> ℹ️ 各項目は SmartHR Design System の基準であり、守らなければならない規則ではありません。`[must]` は基本的に合わせる基準、`[should]` は状況に応じて判断する推奨、`[avoid]` は避けることを推奨する使い方です。`[must]` に合わせない場合や `[avoid]` の使い方を採用する場合は、理由を明示してください。

### 使用上の注意 > オブジェクト自体を切り替える場合はTabBarを使用する
- [must] ビューに存在するオブジェクト自体を切り替える場合は TabBar を使う

### 使用上の注意 > オン・オフを切り替える場合にはSwitchを使用する
- [must] オンとオフの 2 つの状態を切り替えるときは Switch を使う

### 使用上の注意 > 選択とは別に適用操作をする場合はRadioButtonを使用する
- [must] 選択操作後に `送信` や `保存` などのボタンを押して入力内容を適用する場合は RadioButton を使う

### モバイル > ボタンを折り返して表示しない
- [must] モバイル表示など画面幅が小さくなった際に SegmentedControl のボタンを折り返さない
  - ボタンのラベルを折り返す
  - Reel を使用して水平方向にスクロールさせる
  - `S` サイズの SegmentedControl を使用する（どうしようもないときにのみ）
