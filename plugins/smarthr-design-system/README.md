# smarthr-design-system プラグイン

SmartHR Design System の使い方ガイドを AI コーディングエージェント（Claude Code / Cursor）に提供するプラグイン。

- 対象: SmartHR 社内エンジニア、`smarthr-ui` を使う社外開発者
- 提供する知識: コンポーネントの選定基準・Props 仕様・eslint ルール・チェックリスト
- ベースリポジトリ: <https://github.com/kufu/smarthr-design-system>

## 構成

```
plugins/smarthr-design-system/
├── .claude-plugin/plugin.json
├── .cursor-plugin/plugin.json
├── README.md
├── LICENSE
└── skills/
    └── component-guidelines/              唯一のスキル
        ├── SKILL.md                       エントリポイント（手動管理）
        ├── component-selector.md          コンポーネント選定ガイド（自動生成）
        └── components/                    各コンポーネントガイド（自動生成）
            ├── Button.md
            ├── Table.md
            └── ...
```

`components/*.md` と `component-selector.md` は `scripts/generate-skills/` のスクリプトで生成された自動生成物です。直接編集せず、入力ソース（`metadata.json`、`eslint-plugin-smarthr` のルール README、`src/content/articles/products/components/**/checklist.yaml`）を更新して再生成してください。`SKILL.md` はエントリポイントとして手動管理しています。

## ローカル動作確認（Claude Code）

```sh
claude --plugin-dir ./plugins/smarthr-design-system
```

## 詳細

- ロードマップ: 親リポジトリ Notion 「smarthr-ui × AIエージェント プラグイン検討」を参照
- 生成スクリプト仕様: `scripts/generate-skills/README.md`
