import { CLOUDINARY_CLOUD_NAME } from '@/constants/application';
import { SITE_OG_IMAGE, SITE_URL } from '@/constants/site';

/**
 * OGP画像のURLを生成する
 * @param ogTitle OG画像に表示するテキスト
 * @returns 画像のURL
 */
export function createOgImageUrl(ogTitle?: string): string {
  // 指定がない場合はデフォルトのOGP画像を返す
  if (!ogTitle) {
    return new URL(SITE_OG_IMAGE, SITE_URL).toString();
  }

  const cloudinaryParams = `w_1200,c_fit,fl_relative,l_text:sds:notosansbold.otf_72_bold_normal_center:${ogTitle},w_1100/fl_layer_apply,g_center,y_-0.05/sds/sds_ogp_base.jpg`;
  const cloudinaryUrl = new URL(`/${CLOUDINARY_CLOUD_NAME}/image/upload/${cloudinaryParams}`, 'https://res.cloudinary.com');

  return cloudinaryUrl.toString();
}
