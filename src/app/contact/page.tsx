import { ContactFormSection, PhoneContactSection } from '@/components/contact';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヒーローセクション */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              お問い合わせ
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              かわつる三芳野団地についてご質問やご相談がございましたら、
              お気軽にお問い合わせください。お電話またはお問い合わせフォームから
              ご連絡いただけます。
            </p>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* 電話でのお問い合わせ */}
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-green-600 rounded-full hidden lg:block"></div>
            <PhoneContactSection />
          </div>

          {/* お問い合わせフォーム */}
          <div className="relative">
            <div className="absolute -right-4 top-0 bottom-0 w-1 bg-blue-500 rounded-full hidden lg:block"></div>
            <ContactFormSection />
          </div>
        </div>
      </div>
    </div>
  );
}
