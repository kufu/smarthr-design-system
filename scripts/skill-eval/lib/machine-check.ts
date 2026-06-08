import { parse } from '@typescript-eslint/parser';

import type { TestPrompt } from '../prompts.ts';
import { runEslint } from './eslint-runner.ts';
import { isCommonAttr, loadComponentNames, loadPropMap } from './metadata.ts';

const PROP_MAP = loadPropMap();
const COMPONENT_NAMES = loadComponentNames();

/** smarthr-ui コンポーネントの代替が存在する代表的な native HTML 要素 */
const NATIVE_ELEMENTS_WITH_ALTERNATIVE = new Set([
  'div',
  'span',
  'button',
  'a',
  'table',
  'thead',
  'tbody',
  'tr',
  'td',
  'th',
  'input',
  'textarea',
  'select',
  'label',
  'form',
  'fieldset',
  'dl',
  'dt',
  'dd',
  'ul',
  'ol',
]);

export type MachineCheck = {
  /** ---- 最小ハードゲート ---- */
  parseable: boolean;
  hasSmarthrUiImport: boolean;
  /** ゲート通過（parseable かつ smarthr-ui import あり）→ Judge へ回す */
  gatePassed: boolean;

  /** ---- 減点シグナル ---- */
  /** 期待コンポーネントのいずれかを使用したか */
  usedExpected: boolean;
  /** 実際に使用した smarthr-ui コンポーネント名 */
  usedSmarthrComponents: string[];
  /** eslint-config-smarthr の smarthr/* 違反数 */
  eslintSmarthrViolations: number;
  eslintByRule: Record<string, number>;
  eslintError?: string;
  /** metadata.json に存在しない props を smarthr-ui コンポーネントに渡した件数 */
  unknownPropCount: number;
  unknownProps: Array<{ component: string; prop: string }>;
  /** 代替コンポーネントがあるのに使われた native HTML 要素の件数 */
  nativeHtmlCount: number;
  nativeHtmlElements: string[];

  parseError?: string;
};

type AnyNode = Record<string, unknown> & { type: string };

function walk(node: unknown, visit: (n: AnyNode) => void): void {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    for (const child of node) walk(child, visit);
    return;
  }
  const n = node as AnyNode;
  if (typeof n.type === 'string') visit(n);
  for (const key of Object.keys(n)) {
    if (key === 'parent') continue;
    walk((n as Record<string, unknown>)[key], visit);
  }
}

function jsxNameToString(nameNode: AnyNode): string {
  // JSXIdentifier / JSXMemberExpression (例: Foo.Bar) → ルート名を返す
  if (nameNode.type === 'JSXIdentifier') return String(nameNode.name);
  if (nameNode.type === 'JSXMemberExpression') {
    return jsxNameToString(nameNode.object as AnyNode);
  }
  return '';
}

export async function runMachineCheck(
  code: string,
  prompt: TestPrompt,
): Promise<MachineCheck> {
  // --- パース（最小ゲート 1） ---
  let ast: AnyNode | null = null;
  let parseError: string | undefined;
  try {
    ast = parse(code, {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
    }) as unknown as AnyNode;
  } catch (e) {
    parseError = e instanceof Error ? e.message : String(e);
  }

  const result: MachineCheck = {
    parseable: ast !== null,
    hasSmarthrUiImport: false,
    gatePassed: false,
    usedExpected: false,
    usedSmarthrComponents: [],
    eslintSmarthrViolations: 0,
    eslintByRule: {},
    unknownPropCount: 0,
    unknownProps: [],
    nativeHtmlCount: 0,
    nativeHtmlElements: [],
    parseError,
  };

  if (!ast) return result;

  // --- import / JSX 解析 ---
  const smarthrImportedNames = new Set<string>();
  const usedComponents = new Set<string>();
  const nativeElements: string[] = [];
  const unknownProps: Array<{ component: string; prop: string }> = [];

  walk(ast, (n) => {
    if (n.type === 'ImportDeclaration') {
      const source = n.source as AnyNode | undefined;
      if (source && source.value === 'smarthr-ui') {
        result.hasSmarthrUiImport = true;
        for (const spec of (n.specifiers as AnyNode[]) ?? []) {
          if (spec.type === 'ImportSpecifier') {
            const imported = spec.imported as AnyNode;
            const local = spec.local as AnyNode;
            smarthrImportedNames.add(String(imported?.name ?? local?.name));
          }
        }
      }
    }

    if (n.type === 'JSXOpeningElement') {
      const tag = jsxNameToString(n.name as AnyNode);
      const isComponent = /^[A-Z]/.test(tag);
      if (isComponent) {
        if (smarthrImportedNames.has(tag) || COMPONENT_NAMES.has(tag)) {
          usedComponents.add(tag);
        }
        // props 照合（smarthr-ui 由来コンポーネントのみ対象）
        if (smarthrImportedNames.has(tag) && PROP_MAP.has(tag)) {
          const known = PROP_MAP.get(tag)!;
          for (const attr of (n.attributes as AnyNode[]) ?? []) {
            if (attr.type !== 'JSXAttribute') continue; // spread は対象外
            const attrName = String((attr.name as AnyNode)?.name ?? '');
            if (!attrName) continue;
            if (known.has(attrName) || isCommonAttr(attrName)) continue;
            unknownProps.push({ component: tag, prop: attrName });
          }
        }
      } else if (tag && NATIVE_ELEMENTS_WITH_ALTERNATIVE.has(tag)) {
        nativeElements.push(tag);
      }
    }
  });

  result.usedSmarthrComponents = [...usedComponents].sort();
  result.usedExpected = prompt.expected.some((e) => usedComponents.has(e));
  result.unknownProps = unknownProps;
  result.unknownPropCount = unknownProps.length;
  result.nativeHtmlElements = nativeElements;
  result.nativeHtmlCount = nativeElements.length;

  result.gatePassed = result.parseable && result.hasSmarthrUiImport;

  // --- eslint（ゲート通過時のみ実行） ---
  if (result.gatePassed) {
    const eslint = await runEslint(code);
    result.eslintSmarthrViolations = eslint.smarthrViolations;
    result.eslintByRule = eslint.smarthrByRule;
    result.eslintError = eslint.error;
  }

  return result;
}
