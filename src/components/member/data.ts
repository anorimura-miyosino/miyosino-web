export interface Announcement {
  title: string;
  description: string;
  borderColor: string;
}

export const announcements: Announcement[] = [
  {
    title: '2024年12月 - 組合総会のご案内',
    description:
      '2024年12月15日（日）に組合総会を開催いたします。詳細は後日お知らせいたします。',
    borderColor: 'border-blue-500',
  },
  {
    title: '2024年11月 - 駐車場管理について',
    description:
      '駐車場の管理方法について、新しいルールが制定されました。詳細は管理組合事務所までお問い合わせください。',
    borderColor: 'border-green-600',
  },
];

