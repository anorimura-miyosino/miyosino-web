import { accessData } from './data';

export function TrainAccessSection() {
  return (
    <section id="train" className="bg-white py-16 sm:py-20 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-green-600">
            電車でのアクセス
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            東武東上線による鉄道アクセス
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            鶴ヶ島駅からバスで約7分の好立地。都心各所へのアクセスも便利です。
          </p>
        </div>

        {/* 電車アクセス詳細 */}
        <div className="mx-auto mt-16 max-w-2xl">
          <div className="rounded-2xl bg-green-50 p-8 shadow-sm ring-1 ring-green-200">
            <div className="flex items-center gap-x-3 mb-6">
              <div className="h-8 w-8 bg-green-600 rounded-lg flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold leading-8 tracking-tight text-gray-900">
                {accessData.train.title}
              </h3>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              {accessData.train.description}
            </p>

            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="text-center mb-4">
                <p className="text-2xl font-bold text-gray-900">
                  {accessData.train.station.name}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {accessData.train.station.line}{' '}
                  {accessData.train.station.exit}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-x-3">
                  <div className="h-5 w-5 bg-green-600 rounded flex items-center justify-center">
                    <svg
                      className="h-3 w-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">
                    {accessData.train.bus.route} {accessData.train.bus.time}
                  </span>
                </div>
                <div className="flex items-center gap-x-3">
                  <div className="h-5 w-5 bg-green-600 rounded flex items-center justify-center">
                    <svg
                      className="h-3 w-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700">
                    {accessData.train.bus.stop}
                  </span>
                </div>
              </div>

              {/* バス時刻表リンク */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <a
                  href="https://transfer-cloud.navitime.biz/tobubus/courses/timetables?busstop=00311020&external-destination=011"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full gap-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>バス時刻表を見る（東武バス）</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 都心へのアクセス時間 */}
        <div className="mx-auto mt-16 max-w-4xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">
            鶴ヶ島駅から都心各所へのアクセス時間
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {accessData.train.toCity.map((route, index) => (
              <div
                key={index}
                className="rounded-lg bg-gray-50 p-6 text-center hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-center gap-x-2 mb-2">
                  <div className="h-4 w-4 bg-green-600 rounded"></div>
                  <span className="text-lg font-semibold text-gray-900">
                    {route.destination}
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-600 mb-1">
                  {route.time}
                </p>
                <p className="text-xs text-gray-600">{route.route}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
