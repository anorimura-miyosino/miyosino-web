import { BaseEntity } from '@/shared/types';

// メディアの種類
export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
  DOCUMENT = 'document',
}

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
