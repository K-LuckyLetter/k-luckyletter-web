'use client';

import { useEffect } from 'react';
import { ADSENSE_CLIENT, ADSENSE_SLOT } from '@/lib/seo';
import type { Locale } from '@/lib/ui';

const LABEL: Record<Locale, string> = { ko: '광고', en: 'Advertisement', ja: '広告', zh: '广告' };

/**
 * 메인 화면 맨 아래의 배너 광고 한 칸(Google AdSense). 게시자 ID와 광고 단위 ID가 둘 다 있을 때만 나온다.
 * 높이를 미리 잡아 두어 광고가 늦게 떠도 화면이 밀리지 않고, 채울 광고가 없으면 칸 전체가 사라진다(globals.css).
 */
export function AdSlot({ locale }: { locale: Locale }) {
  const on = Boolean(ADSENSE_CLIENT && ADSENSE_SLOT);
  useEffect(() => {
    if (!on) return;
    try {
      const w = window as unknown as { adsbygoogle?: object[] };
      (w.adsbygoogle ??= []).push({});
    } catch {
      // 광고 차단 등으로 실패해도 화면에는 영향이 없다.
    }
  }, [on]);
  if (!on) return null;
  return (
    <aside className="ad" aria-label={LABEL[locale]}>
      <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`} crossOrigin="anonymous" />
      <p className="ad-label">{LABEL[locale]}</p>
      <ins className="adsbygoogle" data-ad-client={ADSENSE_CLIENT} data-ad-slot={ADSENSE_SLOT} />
    </aside>
  );
}
