import type { MetadataRoute } from 'next';
import { LEGAL_DOCS } from '@/lib/legal';
import { SITE_URL, languageLinks } from '@/lib/seo';
import { LOCALES } from '@/lib/ui';

export const dynamic = 'force-static';

// 검색에 올릴 화면만 싣는다. 개인 결과·리포트·결제 화면은 넣지 않는다.
const PAGES: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/career', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/yearly', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/compat', priority: 0.8, changeFrequency: 'monthly' },
  ...LEGAL_DOCS.map((doc) => ({ path: `/legal/${doc}`, priority: 0.2, changeFrequency: 'yearly' as const })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.flatMap(({ path, priority, changeFrequency }) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: languageLinks(path) },
    })),
  );
}
