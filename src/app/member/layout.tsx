import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '組合員専用ページ | かわつる三芳野団地',
    description:
        'かわつる三芳野団地の組合員専用ページです。組合員向けの情報やサービスをご利用いただけます。',
};

export default function MemberLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
