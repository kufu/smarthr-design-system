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
    ├── component-selector/SKILL.md   ルータースキル
    └── components/<name>/SKILL.md    各コンポーネントスキル
```

スキルは `scripts/generate-skills/` のスクリプトで生成された自動生成物です。直接編集せず、入力ソース（`metadata.json`、`eslint-plugin-smarthr` のルール README、`src/content/articles/products/components/**/checklist.yaml`）を更新して再生成してください。

## ローカル動作確認（Claude Code）

```sh
claude --plugin-dir ./plugins/smarthr-design-system
```

## 詳細

- ロードマップ: 親リポジトリ Notion 「smarthr-ui × AIエージェント プラグイン検討」を参照
- 生成スクリプト仕様: `scripts/generate-skills/README.md`
