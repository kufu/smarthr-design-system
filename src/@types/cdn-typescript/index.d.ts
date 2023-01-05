// CodeBlock -> LiveEditorで、入力されたコードのトランスパイルに使用するTypeScript用の型定義
// tsライブラリ自体はCDNから読み込む（容量が大きいため、Gatsbyのバンドルから除外したい）
// 参考：https://github.com/microsoft/TypeScript/blob/main/lib/typescript.d.ts

interface Window {
  ts: {
    transpile: (input: string, compilerOptions?: CdnTs.CompilerOptions) => string
    JsxEmit: typeof CdnTs.JsxEmit
    ScriptTarget: typeof CdnTs.ScriptTarget
  }
}

declare namespace CdnTs {
  interface CompilerOptions {
    jsx?: JsxEmit
    target?: ScriptTarget
  }
  enum JsxEmit {
    None = 0,
    Preserve = 1,
    React = 2,
    ReactNative = 3,
    ReactJSX = 4,
    ReactJSXDev = 5,
  }
  enum ScriptTarget {
    ES3 = 0,
    ES5 = 1,
    ES2015 = 2,
    ES2016 = 3,
    ES2017 = 4,
    ES2018 = 5,
    ES2019 = 6,
    ES2020 = 7,
    ES2021 = 8,
    ES2022 = 9,
    ESNext = 99,
    JSON = 100,
    Latest = 99,
  }
}
