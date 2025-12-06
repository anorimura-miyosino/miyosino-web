export default function EventsContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          今後のイベント
        </h2>
        <div className="space-y-4">
          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <h3 className="font-semibold text-gray-900">
              2024年12月15日（日） - 組合総会
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              時間: 14:00〜16:00 / 場所: 集会所
            </p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <h3 className="font-semibold text-gray-900">
              2024年12月23日（月・祝） - クリスマスイベント
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              時間: 10:00〜12:00 / 場所: 集会所
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          過去のイベント
        </h2>
        <div className="space-y-4">
          <div className="border-l-4 border-gray-300 pl-4 py-2">
            <h3 className="font-semibold text-gray-900">
              2024年11月20日（水） - 班長会
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              時間: 19:00〜20:30 / 場所: 集会所
            </p>
          </div>
          <div className="border-l-4 border-gray-300 pl-4 py-2">
            <h3 className="font-semibold text-gray-900">
              2024年10月15日（日） - 秋の清掃活動
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              時間: 9:00〜11:00 / 場所: 団地内各所
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
