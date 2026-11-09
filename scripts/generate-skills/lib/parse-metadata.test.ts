import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { addAliasGroups, parseExportSpecifiers, type ComponentGroup, type ComponentMeta } from './parse-metadata.js';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const designSystemDir = path.join(repoRoot, 'src/content/articles/products/components');

const createGroup = (displayName: string): ComponentGroup => {
  const component: ComponentMeta = {
    displayName,
    filePath: `src/components/${displayName}/${displayName}.tsx`,
    description: '',
    props: [],
  };
  return { dirName: displayName, displayNames: [displayName], components: [component] };
};

describe('parseExportSpecifiers', () => {
  it('別名 export は公開名と元の名前の組で返す', () => {
    const src = "export { Panel, Panel as Base, Groupbox, Groupbox as BaseColumn } from './components/Panel';";
    assert.deepEqual(parseExportSpecifiers(src), [
      { local: 'Panel', exported: 'Panel' },
      { local: 'Panel', exported: 'Base' },
      { local: 'Groupbox', exported: 'Groupbox' },
      { local: 'Groupbox', exported: 'BaseColumn' },
    ]);
  });

  it('小文字始まりの export と export 以外の行は除外する', () => {
    const src = [
      "export { Button, buttonClassNameGenerator } from './components/Button';",
      "export type { ButtonProps } from './components/Button';",
      "import { Foo } from './foo';",
    ].join('\n');
    assert.deepEqual(parseExportSpecifiers(src), [{ local: 'Button', exported: 'Button' }]);
  });
});

describe('addAliasGroups', () => {
  it('design-system に専用ページがある別名 export だけを、元コンポーネントの metadata で追加する', () => {
    const groups = new Map([
      ['Panel', createGroup('Panel')],
      ['Tooltip', createGroup('ControlledTooltip')],
    ]);
    const aliases = new Map([
      ['Base', 'Panel'],
      ['Balloon', 'ControlledTooltip'],
    ]);

    const result = addAliasGroups(groups, aliases, designSystemDir);

    assert.deepEqual(result.get('Base'), {
      dirName: 'Base',
      displayNames: ['Base'],
      components: [{ ...createGroup('Panel').components[0], displayName: 'Base' }],
    });
    assert.equal(result.has('Balloon'), false);
  });

  it('metadata.json に同名の displayName がある場合は追加しない', () => {
    const existing = createGroup('Base');
    const groups = new Map([
      ['Panel', createGroup('Panel')],
      ['Base', existing],
    ]);

    const result = addAliasGroups(groups, new Map([['Base', 'Panel']]), designSystemDir);

    assert.equal(result.get('Base'), existing);
  });
});
