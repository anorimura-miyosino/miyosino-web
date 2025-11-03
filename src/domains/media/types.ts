import { BaseEntity } from '@/shared/types';

// メディアの種類
export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
  DOCUMENT = 'document',
}

// MicroCMSから取得する写真データ
export interface Media extends BaseEntity {
  title: string;
  description?: string;
  type: MediaType;
  url: string;
  thumbnailUrl?: string;
  alt?: string;
  width?: number;
  height?: number;
  fileSize?: number;
  mimeType?: string;
  tags?: string[];
  isPublic: boolean;
}

// MicroCMS API用の型定義
export interface MicroCMSMedia {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  description?: string;
  type: MediaType;
  url: string;
  thumbnailUrl?: string;
  alt?: string;
  width?: number;
  height?: number;
  fileSize?: number;
  mimeType?: string;
  tags?: string[];
  isPublic: boolean;
}

// メディア作成リクエスト
export interface CreateMediaRequest {
  title: string;
  description?: string;
  type: MediaType;
  url: string;
  thumbnailUrl?: string;
  alt?: string;
  width?: number;
  height?: number;
  fileSize?: number;
  mimeType?: string;
  tags?: string[];
  isPublic: boolean;
}

// メディア更新リクエスト
export interface UpdateMediaRequest {
  title?: string;
  description?: string;
  type?: MediaType;
  url?: string;
  thumbnailUrl?: string;
  alt?: string;
  width?: number;
  height?: number;
  fileSize?: number;
  mimeType?: string;
  tags?: string[];
  isPublic?: boolean;
}

// メディア検索フィルター
export interface MediaFilter {
  type?: MediaType;
  tags?: string[];
  isPublic?: boolean;
  search?: string;
}

// メディアタイプの表示名マッピング
export const MEDIA_TYPE_LABELS: Record<MediaType, string> = {
  [MediaType.IMAGE]: '画像',
  [MediaType.VIDEO]: '動画',
  [MediaType.DOCUMENT]: '文書',
};

// Heroセクション用の写真データ
export interface Photo extends BaseEntity {
  title: string;
  description?: string;
  photo: {
    url: string;
    width?: number;
    height?: number;
  };
  order: number;
}

// MicroCMS API用のPhoto型定義
export interface MicroCMSPhoto {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
  title: string;
  description?: string;
  photo: {
    url: string;
    width?: number;
    height?: number;
  };
  order: number;
}

// MicroCMSのレスポンス型（contents配列）
export interface MicroCMSPhotoListResponse {
  contents: MicroCMSPhoto[];
  totalCount: number;
  offset: number;
  limit: number;
}
