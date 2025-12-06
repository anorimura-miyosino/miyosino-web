'use client';

import {
  MemberAuthWrapper,
  MemberPageHeader,
  MinutesContent,
} from '@/components/member';

export default function MinutesPage() {
  return (
    <MemberAuthWrapper>
      <div className="min-h-screen bg-gray-50">
        <MemberPageHeader
          title="議事録ダウンロード"
          description="総会や班長会の議事録をダウンロードできます"
          gradientFrom="from-indigo-600"
          gradientTo="to-indigo-800"
          textColor="text-indigo-100"
          hoverTextColor="hover:text-white"
        />
        <MinutesContent />
      </div>
    </MemberAuthWrapper>
  );
}
