/**
 * 記事（src/content/articles）内のアンカーリンク（`/foo/#bar`、`#bar`）のリンク先が存在するかをチェックする。
 *
 *   pnpm lint:anchors          # チェックのみ。リンク切れがあれば exit 1
 *   pnpm lint:anchors --fix    # 以前の形式（#h3-2 など）のアンカーを、今その位置にある見出しの id に書き換える
 *
 * 見出しの id は src/lib/headingId.ts（記事のレンダリングと同じ規則）で算出する。
 * ページ自体の存在・画像のリンク切れは scripts/content-checker/linkChecker.ts（週 1 回実行）が見る。
 */
import fs from 'node:fs/promises';
import path from 'node:path';

import { visit } from 'unist-util-visit';

import { getHeadingIds, parseArticle } from '../src/lib/headingId';

import type { Root } from 'mdast';
import type { MdxJsxAttribute } from 'mdast-util-mdx-jsx';

const ROOT = path.join(import.meta.dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'src/content/articles');
const SITE_ORIGIN = 'https://smarthr.design';

/** ソースからは分からない（コンポーネントが実行時に作る）id。リンク先にあってもチェックしない */
const IGNORED_FRAGMENTS = [
  /^rec[a-zA-Z0-9]{14}-0$/, // Airtable のレコード
  /^ページ内リンク$/, // 記事中の記法の説明
];

const LEGACY_ID = /^h([1-6])-(\d+)$/;

/**
 * 以前の形式（#h3-2 など）のアンカーをリンク切れとして扱わないか。
 * 見出しには以前の id も残している（FragmentTitle.astro）ので、リンク先があれば今も飛べる。
 * ただし見出しを足したり消したりすると黙って別の見出しを指すので、記事内のリンクは
 * `pnpm lint:anchors --fix` で見出しの文字列の id に置き換えていく。置き換えが済んだら false にする。
 */
const ALLOW_LEGACY_ANCHORS = true;

type ParsedFile = { filePath: string; source: string; tree: Root };

type Page = {
  pagePath: string;
  /** ページを構成する MDX ファイル（記事本体と、そこから import している .mdx） */
  files: ParsedFile[];
  ids: Set<string>;
  /** 以前の `h3-2` 形式の id → 今の id。記事本体と import した .mdx で同じ id があり、決められないものは null */
  legacyIds: Map<string, string | null>;
};

type LinkRef = {
  file: ParsedFile;
  pagePath: string;
  url: string;
  start: number;
  end: number;
  line: number;
};

type Problem = LinkRef & {
  targetPage: string;
  fragment: string;
  message: string;
  /** 以前の形式のアンカーで、リンク先が今もあるもの */
  legacy?: boolean;
  replacement?: string;
};

const toPagePath = (filePath: string) =>
  `/${path
    .relative(ARTICLES_DIR, filePath)
    .replace(/(^|\/)index\.mdx?$/, '$1')
    .replace(/\.mdx?$/, '/')}`.replace(/\/+$/, '/');

const parsedFiles = new Map<string, Promise<ParsedFile>>();
const parseFile = (filePath: string): Promise<ParsedFile> => {
  let parsed = parsedFiles.get(filePath);
  if (!parsed) {
    parsed = fs.readFile(filePath, 'utf8').then((source) => ({
      filePath,
      source,
      tree: parseArticle(source, { mdx: filePath.endsWith('.mdx') }),
    }));
    parsedFiles.set(filePath, parsed);
  }
  return parsed;
};

/** 記事本体と、そこから（再帰的に）import している .mdx を集める */
const collectPageFiles = async (filePath: string, seen = new Set<string>()): Promise<ParsedFile[]> => {
  if (seen.has(filePath)) return [];
  seen.add(filePath);
  const file = await parseFile(filePath);
  const specifiers: string[] = [];
  visit(file.tree, 'mdxjsEsm', (node) => {
    for (const [, specifier] of node.value.matchAll(/from\s+['"](\.{1,2}\/[^'"]+\.mdx)['"]/g)) {
      specifiers.push(specifier);
    }
  });
  const result = [file];
  for (const specifier of specifiers) {
    result.push(...(await collectPageFiles(path.resolve(path.dirname(filePath), specifier), seen)));
  }
  return result;
};

const attributeValue = (attributes: Array<{ type: string }>, name: string): string | undefined => {
  const attribute = attributes.find(
    (a): a is MdxJsxAttribute => a.type === 'mdxJsxAttribute' && (a as MdxJsxAttribute).name === name,
  );
  if (!attribute) return undefined;
  if (attribute.value === null || attribute.value === undefined) return '';
  return typeof attribute.value === 'string' ? attribute.value : undefined;
};

const buildPage = async (filePath: string): Promise<Page> => {
  const files = await collectPageFiles(filePath);
  const ids = new Set<string>();
  const legacyIds = new Map<string, string | null>();

  for (const file of files) {
    // Markdown の見出し（remark-index-id-header が id を付ける）。import した .mdx ごとに別々に採番される
    const legacyIndexes: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    for (const { id, heading } of getHeadingIds(file.tree)) {
      ids.add(id);
      const legacyId = `h${heading.depth}-${legacyIndexes[heading.depth]++}`;
      legacyIds.set(legacyId, legacyIds.has(legacyId) ? null : id);
    }

    visit(file.tree, (node) => {
      // 明示的に埋め込んだアンカー `{<span id="..." />}` は JSX 要素ではなく式として読まれる
      if (node.type === 'mdxFlowExpression' || node.type === 'mdxTextExpression') {
        for (const [, id] of (node as { value: string }).value.matchAll(/\sid=["']([^"']+)["']/g)) ids.add(id);
        return;
      }
      if (node.type !== 'mdxJsxFlowElement' && node.type !== 'mdxJsxTextElement') return;
      const { name, attributes } = node as { name: string | null; attributes: Array<{ type: string }> };
      // 明示的に埋め込んだアンカー（`{<span id="..." />}` など）
      const id = attributeValue(attributes, 'id');
      if (id) ids.add(id);
      // ComponentPropsTable は showTitle 指定時に `#props-Xxx` の見出しを出す
      if (name === 'ComponentPropsTable' && attributeValue(attributes, 'showTitle') !== undefined) {
        const propsName = attributeValue(attributes, 'name');
        if (propsName) ids.add(`props-${propsName.replace(' ', '-')}`);
      }
    });
  }

  return { pagePath: toPagePath(filePath), files, ids, legacyIds };
};

const collectLinks = (page: Page): LinkRef[] => {
  const links: LinkRef[] = [];
  for (const file of page.files) {
    const push = (url: string, node: { position?: { start: { offset?: number; line: number }; end: { offset?: number } } }) => {
      const start = node.position?.start.offset;
      const end = node.position?.end.offset;
      if (start === undefined || end === undefined) return;
      links.push({ file, pagePath: page.pagePath, url, start, end, line: node.position!.start.line });
    };
    visit(file.tree, (node) => {
      if (node.type === 'link' || node.type === 'definition') {
        push((node as { url: string }).url, node);
      } else if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
        const href = attributeValue((node as { attributes: Array<{ type: string }> }).attributes, 'href');
        if (href) push(href, node);
      }
    });
  }
  return links;
};

/** リンクの URL を、記事のページパスとアンカーに分ける。サイト外へのリンク・アンカーなしのリンクは null */
const resolveLink = (link: LinkRef): { targetPage: string; fragment: string } | null => {
  const hashIndex = link.url.indexOf('#');
  if (hashIndex === -1) return null;
  const rawPath = link.url.slice(0, hashIndex).replace(SITE_ORIGIN, '');
  if (/^[a-z][a-z0-9+.-]*:/i.test(rawPath) || rawPath.startsWith('//')) return null;

  let fragment = link.url.slice(hashIndex + 1);
  try {
    fragment = decodeURIComponent(fragment);
  } catch {
    // そのまま比較する
  }
  if (fragment === '') return null;

  const pathname = rawPath === '' ? link.pagePath : new URL(rawPath, `${SITE_ORIGIN}${link.pagePath}`).pathname;
  return { targetPage: pathname.endsWith('/') ? pathname : `${pathname}/`, fragment };
};

const check = (pages: Map<string, Page>): Problem[] => {
  const problems: Problem[] = [];
  const seen = new Set<string>();
  for (const page of pages.values()) {
    for (const link of collectLinks(page)) {
      // import した .mdx を複数の記事が使っている場合に、同じリンクを何度も報告しない
      const key = `${link.file.filePath}:${link.start}`;
      if (seen.has(key)) continue;
      seen.add(key);

      const resolved = resolveLink(link);
      if (!resolved) continue;
      const { targetPage, fragment } = resolved;
      if (IGNORED_FRAGMENTS.some((pattern) => pattern.test(fragment))) continue;

      const target = pages.get(targetPage);
      if (!target) {
        // 記事以外のページ（/search/ など）はソースから id が分からないので見ない
        continue;
      }
      if (target.ids.has(fragment)) continue;

      const legacy = LEGACY_ID.test(fragment) ? target.legacyIds.get(fragment) : undefined;
      if (legacy) {
        problems.push({
          ...link,
          ...resolved,
          legacy: true,
          message: `#${fragment} は以前の形式のアンカーです。見出しの文字列から作った id（#${legacy}）を使ってください`,
          replacement: link.url.slice(0, link.url.indexOf('#') + 1) + legacy,
        });
      } else if (legacy === null) {
        problems.push({
          ...link,
          ...resolved,
          legacy: true,
          message: `#${fragment} は以前の形式のアンカーで、${targetPage} の複数の見出しが該当します。見出しの文字列から作った id を使ってください`,
        });
      } else {
        problems.push({
          ...link,
          ...resolved,
          message: `${targetPage === link.pagePath ? 'このページ' : targetPage} に #${fragment} がありません`,
        });
      }
    }
  }
  return problems;
};

/** 書き換えられた問題を返す（ソース上で URL が見つからなかったものは書き換えずに残す） */
const applyFixes = async (problems: Problem[]): Promise<Set<Problem>> => {
  const fixed = new Set<Problem>();
  const byFile = Map.groupBy(
    problems.filter((p) => p.replacement),
    (p) => p.file.filePath,
  );
  for (const [filePath, fixes] of byFile) {
    let { source } = await parseFile(filePath);
    for (const fix of fixes.toSorted((a, b) => b.start - a.start)) {
      const slice = source.slice(fix.start, fix.end);
      const urlIndex = slice.lastIndexOf(fix.url);
      if (urlIndex === -1) continue;
      source =
        source.slice(0, fix.start) +
        slice.slice(0, urlIndex) +
        fix.replacement +
        slice.slice(urlIndex + fix.url.length) +
        source.slice(fix.end);
      fixed.add(fix);
    }
    await fs.writeFile(filePath, source);
  }
  return fixed;
};

const main = async () => {
  const fix = process.argv.includes('--fix');
  const articleFiles = (await Array.fromAsync(fs.glob('**/*.{md,mdx}', { cwd: ARTICLES_DIR })))
    .filter((file) => !file.split('/').some((segment) => segment.startsWith('_')))
    .map((file) => path.join(ARTICLES_DIR, file))
    .sort();

  const pages = new Map<string, Page>();
  for (const filePath of articleFiles) {
    const page = await buildPage(filePath);
    pages.set(page.pagePath, page);
  }

  const problems = check(pages);
  const fixed = fix ? await applyFixes(problems) : new Set<Problem>();
  const unfixed = problems.filter((p) => !fixed.has(p));
  const remaining = ALLOW_LEGACY_ANCHORS ? unfixed.filter((p) => !p.legacy) : unfixed;
  const legacyCount = unfixed.length - remaining.length;

  for (const problem of remaining.toSorted((a, b) => a.file.filePath.localeCompare(b.file.filePath) || a.line - b.line)) {
    const file = path.relative(ROOT, problem.file.filePath);
    console.error(`${file}:${problem.line}: ${problem.url}\n  ${problem.message}`);
    if (process.env.GITHUB_ACTIONS) {
      console.log(`::error file=${file},line=${problem.line},title=アンカーリンク切れ::${problem.message}`);
    }
  }

  if (fixed.size > 0) console.log(`以前の形式のアンカーを ${fixed.size} 件書き換えました。`);
  if (legacyCount > 0) {
    console.log(
      `以前の形式（#h3-2 など）のアンカーが ${legacyCount} 件あります。今は飛べますが、見出しの増減で別の見出しを指すようになるので、` +
        '`pnpm lint:anchors --fix` で書き換えてください。',
    );
  }
  if (remaining.length > 0) {
    console.error(`\nリンク先が見つからないアンカーリンクが ${remaining.length} 件あります。`);
    if (!fix && remaining.some((p) => p.replacement)) {
      console.error('以前の形式（#h3-2 など）のものは `pnpm lint:anchors --fix` で書き換えられます。');
    }
    process.exit(1);
  }
  console.log(`✨ アンカーリンクをチェックしました（${articleFiles.length} 記事）。リンク切れはありません。`);
};

await main();
