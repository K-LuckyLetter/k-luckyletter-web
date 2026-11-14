'use client';

import { useRouter } from 'next/navigation';
import { use, useEffect, useMemo, useState } from 'react';
import { api, type WizardContent } from '@/lib/api';
import { DEFAULT_TZ, isLocale, ui, type Locale } from '@/lib/ui';

const STEPS = 6;
const CUSTOM_JOB = -1;

function timeZones(fallback: string): string[] {
  try {
    return Intl.supportedValuesOf('timeZone');
  } catch {
    return [fallback];
  }
}

function browserTimeZone(fallback: string) {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || fallback;
  } catch {
    return fallback;
  }
}

export default function Wizard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = use(params);
  const locale: Locale = isLocale(raw) ? raw : 'en';
  const t = ui(locale);
  const router = useRouter();

  const [content, setContent] = useState<WizardContent | null>(null);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const [calendar, setCalendar] = useState<'solar' | 'lunar'>('solar');
  const [leapMonth, setLeapMonth] = useState(false);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [timeUnknown, setTimeUnknown] = useState(false);
  const [timeZone, setTimeZone] = useState(DEFAULT_TZ[locale]);
  const [jasi, setJasi] = useState<'midnight' | 'jasi' | 'split'>('midnight');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [name, setName] = useState('');
  const [situation, setSituation] = useState<string | null>(null);
  const [detail, setDetail] = useState<number | null>(null);
  const [jobIndex, setJobIndex] = useState<number | null>(null);
  const [jobCustom, setJobCustom] = useState('');
  const [question, setQuestion] = useState('');

  const zones = useMemo(() => timeZones(DEFAULT_TZ[locale]), [locale]);

  useEffect(() => {
    setTimeZone(browserTimeZone(DEFAULT_TZ[locale]));
  }, [locale]);

  useEffect(() => {
    let live = true;
    api<WizardContent>(`/api/content?locale=${locale}`)
      .then((c) => live && setContent(c))
      .catch(() => live && setError(t.loadFailed));
    return () => { live = false; };
  }, [locale, t.loadFailed]);

  const selected = content?.situations.find((s) => s.key === situation) ?? null;
  const num = (v: string) => (v.trim() === '' ? NaN : Number(v));
  const inRange = (v: string, lo: number, hi: number) => Number.isInteger(num(v)) && num(v) >= lo && num(v) <= hi;

  const valid = [
    inRange(year, 1900, new Date().getFullYear()) && inRange(month, 1, 12) && inRange(day, 1, 31),
    timeUnknown || (inRange(hour, 0, 23) && (minute === '' || inRange(minute, 0, 59))),
    gender !== null,
    name.trim().length > 0,
    selected !== null && (!selected.detailRequired || detail !== null),
    true,
  ][step];

  async function submit(withQuestion: boolean) {
    setSending(true);
    setError(null);
    try {
      const { id } = await api<{ id: string }>(`/api/readings?locale=${locale}`, {
        birth: {
          calendar, year: num(year), month: num(month), day: num(day),
          ...(calendar === 'lunar' ? { leapMonth } : {}),
          ...(timeUnknown ? {} : { hour: num(hour), minute: minute === '' ? 0 : num(minute), jasi }),
          timeUnknown, timeZone, gender,
        },
        name: name.trim(),
        situation,
        detail,
        jobIndex: jobIndex !== null && jobIndex !== CUSTOM_JOB ? jobIndex : null,
        jobCustom: jobIndex === CUSTOM_JOB && jobCustom.trim() ? jobCustom.trim() : null,
        question: withQuestion ? question.trim() : '',
      });
      router.push(`/${locale}/result?id=${id}`);
    } catch {
      setError(t.loadFailed);
      setSending(false);
    }
  }

  const pickSituation = (key: string) => {
    setSituation(key);
    setDetail(null);
    setJobIndex(null);
  };

  // 입력칸에서 Enter 를 누르면 다음 단계로 넘어간다.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < STEPS - 1) {
      if (valid) setStep(step + 1);
    } else if (!sending) void submit(true);
  };

  return (
    <form className="step" onSubmit={onSubmit}>
      <div className="progress" aria-hidden="true">
        {Array.from({ length: STEPS }, (_, i) => <span key={i} className={i <= step ? 'on' : ''} />)}
      </div>

      {step === 0 && (
        <div className="stack">
          <div><h1>{t.birthTitle}</h1><p className="muted">{t.birthHint}</p></div>
          <div className="chips">
            <button type="button" className="chip" aria-pressed={calendar === 'solar'} onClick={() => setCalendar('solar')}>{t.solar}</button>
            <button type="button" className="chip" aria-pressed={calendar === 'lunar'} onClick={() => setCalendar('lunar')}>{t.lunar}</button>
          </div>
          <div className="row">
            <div className="field"><label htmlFor="y">{t.year}</label><input id="y" className="input" inputMode="numeric" value={year} onChange={(e) => setYear(e.target.value)} placeholder="1992" /></div>
            <div className="field"><label htmlFor="m">{t.month}</label><input id="m" className="input" inputMode="numeric" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="3" /></div>
            <div className="field"><label htmlFor="d">{t.day}</label><input id="d" className="input" inputMode="numeric" value={day} onChange={(e) => setDay(e.target.value)} placeholder="15" /></div>
          </div>
          {calendar === 'lunar' && (
            <label className="check"><input type="checkbox" checked={leapMonth} onChange={(e) => setLeapMonth(e.target.checked)} />{t.leapMonth}</label>
          )}
        </div>
      )}

      {step === 1 && (
        <div className="stack">
          <div><h1>{t.timeTitle}</h1><p className="muted">{t.timeHint}</p></div>
          {!timeUnknown && (
            <div className="row">
              <div className="field"><label htmlFor="h">{t.hour}</label><input id="h" className="input" inputMode="numeric" value={hour} onChange={(e) => setHour(e.target.value)} placeholder="10" /></div>
              <div className="field"><label htmlFor="mi">{t.minute}</label><input id="mi" className="input" inputMode="numeric" value={minute} onChange={(e) => setMinute(e.target.value)} placeholder="30" /></div>
            </div>
          )}
          <label className="check"><input type="checkbox" checked={timeUnknown} onChange={(e) => setTimeUnknown(e.target.checked)} />{t.timeUnknown}</label>
          <div className="field">
            <label htmlFor="tz">{t.timeZone}</label>
            <select id="tz" className="input" value={timeZone} onChange={(e) => setTimeZone(e.target.value)}>
              {(zones.includes(timeZone) ? zones : [timeZone, ...zones]).map((z) => <option key={z} value={z}>{z.replaceAll('_', ' ')}</option>)}
            </select>
          </div>
          {!timeUnknown && num(hour) === 23 && (
            <div className="field">
              <label htmlFor="jasi">{t.jasi}</label>
              <select id="jasi" className="input" value={jasi} onChange={(e) => setJasi(e.target.value as typeof jasi)}>
                <option value="midnight">{t.jasiMidnight}</option>
                <option value="jasi">{t.jasiNext}</option>
                <option value="split">{t.jasiSplit}</option>
              </select>
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="stack">
          <div><h1>{t.genderTitle}</h1><p className="muted">{t.genderHint}</p></div>
          <div className="grid2">
            <button type="button" className="choice" aria-pressed={gender === 'male'} onClick={() => setGender('male')}><strong>{t.male}</strong></button>
            <button type="button" className="choice" aria-pressed={gender === 'female'} onClick={() => setGender('female')}><strong>{t.female}</strong></button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="stack">
          <div><h1>{t.nameTitle}</h1><p className="muted">{t.nameHint}</p></div>
          <input className="input" aria-label={t.namePlaceholder} value={name} maxLength={30} onChange={(e) => setName(e.target.value)} placeholder={t.namePlaceholder} />
        </div>
      )}

      {step === 4 && (
        <div className="stack">
          <div><h1>{t.situationTitle}</h1><p className="muted">{t.situationHint}</p></div>
          <div className="grid2">
            {content?.situations.map((s) => (
              <button type="button" key={s.key} className="choice" aria-pressed={situation === s.key} onClick={() => pickSituation(s.key)}>
                <strong>{s.label}</strong><span>{s.sub}</span>
              </button>
            ))}
          </div>
          {selected && (
            <>
              <div className="field">
                <span className="label">{selected.detailLabel} ({selected.detailRequired ? t.required : t.optional})</span>
                <div className="chips">
                  {selected.details.map((d, i) => (
                    <button type="button" key={d} className="chip" aria-pressed={detail === i} onClick={() => setDetail(detail === i && !selected.detailRequired ? null : i)}>{d}</button>
                  ))}
                </div>
              </div>
              {selected.jobLabel && content && (
                <div className="field">
                  <span className="label">{selected.jobLabel} ({t.optional})</span>
                  <div className="chips">
                    {content.jobFields.map((j, i) => (
                      <button type="button" key={j} className="chip" aria-pressed={jobIndex === i} onClick={() => setJobIndex(jobIndex === i ? null : i)}>{j}</button>
                    ))}
                    <button type="button" className="chip" aria-pressed={jobIndex === CUSTOM_JOB} onClick={() => setJobIndex(jobIndex === CUSTOM_JOB ? null : CUSTOM_JOB)}>{t.jobCustom}</button>
                  </div>
                  {jobIndex === CUSTOM_JOB && (
                    <input className="input" aria-label={t.jobCustomPlaceholder} value={jobCustom} maxLength={30} onChange={(e) => setJobCustom(e.target.value)} placeholder={t.jobCustomPlaceholder} />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {step === 5 && selected && (
        <div className="stack">
          <div><h1>{t.questionTitle}</h1><p className="muted">{t.questionHint}</p></div>
          <div className="field">
            <input className="input" aria-label={t.questionTitle} value={question} maxLength={120} onChange={(e) => setQuestion(e.target.value)} placeholder={selected.placeholder} />
            <span className="small muted">{question.length} / 120</span>
          </div>
          <div className="chips">
            {selected.suggested.map((q) => <button type="button" key={q} className="chip" onClick={() => setQuestion(q)}>{q}</button>)}
          </div>
          <p className="small muted">{t.questionNote}</p>
        </div>
      )}

      {error && <p className="error" role="alert">{error}</p>}

      {step < STEPS - 1 ? (
        <div className="actions">
          <button type="button" className="btn ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>{t.back}</button>
          <button type="submit" className="btn" disabled={!valid}>{t.next}</button>
        </div>
      ) : (
        <div className="actions three">
          <button type="button" className="btn ghost" disabled={sending} onClick={() => setStep(step - 1)}>{t.back}</button>
          <button type="button" className="btn ghost" disabled={sending} onClick={() => submit(false)}>{t.skip}</button>
          <button type="submit" className="btn" disabled={sending}>{sending ? t.sending : t.submit}</button>
        </div>
      )}
    </form>
  );
}
