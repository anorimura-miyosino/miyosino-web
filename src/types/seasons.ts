import { BaseEntity } from '@/shared/types';

// 四季データ
export interface Season extends BaseEntity {
  title: string; // タイトル（例: "🌸春"）
  description: string; // 説明文
  body: string; // リッチテキスト（HTML）
  order: number; // 表示順（0=春、1=夏、2=秋、3=冬）
  icon?: string; // アイコン（1行テキスト）
  image?: {
    url: string;
    width?: number;
    height?: number;
  };
}

// MicroCMS API用のSeason型定義
export interface MicroCMSSeason {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
  title: string; // タイトル（例: "🌸春"）
  description: string; // 説明文
  body: string; // リッチテキスト（HTML）
  order: number; // 表示順（0=春、1=夏、2=秋、3=冬）
  category: Array<{
    id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    revisedAt?: string;
    order?: number;
  }>;
  icon?: string; // アイコン（1行テキスト）
  image?: {
    url: string;
    width?: number;
    height?: number;
  };
}

// MicroCMSのレスポンス型（contents配列）
export interface MicroCMSSeasonListResponse {
  contents: MicroCMSSeason[];
  totalCount: number;
  offset: number;
  limit: number;
}
