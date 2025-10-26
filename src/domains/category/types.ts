import { BaseEntity } from '@/shared/types';

// カテゴリの種類（ホームページの各ページに対応）
export enum CategoryType {
  OVERVIEW = 'overview', // 団地の概要
  ORGANIZATION = 'organization', // 組織体制
  HISTORY = 'history', // 団地のあゆみ
  ACTIVITIES = 'activities', // 自治体活動
  CLUBS = 'clubs', // 住人サークル紹介
  FACILITIES = 'facilities', // 共用施設・サービス
  CHILDCARE = 'childcare', // 子育て環境の魅力
}

// MicroCMSから取得するカテゴリデータ
export interface Category extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  type: CategoryType;
  sortOrder: number;
  isActive: boolean;
}

// MicroCMS API用の型定義
export interface MicroCMSCategory {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
  slug: string;
  description?: string;
  type: CategoryType;
  sortOrder: number;
  isActive: boolean;
}

// カテゴリ作成リクエスト
export interface CreateCategoryRequest {
  name: string;
  slug: string;
  description?: string;
  type: CategoryType;
  sortOrder: number;
  isActive: boolean;
}

// カテゴリ更新リクエスト
export interface UpdateCategoryRequest {
  name?: string;
  slug?: string;
  description?: string;
  type?: CategoryType;
  sortOrder?: number;
  isActive?: boolean;
}

// カテゴリタイプの表示名マッピング
export const CATEGORY_TYPE_LABELS: Record<CategoryType, string> = {
  [CategoryType.OVERVIEW]: '団地の概要',
  [CategoryType.ORGANIZATION]: '組織体制',
  [CategoryType.HISTORY]: '団地のあゆみ',
  [CategoryType.ACTIVITIES]: '自治体活動',
  [CategoryType.CLUBS]: '住人サークル紹介',
  [CategoryType.FACILITIES]: '共用施設・サービス',
  [CategoryType.CHILDCARE]: '子育て環境の魅力',
};
