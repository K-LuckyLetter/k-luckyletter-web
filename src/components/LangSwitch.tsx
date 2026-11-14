'use client';

import { usePathname, useRouter } from 'next/navigation';
import { LOCALES, LOCALE_NAMES, type Locale } from '@/lib/ui';

export function LangSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <select
      className="lang"
      aria-label="Language"
      value={locale}
      onChange={(e) => {
        // 같은 화면을 다른 언어로 연다. 쿼리(주문 번호 등)는 유지한다.
        const rest = pathname.split('/').slice(2).join('/');
        router.push(`/${e.target.value}${rest ? `/${rest}` : ''}${window.location.search}`);
      }}
    >
      {LOCALES.map((l) => <option key={l} value={l}>{LOCALE_NAMES[l]}</option>)}
    </select>
  );
}
