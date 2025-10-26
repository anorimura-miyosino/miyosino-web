// アイコンを削除してエラー回避

const historyData = [
  {
    year: '1982年',
    event: '入居開始・管理組合設立',
    description:
      '昭和57年8月25日に入居開始。かわつる地区で最初の分譲団地として、住民による自主管理体制でスタートしました。',
  },
  {
    year: '1984年',
    event: '完全自主管理体制確立',
    description:
      '管理組合法人化により「かわつる三芳野団地管理組合法人」に名称変更。完全自主管理体制を確立し、窓口業務・環境整備を組合員が担当。',
  },
  {
    year: '1985年',
    event: '自治会設立',
    description:
      '管理組合と自治会を分離し、住民活動の充実を図りました。夏まつり、文化祭、バザーなどのイベントが自治会主催で実施されるようになりました。',
  },
  {
    year: '1987年',
    event: 'ペット飼育指針制定',
    description:
      'ペットの飼育指針を発表し、団地内でのペット飼育を正式に認めました。現在もペットクラブが活動を続けています。',
  },
  {
    year: '1995年',
    event: '大規模修繕工事実施',
    description:
      '建物の大規模修繕工事を実施し、住環境を大幅に向上させました。外壁塗装、屋根防水、設備更新などを含む総合的な改修を行いました。',
  },
  {
    year: '2000年',
    event: 'NHK全国放送',
    description:
      '当団地の管理組合運営状況がNHKニュース10で全国放送され、住民自治による団地運営のモデルケースとして紹介されました。',
  },
  {
    year: '2025年',
    event: '3回目の大規模修繕工事実施',
    description:
      '外壁塗装、屋根防水、窓サッシ等の設備更新などを含む総合的な改修を行いました。',
  },
];

export function HistorySection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-green-600">
            歴史
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            団地のあゆみ
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            昭和57年の入居開始から現在までの歩みをご紹介します。
          </p>
        </div>

        {/* 団地のあゆみ */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {historyData.map((item, index) => (
                <li key={index}>
                  <div className="relative pb-8">
                    {index !== historyData.length - 1 ? (
                      <span
                        className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center ring-8 ring-white">
                          <div className="h-4 w-4 bg-white rounded"></div>
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">
                              {item.year}
                            </span>
                          </p>
                          <p className="text-sm font-semibold text-gray-900 mt-1">
                            {item.event}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
