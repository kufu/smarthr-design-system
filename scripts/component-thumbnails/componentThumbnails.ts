import fs from 'fs/promises';
import { existsSync } from 'node:fs';
import path from 'path';

/*
puppeteerは、このディレクトリである/scripts/component-thumbnailsに移動してインストールしてください
詳細はこのディレクトリ内のREADME.mdを参照してください
*/
import puppeteer from 'puppeteer';

import { type StoryGroup, fetchComponentCaptures } from '../../src/lib/fetchComponentCaptures';

const thumbnailsDir = path.resolve(import.meta.dirname, '../../public/thumbnails/component-stories/');
const cacheFilePath = path.resolve(import.meta.dirname, './thumbnails-cache.json');

// キャッシュファイルから前回のストーリー情報を読み込む
const loadPreviousStories = async () => {
  if (!existsSync(cacheFilePath)) {
    return {};
  }

  const data = await fs.readFile(cacheFilePath, 'utf8');
  return JSON.parse(data) || {};
};

// ストーリー情報を保存
const saveStoryCache = async (storyData) => {
  await fs.writeFile(cacheFilePath, JSON.stringify(storyData, null, 2), 'utf8');
};

// ストーリーが変更されたかチェック
const hasStoryChanged = (prevStories, storyKind) => {
  const storyId = `${storyKind.kindName}-${storyKind.thumbnailFileName}`;
  // キャッシュに存在しないか、iframeUrlが変わっていれば変更あり
  return !prevStories[storyId] || prevStories[storyId].iframeUrl !== storyKind.iframeUrl;
};

const generateThumbnails = async (storyGroups: StoryGroup[]) => {
  // 前回のキャッシュ読み込み
  const previousStories = await loadPreviousStories();

  // 今回の情報を保存する新しいキャッシュオブジェクト
  const currentStories = {};

  // 強制更新フラグ
  const forceUpdate = process.argv.includes('--force');

  const browser = await puppeteer.launch();

  let updatedCount = 0;
  let skippedCount = 0;

  for (const storyGroup of storyGroups) {
    for (const storyKind of storyGroup.storyKinds) {
      const thumbnailPath = path.resolve(thumbnailsDir, storyKind.thumbnailFileName);
      const storyId = `${storyKind.kindName}-${storyKind.thumbnailFileName}`;

      // 新しいキャッシュに情報を追加
      currentStories[storyId] = {
        kindName: storyKind.kindName,
        thumbnailFileName: storyKind.thumbnailFileName,
        iframeUrl: storyKind.iframeUrl,
        displayName: storyKind.displayName,
      };

      // 変更がない場合はスキップ（サムネイルが存在することも確認）
      if (!forceUpdate && !hasStoryChanged(previousStories, storyKind) && existsSync(thumbnailPath)) {
        console.log(`⏭️ 変更なしでスキップ: ${storyKind.displayName}`);
        skippedCount++;
        continue;
      }

      const page = await browser.newPage();
      console.log(`🚶‍♂️アクセス中… : ${storyKind.iframeUrl}`);

      const response = await page.goto(storyKind.iframeUrl, {
        waitUntil: 'domcontentloaded',
      });

      if (!response || !response.ok()) {
        console.log(`⚠️ ページ読み込みエラー: ${storyKind.iframeUrl}`);
        await page.close();
        continue;
      }

      await page.waitForSelector('#storybook-root > *');

      await page.setViewport({
        width: 300,
        height: 200,
        deviceScaleFactor: 2,
      });

      await page.screenshot({ path: thumbnailPath });
      console.log(`📸 サムネイル撮影: ${storyKind.displayName}`);
      updatedCount++;

      await page.close();
    }
  }

  await browser.close();

  // 新しいキャッシュを保存
  await saveStoryCache(currentStories);

  console.log(`🔄 更新: ${updatedCount}件、スキップ: ${skippedCount}件`);
};

// ディレクトリ作成
const ensureThumbnailDir = async () => {
  if (!existsSync(thumbnailsDir)) {
    await fs.mkdir(thumbnailsDir, { recursive: true });
  }
};

// メイン処理
const main = async () => {
  await ensureThumbnailDir();
  const storyGroups = await fetchComponentCaptures();
  await generateThumbnails(storyGroups);
  console.log('✅️ 完了しました');
};

main();
