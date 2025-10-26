import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header, Footer } from '@/components';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'かわつる三芳野団地 | Miyoshino Apartments',
  description:
    '家族の笑顔が生まれる場所、かわつる三芳野団地へようこそ。広々とした住空間、緑豊かな環境、そして温かいコミュニティが、あなたの家族を待っています。',
  keywords: '団地, マンション, 家族, コミュニティ, 子育て, 緑豊か',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
