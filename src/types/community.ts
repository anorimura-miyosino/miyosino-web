import { BaseEntity } from '@/shared/types';

// 住民サークルデータ
export interface ResidentCircle extends BaseEntity {
  name: string;
  category: string;
  body: string; // HTML（description、activities、members、meetingFrequency、contact、website、instagram、facebookを含む）
  icon?: string; // アイコン（1行テキスト）
}

// MicroCMS API用のResidentCircle型定義
export interface MicroCMSResidentCircle {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
  title?: string; // MicroCMSのタイトルフィールド
  name?: string; // 後方互換性のため
  body: string; // HTML（description、activities、members、meetingFrequency、contact、website、instagram、facebookを含む）
  icon?: string; // アイコン（1行テキスト）
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
export interface MicroCMSResidentCircleListResponse {
  contents: MicroCMSResidentCircle[];
  totalCount: number;
  offset: number;
  limit: number;
}

// 自治会活動データ
export interface CommunityActivity extends BaseEntity {
  title: string;
  body: string; // HTML（description、frequency、participantsを含む）
  icon?: string; // アイコン（1行テキスト）
  image?: {
    url: string;
    width?: number;
    height?: number;
  };
}

// MicroCMS API用のCommunityActivity型定義
export interface MicroCMSCommunityActivity {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
  title: string;
  body: string; // HTML（description、frequency、participantsを含む）
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
export interface MicroCMSCommunityActivityListResponse {
  contents: MicroCMSCommunityActivity[];
  totalCount: number;
  offset: number;
  limit: number;
}
