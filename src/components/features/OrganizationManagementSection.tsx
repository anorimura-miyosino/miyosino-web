// アイコンを削除してエラー回避
import Link from 'next/link';
import { featuresSections } from './data';

const organizationData = {
  mainOrganizations: {
    title: '4つの主要組織',
    description:
      '住民による自主管理で、管理組合・自治会・自主防災会・街区班の4つの組織を運営しています。それぞれが異なる役割を担いながら、協力して団地の運営を行っています。',
    organizations: [
      {
        name: '管理組合',
        description: '建物・設備の管理と運営',
        details: [
          '理事会',
          '事務局',
          '各種委員会（修繕、植栽、共用施設、広報、IT、財務）',
        ],
      },
      {
        name: '自治会',
        description: '地域コミュニティの運営とイベント実施',
        details: [
          '必要に応じて組織を編成し運営',
          'お祭りや餅つきなどの地域イベントの実施',
        ],
      },
      {
        name: '自主防災会',
        description: '災害時の安全確保と地域防災',
        details: [
          '必要に応じて組織を編成し運営',
          '防災訓練や有識者を招いての防災セミナーの開催',
        ],
      },
      {
        name: '街区班',
        description: '日常的な連絡とコミュニティ形成',
        details: ['近隣住民同士の連絡や助け合い', '情報共有の場として機能'],
      },
    ],
  },
};

export function OrganizationManagementSection() {
  const sectionMeta = featuresSections[1];

  return (
    <section
      id={sectionMeta.id}
      className="bg-gray-50 py-24 sm:py-32 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-green-600">
            {sectionMeta.subtitle}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {sectionMeta.title}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            団地では、住民自身が代表者（総会の議員）となり、民主的な意思決定を行う体制となっています。団地は、住民みんなで力を合わせて「良い団地」「良いコミュニティ」を作り、そこに住みたい理想のコミュニティを実現していく場所です。
          </p>
          <p className="mt-6">
            <Link
              href="/management"
              className="inline-flex items-center text-base font-semibold text-green-600 hover:text-green-700"
            >
              団地運営の詳細を見る
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </p>
        </div>

        {/* 4つの主要組織 */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
            <div className="flex items-center gap-x-3 mb-6">
              <div className="h-6 w-6 bg-green-600 rounded"></div>
              <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                {organizationData.mainOrganizations.title}
              </h3>
            </div>
            <p className="text-base leading-7 text-gray-600 mb-8">
              {organizationData.mainOrganizations.description}
            </p>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-4">
              {organizationData.mainOrganizations.organizations.map(
                (org, index) => (
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
                    <p className="text-sm text-gray-600 mb-4">
                      {org.description}
                    </p>
                    <div className="space-y-2">
                      {org.details.map((detail, detailIndex) => (
                        <div
                          key={detailIndex}
                          className="flex items-start gap-x-2"
                        >
                          <div className="h-3 w-3 bg-green-400 rounded-full flex-shrink-0 mt-1"></div>
                          <span className="text-xs text-gray-600">
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
