'use client';

import {
  MemberAuthWrapper,
  MemberPageHeader,
  CircularsContent,
} from '@/components/member';

export default function CircularsPage() {
  return (
    <MemberAuthWrapper>
      <div className="min-h-screen bg-gray-50">
        <MemberPageHeader
          title="回覧板・配布資料"
          description="回覧板や配布資料を閲覧できます"
          gradientFrom="from-teal-600"
          gradientTo="to-teal-800"
          textColor="text-teal-100"
          hoverTextColor="hover:text-white"
        />
        <CircularsContent />
      </div>
    </MemberAuthWrapper>
  );
}
