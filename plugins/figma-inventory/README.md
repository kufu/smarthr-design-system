# figma-inventory プラグイン

Figma MCPの`get_design_context`が返す大きな応答（React + Tailwindの参照コード。大きいフレームでは20万文字ほど）を、hookでファイルに退避し、smarthr-uiで実装するための「インベントリ」に圧縮してからAIコーディングエージェントに渡すプラグイン。

- 対象: ローカルで動くClaude CodeとCursor（IDE・CLI）
- 中身はhookだけ（スキルは持たない）。どのスキル・どの依頼から`get_design_context`を呼んでも圧縮される
- 実装の進め方（差分の出し方・propsへの変換・レビュー）は各プロダクトのスキルやワークフローに任せる

## 何が起きるか

| タイミング | hook | すること |
|-|-|-|
| `get_design_context`の前 | `scripts/pre_figma.py` | 指定が無い引数にだけ既定値を入れる（`forceCode: true`・`excludeScreenshot: true`・`disableCodeConnect: false`）。呼び出し側が指定した値は上書きしない |
| `get_screenshot`の前 | 同上 | 同上（`enableBase64Response: true`・`maxDimension: 4096`） |
| `get_design_context`の後 | `scripts/extract_figma.py` | 生の応答を`*.raw.json`に、インベントリを`*.inventory.md`に書き、モデルに返す結果を2つのパスと短い案内に差し替える |
| `get_screenshot`の後 | 同上 | 画像をファイルに保存し、結果をパスと倍率（画像の実寸とフレームの寸法の比）に差し替える |

モデルに返す結果は`[figma-inventory]`で始まり、1行目にhookが足した引数を書く。コードを含まない応答（Code Connectの設定を求める文面、メタデータのXML）は差し替えず、後ろに続け方を1段落足す。

インベントリは、Code Connectのimport先から解決したcomponent-guidelinesのガイド名（`→ guide:`）、Figmaのプロパティ値、コンポーネント外のフレームの見た目の値、スクリプトでは判断しない「要確認」の項目、末尾の「次にすること」で構成される。ガイド名は、同じマーケットプレイスの`smarthr-design-system`プラグインのガイド一覧から付ける。

### 出力先

- Claude Code: セッションのscratchpad（hookに渡る`scratchpad_dir`）の`figma-inventory/`
- Cursor: OSの一時ディレクトリの`figma-inventory/<session_id>/`

リポジトリの中には書かない。

## 導入方法

前提:

- Figma MCPのリモート版（`https://mcp.figma.com/mcp`）。Claude Codeはclaude.aiのFigmaコネクタでもよい
- `python3`（3.8以上。標準ライブラリだけで動く）
- `smarthr-design-system`プラグイン（無くても圧縮は動くが、インベントリにガイド名が付かない）

### Claude Code

```sh
/plugin marketplace add kufu/smarthr-design-system
/plugin install figma-inventory@smarthr-design-system
```

リポジトリでチームに配るときは、`.claude/settings.json`に次の2項目を書く。設定を書いても自動ではインストールされないので、各メンバーが1回`/plugin install`を実行する。

```json
{
  "extraKnownMarketplaces": {
    "smarthr-design-system": {
      "source": { "source": "github", "repo": "kufu/smarthr-design-system" }
    }
  },
  "enabledPlugins": {
    "figma-inventory@smarthr-design-system": true
  }
}
```

### Cursor

Settings > Plugins > Browse Marketplaceから「Figma Inventory」を検索してインストール。

## 生のコードが要るとき

1. 結果に書かれた`*.raw.json`から、jqやgrepで該当箇所を引く（全文は読まない）
2. hookを止めたいときは、環境変数`FIGMA_INVENTORY_HOOK=off`を付けて起動する。環境変数は起動時に決まるので、セッションの途中では切り替えられない
   - Claude Code: `FIGMA_INVENTORY_HOOK=off claude`
   - Cursor: `FIGMA_INVENTORY_HOOK=off cursor .`（CLIは`FIGMA_INVENTORY_HOOK=off agent`）

## 対象外と制限

- Codex・Devin・GitHub Copilotなど、hookの形が違うエージェントでは圧縮が効かない
- Cursorのクラウドのエージェントでは、HTTPのMCPサーバーの結果が伏せられ、差し替えも引数の書き換えもできない
- Cursorは大きい結果を先に`~/.cursor/projects/<プロジェクト>/agent-tools/`へ退避し、hookには本文が空の結果だけが渡る。hookは実行時間内に書かれ、中身に`nodeId`を含む退避ファイルを探して圧縮する。候補を1つに絞れないときは差し替えず、候補のパスと手で圧縮するコマンドを返す
- FigmaのリモートMCPでCode Connectの参照がタイムアウトすると、`get_design_context`は知らせずにCode Connectなしのコードを返す。圧縮は動くが、インベントリに「未紐づけ」が増え、ガイド名が付かない

## 開発者向け情報

```
plugins/figma-inventory/
├── .claude-plugin/plugin.json   Claude Code の manifest（hook は既定の hooks/hooks.json）
├── .cursor-plugin/plugin.json   Cursor の manifest（"hooks": "./hooks/cursor-hooks.json"）
├── hooks/hooks.json             Claude Code 形式（PreToolUse / PostToolUse）
├── hooks/cursor-hooks.json      Cursor 形式（preToolUse / postToolUse）
├── scripts/extract_figma.py     圧縮ルールの本体（PostToolUse）
├── scripts/pre_figma.py         引数の既定値（PreToolUse）
└── tests/
    ├── figma-fixtures/          --selftest の fixture（応答と期待出力）
    └── hook-inputs/             Cursor の hook 入力の例
```

`.claude-plugin/plugin.json`と`.cursor-plugin/plugin.json`の`version`はそろえる。スクリプトやfixtureを変えたら版を上げる。

### selftest

```sh
python3 plugins/figma-inventory/scripts/extract_figma.py --selftest
```

fixtureの期待出力との比較、import先からガイド名を引く規則の単体テスト、`pre_figma.py`の単体テスト、Claude Code・Cursorのhook入力の例（本文あり・先に退避された応答・候補が複数など）を確かめる。圧縮のルールを変えて期待出力が変わるときは、`--update-expected`で書き換え、差分が意図どおりかを確かめてからコミットする。

fixtureはガイドの一覧なしで比べるので、期待出力に`→ guide:`は付かない。ガイドの追加・削除・改名でselftestは落ちない。1つのfixtureの出力を手元で見るときは、`--input <raw.json> --no-guides`で期待出力と同じ条件にする。

`plugins/figma-inventory/scripts/`か`tests/`を変えたPRでは、CI（`.github/workflows/figma-inventory-selftest.yml`）がselftestを回す。

### fixture の足し方

**プロダクトのFigmaの応答や画面の文言をfixtureに置かない**。

- fixtureはSmartHR UIのライブラリファイルのフレームから作る
- プロダクトの応答で圧縮が崩れたときも、その応答は置かない。SmartHR UIのライブラリファイルで同じ崩れ方をするフレームを探し、その応答をfixtureにする
- 応答の保存: hookが書いた`*.raw.json`を`tests/figma-fixtures/<名前>.raw.json`にコピーし、`--selftest --update-expected`で`<名前>.expected.md`を作る
- 応答に入る`assetPathPrefix`のURL（`https://www.figma.com/api/mcp/asset/<ID>`）は`00000000-0000-0000-0000-000000000000`に置き換える。hookの入力の例に書く`fileKey`も実在のキーにせず`EXAMPLEFILEKEY`にする

### ローカル動作確認

```sh
claude --plugin-dir ./plugins/figma-inventory
agent --plugin-dir ./plugins/figma-inventory
```

1つのフォルダにClaude Code形式とCursor形式のhookを並べている。CursorはClaude Code形式の`hooks/hooks.json`を実行しない。
