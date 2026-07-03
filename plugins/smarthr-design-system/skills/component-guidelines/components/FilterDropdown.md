# FilterDropdown

「よくあるテーブル」などで絞り込み条件を入力するためのドロップダウンコンポーネントです。Checkbox/RadioButton/日付などの入力要素をドロップダウンパネル内に配置し、絞り込みの適用・解除を提供するときに使います。

## import

```ts
import { FilterDropdown } from 'smarthr-ui'
```

## Props

> ℹ️ この Props 情報は **smarthr-ui v96.1.1** を基準に生成しています。利用中の smarthr-ui のバージョンが異なる場合、props がずれていることがあります。その場合は実際の型定義（エディタの型補完、`node_modules/smarthr-ui` の `.d.ts` / `metadata.json`）を正としてください。

| Props 名 | 型 | デフォルト値 | 必須 | 説明 |
|---|---|---|---|---|
| trigger | ReactNode \| { children: ReactNode; size?: ButtonProps; onlyIcon?: boolean \| { component?: ComponentType<any>; }; } | - | - | 引き金となるボタン |
| applyText | ReactNode | - | - | - |
| cancelText | ReactNode | - | - | - |
| resetText | ReactNode | - | - | - |
| filtered | boolean \| { iconAlt?: ReactNode; } | - | - | - |
| responseStatus | ResponseStatus | - | - | - |
| onApply | MouseEventHandler<HTMLButtonElement> | - | ✓ | - |
| onCancel | MouseEventHandler<HTMLButtonElement> | - | - | - |
| onReset | MouseEventHandler<HTMLButtonElement> | - | - | - |
| onOpen | () => void | - | - | - |
| onClose | () => void | - | - | - |

## 実装ルール

FilterDropdown に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。

## 使い方チェックリスト

### 使用上の注意 > 絞り込みのUIが複雑で、エリアを十分に確保できない場合はActionDialogを使用する
- [must] パネル内に Checkbox や RadioButton、Input[type=date] などを配置することでユースケースを達成できる場合は FilterDropdown を使用する
- [should] 絞り込みの UI が複雑で、ドロップダウンパネルではエリアを十分に確保できない場合は ActionDialog の使用を検討する
  - ActionDialog の呼び出しは FilterDropdown ではなく「フィルター」ボタンで行う

### レイアウト > [WIP] モバイル > ドロップダウンパネル
- [must] モバイル端末ではドロップダウンパネルを ActionDialog を用いてモーダルに表示する
