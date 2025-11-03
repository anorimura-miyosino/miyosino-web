import { featuresSections } from './data';

const seasonsData = [
  {
    season: '春',
    icon: '🌸',
    description:
      '桜の花が咲き誇る春、団地内の緑が新緑に芽吹き、美しい花々が咲き始めます。住民の皆さんが花見を楽しみ、新しい生活の始まりを実感する季節です。',
    highlights: [
      '桜並木の開花時期には、住民同士が集まって花見を楽しむ光景が見られます',
      '新緑に包まれた団地内を散策するのに最適な季節',
      '春の訪れとともに、団地内の花壇にも色とりどりの花が咲き誇ります',
    ],
  },
  {
    season: '夏',
    icon: '🌻',
    description:
      '青々と茂る緑に囲まれ、子どもたちの笑い声が響き渡る夏。プールや公園では、家族連れや子どもたちがのびのびと過ごす姿が見られます。',
    highlights: [
      '団地内のプールでは、夏休み期間中に子どもたちが水遊びを楽しみます',
      '夏祭りなどの地域イベントが開催され、住民同士の交流が深まります',
      '緑豊かな環境が涼しさを提供し、心地よい生活環境を演出します',
    ],
  },
  {
    season: '秋',
    icon: '🍂',
    description:
      '紅葉が美しく色づく秋、団地内の木々が黄金色や真っ赤に染まります。さわやかな空気の中で、住民の皆さんが団地内を散策する姿が多く見られます。',
    highlights: [
      '団地内の樹木が紅葉し、美しい風景が広がります',
      '秋晴れの日には、団地内を散策する住民の姿が増えます',
      '収穫の季節を迎え、地域の交流イベントも開催されます',
    ],
  },
  {
    season: '冬',
    icon: '❄️',
    description:
      '静かに雪が降り積もる冬、団地は静寂に包まれながらも、住民の温かい交流で暖かさが感じられます。クリスマス会などのイベントで、コミュニティの絆が深まります。',
    highlights: [
      '雪が降ると、団地内が銀世界に変わり、美しい風景が広がります',
      'クリスマス会など、冬のイベントが開催され、住民同士の交流が深まります',
      '冬の静けさの中で、団地の落ち着いた雰囲気を味わえます',
    ],
  },
];

export function SeasonsSection() {
  const sectionMeta = featuresSections[2];

  return (
    <section
      id={sectionMeta.id}
      className="bg-white py-24 sm:py-32 scroll-mt-20"
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
            かわつる三芳野団地では、四季折々の表情をお楽しみいただけます。
            季節ごとの美しい風景と、住民の皆さんとの交流の様子をご紹介します。
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {seasonsData.map((season, index) => (
            <div
              key={index}
              className="flex flex-col items-start rounded-2xl bg-gradient-to-br from-gray-50 to-white p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl">{season.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {season.season}
                </h3>
              </div>
              <p className="text-base leading-7 text-gray-600 mb-6">
                {season.description}
              </p>
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900">
                  この季節の見どころ：
                </h4>
                <ul className="space-y-2">
                  {season.highlights.map((highlight, highlightIndex) => (
                    <li
                      key={highlightIndex}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="text-green-600 mt-1">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
