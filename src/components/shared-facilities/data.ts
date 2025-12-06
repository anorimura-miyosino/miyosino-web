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
        '子供たちが安全に遊べる児童公園と、夏場に利用できる幼児用の浅いプールを完備。家族連れに人気の施設です。',
      features: [
        '安全な遊具',
        '幼児用浅いプール',
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
    {
      id: 9,
      name: '広場',
      description:
        'お祭り・餅つき・ラジオ体操・防災訓練など、様々なイベントで利用される広場です。地域の交流の場として活用されています。',
      features: [
        'お祭り',
        '餅つき大会',
        'ラジオ体操',
        '防災訓練',
        'その他イベント',
      ],
      capacity: '要確認',
      reservation: '管理組合事務所で予約',
      image: '/images/square.jpg',
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
      name: '幼児プール',
      description: '幼児が安全に遊べるプール。無料で利用できます。',
      features: ['安全な水深', '監視員常駐', '更衣室完備', '日陰エリア'],
      capacity: '20名',
      reservation: '不要（利用時間制限あり）',
      image: '/images/kids-pool.jpg',
      fee: '無料',
    },
    {
      id: 4,
      name: '来客駐車場',
      description: '来客用の駐車場。無料で利用できます。',
      features: ['24時間利用可能', '防犯カメラ設置', '複数台対応'],
      capacity: '要確認',
      reservation: '不要',
      image: '/images/visitor-parking.jpg',
      fee: '無料',
    },
  ],
};
