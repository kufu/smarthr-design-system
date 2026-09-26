import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

import metadata from 'smarthr-ui/metadata.json' with { type: 'json' };

import { buildDirMapping } from './name-mapping.js';

export type PropType = {
  name: string;
  raw?: string;
  value?: Array<{ value: string | boolean | number }>;
};

export type PropMeta = {
  name: string;
  type: PropType;
  defaultValue: { value: string | boolean | number } | null;
  description: string;
  required: boolean;
};

export type ComponentMeta = {
  displayName: string;
  filePath: string;
  description: string;
  props: PropMeta[];
};

export type ComponentGroup = {
  dirName: string;
  displayNames: string[];
  components: ComponentMeta[];
};

type ExportSpecifier = {
  /** smarthr-ui 内部での名前（`Panel as Base` の `Panel`） */
  local: string;
  /** 公開名（`Panel as Base` の `Base`。別名でなければ local と同じ） */
  exported: string;
};

function loadExportSpecifiers(): ExportSpecifier[] {
  const require = createRequire(import.meta.url);
  const pkgDir = path.dirname(require.resolve('smarthr-ui/package.json'));
  const dtsPath = path.join(pkgDir, 'lib', 'index.d.ts');
  return parseExportSpecifiers(fs.readFileSync(dtsPath, 'utf-8'));
}

/**
 * smarthr-ui の lib/index.d.ts の `export { ... } from` 行から、大文字始まりの export 指定子を返す。
 */
export function parseExportSpecifiers(src: string): ExportSpecifier[] {
  const specifiers: ExportSpecifier[] = [];
  for (const line of src.split('\n')) {
    if (!line.startsWith('export {')) continue;
    const m = line.match(/\{([^}]+)\}/);
    if (!m) continue;
    for (const token of m[1].split(',')) {
      const [local, exported = local] = token.trim().split(/\s+as\s+/);
      if (exported && /^[A-Z]/.test(exported)) specifiers.push({ local, exported });
    }
  }
  return specifiers;
}

/**
 * smarthr-ui の lib/index.d.ts から public named exports の Set を返す。
 * この Set でフィルタすることで内部実装コンポーネントを除外できる。
 * `export { Panel as Base }` のような別名 export は公開名（`Base`）で登録する。
 */
export function loadPublicExports(): Set<string> {
  return new Set(loadExportSpecifiers().map((s) => s.exported));
}

/**
 * smarthr-ui の lib/index.d.ts から別名 export を「公開名 → 元の名前」で返す。
 * 例: `export { Panel, Panel as Base }` → `Base` → `Panel`
 */
export function loadPublicExportAliases(): Map<string, string> {
  const aliases = new Map<string, string>();
  for (const { local, exported } of loadExportSpecifiers()) {
    if (local !== exported) aliases.set(exported, local);
  }
  return aliases;
}

/**
 * 別名 export のうち design-system 側に専用ページ（index.mdx）があるものを、元コンポーネントの
 * metadata を引き継いだ独立グループとして追加する。
 *
 * 名称変更後も旧名称が別名 export として残っている間（例: Base → Panel）、旧名称の非推奨ページ
 * （`base/index.mdx`）からドキュメントを生成し、旧名称を使うコードベースでも新名称への移行を
 * エージェントに伝えるため。metadata.json に同名の displayName がある場合（smarthr-ui 側で
 * 実体のあるコンポーネントになった場合）はそちらを優先し、追加しない。
 */
export function addAliasGroups(
  groups: Map<string, ComponentGroup>,
  aliases: Map<string, string>,
  designSystemDir: string,
): Map<string, ComponentGroup> {
  const componentsByName = new Map<string, ComponentMeta>();
  for (const group of groups.values()) {
    for (const component of group.components) componentsByName.set(component.displayName, component);
  }
  const pageMapping = buildDirMapping([...aliases.keys()], designSystemDir, {});

  for (const [alias, original] of aliases) {
    if (groups.has(alias) || componentsByName.has(alias) || !pageMapping.has(alias)) continue;
    const target = componentsByName.get(original);
    if (!target) continue;
    groups.set(alias, {
      dirName: alias,
      displayNames: [alias],
      components: [{ ...target, displayName: alias }],
    });
  }
  return groups;
}

/**
 * smarthr-ui の metadata.json をコンポーネントグループに整形して返す。
 *
 * 対応する filePath:
 * - `src/components/<Component>/<Component>.tsx` (通常パターン)
 *   グルーピングキーは直上ディレクトリ名 (例: `Button`)。
 * - `src/intl/<Component>.tsx` (フラット構成。`DateFormatter` / `TimeFormatter` / `TimestampFormatter` 等)
 *   グルーピングキーは displayName そのまま (1 file = 1 component)。
 *
 * publicExports を渡すと、そこに含まれない displayName を除外する。
 */
export function parseMetadata(publicExports?: Set<string>): Map<string, ComponentGroup> {
  const data = metadata as unknown as ComponentMeta[];
  const groups = new Map<string, ComponentGroup>();

  for (const component of data) {
    const isComponentsDir = component.filePath.startsWith('src/components/');
    const isIntlDir = component.filePath.startsWith('src/intl/');
    if (!isComponentsDir && !isIntlDir) continue;

    if (isComponentsDir) {
      // 内部実装パターン (例: src/components/AppHeader/components/desktop/AppLauncher.tsx) を除外。
      // 同一 displayName が別所で公開エクスポートされる場合はそちらの定義のみ採用。
      const rest = component.filePath.slice('src/components/'.length);
      if (rest.includes('/components/')) continue;
    }
    if (/^Fa.+Icon$/.test(component.displayName)) continue;
    // Context Provider 系 (IntlProvider / StepFormDialogProvider 等) は UI コンポーネントではなく
    // 設計システムのドキュメント対象外。`src/components/` 配下では従来から SKILL 化されておらず、
    // src/intl/ から取り込んだ際に意図せず対象化されるのを防ぐため除外する。
    if (/Provider$/.test(component.displayName)) continue;
    if (publicExports && !publicExports.has(component.displayName)) continue;

    let dirName: string;
    if (isIntlDir) {
      // src/intl/ 配下はフラット構成。displayName を dirName とする
      // (design-system 側のディレクトリ名 kebab-case と pascalToKebab 経由で対応付け可能)。
      dirName = component.displayName;
    } else {
      const parts = component.filePath.split('/');
      if (parts.length < 3) continue;
      dirName = parts[parts.length - 2];
    }

    if (!groups.has(dirName)) {
      groups.set(dirName, { dirName, displayNames: [], components: [] });
    }

    const group = groups.get(dirName)!;
    group.displayNames.push(component.displayName);
    group.components.push(component);
  }

  return groups;
}

export function formatType(prop: PropMeta): string {
  const { type } = prop;

  if (type.name === 'enum' && type.value && type.value.length > 0) {
    const allStringLiterals = type.value.every(
      (v) => typeof v.value === 'string' && (v.value.startsWith('"') || v.value.startsWith("'")),
    );

    if (allStringLiterals) {
      const values = type.value.map((v) => String(v.value));
      if (values.length > 10) {
        return `${values.slice(0, 5).join(' | ')} | ... 他${values.length - 5}個`;
      }
      return values.join(' | ');
    }

    return type.raw ?? type.name;
  }

  return type.raw ?? type.name;
}

export function formatDefault(prop: PropMeta): string {
  if (prop.defaultValue === null || prop.defaultValue === undefined) return '-';
  const val = prop.defaultValue.value;
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  if (val === null || val === undefined) return '-';
  return String(val);
}

export function escapeTableCell(text: string): string {
  return text.replace(/\|/g, '\\|');
}
