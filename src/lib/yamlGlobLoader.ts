import fs from 'node:fs';
import { glob } from 'node:fs/promises';
import path from 'node:path';

import { parse as parseYaml } from 'yaml';

import type { Loader } from 'astro/loaders';

interface YamlGlobOptions {
  /** glob パターン（base 相対） */
  pattern: string | string[];
  /** ベースディレクトリ（プロジェクトルート相対 or 絶対パス） */
  base: string;
  /**
   * エントリ ID 生成関数。デフォルトはファイル相対パスから拡張子を落とし、
   * パスセパレータを `/` に正規化したもの。
   */
  generateId?: (relPath: string) => string;
}

/**
 * Astro v6 の glob loader は yaml 形式に未対応のため、yaml 専用 loader を自作する。
 * パターン記述・watcher 連携・schema 適用の流れは公式 glob loader と同等。
 * ファイル列挙には Node 22+ の標準 `fs.promises.glob` を使用（依存ゼロ）。
 */
export function yamlGlob({ pattern, base, generateId }: YamlGlobOptions): Loader {
  const baseDir = path.resolve(base);
  const defaultId = (rel: string) => rel.replace(/\.ya?ml$/, '').replaceAll(path.sep, '/');

  async function loadFile(
    store: Parameters<NonNullable<Loader['load']>>[0]['store'],
    parseData: Parameters<NonNullable<Loader['load']>>[0]['parseData'],
    rel: string,
  ) {
    const absPath = path.join(baseDir, rel);
    const text = fs.readFileSync(absPath, 'utf-8');
    const raw = parseYaml(text) ?? {};
    const id = (generateId ?? defaultId)(rel);
    const data = await parseData({ id, data: raw as Record<string, unknown> });
    const filePath = path.relative(process.cwd(), absPath);
    store.set({ id, data, filePath });
    return id;
  }

  return {
    name: 'yaml-glob-loader',
    load: async ({ store, parseData, logger, watcher }) => {
      store.clear();
      for await (const rel of glob(pattern, { cwd: baseDir })) {
        try {
          await loadFile(store, parseData, rel);
        } catch (err) {
          logger.error(`Failed to load YAML "${rel}": ${err instanceof Error ? err.message : err}`);
        }
      }

      if (watcher) {
        const patterns = (Array.isArray(pattern) ? pattern : [pattern]).map((p) => path.join(baseDir, p));
        watcher.add(patterns);

        // Astro 共有 watcher は base 外のファイル変更イベントも流すため、
        // base 配下かつ .yaml/.yml のみを処理対象にする。
        const isTarget = (filePath: string) => {
          const rel = path.relative(baseDir, filePath);
          if (!rel || rel.startsWith('..') || path.isAbsolute(rel)) return false;
          return /\.ya?ml$/.test(rel);
        };

        const reload = async (filePath: string) => {
          if (!isTarget(filePath)) return;
          const rel = path.relative(baseDir, filePath);
          try {
            await loadFile(store, parseData, rel);
          } catch (err) {
            logger.error(`Failed to reload YAML "${rel}": ${err instanceof Error ? err.message : err}`);
          }
        };
        watcher.on('add', reload);
        watcher.on('change', reload);
        watcher.on('unlink', (filePath) => {
          if (!isTarget(filePath)) return;
          const rel = path.relative(baseDir, filePath);
          const id = (generateId ?? defaultId)(rel);
          store.delete(id);
        });
      }
    },
  };
}
