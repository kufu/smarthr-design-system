#!/usr/bin/env python3
"""
Figma MCP の get_design_context レスポンスを、smarthr-ui 実装用のインベントリに圧縮する。

figma-inventory プラグインの PostToolUse hook の本体。圧縮ルールの正はこのファイルにある。
観察の整理だけを行い、props への変換やコンポーネントの選定はしない。

Dependencies: Python 3.8+ standard library only.

Usage:
    # PostToolUse hook から呼ばれる（stdin に hook 入力 JSON）
    python3 extract_figma.py --hook claude   # Claude Code（引数なしの --hook も claude）
    python3 extract_figma.py --hook cursor   # Cursor

    # 保存済みのレスポンス（content block の JSON 配列）から作る
    python3 extract_figma.py --input raw.json --output inventory.md

    # fixture の出力を期待値と比べる（改修時の回帰確認）
    python3 extract_figma.py --selftest
    python3 extract_figma.py --selftest --update-expected

厳密な JSX パーサーは使わない。レスポンスには構文として不正なもの
（同じ識別子の二重 import、全角記号を含む識別子）が実際に含まれるため、
タグと属性を拾う寛容なトークナイザーで読む。
"""

import argparse
import base64
import glob
import json
import os
import re
import sys
import tempfile
import time
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from pre_figma import DEFAULTS, hook_disabled, tool_kind, fill_defaults  # noqa: E402
from pre_figma import hook_output as pre_hook_output  # noqa: E402
FIXTURE_DIR = HERE.parent / "tests" / "figma-fixtures"

# SmartHR Design System の spacing token（px = 16 × token）。
SPACING_TOKENS = {
    0: "0", 4: "0.25", 8: "0.5", 12: "0.75", 16: "1", 20: "1.25", 24: "1.5",
    32: "2", 40: "2.5", 48: "3", 56: "3.5", 64: "4", 128: "8",
}

# Figma の Variant で「既定・オフ」を表す値。行から省き、冒頭の凡例で省略を明示する。
FALSY_VARIANT_VALUES = {"False", "false", "default", "Off", "off", "-", "normal", "enabled"}

# 全インスタンスで同じ値の prop を「共通値」節に 1 回だけ書く閾値（インスタンス数）
HOIST_MIN_INSTANCES = 5

NODE_ID_RE = re.compile(r"^I?\d+:\d+(?:;\d+:\d+)*$")
SMARTHR_UI_PREFIX = "packages/smarthr-ui/src/components/"
ICON_FILES = ("Icon/Icon.tsx", "Icon/FaIcon.tsx")

# smarthr-ui で改名されたコンポーネントの旧名 → 新名。
# 古い Figma ファイルには旧名が残るので、旧名のガイドが無ければ新名のガイドに結び付ける。
RENAMED_COMPONENTS = {"Base": "Panel", "BaseColumn": "Groupbox"}


# ---------------------------------------------------------------------------
# 入力の分解
# ---------------------------------------------------------------------------

def load_blocks(path):
    """保存した応答を content block の配列として読む。JSON でなければ（Cursor の退避ファイルなど、
    テキストのブロックをつないだもの）全体を 1 つのテキストのブロックとみなす。"""
    text = Path(path).read_text(encoding="utf-8")
    try:
        data = json.loads(text)
    except ValueError:
        return [{"type": "text", "text": text}]
    if isinstance(data, dict) and "tool_response" in data:
        data = data["tool_response"]
    if isinstance(data, dict) and isinstance(data.get("content"), list):
        data = data["content"]
    if not isinstance(data, list):
        raise ValueError("content block の JSON 配列ではない")
    return data


def split_response(blocks):
    texts = [b.get("text", "") for b in blocks if isinstance(b, dict) and b.get("type") == "text"]
    code = next((t for t in texts if re.search(r"^export default function \w+\(", t, re.M)), None)
    if code is None:
        return None
    return {"code": code}


def parse_imports(code, parse_notes):
    """default import だけを読む（実出力はすべてこの形）。読めなかった import 行は要確認に回す。"""
    imports = {}
    for line in re.findall(r"^import\s.*$", code, re.M):
        m = re.match(r'^import\s+([^\s{},*]+)\s+from\s+["\']([^"\']+)["\']', line)
        if not m:
            parse_notes.append(f"import 行: {line[:80]}")
            continue
        ident, url = m.groups()
        path = url.split(SMARTHR_UI_PREFIX, 1)[1] if SMARTHR_UI_PREFIX in url else url
        imports.setdefault(ident, []).append(path)
    return imports


def extract_braced(s, start, open_ch="{", close_ch="}"):
    """s[start] が open_ch のとき、対応する close_ch の位置を返す。文字列リテラルは読み飛ばす。"""
    depth = 0
    i = start
    n = len(s)
    while i < n:
        c = s[i]
        if c in "\"'`":
            j = i + 1
            while j < n and s[j] != c:
                j += 2 if s[j] == "\\" else 1
            i = j + 1
            continue
        if c == open_ch:
            depth += 1
        elif c == close_ch:
            depth -= 1
            if depth == 0:
                return i
        i += 1
    return n - 1


def parse_functions(code):
    """Code Connect なしの出力に現れるローカル関数（非表示レイヤーを条件分岐で持つ）を拾う。"""
    funcs = {}
    for m in re.finditer(r"^(?:export default )?function (\w+)\(", code, re.M):
        name = m.group(1)
        pstart = m.end() - 1
        pend = extract_braced(code, pstart, "(", ")")
        params = code[pstart + 1:pend]
        defaults = {}
        brace = params.find("{")
        if brace >= 0:
            inner = params[brace + 1:extract_braced(params, brace)]
            for pm in re.finditer(r'(\w+)\s*=\s*("[^"]*"|true|false|-?\d+)', inner):
                k, v = pm.groups()
                defaults[k] = v.strip('"') if v.startswith('"') else v
        ret = code.find("return (", pend)
        next_fn = re.compile(r"^(?:export default )?function \w+\(", re.M).search(code, pend)
        if ret < 0 or (next_fn and ret > next_fn.start()):
            funcs[name] = {"defaults": defaults, "derived": [], "jsx": None}  # JSX を抜き出せなかった（呼び出し側で明記する）
            continue
        # 関数本体の派生定数（`const isDefault = type === "default";` / `const isNotGrid = !grid;`）
        derived = []
        for dm in re.finditer(r'^\s*const (\w+) = (?:(\w+) (===|!==) "([^"]*)"|(!?)(\w+));\s*$', code[pend:ret], re.M):
            if dm.group(2):
                derived.append((dm.group(1), "cmp", dm.group(2), dm.group(3), dm.group(4)))
            else:
                derived.append((dm.group(1), "not" if dm.group(5) else "ref", dm.group(6), None, None))
        rend = extract_braced(code, ret + len("return"), "(", ")")
        funcs[name] = {"defaults": defaults, "derived": derived, "jsx": code[ret + len("return ("):rend]}
    return funcs


FALSY_VALUES = ("false", "", "0", "null", "undefined")


def eval_env(fn, call_attrs):
    """関数のデフォルト引数 → 呼び出し側の props → 派生定数の順に、値を文字列で決める。"""
    env = dict(fn["defaults"])
    for k, (t, v) in call_attrs.items():
        env[k] = v
    for name, kind, ref, op, val in fn["derived"]:
        if ref not in env:
            continue
        if kind == "cmp":
            env[name] = "true" if (env[ref] == val) == (op == "===") else "false"
        elif kind == "not":
            env[name] = "false" if env[ref] not in FALSY_VALUES else "true"
        else:
            env[name] = env[ref]
    return env


# ---------------------------------------------------------------------------
# 寛容なトークナイザーと木構築
# ---------------------------------------------------------------------------

class Node:
    __slots__ = ("tag", "attrs", "children", "text", "cond")

    def __init__(self, tag, attrs=None, text=None, cond=None):
        self.tag = tag
        self.attrs = attrs or {}
        self.children = []
        self.text = text
        self.cond = cond


TAG_NAME_RE = re.compile(r"[^\s/>={}\"]+")
ATTR_NAME_RE = re.compile(r"[^\s/>={}\"]+")


def parse_attrs(s, i):
    """s[i] からタグの属性を読み、(attrs, 終端位置, 自己終了か) を返す。"""
    attrs = {}
    n = len(s)
    while i < n:
        while i < n and s[i].isspace():
            i += 1
        if i >= n:
            break
        if s.startswith("/>", i):
            return attrs, i + 2, True
        if s[i] == ">":
            return attrs, i + 1, False
        if s[i] == "{":
            end = extract_braced(s, i)
            attrs.setdefault("#spread", ("expr", s[i + 1:end].strip()))
            i = end + 1
            continue
        m = ATTR_NAME_RE.match(s, i)
        if not m:
            i += 1
            continue
        name = m.group(0)
        i = m.end()
        if i < n and s[i] == "=":
            i += 1
            if i < n and s[i] == '"':
                j = s.find('"', i + 1)
                attrs[name] = ("str", s[i + 1:j])
                i = j + 1
            elif i < n and s[i] == "{":
                j = extract_braced(s, i)
                attrs[name] = ("expr", s[i + 1:j].strip())
                i = j + 1
        else:
            attrs[name] = ("expr", "true")
    return attrs, n, False


# `{a && (...)}` / `{a && b && (...)}` / `{a && <X />}`
COND_RE = re.compile(r"^\s*((?:!?\w+\s*&&\s*)+)(?=[(<])", re.S)


def parse_jsx(s, parse_notes=None):
    """JSX 断片を Node 木にする。閉じタグの不整合は、開いている同名タグまで巻き戻して吸収する。
    対応する開きタグが無い閉じタグは parse_notes に記録する。"""
    if parse_notes is None:
        parse_notes = []
    root = Node("#root")
    stack = [root]
    i = 0
    n = len(s)
    while i < n:
        c = s[i]
        if c == "<":
            if s.startswith("</", i):
                j = s.find(">", i)
                name = s[i + 2:j].strip()
                for k in range(len(stack) - 1, 0, -1):
                    if stack[k].tag == name:
                        del stack[k:]
                        break
                else:
                    parse_notes.append(f"対応の無い閉じタグ </{name}>")
                i = j + 1
                continue
            m = TAG_NAME_RE.match(s, i + 1)
            if not m:
                i += 1
                continue
            node = Node(m.group(0))
            node.attrs, i, self_closing = parse_attrs(s, m.end())
            stack[-1].children.append(node)
            if not self_closing:
                stack.append(node)
            continue
        if c == "{":
            j = extract_braced(s, i)
            inner = s[i + 1:j]
            cm = COND_RE.match(inner)
            if cm:
                rest = inner[cm.end():]
                body = rest[1:rest.rfind(")")] if rest.startswith("(") else rest
                cnode = parse_jsx(body, parse_notes)
                cnode.tag = "#cond"
                cnode.cond = [(neg == "!", var) for neg, var in re.findall(r"(!?)(\w+)", cm.group(1))]
                stack[-1].children.append(cnode)
            else:
                lit = re.fullmatch(r"\s*`([^`]*)`\s*|\s*\"([^\"]*)\"\s*", inner)
                if lit:
                    t = (lit.group(1) or lit.group(2) or "").strip()
                    if t:
                        stack[-1].children.append(Node("#text", text=t))
                elif inner.strip():
                    stack[-1].children.append(Node("#expr", text=inner.strip()))
            i = j + 1
            continue
        j = s.find("<", i)
        k = s.find("{", i)
        end = min(x for x in (j, k, n) if x >= 0)
        t = " ".join(s[i:end].split())
        if t:
            stack[-1].children.append(Node("#text", text=t))
        i = end
    return root


# ---------------------------------------------------------------------------
# 解決（ファイルパス → 公開コンポーネント名）
# ---------------------------------------------------------------------------

GUIDES_SUBDIR = "skills/component-guidelines/components"


def version_key(name):
    return tuple(int(x) if x.isdigit() else 0 for x in name.split("."))


def find_guides_dir():
    """component-guidelines のガイド一覧のフォルダを探す。smarthr-design-system プラグインは同じマーケットプレイスの
    隣のプラグインなので、まずこのスクリプトの場所からの相対パスで探し、無ければ Claude Code の既定の場所を探す。"""
    plugin_root = HERE.parent
    # プラグインのキャッシュ: <marketplace>/figma-inventory/<版>/scripts → <marketplace>/smarthr-design-system/<版>/
    sibling_versions = glob.glob(str(plugin_root.parent.parent / "smarthr-design-system" / "*" / GUIDES_SUBDIR))
    if sibling_versions:
        return sorted(sibling_versions, key=lambda p: version_key(Path(p).parents[2].name))[-1]
    # リポジトリ・マーケットプレイスの clone・--plugin-dir: plugins/figma-inventory/scripts → plugins/smarthr-design-system/
    sibling = plugin_root.parent / "smarthr-design-system" / GUIDES_SUBDIR
    if sibling.is_dir():
        return str(sibling)
    base = Path.home() / ".claude/plugins"
    cands = glob.glob(str(base / "cache/smarthr-design-system/smarthr-design-system/*" / GUIDES_SUBDIR))
    if cands:
        return sorted(cands, key=lambda p: version_key(Path(p).parents[2].name))[-1]
    alt = base / "marketplaces/smarthr-design-system/plugins/smarthr-design-system" / GUIDES_SUBDIR
    return str(alt) if alt.is_dir() else None


IGNORED_ATTRS = ("className", "tabIndex", "role", "key", "id", "#spread")


def prop_names(attrs):
    return {k for k in attrs if not k.startswith("data-") and k not in IGNORED_ATTRS}


class Resolver:
    def __init__(self, imports, guides):
        self.imports = imports
        self.guides = guides  # set of names, or None when unavailable
        self.known_props = {}  # import 先 → 判別不要な要素で観察した props の名前

    def index_props(self, tree):
        """import 先が 1 つに決まる要素から、ファイルごとの props の名前を集める（判別の手がかり）。"""
        def walk(node):
            if is_component_tag(node.tag):
                ps = self.candidates(node.tag)
                if len(ps) == 1:
                    self.known_props.setdefault(ps[0], set()).update(prop_names(node.attrs))
            for c in node.children:
                walk(c)
        walk(tree)

    def disambiguate(self, ident, attrs):
        """二重 import の候補を、同じレスポンス内で観察した props の名前で絞る。
        要素の props が 1 候補の既知の名前にだけ収まればそれを採る。複数に収まるときは
        名前の重なり（Jaccard 係数）が最大の候補が 1 つに決まる場合だけ採る。
        戻り値: (候補のリスト, 判別の根拠 or None)"""
        cands = self.candidates(ident)
        if len(cands) <= 1:
            return cands, None
        names = prop_names(attrs)
        if not names:
            return cands, None
        fits = [p for p in cands if p in self.known_props and names <= self.known_props[p]]
        if len(fits) > 1:
            score = {p: len(names) / len(names | self.known_props[p]) for p in fits}
            best = max(score.values())
            fits = [p for p in fits if score[p] == best]
        if len(fits) == 1:
            return fits, f"{ident} → {fits[0]}（props {len(names)} 個が一致）"
        if not fits:
            # 消去法: 既知の props に収まらない候補を外し、残りが 1 つならそれを採る
            # （このレスポンス内で別名の import が無く、props を観察できない候補が残る場合）
            rest = [p for p in cands if p not in self.known_props]
            if len(rest) == 1:
                return rest, f"{ident} → {rest[0]}（消去法: 他の候補の既知の props に無い名前を持つ）"
        return cands, None

    def has_guide(self, name):
        return self.guides is not None and name in self.guides

    def guide_name(self, name):
        """name のガイド名。旧名でガイドが無ければ新名のガイドを返す。どちらも無ければ None。"""
        if self.has_guide(name):
            return name
        new = RENAMED_COMPONENTS.get(name)
        return new if new and self.has_guide(new) else None

    def paths(self, ident):
        return self.imports.get(ident, [])

    def resolve_path(self, path):
        """(guide 名 or None, ファイル名の stem, 種別)。種別: guide / part / icon / unknown"""
        if path.endswith(ICON_FILES):
            return None, "Icon", "icon"
        parts = path.split("/")
        stem = parts[-1].rsplit(".", 1)[0]
        guide = self.guide_name(stem)
        if guide:
            return guide, stem, "guide"
        for seg in reversed(parts[:-1]):
            guide = self.guide_name(seg)
            if guide:
                return guide, stem, "part"
        return None, stem, "unknown"

    def candidates(self, ident):
        """識別子の import 先。同じ識別子が別ファイルから二重に import されていると 2 件以上になる。
        どちらの実体かは出力から判別できないので、推測せず候補のまま返す。"""
        return list(dict.fromkeys(self.paths(ident)))


def icon_name(ident):
    name = re.sub(r"^Icon(?=Fa)", "", ident)
    name = re.sub(r"\d+$", "", name)
    return re.sub(r"Icon$", "", name) or ident


# ---------------------------------------------------------------------------
# props の読み分け（Figma のコンポーネントプロパティの書式）
# ---------------------------------------------------------------------------

def classify_props(attrs):
    """戻り値: [(kind, key, value)]。kind = text / bool / variant / expr。ノード ID 系は捨てる。"""
    out = []
    bools = {k: v for k, (t, v) in attrs.items() if t == "expr" and v in ("true", "false")}
    for key, (typ, val) in attrs.items():
        if key.startswith("data-") or key in ("className", "tabIndex", "role", "key", "id"):
            continue
        if key == "#spread":
            out.append(("expr", "spread", "{" + val + "}"))  # 中身は解釈しない。あったことだけ残す
            continue
        if typ == "str":
            if NODE_ID_RE.match(val):
                continue  # インスタンススワップ等。解決できるものは子要素側で拾う
            if key.endswith("Value") and key != "Value":
                base = key[:-5]
                ctrl = bools.get(base) or bools.get("show" + base[:1].upper() + base[1:])
                if ctrl == "false":
                    continue  # スロットがオフ
                out.append(("text", base, val))
            else:
                if val in FALSY_VARIANT_VALUES:
                    continue
                out.append(("variant", key, val))
        else:
            if val == "false":
                continue
            if val == "true":
                out.append(("bool", key, None))
            else:
                out.append(("expr", key, val))
    return out


REPEAT_RE = re.compile(r"(.{2,8}?)\1{3,}")


def squeeze(text):
    """ダミー文言の繰り返しを「テキスト×56」の形に縮める（元の文字列に戻せる）。"""
    return REPEAT_RE.sub(lambda m: f"{m.group(1)}×{len(m.group(0)) // len(m.group(1))}", text)


def fmt_props(props, hoisted=frozenset()):
    parts = []
    texts = []
    for kind, key, val in props:
        if (key, val) in hoisted:
            continue
        if kind == "text":
            if key == "text":
                texts.append(squeeze(val))
            else:
                parts.append(f"{key}=「{squeeze(val)}」")
        elif kind == "bool":
            parts.append(key)
        else:
            parts.append(f"{key}={val}")
    return parts, texts


# ---------------------------------------------------------------------------
# class 名からの観察（フレーム）
# ---------------------------------------------------------------------------

def class_of(node):
    t, v = node.attrs.get("className", (None, ""))
    if t == "expr":
        lits = re.findall(r'"([^"]*)"', v)
        return " ".join(lits)
    return v or ""


def gap_desc(px):
    tok = SPACING_TOKENS.get(px)
    return f"{px}px(token {tok})" if tok is not None else f"{px}px ⚠非トークン"


def frame_layout(cls):
    words = cls.split()
    desc = []
    if "grid" in words:
        desc.append("グリッド")
    elif "flex-col" in words:
        desc.append("縦")
    elif "flex" in words:
        desc.append("横")
    for prefix, label in (("gap-x-", "gap横="), ("gap-y-", "gap縦="), ("gap-", "gap=")):
        m = re.search(r"(?:^|\s)" + re.escape(prefix) + r"\[(\d+(?:\.\d+)?)px\]", cls)
        if m:
            px = float(m.group(1))
            desc.append(label + gap_desc(int(px) if px.is_integer() else px))
    for pat, label in ((r"items-(center|end|baseline|stretch)", "align"),
                       (r"justify-(center|end|between|around|evenly)", "justify")):
        m = re.search(r"(?:^|\s)" + pat + r"(?:\s|$)", cls)
        if m:
            desc.append(f"{label}={m.group(1)}")
    return desc


def px_attr(cls, prefix):
    m = re.search(r"(?:^|\s)" + re.escape(prefix) + r"\[(\d+(?:\.\d+)?)px\]", cls)
    if not m:
        return None
    v = float(m.group(1))
    return int(v) if v.is_integer() else v


BORDER_SIDES = {"t": "上", "b": "下", "l": "左", "r": "右"}


def padding_desc(cls):
    """余白（p / px / py / pt / pb / pl / pr の任意値）を 1 語にまとめる。後に書いたほど個別の指定が勝つ。"""
    sides = {}
    for prefix, keys in (("p-", "tblr"), ("px-", "lr"), ("py-", "tb"),
                         ("pt-", "t"), ("pb-", "b"), ("pl-", "l"), ("pr-", "r")):
        v = px_attr(cls, prefix)
        if v is not None:
            for k in keys:
                sides[k] = v
    sides = {k: v for k, v in sides.items() if v}
    if not sides:
        return None

    # トークンへの換算は書かない。Code Connect なしの出力では smarthr-ui 内部の余白（13px など）も
    # 出るため、非トークンの印を付けるとノイズになる
    def fmt(v):
        return f"{v}"

    t, b, l, r = (sides.get(k, 0) for k in "tblr")
    if t == b == l == r:
        return f"余白{fmt(t)}px"
    if t == b and l == r:
        if not l:
            return f"余白=縦{fmt(t)}px"
        if not t:
            return f"余白=横{fmt(l)}px"
        return f"余白=縦{fmt(t)} 横{fmt(l)}px"
    parts = [f"{label}{fmt(v)}" for label, v in (("上", t), ("下", b), ("左", l), ("右", r)) if v]
    return "余白=" + " ".join(parts) + "px"


def frame_visual(cls):
    """Code Connect の無いフレームの見た目（寸法・余白・角丸・背景・境目）。Code Connect のある
    コンポーネントは props しか出ないので、見た目はここでしか拾えない。"""
    desc = []
    for prefix, label in (("w-", "幅"), ("h-", "高さ"), ("size-", "大きさ"), ("max-w-", "最大幅")):
        v = px_attr(cls, prefix)
        if v is not None:
            desc.append(f"{label}{v}px")
    pad = padding_desc(cls)
    if pad:
        desc.append(pad)
    r = px_attr(cls, "rounded-")
    if r is not None:
        desc.append("角丸=全丸" if r >= 999 else f"角丸{r}px")
    elif re.search(r"(?:^|\s)rounded-(?:t|b|l|r|tl|tr|bl|br)-\[", cls):
        desc.append("角丸(一部)")
    bg = re.search(r"(?:^|\s)bg-\[var\(--[\w-]+\\?/([\w-]+)", cls)
    if bg and bg.group(1) != "transparent":
        desc.append(f"背景={bg.group(1)}")
    words = cls.split()
    # border / border-2 / border-[2.5px] は枠線、border-l / border-l-4 / border-b-[2px] は片側の罫線
    width_re = r"(?:-(\d+)|-\[(\d+(?:\.\d+)?)px\])?"
    borders = [m.group(1) or m.group(2) for m in re.finditer(r"(?:^|\s)border" + width_re + r"(?=\s|$)", cls)]
    borders = [w for w in borders if w != "0"]  # border-0 は「枠なし」の指定
    if borders:
        w = borders[-1]
        desc.append(f"枠線{w}px" if w and w != "1" else "枠線")
    else:
        sides = []
        for s in "tblr":
            m = re.search(r"(?:^|\s)border-" + s + width_re + r"(?:\s|$)", cls)
            if m and (m.group(1) or m.group(2)) != "0":
                w = m.group(1) or m.group(2)
                sides.append(BORDER_SIDES[s] + (f"{w}px" if w and w != "1" else ""))
        if sides:
            desc.append("罫線(" + " ".join(sides) + ")")
    if re.search(r"(?:^|\s)(?:drop-)?shadow-\[", cls):
        desc.append("影")
    return desc


def text_style(cls):
    """テキストレイヤーの文字色・大きさ・太さ。既定（text_black / M / normal）は省く。"""
    desc = []
    color = re.search(r"text-\[color:var\(--[\w-]+\\?/([\w-]+)", cls)
    if color and color.group(1) != "text_black":
        desc.append(f"文字色={color.group(1)}")
    size = re.search(r"text-\[length:var\(--size\\?/([\w-]+)", cls)
    if size and size.group(1).lower() != "m":
        desc.append(f"文字={size.group(1).upper()}")
    if re.search(r"font-\[var\(--weight\\?/bold", cls):
        desc.append("太字")
    return desc


RAW_COLOR_RE = re.compile(r"(?:^|\s)((?:bg|text|border|from|to)-\[(?:#[0-9a-fA-F]{3,8}|rgba?\([^\]]*\))\])")


def raw_colors(cls):
    return [m.group(1) for m in RAW_COLOR_RE.finditer(cls)]


# Figma のフォントフォールバック（'Hiragino_Sans:W7' 等）の太さを weight 変数の normal / bold に当てる。
# smarthr-ui のウェイトは normal / bold の 2 値なので、ヒラギノの W3〜W4 を normal、W6〜W7 を bold とみなす。
# W5 以上を bold 側に倒すのは、中間の太さを normal と書いた Figma を矛盾として拾うため。
WEIGHT_OF_FAMILY = {"W1": "normal", "W2": "normal", "W3": "normal", "W4": "normal",
                    "W5": "bold", "W6": "bold", "W7": "bold", "W8": "bold", "W9": "bold"}


def weight_conflict(cls):
    fam = re.search(r"font-\[family-name:[^\]]*?:(W\d)", cls)
    var = re.search(r"font-\[var\(--weight\\?/(\w+)", cls)
    if fam and var:
        fw = WEIGHT_OF_FAMILY.get(fam.group(1))
        if fw and fw != var.group(1):
            return f"フォント={fam.group(1)} / weight 変数={var.group(1)}"
    return None


# ---------------------------------------------------------------------------
# 描画
# ---------------------------------------------------------------------------

class Ctx:
    def __init__(self, resolver, funcs):
        self.r = resolver
        self.funcs = funcs
        self.hoisted = {}         # guide -> {(key, val)}
        self.notes = {"weight": [], "gap": [], "color": [], "dup": [], "unmapped": [], "hidden": [],
                      "unresolved": [], "parse": [], "dup_resolved": [], "slot": []}


def node_name(node):
    t, v = node.attrs.get("data-name", (None, None))
    return v


def node_id(node):
    t, v = node.attrs.get("data-node-id", (None, None))
    return v


def is_component_tag(tag):
    return not tag.startswith("#") and not tag[:1].islower()


def texts_in(node):
    out = []
    for c in node.children:
        if c.tag == "#text":
            out.append(c.text)
        else:
            out.extend(texts_in(c))
    return out


def is_text_layer(node):
    def text_only(n):
        return n.tag == "#text" or (n.tag in ("p", "span", "br") and all(text_only(c) for c in n.children))

    return node.tag in ("div", "p", "span") and bool(node.children) \
        and all(text_only(c) for c in node.children) and bool(texts_in(node))


def only_images(node):
    if node.tag == "img":
        return True
    if node.tag.startswith("#") or is_component_tag(node.tag):
        return False
    return bool(node.children) and all(only_images(c) for c in node.children)


def has_instance_children(node):
    nid = node_id(node)
    if not nid:
        return False
    prefix = "I" + nid + ";"

    def walk(n):
        for c in n.children:
            cid = node_id(c)
            if cid and cid.startswith(prefix):
                return True
            if walk(c):
                return True
        return False

    return walk(node)


def render_component(ctx, node, context_guide, indent):
    """Code Connect のスニペット内の要素を 1 行（＋子の行）にする。"""
    ident = node.tag
    cands, reason = ctx.r.disambiguate(ident, node.attrs)
    if not cands:
        if ident in ctx.funcs:
            return render_function_call(ctx, node, indent)
        ctx.notes["unresolved"].append(ident)
        return [f"{indent}- {ident}（import 無し）"]
    resolved = [ctx.r.resolve_path(p) for p in cands]
    if reason:
        ctx.notes["dup_resolved"].append(reason)
    elif len(cands) > 1:
        ctx.notes["dup"].append(f"{ident}（{' / '.join(cands)}）")
    if len(cands) == 1 and resolved[0][2] == "icon":
        return [f"{indent}- icon {icon_name(ident)}"]
    guide, stem, kind = resolved[0] if len(cands) == 1 else (None, None, "ambiguous")

    props = classify_props(node.attrs)
    icons = []
    child_blocks = []
    for c in node.children:
        if c.tag == "#text":
            props.append(("text", "text", c.text))
            continue
        if is_component_tag(c.tag):
            cc = ctx.r.candidates(c.tag)
            if len(cc) == 1 and cc[0].endswith(ICON_FILES) and not c.children:
                icons.append(icon_name(c.tag))
                continue
            child_blocks.append(render_component(ctx, c, guide or context_guide, indent + "  "))
        else:
            child_blocks.append(render_node(ctx, c, indent + "  ", guide or context_guide))
    child_lines = fold_siblings([b for b in child_blocks if b], indent + "  ")

    # インスタンススワップのアイコンを、オンになっているスロットに割り当てる
    on_slots = [k for kind_, k, _ in props if kind_ == "bool" and k in ("prefixIcon", "suffixIcon", "icon", "showIcon")]
    if icons and len(on_slots) == 1 and len(icons) == 1:
        props = [p for p in props if not (p[0] == "bool" and p[1] == on_slots[0])]
        props.append(("variant", on_slots[0], icons[0]))
        icons = []

    def label_of(g, s, k):
        if k == "part":
            return f"{g}（部品 {s}）"
        if g and g != s:
            return f"{g}（Figma では旧名 {s}）"
        return g or s

    if kind == "ambiguous":
        labels = " / ".join(label_of(*r) for r in resolved)
        guides = " / ".join(f"{r[0]}.md" for r in resolved if r[0])
        head = f"{indent}- 判別不能: {labels} → guide 候補: {guides or 'なし'}"
    elif kind == "unknown":
        head = f"{indent}- {stem} → guide: なし（{cands[0]}）"
        ctx.notes["unresolved"].append(cands[0])
    else:
        head = f"{indent}- {label_of(guide, stem, kind)} → guide: {guide}.md"
    parts, texts = fmt_props(props, ctx.hoisted.get(hoist_key(guide, stem, kind), frozenset()))
    if icons:
        parts.append("icons=" + ",".join(icons))
    if parts:
        head += " | Figma: " + " ".join(parts)
    if texts:
        head += " | " + " ".join(f"「{t}」" for t in texts)
    return [head] + child_lines


def hoist_key(guide, stem, kind):
    return stem if kind in ("part", "unknown") else guide


def substitute_props(node, env):
    """`{textValue}` のように props をそのまま差し込む式を、その値のテキストに置き換える。"""
    for i, c in enumerate(node.children):
        if c.tag == "#expr" and re.fullmatch(r"\w+", c.text) and c.text in env:
            node.children[i] = Node("#text", text=env[c.text])
        else:
            substitute_props(c, env)


def render_function_call(ctx, node, indent):
    """Code Connect なしで関数として切り出されたインスタンス。条件分岐を呼び出し側の props で評価する。"""
    name = node.tag
    if re.match(r"^Icon(Fa\w+)$", name):
        return [f"{indent}- icon {icon_name(name)}"]
    fn = ctx.funcs[name]
    env = eval_env(fn, node.attrs)
    props = [f"{k}={v}" for k, (t, v) in node.attrs.items() if k != "className"]
    ctx.notes["unmapped"].append(f"関数 {name}")
    head = f"{indent}- 未紐づけ（関数 {name}）"
    if props:
        head += " | Figma: " + " ".join(props)
    if fn["jsx"] is None:
        ctx.notes["parse"].append(f"関数 {name} の JSX")
        return [head + "（関数定義から JSX を抜き出せなかった）"]
    tree = parse_jsx(fn["jsx"], ctx.notes["parse"])
    substitute_props(tree, env)
    lines = [head]
    for c in tree.children:
        lines.extend(render_node(ctx, c, indent + "  ", None, env))
    return lines


def unexpanded_slots(node):
    """`slotContentsArea="11643:88444"` のように、スロットのノード ID だけがあって中身（子要素）が無い属性。
    Code Connect がダイアログ全体を 1 つのスニペットにまとめると、スロットの中身が出力されない。"""
    if node.children:
        return []
    return [k[4:5].lower() + k[5:] for k, (t, v) in node.attrs.items()
            if k.startswith("slot") and k[4:5].isupper() and t == "str" and NODE_ID_RE.match(v)]


def render_snippet_options(ctx, node, indent, context_guide):
    """`<CodeConnectSnippet options={[<A … />, <A … />]} />`（複数の候補を並べる形式）。
    候補を描き、同じ行になるものは 1 つにまとめる。スロット未展開は「要確認」節に回す。
    import 名が null / undefined のことがある（Code Connect がコンポーネント名を出せなかった）。
    その場合も import 先のパスから解決する。"""
    expr = node.attrs["options"][1].strip()
    if expr.startswith("[") and expr.endswith("]"):
        expr = expr[1:-1]
    opts = [c for c in parse_jsx(expr, ctx.notes["parse"]).children
            if not c.tag.startswith("#")]
    name = node_name(node) or "CodeConnectSnippet"
    blocks = []
    seen = []
    for opt in opts:
        # 同じ候補が並ぶことがある（要確認の件数を水増ししない）。子を持つ候補は中身が違いうるので間引かない
        sig = (opt.tag, sorted(opt.attrs.items()))
        if not opt.children:
            if sig in seen:
                continue
            seen.append(sig)
        block = render_component(ctx, opt, context_guide, indent)
        slots = unexpanded_slots(opt)
        if slots:
            block[0] += " ⚠スロット未展開 " + ",".join(slots)
        if block not in blocks:
            blocks.append(block)
        for s in slots:
            ctx.notes["slot"].append(f"«{name}»（インスタンス {node_id(node) or 'ID 不明'}）の {s}")
    if len(blocks) > 1:
        blocks = [[b[0] + f"（options の {i} 件目）"] + b[1:] for i, b in enumerate(blocks, 1)]
    return [line for b in blocks for line in b]


def render_node(ctx, node, indent, context_guide, env=None):
    tag = node.tag
    if tag == "#text":
        return [f"{indent}- 「{node.text}」"]
    if tag == "#expr":
        return [f"{indent}- （式: {node.text[:60]}）"]
    if tag == "#cond":
        env = env or {}
        # && で連結された条件は、どれか 1 つでも偽と分かれば非表示、全部真と分かれば表示
        known = [((env[var] not in FALSY_VALUES) != neg, f"{'!' if neg else ''}{var}={env[var]}")
                 for neg, var in node.cond if var in env]
        false_terms = [desc for ok, desc in known if not ok]
        if false_terms:
            names = [node_name(c) or c.tag for c in node.children if not c.tag.startswith("#")] or ["テキスト"]
            # 構造には残さず、「要確認」節に件数付きでまとめる（試行錯誤の痕跡で、行ごとに書くとノイズになる）
            ctx.notes["hidden"].append(f"{false_terms[0]} → «{', '.join(names)}»")
            return []
        if len(known) == len(node.cond):
            lines = []
            for c in node.children:
                lines.extend(render_node(ctx, c, indent, context_guide, env))
            return lines
        unknown = " && ".join(f"{'!' if neg else ''}{var}" for neg, var in node.cond if var not in env)
        lines = [f"{indent}- （条件 {unknown}: 未評価）"]
        for c in node.children:
            lines.extend(render_node(ctx, c, indent + "  ", context_guide, env))
        return lines
    if tag == "CodeConnectSnippet":
        if not node.children and "options" in node.attrs:
            return render_snippet_options(ctx, node, indent, context_guide)
        lines = []
        for c in node.children:
            if is_component_tag(c.tag):
                lines.extend(render_component(ctx, c, context_guide, indent))
            else:
                lines.extend(render_node(ctx, c, indent, context_guide, env))
        return lines
    if is_component_tag(tag):
        if tag in ctx.funcs and tag not in ctx.r.imports:
            return render_function_call(ctx, node, indent)
        return render_component(ctx, node, context_guide, indent)
    if tag == "img":
        return [f"{indent}- 画像"]
    return render_frame(ctx, node, indent, context_guide, env)


def render_frame(ctx, node, indent, context_guide, env, name_override=None, tag_override=None,
                 inherited=None):
    """コンポーネント外のフレーム。上から順に、最初に当てはまった形で 1 つだけ書く:
    テキストレイヤー → 画像だけのフレーム → 透過（無名の包み）→ 無名の子への統合 →
    名前の連結（«A» > «B»）→ 通常のフレーム行（Td/Th だけなら 1 行の表の行）

    inherited: まとめて 1 行にした親の見た目の値 [(ラベル or None, [値...])]。行に書き足して捨てない。
    ラベルが None のものは、このフレーム自身の値として書く（無名の子に統合した親の値）。"""
    name = name_override or node_name(node)
    tag = tag_override or node.tag
    cls = class_of(node)
    layout = frame_layout(cls)
    inherited = inherited or []
    own_visual = frame_visual(cls)

    for d in layout:
        if "非トークン" in d:
            ctx.notes["gap"].append(f"«{name or node.tag}» {d}")
    for col in raw_colors(cls):
        ctx.notes["color"].append(f"«{name or node.tag}» {col}")

    kids = [c for c in node.children]
    # Figma のテキストレイヤー（子孫が p / span / テキストだけ）
    if is_text_layer(node):
        t = squeeze(" ".join(texts_in(node)))
        wc = weight_conflict(cls)
        line = f"「{t}」"
        style = text_style(cls) + [d for c in node.children if c.tag != "#text" for d in text_style(class_of(c))
                                   if d not in text_style(cls)]
        if style:
            line += " " + " ".join(dict.fromkeys(style))
        if wc:
            ctx.notes["weight"].append(f"「{t}」 {wc}")
            line += f" ⚠{wc}"
        return [f"{indent}- {('«' + name + '» ') if name else ''}{line}"]

    if only_images(node):
        # Code Connect の無い画像は Figma のアセット（smarthr-ui のアイコンとして紐づいていない）。
        # 形はスクリーンショットで確かめ、smarthr-ui に同じ形のアイコンがあるかは実装するときに探す
        return [f"{indent}- «{name or '無名'}» アセット画像（Code Connect なし）"]

    unmapped = has_instance_children(node)
    if unmapped and name:
        ctx.notes["unmapped"].append(f"«{name}»")

    def is_plain_frame(c):
        return c.tag == "div" and not is_text_layer(c) and not only_images(c)

    # 無名の包み（bg-clip-padding 等）は透過させる。見た目の値を持つ場合は、唯一の子のフレームに引き継ぐ
    if not name and not unmapped and (len(kids) <= 1 or not layout):
        if own_visual and not (len(kids) == 1 and is_plain_frame(kids[0])):
            pass  # 値を引き継げる先が無いので透過させず、«無名» の行として書く
        else:
            carry = inherited + ([("包み", own_visual)] if own_visual else [])
            lines = []
            for c in kids:
                if carry and is_plain_frame(c):
                    lines.extend(render_frame(ctx, c, indent, context_guide, env, inherited=carry))
                else:
                    lines.extend(render_node(ctx, c, indent, context_guide, env))
            return lines

    # レイアウトを持たない名前付きフレームの唯一の子が無名のフレームなら、子のレイアウトを親の名前で書く
    if name and not unmapped and not layout and len(kids) == 1 and is_plain_frame(kids[0]) \
            and not node_name(kids[0]):
        return render_frame(ctx, kids[0], indent, context_guide, env, name_override=name,
                            tag_override=None if tag == "div" else tag,
                            inherited=inherited + ([(None, own_visual)] if own_visual else []))

    # gap を持たない 1 子のフレームは名前を連結する（親の見た目の値は «親»: として残す）
    if name and not unmapped and len(kids) == 1 and not any("gap" in d for d in layout) \
            and not kids[0].tag.startswith("#") and not is_component_tag(kids[0].tag) \
            and kids[0].tag not in ("img", "CodeConnectSnippet") and node_name(kids[0]):
        carry = inherited + ([(name, own_visual)] if own_visual else [])
        sub = render_frame(ctx, kids[0], indent, context_guide, env, inherited=carry)
        if sub and sub[0].startswith(f"{indent}- «") and not sub[0].startswith(f"{indent}- «無名»"):
            sub[0] = f"{indent}- «{name}» > " + sub[0][len(indent) + 2:]
            return sub

    head = f"{indent}- "
    if unmapped:
        head += "未紐づけ "
    head += f"«{name or '無名'}»"
    if tag != "div":
        head += f" <{tag}>"
    if layout:
        head += " " + " ".join(layout)
    visual = list(dict.fromkeys(own_visual + [v for label, vs in inherited if label is None for v in vs]))
    if visual:
        head += " | " + " ".join(visual)
    for label, vs in inherited:
        if label is not None:
            head += f" | «{label}»: " + " ".join(vs)
    for col in raw_colors(cls):
        head += f" ⚠トークン外 {col}"
    if not kids:
        return [head + "（空）"]

    if is_table_row(kids):
        return [head + " " + render_row(ctx, kids)]

    child_blocks = [render_node(ctx, c, indent + "  ", context_guide, env) for c in kids]
    return [head] + fold_siblings([b for b in child_blocks if b], indent + "  ")


def is_table_row(kids):
    tags = []
    for c in kids:
        if c.tag != "CodeConnectSnippet":
            return False
        inner = [x for x in c.children if is_component_tag(x.tag)]
        if len(inner) != 1:
            return False
        tags.append(inner[0].tag)
    return bool(tags) and len(set(re.sub(r"\d+$", "", t) for t in tags)) == 1 and re.sub(r"\d+$", "", tags[0]) in ("Td", "Th")


def compact_line(line):
    """「- X → guide: X.md | Figma: a=b | 「t」」を「X | Figma: a=b | 「t」」に縮める（表のセル内用）。"""
    line = line.strip()[2:] if line.strip().startswith("- ") else line.strip()
    head, sep, rest = line.partition(" | ")
    return head.split(" → ")[0] + (sep + rest if sep else "")


def render_row(ctx, kids):
    cells = []
    cell_tag = None
    for c in kids:
        el = next(x for x in c.children if is_component_tag(x.tag))
        cell_tag = re.sub(r"\d+$", "", el.tag)
        props = classify_props(el.attrs)
        parts, texts = fmt_props(props, ctx.hoisted.get(cell_tag, frozenset()))
        inner = []
        for ch in el.children:
            if is_component_tag(ch.tag):
                # 入れ子の行（DropdownMenuButton の中のトリガーの文言や state など）も落とさず 1 行に連ねる
                sub = render_component(ctx, ch, cell_tag, "")
                inner.append(" > ".join(compact_line(line) for line in sub))
        cell = " ".join(parts)
        if texts:
            cell += ("" if not cell else " ") + " ".join(f"「{t}」" for t in texts)
        if inner:
            cell += " [" + "; ".join(inner) + "]"
        cells.append(cell or "（空）")
    return f"{cell_tag} 行: " + " / ".join(cells)


TEXT_RE = re.compile(r"「[^」]*」")


def block_sig(block):
    return tuple(TEXT_RE.sub("「*」", line) for line in block)


def fold_siblings(blocks, indent):
    """同一の兄弟はまとめ、形が同じ兄弟は 2 件目以降を文言だけにする。
    文言は 1 件目のブロックに出てくる順に並べるので、元の位置に戻せる。"""
    out = []
    i = 0
    while i < len(blocks):
        # 複数行で形が同じ兄弟（データの違う表の行など）
        if len(blocks[i]) > 1:
            sig = block_sig(blocks[i])
            j = i + 1
            while j < len(blocks) and block_sig(blocks[j]) == sig:
                j += 1
            if j - i > 1 and any(blocks[k] != blocks[i] for k in range(i + 1, j)):
                first = list(blocks[i])
                first[0] += f"（同じ形 ×{j - i}。2 件目以降は文言のみ）"
                out.extend(first)
                rows = ["".join(TEXT_RE.findall("\n".join(blocks[k]))) or "（文言なし）" for k in range(i + 1, j)]
                span = "2" if j - i == 2 else f"2〜{j - i}"
                out.append(f"{indent}  - {span} 件目の文言（1 件目と同じ順）:")
                for row, n in group_runs(rows):
                    out.append(f"{indent}    - {row}" + (f"（×{n}）" if n > 1 else ""))
                i = j
                continue
        j = i + 1
        while j < len(blocks) and blocks[j] == blocks[i]:
            j += 1
        if j - i > 1:
            b = list(blocks[i])
            b[0] += f"（×{j - i} 同一）"
            out.extend(b)
            i = j
            continue
        if len(blocks[i]) == 1:
            sig = re.sub(r"「[^」]*」", "「*」", blocks[i][0])
            j = i + 1
            while j < len(blocks) and len(blocks[j]) == 1 and re.sub(r"「[^」]*」", "「*」", blocks[j][0]) == sig:
                j += 1
            # 文言が 1 つだけの行に限る（複数あると、どの位置の文言かが畳んだ後に分からなくなる）
            if j - i >= 3 and sig.count("「*」") == 1:
                texts = [re.search(r"「[^」]*」", blocks[k][0]).group(0) for k in range(i, j)]
                out.append(sig.replace("「*」", " / ".join(texts)) + f"（×{j - i}）")
                i = j
                continue
        out.extend(blocks[i])
        i += 1
    return out


def group_runs(items):
    """連続する同じ値をまとめる: [a, a, b] → [(a, 2), (b, 1)]"""
    runs = []
    for it in items:
        if runs and runs[-1][0] == it:
            runs[-1] = (it, runs[-1][1] + 1)
        else:
            runs.append((it, 1))
    return runs


# ---------------------------------------------------------------------------
# 共通値の抽出（全インスタンスで同値の prop）
# ---------------------------------------------------------------------------

def compute_hoisted(tree, resolver):
    stats = {}

    def walk(node, ctx_guide):
        cands = resolver.disambiguate(node.tag, node.attrs)[0] if is_component_tag(node.tag) else []
        if len(cands) == 1:
            guide, stem, kind = resolver.resolve_path(cands[0])
            if kind != "icon":
                key = hoist_key(guide, stem, kind)
                st = stats.setdefault(key, {"n": 0, "vals": {}})
                st["n"] += 1
                for k_, k, v in classify_props(node.attrs):
                    if k_ in ("text", "variant"):
                        st["vals"].setdefault(k, []).append(v)
                ctx_guide = guide or ctx_guide
        for c in node.children:
            walk(c, ctx_guide)

    walk(tree, None)
    hoisted = {}
    for key, st in stats.items():
        if st["n"] < HOIST_MIN_INSTANCES:
            continue
        for k, vals in st["vals"].items():
            if len(vals) == st["n"] and len(set(vals)) == 1:
                hoisted.setdefault(key, set()).add((k, vals[0]))
    return hoisted, stats


# ---------------------------------------------------------------------------
# 組み立て
# ---------------------------------------------------------------------------

def build_inventory(blocks, guides, source_label):
    parts = split_response(blocks)
    if parts is None:
        return None
    code = parts["code"]
    parse_notes = []
    imports = parse_imports(code, parse_notes)
    funcs = parse_functions(code)
    body_fn = re.search(r"export default function (\w+)", code).group(1)
    body_jsx = (funcs.pop(body_fn, None) or {}).get("jsx")
    if body_jsx is None:
        raise ValueError(f"{body_fn} の return (...) を抜き出せない")
    tree = parse_jsx(body_jsx, parse_notes)

    resolver = Resolver(imports, guides)
    resolver.index_props(tree)
    ctx = Ctx(resolver, funcs)
    ctx.notes["parse"] = parse_notes
    ctx.hoisted, stats = compute_hoisted(tree, resolver)

    lines = []
    for c in tree.children:
        lines.extend(render_node(ctx, c, "", None))

    out = [f"# Figma インベントリ（{source_label}）", ""]
    out.append("凡例: «レイヤー名» はコンポーネント外のフレーム。フレームの `|` の後ろは見た目の値（固定の寸法・角丸・背景・境目）。"
               "`→ guide:` は Code Connect の import 先から解決した"
               "component-guidelines のガイド。`Figma:` は Figma のプロパティ値そのまま（smarthr-ui の props ではない）。"
               "Code Connect のあるコンポーネントの見た目（色・形・大きさ）は出ないので、スクリーンショットで確かめる。"
               "「アセット画像（Code Connect なし）」は Figma に置かれた画像で、smarthr-ui のアイコンとして紐づいていない。"
               f"省略したもの: ノード ID・インスタンススワップの ID、false のブール、Variant の {'/'.join(sorted(FALSY_VARIANT_VALUES))}、"
               "オフのスロットの値、import 名（レイヤー名由来）。")
    if guides is None:
        out.append("")
        out.append("⚠ component-guidelines のガイド一覧が見つからず、ガイド名を確認できていない"
                   "（smarthr-design-system プラグインを入れると付く）。")
    if ctx.hoisted:
        out += ["", "## 共通値（全インスタンスで同じ値。各行からは省略）", ""]
        for key in sorted(ctx.hoisted):
            vals = " ".join(f"{k}={v}" for k, v in sorted(ctx.hoisted[key]))
            out.append(f"- {key}（{stats[key]['n']} 件）: {vals}")
    out += ["", "## 構造", ""] + lines

    out += ["", "## 要確認（スクリプトでは判断しない）", ""]
    labels = [
        ("slot", "スロット未展開（中身がインベントリに無い。get_metadata を同じ nodeId で呼び、<slot> の子の I…;… の ID を "
                 "get_design_context に渡す。取れなければ disableCodeConnect: true で呼び直す。"
                 "それでも取れなければスクリーンショットだけで読む）"),
        ("unmapped", "未紐づけ（Code Connect なし。レイヤー名と構造のみ）"),
        ("unresolved", "ガイドに解決できなかった import"),
        ("dup", "同じ識別子が別ファイルから二重に import されている（実体を判別できない）"),
        ("dup_resolved", "二重 import を props の名前で判別した（同じレスポンス内の別インスタンスと照合）"),
        ("weight", "フォントとウェイト変数の矛盾（どちらが正か不明）"),
        ("gap", "トークンに当てはまらない gap"),
        ("color", "トークン化されていない色"),
        ("hidden", "除外した非表示レイヤー"),
        ("parse", "読み取れなかった箇所（出力の書式が変わった可能性。生レスポンスで確認）"),
    ]
    any_note = False
    for key, label in labels:
        counts = {}
        for it in ctx.notes[key]:
            counts[it] = counts.get(it, 0) + 1
        items = [f"{it}（×{n}）" if n > 1 else it for it, n in counts.items()]
        if items:
            any_note = True
            out.append(f"- {label}: " + "、".join(items))
    if not any_note:
        out.append("- なし")
    out += ["", "## 次にすること（スクリプトでは判断していないこと）", "",
            "- スクリーンショットと照合し、インベントリに無い文言（プロパティとして公開されていないテキストの上書き）を拾う",
            "- ブールだけでアイコン名が無いもの（prefixIcon など）は、スクリーンショットでアイコンの形を確かめる",
            "- 「要確認」の各項目は、スクリーンショットで見た目を確かめてから判断する。ここでは解決しない",
            "- 「ボタン」「テーブル内容」のような Figma の既定の文言は、スクリーンショットでも同じか確かめる。勝手に置き換えない",
            "- props への変換は、component-guidelines の該当ガイド（`→ guide:` の名前）を読んでから行う。"
            "Figma の構造よりガイドの実装ルールを優先する。プロジェクトの smarthr-ui のバージョンがガイドと違うときは d.ts を正とする"]
    return "\n".join(out) + "\n"


def load_guides(args):
    if args.no_guides:
        return None
    d = args.guides_dir or find_guides_dir()
    if not d or not Path(d).is_dir():
        return None
    return {p.stem for p in Path(d).glob("*.md")}


# ---------------------------------------------------------------------------
# hook
# ---------------------------------------------------------------------------

PREFIX = "[figma-inventory]"
SCRIPT = Path(__file__).resolve()
PERSISTED_RE = re.compile(r"Output has been saved to (\S+?)\.?(?:\s|$)")
# Cursor が大きい結果を退避したファイルを探すとき、duration に足す余裕（秒）
SPILL_MARGIN_SEC = 5


class PersistedUnreadable(Exception):
    """退避の知らせはあったが、退避ファイルを読めなかった。"""

    def __init__(self, path, notice):
        super().__init__(path)
        self.path = path
        self.notice = notice


def text_blocks(resp):
    return [b.get("text", "") for b in resp if isinstance(b, dict) and b.get("type") == "text"]


def resolve_persisted(resp):
    """上限を超えた結果は、Claude Code（2.1.286 以降）が PostToolUse より先にファイルへ退避し、
    hook には「Output has been saved to <パス>」という知らせだけが渡る。その場合はファイルを読んで
    生の応答（content block の配列）に戻す。知らせでなければそのまま返す。"""
    if isinstance(resp, list):
        texts = text_blocks(resp)
        if len(texts) != 1:
            return resp
        text = texts[0]
    elif isinstance(resp, str):
        text = resp
    else:
        return resp
    if "Output has been saved to" not in text:
        return resp
    m = PERSISTED_RE.search(text)
    path = Path(m.group(1)) if m else None
    if path is None or not path.is_file():
        raise PersistedUnreadable(str(path) if path else None, text)
    try:
        return load_blocks(path)
    except ValueError:
        raise PersistedUnreadable(str(path), text)


def output_dir(data):
    """出力先。Claude Code が渡す scratchpad_dir を優先し、無ければ OS の一時ディレクトリの
    figma-inventory/<session_id>/（Cursor は scratchpad_dir を渡さない）。リポジトリの中には書かない。"""
    if data.get("scratchpad_dir"):
        return Path(data["scratchpad_dir"]) / "figma-inventory"
    session = re.sub(r"[^A-Za-z0-9_-]", "_", str(data.get("session_id") or "no-session"))
    return Path(tempfile.gettempdir()) / "figma-inventory" / session


def file_stem(tin):
    stem = f"{tin.get('fileKey', 'desktop')}_{str(tin.get('nodeId', 'selection')).replace(':', '-')}"
    return re.sub(r"[^A-Za-z0-9_-]", "_", stem)  # fileKey / nodeId は LLM が URL から組むので、パスに使える文字だけ残す


def added_args(tool, tin):
    """hook（pre_figma.py）が足した引数。Pre と Post の間で状態を持たないので、tool_input と既定値を比べて推定する
    （呼び出し側が既定値と同じ値を明示した場合も「足した」と出るが、実害は無い）。"""
    added = [f"{k}={json.dumps(v)}" for k, v in DEFAULTS.get(tool, {}).items() if tin.get(k) == v]
    return ", ".join(added) or "なし"


def manual_command(src, base, stem):
    return f"python3 {SCRIPT} --input {src} --output {base / (stem + '.inventory.md')}"


def find_image(resp):
    """画像のブロックから (base64 の本文, media type) を返す。Claude Code の形（source.data）と
    MCP の形（data / mimeType）の両方を読む。無ければ None。"""
    for b in resp:
        if not isinstance(b, dict) or b.get("type") != "image":
            continue
        src = b.get("source")
        if isinstance(src, dict) and src.get("data"):
            return src["data"], src.get("media_type") or "image/png"
        if b.get("data"):
            return b["data"], b.get("mimeType") or "image/png"
    return None


def image_ext(media_type):
    return re.sub(r"[^a-z0-9]", "", media_type.split("/")[-1]) or "png"


def image_size(data):
    """PNG の IHDR / JPEG の SOF から実寸 (幅, 高さ) を読む。読めなければ None。"""
    if data[:8] == b"\x89PNG\r\n\x1a\n" and data[12:16] == b"IHDR":
        return int.from_bytes(data[16:20], "big"), int.from_bytes(data[20:24], "big")
    if data[:2] != b"\xff\xd8":
        return None
    i = 2
    while i + 9 < len(data):
        if data[i] != 0xFF:
            return None
        marker = data[i + 1]
        if marker == 0xFF:  # 詰め物の 0xFF
            i += 1
            continue
        if marker in (0xD8, 0x01) or 0xD0 <= marker <= 0xD7:  # 長さを持たないマーカー
            i += 2
            continue
        if marker in (0xD9, 0xDA):  # SOF より前に EOI / SOS が来たら寸法は読めない
            return None
        seg_len = int.from_bytes(data[i + 2:i + 4], "big")
        if 0xC0 <= marker <= 0xCF and marker not in (0xC4, 0xC8, 0xCC):  # SOF0〜15（DHT / JPG / DAC を除く）
            return int.from_bytes(data[i + 7:i + 9], "big"), int.from_bytes(data[i + 5:i + 7], "big")
        i += 2 + seg_len
    return None


def screenshot_scale_desc(actual, meta):
    """保存した画像の実寸と、サーバーが申告したフレームの寸法（original_width / original_height）から
    倍率を判定する。サーバーの width / height は実際に届いた画像と食い違うことがあるので使わない
    （1512×2349 と申告され、実物は 1287×1999 の JPEG だった例がある）。"""
    ow, oh = meta.get("original_width"), meta.get("original_height")
    if not actual:
        return "実寸を読めない形式。倍率は不明なので、計測に使う前に user に報告する"
    aw, ah = actual
    if not (ow and oh):
        return f"実寸 {aw}×{ah}、フレームの寸法の申告なし。倍率は不明なので、計測に使う前に user に報告する"
    if (aw, ah) == (ow, oh):
        return f"実寸 {aw}×{ah}、フレームと等倍"
    sx, sy = aw / ow, ah / oh
    if abs(sx / sy - 1) > 0.01:
        return (f"実寸 {aw}×{ah}、フレーム {ow}×{oh}。縦横の倍率が違う（{sx:.4f} / {sy:.4f}）。"
                "計測に使う前に user に報告する")
    return (f"実寸 {aw}×{ah}、フレーム {ow}×{oh} の {sx:.4f} 倍に縮小。"
            f"画像上の px をフレームの px に直すときは {sx:.4f} で割る")


def handle_screenshot(base, stem, resp, added):
    """get_screenshot（enableBase64Response: true）の画像を保存し、結果をパスに差し替える。
    画像を直接 context に載せると等倍画像の分だけ重く、URL からのダウンロードは権限で止まりやすいため。"""
    try:
        b64, media_type = find_image(resp)
        base.mkdir(parents=True, exist_ok=True)
        path = base / f"{stem}.screenshot.{image_ext(media_type)}"
        raw = base64.b64decode(b64)
        path.write_bytes(raw)
        meta = {}
        for text in text_blocks(resp):
            try:
                meta = json.loads(text)
                break
            except (ValueError, TypeError):
                continue
        if not isinstance(meta, dict):
            meta = {}
        return "\n".join([
            f"{PREFIX} スクリーンショットをファイルに保存した（画像はコンテキストに載せていない）。hook が足した引数: {added}",
            f"- 画像（見るときは読む）: {path}",
            f"- {screenshot_scale_desc(image_size(raw), meta)}",
        ])
    except Exception as e:
        return (f"{PREFIX} ⚠ スクリーンショットの保存に失敗（{type(e).__name__}: {e}）。"
                "画像は破棄した。user に報告し、判断を仰ぐ（呼び直さない）。")


def no_code_message(resp, added):
    """コードを含まない応答（Code Connect の設定を求める文面・メタデータの XML など）。元の応答の後ろに続け方を足す。"""
    if find_image(resp) is not None:
        return None  # 画像を落とさないよう、そのまま流す
    original = "\n\n".join(text_blocks(resp))
    return "\n".join([
        original,
        "",
        f"{PREFIX} この応答にはコードが含まれていない。hook が足した引数: {added}",
        "- Code Connect の設定を求める文面なら、user には聞かず、同じ引数で 1 回だけ呼び直す。"
        "2 回目も同じなら、そこで止めて user に報告する（Code Connect のマッピング作業はしない）",
        "- XML（メタデータ）だけなら、forceCode: false が指定されている。コードが要るなら forceCode を外して呼び直す",
    ])


def handle_design_context(args, tin, base, stem, resp, added):
    try:
        base.mkdir(parents=True, exist_ok=True)
        raw_path = base / f"{stem}.raw.json"
        raw_path.write_text(json.dumps(resp, ensure_ascii=False), encoding="utf-8")
    except Exception as e:
        return (f"{PREFIX} ⚠ 生の応答の退避に失敗（{type(e).__name__}: {e}）。hook が足した引数: {added}\n"
                "コンテキストに載せないため、ツールの結果は破棄した。user に報告し、判断を仰ぐ（呼び直さない）。")
    try:  # 圧縮の失敗で生データを失わない
        guides = load_guides(args)
        inv = build_inventory(resp, guides, f"{tin.get('fileKey', '')} node {tin.get('nodeId', '')}")
        inv_path = base / f"{stem}.inventory.md"
        inv_path.write_text(inv, encoding="utf-8")
    except Exception as e:
        return "\n".join([
            f"{PREFIX} ⚠ インベントリの生成に失敗（{type(e).__name__}: {e}）。hook が足した引数: {added}",
            f"- 生の応答（全文は読まない）: {raw_path}",
            "user に報告し、判断を仰ぐ（呼び直さない。生の応答を全文読まない）。",
        ])
    raw_len = len(json.dumps(text_blocks(resp), ensure_ascii=False))
    msg = [f"{PREFIX} get_design_context の応答をインベントリに圧縮した（生のコード {raw_len:,} 文字 → {len(inv):,} 文字。"
           f"生のコードはコンテキストに載せていない）。hook が足した引数: {added}",
           f"- インベントリ（読む）: {inv_path}",
           f"- 生の応答（読まない。インベントリで足りないときだけ jq / grep で該当箇所を引く）: {raw_path}"]
    img = find_image(resp)
    if img:
        try:
            png = base / f"{stem}.{image_ext(img[1])}"
            png.write_bytes(base64.b64decode(img[0]))
            msg.append(f"- スクリーンショット（同梱の縮小版。計測には使わない）: {png}")
        except Exception as e:
            msg.append(f"- ⚠ スクリーンショットの保存に失敗: {type(e).__name__}: {e}")
    else:
        msg.append("- スクリーンショット: 未取得。見た目の確認が要るなら get_screenshot を同じ fileKey / nodeId で呼ぶ"
                   "（画像は hook がファイルに保存する）")
    if "⚠スロット未展開" in inv:
        msg += ["- ⚠ スロット未展開: ダイアログ等の中身が取れていない。このまま実装に進まず、次の順で取り直す:",
                "  1. get_metadata を同じ nodeId で呼び、<slot> の子の I…;… の ID を get_design_context に渡す",
                "  2. 取れなければ、同じ nodeId で disableCodeConnect: true を付けて get_design_context を呼び直す",
                "  3. それでも取れなければ、get_screenshot の画像だけで読む"]
    if guides is None:
        msg.append("- ⚠ component-guidelines のガイドが見つからず、ガイド名を付けていない。smarthr-design-system プラグインを入れると付く")
    return "\n".join(msg)


def persisted_unreadable_message(e, base, stem, added):
    lines = [f"{PREFIX} ⚠ 退避の知らせを読めなかった。退避ファイル: {e.path or '不明'}。hook が足した引数: {added}",
             "- 退避ファイルは読まない（20 万文字ほどある）。user に報告し、判断を仰ぐ（呼び直さない）。"]
    if e.path:
        lines.append(f"- 手で圧縮するときのコマンド: {manual_command(e.path, base, stem)}")
    else:
        lines.append(f"- 元の知らせ: {e.notice[:500]}")
    return "\n".join(lines)


def process(args, data):
    """hook の入力（Claude Code の形）を処理し、モデルに返す文言を返す。差し替えないときは None。"""
    tool = tool_kind(data.get("tool_name"))
    if tool not in DEFAULTS:
        return None
    tin = data.get("tool_input") or {}
    base, stem = output_dir(data), file_stem(tin)
    added = added_args(tool, tin)
    try:
        resp = resolve_persisted(data.get("tool_response"))
    except PersistedUnreadable as e:
        return persisted_unreadable_message(e, base, stem, added)
    if not isinstance(resp, list):
        return None
    if tool == "get_screenshot":
        if find_image(resp) is None:
            return None  # URL だけの応答は短いのでそのまま流す
        return handle_screenshot(base, stem, resp, added)
    if split_response(resp) is None:
        return no_code_message(resp, added)
    return handle_design_context(args, tin, base, stem, resp, added)


def find_spilled(data):
    """Cursor が先に退避した大きい結果のファイルを探す。戻り値: (候補のパスのリスト, 探したフォルダ or None)。
    退避先のパスは hook に渡らないので、transcript_path の 3 つ上の agent-tools/ から、
    ツールの実行時間内に書かれていて、中身に nodeId を含むものを探す。"""
    tp = data.get("transcript_path")
    if not tp:
        return [], None
    folder = Path(tp).parents[2] / "agent-tools"
    if not folder.is_dir():
        return [], folder
    duration = data.get("duration")
    window = (duration / 1000 if isinstance(duration, (int, float)) else 120) + SPILL_MARGIN_SEC
    since = time.time() - window
    cands = [p for p in folder.glob("*.txt") if p.stat().st_mtime >= since]
    node = str((data.get("tool_input") or {}).get("nodeId") or "")
    if node:
        keys = {node, node.replace("-", ":"), node.replace(":", "-")}
        cands = [p for p in cands if any(k in p.read_text(encoding="utf-8", errors="replace") for k in keys)]
    return sorted(cands), folder


def spill_ambiguous_message(data, cands, folder):
    tin = data.get("tool_input") or {}
    base, stem = output_dir(data), file_stem(tin)
    lines = [f"{PREFIX} ⚠ 大きい応答が退避されたが、退避ファイルを 1 つに絞れなかった（候補 {len(cands)} 件）。"]
    if cands:
        lines.append("- 候補: " + " / ".join(str(p) for p in cands))
    else:
        lines.append(f"- 探したフォルダ: {folder or '不明（transcript_path が無い）'}")
    lines += ["- 退避ファイルは読まない（20 万文字ほどある）。user に報告し、判断を仰ぐ。",
              f"  手で圧縮するときのコマンド: {manual_command(cands[0] if len(cands) == 1 else '<候補のパス>', base, stem)}"]
    return "\n".join(lines)


def from_cursor(data):
    """Cursor の postToolUse の入力を Claude Code の形（tool_response に content block の配列）に直す。
    戻り値: (直した入力 or None, 文言 or None)。入力が None なら差し替えない。文言があればそれをそのまま返す。"""
    raw = data.get("tool_output")
    result = json.loads(raw) if isinstance(raw, str) else raw
    if isinstance(result, dict):
        if result.get("isError"):
            return None, None
        content = result.get("content")
    else:
        content = result
    if not isinstance(content, list):
        return None, None
    out = dict(data)
    texts = text_blocks(content)
    # 大きい結果は Cursor が先に退避し、hook には本文が空の結果だけが渡る（退避先のパスは渡らない）
    if tool_kind(data.get("tool_name")) == "get_design_context" and find_image(content) is None \
            and not any(t.strip() for t in texts):
        cands, folder = find_spilled(data)
        if len(cands) != 1:
            return out, spill_ambiguous_message(data, cands, folder)
        # 退避ファイルはテキストのブロックをつないだもの（JSON ではない）。1 つのテキストのブロックとして扱う
        content = [{"type": "text", "text": cands[0].read_text(encoding="utf-8")}]
    out["tool_response"] = content
    return out, None


def hook_result(mode, args, raw):
    """stdin の hook 入力（JSON の文字列）から hook の出力（JSON にするオブジェクト）を作る。
    Claude Code で出力しないときは None。"""
    text = None
    if not hook_disabled():
        # hook が非ゼロ終了や無出力で終わると、元の生の応答がそのまま context に載る。
        # それを防ぐため、どこで失敗しても差し替えの文言を返す。
        try:
            data = json.loads(raw)
            if mode == "cursor":
                data, text = from_cursor(data)
            if data is not None and text is None:
                text = process(args, data)
        except Exception as e:
            text = (f"{PREFIX} ⚠ hook の入力を読めなかった（{type(e).__name__}: {e}）。"
                    "ツールの結果は破棄した。user に報告し、判断を仰ぐ（呼び直さない）。")
    if mode == "cursor":
        return {"updated_mcp_tool_output": {"content": [{"type": "text", "text": text}]}} if text is not None else {}
    if text is None:
        return None
    return {"hookSpecificOutput": {"hookEventName": "PostToolUse", "updatedToolOutput": text}}


def run_hook(args):
    out = hook_result(args.hook, args, sys.stdin.read())
    if out is not None:
        print(json.dumps(out, ensure_ascii=False))
    return 0


def run_input(args):
    blocks = load_blocks(args.input)
    inv = build_inventory(blocks, load_guides(args), Path(args.input).name)
    if inv is None:
        print("error: 応答に参照コードが無い（Code Connect の設定を求める応答かメタデータのみの応答）", file=sys.stderr)
        return 1
    if args.output:
        Path(args.output).write_text(inv, encoding="utf-8")
        raw_len = len(json.dumps(text_blocks(blocks), ensure_ascii=False))
        print(json.dumps({"inventory": args.output, "chars": len(inv), "raw_text_chars": raw_len}, ensure_ascii=False))
    else:
        sys.stdout.write(inv)
    return 0


# ---------------------------------------------------------------------------
# selftest
# ---------------------------------------------------------------------------

def selftest_pre():
    """pre_figma.py: 指定が無い引数にだけ既定値を入れ、指定済みの引数は上書きしない。"""
    cases = [
        ("既定値を全部足す", "mcp__figma-remote__get_design_context", {"fileKey": "k", "nodeId": "1:2"},
         {"fileKey": "k", "nodeId": "1:2", "forceCode": True, "excludeScreenshot": True, "disableCodeConnect": False}),
        ("指定済みの disableCodeConnect を上書きしない", "mcp__claude_ai_Figma__get_design_context",
         {"nodeId": "1:2", "disableCodeConnect": True},
         {"nodeId": "1:2", "disableCodeConnect": True, "forceCode": True, "excludeScreenshot": True}),
        ("指定済みの forceCode: false を上書きしない", "MCP:get_design_context",
         {"nodeId": "1:2", "forceCode": False, "excludeScreenshot": True, "disableCodeConnect": False}, None),
        ("Cursor の get_screenshot", "MCP:get_screenshot", {"nodeId": "1:2", "maxDimension": 1024},
         {"nodeId": "1:2", "maxDimension": 1024, "enableBase64Response": True}),
        ("対象外のツール", "mcp__figma-remote__get_metadata", {"nodeId": "1:2"}, None),
    ]
    failed = 0
    for label, name, tin, want in cases:
        got = fill_defaults(name, tin)
        if got != want:
            failed += 1
            print(f"FAIL pre: {label}（{got}）")
    data = json.loads((HERE.parent / "tests/hook-inputs/cursor-pre.json").read_text(encoding="utf-8"))
    checks = [
        ("Claude Code の出力の形", pre_hook_output("claude", data),
         lambda o: o["hookSpecificOutput"]["updatedInput"]["forceCode"] is True
         and o["hookSpecificOutput"]["hookEventName"] == "PreToolUse" and "permissionDecision" not in o["hookSpecificOutput"]),
        ("Cursor の出力の形", pre_hook_output("cursor", data),
         lambda o: o["updated_input"]["forceCode"] is True and "permission" not in o),
        ("足すものが無い Claude Code は出力しない", pre_hook_output("claude", {"tool_name": "x", "tool_input": {}}),
         lambda o: o is None),
        ("足すものが無い Cursor は {}", pre_hook_output("cursor", {"tool_name": "x", "tool_input": {}}),
         lambda o: o == {}),
    ]
    for label, got, ok in checks:
        if not ok(got):
            failed += 1
            print(f"FAIL pre: {label}（{got}）")
    if not failed:
        print(f"ok   pre_figma（{len(cases) + len(checks)} 件）")
    return failed


def selftest_hook():
    """extract_figma.py --hook claude / cursor の入口。入力の例は tests/hook-inputs/ にある。"""
    import types
    args = types.SimpleNamespace(no_guides=True, guides_dir=None)
    blocks = load_blocks(FIXTURE_DIR / "smarthr-ui-289-4403.raw.json")
    tin = {"fileKey": "EXAMPLEFILEKEY", "nodeId": "289:4403",
           "forceCode": True, "excludeScreenshot": True, "disableCodeConnect": False}
    compressed = f"{PREFIX} get_design_context の応答をインベントリに圧縮した"
    added_all = "hook が足した引数: forceCode=true, excludeScreenshot=true, disableCodeConnect=false"
    failed = 0
    count = 0

    def text_of(mode, out):
        if out is None or out == {}:
            return None
        if mode == "cursor":
            return out["updated_mcp_tool_output"]["content"][0]["text"]
        return out["hookSpecificOutput"]["updatedToolOutput"]

    def check(label, mode, data, ok, env=None):
        nonlocal failed, count
        count += 1
        saved = os.environ.get("FIGMA_INVENTORY_HOOK")
        os.environ.pop("FIGMA_INVENTORY_HOOK", None)
        os.environ.update(env or {})
        try:
            out = hook_result(mode, args, json.dumps(data, ensure_ascii=False))
            text = text_of(mode, out)
            good = ok(out, text)
        except Exception as e:
            out, good = f"{type(e).__name__}: {e}", False
        finally:
            os.environ.pop("FIGMA_INVENTORY_HOOK", None)
            if saved is not None:
                os.environ["FIGMA_INVENTORY_HOOK"] = saved
        if not good:
            failed += 1
            print(f"FAIL hook {mode}: {label}\n{json.dumps(out, ensure_ascii=False)[:1500]}")

    def inventory_ok(text):
        m = re.search(r"- インベントリ（読む）: (\S+)", text or "")
        return bool(m) and "## 次にすること" in Path(m.group(1)).read_text(encoding="utf-8")

    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)
        saved_tempdir = tempfile.tempdir
        tempfile.tempdir = str(tmp / "os-tmp")  # 出力先の既定（OS の一時ディレクトリ）をテスト用に差し替える
        (tmp / "os-tmp").mkdir()
        try:
            claude = {"session_id": "s1", "tool_name": "mcp__figma-remote__get_design_context", "tool_input": tin,
                      "scratchpad_dir": str(tmp / "scratch")}
            check("コードを含む応答を圧縮する", "claude", dict(claude, tool_response=blocks),
                  lambda o, t: t.startswith(compressed) and added_all in t and str(tmp / "scratch" / "figma-inventory") in t
                  and "スクリーンショット: 未取得" in t and inventory_ok(t))
            persisted = tmp / "persisted.json"
            persisted.write_text(json.dumps(blocks, ensure_ascii=False), encoding="utf-8")
            notice = [{"type": "text", "text": "Error: result (52,000 tokens) exceeds maximum allowed tokens. "
                                               f"Output has been saved to {persisted}.\nUse offset and limit ..."}]
            check("先に退避された応答を読んで圧縮する", "claude", dict(claude, tool_response=notice),
                  lambda o, t: t.startswith(compressed) and inventory_ok(t))
            missing = [{"type": "text", "text": f"Output has been saved to {tmp / 'missing.json'}."}]
            check("退避ファイルが無ければ手で圧縮するコマンドを返す", "claude", dict(claude, tool_response=missing),
                  lambda o, t: t.startswith(f"{PREFIX} ⚠ 退避の知らせを読めなかった") and str(SCRIPT) in t)
            gate = [{"type": "text", "text": "missing code connect mappings. Please ask the user ..."}]
            check("コードを含まない応答には続け方を足す", "claude", dict(claude, tool_response=gate),
                  lambda o, t: t.startswith("missing code connect mappings") and "この応答にはコードが含まれていない" in t)
            # スロット未展開は SmartHR UI のライブラリファイルで再現するフレームが無い（ダイアログのスロットが空の -1:-1）。
            # プロダクトの応答は置けないので、形だけを手で書いた最小のコードで確かめる
            slot_code = ('import ActionDialog from "https://example.com/' + SMARTHR_UI_PREFIX + 'Dialog/ActionDialog.tsx";\n'
                         'export default function Frame() {\n  return (<div data-name="画面">'
                         '<CodeConnectSnippet data-node-id="1:3" data-name="ActionDialog" '
                         'options={[<ActionDialog slotContentsArea="1:4" contentsArea="1:4" />]} /></div>);\n}\n')
            check("スロット未展開なら取り直しの手順を書く", "claude",
                  dict(claude, tool_response=[{"type": "text", "text": slot_code}]),
                  lambda o, t: "⚠ スロット未展開: ダイアログ等の中身が取れていない" in t and inventory_ok(t))
            no_scratch = {k: v for k, v in claude.items() if k != "scratchpad_dir"}
            check("scratchpad_dir が無ければ OS の一時ディレクトリに書く", "claude", dict(no_scratch, tool_response=blocks),
                  lambda o, t: str(tmp / "os-tmp" / "figma-inventory" / "s1") in t)
            check("FIGMA_INVENTORY_HOOK=off なら何もしない", "claude", dict(claude, tool_response=blocks),
                  lambda o, t: o is None, env={"FIGMA_INVENTORY_HOOK": "off"})

            png = b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR" + (756).to_bytes(4, "big") + (500).to_bytes(4, "big") + b"\x08\x02"
            meta = json.dumps({"original_width": 1512, "original_height": 1000})
            shot_tin = {"fileKey": "k", "nodeId": "1:2", "enableBase64Response": True, "maxDimension": 4096}
            shot = [{"type": "text", "text": meta},
                    {"type": "image", "source": {"type": "base64", "media_type": "image/png",
                                                 "data": base64.b64encode(png).decode()}}]
            check("スクリーンショットを保存して倍率を書く", "claude",
                  dict(claude, tool_name="mcp__figma-remote__get_screenshot", tool_input=shot_tin, tool_response=shot),
                  lambda o, t: "0.5000 倍に縮小" in t and "maxDimension=4096" in t)

            # Cursor: tool_output は MCP の結果を JSON にした文字列。入力の例は tests/hook-inputs/
            example = json.loads((HERE.parent / "tests/hook-inputs/cursor-post-spilled.json").read_text(encoding="utf-8"))
            project = tmp / "cursor-project"
            transcript = project / "agent-transcripts" / "u1" / "u1.jsonl"
            transcript.parent.mkdir(parents=True)
            agent_tools = project / "agent-tools"
            agent_tools.mkdir()
            cursor = dict(example, transcript_path=str(transcript), tool_input=tin)
            check("本文がある応答を圧縮する", "cursor",
                  dict(cursor, tool_output=json.dumps({"content": blocks}, ensure_ascii=False)),
                  lambda o, t: t.startswith(compressed) and added_all in t
                  and str(tmp / "os-tmp" / "figma-inventory" / example["session_id"]) in t and inventory_ok(t))
            check("isError なら差し替えない", "cursor",
                  dict(cursor, tool_output=json.dumps({"content": [{"type": "text", "text": "boom"}], "isError": True})),
                  lambda o, t: o == {})
            check("FIGMA_INVENTORY_HOOK=off なら {}", "cursor", cursor, lambda o, t: o == {},
                  env={"FIGMA_INVENTORY_HOOK": "off"})
            check("退避ファイルが見つからなければ探したフォルダを書く", "cursor", cursor,
                  lambda o, t: "候補 0 件" in t and str(agent_tools) in t)
            spilled = "\n".join(text_blocks(blocks))
            (agent_tools / "a.txt").write_text(spilled, encoding="utf-8")
            (agent_tools / "other.txt").write_text("node 1:2 の別の結果", encoding="utf-8")
            check("本文が空なら agent-tools/ の退避ファイルを圧縮する", "cursor", cursor,
                  lambda o, t: t.startswith(compressed) and inventory_ok(t))
            (agent_tools / "b.txt").write_text(spilled, encoding="utf-8")
            check("退避ファイルの候補が複数なら差し替えずに知らせる", "cursor", cursor,
                  lambda o, t: "候補 2 件" in t and str(agent_tools / "a.txt") in t and str(SCRIPT) in t)
            mcp_shot = [{"type": "text", "text": meta},
                        {"type": "image", "mimeType": "image/png", "data": base64.b64encode(png).decode()}]
            check("MCP の形の画像を保存する", "cursor",
                  dict(cursor, tool_name="MCP:get_screenshot", tool_input=shot_tin,
                       tool_output=json.dumps({"content": mcp_shot})),
                  lambda o, t: "0.5000 倍に縮小" in t)
        finally:
            tempfile.tempdir = saved_tempdir
    if not failed:
        print(f"ok   hook（{count} 件）")
    return failed


def selftest_guides():
    """import 先からガイド名を引く規則。ガイドの一覧は増減・改名するので、ここで使う一覧は手で書いた最小のもの。"""
    resolver = Resolver({}, {"Button", "Header", "AppLauncher"})
    cases = [
        ("ファイル名がガイド名", "Button/Button.tsx", ("Button", "Button", "guide")),
        ("フォルダ名から部品として結び付く", "Header/HeaderLink.tsx", ("Header", "HeaderLink", "part")),
        ("入れ子でもファイル名を優先する", "Header/AppLauncher/AppLauncher.tsx", ("AppLauncher", "AppLauncher", "guide")),
        ("アイコン", "Icon/Icon.tsx", (None, "Icon", "icon")),
        ("ガイドが無い", "Foo/Foo.tsx", (None, "Foo", "unknown")),
    ]
    failed = 0
    for label, path, want in cases:
        got = resolver.resolve_path(f"{SMARTHR_UI_PREFIX}{path}")
        if got != want:
            failed += 1
            print(f"FAIL guides: {label}（{got}）")
    for old, new in RENAMED_COMPONENTS.items():
        got = Resolver({}, {new}).resolve_path(f"{SMARTHR_UI_PREFIX}{old}/{old}.tsx")
        if got != (new, old, "guide"):
            failed += 1
            print(f"FAIL guides: 旧名 {old} が新名 {new} のガイドに結び付かない（{got}）")
    if Resolver({}, None).resolve_path(f"{SMARTHR_UI_PREFIX}Button/Button.tsx") != (None, "Button", "unknown"):
        failed += 1
        print("FAIL guides: 一覧が無いときにガイド名を付けた")
    if not failed:
        print(f"ok   guides（{len(cases) + len(RENAMED_COMPONENTS) + 1} 件）")
    return failed


def run_selftest(args):
    # fixture はガイドの一覧なしで比べる（ガイドの増減・改名で期待出力が変わらないように）。
    # ガイド名の付け方は selftest_guides で確かめる
    failed = 0
    for raw in sorted(FIXTURE_DIR.glob("*.raw.json")):
        name = raw.name[:-len(".raw.json")]
        inv = build_inventory(load_blocks(raw), None, raw.name)
        exp = FIXTURE_DIR / f"{name}.expected.md"
        if args.update_expected:
            exp.write_text(inv, encoding="utf-8")
            print(f"updated {exp.name}")
            continue
        if not exp.exists() or exp.read_text(encoding="utf-8") != inv:
            failed += 1
            print(f"FAIL {name}（{exp.name} と不一致。差分は --input {raw} --no-guides の出力と diff で確認）")
        else:
            print(f"ok   {name}")
    failed += selftest_guides()
    failed += selftest_pre()
    failed += selftest_hook()
    return 1 if failed else 0


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    mode = ap.add_mutually_exclusive_group(required=True)
    mode.add_argument("--hook", nargs="?", const="claude", choices=("claude", "cursor"),
                      help="PostToolUse hook として stdin の JSON を処理する（既定は claude）")
    mode.add_argument("--input", help="content block の JSON 配列ファイル（JSON でなければ全体を 1 つのテキストとして読む）")
    mode.add_argument("--selftest", action="store_true", help="tests/ の fixture と hook の入力の例で確かめる")
    ap.add_argument("--output", help="--input のときの出力先（省略時は stdout）")
    ap.add_argument("--guides-dir", help="component-guidelines/components のパス（省略時は自動検出）")
    ap.add_argument("--no-guides", action="store_true",
                    help="ガイド名を付けない（selftest と同じ、ガイドの一覧に依存しない出力にする）")
    ap.add_argument("--update-expected", action="store_true", help="--selftest で期待出力を書き換える")
    args = ap.parse_args()
    if args.hook:
        return run_hook(args)
    if args.selftest:
        return run_selftest(args)
    return run_input(args)


if __name__ == "__main__":
    sys.exit(main())
