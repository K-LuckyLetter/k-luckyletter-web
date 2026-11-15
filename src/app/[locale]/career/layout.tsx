import type { ReactNode } from 'react';
import { SEO, pageMeta } from '@/lib/seo';
import { isLocale } from '@/lib/ui';

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMeta(locale, '/career', SEO[locale].careerTitle, SEO[locale].careerDescription);
}

export default function CareerLayout({ children }: Props) {
  return children;
}
