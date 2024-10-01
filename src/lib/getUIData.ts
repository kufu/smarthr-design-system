import uiData from '@/cache/smarthr-ui.json';

import type { UIProps, UIStories } from '@/types/ui';

/** Smarthr UIのバージョン */
export const UI_VERSION = uiData.version;

/** Smarthr UIのコミットハッシュ */
export const UI_COMMIT_HASH = uiData.commitHash;

/**
 * Storyを取得
 * @param storyName ストーリー名
 * @param dirName ディレクトリ名
 * @returns UIStories
 */
export function getUIStories(storyName: string, dirName?: string): UIStories | undefined {
  const result = uiData.uiStories.find((story) =>
    dirName ? story.storyName === storyName && story.dirName === dirName : story.storyName === storyName,
  );

  return result;
}

/**
 * StoryのPropsを取得
 * @param name ストーリー名
 * @param dirName ディレクトリ名
 * @returns UIProps
 */
export function getUIProps(name: string, dirName?: string): UIProps | undefined {
  const result = uiData.uiProps.find((uiProps) =>
    dirName ? uiProps.displayName === name && uiProps.dirName === dirName : uiProps.displayName === name,
  );

  return result;
}
