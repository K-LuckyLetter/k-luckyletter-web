import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AdScript, AdSlot } from '@/components/AdSlot';
import { SEO, SITE_NAME, SITE_URL, jsonLd, pageMeta } from '@/lib/seo';
import { HTML_LANG, LOCALES, isLocale, ui } from '@/lib/ui';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMeta(locale, '', SEO[locale].title, SEO[locale].description);
}

export default async function Landing({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = ui(locale);
  const seo = SEO[locale];
  const faq = [...seo.faq, ...t.faq];
  const url = `${SITE_URL}/${locale}`;
  // 검색엔진과 AI 검색이 서비스 정보와 질문 답변을 그대로 읽어 가도록 구조화 데이터로도 싣는다.
  const structured = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${SITE_URL}/#org`, name: SITE_NAME, url: SITE_URL, logo: `${SITE_URL}/logo.png` },
      {
        '@type': 'WebSite', '@id': `${SITE_URL}/#site`, name: SITE_NAME, url: SITE_URL,
        inLanguage: LOCALES.map((l) => HTML_LANG[l]), publisher: { '@id': `${SITE_URL}/#org` },
      },
      {
        '@type': 'Service', name: seo.title, description: seo.description, url, inLanguage: HTML_LANG[locale],
        serviceType: 'Saju (Four Pillars of Destiny) fortune reading', areaServed: 'Worldwide',
        provider: { '@id': `${SITE_URL}/#org` }, image: `${SITE_URL}/og.jpg`,
        offers: { '@type': 'Offer', name: t.start, price: '0', priceCurrency: 'USD', url: `${url}/career` },
      },
      {
        '@type': 'FAQPage', inLanguage: HTML_LANG[locale],
        mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };
  return (
    <div className="stack-lg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <section className="hero stack">
        <div className="hero-media">
          <img src="/hero.jpg" alt={t.heroAlt} />
          <video autoPlay muted loop playsInline poster="/hero.jpg" aria-hidden="true">
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div>
          <p className="eyebrow">{t.tagline}</p>
          <h1>{t.heroTitle}</h1>
          <p className="muted">{t.heroSub}</p>
        </div>
        <Link className="btn block" href={`/${locale}/career`}>{t.start}</Link>
      </section>

      <section className="card">
        <h2>{t.howTitle}</h2>
        <ol className="steps">
          {t.how.map((s) => (
            <li key={s.title}><div><strong>{s.title}</strong><p className="small muted">{s.body}</p></div></li>
          ))}
        </ol>
      </section>

      <section className="stack">
        {t.features.map((f) => (
          <div className="card" key={f.title}>
            <h2>{f.title}</h2>
            <p className="muted">{f.body}</p>
          </div>
        ))}
      </section>

      <section className="card about">
        <h2>{seo.aboutTitle}</h2>
        {seo.about.map((p) => <p className="muted" key={p}>{p}</p>)}
      </section>

      <section className="card faq">
        <h2>{t.faqTitle}</h2>
        {faq.map((f) => (
          <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
        ))}
      </section>

      <AdScript />
      <AdSlot locale={locale} />

      <div className="banner"><img src="/letter.jpg" alt="" loading="lazy" /></div>
      <Link className="btn block" href={`/${locale}/career`}>{t.start}</Link>
    </div>
  );
}
