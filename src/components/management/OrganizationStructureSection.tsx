import { organizationStructureData, managementSections } from './data';

export function OrganizationStructureSection() {
  const data = organizationStructureData;
  const sectionMeta = managementSections[1];

  return (
    <section id={sectionMeta.id} className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-600 rounded-lg p-6 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-start gap-3">
              <span className="text-4xl">{sectionMeta.icon}</span>
              <span>{sectionMeta.title}</span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              {data.description}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-5xl space-y-12">
          {data.organizations.map((org, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {org.name}
                  </h3>
                  <p className="text-base text-gray-600 mt-1">
                    {org.description}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* 組織概要 */}
                <div className="border-l-4 border-green-600 pl-4">
                  <p className="text-base leading-7 text-gray-600">
                    {org.structure.overview}
                  </p>
                </div>

                {/* 組織構造 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      最高意思決定機関
                    </h4>
                    <p className="text-sm text-gray-600">
                      {org.structure.mainOrg}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      執行機関
                    </h4>
                    <p className="text-sm text-gray-600">
                      {org.structure.execOrg}
                    </p>
                  </div>
                </div>

                {/* 委員会 */}
                {org.structure.committees.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">委員会</h4>
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {org.structure.committees.map((committee, cIndex) => (
                        <li key={cIndex} className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm text-gray-600">
                            {committee}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 主な役割 */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">主な役割</h4>
                  <ul className="space-y-2">
                    {org.responsibilities.map((responsibility, rIndex) => (
                      <li key={rIndex} className="flex items-start gap-3">
                        <div className="h-2 w-2 bg-green-400 rounded-full flex-shrink-0 mt-2"></div>
                        <span className="text-sm leading-7 text-gray-600">
                          {responsibility}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          {/* 3つの組織の連携 */}
          <div className="rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 p-8 shadow-sm ring-1 ring-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {data.relationship.title}
            </h3>
            <p className="text-base leading-7 text-gray-600 mb-6">
              {data.relationship.description}
            </p>
            <ul className="space-y-4">
              {data.relationship.points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white font-semibold text-xs">
                      {index + 1}
                    </span>
                  </div>
                  <span className="text-base leading-7 text-gray-700">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
