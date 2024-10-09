import { type CollectionEntry, getCollection } from 'astro:content';

/**
 * 指定したディレクトリ以下のページを取得する
 * @param basePath ページを取得するディレクトリのパス
 * @param excludes 除外するページのパス
 * @returns ページのコレクション
 */
export async function getSubPageCollection(basePath: string, excludes?: string[]): Promise<CollectionEntry<'articles'>[]> {
  // 先頭のスラッシュを削除
  const normalizedPath = basePath.replace(/^\//, '');
  const normalizedExcludes = excludes?.map((exclude) => exclude.replace(/^\//, ''));

  const articles = await getCollection('articles', ({ id }) => {
    const isPathExcluded = normalizedExcludes ? normalizedExcludes.some((path) => id.includes(path)) : false;

    if (isPathExcluded) {
      return false;
    }

    return id.startsWith(normalizedPath);
  });

  return articles;
}
