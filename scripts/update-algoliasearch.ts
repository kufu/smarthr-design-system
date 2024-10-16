import fs from 'node:fs';
import path from 'node:path';

import { type BatchRequest, algoliasearch } from 'algoliasearch';
import matter from 'gray-matter';

/**
 * ディレクトリを再帰的に探索して、mdxファイルのパスを取得する
 * @param currentPath 探索するディレクトリ
 * @param mdxFiles ファイルパスを格納する配列
 */
function walkDir(currentPath: string, mdxFiles: string[]) {
  const files = fs.readdirSync(currentPath);

  for (const file of files) {
    const fullPath = path.join(currentPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkDir(fullPath, mdxFiles);
    } else if (stat.isFile() && fullPath.endsWith('.mdx')) {
      mdxFiles.push(fullPath);
    }
  }
}

/**
 * ファイルパスからページのパスを取得
 * @param fullPath ファイルのフルパス
 * @param subDir ページのルートディレクトリ
 * @returns ページのパス
 */
function getPagePath(fullPath: string, subDir: string): `${string}/` {
  const subDirIndex = fullPath.indexOf(subDir);

  if (subDirIndex === -1) {
    throw new Error(`"${fullPath}" には "${subDir}" が含まれていません`);
  }

  let pagePath = fullPath.substring(subDirIndex + subDir.length + 1).replace('.mdx', '');

  // 末尾が /index の場合は必要ないので削除
  if (pagePath.endsWith('/index')) {
    pagePath = pagePath.replace('/index', '');
  }

  return `${pagePath}/`;
}

// src/content/articles 以下のmdxファイルを取得
const filePaths: string[] = [];
walkDir(path.join(import.meta.dirname, '../src/content/articles'), filePaths);

// ファイルの内容を取得してAlgoliaに送信する形式に変換
const sendData = filePaths.map((fullpath) => {
  try {
    const mdx = fs.readFileSync(fullpath);
    const { data, content } = matter(mdx);

    const pagePath = getPagePath(fullpath, 'articles');
    const category = pagePath.split('/').at(0) || '';

    const { title, description } = data;

    return {
      id: pagePath,
      title,
      category,
      description,
      body: content,
      path: pagePath,
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
});

if (!process.env.CI) {
  console.log('🚨 実行環境がCIではないようです');
  process.exit(1);
}

// Algoliaにデータを送信
const client = algoliasearch(process.env.PUBLIC_ALGOLIA_APP_ID ?? '', process.env.PUBLIC_ALGOLIA_SEARCH_API_KEY ?? '');

const requests = sendData.map(
  (data): BatchRequest => ({
    action: 'updateObject',
    body: data,
  }),
);

console.log('🚀 Algoliaにデータを送信中');

// TODO: 動作確認
await client.batch({
  indexName: process.env.PUBLIC_ALGOLIA_INDEX_NAME ?? '',
  batchWriteParams: {
    requests,
  },
});

console.log('✨ 完了');
