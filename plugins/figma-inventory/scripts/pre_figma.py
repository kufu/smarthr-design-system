#!/usr/bin/env python3
"""
figma-inventory プラグインの PreToolUse hook。Figma MCP のツールの引数に、指定が無いものだけ既定値を入れる。

呼び出し側が指定した引数は上書きしない（スロット未展開の取り直しで disableCodeConnect: true を
明示する場合などを潰さないため）。権限の判断（permissionDecision / permission）は返さない。

Dependencies: Python 3.8+ standard library only.

Usage:
    python3 pre_figma.py claude   # Claude Code（引数なしも claude）
    python3 pre_figma.py cursor   # Cursor
"""

import json
import os
import re
import sys

# ツールごとの既定値。PostToolUse（extract_figma.py）は tool_input とこれを比べて「hook が足した引数」を推定する。
DEFAULTS = {
    # forceCode: 付けないと大きいフレームでメタデータの XML だけが返る
    # excludeScreenshot: 同梱のスクリーンショットは縮小版で計測に使えない。画像は get_screenshot で取る
    # disableCodeConnect: 省略すると、未マッピングがあるときに Code Connect の設定を求める応答が返りやすい
    "get_design_context": {"forceCode": True, "excludeScreenshot": True, "disableCodeConnect": False},
    # enableBase64Response: 付けないと URL だけが返る。付ければ PostToolUse が画像をファイルに保存できる
    "get_screenshot": {"enableBase64Response": True, "maxDimension": 4096},
}


def hook_disabled():
    """FIGMA_INVENTORY_HOOK=off のときは何もしない（生のコードが要る作業の逃げ道）。"""
    return os.environ.get("FIGMA_INVENTORY_HOOK", "").strip().lower() == "off"


def tool_kind(tool_name):
    """`mcp__<サーバー>__get_design_context`（Claude Code）/ `MCP:get_design_context`（Cursor）からツール名を取り出す。"""
    return re.split(r"__|:", str(tool_name or ""))[-1]


def fill_defaults(tool_name, tool_input):
    """指定が無い引数に既定値を入れた tool_input を返す。足すものが無ければ None。"""
    defaults = DEFAULTS.get(tool_kind(tool_name))
    if not defaults or not isinstance(tool_input, dict):
        return None
    missing = {k: v for k, v in defaults.items() if tool_input.get(k) is None}
    if not missing:
        return None
    return {**tool_input, **missing}


def hook_output(mode, data):
    """hook の出力（JSON にするオブジェクト）。Claude Code で出力しないときは None。"""
    updated = None if hook_disabled() else fill_defaults(data.get("tool_name"), data.get("tool_input"))
    if mode == "cursor":
        return {"updated_input": updated} if updated else {}
    if not updated:
        return None
    return {"hookSpecificOutput": {"hookEventName": "PreToolUse", "updatedInput": updated}}


def main(argv):
    mode = argv[1] if len(argv) > 1 else "claude"
    try:
        out = hook_output(mode, json.load(sys.stdin))
    except Exception:
        out = {} if mode == "cursor" else None  # 補完に失敗しても、ツールの呼び出しは止めない
    if out is not None:
        print(json.dumps(out, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
