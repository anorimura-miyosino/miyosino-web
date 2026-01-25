'use client';

import {
  ManagementOverviewSection,
  OrganizationStructureSection,
  OrganizationCompositionSection,
  TableOfContents,
} from '@/components/management';
import { MemberAuthWrapper, MemberPageHeader } from '@/components/member';

export default function ManagementPage() {
  return (
    <MemberAuthWrapper>
      <div className="min-h-screen bg-gray-50">
        <MemberPageHeader
          title="団地運営のご案内"
          description="かわつる三芳野団地における団地運営の全体像から管理組合のしくみまでご紹介します"
          gradientFrom="from-green-600"
          gradientTo="to-green-800"
          textColor="text-green-100"
          hoverTextColor="hover:text-white"
        />

        <TableOfContents />

        <ManagementOverviewSection />
        <OrganizationStructureSection />
        <OrganizationCompositionSection />
      </div>
    </MemberAuthWrapper>
  );
}
