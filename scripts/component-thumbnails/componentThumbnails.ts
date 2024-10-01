import { stat } from 'node:fs';
import fs from 'fs/promises';
import path from 'path';

/*
puppeteerは、このディレクトリである/scripts/component-thumbnailsに移動してインストールしてください
詳細はこのディレクトリ内のREADME.mdを参照してください
*/
import puppeteer from 'puppeteer';
import { StoryGroup, fetchComponentCaptures } from '../../plugins/gatsby-source-component-captures/fetchComponentCaptures';

const thumbnailsDir = path.resolve(__dirname, '../', '../', 'static', 'thumbnails', 'component-stories');

const generateThumbnails = async (storyGroups: StoryGroup[]) => {
  const browser = await puppeteer.launch({
    headless: 'new',
  });

  for (const storyGroup of storyGroups) {
    for (const storyKind of storyGroup.storyKinds) {
      const thumbnailPath = path.resolve(thumbnailsDir, storyKind.thumbnailFileName);
      const page = await browser.newPage();

      await page
        .goto(storyKind.iframeUrl, {
          waitUntil: 'domcontentloaded',
        })
        .catch((err) => console.log('error loading url', err));
      await page.waitForSelector('#storybook-root > *');
      await page.setViewport({
        width: 300,
        height: 200,
        deviceScaleFactor: 2,
      });
      await page.screenshot({ path: thumbnailPath });
      console.log(`Thumbnail for ${storyKind.iframeUrl} generated.`);
      await page.close();
    }
  }

  await browser.close();
};

(async () => {
  stat(thumbnailsDir, async (err) => {
    if (err) {
      await fs.mkdir(thumbnailsDir, { recursive: true });
    }
  });
  const storyGroups = await fetchComponentCaptures();
  await generateThumbnails(storyGroups);
})();
