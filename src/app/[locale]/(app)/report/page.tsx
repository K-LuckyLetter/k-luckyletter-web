'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, use, useEffect, useState } from 'react';
import { Interest, LockedList, Months, VerdictCard } from '@/components/ReadingBlocks';
import { MonthBars, ScoreBars, ScoreCard } from '@/components/ProductBlocks';
import { ApiError, api, isProduct, type Report } from '@/lib/api';
import { fill, isLocale, ui, type Locale } from '@/lib/ui';

const POLL_MS = 2500;

type Props = { params: Promise<{ locale: string }> };

/** 풀이 번호는 주소의 ?id= 로 받는다. 정적 배포에서는 번호가 들어간 경로를 미리 만들 수 없다. */
export default function Page(props: Props) {
  return <Suspense><ReportPage {...props} /></Suspense>;
}

function ReportPage({ params }: Props) {
  const { locale: raw } = use(params);
  const id = useSearchParams().get('id') ?? '';
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const t = ui(locale);

  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState<'unpaid' | 'failed' | null>(null);
  const [page, setPage] = useState(0);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let live = true;
    let timer: ReturnType<typeof setTimeout>;
    const load = (query: string) => {
      api<Report>(`/api/reports/${id}?locale=${locale}${query}`)
        .then((r) => {
          if (!live) return;
          setReport(r);
          setError(null);
          // 생성 중이면 끝날 때까지 다시 확인한다.
          if (r.status === 'generating') timer = setTimeout(() => load(''), POLL_MS);
        })
        .catch((e) => live && setError(e instanceof ApiError && e.status === 402 ? 'unpaid' : 'failed'));
    };
    load(retry ? '&retry=1' : '');
    return () => {
      live = false;
      clearTimeout(timer);
    };
  }, [id, locale, retry]);

  if (error === 'unpaid') {
    return (
      <div className="card stack center">
        <p>{t.lockedHint}</p>
        <Link className="btn block" href={`/${locale}/result?id=${id}`}>{t.backToResult}</Link>
      </div>
    );
  }
  if (error || (report?.status === 'failed' && !report.chapters.length)) {
    return (
      <div className="card stack center">
        <p className="error" role="alert">{error ? t.loadFailed : t.failed}</p>
        <button type="button" className="btn block" onClick={() => setRetry(retry + 1)}>{t.retry}</button>
      </div>
    );
  }
  if (!report || !report.chapters.length) {
    return (
      <div className="stack center" role="status">
        <div className="banner"><img src="/letter.jpg" alt="" /></div>
        <div className="spinner" />
        <h1 style={{ fontSize: 22 }}>{t.generating}</h1>
        <p className="muted">{t.generatingHint}</p>
      </div>
    );
  }

  const { chapters, reading, interest, mail } = report;
  const chapter = chapters[Math.min(page, chapters.length - 1)];
  const go = (n: number) => {
    setPage(n);
    document.getElementById('chapter')?.scrollIntoView();
    document.querySelectorAll('#chapter button')[n]?.scrollIntoView({ inline: 'center', block: 'nearest' });
  };

  return (
    <div className="stack-lg">
      {isProduct(reading) ? (
        <>
          <ScoreCard view={reading} />
          <ScoreBars view={reading} locale={locale} />
        </>
      ) : (
        <>
          <VerdictCard reading={reading} t={t} />
          <LockedList reading={reading} t={t} />
        </>
      )}

      <p className="small muted center">{mail?.status === 'sent' ? fill(t.mailSent, { to: mail.to }) : t.mailNotSent}</p>

      {!isProduct(reading) && reading.needsTest && (
        <div className="notice stack">
          <p>{t.testPending}</p>
          <Link className="btn block" href={`/${locale}/test?id=${id}`}>{t.testCta}</Link>
        </div>
      )}
      {report.status === 'generating' && <p className="notice" role="status">{t.writingMore}</p>}

      <nav className="tabs" aria-label={t.tocTitle} id="chapter">
        {chapters.map((c, i) => (
          <button type="button" key={c.no} aria-current={i === page} onClick={() => go(i)}>{c.no}. {c.label}</button>
        ))}
      </nav>

      <article className="chapter">
        <p className="eyebrow">
          {fill(t.chapterOf, { n: chapter.no, total: chapters.length })}
          {chapter.source === 'draft' && <> · <span className="tag">{t.draft}</span></>}
        </p>
        <h1>{chapter.title}</h1>
        <div className="banner art"><img src={`/chapters/${chapter.no}.jpg`} alt="" /></div>
        {isProduct(reading)
          ? ['y_months', 'c_timing'].includes(chapter.key) && <MonthBars view={reading} />
          : chapter.no === 10 && <Months reading={reading} t={t} />}
        {chapter.no === 11 && interest && <Interest rows={interest} t={t} />}
        {chapter.items.map((item) => (
          <section key={item.heading}>
            <h3>{item.heading}</h3>
            <p>{item.body}</p>
          </section>
        ))}

        <div className="pager">
          <button type="button" className="btn ghost" disabled={page === 0} onClick={() => go(page - 1)}>{t.prev}</button>
          <span className="mid">{chapter.no} / {chapters.length}</span>
          <button type="button" className="btn ghost" disabled={page === chapters.length - 1} onClick={() => go(page + 1)}>{t.nextChapter}</button>
        </div>
      </article>
    </div>
  );
}
