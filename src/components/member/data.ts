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

// 重要度に応じたバッジのスタイルを取得する関数
export function getPriorityBadgeStyle(priority: 1 | 2 | 3): string {
  switch (priority) {
    case 1:
      return 'bg-red-100 text-red-800'; // 最重要：赤
    case 2:
      return 'bg-orange-100 text-orange-800'; // 重要：オレンジ
    case 3:
      return 'bg-blue-100 text-blue-800'; // 通常：青
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

// 重要度のテキストを取得する関数
export function getPriorityText(priority: 1 | 2 | 3): string {
  switch (priority) {
    case 1:
      return '重要';
    case 2:
      return '推奨';
    case 3:
      return '任意';
    default:
      return '';
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
