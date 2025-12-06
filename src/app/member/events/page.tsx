'use client';

import {
  MemberAuthWrapper,
  MemberPageHeader,
  EventsContent,
} from '@/components/member';

export default function EventsPage() {
  return (
    <MemberAuthWrapper>
      <div className="min-h-screen bg-gray-50">
        <MemberPageHeader
          title="イベント予定"
          description="団地内のイベントスケジュールを確認できます"
          gradientFrom="from-purple-600"
          gradientTo="to-purple-800"
          textColor="text-purple-100"
          hoverTextColor="hover:text-white"
        />
        <EventsContent />
      </div>
    </MemberAuthWrapper>
  );
}
