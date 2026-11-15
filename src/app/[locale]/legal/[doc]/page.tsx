import { notFound } from 'next/navigation';
import { LEGAL_DOCS, isLegalDoc, legal } from '@/lib/legal';
import { pageMeta } from '@/lib/seo';
import { isLocale } from '@/lib/ui';

type Props = { params: Promise<{ locale: string; doc: string }> };

// 정적 배포라 문서 세 개의 주소를 빌드할 때 미리 만든다.
export const dynamicParams = false;
export function generateStaticParams() {
  return LEGAL_DOCS.map((doc) => ({ doc }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, doc } = await params;
  if (!isLocale(locale) || !isLegalDoc(doc)) return {};
  const d = legal(locale).docs[doc];
  return pageMeta(locale, `/legal/${doc}`, `${d.title} | K-LuckyLetter`, d.intro.slice(0, 160));
}

export default async function LegalPage({ params }: Props) {
  const { locale, doc } = await params;
  if (!isLocale(locale) || !isLegalDoc(doc)) notFound();
  const l = legal(locale);
  const d = l.docs[doc];
  return (
    <article className="card legal">
      <h1>{d.title}</h1>
      <p className="small muted">{l.updatedLabel}</p>
      <p>{d.intro}</p>
      {d.sections.map((s) => (
        <section key={s.heading}>
          <h2>{s.heading}</h2>
          {s.body.map((p) => <p key={p}>{p}</p>)}
        </section>
      ))}
    </article>
  );
}
