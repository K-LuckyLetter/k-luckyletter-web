'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { GradeDot, Pillars } from '@/components/ReadingBlocks';
import { api, type ProductView } from '@/lib/api';
import { legal } from '@/lib/legal';
import { fill, ui, type Locale } from '@/lib/ui';
import { productUi } from '@/lib/ui-products';

/** 총점 카드: 상품 이름, 점수와 등급, 요약 문장. 결과 화면과 리포트 화면이 함께 쓴다. */
export function ScoreCard({ view }: { view: ProductView }) {
  return (
    <section className="card verdict">
      <p className="eyebrow">{view.title} · {view.score.label}</p>
      <p className="score-big"><b>{view.score.value}</b><span> / 100</span></p>
      <p className="when"><GradeDot grade={view.score.grade} />{view.score.gradeLabel}</p>
      {view.summary.map((line) => <p className="summary" key={line}>{line}</p>)}
      <p className="basis">{view.basis}</p>
    </section>
  );
}

/** 항목별 점수 막대. 잠긴 항목은 점수 자리를 가려서 보여준다. */
export function ScoreBars({ view, locale }: { view: ProductView; locale: Locale }) {
  const x = productUi(locale);
  return (
    <section className="card">
      <h2>{view.bars.title}</h2>
      <div className="bars">
        {view.bars.items.map((b) => (
          <div className="bar" key={b.label}>
            <span>{b.label}</span>
            {b.score === null ? (
              <>
                <div className="track" />
                <span className="blur" role="img" aria-label={x.lockedAria} />
              </>
            ) : (
              <>
                <div className="track"><div className={`fill g-${b.grade}`} style={{ width: `${b.score}%` }} /></div>
                <span className="num">{b.score}</span>
              </>
            )}
          </div>
        ))}
      </div>
      <p className="small muted legend-row">
        {view.legend.map((l) => (
          <span key={l.grade}><GradeDot grade={l.grade} />{l.label} {l.min > 0 ? `${l.min}+` : `<${view.legend[3].min}`}</span>
        ))}
      </p>
      <p className="small muted">{view.scaleNote}{!view.paid && ` ${view.labels.lockedNote}`}</p>
    </section>
  );
}

/** 12개월 흐름. 결제한 화면에만 값이 온다. */
export function MonthBars({ view }: { view: ProductView }) {
  if (!view.months) return null;
  return (
    <section className="card">
      <h2>{view.labels.months}</h2>
      <div className="bars">
        {view.months.rows.map((m) => (
          <div className="bar" key={m.ym}>
            <span>{m.label}</span>
            <div className="track"><div className={`fill g-${m.grade}`} style={{ width: `${m.score}%` }} /></div>
            <span className="num">{m.score}</span>
          </div>
        ))}
      </div>
      <p className="small" style={{ marginTop: 12 }}><strong>{view.labels.best}</strong>: {view.months.best.join(' · ')}</p>
      <p className="small"><strong>{view.labels.caution}</strong>: {view.months.caution.join(' · ')}</p>
    </section>
  );
}

/** 신년운세·궁합의 결과 화면. 무료 결과와 결제 상자, 결제 후에는 열린 값 전체를 보여준다. */
export function ProductResult({ view, locale }: { view: ProductView; locale: Locale }) {
  const t = ui(locale);
  const x = productUi(locale);
  const l = legal(locale);
  const [email, setEmail] = useState('');
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const emailOk = /^\S+@\S+\.\S+$/.test(email.trim());
  // 결제 상자가 화면에 보이는 동안에는 하단 고정 버튼을 숨겨 버튼이 둘로 보이지 않게 한다.
  const payRef = useRef<HTMLElement>(null);
  const [atPay, setAtPay] = useState(false);
  useEffect(() => {
    if (!payRef.current) return;
    const observer = new IntersectionObserver(([entry]) => setAtPay(entry.isIntersecting));
    observer.observe(payRef.current);
    return () => observer.disconnect();
  }, []);

  async function unlock() {
    setPaying(true);
    setError(null);
    try {
      const order = await api<{ approveUrl?: string }>('/api/orders', { readingId: view.id, locale, tier: 'basic', email: email.trim() });
      window.location.assign(order.approveUrl ?? `/${locale}/report?id=${view.id}`);
    } catch {
      setError(t.loadFailed);
      setPaying(false);
    }
  }

  return (
    <div className="stack-lg">
      <h1 style={{ fontSize: 24 }}>{view.headline}</h1>
      <ScoreCard view={view} />
      <ScoreBars view={view} locale={locale} />
      {view.months ? <MonthBars view={view} /> : (
        <section className="card center">
          <h2>{view.labels.bestMonth}</h2>
          <p className="score-big"><b>{view.bestMonth}</b></p>
          <p className="small muted">{view.labels.lockedNote}</p>
        </section>
      )}
      {view.notes.map((n) => (
        <section className="card" key={n.title}>
          <h2>{n.title}</h2>
          {n.lines.map((line) => <p key={line} style={{ marginBottom: 8 }}>{line}</p>)}
        </section>
      ))}
      {view.charts.map((c) => (
        <Pillars key={c.name} reading={c} t={t} title={view.charts.length > 1 ? `${view.labels.chart} · ${c.name}` : view.labels.chart} />
      ))}

      <section className="card toc">
        <h2>{t.tocTitle}</h2>
        <ol>
          {view.toc.map((c) => (
            <li key={c.no}>
              <img src={`/chapters/${c.no}.jpg`} alt="" loading="lazy" />
              <div>
                <div><span className="no">{String(c.no).padStart(2, '0')}</span><strong>{c.title}</strong></div>
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

      {!view.paid && view.price && (
        <section className="card stack" id="pay" ref={payRef}>
          <h2 style={{ marginBottom: 0 }}>{x.payTitle}</h2>
          <p className="muted">{fill(x.payBody, { n: view.toc.length })}</p>
          <div className="field">
            <label htmlFor="email">{t.emailLabel}</label>
            <input id="email" className="input" type="email" autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
            <span className="small muted">{t.emailHint}</span>
          </div>
          {t.payNotice && <p className="notice small">{t.payNotice}</p>}
          <button type="button" className="btn block" disabled={paying || !emailOk} onClick={unlock}>
            {paying ? t.processing : fill(x.payCta, { price: view.price.display })}
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
      {error && <p className="error" role="alert">{error}</p>}

      <div className="sticky" hidden={atPay}>
        <div className="inner">
          {view.paid
            ? <Link className="btn block" href={`/${locale}/report?id=${view.id}`}>{t.openReport}</Link>
            : <a className="btn block" href="#pay">{view.price ? fill(x.payCta, { price: view.price.display }) : t.unlock}</a>}
        </div>
      </div>
    </div>
  );
}
