// お問い合わせの種類
export enum ContactType {
  LIVING_ENVIRONMENT = 'living_environment', // 住環境について
  MOVING_IN = 'moving_in', // 入居について
  FACILITIES = 'facilities', // 共用施設について
  COMMUNITY = 'community', // コミュニティについて
  GENERAL = 'general', // その他一般
}

// お問い合わせタイプの表示名マッピング
export const CONTACT_TYPE_LABELS: Record<ContactType, string> = {
  [ContactType.LIVING_ENVIRONMENT]: '住環境について',
  [ContactType.MOVING_IN]: '入居について',
  [ContactType.FACILITIES]: '共用施設について',
  [ContactType.COMMUNITY]: 'コミュニティについて',
  [ContactType.GENERAL]: 'その他',
};



