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
      title: 'ごみゼロ運動',
      description:
        '地域の環境美化を目的としたごみゼロ運動。住民が一丸となって地域を清掃し、美しい住環境を維持します。',
      icon: '♻️',
      frequency: '定期開催',
      participants: '非公開',
    },
    {
      id: 2,
      title: '夏休みラジオ体操会',
      description:
        '夏休み期間中のラジオ体操会。子供たちを中心に、朝の清々しい空気の中で身体を動かし、健康を維持します。',
      icon: '🤸',
      frequency: '7月・8月',
      participants: '非公開',
    },
    {
      id: 3,
      title: '防犯パトロール',
      description:
        '地域の安全を守る防犯パトロール。住民同士で協力し合い、安心して暮らせる地域づくりに取り組んでいます。',
      icon: '🚔',
      frequency: '定期開催',
      participants: '非公開',
    },
    {
      id: 4,
      title: '夏まつり',
      description:
        '夏の一大イベントである夏まつり。屋台や出店、盆踊りなどで地域住民が集まり、交流を深めます。',
      icon: '🎆',
      frequency: '年1回（8月）',
      participants: '非公開',
    },
    {
      id: 5,
      title: '敬老会',
      description:
        '地域の高齢者を敬い、感謝の気持ちを表す敬老会。地域の伝統を継承し、世代を超えた交流の場となっています。',
      icon: '🎎',
      frequency: '年1回',
      participants: '非公開',
    },
    {
      id: 6,
      title: '赤い羽根共同募金',
      description:
        '社会福祉の向上を目的とした赤い羽根共同募金活動。地域全体で助け合いの精神を広めています。',
      icon: '❤️',
      frequency: '年1回（10月）',
      participants: '非公開',
    },
    {
      id: 7,
      title: '歳末たすけあい募金運動',
      description:
        '年末のたすけあい募金運動。地域の困っている人々を支援し、地域全体で支え合う活動です。',
      icon: '🤝',
      frequency: '年1回（年末）',
      participants: '非公開',
    },
    {
      id: 8,
      title: '文化祭（５自治会連合）',
      description:
        '5自治会が連合して開催する文化祭。地域の文化活動の成果を披露し、地域住民の交流を深める大きなイベントです。',
      icon: '🎨',
      frequency: '年1回（11月）',
      participants: '非公開',
    },
    {
      id: 9,
      title: '餅つき大会',
      description:
        '新年を祝う餅つき大会。昔ながらの杵と臼で餅をつき、みんなで味わいながら新年の交流を深めます。',
      icon: '🍡',
      frequency: '年1回（1月）',
      participants: '非公開',
    },
  ],
  residentCircles: [
    {
      id: 1,
      name: '川鶴Ｆ・Ｃ（スポーツ少年団）',
      category: 'スポーツ・運動',
      description:
        'サッカーを通じ健全な心身の育成及び、会員相互の親睦を図るとともに、地域のスポーツ振興に寄与することを目的とした少年サッカークラブです。',
      activities: ['サッカー練習', '試合参加', '大会出場', 'サッカースクール'],
      members: '非公開',
      meetingFrequency: '定期開催（毎週月曜日にサッカースクールあり）',
      contact: '掲示板をご確認ください',
      website: 'https://www.kawatsuru-fc.com/',
      instagram: 'https://www.instagram.com/kawatsuru1984/',
      facebook:
        'https://www.facebook.com/p/%E5%B7%9D%E9%B6%B4FC-100063575972678/',
    },
    {
      id: 2,
      name: '川鶴西ファイターズ',
      category: 'スポーツ・運動',
      description:
        '地域のスポーツチームとして活動するファイターズです。チームワークとスポーツマンシップを大切にしています。',
      activities: ['練習会', '試合参加', 'チーム活動', '交流会'],
      members: '非公開',
      meetingFrequency: '定期開催',
      contact: '掲示板をご確認ください',
      website: 'https://www.pop.co.jp/tg/team/intro.php?teamid=60981',
      websiteLabel: 'チーム紹介ページ',
    },
    {
      id: 3,
      name: 'かわつる三芳野ソフトボールクラブ',
      category: 'スポーツ・運動',
      description:
        'ソフトボールを楽しむクラブです。チームスポーツを通じて交流を深めています。',
      activities: ['ソフトボール練習', '試合参加', 'チーム活動', '交流会'],
      members: '非公開',
      meetingFrequency: '定期開催',
      contact: '掲示板をご確認ください',
    },
    {
      id: 4,
      name: 'グリーンレディス・テニスクラブ',
      category: 'スポーツ・運動',
      description:
        '女性メンバーがテニスを楽しむクラブです。テニスを通じて健康維持と交流を図っています。',
      activities: ['テニス練習', '練習会', '大会参加', '交流会'],
      members: '非公開',
      meetingFrequency: '定期開催',
      contact: '掲示板をご確認ください',
    },
    {
      id: 5,
      name: '日曜テニスクラブ',
      category: 'スポーツ・運動',
      description:
        '日曜日にテニスを楽しむクラブです。週末のリフレッシュと交流の場として活動しています。',
      activities: ['テニス練習', '練習会', '大会参加', '交流会'],
      members: '非公開',
      meetingFrequency: '日曜日',
      contact: '掲示板をご確認ください',
    },
    {
      id: 6,
      name: '三芳野テニスクラブ',
      category: 'スポーツ・運動',
      description:
        'テニスを楽しむクラブです。テニスを通じて健康維持と交流を図っています。',
      activities: ['テニス練習', '練習会', '大会参加', '交流会'],
      members: '非公開',
      meetingFrequency: '定期開催',
      contact: '掲示板をご確認ください',
    },
    {
      id: 7,
      name: '三芳野ジュニア・テニスクラブ',
      category: 'スポーツ・運動',
      description:
        '子供向けのテニスクラブです。ジュニア世代がテニスを楽しみながら技術を向上させています。',
      activities: ['テニス練習', '練習会', '大会参加', '交流会'],
      members: '非公開',
      meetingFrequency: '定期開催',
      contact: '掲示板をご確認ください',
    },
    {
      id: 8,
      name: '三芳野シニア・テニスクラブ',
      category: 'スポーツ・運動',
      description:
        'シニア世代がテニスを楽しむクラブです。テニスを通じて健康維持と交流を図っています。',
      activities: ['テニス練習', '練習会', '大会参加', '交流会'],
      members: '非公開',
      meetingFrequency: '定期開催',
      contact: '掲示板をご確認ください',
    },
    {
      id: 9,
      name: 'かわつるトリムクラブ',
      category: 'スポーツ・運動',
      description:
        '健康増進と体力維持を目的としたトリムクラブです。楽しく身体を動かしながら健康を維持します。',
      activities: ['健康体操', '体力づくり', '交流会', '健康活動'],
      members: '非公開',
      meetingFrequency: '定期開催',
      contact: '掲示板をご確認ください',
    },
    {
      id: 10,
      name: 'かわつる三芳野山歩会',
      category: 'スポーツ・運動',
      description:
        '山歩きを楽しむ会です。自然の中を歩きながら健康維持と交流を深めています。',
      activities: ['山歩き', 'ハイキング', '自然観察', '交流会'],
      members: '非公開',
      meetingFrequency: '定期開催',
      contact: '掲示板をご確認ください',
    },
    {
      id: 11,
      name: '太極拳ミント',
      category: 'スポーツ・運動',
      description:
        '太極拳を通じて健康維持と精神統一を図るクラブです。ゆっくりとした動きで心身を整えます。',
      activities: ['太極拳練習', '健康活動', '交流会', '定期練習'],
      members: '非公開',
      meetingFrequency: '定期開催',
      contact: '掲示板をご確認ください',
    },
    {
      id: 12,
      name: '茶道クラブ',
      category: '文化活動',
      description:
        '茶道を通じて日本の伝統文化を学び、心の静けさと作法を身につけるクラブです。',
      activities: ['茶道稽古', 'お茶会', '文化活動', '交流会'],
      members: '非公開',
      meetingFrequency: '定期開催',
      contact: '掲示板をご確認ください',
    },
    {
      id: 13,
      name: '詩吟教室',
      category: '文化活動',
      description:
        '詩吟を通じて日本の古典文学に親しみ、声を出す楽しさと文化を学ぶ教室です。',
      activities: ['詩吟練習', '発表会', '文化活動', '交流会'],
      members: '非公開',
      meetingFrequency: '定期開催',
      contact: '掲示板をご確認ください',
    },
    {
      id: 14,
      name: '書道教室',
      category: '文化活動',
      description:
        '書道を通じて文字の美しさを追求し、日本の伝統文化を学ぶ教室です。',
      activities: ['書道練習', '作品制作', '展覧会', '文化活動'],
      members: '非公開',
      meetingFrequency: '定期開催',
      contact: '掲示板をご確認ください',
    },
    {
      id: 15,
      name: 'かわつる三芳野太鼓',
      category: '文化活動',
      description:
        '和太鼓を演奏するグループです。力強い音色で地域のイベントなどで演奏活動を行っています。',
      activities: ['太鼓練習', '演奏会', 'イベント出演', '練習会'],
      members: '非公開',
      meetingFrequency: '定期開催',
      contact: '掲示板をご確認ください',
    },
    {
      id: 16,
      name: '木目込み人形クラブ',
      category: '文化活動',
      description:
        '木目込み人形を作るクラブです。日本の伝統工芸を通じて創作活動を楽しんでいます。',
      activities: ['人形制作', '作品展示', '創作活動', '交流会'],
      members: '非公開',
      meetingFrequency: '定期開催',
      contact: '掲示板をご確認ください',
    },
    {
      id: 17,
      name: '三芳野囲碁同好会',
      category: '文化活動',
      description:
        '囲碁を楽しむ同好会です。囲碁を通じて思考力と集中力を養い、交流を深めています。',
      activities: ['囲碁対局', '囲碁大会', '交流会', '練習会'],
      members: '非公開',
      meetingFrequency: '定期開催',
      contact: '掲示板をご確認ください',
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
      description:
        '幼児が安全に遊べるプール。無料で利用できます。',
      features: ['安全な水深', '監視員常駐', '更衣室完備', '日陰エリア'],
      capacity: '20名',
      reservation: '不要（利用時間制限あり）',
      image: '/images/kids-pool.jpg',
      fee: '無料',
    },
    {
      id: 4,
      name: '来客駐車場',
      description:
        '来客用の駐車場。無料で利用できます。',
      features: ['24時間利用可能', '防犯カメラ設置', '複数台対応'],
      capacity: '要確認',
      reservation: '不要',
      image: '/images/visitor-parking.jpg',
      fee: '無料',
    },
  ],
};
