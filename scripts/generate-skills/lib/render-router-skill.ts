import type { ComponentGroup } from './parse-metadata.js';
import type { IndexMdxInfo } from './parse-index-mdx.js';
import { pascalToKebab } from './name-mapping.js';

export type RouterEntry = {
  group: ComponentGroup;
  indexInfo: IndexMdxInfo | null;
  designSystemDir: string | undefined;
};

/**
 * index.mdx の description (Phase 3 で統一済) を用途列に使う。
 * 派生先や未割当グループ用のフォールバック文も含む。
 */
function resolveEntryDescription(entry: RouterEntry): string {
  const fromMdx = entry.indexInfo?.description?.replace(/\r?\n/g, ' ').trim();
  if (fromMdx) return fromMdx;
  return `${entry.group.dirName} コンポーネント`;
}

/**
 * router スキル description の代表シナリオに採用するコンポーネント (M4-S8 結論: パターンC)。
 * 件数 5 件・主要カテゴリ網羅・AI クエリ語彙性の観点で選定。
 * 選定基準と差し替えルールは scripts/generate-skills/README.md 参照。
 */
const REPRESENTATIVE_COMPONENTS = ['Button', 'Input', 'Table', 'ActionDialog', 'TextLink'] as const;

/**
 * mdx description の末尾「〜ときに使います。」相当の利用シーン文を抜き出す。
 * description は Phase 2 ルール v1 で「定義文。利用シーン文。」の 2 文構成を基本とする。
 * 末尾文から「に使います」「に使う」を落とした文字列を返す。
 * 1 文構成や末尾が「使います/使う」で終わらない場合は description 全体を返す。
 */
function extractScenarioText(description: string): string {
  const normalized = description.replace(/\r?\n/g, ' ').trim();
  const sentences = normalized
    .split('。')
    .map((s) => s.trim())
    .filter(Boolean);
  if (sentences.length === 0) return normalized;
  const last = sentences[sentences.length - 1];
  const m = last.match(/^(.+?)(?:ときに使います|ときに使う)$/);
  if (m) return `${m[1]}とき`;
  return normalized;
}

/**
 * frontmatter の description を組み立てる (パターンC: head + 代表シナリオ5件、約220字)。
 * 代表シナリオ文は entries に含まれる mdx description から自動抽出する。
 */
function buildFrontmatterDescription(entries: RouterEntry[]): string {
  const head =
    'smarthr-ui のどのコンポーネントを使うべきかの選定ガイド。フォームを作る、テーブルを表示する、ボタンを置く、ダイアログを開く、通知を出すなど、何らかの UI を実装しようとしているときに使う。具体的なコンポーネントの SKILL.md を呼ぶ前にまず読む。';

  const entryByName = new Map<string, RouterEntry>();
  for (const entry of entries) entryByName.set(entry.group.dirName, entry);

  const scenarios: string[] = [];
  for (const name of REPRESENTATIVE_COMPONENTS) {
    const entry = entryByName.get(name);
    const desc = entry?.indexInfo?.description;
    if (!desc) continue;
    scenarios.push(`${name}（${extractScenarioText(desc)}）`);
  }

  if (scenarios.length === 0) return head;
  return `${head} 主なシナリオ: ${scenarios.join('、')}。`;
}

/**
 * component-selector ルータースキル。
 * 各コンポーネントの description（index.mdx の frontmatter）を集約して、
 * AI が「どのコンポーネントの SKILL.md を呼ぶべきか」を判断する一覧を生成する。
 */
export function renderRouterSkill(entries: RouterEntry[]): string {
  const sorted = [...entries].sort((a, b) => a.group.dirName.localeCompare(b.group.dirName));
  const description = buildFrontmatterDescription(entries);
  // frontmatter 内の " はエスケープ
  const escapedDescription = description.replace(/"/g, '\\"');

  const parts: string[] = [];
  parts.push('---');
  parts.push('name: component-selector');
  parts.push(`description: "${escapedDescription}"`);
  // §8: paths は router スキルのみに付与する方針。
  // 個別スキル (render-skill.ts) には付けない。
  // 拡張子は tsx / jsx に限定（.ts / .mjs / .cjs / .mdx は React コンポーネント実装ファイルでないため除外）。
  parts.push('paths:');
  parts.push('  - "**/*.tsx"');
  parts.push('  - "**/*.jsx"');
  parts.push('metadata:');
  parts.push('  version: "1.0.0"');
  parts.push('  source: smarthr-design-system');
  parts.push('  generated-from: layer1');
  parts.push('---');
  parts.push('');
  parts.push('# smarthr-ui コンポーネント選定ガイド');
  parts.push('');
  parts.push(
    'このスキルは、UI 要件から該当するコンポーネントを特定するためのインデックスです。コンポーネントの詳細な使い方は、各コンポーネント名のスキル（例: `smarthr-design-system:button`）を参照してください。',
  );
  parts.push('');
  parts.push('## コンポーネント一覧');
  parts.push('');
  parts.push('| コンポーネント | 用途 | 対応スキル |');
  parts.push('|---|---|---|');

  for (const entry of sorted) {
    const name = entry.group.dirName;
    const skillName = pascalToKebab(name);
    const isDeprecated = entry.indexInfo?.deprecated ?? false;
    const displayName = isDeprecated ? `⚠️ ${name}（非推奨）` : name;
    const rawDesc = resolveEntryDescription(entry).replace(/\r?\n/g, ' ').replace(/\|/g, '\\|').trim();
    const desc = isDeprecated ? `【非推奨】${rawDesc}` : rawDesc;
    parts.push(`| ${displayName} | ${desc} | \`smarthr-design-system:${skillName}\` |`);
  }
  parts.push('');
  parts.push('## 利用フロー');
  parts.push('');
  parts.push('1. 実装したい UI 要件を整理する（例: 「フォームを作る」「テーブルを表示する」）');
  parts.push('2. 上記の表から該当しそうなコンポーネントを特定する');
  parts.push('3. そのコンポーネントの SKILL.md を読み、Props・実装ルール・使い方チェックリストに従って実装する');
  parts.push('');
  return parts.join('\n');
}
