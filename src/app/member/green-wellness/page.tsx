'use client';

import {
  MemberAuthWrapper,
  MemberPageHeader,
  GreenWellnessContent,
} from '@/components/member';

export default function GreenWellnessPage() {
  return (
    <MemberAuthWrapper>
      <div className="min-h-screen bg-gray-50">
        <MemberPageHeader
          title="グリーンウェルネス（管理規約）"
          description="グリーンウェルネスをダウンロードできます"
          gradientFrom="from-blue-600"
          gradientTo="to-blue-800"
          textColor="text-blue-100"
          hoverTextColor="hover:text-white"
        />
        <GreenWellnessContent />
      </div>
    </MemberAuthWrapper>
  );
}
