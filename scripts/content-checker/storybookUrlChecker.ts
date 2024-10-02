import fs from 'fs/promises';
import { glob } from 'glob';
import path from 'path';
import { fetchUiVersions } from '../../plugins/gatsby-source-ui-versions/fetchUiVersions';
import { SHRUI_GITHUB_PATH } from '../../src/constants/application';

const CONTENT_PATH = path.join(__dirname, '../../content/articles/products/components/**/*.mdx');

const options = {
  uiRepoApi: 'https://api.github.com/repos/kufu/smarthr-ui',
  releaseBotEmail: '41898282+github-actions[bot]@users.noreply.github.com',
  chromaticDomain: '63d0ccabb5d2dd29825524ab.chromatic.com',
};

const checkStoryPages = async () => {
  const errorList: string[] = [];

  const parentPackageJson = JSON.parse(await fs.readFile(path.join(__dirname, '../../package.json'), 'utf8'));
  const defaultVersion = parentPackageJson.dependencies['smarthr-ui'].replace('^', '');
  const versionsData = await fetchUiVersions([], options);
  const commitHash = versionsData.find((item) => item.version === defaultVersion)?.commitHash ?? null;
  if (commitHash === null) {
    console.error(`Couldn't get current commit hash.`);
    process.exit(1);
  }
  const targetVersion = versionsData.find((item) => item.version === defaultVersion);

  for (const file of await glob(CONTENT_PATH)) {
    const content = await fs.readFile(file, 'utf8');
    const matchStoryName = content.match(/<ComponentStory\s.*name="(.+?)"/);
    if (matchStoryName === null) continue;
    const storyName = matchStoryName[1];

    const matchDirName = content.match(/<ComponentStory\s.*dirName="(.+?)"/);
    const dirName = matchDirName === null ? '' : matchDirName[1];

    const targetData = targetVersion?.uiStories.find((item) => {
      if (dirName !== '') return item.storyName === storyName && item.dirName === dirName;
      return item.storyName === storyName;
    });
    if (targetData === undefined) {
      errorList.push(`Error: Storybook data not found for ${storyName}`);
      continue;
    }

    const githubUrl = `${SHRUI_GITHUB_PATH}v${defaultVersion}/${targetData?.filePath}`;
    const githubRes = await fetch(githubUrl, { method: 'HEAD' }).catch((error) => {
      console.error(error);
      process.exit(1);
    });
    if (githubRes.status >= 400) {
      errorList.push(`Error: [${githubRes.status}] ${githubRes.statusText} at ${githubUrl}`);
    }
  }

  return errorList;
};

(async () => {
  const errorList = await checkStoryPages();
  if (errorList.length > 0) {
    errorList.forEach((message) => {
      console.error(message);
    });
    console.log(`Found ${errorList.length} error(s). Storybook URL check finished.`);
    process.exit(1);
  }
  console.log('✨ No errors found. Storybook URL check finished.');
})();
