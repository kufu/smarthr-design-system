import fs from 'node:fs';
import path from 'node:path';

export function pascalToKebab(name: string): string {
  // 連続大文字は 1 つの略語として束ねる:
  //   "Button"        → "button"
  //   "TextLink"      → "text-link"
  //   "HTMLElement"   → "html-element"
  //   "SmartHRAILogo" → "smart-hrai-logo"
  return name
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/^-/, '');
}

export function loadManualMappings(mappingPath: string): Record<string, string> {
  if (!fs.existsSync(mappingPath)) return {};
  return JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));
}

/**
 * dirName (PascalCase from filePath) → design-system 相対パス (kebab-case, ネスト含む)
 *
 * 探索順:
 *   1. 手動マッピング
 *   2. ルート直下 kebab-case
 *   3. 1 階層下までの再帰探索（例: dialog/action-dialog）
 */
export function buildDirMapping(
  dirNames: string[],
  designSystemDir: string,
  manualMappings: Record<string, string>,
): Map<string, string> {
  const mapping = new Map<string, string>();

  const rootDirs = fs.existsSync(designSystemDir)
    ? fs
        .readdirSync(designSystemDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
    : [];

  // Build lookup: kebab-name (in any depth up to 2) → relative path
  const nestedLookup = new Map<string, string>();
  for (const top of rootDirs) {
    nestedLookup.set(top, top);
    const subPath = path.join(designSystemDir, top);
    const subDirs = fs
      .readdirSync(subPath, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
    for (const sub of subDirs) {
      if (!nestedLookup.has(sub)) {
        nestedLookup.set(sub, `${top}/${sub}`);
      }
    }
  }

  for (const dirName of dirNames) {
    if (manualMappings[dirName]) {
      mapping.set(dirName, manualMappings[dirName]);
      continue;
    }

    const kebab = pascalToKebab(dirName);
    const hit = nestedLookup.get(kebab);
    if (hit) {
      mapping.set(dirName, hit);
      continue;
    }

    const lowerHit = [...nestedLookup.entries()].find(([k]) => k.toLowerCase() === kebab.toLowerCase());
    if (lowerHit) {
      mapping.set(dirName, lowerHit[1]);
    }
  }

  return mapping;
}
