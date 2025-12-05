/**
 * MicroCMSコンテンツのカテゴリ定義
 * 
 * MicroCMSのコンテンツAPIで使用するカテゴリIDを定義します。
 * カテゴリIDはMicroCMSの管理画面で設定したカテゴリのIDと一致させる必要があります。
 */

/**
 * コンテンツカテゴリID
 */
export const CONTENT_CATEGORIES = {
  /** お知らせ */
  NEWS: 'news',
  /** 団地の四季 */
  SEASON: 'season',
  /** 自治会活動 */
  COMMUNITY_ACTIVITIES: 'community-activities',
  /** 住民サークル */
  COMMUNITY_CIRCLE: 'community-circle',
} as const;

/**
 * カテゴリIDの型
 */
export type ContentCategoryId =
  | typeof CONTENT_CATEGORIES.NEWS
  | typeof CONTENT_CATEGORIES.SEASON
  | typeof CONTENT_CATEGORIES.COMMUNITY_ACTIVITIES
  | typeof CONTENT_CATEGORIES.COMMUNITY_CIRCLE;

/**
 * カテゴリIDの配列（全カテゴリ）
 */
export const ALL_CATEGORY_IDS = Object.values(CONTENT_CATEGORIES);

/**
 * カテゴリIDが有効かどうかをチェック
 */
export function isValidCategoryId(
  categoryId: string
): categoryId is ContentCategoryId {
  return ALL_CATEGORY_IDS.includes(categoryId as ContentCategoryId);
}

