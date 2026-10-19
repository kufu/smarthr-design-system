import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { type PropsTablePage, regroupByPropsTable } from './props-table-groups.js';

import type { ComponentGroup, ComponentMeta } from './parse-metadata.js';

function buildGroups(entries: Record<string, string[]>): Map<string, ComponentGroup> {
  const groups = new Map<string, ComponentGroup>();
  for (const [dirName, displayNames] of Object.entries(entries)) {
    const components: ComponentMeta[] = displayNames.map((displayName) => ({
      displayName,
      filePath: `src/components/${dirName}/${displayName}.tsx`,
      description: '',
      props: [],
    }));
    groups.set(dirName, { dirName, displayNames: [...displayNames], components });
  }
  return groups;
}

function toEntries(groups: Map<string, ComponentGroup>): Record<string, string[]> {
  return Object.fromEntries([...groups].map(([key, group]) => [key, group.displayNames]));
}

describe('regroupByPropsTable', () => {
  it('ページの主コンポーネント以外として載っている displayName を主コンポーネントのグループへ移す', () => {
    // smarthr-ui v99.7 で DropdownMenuGroup が Dropdown/DropdownMenuGroup/ へ、
    // DropdownContent が Dropdown/client/DropdownContent/ へ移動したケース
    const groups = buildGroups({
      Dropdown: ['Dropdown', 'DropdownTrigger', 'DropdownCloser'],
      DropdownContent: ['DropdownContent'],
      DropdownMenuButton: ['DropdownMenuButton'],
      DropdownMenuGroup: ['DropdownMenuGroup'],
    });
    const pages: PropsTablePage[] = [
      { dir: 'dropdown', names: ['Dropdown', 'DropdownContent', 'DropdownTrigger', 'DropdownCloser'] },
      { dir: 'dropdown/dropdown-menu-button', names: ['DropdownMenuButton', 'DropdownMenuGroup'] },
    ];

    assert.deepEqual(toEntries(regroupByPropsTable(groups, pages, new Set())), {
      Dropdown: ['Dropdown', 'DropdownTrigger', 'DropdownCloser', 'DropdownContent'],
      DropdownMenuButton: ['DropdownMenuButton', 'DropdownMenuGroup'],
    });
  });

  it('自分のページを持つ主コンポーネントが別ページの主コンポーネントのグループに入っていたら独立させる', () => {
    // smarthr-ui v99.7 で UpwardLink が TextLink/UpwardLink/ から TextLink/client/ へ移動したケース
    const groups = buildGroups({ TextLink: ['TextLink', 'UpwardLink'] });
    const pages: PropsTablePage[] = [
      { dir: 'text-link', names: ['TextLink'] },
      { dir: 'text-link/upward-link', names: ['UpwardLink'] },
    ];

    assert.deepEqual(toEntries(regroupByPropsTable(groups, pages, new Set())), {
      TextLink: ['TextLink'],
      UpwardLink: ['UpwardLink'],
    });
  });

  it('relatedComponents で宣言された displayName は動かさない', () => {
    const groups = buildGroups({
      RemoteDialogTrigger: ['StepFormDialog'],
      ControlledStepFormDialog: ['ControlledStepFormDialog', 'StepFormDialogItem'],
    });
    const pages: PropsTablePage[] = [{ dir: 'dialog/step-form-dialog', names: ['StepFormDialog', 'ControlledStepFormDialog'] }];

    assert.deepEqual(toEntries(regroupByPropsTable(groups, pages, new Set(['ControlledStepFormDialog']))), toEntries(groups));
  });

  it('複数ページに載っている displayName はディレクトリ由来のグループのままにする', () => {
    const groups = buildGroups({ A: ['A'], B: ['B'], Shared: ['Shared'] });
    const pages: PropsTablePage[] = [
      { dir: 'a', names: ['A', 'Shared'] },
      { dir: 'b', names: ['B', 'Shared'] },
    ];

    assert.deepEqual(toEntries(regroupByPropsTable(groups, pages, new Set())), toEntries(groups));
  });
});
