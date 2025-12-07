export interface Announcement {
  id: string;
  title: string;
  description: string;
  importance: 1 | 2 | 3; // 1: 必ず目を通す、2: 全員に目を通してほしい、3: 任意で目を通してほしい
  date: Date; // お知らせの発信日
  publish?: string; // 公開フラグ: "公開" | "準備中"
  destination?: string; // 通知先（オプション）
  attachment?: Array<{
    name: string;
    url?: string; // 旧形式との互換性のためオプション
    fileKey?: string; // ファイルキー（新形式）
  }>; // 添付ファイル（オプション）
}

// 重要度に応じたボーダーカラーを取得する関数
export function getPriorityBorderColor(priority: 1 | 2 | 3): string {
  switch (priority) {
    case 1:
      return 'border-red-600'; // 最重要：赤
    case 2:
      return 'border-orange-500'; // 重要：オレンジ
    case 3:
      return 'border-blue-500'; // 通常：青
    default:
      return 'border-gray-400';
  }
}

export const announcements: Announcement[] = [
  {
    id: 'announcement-2024-12',
    title: '2025年12月 - 組合総会のご案内',
    description:
      '2025年12月15日（日）に組合総会を開催いたします。詳細は後日お知らせいたします。',
    importance: 1, // 組合総会は必ず目を通す必要がある
    date: new Date('2025-12-01'),
  },
  {
    id: 'announcement-2024-11',
    title: '2025年11月 - 駐車場管理について',
    description:
      '駐車場の管理方法について、新しいルールが制定されました。詳細は管理組合事務所までお問い合わせください。',
    importance: 2, // 全員に目を通してほしい
    date: new Date('2025-11-21'),
  },
];
