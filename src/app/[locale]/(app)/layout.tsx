import type { ReactNode } from 'react';

// 개인 결과, 리포트, 결제, 검사 화면은 검색 결과에 올리지 않는다.
export const metadata = { robots: { index: false, follow: false } };

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return children;
}
