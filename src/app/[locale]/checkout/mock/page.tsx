import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Capture } from '@/components/Capture';
import { isLocale } from '@/lib/ui';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <Suspense>
      <Capture locale={locale} auto={false} />
    </Suspense>
  );
}
