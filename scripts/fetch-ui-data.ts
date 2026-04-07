import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

import packageInfo from 'smarthr-ui/package.json';

import type { PropsData, UIData, UIProps, UIStories } from '../src/types/ui';
import type { StoryIndex } from '@storybook/types';

type GitHubAPIResponse = {
  sha: string;
  commit: {
    author: {
      date: string;
    };
  };
};

type ReleaseResponse = {
  tag_name: string;
  created_at: string;
};

type CommitResponse = {
  sha: string;
};

type PropsResponse = {
  displayName: string;
  dirName?: string;
  filePath: string;
  props: PropsData[];
};

/**
 * smarthr-ui v86 以降は npm パッケージ直下に metadata.json が同梱され、exports に `./metadata.json` も追加されている。
 * v85 以前は同梱・export ともに無く `import 'smarthr-ui/metadata.json'` は ERR_PACKAGE_PATH_NOT_EXPORTED になる。
 * `./package.json` は export されているためそれでインストール先を解決し、隣の metadata.json を読む。
 */
function loadPropsMetadata(): PropsResponse[] {
  const require = createRequire(import.meta.url);
  const packageJsonPath = require.resolve('smarthr-ui/package.json');
  const metadataPath = path.join(path.dirname(packageJsonPath), 'metadata.json');
  if (!fs.existsSync(metadataPath)) {
    throw new Error(
      `smarthr-ui の metadata.json が見つかりません (${metadataPath})。` +
        'smarthr-ui を v86.0.0 以降に更新して pnpm install を実行してください。',
    );
  }
  return JSON.parse(fs.readFileSync(metadataPath, 'utf-8')) as PropsResponse[];
}

const metadata = loadPropsMetadata();

const GH_API_BASE_URL = 'https://api.github.com';
const CHROMATIC_DOMAIN = '63d0ccabb5d2dd29825524ab.chromatic.com';

/**
 * GitHub API から SmartHR UI のリリース情報を取得
 */
async function fetchSmartHRUIRelease(): Promise<GitHubAPIResponse> {
  const releaseEndpoint = new URL('/repos/kufu/smarthr-ui/releases', GH_API_BASE_URL);
  releaseEndpoint.searchParams.append('per_page', '10');
  releaseEndpoint.searchParams.append('page', '1');

  const releaseRes = await fetch(releaseEndpoint.toString());
  if (!releaseRes.ok) {
    throw new Error(`GitHub からリリース情報を取得できませんでした: ${releaseRes.statusText}`);
  }

  const releases: ReleaseResponse[] = await releaseRes.json();
  if (!releases || releases.length === 0) {
    throw new Error('リリース情報が見つかりませんでした');
  }

  // package.json に記載されているバージョンと一致するリリース情報を取得
  const release = releases.find((data) => {
    const version = data.tag_name.replace(/^(smarthr-ui-)?v/, '');
    return version === packageInfo.version;
  });

  if (!release) {
    throw new Error(`バージョン ${packageInfo.version} のリリース情報が見つかりませんでした`);
  }

  const commitEndpoint = new URL(`/repos/kufu/smarthr-ui/commits/${release.tag_name}`, GH_API_BASE_URL);
  const commitRes = await fetch(commitEndpoint.toString());
  if (!commitRes.ok) {
    throw new Error(`GitHub からコミット情報を取得できませんでした: ${commitRes.statusText}`);
  }

  const commit: CommitResponse = await commitRes.json();

  return {
    sha: commit.sha,
    commit: {
      author: {
        date: release.created_at,
      },
    },
  };
}

/**
 * smarthr-ui の metadata.json を元に UIProps の情報を整形して返却
 */
const getUIProps = (): UIProps[] => {
  const uiProps = metadata.map((propsItem: PropsResponse): UIProps => {
    // Dropdown/DropdownMenuButton のように階層になっている場合は、親階層もデータに含めておく
    const directoryNames = propsItem.filePath.replace(/^.*lib\/components\//, '').split('/');
    const dirName = directoryNames.length > 2 && directoryNames.at(0);

    return {
      displayName: propsItem.displayName || '',
      dirName: dirName || '',
      props: propsItem.props?.map((prop) => ({
        description: prop.description || '',
        name: prop.name || '',
        required: prop.required || false,
        type: {
          name: prop.type?.name || '',
          value: prop.type?.value || [],
        },
      })),
    };
  });

  return uiProps;
};

/**
 * Chromatic から Storybook の情報を取得
 * @param commitHash 対象のコミットハッシュ
 */
async function fetchStories(commitHash: string): Promise<Record<string, UIStories>> {
  const endpoint = new URL('index.json', `https://${commitHash}--${CHROMATIC_DOMAIN}`);

  const res = await fetch(endpoint.toString());
  if (!res.ok) {
    throw new Error(`Chromatic から index.json を取得できませんでした: ${res.statusText}`);
  }

  const json: StoryIndex = await res.json();
  if (!json) {
    throw new Error('index.json が見つかりませんでした');
  }

  // *.stories.tsxのファイルごとに、storyの情報をまとめる
  const uiStories: Record<string, UIStories> = {};

  for (const story of Object.values(json.entries)) {
    // Docは除外
    if (story.type === 'docs') {
      continue;
    }

    const directoryNames = story.importPath.replace(/^\.\/src\/components\//, '').split('/');
    const storyName = directoryNames[directoryNames.length - 1].replace(/\.stories\.tsx$/, '');

    // Dropdown/DropdownMenuButton のように階層になっている場合は、親階層もデータに含めておく
    const dirName = directoryNames.length > 2 && directoryNames.at(0);

    if (!uiStories[storyName]) {
      const pathPrefix = 'packages/smarthr-ui/';

      uiStories[storyName] = {
        storyName,
        dirName: dirName || '',
        filePath: path.join(pathPrefix, story.importPath),
        storyItems: [],
      };
    }

    uiStories[storyName].storyItems.push({
      name: story.title,
      label: story.name,
      iframeName: story.id,
    });
  }

  return uiStories;
}

/**
 * .cache 以下に保存
 * @param data 保存するデータ
 */
function save(data: UIData) {
  const cacheDir = path.resolve(import.meta.dirname, '../src/cache');

  // cacheディレクトリが無ければ作成
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir);
  }

  const cacheFile = path.join(cacheDir, 'smarthr-ui.json');
  fs.writeFileSync(cacheFile, JSON.stringify(data, null, 2));
}

console.log('📦️ リリース情報を取得中');
const usedVersionRelease = await fetchSmartHRUIRelease();

const commitHash = usedVersionRelease.sha.substring(0, 7);

console.log('📚️ stories.json を取得中');
const uiStories = await fetchStories(commitHash);

console.log('✅️ 取得完了');

const uiVersion: UIData = {
  version: packageInfo.version,
  commitHash,
  commitDate: usedVersionRelease.commit.author.date,
  uiProps: getUIProps(),
  uiStories: Object.values(uiStories),
};

console.log('📝 保存中');
save(uiVersion);

console.log('✅️ 保存完了');
