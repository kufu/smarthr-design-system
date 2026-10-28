import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

/**
 * react-live の scope に渡すために smarthr-ui の全エクスポートをまとめた仮想モジュールを提供する。
 *
 * `import * as ui from 'smarthr-ui'` と書くと、barrel（`smarthr-ui/lib/index.js`）の
 * 全エクスポートが必要な状態になる。barrel は他のアイランドからも静的に import されているため、
 * 全ページ共通のチャンクに smarthr-ui 全体（FileViewer 経由の pdfjs 含む）が入ってしまう。
 *
 * この仮想モジュールは barrel と同じ内容を個別モジュールへの再エクスポートとして展開する。
 * そうすることでモジュール単位で参照が解決され、ライブエディタでしか使わないコンポーネントは
 * ライブエディタのチャンク（動的 import 先）にまとまるようになる。
 */
const VIRTUAL_MODULE_ID = 'virtual:smarthr-ui-scope';
const RESOLVED_VIRTUAL_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`;

// vite は直接の依存ではなく型を参照できないため、Plugin 型は付けずに構造だけで満たしている
export default function smarthrUiScope() {
  return {
    name: 'smarthr-ui-scope',
    resolveId(id: string) {
      return id === VIRTUAL_MODULE_ID ? RESOLVED_VIRTUAL_MODULE_ID : undefined;
    },
    load(id: string) {
      if (id !== RESOLVED_VIRTUAL_MODULE_ID) {
        return undefined;
      }

      const require = createRequire(import.meta.url);
      // exports フィールド経由だと CJS 版が解決されてしまうため、パッケージルートから ESM の barrel を直接読む
      const barrelPath = new URL('./lib/index.js', pathToFileURL(require.resolve('smarthr-ui/package.json')));
      const barrel = readFileSync(barrelPath, 'utf8');
      // barrel は `export { Foo } from './components/Foo/Foo.js';` の羅列になっている。
      // smarthr-ui の exports フィールドは `./lib/*` を `./lib/*.js` に解決するため、拡張子は落とす。
      const code = barrel.replaceAll(/(?<=\bfrom '|\bimport ')\.\/(.+?)\.js(?=')/g, 'smarthr-ui/lib/$1');

      if (!code.includes("from 'smarthr-ui/lib/components/")) {
        // smarthr-ui の barrel の形式が変わった場合は、パフォーマンスは落ちるが動作はする形にフォールバックする
        console.warn('[smarthr-ui-scope] smarthr-ui の barrel を展開できませんでした。smarthr-ui 全体がバンドルされます。');
        return "export * from 'smarthr-ui';";
      }

      return code;
    },
  };
}
