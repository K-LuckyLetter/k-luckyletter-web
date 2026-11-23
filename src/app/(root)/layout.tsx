import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { AdScript } from '@/components/AdSlot';
import { Analytics } from '@/components/Analytics';
import { SITE_META, SITE_NAME, SITE_URL, languageLinks } from '@/lib/seo';
import '../globals.css';

const title = 'K-LuckyLetter: Korean Saju Fortune Reading · 사주 운세 · 四柱推命 · 八字';
const description = 'Free Korean saju (Four Pillars of Destiny) fortune reading for your career, in English, 한국어, 日本語, and 中文. 무료 사주 직업운·이직운 판정.';

export const metadata: Metadata = {
  ...SITE_META,
  title,
  description,
  alternates: { canonical: SITE_URL, languages: languageLinks('') },
  openGraph: { type: 'website', siteName: SITE_NAME, title, description, url: SITE_URL, images: ['/og.jpg'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/og.jpg'] },
};

/** 언어 없는 첫 주소(/) 전용 틀. 실제 화면의 틀은 [locale]/layout.tsx 에 있다. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}<Analytics /><AdScript /></body>
    </html>
  );
}
