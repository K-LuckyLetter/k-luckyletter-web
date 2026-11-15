'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, use, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { isLocale, ui, type Locale } from '@/lib/ui';

function Cancelled({ locale }: { locale: Locale }) {
  const t = ui(locale);
  const order = useSearchParams().get('order');
  const [readingId, setReadingId] = useState<string | null>(null);

  // 취소한 사람이 다시 입력하지 않도록 보던 결과 화면으로 돌려보낸다.
  useEffect(() => {
    if (!order) return;
    api<{ readingId: string }>(`/api/orders/${order}`).then((r) => setReadingId(r.readingId)).catch(() => {});
  }, [order]);

  return (
    <div className="card stack center">
      <h1 style={{ fontSize: 22 }}>{t.cancelled}</h1>
      <Link className="btn block" href={readingId ? `/${locale}/result?id=${readingId}` : `/${locale}/career`}>
        {readingId ? t.backToResult : t.start}
      </Link>
    </div>
  );
}

export default function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  return <Suspense><Cancelled locale={isLocale(locale) ? locale : 'en'} /></Suspense>;
}
