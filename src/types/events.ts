import { BaseEntity } from '@/shared/types';

// イベントデータ
export interface Event extends BaseEntity {
  title: string; // イベント名（文字列）
  startDateTime: string; // 開催予定日時（ISO 8601形式: YYYY-MM-DDTHH:mm:ss）
  endDateTime?: string; // 終了予定日時（ISO 8601形式: YYYY-MM-DDTHH:mm:ss）
  venue: string; // 開催場所（プルダウン）
  owner: string; // 主催者（組織選択）
  category?: string; // カテゴリ（プルダウン）
  description: string; // 説明（HTML）
}
