import type { Metadata } from 'next';
import Link from 'next/link';
import { Analytics } from '@/components/Analytics';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { LangSwitch } from '@/components/LangSwitch';
import { LEGAL_DOCS, legal } from '@/lib/legal';
import { SEO, SITE_META } from '@/lib/seo';
import { HTML_LANG, LOCALES, isLocale, ui } from '@/lib/ui';
import '../globals.css';

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { title, description, keywords } = SEO[locale];
  return { ...SITE_META, title, description, keywords };
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = ui(locale);
  const l = legal(locale);
  return (
    <html lang={HTML_LANG[locale]}>
      <body>
        <div className="shell">
          <header className="topbar">
            <Link className="brand" href={`/${locale}`}><img src="/icon.svg" alt="" width={26} height={26} />{t.brand}</Link>
            <LangSwitch locale={locale} />
          </header>
          <main>{children}</main>
          <footer className="footer">
            <p>{t.disclaimer}</p>
            <nav className="footer-links">
              {LEGAL_DOCS.map((doc) => <Link key={doc} href={`/${locale}/legal/${doc}`}>{l.docs[doc].title}</Link>)}
            </nav>
            {l.business.map((line) => <p key={line}>{line}</p>)}
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
