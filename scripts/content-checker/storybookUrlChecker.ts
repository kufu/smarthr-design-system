import fs from 'fs/promises';
import { glob } from 'glob';
import path from 'path';
import { UI_VERSION, getUIStories } from '@/lib/getUIData';
import { SHRUI_GITHUB_PATH } from '../../src/constants/application';

const CONTENT_PATH = path.join(__dirname, '../../src/content/articles/products/components/**/*.mdx');

const checkStoryPages = async () => {
  const errorList: string[] = [];

  for (const file of await glob(CONTENT_PATH)) {
    const content = await fs.readFile(file, 'utf8');
    const matchStoryName = content.match(/<ComponentStory\s.*name="(.+?)"/);
    if (matchStoryName === null) {
      continue;
    }

    const storyName = matchStoryName[1];

    const matchDirName = content.match(/<ComponentStory\s.*dirName="(.+?)"/);
    const dirName = matchDirName === null ? '' : matchDirName[1];

    const targetData = getUIStories(storyName, dirName);
    if (targetData === undefined) {
      errorList.push(`Error: Storybook data not found for ${storyName}`);
      continue;
    }

    const githubUrl = `${SHRUI_GITHUB_PATH}v${UI_VERSION}/${targetData?.filePath}`;
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
