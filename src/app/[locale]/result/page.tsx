'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, use, useEffect, useRef, useState } from 'react';
import { Elements, Flows, LockedList, Now, Pillars, Proof, Stars, Traits, VerdictCard } from '@/components/ReadingBlocks';
import { ApiError, api, type Reading, type Tier } from '@/lib/api';
import { legal } from '@/lib/legal';
import { isLocale, ui, type Locale } from '@/lib/ui';

/** 섹션 사이에 넣는 장식 이미지. 내용을 전달하지 않으므로 대체 텍스트는 비운다. */
function Art({ src }: { src: string }) {
  return <div className="banner"><img src={src} alt="" loading="lazy" style={{ objectPosition: 'center' }} /></div>;
}

type Props = { params: Promise<{ locale: string }> };

/** 풀이 번호는 주소의 ?id= 로 받는다. 정적 배포에서는 번호가 들어간 경로를 미리 만들 수 없다. */
export default function Page(props: Props) {
  return <Suspense><Result {...props} /></Suspense>;
}

function Result({ params }: Props) {
  const { locale: raw } = use(params);
  const id = useSearchParams().get('id') ?? '';
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const t = ui(locale);
  const l = legal(locale);

  const [reading, setReading] = useState<Reading | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tier, setTier] = useState<Tier>('deep');
  const [paying, setPaying] = useState(false);
  const [email, setEmail] = useState('');
  const emailOk = /^\S+@\S+\.\S+$/.test(email.trim());
  // 등급 선택이 화면에 보이는 동안에는 하단 고정 버튼을 숨겨 버튼이 둘로 보이지 않게 한다.
  const tiersRef = useRef<HTMLElement>(null);
  const [atTiers, setAtTiers] = useState(false);
  useEffect(() => {
    if (!tiersRef.current) return;
    const observer = new IntersectionObserver(([entry]) => setAtTiers(entry.isIntersecting));
    observer.observe(tiersRef.current);
    return () => observer.disconnect();
  }, [reading]);

  useEffect(() => {
    let live = true;
    api<Reading>(`/api/readings/${id}?locale=${locale}`)
      .then((r) => live && setReading(r))
      .catch((e) => live && setError(e instanceof ApiError && e.status === 404 ? t.notFound : t.loadFailed));
    return () => { live = false; };
  }, [id, locale, t.notFound, t.loadFailed]);

  async function unlock() {
    setPaying(true);
    setError(null);
    try {
      const order = await api<{ approveUrl?: string }>('/api/orders', { readingId: id, locale, tier, email: email.trim() });
      window.location.assign(order.approveUrl ?? `/${locale}/report?id=${id}`);
    } catch {
      setError(t.loadFailed);
      setPaying(false);
    }
  }

  if (error && !reading) return <p className="error" role="alert">{error}</p>;
  if (!reading) return <div className="spinner" role="status" aria-label={t.sending} />;

  const tiers: { key: Tier; name: string; desc: string; badge?: string }[] = [
    { key: 'deep', ...t.tierDeep },
    { key: 'basic', ...t.tierBasic },
  ];

  return (
    <div className="stack-lg">
      <h1 style={{ fontSize: 24 }}>{reading.headline}</h1>
      <VerdictCard reading={reading} t={t} />
      <Now reading={reading} t={t} />
      <Proof reading={reading} t={t} />
      <LockedList reading={reading} t={t} />
      {reading.sinsal.length > 0 && <Art src="/stars.jpg" />}
      <Stars reading={reading} t={t} />
      <Pillars reading={reading} t={t} />
      <Art src="/chapters/1.jpg" />
      <Elements reading={reading} t={t} />
      <Traits reading={reading} t={t} />
      <Art src="/chapters/8.jpg" />
      <Flows reading={reading} t={t} />

      <section className="card toc">
        <h2>{t.tocTitle}</h2>
        <ol>
          {reading.toc.map((c) => (
            <li key={c.no}>
              <img src={`/chapters/${c.no}.jpg`} alt="" loading="lazy" />
              <div>
                <div>
                  <span className="no">{String(c.no).padStart(2, '0')}</span><strong>{c.title}</strong>
                  {c.deep && <span className="badge">{t.deepTag}</span>}
                </div>
                <div className="items">{c.items.join(' · ')}</div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="card">
        <h2>{t.trustTitle}</h2>
        <p className="muted">{t.trustBody}</p>
      </section>

      {!reading.paid && <Art src="/chapters/9.jpg" />}
      {!reading.paid && (
        <section className="card stack" id="tiers" ref={tiersRef}>
          <h2 style={{ marginBottom: 0 }}>{t.tiersTitle}</h2>
          <table className="compare">
            <thead><tr>{t.compare.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
            <tbody>
              {t.compare.rows.map(([label, ...cells]) => (
                <tr key={label}>
                  <td>{label}</td>
                  {cells.map((on, i) => <td key={i} className={on ? 'yes' : 'no'}>{on ? '✓' : '—'}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="tiers">
            {tiers.map((x) => (
              <button type="button" key={x.key} className="tier" aria-pressed={tier === x.key} onClick={() => setTier(x.key)}>
                <strong>{x.name}{x.badge && <span className="badge">{x.badge}</span>}</strong>
                <span className="amount">{reading.prices[x.key].display}</span>
                <span className="desc">{x.desc}</span>
              </button>
            ))}
          </div>
          <div className="field">
            <label htmlFor="email">{t.emailLabel}</label>
            <input id="email" className="input" type="email" autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
            <span className="small muted">{t.emailHint}</span>
          </div>
          <button type="button" className="btn block" disabled={paying || !emailOk} onClick={unlock}>
            {paying ? t.processing : `${tiers.find((x) => x.key === tier)!.name} · ${reading.prices[tier].display}`}
          </button>
          <p className="small muted center">{t.priceNote}</p>
          <p className="small muted center">
            {l.checkoutNote}{' '}
            <Link href={`/${locale}/legal/terms`}>{l.docs.terms.title}</Link>{' · '}
            <Link href={`/${locale}/legal/refund`}>{l.docs.refund.title}</Link>{' · '}
            <Link href={`/${locale}/legal/privacy`}>{l.docs.privacy.title}</Link>
          </p>
        </section>
      )}

      <section className="card faq">
        <h2>{t.faqTitle}</h2>
        {t.faq.map((f) => (
          <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
        ))}
      </section>

      {error && <p className="error" role="alert">{error}</p>}

      <div className="sticky" hidden={atTiers}>
        <div className="inner">
          {reading.paid ? (
            <Link className="btn block" href={`/${locale}/report?id=${id}`}>{t.openReport}</Link>
          ) : (
            <a className="btn block" href="#tiers">{t.unlock}</a>
          )}
        </div>
      </div>
    </div>
  );
}
