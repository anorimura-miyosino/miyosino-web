export default function CircularsContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">回覧板</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  2024年12月 回覧板
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  組合総会のご案内、駐車場管理について
                </p>
              </div>
              <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                閲覧
              </button>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  2024年11月 回覧板
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  駐車場管理について、イベントのお知らせ
                </p>
              </div>
              <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                閲覧
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">戸別配布資料</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  管理規約の改定について
                </h3>
                <p className="text-gray-600 text-sm mt-1">2024年12月配布</p>
              </div>
              <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                閲覧
              </button>
            </div>
          </div>
          <div className="text-center text-gray-500 py-8">
            <p>過去の資料は順次追加予定です</p>
          </div>
        </div>
      </div>
    </div>
  );
}
