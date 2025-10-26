import { BaseEntity } from '@/shared/types';

// お問い合わせの種類（Kintone側で分類・設定）
export enum ContactType {
  LIVING_ENVIRONMENT = 'living_environment', // 住環境について
  MOVING_IN = 'moving_in', // 入居について
  FACILITIES = 'facilities', // 共用施設について
  COMMUNITY = 'community', // コミュニティについて
  GENERAL = 'general', // その他一般
}

// お問い合わせの対応方法
export enum ContactResponseMethod {
  EMAIL_REPLY = 'email_reply', // メール返信
  FAQ_ADDITION = 'faq_addition', // Q&Aに追加
  DIRECT_CONTACT = 'direct_contact', // 直接連絡
}

// お問い合わせデータ（Kintone連携）
export interface Contact extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  subject: string;
  message: string;
  type?: ContactType; // Kintone側で分類・設定
  responseMethod?: ContactResponseMethod; // 対応方法
  response?: string; // 返信内容
  respondedAt?: Date;
  respondedBy?: string;
  attachments?: string[];
  isAnonymous: boolean;
  ipAddress?: string;
  userAgent?: string;
}

// Kintone API用の型定義
export interface KintoneContact {
  $id: { value: string };
  $revision: { value: string };
  name: { value: string };
  email: { value: string };
  phone?: { value: string };
  address?: { value: string };
  subject: { value: string };
  message: { value: string };
  type?: { value: ContactType };
  responseMethod?: { value: ContactResponseMethod };
  response?: { value: string };
  respondedAt?: { value: string };
  respondedBy?: { value: string };
  attachments?: { value: string[] };
  isAnonymous: { value: boolean };
  ipAddress?: { value: string };
  userAgent?: { value: string };
  createdAt: { value: string };
  updatedAt: { value: string };
}

// お問い合わせ作成リクエスト
export interface CreateContactRequest {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  subject: string;
  message: string;
  attachments?: string[];
  isAnonymous?: boolean;
  ipAddress?: string;
  userAgent?: string;
}

// お問い合わせ更新リクエスト
export interface UpdateContactRequest {
  type?: ContactType; // Kintone側で分類・設定
  responseMethod?: ContactResponseMethod; // 対応方法
  response?: string; // 返信内容
  respondedBy?: string;
}

// お問い合わせ検索フィルター
export interface ContactFilter {
  type?: ContactType;
  responseMethod?: ContactResponseMethod;
  isAnonymous?: boolean;
  search?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}

// お問い合わせタイプの表示名マッピング
export const CONTACT_TYPE_LABELS: Record<ContactType, string> = {
  [ContactType.LIVING_ENVIRONMENT]: '住環境について',
  [ContactType.MOVING_IN]: '入居について',
  [ContactType.FACILITIES]: '共用施設について',
  [ContactType.COMMUNITY]: 'コミュニティについて',
  [ContactType.GENERAL]: 'その他一般',
};

// お問い合わせ対応方法の表示名マッピング
export const CONTACT_RESPONSE_METHOD_LABELS: Record<
  ContactResponseMethod,
  string
> = {
  [ContactResponseMethod.EMAIL_REPLY]: 'メール返信',
  [ContactResponseMethod.FAQ_ADDITION]: 'Q&Aに追加',
  [ContactResponseMethod.DIRECT_CONTACT]: '直接連絡',
};
