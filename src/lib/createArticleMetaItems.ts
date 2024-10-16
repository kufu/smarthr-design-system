import type { SidebarItem } from '@/components/Sidebar/type';

import { getSubPageCollection } from './getSubPageCollection';

import type { CollectionEntry } from 'astro:content';

type DepthItems = SidebarItem[] | undefined;

/**
 * 記事ページのメタ情報のアイテムを作成する
 * @param slug ページのslug
 * @returns アイテムの配列, 階層毎にネストしたアイテムの配列
 */
export async function createArticleMetaItems(slug: string) {
  const rootDir = slug.split('/')[0];
  const subPages = await getSubPageCollection(rootDir);

  // ページのコレクションから階層ごとのアイテムを作成する
  const { depthItems, depthComponentItems } = createDepthItems(subPages);

  /**
   * フラットなアイテムとネストしたアイテムを作成する
   * @param currentDepth 現在の階層
   * @param parentLink 親のリンク
   * @returns
   */
  const createNestedItems = (currentDepth: number, parentLink: string): [SidebarItem[], SidebarItem[]] => {
    const mergedItems = mergeAndFilterItems(depthItems[currentDepth], depthComponentItems[currentDepth], parentLink);

    const flatSidebarItems: SidebarItem[] = [];
    const nestedSidebarItems: SidebarItem[] = [];

    for (const item of mergedItems) {
      flatSidebarItems.push(item);
      nestedSidebarItems.push(item);

      // 子アイテムがある場合は再帰的に処理する
      // NOTE: 最大で4階層までを想定
      if (currentDepth < 4) {
        const [childSidebarItems, childNestedSidebarItems] = createNestedItems(currentDepth + 1, item.link);

        flatSidebarItems.push(...childSidebarItems);
        item.children = childNestedSidebarItems;
      }
    }

    return [flatSidebarItems, nestedSidebarItems];
  };

  const [flatSidebarItems, nestedSidebarItems] = createNestedItems(1, '');

  return {
    flatSidebarItems,
    nestedSidebarItems,
  };
}

/**
 * 2つのアイテムをマージしてフィルタリングする
 * @param rawDepthItems 階層ごとのアイテム
 * @param rawDepthComponentItems コンポーネントページの階層ごとのアイテム
 * @param parentPath 親のパス
 * @returns マージ後のアイテム
 */
function mergeAndFilterItems(rawDepthItems: DepthItems, rawDepthComponentItems: DepthItems, parentPath: string): SidebarItem[] {
  const depthItems = rawDepthItems ?? [];
  const depthComponentItems = rawDepthComponentItems ?? [];
  const mergedItems = [...depthItems, ...depthComponentItems];

  // 親のパス以下のアイテムに絞る
  return mergedItems.filter((item) => {
    // NOTE:
    // /products/design-patterns と /products/design-patterns-core-features のように、
    // 単純な先頭一致だと誤判定するため、末尾が何もない場合やパスが続く場合を対象とする
    const regexp = new RegExp(`^${parentPath}(/.+)?$`);

    return regexp.test(item.link);
  });
}

/**
 * ページのコレクションから階層ごとのアイテムを作成する
 * @param pages ページのコレクション
 * @returns 階層ごとのアイテム
 */
function createDepthItems(pages: Array<CollectionEntry<'articles'>>) {
  const depthItems: Record<number, DepthItems> = {};
  // NOTE: コンポーネントページは名前の順でソートするため分けてる
  const depthComponentItems: Record<number, DepthItems> = {};

  for (const { slug, data } of pages) {
    const depth = slug.split('/').length;

    const item: SidebarItem = {
      link: `/${slug}`,
      order: data?.order ?? Number.MAX_SAFE_INTEGER,
      title: data?.title ?? '',
      depth,
      children: [],
    };

    const isComponent = (depth === 3 || depth === 4) && slug.startsWith('products/components/');
    const targetItems = isComponent ? depthComponentItems : depthItems;

    // 無かったら初期化
    if (!targetItems[depth]) {
      targetItems[depth] = [];
    }

    targetItems[depth].push(item);
  }

  sortItems(depthItems, 'order');
  sortItems(depthComponentItems, 'title');

  return { depthItems, depthComponentItems };
}

/**
 * order もしくは title でアイテムをソートする
 * @param items ソート対象のアイテム
 * @param sortBy ソート順
 * @returns ソート後のアイテム
 */
function sortItems(items: Record<string, DepthItems>, sortBy: 'order' | 'title') {
  for (const key of Object.keys(items)) {
    if (!items[key]) {
      continue;
    }

    items[key].sort((a, b) => {
      // order昇順
      if (sortBy === 'order') {
        return a.order - b.order;
      }

      // title昇順
      return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
    });
  }
}
