export default function GreenWellnessContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          ダウンロード資料
        </h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  グリーンウェルネス（管理規約）
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  最新版（2024年改定）
                </p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                ダウンロード
              </button>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  グリーンウェルネス（管理規約）改定履歴
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  過去の改定内容を確認できます
                </p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                ダウンロード
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
