// コミュニティ活動データ
export const communityActivities = {
  topEvents: [
    {
      id: 1,
      title: '夏祭り',
      description:
        '毎年8月に開催される団地最大のイベント。屋台、盆踊り、花火大会などで盛り上がります。',
      image: '/images/summer-festival.jpg',
      date: '8月中旬',
      participants: '200名以上',
      features: ['屋台出店', '盆踊り', '花火大会', '子供向けゲーム'],
    },
    {
      id: 2,
      title: '秋の収穫祭',
      description:
        '団地内の畑で育てた野菜を使った料理コンテストや収穫体験イベント。',
      image: '/images/harvest-festival.jpg',
      date: '10月下旬',
      participants: '150名以上',
      features: ['料理コンテスト', '収穫体験', '野菜販売', '音楽ライブ'],
    },
    {
      id: 3,
      title: 'クリスマスパーティー',
      description:
        '子供たちが主役のクリスマスイベント。サンタクロースの登場やプレゼント交換があります。',
      image: '/images/christmas-party.jpg',
      date: '12月下旬',
      participants: '100名以上',
      features: [
        'サンタクロース登場',
        'プレゼント交換',
        'クリスマス料理',
        'ゲーム大会',
      ],
    },
  ],
  neighborhoodActivities: [
    {
      id: 1,
      title: 'お祭り',
      description:
        '地域の伝統的なお祭りに団地住民が参加。神輿担ぎや踊りで地域との交流を深めます。',
      icon: '🎌',
      frequency: '年1回',
      participants: '50名以上',
    },
    {
      id: 2,
      title: '餅つき大会',
      description:
        '年末恒例の餅つき大会。昔ながらの杵と臼で餅をつき、みんなで味わいます。',
      icon: '🍡',
      frequency: '年1回（12月）',
      participants: '80名以上',
    },
    {
      id: 3,
      title: '集団回収',
      description:
        '月1回の資源回収活動。環境保護と地域貢献を目的とした住民参加型の活動です。',
      icon: '♻️',
      frequency: '月1回',
      participants: '30名以上',
    },
    {
      id: 4,
      title: '清掃活動',
      description:
        '団地内の美化活動。花壇の手入れや道路清掃で住みよい環境を維持します。',
      icon: '🧹',
      frequency: '月2回',
      participants: '20名以上',
    },
  ],
  residentCircles: [
    {
      id: 1,
      name: 'ママサークル「ひまわり」',
      description:
        '子育て中のママたちが集まるサークル。育児相談や情報交換の場として活動しています。',
      activities: ['育児相談会', '手作り教室', '公園遊び', 'ランチ会'],
      members: '25名',
      meetingFrequency: '週1回',
      contact: '代表：田中さん（1-101）',
    },
    {
      id: 2,
      name: 'シニアクラブ「さくら会」',
      description:
        '60歳以上の住民が中心のサークル。健康維持や趣味活動を通じて交流を深めています。',
      activities: ['健康体操', '囲碁・将棋', '読書会', '散歩会'],
      members: '18名',
      meetingFrequency: '週2回',
      contact: '代表：佐藤さん（2-205）',
    },
    {
      id: 3,
      name: 'ガーデニングクラブ「グリーン」',
      description:
        '植物を愛する住民が集まるサークル。団地内の花壇管理やガーデニング教室を開催。',
      activities: ['花壇管理', 'ガーデニング教室', '植物観察会', '収穫祭'],
      members: '15名',
      meetingFrequency: '月2回',
      contact: '代表：山田さん（3-301）',
    },
    {
      id: 4,
      name: 'スポーツクラブ「アクティブ」',
      description:
        '運動好きな住民が集まるサークル。テニス、バドミントン、ジョギングなど様々なスポーツを楽しみます。',
      activities: ['テニス', 'バドミントン', 'ジョギング', 'ヨガ'],
      members: '22名',
      meetingFrequency: '週3回',
      contact: '代表：鈴木さん（1-203）',
    },
  ],
};

// 共有施設・サービスデータ
export const sharedFacilities = {
  commonAreas: [
    {
      id: 1,
      name: '集会所',
      description:
        '住民会議やイベントに使用できる多目的ホール。最大100名まで収容可能。',
      features: ['音響設備', 'プロジェクター', '調理設備', '冷暖房完備'],
      capacity: '100名',
      reservation: '管理組合事務所で予約受付',
      image: '/images/meeting-hall.jpg',
    },
    {
      id: 2,
      name: '駐車場',
      description:
        '各住戸に1台分の駐車スペースを確保。来客用の臨時駐車場も完備。',
      features: [
        '各住戸1台分',
        '来客用臨時駐車場',
        '24時間利用可能',
        '防犯カメラ設置',
      ],
      capacity: '200台',
      reservation: '不要（各住戸専用）',
      image: '/images/parking.jpg',
    },
    {
      id: 3,
      name: '駐輪場',
      description:
        '自転車・バイク専用の駐輪場。防犯対策も万全で安心して利用できます。',
      features: [
        '自転車・バイク対応',
        '防犯カメラ',
        '屋根付き',
        '24時間利用可能',
      ],
      capacity: '300台',
      reservation: '不要',
      image: '/images/bicycle-parking.jpg',
    },
    {
      id: 4,
      name: '道路・植栽',
      description:
        '美しく整備された道路と緑豊かな植栽で、住みよい環境を提供しています。',
      features: ['歩道完備', '街路灯設置', '季節の花々', '樹木の管理'],
      capacity: '全住戸アクセス可能',
      reservation: '不要',
      image: '/images/roads-greenery.jpg',
    },
    {
      id: 5,
      name: 'ごみ収集所',
      description:
        '分別収集に対応したごみ収集所。清潔で使いやすい環境を維持しています。',
      features: ['分別収集対応', '24時間利用可能', '清掃管理', '防臭対策'],
      capacity: '全住戸利用可能',
      reservation: '不要',
      image: '/images/garbage-collection.jpg',
    },
    {
      id: 6,
      name: 'テニスコート',
      description:
        '2面のテニスコートを完備。住民の健康増進とコミュニティ活動の場として利用されています。',
      features: ['2面完備', '夜間照明', '予約制', 'ラケット貸出', '防犯カメラ'],
      capacity: '各面4名',
      reservation: '管理組合事務所で予約',
      image: '/images/tennis-court-common.jpg',
    },
    {
      id: 7,
      name: '児童公園・プール',
      description:
        '子供たちが安全に遊べる児童公園と、夏場に利用できるプールを完備。家族連れに人気の施設です。',
      features: [
        '安全な遊具',
        '25mプール',
        '監視員常駐',
        '更衣室完備',
        '日陰エリア',
      ],
      capacity: '公園：50名、プール：30名',
      reservation: 'プールは予約制（夏期のみ）',
      image: '/images/children-park-pool.jpg',
    },
    {
      id: 8,
      name: '掲示板',
      description:
        '住民同士の情報交換やお知らせを掲載する掲示板は、団地内の7箇所に設置されています。コミュニティの情報共有の場として活用されています。',
      features: [
        '住民投稿可能（最大サイズA3まで、期間は押印日より7日間、非営利目的は無料でご利用いただけます。）',
        '管理組合お知らせ',
        'イベント情報',
        '地域情報',
        '防犯情報',
      ],
      capacity: '全住民利用可能',
      reservation: '不要',
      image: '/images/bulletin-board.jpg',
    },
  ],
  apartmentServices: [
    {
      id: 1,
      name: 'テニスコート',
      description: '2面のテニスコートを完備。住民は予約制で利用できます。',
      features: ['2面完備', '夜間照明', '予約制', 'ラケット貸出'],
      capacity: '各面4名',
      reservation: '管理組合事務所で予約',
      image: '/images/tennis-court.jpg',
      fee: '1時間500円',
    },
    {
      id: 2,
      name: '会議室',
      description:
        '小規模な会議や勉強会に使用できる会議室。プロジェクターも完備。',
      features: ['プロジェクター', 'ホワイトボード', '冷暖房完備', 'Wi-Fi対応'],
      capacity: '20名',
      reservation: '管理組合事務所で予約',
      image: '/images/meeting-room.jpg',
      fee: '1時間300円',
    },
    {
      id: 3,
      name: '図書室',
      description:
        '住民が寄贈した本を自由に読める図書室。静かな環境で読書を楽しめます。',
      features: ['住民寄贈図書', '静かな環境', '読書スペース', 'コピー機'],
      capacity: '15名',
      reservation: '不要',
      image: '/images/library.jpg',
      fee: '無料',
    },
    {
      id: 4,
      name: 'キッズルーム',
      description:
        '子供たちが安全に遊べるキッズルーム。おもちゃや絵本も充実しています。',
      features: ['安全な遊具', '絵本・おもちゃ', '冷暖房完備', '監視カメラ'],
      capacity: '20名',
      reservation: '不要（利用時間制限あり）',
      image: '/images/kids-room.jpg',
      fee: '無料',
    },
  ],
  surroundingFacilities: [
    {
      id: 1,
      name: 'スーパーマーケット',
      description:
        '徒歩5分の距離にある大型スーパー。日用品から生鮮食品まで揃います。',
      distance: '徒歩5分',
      category: 'ショッピング',
      icon: '🛒',
    },
    {
      id: 2,
      name: 'コンビニエンスストア',
      description: '団地入口に24時間営業のコンビニ。急な買い物にも便利です。',
      distance: '徒歩2分',
      category: 'ショッピング',
      icon: '🏪',
    },
    {
      id: 3,
      name: '郵便局',
      description:
        '徒歩3分の距離にある郵便局。郵便物の送受信やATM利用ができます。',
      distance: '徒歩3分',
      category: '公共施設',
      icon: '📮',
    },
    {
      id: 4,
      name: '銀行',
      description:
        '徒歩7分の距離にある銀行。ATMや各種金融サービスを利用できます。',
      distance: '徒歩7分',
      category: '金融',
      icon: '🏦',
    },
    {
      id: 5,
      name: '病院',
      description: '徒歩10分の距離にある総合病院。24時間救急対応も可能です。',
      distance: '徒歩10分',
      category: '医療',
      icon: '🏥',
    },
    {
      id: 6,
      name: '小学校',
      description: '徒歩8分の距離にある公立小学校。通学路も安全で安心です。',
      distance: '徒歩8分',
      category: '教育',
      icon: '🏫',
    },
    {
      id: 7,
      name: '公園',
      description:
        '徒歩5分の距離にある大型公園。子供たちの遊び場として人気です。',
      distance: '徒歩5分',
      category: 'レジャー',
      icon: '🌳',
    },
    {
      id: 8,
      name: '駅',
      description: '徒歩12分の距離にある最寄り駅。都心へのアクセスも良好です。',
      distance: '徒歩12分',
      category: '交通',
      icon: '��',
    },
  ],
};
