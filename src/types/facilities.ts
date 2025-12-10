import { BaseEntity } from '@/shared/types';

// 共用施設データ
export interface CommonFacility extends BaseEntity {
  title: string;
  description: string;
  body: string; // HTML（features、capacity、reservationを含む）
  icon?: string; // アイコン（1行テキスト）
  image?: {
    url: string;
    width?: number;
    height?: number;
  };
}

// MicroCMS API用のCommonFacility型定義
export interface MicroCMSCommonFacility {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
  title: string;
  description: string;
  body: string; // HTML（features、capacity、reservationを含む）
  icon?: string; // アイコン（1行テキスト）
  image?: {
    url: string;
    width?: number;
    height?: number;
  };
  category?: Array<{
    id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    revisedAt?: string;
    order?: number;
  }>;
}

// MicroCMSのレスポンス型（contents配列）
export interface MicroCMSCommonFacilityListResponse {
  contents: MicroCMSCommonFacility[];
  totalCount: number;
  offset: number;
  limit: number;
}

// サービスデータ
export interface Service extends BaseEntity {
  title: string;
  description: string;
  body: string; // HTML（features、capacity、reservation、feeを含む）
  icon?: string; // アイコン（1行テキスト）
  image?: {
    url: string;
    width?: number;
    height?: number;
  };
}

// MicroCMS API用のService型定義
export interface MicroCMSService {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
  title: string;
  description: string;
  body: string; // HTML（features、capacity、reservation、feeを含む）
  icon?: string; // アイコン（1行テキスト）
  image?: {
    url: string;
    width?: number;
    height?: number;
  };
  category?: Array<{
    id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    revisedAt?: string;
    order?: number;
  }>;
}

// MicroCMSのレスポンス型（contents配列）
export interface MicroCMSServiceListResponse {
  contents: MicroCMSService[];
  totalCount: number;
  offset: number;
  limit: number;
}
