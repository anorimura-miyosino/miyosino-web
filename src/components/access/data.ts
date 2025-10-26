export const accessData = {
  train: {
    title: '電車の場合',
    description: '東武東上線鶴ヶ島駅西口からバスでアクセス',
    station: {
      name: '鶴ヶ島駅',
      line: '東武東上線',
      exit: '西口',
    },
    bus: {
      route: '「川鶴団地」行きバス',
      time: '約7分',
      stop: '川鶴センター下車',
    },
    toCity: [
      { destination: '池袋', time: '約45分', route: '東武東上線直通' },
      { destination: '新宿', time: '約55分', route: '池袋経由' },
      { destination: '渋谷', time: '約60分', route: '池袋・新宿経由' },
      { destination: '東京', time: '約70分', route: '池袋経由' },
    ],
  },
  car: {
    title: '車の場合',
    description: '関越道・圏央道からアクセス可能',
    highways: [
      {
        name: '圏央鶴ヶ島インターチェンジ',
        route: '圏央道',
        time: '約5分',
        destinations: [
          { area: '信州方面', description: '長野・松本・諏訪湖' },
          { area: '日本海側', description: '新潟・富山・金沢' },
          { area: '東北方面', description: '仙台・山形・福島' },
          { area: '神奈川方面', description: '横浜・川崎・厚木' },
        ],
      },
      {
        name: '鶴ヶ島インターチェンジ',
        route: '関越自動車道',
        time: '約10分',
        destinations: [
          { area: '信州方面', description: '長野・軽井沢・草津' },
          { area: '日本海側', description: '新潟・上越・糸魚川' },
          { area: '東北方面', description: '仙台・郡山・会津' },
          { area: '関東方面', description: '東京・埼玉・群馬' },
        ],
      },
    ],
    parking: {
      resident: '住民用共用駐車場：387台（有料）',
      dayVisitor: '日中用来客駐車場：5台（無料・届出制）',
      nightVisitor: '宿泊用来客駐車場：5台（有料・届出制）',
      residentFee: '4,500円/月',
      nightVisitorFee: '300円/日',
    },
  },
};
