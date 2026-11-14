import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { LangSwitch } from '@/components/LangSwitch';
import { HTML_LANG, LOCALES, isLocale, ui } from '@/lib/ui';
import '../globals.css';

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = ui(locale);
  return {
    title: `${t.brand} — ${t.tagline}`,
    description: t.heroSub,
    alternates: { languages: Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], `/${l}`])) },
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = ui(locale);
  return (
    <html lang={HTML_LANG[locale]}>
      <body>
        <div className="shell">
          <header className="topbar">
            <Link className="brand" href={`/${locale}`}>{t.brand}</Link>
            <LangSwitch locale={locale} />
          </header>
          <main>{children}</main>
          <p className="footer">{t.disclaimer}</p>
        </div>
      </body>
    </html>
  );
}
