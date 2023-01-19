export const INDEXED_DEPTH = 3 // h3まではインデックスされる。

// ログイン状態の確認用にアクセスするドキュメント
export const PRIVATE_DOC_PATH = '/private/basics/romu-hanako-details.md'

// プロダクト > コンポーネントのStorybook関連の定義
import packageInfo from 'smarthr-ui/package.json'

// export const SHRUI_GITHUB_RAW = `https://raw.githubusercontent.com/kufu/smarthr-ui/v${packageInfo.version}`
export const SHRUI_GITHUB_RAW = 'https://raw.githubusercontent.com/kufu/smarthr-ui/classify-by-ui-type'
export const SHRUI_GITHUB_PATH = `https://github.com/kufu/smarthr-ui/tree/v${packageInfo.version}/src/components/`
// export const SHRUI_STORYBOOK_IFRAME = 'https://smarthr-ui.netlify.app/iframe.html'
export const SHRUI_STORYBOOK_IFRAME = 'https://deploy-preview-3024--smarthr-ui.netlify.app/iframe.html'
// export const SHRUI_STORYBOOK_PATH = 'https://smarthr-ui.netlify.app/?path=/story/'
export const SHRUI_STORYBOOK_PATH = 'https://deploy-preview-3024--smarthr-ui.netlify.app/?path=/story/'

export const PATTERNS_STORYBOOK_URL = `https://main--62f0ae48c21b0728fd1a5c85.chromatic.com/`
