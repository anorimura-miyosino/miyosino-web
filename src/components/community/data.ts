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
