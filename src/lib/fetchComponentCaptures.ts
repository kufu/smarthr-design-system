import { cwd } from 'node:process';
import type { StoryIndex } from '@storybook/types';
import fs from 'fs/promises';
import path from 'path';

const STORYBOOK_URL = 'https://story.smarthr-ui.dev';

type StoryKind = {
  kindName: string;
  iframeUrl: string;
  thumbnailFileName: string;
  displayName: string;
  componentPath: string;
  numberOfStories: number;
};

export type StoryGroup = {
  groupName: string;
  storyKinds: StoryKind[];
};

const convertKebab = (target: string) =>
  target
    .replace('SmartHR', 'smarthr') // 特殊なケース
    .replace(/[^a-zA-Z0-9-]/g, '') // 全角文字などの半角英数字以外を除去
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

const convertComponentPath = (importPath: string, displayName: string) => {
  const matches = importPath.match(/\.\/src\/components\/(.*)\.stories\.tsx/);
  if (!matches) {
    return;
  }

  const componentDirPath = matches[1]
    .split('/')
    .slice(0, -2)
    .map((item) => convertKebab(item))
    .join('/');

  const componentPathName = convertKebab(displayName);

  return componentDirPath === '' ? componentPathName : path.join(componentDirPath, componentPathName);
};

const isExistsFile = async (filePath: string) => {
  try {
    await fs.stat(filePath);
    return true;
  } catch (err) {
    return false;
  }
};

/**
 * [SmartHR UIのStorybook](https://story.smarthr-ui.dev/)上の各コンポーネントグループの名前やサムネイル画像のパスなどを取得
 * @returns StoryGroup[]
 */
export async function fetchComponentCaptures() {
  const indexJsonUrl = new URL('index.json', STORYBOOK_URL);
  const response = await fetch(indexJsonUrl.toString());

  const storiesJson: StoryIndex = await response.json();

  const storiesMap = storiesJson.entries;
  const storyGroups: StoryGroup[] = [];

  for (const id in storiesMap) {
    const { title, type, importPath } = storiesMap[id];

    // ドキュメントはコンポーネント一覧として表示しない
    if (type === 'docs') {
      continue;
    }

    const groupName = title.split('/')[0];
    const displayName = title.split('/')[1];
    const thumbnailFileName = `${groupName}-${displayName}.png`;

    const iframeUrl = new URL('iframe.html', STORYBOOK_URL);
    iframeUrl.searchParams.set('id', id);
    iframeUrl.searchParams.set('viewMode', 'story');
    iframeUrl.searchParams.set('shortcuts', 'false');
    iframeUrl.searchParams.set('singleStory', 'true');

    const componentPath = convertComponentPath(importPath, displayName);
    if (!componentPath) {
      continue;
    }

    const componentsDirPath = path.resolve(cwd(), 'src', 'content', 'articles', 'products', 'components');

    const mdxFilePath = path.join(componentsDirPath, `/${componentPath}.mdx`);
    const indexMdxFilePath = path.join(componentsDirPath, `${componentPath}/index.mdx`);

    const isExistsMdx = (await isExistsFile(mdxFilePath)) || (await isExistsFile(indexMdxFilePath));
    if (!isExistsMdx) {
      continue;
    }

    // Groupが存在しない場合は新規作成
    const storyGroup = storyGroups.find((item) => item.groupName === groupName);
    if (!storyGroup) {
      storyGroups.push({
        groupName,
        storyKinds: [
          {
            kindName: title,
            iframeUrl: iframeUrl.toString(),
            thumbnailFileName,
            displayName,
            componentPath,
            numberOfStories: 1,
          },
        ],
      });
      continue;
    }

    // Kindが存在しない場合は新規作成
    const storyKind = storyGroup.storyKinds.find((item) => item.kindName === title);
    if (!storyKind) {
      storyGroup.storyKinds.push({
        kindName: title,
        iframeUrl: iframeUrl.toString(),
        thumbnailFileName,
        displayName,
        componentPath,
        numberOfStories: 1,
      });
      continue;
    }

    // GroupもKindも既に存在すればカウントアップ
    storyKind.numberOfStories += 1;
  }

  return storyGroups;
}
