import type { ReactNode } from 'react';

export const metadata = { title: 'K-LuckyLetter' };

/** 언어 없는 첫 주소(/) 전용 틀. 실제 화면의 틀은 [locale]/layout.tsx 에 있다. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
