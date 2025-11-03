import { organizationChartData, managementSections } from './data';

export function OrganizationChartSection() {
  const data = organizationChartData;
  const sectionMeta = managementSections[2];

  return (
    <section id={sectionMeta.id} className="bg-white py-24 sm:py-32">
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

        <div className="mx-auto mt-16 max-w-5xl">
          {/* 組織図の階層構造 */}
          <div className="space-y-8">
            {/* 総会 */}
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
              <div className="text-center mb-6">
                <div className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg">
                  <h3 className="text-xl font-bold">
                    {data.structure.totalMeeting.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  {data.structure.totalMeeting.description}
                </p>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                {data.structure.totalMeeting.responsibilities.map(
                  (item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-2 w-2 bg-green-400 rounded-full flex-shrink-0 mt-2"></div>
                      <span className="text-sm text-gray-600">{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* 矢印 */}
            <div className="flex justify-center">
              <div className="h-8 w-0.5 bg-green-600"></div>
            </div>

            {/* 理事会 */}
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
              <div className="text-center mb-6">
                <div className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg">
                  <h3 className="text-xl font-bold">
                    {data.structure.board.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  {data.structure.board.description}
                </p>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                {data.structure.board.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-2 w-2 bg-blue-400 rounded-full flex-shrink-0 mt-2"></div>
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 矢印 */}
            <div className="flex justify-center">
              <div className="h-8 w-0.5 bg-blue-600"></div>
            </div>

            {/* 役員と委員会 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 役員 */}
              <div className="space-y-4">
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    役員
                  </h4>
                  <div className="space-y-4">
                    {/* 理事長 */}
                    <div className="border-l-4 border-green-500 pl-4">
                      <h5 className="font-semibold text-gray-900">
                        {data.structure.chairman.title}
                      </h5>
                      <p className="text-xs text-gray-600 mt-1">
                        {data.structure.chairman.description}
                      </p>
                    </div>
                    {/* 副理事長 */}
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h5 className="font-semibold text-gray-900">
                        {data.structure.viceChairman.title}
                      </h5>
                      <p className="text-xs text-gray-600 mt-1">
                        {data.structure.viceChairman.description}
                      </p>
                    </div>
                    {/* 常任理事（事務局長兼任） */}
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h5 className="font-semibold text-gray-900">
                        {data.structure.accountant.title}
                      </h5>
                      <p className="text-xs text-gray-600 mt-1">
                        {data.structure.accountant.description}
                      </p>
                    </div>
                    {/* 監事 */}
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h5 className="font-semibold text-gray-900">
                        {data.structure.auditor.title}
                      </h5>
                      <p className="text-xs text-gray-600 mt-1">
                        {data.structure.auditor.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 委員会 */}
              <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  {data.structure.committees.title}
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  {data.structure.committees.description}
                </p>
                <ul className="grid grid-cols-2 gap-2">
                  {data.structure.committees.types.map((type, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">{type}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
