import type { ComponentGroup } from './parse-metadata.js';
import { formatType, formatDefault, escapeTableCell } from './parse-metadata.js';
import type { EslintRuleWithContent } from './fetch-eslint-rules.js';
import { getRelevantCodeExamples } from './fetch-eslint-rules.js';
import type { ChecklistSection } from './parse-checklist.js';
import type { IndexMdxInfo } from './parse-index-mdx.js';
import { toSkillSlug } from './name-mapping.js';

export type SkillRenderOptions = {
  group: ComponentGroup;
  indexInfo: IndexMdxInfo | null;
  eslintRules: EslintRuleWithContent[];
  checklist: ChecklistSection[] | null;
};

const SOURCE_TAG = 'smarthr-design-system';

export function renderSkill(opts: SkillRenderOptions): string {
  const { group, indexInfo, eslintRules, checklist } = opts;
  const groupName = group.dirName;
  const skillName = toSkillSlug(groupName);
  const generatedFrom = buildGeneratedFromTag(eslintRules.length > 0, checklist !== null && checklist.length > 0);
  const description = buildDescription(group, indexInfo);

  const parts: string[] = [];
  parts.push('---');
  parts.push(`name: ${skillName}`);
  parts.push(`description: ${yamlEscapeInline(description)}`);
  parts.push('metadata:');
  parts.push('  version: "1.0.0"');
  parts.push(`  source: ${SOURCE_TAG}`);
  parts.push(`  generated-from: ${generatedFrom}`);
  parts.push('---');
  parts.push('');

  if (indexInfo) {
    if (indexInfo.deprecated) {
      const messagePlain = stripHtml(indexInfo.deprecatedMessage).trim();
      parts.push(`> ⚠️ **非推奨**${messagePlain ? `: ${messagePlain}` : ''}`);
      parts.push('');
    }
    if (indexInfo.description) parts.push(indexInfo.description);
    if (indexInfo.leadParagraph && indexInfo.leadParagraph !== indexInfo.description) {
      parts.push('');
      parts.push(indexInfo.leadParagraph);
    }
    parts.push('');
  }

  parts.push('## import');
  parts.push('');
  parts.push('```ts');
  parts.push(`import { ${group.displayNames.join(', ')} } from 'smarthr-ui'`);
  parts.push('```');
  parts.push('');

  parts.push('## Props');
  parts.push('');
  const multipleComponents = group.components.length > 1;
  for (const component of group.components) {
    if (multipleComponents) parts.push(`### ${component.displayName}`);
    if (component.props.length === 0) {
      parts.push('（固有 Props なし）');
      parts.push('');
      continue;
    }
    parts.push('| Props 名 | 型 | デフォルト値 | 必須 | 説明 |');
    parts.push('|---|---|---|---|---|');
    for (const prop of component.props) {
      const typeStr = escapeTableCell(formatType(prop));
      const defaultStr = escapeTableCell(formatDefault(prop));
      const required = prop.required ? '✓' : '-';
      const desc = prop.description ? escapeTableCell(prop.description.replace(/\r?\n/g, ' ').trim()) : '-';
      parts.push(`| ${prop.name} | ${typeStr} | ${defaultStr} | ${required} | ${desc} |`);
    }
    parts.push('');
  }

  parts.push('## 実装ルール');
  parts.push('');
  if (eslintRules.length === 0) {
    parts.push(`${groupName} に直接関連する eslint-plugin-smarthr のルールは現時点ではありません。`);
    parts.push('');
  } else {
    const mainDisplayName = group.displayNames[0];
    for (const rule of eslintRules) {
      parts.push(`### ${rule.name}`);
      if (rule.description) {
        parts.push(rule.description);
        parts.push('');
      }
      const targetComponent = group.displayNames.find((n) => rule.matchedComponents.has(n)) ?? mainDisplayName;
      const examples = getRelevantCodeExamples(rule, targetComponent);

      if (examples.ng.length > 0) {
        parts.push('❌ NG:');
        parts.push('');
        for (const ex of examples.ng) {
          parts.push('```jsx');
          parts.push(ex);
          parts.push('```');
          parts.push('');
        }
      }
      if (examples.ok.length > 0) {
        parts.push('✅ OK:');
        parts.push('');
        for (const ex of examples.ok) {
          parts.push('```jsx');
          parts.push(ex);
          parts.push('```');
          parts.push('');
        }
      }
    }
    parts.push('詳細は eslint-plugin-smarthr の各ルール README を参照してください。');
    parts.push('');
  }

  parts.push('## 使い方チェックリスト');
  parts.push('');
  if (checklist === null || checklist.length === 0) {
    parts.push('使い方チェックリスト（Layer 3）は設定されていません。');
    parts.push('');
  } else {
    for (const section of checklist) {
      parts.push(`### ${section.category}`);
      for (const item of section.items) {
        parts.push(`- [${item.severity}] ${item.text}`);
        if (item.sub_items && item.sub_items.length > 0) {
          for (const sub of item.sub_items) {
            parts.push(`  - ${sub}`);
          }
        }
      }
      parts.push('');
    }
  }

  return parts.join('\n');
}

function buildDescription(group: ComponentGroup, indexInfo: IndexMdxInfo | null): string {
  const names = group.displayNames.join(' / ');
  const base = indexInfo?.description?.replace(/\r?\n/g, ' ').trim() || `smarthr-ui の ${names} コンポーネントの使い方ガイド。`;
  const deprecatedPrefix = indexInfo?.deprecated ? '【非推奨】' : '';
  return `${deprecatedPrefix}${base}`;
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, '');
}

function buildGeneratedFromTag(hasLayer2: boolean, hasLayer3: boolean): string {
  const layers = ['layer1'];
  if (hasLayer2) layers.push('layer2');
  if (hasLayer3) layers.push('layer3');
  return layers.join('+');
}

function yamlEscapeInline(value: string): string {
  const sanitized = value.replace(/\r?\n/g, ' ').trim();
  return `"${sanitized.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}
