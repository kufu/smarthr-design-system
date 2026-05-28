import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

import metadata from 'smarthr-ui/metadata.json' with { type: 'json' };

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

/**
 * smarthr-ui の lib/index.d.ts から public named exports の Set を返す。
 * この Set でフィルタすることで内部実装コンポーネントを除外できる。
 */
export function loadPublicExports(): Set<string> {
  const require = createRequire(import.meta.url);
  const pkgDir = path.dirname(require.resolve('smarthr-ui/package.json'));
  const dtsPath = path.join(pkgDir, 'lib', 'index.d.ts');
  const src = fs.readFileSync(dtsPath, 'utf-8');
  const names = new Set<string>();
  for (const line of src.split('\n')) {
    if (!line.startsWith('export {')) continue;
    const m = line.match(/\{([^}]+)\}/);
    if (!m) continue;
    for (const token of m[1].split(',')) {
      const name = token.trim();
      if (name && /^[A-Z]/.test(name)) names.add(name);
    }
  }
  return names;
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
