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

export interface GreenWellnessFile {
  id: string;
  title: string;
  description: string;
  orderNumber: number;
  file?: {
    name: string;
    fileKey: string;
    size?: string;
  };
}
