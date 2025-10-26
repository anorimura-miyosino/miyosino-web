import { accessData } from './data';

export function CarAccessSection() {
  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            車でのアクセス
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            高速道路による車アクセス
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            関越道・圏央道から約10分の好立地。駐車場も完備しています。
          </p>
        </div>

        {/* 車アクセス詳細 */}
        <div className="mx-auto mt-16 max-w-2xl">
          <div className="rounded-2xl bg-blue-50 p-8 shadow-sm ring-1 ring-blue-200">
            <div className="flex items-center gap-x-3 mb-6">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold leading-8 tracking-tight text-gray-900">
                {accessData.car.title}
              </h3>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              {accessData.car.description}
            </p>

            {/* 高速道路アクセス詳細 */}
            <div className="space-y-6 mb-6">
              {accessData.car.highways.map((highway, index) => (
                <div key={index} className="bg-white rounded-lg p-6">
                  <div className="text-center mb-4">
                    <p className="text-xl font-bold text-gray-900">
                      {highway.name}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {highway.route}から車で{highway.time}
                    </p>
                  </div>

                  {/* 行き先情報 */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">
                      各地へのアクセス
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {highway.destinations.map((dest, destIndex) => (
                        <div
                          key={destIndex}
                          className="text-center p-3 bg-gray-50 rounded-lg"
                        >
                          <p className="text-sm font-medium text-gray-900">
                            {dest.area}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {dest.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 駐車場情報 */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-8 text-center">
              駐車場・駐輪場完備
            </h3>

            {/* 駐車場概要 */}
            <div className="mb-8">
              <h4 className="text-base font-semibold text-gray-900 mb-4 text-center">
                駐車場概要
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">住民用共用駐車場</p>
                  <p className="text-lg font-semibold text-gray-900">
                    387台（月極有料）
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">日中用来客駐車場</p>
                  <p className="text-lg font-semibold text-gray-900">
                    5台（無料・届出制）
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">宿泊用来客駐車場</p>
                  <p className="text-lg font-semibold text-gray-900">
                    5台（有料・届出制）
                  </p>
                </div>
              </div>
            </div>

            {/* 料金詳細 */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-base font-semibold text-gray-900 mb-4">
                  駐車場料金
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      住民用共用駐車場
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      {accessData.car.parking.residentFee}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      宿泊用来客駐車場
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      {accessData.car.parking.nightVisitorFee}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      来客用駐車場は届出制です。日中用来客駐車場は無料です。
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-base font-semibold text-gray-900 mb-4">
                  駐輪場料金
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">自転車</span>
                    <span className="text-lg font-semibold text-gray-900">
                      500円/年
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      オートバイ（50CC未満）
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      1,000円/年
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      オートバイ（50CC以上）
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      2,000円/年
                    </span>
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
