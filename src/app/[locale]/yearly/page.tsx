import { notFound } from 'next/navigation';
import { ProductForm } from '@/components/ProductForm';
import { pageMeta } from '@/lib/seo';
import { isLocale } from '@/lib/ui';
import { productUi } from '@/lib/ui-products';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const x = productUi(locale).yearly;
  return pageMeta(locale, '/yearly', x.seoTitle, x.seoDescription);
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ProductForm locale={locale} product="yearly" />;
}
