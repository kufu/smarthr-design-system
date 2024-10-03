import { getCollection } from 'astro:content';

/**
 * 指定したディレクトリ以下のページを取得する
 * @param basePath ページを取得するディレクトリのパス
 * @param excludes 除外するページのパス
 * @returns ページのコレクション
 */
export async function getSubPageCollection(basePath: string, excludes: string[] = []) {
  // 先頭のスラッシュを削除
  const normalizedPath = basePath.replace(/^\//, '');
  const normalizedExcludes = excludes.map((exclude) => exclude.replace(/^\//, ''));

  const articles = await getCollection('articles', ({ id }) => {
    if (id.endsWith('index.mdx')) {
      return false;
    }

    return id.startsWith(normalizedPath) && !normalizedExcludes.includes(id);
  });

  return articles;
}
