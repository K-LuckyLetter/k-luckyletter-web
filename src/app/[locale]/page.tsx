import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, ui } from '@/lib/ui';

export default async function Landing({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = ui(locale);
  return (
    <div className="stack-lg">
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

      <div className="banner"><img src="/letter.jpg" alt="" loading="lazy" /></div>
      <Link className="btn block" href={`/${locale}/career`}>{t.start}</Link>
    </div>
  );
}
