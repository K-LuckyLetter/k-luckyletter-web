'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, use, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { fill, isLocale, ui, type Locale } from '@/lib/ui';

interface Test { questions: string[]; scale: string[] }

type Props = { params: Promise<{ locale: string }> };

/** 풀이 번호는 주소의 ?id= 로 받는다. 정적 배포에서는 번호가 들어간 경로를 미리 만들 수 없다. */
export default function Page(props: Props) {
  return <Suspense><TestPage {...props} /></Suspense>;
}

function TestPage({ params }: Props) {
  const { locale: raw } = use(params);
  const id = useSearchParams().get('id') ?? '';
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const t = ui(locale);
  const router = useRouter();

  const [test, setTest] = useState<Test | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let live = true;
    api<Test>(`/api/riasec?locale=${locale}`)
      .then((r) => live && setTest(r))
      .catch(() => live && setError(t.loadFailed));
    return () => { live = false; };
  }, [locale, t.loadFailed]);

  if (!test) return error ? <p className="error" role="alert">{error}</p> : <div className="spinner" role="status" />;

  const total = test.questions.length;
  const done = Object.keys(answers).length;

  async function submit() {
    setSending(true);
    setError(null);
    try {
      await api(`/api/readings/${id}/riasec`, { answers: test!.questions.map((_, i) => answers[i]) });
      router.replace(`/${locale}/report?id=${id}`);
    } catch {
      setError(t.loadFailed);
      setSending(false);
    }
  }

  return (
    <div className="stack">
      <div><h1 style={{ fontSize: 26 }}>{t.testTitle}</h1><p className="muted">{t.testIntro}</p></div>
      <div>
        {test.questions.map((q, i) => (
          <div className="question" key={q}>
            <p>{i + 1}. {q}</p>
            <div className="scale" role="group" aria-label={q}>
              {test.scale.map((label, v) => (
                <button type="button" key={label} aria-pressed={answers[i] === v + 1} onClick={() => setAnswers((prev) => ({ ...prev, [i]: v + 1 }))}>{label}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      <div className="sticky">
        <div className="inner">
          <button type="button" className="btn block" disabled={done < total || sending} onClick={submit}>
            {done < total ? fill(t.testProgress, { n: done, total }) : t.testSubmit}
          </button>
        </div>
      </div>
    </div>
  );
}
