export default function IntroductionSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-800 leading-relaxed space-y-6">
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed text-center mb-8">
              かわつる三芳野団地のホームページです。
            </p>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-l-4 border-green-700 rounded-r-lg p-8 md:p-10 shadow-lg my-8">
              <p className="text-lg md:text-xl font-medium text-gray-900 leading-relaxed mb-6">
                かわつる三芳野団地は都心から40km圏、小江戸と呼ばれる川越市の最西端に位置し、
                東武東上線の鶴ヶ島駅から南西約2kmのところ、緑陰豊かな「けやき通り」をはさんで、鶴ヶ島市とも接しています。
              </p>
              <p className="text-lg md:text-xl font-medium text-gray-900 leading-relaxed">
                この地区は1980年代から、都市基盤整備公団が「むさし緑園都市」として開発した地域で、
                今でも武蔵野の面影を残す一帯は「かわつるグリーンタウン」の愛称で親しまれています。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
