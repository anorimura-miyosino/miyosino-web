'use client';

import { surroundingCategories, nearbyFacilities } from './data2';

export function TableOfContents() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // ヘッダーの高さ分オフセット
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // データがあるカテゴリのみをフィルタリング
  const categoriesWithData = surroundingCategories.filter((category) => {
    const categoryData =
      nearbyFacilities[category.id as keyof typeof nearbyFacilities];
    return Array.isArray(categoryData) && categoryData.length > 0;
  });

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-14 lg:top-16 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start sm:justify-center gap-4 sm:gap-8 py-4 overflow-x-auto">
          {categoriesWithData.map((category) => (
            <button
              key={category.id}
              onClick={() => scrollToSection(category.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-green-600 transition-colors duration-200 whitespace-nowrap flex-shrink-0"
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
