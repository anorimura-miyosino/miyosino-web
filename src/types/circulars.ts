import { BaseEntity } from '@/shared/types';

// 資料データ
export interface Circular extends BaseEntity {
  title: string; // タイトル（文字列、1行）
  distributionDate: string; // 配布日（日付、YYYY-MM-DD形式）
  category: string; // カテゴリ（ドロップダウン）
  file?: {
    url: string;
    name?: string;
    contentType?: string;
    size?: number;
    fileKey?: string; // Kintoneのファイルキー（ダウンロード用）
  }; // ファイル（添付ファイル）
  distributor: string; // 配布元（文字列、1行）
}

// MicroCMS API用のCircular型定義
export interface MicroCMSCircular {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
  title: string;
  distributionDate: string; // YYYY-MM-DD形式
  category: string;
  file?: {
    url: string;
    name?: string;
    contentType?: string;
    size?: number;
  };
  distributor: string;
}

// MicroCMSのレスポンス型（contents配列）
export interface MicroCMSCircularListResponse {
  contents: MicroCMSCircular[];
  totalCount: number;
  offset: number;
  limit: number;
}
