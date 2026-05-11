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
 * smarthr-ui の metadata.json をコンポーネントグループに整形して返す。
 * グルーピングキーは filePath の直上ディレクトリ名（例: `src/components/Button/Button.tsx` → `Button`）。
 */
export function parseMetadata(): Map<string, ComponentGroup> {
  const data = metadata as unknown as ComponentMeta[];
  const groups = new Map<string, ComponentGroup>();

  for (const component of data) {
    if (!component.filePath.startsWith('src/components/')) continue;
    if (/^Fa.+Icon$/.test(component.displayName)) continue;

    const parts = component.filePath.split('/');
    if (parts.length < 3) continue;

    const dirName = parts[parts.length - 2];

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
