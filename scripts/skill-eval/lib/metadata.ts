import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

type RawProp = { name: string };
type RawComponent = { displayName: string; filePath: string; props: RawProp[] };

/**
 * metadata.json から displayName -> 公開 Props 名の Set を構築する。
 * props 照合（独自 props 誤用の検出）に使う。
 * metadata.json は固有 Props のみを持ち、継承された DOM/HTML 属性は含まない点に注意
 * （HTML 標準属性は別途 allowlist で許容する）。
 */
export function loadPropMap(): Map<string, Set<string>> {
  const data = require('smarthr-ui/metadata.json') as RawComponent[];
  const map = new Map<string, Set<string>>();
  for (const c of data) {
    if (!map.has(c.displayName)) map.set(c.displayName, new Set());
    const set = map.get(c.displayName)!;
    for (const p of c.props) set.add(p.name);
  }
  return map;
}

/** 公開コンポーネントの displayName 集合（smarthr-ui の実在コンポーネント判定用） */
export function loadComponentNames(): Set<string> {
  const data = require('smarthr-ui/metadata.json') as RawComponent[];
  return new Set(data.map((c) => c.displayName));
}

/**
 * smarthr-ui コンポーネントに渡しても props 照合上「未知」とみなさない、
 * React / DOM 標準・共通属性の allowlist。metadata.json に出てこないが正当なもの。
 */
export const COMMON_ATTRS = new Set<string>([
  'key',
  'ref',
  'className',
  'style',
  'id',
  'role',
  'tabIndex',
  'title',
  'children',
  'as',
  'type',
  'name',
  'value',
  'defaultValue',
  'placeholder',
  'disabled',
  'readOnly',
  'required',
  'checked',
  'defaultChecked',
  'href',
  'target',
  'rel',
  'src',
  'alt',
  'width',
  'height',
  'autoFocus',
  'autoComplete',
  'min',
  'max',
  'step',
  'maxLength',
  'minLength',
  'pattern',
  'multiple',
  'form',
  'htmlFor',
]);

/** onXxx 系イベントハンドラ・data-*・aria-* は一律許容 */
export function isCommonAttr(name: string): boolean {
  if (COMMON_ATTRS.has(name)) return true;
  if (/^on[A-Z]/.test(name)) return true;
  if (name.startsWith('data-')) return true;
  if (name.startsWith('aria-')) return true;
  return false;
}
