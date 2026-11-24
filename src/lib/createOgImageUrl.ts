import { CLOUDINARY_CLOUD_NAME } from '@/constants/application';
import { SITE_OGIMAGE, SITE_URL } from '@/constants/site';

/**
 * Cloudinary のテキストレイヤーに埋め込む文字列をエスケープする
 *
 * Cloudinary の SDK と同じく、テキストを 1 回 URL エンコードしたうえで、
 * 変換パラメータの区切りになる `,` と `/` だけを二重にエスケープする。
 * エスケープしないと、`%` や `,` を含むタイトルで画像の URL が壊れる。
 */
function escapeCloudinaryText(text: string): string {
  return encodeURIComponent(text)
    .replace(/[!'()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`)
    .replace(/%2C/g, '%252C')
    .replace(/%2F/g, '%252F');
}

/**
 * OGP画像のURLを生成する
 * @param ogTitle OG画像に表示するテキスト
 * @returns 画像のURL
 */
export function createOgImageUrl(ogTitle?: string): string {
  // 指定がない場合はデフォルトのOGP画像を返す
  if (!ogTitle) {
    return new URL(SITE_OGIMAGE, SITE_URL).toString();
  }

  const cloudinaryParams = `w_1200,c_fit,fl_relative,l_text:sds:notosansbold.otf_72_bold_normal_center:${escapeCloudinaryText(ogTitle)},w_1100/fl_layer_apply,g_center,y_-0.05/sds/sds_ogp_base.jpg`;
  const cloudinaryUrl = new URL(`/${CLOUDINARY_CLOUD_NAME}/image/upload/${cloudinaryParams}`, 'https://res.cloudinary.com');

  return cloudinaryUrl.toString();
}
