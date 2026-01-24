'use client';

import {
  ManagementOverviewSection,
  OrganizationStructureSection,
  OrganizationCompositionSection,
  TableOfContents,
} from '@/components/management';
import { MemberAuthWrapper } from '@/components/member';

export default function ManagementPage() {
  return (
    <MemberAuthWrapper>
      <div className="min-h-screen bg-gray-50">
        {/* ヒーローセクション */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              団地運営のご案内
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              かわつる三芳野団地における団地運営の全体像から管理組合のしくみまでご紹介します
            </p>
          </div>
        </section>

        <TableOfContents />

        <ManagementOverviewSection />
        <OrganizationStructureSection />
        <OrganizationCompositionSection />
      </div>
    </MemberAuthWrapper>
  );
}
