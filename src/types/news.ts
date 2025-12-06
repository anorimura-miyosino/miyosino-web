import { BaseEntity } from '@/shared/types';

// お知らせデータ
export interface News extends BaseEntity {
  title: string;
  date: string; // YYYY-MM-DD形式
  category: string[]; // 複数のカテゴリに対応
  excerpt: string;
  content: string;
  isImportant: boolean;
}

// MicroCMS API用のNews型定義
export interface MicroCMSNews {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
  title: string;
  date: string; // YYYY-MM-DD形式
  category: Array<{
    id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    revisedAt?: string;
    order?: number;
  }>;
  excerpt?: string;
  description?: string; // excerptの代わりにdescriptionが使われている可能性
  body?: string; // contentの代わりにbodyが使われている可能性
  content?: string;
  isImportant?: boolean;
  icon?: string; // アイコン（1行テキスト）
}

// MicroCMSのレスポンス型（contents配列）
export interface MicroCMSNewsListResponse {
  contents: MicroCMSNews[];
  totalCount: number;
  offset: number;
  limit: number;
}
