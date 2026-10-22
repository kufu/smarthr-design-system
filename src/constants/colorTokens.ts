/**
 * 「色」ページ（/products/design-tokens/color/）で表示するデザイントークンの色
 *
 * 色の値はこのファイルでだけ管理し、記事からはトークン名で参照します。
 * セマンティックトークンは、smarthr-ui と同じくプリミティブトークンを参照して定義しています。
 */

/** プリミティブトークン：基本色 */
export const BASE_COLORS = {
  BLACK: '#030302',
  WHITE: '#ffffff',
  BLUE_100: '#0077c7',
  BLUE_101: '#0071c1',
  GREEN_100: '#0f7f85',
  ORANGE_100: '#f56121',
  RED_100: '#e01e5a',
  YELLOW_100: '#ffcc17',
  SMARTHR_BLUE: '#00c4cc',
} as const;

/** プリミティブトークン：グレースケール */
export const GREY_SCALE = {
  GREY_5: '#f8f7f6',
  GREY_6: '#f5f4f3',
  GREY_7: '#f2f1f0',
  GREY_9: '#edebe8',
  GREY_20: '#d6d3d0',
  GREY_30: '#c1bdb7',
  GREY_65: '#706d65',
  GREY_100: '#23221e',
} as const;

/** プリミティブトークン：透明色 */
export const TRANSPARENCY_SCALE = {
  TRANSPARENCY_15: 'rgba(3,3,2,0.15)',
  TRANSPARENCY_30: 'rgba(3,3,2,0.3)',
  TRANSPARENCY_50: 'rgba(3,3,2,0.5)',
} as const;

/** セマンティックトークン */
export const SEMANTIC_COLORS = {
  // メイン
  MAIN: BASE_COLORS.BLUE_100,
  WHITE: BASE_COLORS.WHITE,
  // アクセント
  DANGER: BASE_COLORS.RED_100,
  WARNING_YELLOW: BASE_COLORS.YELLOW_100,
  // 文字
  TEXT_BLACK: GREY_SCALE.GREY_100,
  TEXT_GREY: GREY_SCALE.GREY_65,
  TEXT_LINK: BASE_COLORS.BLUE_101,
  TEXT_DISABLED: GREY_SCALE.GREY_30,
  TEXT_WHITE: BASE_COLORS.WHITE,
  // 線
  BORDER: GREY_SCALE.GREY_20,
  TRANSPARENT: 'rgba(255,255,255,0)',
  // 背景
  ACTION_BACKGROUND: GREY_SCALE.GREY_20,
  HEAD: GREY_SCALE.GREY_9,
  OVER_BACKGROUND: GREY_SCALE.GREY_7,
  COLUMN: GREY_SCALE.GREY_5,
  BACKGROUND: GREY_SCALE.GREY_5,
  OVERLAY: TRANSPARENCY_SCALE.TRANSPARENCY_15,
  SCRIM: TRANSPARENCY_SCALE.TRANSPARENCY_50,
} as const;

export type SemanticColorName = keyof typeof SEMANTIC_COLORS;

/** 多色チャート（この順序で使う） */
export const CHART_COLORS = {
  CHART_COLOR_1: '#00c4cc',
  CHART_COLOR_2: '#ffcd00',
  CHART_COLOR_3: '#ff9100',
  CHART_COLOR_4: '#e65537',
  CHART_COLOR_5: '#2d4b9b',
  CHART_COLOR_6: '#2d7df0',
  CHART_COLOR_7: '#69d7ff',
  CHART_COLOR_8: '#4bb47d',
  CHART_COLOR_9: '#05878c',
  CHART_COLOR_10: '#005a64',
} as const;

/** 単色チャート（この順序で使う） */
export const SINGLE_CHART_COLORS = {
  SINGLE_CHART_COLOR_1: '#a1e3e6',
  SINGLE_CHART_COLOR_2: '#00c4cc',
  SINGLE_CHART_COLOR_3: '#00acb3',
  SINGLE_CHART_COLOR_4: '#05868b',
  SINGLE_CHART_COLOR_5: '#055659',
  SINGLE_CHART_COLOR_6: '#033033',
} as const;

/**
 * `#rrggbb`（または `#rgb`）を `rgb(r,g,b)` に変換する
 * `rgba(...)` など16進数表記でない値は変換できないため null を返す
 */
export const hexToRgb = (value: string): string | null => {
  if (!value.startsWith('#')) return null;

  let hex = value.slice(1);
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgb(${r},${g},${b})`;
};
