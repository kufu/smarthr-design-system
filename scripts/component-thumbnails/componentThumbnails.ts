import fs from 'fs/promises';
import { stat } from 'node:fs';
import path from 'path';

/*
puppeteerは、このディレクトリである/scripts/component-thumbnailsに移動してインストールしてください
詳細はこのディレクトリ内のREADME.mdを参照してください
*/
import puppeteer from 'puppeteer';

import { type StoryGroup, fetchComponentCaptures } from '../../src/lib/fetchComponentCaptures';

const thumbnailsDir = path.resolve(import.meta.dirname, '../../public/thumbnails/component-stories/');

const generateThumbnails = async (storyGroups: StoryGroup[]) => {
  const browser = await puppeteer.launch({
    headless: 'new',
  });

  for (const storyGroup of storyGroups) {
    for (const storyKind of storyGroup.storyKinds) {
      const thumbnailPath = path.resolve(thumbnailsDir, storyKind.thumbnailFileName);

      const page = await browser.newPage();
      console.log(`🚶‍♂️アクセス中… : ${storyKind.iframeUrl}`);

      await page
        .goto(storyKind.iframeUrl, {
          waitUntil: 'domcontentloaded',
        })
        .catch((err: unknown) => console.log('error loading url', err));

      await page.waitForSelector('#storybook-root > *');

      await page.setViewport({
        width: 300,
        height: 200,
        deviceScaleFactor: 2,
      });

      await page.screenshot({ path: thumbnailPath });
      console.log(`📸 サムネイルを撮影しました`);

      await page.close();
    }
  }

  await browser.close();
};

stat(thumbnailsDir, async (err) => {
  if (err) {
    await fs.mkdir(thumbnailsDir, { recursive: true });
  }
});

const storyGroups = await fetchComponentCaptures();
await generateThumbnails(storyGroups);

console.log('✅️ 完了しました');
