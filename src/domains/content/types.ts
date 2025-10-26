import { BaseEntity } from '@/shared/types';
import { Category } from '@/domains/category';
import { Media } from '@/domains/media';

// コンテンツの種類
export enum ContentType {
  ARTICLE = 'article', // 記事
  HISTORY = 'history', // 団地のあゆみ
}

// コンテンツの公開状態
export enum ContentStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

// MicroCMSから取得するコンテンツデータ
export interface Content extends BaseEntity {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  type: ContentType;
  status: ContentStatus;
  category?: Category;
  categoryId?: string;
  featuredImage?: Media;
  featuredImageId?: string;
  images?: Media[];
  imageIds?: string[];
  tags?: string[];
  author?: string;
  publishedAt?: Date;
  isPublic: boolean;
  viewCount: number;
  sortOrder: number;
}

// MicroCMS API用の型定義
export interface MicroCMSContent {
  id: string;
  createdAt: string;
  updatedAt: string;
  revisedAt: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  type: ContentType;
  status: ContentStatus;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  featuredImage?: {
    id: string;
    url: string;
    alt?: string;
  };
  images?: Array<{
    id: string;
    url: string;
    alt?: string;
  }>;
  tags?: string[];
  author?: string;
  publishedAt?: string;
  isPublic: boolean;
  viewCount: number;
  sortOrder: number;
}

// コンテンツ作成リクエスト
export interface CreateContentRequest {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  type: ContentType;
  status: ContentStatus;
  categoryId?: string;
  featuredImageId?: string;
  imageIds?: string[];
  tags?: string[];
  author?: string;
  publishedAt?: Date;
  isPublic: boolean;
  sortOrder: number;
}

// コンテンツ更新リクエスト
export interface UpdateContentRequest {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  type?: ContentType;
  status?: ContentStatus;
  categoryId?: string;
  featuredImageId?: string;
  imageIds?: string[];
  tags?: string[];
  author?: string;
  publishedAt?: Date;
  isPublic?: boolean;
  sortOrder?: number;
}

// コンテンツ検索フィルター
export interface ContentFilter {
  type?: ContentType;
  status?: ContentStatus;
  categoryId?: string;
  tags?: string[];
  author?: string;
  isPublic?: boolean;
  search?: string;
  publishedAfter?: Date;
  publishedBefore?: Date;
}

// コンテンツタイプの表示名マッピング
export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  [ContentType.ARTICLE]: '記事',
  [ContentType.HISTORY]: '団地のあゆみ',
};

// コンテンツステータスの表示名マッピング
export const CONTENT_STATUS_LABELS: Record<ContentStatus, string> = {
  [ContentStatus.DRAFT]: '下書き',
  [ContentStatus.PUBLISHED]: '公開中',
  [ContentStatus.ARCHIVED]: 'アーカイブ',
};
