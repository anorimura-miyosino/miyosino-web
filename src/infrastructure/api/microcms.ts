import type {
  MicroCMSPhoto,
  MicroCMSPhotoListResponse,
  Photo,
} from '@/domains/media';

/**
 * MicroCMS APIクライアント
 */
export class MicroCMSClient {
  private readonly baseURL: string;
  private readonly apiKey: string;

  constructor() {
    this.baseURL =
      process.env.MICROCMS_API_BASE_URL ||
      'https://k-miyoshino.microcms.io/api/v1';
    this.apiKey =
      process.env.MICROCMS_API_KEY ||
      process.env.NEXT_PUBLIC_MICROCMS_API_KEY ||
      '';

    if (!this.apiKey) {
      console.warn('MicroCMS API key is not set');
    }
  }

  /**
   * MicroCMSPhotoをPhotoドメインモデルに変換
   */
  private toPhotoDomain(microCMSPhoto: MicroCMSPhoto): Photo {
    return {
      id: microCMSPhoto.id,
      createdAt: new Date(microCMSPhoto.createdAt),
      updatedAt: new Date(microCMSPhoto.updatedAt),
      title: microCMSPhoto.title,
      description: microCMSPhoto.description,
      photo: microCMSPhoto.photo,
      order: microCMSPhoto.order,
    };
  }

  /**
   * 写真一覧を取得
   */
  async getPhotos(): Promise<Photo[]> {
    const endpoint = `${this.baseURL}/photo`;
    const url = new URL(endpoint);
    url.searchParams.append('orders', 'order'); // orderフィールドでソート

    const response = await fetch(url.toString(), {
      headers: {
        'X-MICROCMS-API-KEY': this.apiKey,
      },
      // 静的エクスポート時はビルド時に一度だけ実行される
      cache: 'force-cache',
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch photos: ${response.status} ${response.statusText}`
      );
    }

    const data: MicroCMSPhotoListResponse = await response.json();
    return data.contents.map((photo) => this.toPhotoDomain(photo));
  }

  /**
   * 表示順が最小の写真を取得（背景用）
   */
  async getBackgroundPhoto(): Promise<Photo | null> {
    const photos = await this.getPhotos();
    if (photos.length === 0) {
      return null;
    }

    // orderが最小の写真を取得
    return photos.reduce((prev, current) =>
      prev.order <= current.order ? prev : current
    );
  }
}

export const microCMSClient = new MicroCMSClient();
