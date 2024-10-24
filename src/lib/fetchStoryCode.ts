import { SHRUI_GITHUB_RAW } from '@/constants/application';

/**
 * GitHubから指定したバージョンのStoryのコードを取得する
 * @param version バージョン
 * @param filePath ファイルパス
 * @returns コード
 */
export async function fetchStoryCode(version: string, filePath: string): Promise<string> {
  try {
    const endpoint = new URL(`v${version}/${filePath}`, SHRUI_GITHUB_RAW);
    const res = await fetch(endpoint.toString());

    return await res.text();
  } catch (error) {
    throw new Error(`Storyのコードの取得に失敗しました (path: ${filePath}): ${error}`);
  }
}
