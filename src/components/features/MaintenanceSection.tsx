import { featuresSections } from './data';

const maintenanceData = {
  title: '継続的な修繕による建物の維持管理',
  description:
    'かわつる三芳野団地では、定期的な大規模修繕工事を実施し、建物の価値と快適性を長期的に維持しています。約10年ごとに計画的な修繕を行うことで、外観の美しさと機能性を保ち、資産価値の維持向上を図っています。',
  repairs: [
    {
      year: '1995年',
      number: '第1回',
      items: ['外壁・塗装'],
      description:
        '入居開始から13年後、初めての大規模修繕工事を実施。外壁の補修と塗装を行い、建物の外観を一新しました。',
    },
    {
      year: '2006年',
      number: '第2回',
      items: ['外壁・塗装'],
      description:
        '第1回修繕から11年後、2回目の大規模修繕工事を実施。外壁の劣化状況を点検し、必要な補修と塗装を実施しました。',
    },
    {
      year: '2012年',
      number: '第3回',
      items: ['外壁・塗装', '屋根の葺き替え'],
      description:
        '第2回修繕から6年後、3回目の大規模修繕工事を実施。外壁塗装に加え、屋根の葺き替えも実施し、建物の防水性能を向上させました。',
    },
    {
      year: '2025年',
      number: '第4回',
      items: ['外壁・塗装', '窓サッシ、ドア交換'],
      description:
        '第3回修繕から13年後、4回目の大規模修繕工事を実施予定。外壁塗装に加え、窓サッシとドアの交換により、断熱性能と防犯性能を大幅に向上させます。',
    },
  ],
  valueProposition:
    'このような継続的な修繕により、建物の資産価値が維持され、長期的な住環境の質が保証されています。計画的な修繕は、将来の大規模な改修費用を抑制し、管理組合の財務健全性にも寄与しています。',
};

export function MaintenanceSection() {
  const sectionMeta = featuresSections.find((s) => s.id === 'maintenance');

  if (!sectionMeta) {
    return null;
  }

  return (
    <section
      id={sectionMeta.id}
      className="bg-gray-50 py-24 sm:py-32 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-lg p-6 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-start gap-3">
              <span className="text-4xl">{sectionMeta.icon}</span>
              <span>{sectionMeta.title}</span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              {maintenanceData.description}
            </p>
          </div>
        </div>

        {/* 修繕履歴 */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
            <div className="flex items-center gap-x-3 mb-6">
              <div className="h-6 w-6 bg-blue-600 rounded"></div>
              <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                大規模修繕工事の履歴
              </h3>
            </div>

            <div className="flow-root">
              <ul role="list" className="-mb-8">
                {maintenanceData.repairs.map((repair, index) => (
                  <li key={index}>
                    <div className="relative pb-8">
                      {index !== maintenanceData.repairs.length - 1 ? (
                        <span
                          className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center ring-8 ring-white">
                            <div className="h-4 w-4 bg-white rounded"></div>
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div className="w-full">
                            <div className="flex items-center gap-3 mb-2">
                              <p className="text-sm font-medium text-gray-900">
                                {repair.year}
                              </p>
                              <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                                {repair.number}大規模修繕工事
                              </span>
                            </div>
                            <div className="mb-2">
                              <p className="text-sm font-semibold text-gray-900 mb-1">
                                実施内容：
                              </p>
                              <ul className="list-disc list-inside space-y-1">
                                {repair.items.map((item, itemIndex) => (
                                  <li
                                    key={itemIndex}
                                    className="text-sm text-gray-600"
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                              {repair.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* 資産価値の説明 */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="bg-green-50 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-green-600 rounded flex-shrink-0 mt-0.5"></div>
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 mb-2">
                      資産価値への影響
                    </h4>
                    <p className="text-sm leading-6 text-gray-700">
                      {maintenanceData.valueProposition}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
