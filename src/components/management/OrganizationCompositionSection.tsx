import { organizationCompositionData, managementSections } from './data';

export function OrganizationCompositionSection() {
  const data = organizationCompositionData;
  const sectionMeta = managementSections[2];

  return (
    <section id={sectionMeta.id} className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-green-600">
            {sectionMeta.subtitle}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {sectionMeta.title}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {data.description}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl space-y-16">
          {data.organizations.map((org, orgIndex) => (
            <div key={orgIndex} className="space-y-12">
              {/* 組織名 */}
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {org.name}
                </h3>
                <div className="h-1 w-24 bg-green-600 mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 構成 */}
                <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                  <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">構成</span>
                    </div>
                    {org.name}の構成
                  </h4>

                  <div className="space-y-8">
                    {/* 概要 */}
                    <div className="border-l-4 border-blue-500 pl-4">
                      <p className="text-base leading-7 text-gray-600">
                        {org.composition.overview}
                      </p>
                    </div>

                    {/* 組織構造図 */}
                    <div className="space-y-6">
                      {/* 最高意思決定機関 */}
                      <div className="relative">
                        <div className="rounded-xl border-2 border-green-600 bg-green-50 p-6 shadow-md">
                          <div className="text-center mb-4">
                            <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg">
                              <p className="text-xs font-semibold mb-1">
                                最高意思決定機関
                              </p>
                              <h5 className="text-lg font-bold">
                                {org.composition.mainOrg.title}
                              </h5>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 text-center mb-4">
                            {org.composition.mainOrg.description}
                          </p>
                          <div className="border-t border-green-300 pt-4">
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {org.composition.mainOrg.responsibilities.map(
                                (item, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start gap-2 text-xs text-gray-700"
                                  >
                                    <div className="h-1.5 w-1.5 bg-green-500 rounded-full flex-shrink-0 mt-1.5"></div>
                                    <span>{item}</span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                        {/* 矢印 */}
                        {org.composition.execOrg && (
                          <div className="flex justify-center my-2">
                            <div className="h-6 w-0.5 bg-blue-600"></div>
                          </div>
                        )}
                      </div>

                      {/* 執行機関 */}
                      {org.composition.execOrg && (
                        <div className="relative">
                          <div className="rounded-xl border-2 border-blue-600 bg-blue-50 p-6 shadow-md">
                            <div className="text-center mb-4">
                              <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg">
                                <p className="text-xs font-semibold mb-1">
                                  執行機関
                                </p>
                                <h5 className="text-lg font-bold">
                                  {org.composition.execOrg.title}
                                </h5>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 text-center mb-4">
                              {org.composition.execOrg.description}
                            </p>
                            <div className="border-t border-blue-300 pt-4">
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {org.composition.execOrg.responsibilities.map(
                                  (item, index) => (
                                    <li
                                      key={index}
                                      className="flex items-start gap-2 text-xs text-gray-700"
                                    >
                                      <div className="h-1.5 w-1.5 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"></div>
                                      <span>{item}</span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                          {/* 矢印 */}
                          {(org.composition.officers.length > 0 ||
                            org.composition.committees.length > 0) && (
                            <div className="flex justify-center my-2">
                              <div className="h-6 w-0.5 bg-purple-600"></div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* 役員と委員会・関連団体（並列表示） */}
                      {(org.composition.officers.length > 0 ||
                        org.composition.committees.length > 0 ||
                        (org.composition.specialCommittees &&
                          org.composition.specialCommittees.all &&
                          org.composition.specialCommittees.all.length >
                            0)) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* 役員 */}
                          {org.composition.officers.length > 0 && (
                            <div className="rounded-xl border-2 border-purple-600 bg-purple-50 p-6 shadow-md">
                              <div className="mb-4">
                                <div className="inline-block bg-purple-600 text-white px-3 py-1.5 rounded-lg mb-3">
                                  <p className="text-xs font-semibold">役員</p>
                                </div>
                              </div>
                              <div className="space-y-3">
                                {org.composition.officers.map(
                                  (officer, index) => (
                                    <div
                                      key={index}
                                      className="bg-white rounded-lg p-3 border-l-4 border-purple-500"
                                    >
                                      <p className="text-sm font-semibold text-gray-900 mb-1">
                                        {officer.title}
                                      </p>
                                      <p className="text-xs text-gray-600">
                                        {officer.description}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                          {/* 委員会または関連団体（自治会の場合は関連団体、それ以外は委員会） */}
                          {org.name === '自治会' &&
                          org.composition.specialCommittees &&
                          org.composition.specialCommittees.all &&
                          org.composition.specialCommittees.all.length > 0 ? (
                            // 自治会の場合：関連団体を右側に表示
                            <div className="rounded-xl border-2 border-teal-600 bg-teal-50 p-6 shadow-md">
                              <div className="mb-4">
                                <div className="inline-block bg-teal-600 text-white px-3 py-1.5 rounded-lg mb-3">
                                  <p className="text-xs font-semibold">
                                    協力団体
                                  </p>
                                </div>
                              </div>

                              {/* 説明文 */}
                              {org.composition.specialCommittees
                                .description && (
                                <div className="mb-4 border-l-4 border-teal-500 pl-4">
                                  <p className="text-xs leading-6 text-gray-700">
                                    {
                                      org.composition.specialCommittees
                                        .description
                                    }
                                  </p>
                                </div>
                              )}

                              {/* カテゴリごとの表示 */}
                              {org.composition.specialCommittees.categories &&
                                org.composition.specialCommittees.categories
                                  .length > 0 && (
                                  <div className="space-y-3">
                                    {org.composition.specialCommittees.categories.map(
                                      (category, catIndex) => (
                                        <div
                                          key={catIndex}
                                          className="space-y-2"
                                        >
                                          <h6 className="text-xs font-semibold text-gray-900">
                                            {category.title}
                                          </h6>
                                          <ul className="grid grid-cols-1 gap-1.5">
                                            {category.items.map(
                                              (item, itemIndex) => (
                                                <li
                                                  key={itemIndex}
                                                  className="bg-white rounded-lg p-2 border-l-4 border-teal-500 flex items-center gap-2"
                                                >
                                                  <div className="h-1.5 w-1.5 bg-teal-500 rounded-full"></div>
                                                  <span className="text-xs text-gray-700">
                                                    {item}
                                                  </span>
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                            </div>
                          ) : (
                            // その他の組織の場合：委員会を表示
                            org.composition.committees.length > 0 && (
                              <div className="rounded-xl border-2 border-orange-600 bg-orange-50 p-6 shadow-md">
                                <div className="mb-4">
                                  <div className="inline-block bg-orange-600 text-white px-3 py-1.5 rounded-lg mb-3">
                                    <p className="text-xs font-semibold">
                                      委員会
                                    </p>
                                  </div>
                                </div>
                                <ul className="grid grid-cols-1 gap-2">
                                  {org.composition.committees.map(
                                    (committee, index) => (
                                      <li
                                        key={index}
                                        className="bg-white rounded-lg p-3 border-l-4 border-orange-500 flex items-center gap-2"
                                      >
                                        <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                                        <span className="text-sm text-gray-700">
                                          {committee}
                                        </span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 業務 */}
                <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                  <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="h-8 w-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">業務</span>
                    </div>
                    {org.name}の業務
                  </h4>

                  <div className="space-y-6">
                    {org.business.sections.map((section, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-green-500 pl-4"
                      >
                        <h5 className="font-semibold text-gray-900 mb-2 text-sm">
                          {section.title}
                        </h5>
                        <ul className="space-y-2">
                          {section.content.map((content, cIndex) => (
                            <li
                              key={cIndex}
                              className="flex items-start gap-2 text-xs text-gray-600"
                            >
                              <div className="h-1.5 w-1.5 bg-green-400 rounded-full flex-shrink-0 mt-1.5"></div>
                              <span>{content}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 理事の担当業務（管理組合のみ） */}
              {org.directorDuties && (
                <div className="rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 p-8 shadow-sm ring-1 ring-gray-200">
                  <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">担当</span>
                    </div>
                    {org.directorDuties.title}
                  </h4>
                  <p className="text-base leading-7 text-gray-600 mb-6">
                    {org.directorDuties.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {org.directorDuties.roles.map((role, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg p-6 shadow-sm"
                      >
                        <h5 className="font-semibold text-gray-900 mb-4 text-base">
                          {role.role}
                        </h5>
                        <ul className="space-y-2">
                          {role.duties.map((duty, dIndex) => (
                            <li
                              key={dIndex}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <div className="h-2 w-2 bg-purple-400 rounded-full flex-shrink-0 mt-1.5"></div>
                              <span>{duty}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
