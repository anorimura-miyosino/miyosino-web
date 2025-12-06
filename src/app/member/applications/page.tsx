'use client';

import {
  MemberAuthWrapper,
  MemberPageHeader,
  ApplicationsContent,
} from '@/components/member';

export default function ApplicationsPage() {
  return (
    <MemberAuthWrapper>
      <div className="min-h-screen bg-gray-50">
        <MemberPageHeader
          title="各種申請"
          description="各種申請書の提出やダウンロードができます"
          gradientFrom="from-orange-600"
          gradientTo="to-orange-800"
          textColor="text-orange-100"
          hoverTextColor="hover:text-white"
        />
        <ApplicationsContent />
      </div>
    </MemberAuthWrapper>
  );
}
