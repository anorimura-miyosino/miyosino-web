'use client';

import CommonFacilitiesSection from './CommonFacilitiesSection';
import ServicesSection from './ServicesSection';

export default function FacilitiesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-20">
          <CommonFacilitiesSection />
          <ServicesSection />
        </div>
      </div>
    </section>
  );
}
