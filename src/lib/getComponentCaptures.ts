import fs from 'fs/promises';
import { cwd } from 'node:process';
import path from 'path';

import { SHRUI_STORYBOOK_URL } from '@/constants/application';
import { UI_STORY_INDEX } from '@/lib/getUIData';

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

const getComponentPath = (importPath: string, displayName: string) => {
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

  // NOTE:
  // button/button.mdx のようにディレクトリ名とファイル名が一致する記事は存在しないので
  // componentDirPath と componentPathName が一致する場合は componentPath のみを返す
  //
  // こうすることで、importPath が button/stories/button.stories.ts で 記事が button/index.mdx のようになっている
  // コンポーネントを取り逃すことがなくなる
  return componentDirPath === '' || componentDirPath === componentPathName
    ? componentPathName
    : `${componentDirPath}/${componentPathName}`;
};

const doesFileExist = async (...filePaths: string[]) => {
  const componentBasePath = path.resolve(cwd(), 'src', 'content', 'articles', 'products', 'components');

  for (const filePath of filePaths) {
    try {
      await fs.stat(path.join(componentBasePath, filePath));
      return true;
    } catch (err) {
      // 何もしない
    }
  }

  return false;
};

const doesArticleExist = (componentPath: string) => doesFileExist(`${componentPath}.mdx`, `${componentPath}/index.mdx`);

/**
 * storyに対応するコンポーネントの記事のパスと、一覧に表示する名前を取得
 */
const getComponentArticle = async (title: string, importPath: string) => {
  const titleName = title.split('/')[1];
  const titleBasedPath = getComponentPath(importPath, titleName);
  if (!titleBasedPath) {
    return;
  }

  // NOTE:
  // smarthr-uiでは、コンポーネントがコンポーネント名と異なる名前のディレクトリに置かれていたり
  // （例: Panel/stories/Groupbox.stories.tsx、FormGroup/stories/Fieldset.stories.tsx）、
  // 名称変更後もStorybookのタイトルが旧名のままだったり（例: Panelのタイトルが Components/Base）することがある
  // この場合はタイトルとディレクトリ名から求めたパスでは記事が見つからないため、
  // storyファイル名（= コンポーネント名）と同名の記事がトップレベルにあれば、そちらを優先する
  const componentName = importPath.match(/\/([^/]+)\.stories\.tsx$/)?.[1];
  if (componentName) {
    const componentNameBasedPath = convertKebab(componentName);
    if (componentNameBasedPath !== titleBasedPath && (await doesArticleExist(componentNameBasedPath))) {
      return { displayName: componentName, componentPath: componentNameBasedPath };
    }
  }

  if (await doesArticleExist(titleBasedPath)) {
    return { displayName: titleName, componentPath: titleBasedPath };
  }
};

/**
 * [SmartHR UIのStorybook](https://story.smarthr-ui.dev/)上の各コンポーネントグループの名前やサムネイル画像のパスなどを取得
 *
 * story情報は `scripts/fetch-ui-data.ts` がキャッシュしたものを参照します。
 * この関数はページのレンダリング中に呼ばれるため、ここでネットワークアクセスをしてはいけません。
 *
 * @returns StoryGroup[]
 */
export async function getComponentCaptures() {
  const storyGroups: StoryGroup[] = [];

  for (const { id, title, importPath } of UI_STORY_INDEX) {
    // コンポーネントの記事を取得（記事が存在しないstoryは一覧に含めない）
    const article = await getComponentArticle(title, importPath);
    if (!article) {
      continue;
    }

    const { displayName, componentPath } = article;
    const groupName = title.split('/')[0];
    const thumbnailFileName = `${groupName}-${displayName}.png`;

    const iframeUrl = new URL('iframe.html', SHRUI_STORYBOOK_URL);
    iframeUrl.searchParams.set('id', id);
    iframeUrl.searchParams.set('viewMode', 'story');
    iframeUrl.searchParams.set('shortcuts', 'false');
    iframeUrl.searchParams.set('singleStory', 'true');

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

    // 同じcomponentPathを持つstoryKindが存在する場合はスキップ
    if (storyGroup.storyKinds.find((item) => item.componentPath === componentPath)) {
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

  // 名前昇順でソート
  storyGroups.map((group) => group.storyKinds.sort((a, b) => a.displayName.localeCompare(b.displayName)));

  return storyGroups;
}
