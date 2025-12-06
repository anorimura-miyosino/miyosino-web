export default function MinutesContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">議事録一覧</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  2024年度 組合総会 議事録
                </h3>
                <p className="text-gray-600 text-sm mt-1">2024年12月15日開催</p>
              </div>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                ダウンロード
              </button>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  2024年度 班長会 議事録
                </h3>
                <p className="text-gray-600 text-sm mt-1">2024年11月20日開催</p>
              </div>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                ダウンロード
              </button>
            </div>
          </div>
          <div className="text-center text-gray-500 py-8">
            <p>過去の議事録は順次追加予定です</p>
          </div>
        </div>
      </div>
    </div>
  );
}
