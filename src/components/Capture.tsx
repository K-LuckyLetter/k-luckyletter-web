'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { ui, type Locale } from '@/lib/ui';

/**
 * 결제 확정. auto 이면 화면에 들어오자마자 확정하고(결제사에서 돌아온 경우),
 * 아니면 버튼을 눌렀을 때 확정한다(모의 결제).
 */
export function Capture({ locale, auto }: { locale: Locale; auto: boolean }) {
  const t = ui(locale);
  const router = useRouter();
  const order = useSearchParams().get('order');
  const [busy, setBusy] = useState(auto);
  const [error, setError] = useState<string | null>(null);

  async function capture() {
    if (!order) return setError(t.notFound);
    setBusy(true);
    setError(null);
    try {
      const { readingId } = await api<{ readingId: string }>(`/api/orders/${order}/capture`, {});
      router.replace(`/${locale}/report?id=${readingId}`);
    } catch {
      setError(t.loadFailed);
      setBusy(false);
    }
  }

  useEffect(() => {
    // 서버의 결제 확정은 같은 주문에 여러 번 호출해도 한 번만 처리된다.
    if (auto) void capture();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card stack center">
      {auto ? <h1 style={{ fontSize: 22 }}>{t.processing}</h1> : (
        <>
          <h1 style={{ fontSize: 22 }}>{t.mockTitle}</h1>
          <p className="muted">{t.mockBody}</p>
        </>
      )}
      {busy && <div className="spinner" role="status" aria-label={t.processing} />}
      {error && <p className="error" role="alert">{error}</p>}
      {(!auto || error) && (
        <button type="button" className="btn block" disabled={busy} onClick={capture}>{auto ? t.retry : t.mockPay}</button>
      )}
    </div>
  );
}
