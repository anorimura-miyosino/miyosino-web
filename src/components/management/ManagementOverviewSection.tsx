import { managementOverviewData, managementSections } from './data';

export function ManagementOverviewSection() {
  const data = managementOverviewData;
  const sectionMeta = managementSections[0];

  return (
    <section id={sectionMeta.id} className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-600 rounded-lg p-6 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-start gap-3">
              <span className="text-4xl">{sectionMeta.icon}</span>
              <span>{sectionMeta.title}</span>
            </h2>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-4xl space-y-12">
          {/* イントロダクション */}
          <div className="rounded-2xl bg-gray-50 p-8">
            <p className="text-base leading-7 text-gray-600 whitespace-pre-line">
              {data.introduction.text[0]}
            </p>
          </div>

          {/* 自主管理方式 */}
          {data.selfManagement && (
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {data.selfManagement.title}
              </h3>
              <p className="text-base leading-7 text-gray-600 mb-6">
                {data.selfManagement.description}
              </p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {data.selfManagement.features.map((feature, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-6"
                  >
                    <h4 className="text-base font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h4>
                    <p className="text-sm leading-6 text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 法的根拠 */}
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {data.legalBasis.title}
            </h3>
            <p className="text-base leading-7 text-gray-600">
              {data.legalBasis.description}
            </p>
          </div>

          {/* 所有の仕組み */}
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              所有の仕組み
            </h3>
            <div className="space-y-6">
              {data.ownership.items.map((item, index) => (
                <div key={index} className="border-l-4 border-green-600 pl-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.type}
                  </h4>
                  <p className="text-base leading-7 text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 共用施設 */}
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {data.facilities.title}
            </h3>
            <p className="text-base leading-7 text-gray-600">
              {data.facilities.description}
            </p>
          </div>

          {/* 団地運営の3つの組織 */}
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {data.organizations.title}
            </h3>
            <p className="text-base leading-7 text-gray-600 mb-6">
              {data.organizations.description}
            </p>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {data.organizations.items.map((org, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex items-center gap-x-3 mb-4">
                    <div className="h-5 w-5 bg-green-600 rounded flex-shrink-0"></div>
                    <h4 className="text-base font-semibold text-gray-900">
                      {org.name}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 font-medium">
                    {org.description}
                  </p>
                  <p className="text-sm text-gray-600">{org.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
