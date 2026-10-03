// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly CLOUDINARY_CLOUD_NAME: string;
  readonly PUBLIC_ALGOLIA_APP_ID;
  readonly ALGOLIA_ADMIN_API_KEY;
  readonly PUBLIC_ALGOLIA_SEARCH_API_KEY;
  readonly PUBLIC_ALGOLIA_INDEX_NAME;

  readonly AIRTABLE_BASE_ID: string;
  readonly AIRTABLE_API_KEY: string;
  readonly AIRTABLE_PERSONAL_ACCESS_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'virtual:smarthr-ui-scope' {
  export * from 'smarthr-ui';
}

// jsxImportSource による解決が効かない経路（エディタが扱う .astro の仮想ファイルなど）では、
// グローバルの JSX 名前空間にフォールバックする。
// @types/react v19 がグローバルの JSX 名前空間を提供しなくなったため、そのままだと HTML 要素が型エラーになる
// （instantsearch-ui-components が空の JSX.IntrinsicElements を宣言しているため、エラーは TS2339 になる）。
// 実際の型付けは .astro なら astroHTML.JSX、.tsx なら react/jsx-runtime が担うので、
// ここではフォールバック経路が壊れないようインデックスシグネチャだけを補う。
declare namespace JSX {
  interface IntrinsicElements {
    [name: string]: any;
  }
}
