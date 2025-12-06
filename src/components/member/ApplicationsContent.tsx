export default function ApplicationsContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            申請書ダウンロード
          </h2>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-gray-900">駐車場使用申請書</span>
                <button className="bg-orange-600 text-white px-3 py-1 rounded-lg hover:bg-orange-700 transition-colors text-sm">
                  ダウンロード
                </button>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-gray-900">集会所使用申請書</span>
                <button className="bg-orange-600 text-white px-3 py-1 rounded-lg hover:bg-orange-700 transition-colors text-sm">
                  ダウンロード
                </button>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-gray-900">その他申請書</span>
                <button className="bg-orange-600 text-white px-3 py-1 rounded-lg hover:bg-orange-700 transition-colors text-sm">
                  ダウンロード
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">申請書提出</h2>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-gray-900">オンライン申請</span>
                <button className="bg-orange-600 text-white px-3 py-1 rounded-lg hover:bg-orange-700 transition-colors text-sm">
                  申請する
                </button>
              </div>
            </div>
            <div className="text-gray-600 text-sm mt-4 p-3 bg-gray-50 rounded-lg">
              <p>
                申請書をダウンロードして記入後、管理組合事務所までご提出ください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
