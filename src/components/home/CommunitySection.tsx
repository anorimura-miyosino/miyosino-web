export default function CommunitySection() {
  const features = [
    {
      title: '緑豊かな環境',
      description: '自然に囲まれた住環境で、家族の健康をサポートします。',
      icon: '🌳',
    },
    {
      title: '充実した遊び場',
      description: '子供たちが安全に遊べる公園や遊具が充実しています。',
      icon: '🎠',
    },
    {
      title: 'モダンな住空間',
      description: '快適で機能的な間取りで、家族の暮らしをサポートします。',
      icon: '🏠',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            活気あふれるコミュニティ
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            かわつる三芳野団地は、ただ住む場所ではありません。
            <br />
            家族がつながり、成長し、思い出を育む場所です。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
            >
              <div className="text-6xl mb-6 text-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* 追加のCTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-700 mb-6">
            もっと詳しく知りたい方は、各セクションをご覧ください
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/features"
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
            >
              団地の特長を見る
            </a>
            <a
              href="/family"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
            >
              ファミリー向け情報
            </a>
            <a
              href="/community"
              className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors duration-200"
            >
              コミュニティ活動
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
