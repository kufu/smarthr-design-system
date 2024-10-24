// Algoliaのオブジェクトを更新するスクリプト
//
// 安全のため、CI環境でのみ実行できるようにしています
// ローカルで実行する場合は、CI=1 を先頭に付けて実行してください
//
// オプション:
// --replace-all 指定すると全てのオブジェクトを入れ替えます (デフォルトは更新)

import fs from 'node:fs';
import path from 'node:path';

import { type BatchRequest, algoliasearch } from 'algoliasearch';
import matter from 'gray-matter';

if (!process.env.CI) {
  console.warn('🚨 実行環境がCIではないようです。ローカル環境で実行する場合は、CI=1 を先頭に付けて実行してください');
  process.exit(1);
}

// コマンドライン引数を取得
const args = process.argv.slice(2);
const isReplaceAllMode = args.find((arg) => arg === '--replace-all');

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
      objectID: pagePath,
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

const client = algoliasearch(process.env.PUBLIC_ALGOLIA_APP_ID ?? '', process.env.ALGOLIA_ADMIN_API_KEY ?? '');

console.log('🚀 Algoliaにデータを送信中');

if (isReplaceAllMode) {
  // 全てのオブジェクトを入れ替える
  client.replaceAllObjects({
    indexName: process.env.PUBLIC_ALGOLIA_INDEX_NAME ?? '',
    objects: sendData,
  });
} else {
  const requests = sendData.map(
    (data): BatchRequest => ({
      action: 'updateObject',
      body: data,
    }),
  );

  // オブジェクトを更新する
  await client.batch({
    indexName: process.env.PUBLIC_ALGOLIA_INDEX_NAME ?? '',
    batchWriteParams: {
      requests,
    },
  });
}

console.log('✨ 完了');

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
