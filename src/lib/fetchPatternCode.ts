import { PATTERNS_GITHUB_RAW } from '@/constants/application';

/**
 * パターンコードを取得する
 * @param patternName パターン名
 * @returns コード
 */
export async function fetchPatternCode(patternName: string) {
  const rawFileUrl = new URL(`${patternName}/${patternName}.tsx`, PATTERNS_GITHUB_RAW);

  const res = await fetch(rawFileUrl.toString());
  if (!res.ok) {
    throw new Error(`${patternName}のPatternCodeが取得できませんでした: ${res.statusText}`);
  }

  return res.text();
}
