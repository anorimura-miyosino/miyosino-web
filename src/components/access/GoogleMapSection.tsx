'use client';

export function GoogleMapSection() {
  // かわつる三芳野団地の住所
  const address = '埼玉県川越市かわつる三芳野１番地';
  const encodedAddress = encodeURIComponent(address);

  // Google Maps埋め込み用のURL（APIキー不要）
  // APIキーがある場合はそれを使い、ない場合は検索URLを使用
  const mapUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    ? `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodedAddress}&zoom=15`
    : `https://www.google.com/maps?q=${encodedAddress}&output=embed&zoom=15`;

  // Google Maps検索ページへのリンク（新しいタブで開く用）
  const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <section id="map" className="bg-white py-16 sm:py-20 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            所在地マップ
          </h2>
          <p className="text-lg text-gray-600">{address}</p>
        </div>

        <div className="rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <iframe
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={mapUrl}
            className="w-full"
            title="かわつる三芳野団地の所在地マップ"
          />
        </div>

        <div className="mt-4 text-center">
          <a
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <span className="mr-2">📍</span>
            <span>Google Mapsで大きな地図を見る</span>
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
