'use client';

import {
  MemberAuthWrapper,
  MemberPageHeader,
  AnnouncementsContent,
} from '@/components/member';

export default function AnnouncementsPage() {
  return (
    <MemberAuthWrapper>
      <div className="min-h-screen bg-gray-50">
        <MemberPageHeader
          title="お知らせ一覧"
          description="組合員向けのお知らせを全て確認できます"
          gradientFrom="from-blue-600"
          gradientTo="to-blue-800"
          textColor="text-blue-100"
          hoverTextColor="hover:text-white"
        />
        <AnnouncementsContent />
      </div>
    </MemberAuthWrapper>
  );
}
