import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'サイトマップ | かわつる三芳野団地',
    description:
        'かわつる三芳野団地のサイトマップです。各ページへのリンクを一覧でご案内しています。',
};

type SitemapItem = {
    title: string;
    href: string;
    description?: string;
};

type SitemapSection = {
    title: string;
    items: SitemapItem[];
};

const sitemapData: SitemapSection[] = [
    {
        title: 'メインメニュー',
        items: [
            {
                title: 'ホーム',
                href: '/',
                description: 'トップページへ戻ります',
            },
            {
                title: '団地の特長',
                href: '/features',
                description: 'かわつる三芳野団地の魅力をご紹介します',
            },
            {
                title: 'コミュニティ',
                href: '/community',
                description: '団地内のコミュニティ活動について',
            },
            {
                title: '共有施設・サービス',
                href: '/shared-facilities',
                description: '集会所や公園などの施設案内',
            },
            {
                title: '周辺環境',
                href: '/surrounding',
                description: 'お買い物や病院、学校などの周辺情報',
            },
            {
                title: 'アクセス',
                href: '/access',
                description: '団地への交通アクセス',
            },
        ],
    },
    {
        title: '居住者・入居検討中の方へ',
        items: [
            {
                title: '子育て・ファミリー',
                href: '/family',
                description: '子育て環境やファミリー向け情報',
            },
            {
                title: '管理組合について',
                href: '/management',
                description: '管理組合の活動や組織について',
            },
            {
                title: '組合員専用ページ',
                href: '/member',
                description: '居住者専用の情報ページ（要ログイン）',
            },
        ],
    },
    {
        title: 'その他',
        items: [
            {
                title: 'お問い合わせ',
                href: '/contact',
                description: 'ご質問・ご相談はこちらから',
            },
            {
                title: 'プライバシーポリシー',
                href: '/privacy',
                description: '個人情報の取り扱いについて',
            },
            {
                title: 'サイトマップ',
                href: '/sitemap',
                description: 'このページです',
            },
        ],
    },
];

export default function SitemapPage() {
    return (
        <div className="bg-white py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-serif">
                        サイトマップ
                    </h1>
                    <p className="mt-4 text-lg leading-8 text-gray-600">
                        かわつる三芳野団地ホームページの各ページをご案内します。
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {sitemapData.map((section) => (
                        <div
                            key={section.title}
                            className="bg-gray-50 rounded-2xl p-8 shadow-sm ring-1 ring-gray-900/5"
                        >
                            <h2 className="text-xl font-semibold leading-7 text-gray-900 border-b border-gray-200 pb-4 mb-6">
                                {section.title}
                            </h2>
                            <ul className="space-y-4">
                                {section.items.map((item) => (
                                    <li key={item.href}>
                                        <Link href={item.href} className="group block">
                                            <span className="text-base font-medium text-green-700 group-hover:text-green-900 transition-colors">
                                                {item.title}
                                            </span>
                                            {item.description && (
                                                <p className="mt-1 text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                                                    {item.description}
                                                </p>
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
