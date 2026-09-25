import type { ComponentGroup } from './parse-metadata.js';
import { buildDirMapping } from './name-mapping.js';

/**
 * smarthr-ui の親ディレクトリ単位グループから、個別ドキュメント対象の displayName を分離する。
 *
 * 1. design-system 側の `relatedComponents` 宣言に 2 件以上含まれる displayName を独立グループにする
 *    （例: Dialog/ 配下の ActionDialog / FormDialog など）
 * 2. 親ディレクトリ名と一致する displayName が無く、かつ独自の index.mdx を持つ displayName がある場合
 *    それらを独立グループにする（例: FormGroup/ 配下の FormControl と Fieldset）
 *
 * 残った displayName は元の親グループ名で保持する。
 */
export function autoSplitGroups(
  groups: Map<string, ComponentGroup>,
  relatedNames: Set<string>,
  designSystemDir: string,
): Map<string, ComponentGroup> {
  const result = new Map<string, ComponentGroup>();
  for (const [dirName, group] of groups) {
    const splitTargets = group.components.filter((c) => relatedNames.has(c.displayName));
    const hasPrimary = group.components.some((c) => c.displayName === dirName);

    // 分離トリガは「relatedComponents 宣言が 2 件以上 group 内に存在する」ときに発動する。
    // これにより、smarthr-ui の親ディレクトリに複数の displayName が同居しているグループ
    // (例: `Dialog/RemoteDialogTrigger/` 配下に 5 つの Dialog) のみが分離対象となる。
    // 1 件以下の場合は元グループをそのまま保持し、`ControlledStepFormDialog` グループの
    // `StepFormDialogItem` のような同居 named export を取りこぼさない。
    const shouldSplitByRelated = splitTargets.length >= 2;

    // 親ディレクトリ名と一致する公開コンポーネントが無い場合（FormGroup/FormControl.tsx 等）は
    // フォルダ名では index.mdx に辿れない。独自ページを持つ displayName だけを分離する。
    const pageMapping = buildDirMapping(
      group.components.map((c) => c.displayName),
      designSystemDir,
      {},
    );
    const ownPageTargets = hasPrimary ? [] : group.components.filter((c) => pageMapping.has(c.displayName));

    if (!shouldSplitByRelated && ownPageTargets.length === 0) {
      result.set(dirName, group);
      continue;
    }

    const targets = shouldSplitByRelated ? splitTargets : ownPageTargets;
    const splitNames = new Set(targets.map((c) => c.displayName));
    for (const target of targets) {
      result.set(target.displayName, {
        dirName: target.displayName,
        displayNames: [target.displayName],
        components: [target],
      });
    }

    // 親グループ自体は、group 名と同名の displayName のみを含める。
    // group 名と一致しない displayName(例: smarthr-ui の Table 配下にある WakuWakuButton や
    // TableScrollContext 等の内部部品で `relatedComponents` 宣言もないもの) は SKILL 生成対象外とする。
    if (shouldSplitByRelated) {
      const primary = group.components.filter((c) => c.displayName === dirName);
      if (primary.length > 0) {
        result.set(dirName, {
          dirName,
          displayNames: primary.map((c) => c.displayName),
          components: primary,
        });
      }
      continue;
    }

    const rest = group.components.filter((c) => !splitNames.has(c.displayName));
    if (rest.length > 0) {
      result.set(dirName, {
        dirName,
        displayNames: rest.map((c) => c.displayName),
        components: rest,
      });
    }
  }
  return result;
}
