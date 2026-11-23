'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import { DEFAULT_TZ, ui, type Locale, type Text } from '@/lib/ui';
import { RELATIONS, productUi, type Product, type ProductUi, type Relation } from '@/lib/ui-products';

interface Person {
  name: string; gender: 'male' | 'female' | null;
  calendar: 'solar' | 'lunar'; leapMonth: boolean; year: string; month: string; day: string;
  hour: string; minute: string; timeUnknown: boolean; timeZone: string; jasi: 'midnight' | 'jasi' | 'split';
}

const blank = (timeZone: string): Person => ({
  name: '', gender: null, calendar: 'solar', leapMonth: false, year: '', month: '', day: '',
  hour: '', minute: '', timeUnknown: false, timeZone, jasi: 'midnight',
});

const num = (v: string) => (v.trim() === '' ? NaN : Number(v));
const inRange = (v: string, lo: number, hi: number) => Number.isInteger(num(v)) && num(v) >= lo && num(v) <= hi;

const complete = (p: Person) =>
  p.name.trim().length > 0 && p.gender !== null
  && inRange(p.year, 1900, new Date().getFullYear()) && inRange(p.month, 1, 12) && inRange(p.day, 1, 31)
  && (p.timeUnknown || (inRange(p.hour, 0, 23) && (p.minute === '' || inRange(p.minute, 0, 59))));

const payload = (p: Person) => ({
  name: p.name.trim(),
  birth: {
    calendar: p.calendar, year: num(p.year), month: num(p.month), day: num(p.day),
    ...(p.calendar === 'lunar' ? { leapMonth: p.leapMonth } : {}),
    ...(p.timeUnknown ? {} : { hour: num(p.hour), minute: p.minute === '' ? 0 : num(p.minute), jasi: p.jasi }),
    timeUnknown: p.timeUnknown, timeZone: p.timeZone, gender: p.gender,
  },
});

function PersonFields({ id, legend, value, set, zones, t, x }: {
  id: string; legend: string | null; value: Person; set: (patch: Partial<Person>) => void; zones: string[]; t: Text; x: ProductUi;
}) {
  const text = (key: 'name' | 'year' | 'month' | 'day' | 'hour' | 'minute', label: string, placeholder: string, numeric = true) => (
    <div className="field">
      <label htmlFor={`${id}-${key}`}>{label}</label>
      <input
        id={`${id}-${key}`} className="input" inputMode={numeric ? 'numeric' : undefined} maxLength={numeric ? 4 : 30}
        value={value[key]} onChange={(e) => set({ [key]: e.target.value })} placeholder={placeholder}
      />
    </div>
  );
  return (
    <fieldset className="card stack person">
      {legend && <legend>{legend}</legend>}
      {text('name', x.name, '', false)}
      <div className="field">
        <span className="label">{x.gender}</span>
        <div className="chips">
          <button type="button" className="chip" aria-pressed={value.gender === 'male'} onClick={() => set({ gender: 'male' })}>{t.male}</button>
          <button type="button" className="chip" aria-pressed={value.gender === 'female'} onClick={() => set({ gender: 'female' })}>{t.female}</button>
        </div>
      </div>
      <div className="field">
        <span className="label">{x.birthDate}</span>
        <div className="chips">
          <button type="button" className="chip" aria-pressed={value.calendar === 'solar'} onClick={() => set({ calendar: 'solar' })}>{t.solar}</button>
          <button type="button" className="chip" aria-pressed={value.calendar === 'lunar'} onClick={() => set({ calendar: 'lunar' })}>{t.lunar}</button>
        </div>
      </div>
      <div className="row">
        {text('year', t.year, '1992')}
        {text('month', t.month, '3')}
        {text('day', t.day, '15')}
      </div>
      {value.calendar === 'lunar' && (
        <label className="check"><input type="checkbox" checked={value.leapMonth} onChange={(e) => set({ leapMonth: e.target.checked })} />{t.leapMonth}</label>
      )}
      <div className="field">
        <span className="label">{x.birthTime}</span>
        <label className="check"><input type="checkbox" checked={value.timeUnknown} onChange={(e) => set({ timeUnknown: e.target.checked })} />{t.timeUnknown}</label>
      </div>
      {!value.timeUnknown && (
        <div className="row">
          {text('hour', t.hour, '10')}
          {text('minute', t.minute, '30')}
        </div>
      )}
      {!value.timeUnknown && num(value.hour) === 23 && (
        <div className="field">
          <label htmlFor={`${id}-jasi`}>{t.jasi}</label>
          <select id={`${id}-jasi`} className="input" value={value.jasi} onChange={(e) => set({ jasi: e.target.value as Person['jasi'] })}>
            <option value="midnight">{t.jasiMidnight}</option>
            <option value="jasi">{t.jasiNext}</option>
            <option value="split">{t.jasiSplit}</option>
          </select>
        </div>
      )}
      <div className="field">
        <label htmlFor={`${id}-tz`}>{t.timeZone}</label>
        <select id={`${id}-tz`} className="input" value={value.timeZone} onChange={(e) => set({ timeZone: e.target.value })}>
          {(zones.includes(value.timeZone) ? zones : [value.timeZone, ...zones]).map((z) => <option key={z} value={z}>{z.replaceAll('_', ' ')}</option>)}
        </select>
      </div>
    </fieldset>
  );
}

/** 신년운세(한 사람)와 궁합(두 사람)의 입력 화면. 한 화면에서 모두 입력한다. */
export function ProductForm({ locale, product }: { locale: Locale; product: Product }) {
  const t = ui(locale);
  const x = productUi(locale);
  const router = useRouter();
  const [people, setPeople] = useState<Person[]>(() => Array.from({ length: product === 'compat' ? 2 : 1 }, () => blank(DEFAULT_TZ[locale])));
  const [relation, setRelation] = useState<Relation>('dating');
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const zones = useMemo(() => {
    try {
      return Intl.supportedValuesOf('timeZone');
    } catch {
      return [DEFAULT_TZ[locale]];
    }
  }, [locale]);

  // 브라우저의 시간대를 기본값으로 둔다.
  useEffect(() => {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timeZone) setPeople((list) => list.map((p) => ({ ...p, timeZone })));
    } catch {
      // 알 수 없으면 언어별 기본 시간대를 그대로 둔다.
    }
  }, []);

  const set = (i: number) => (patch: Partial<Person>) => setPeople((list) => list.map((p, j) => (j === i ? { ...p, ...patch } : p)));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    if (!people.every(complete)) {
      setError(x.invalid);
      return;
    }
    setSending(true);
    setError(null);
    try {
      const body = product === 'compat'
        ? { product, relation, a: payload(people[0]), b: payload(people[1]) }
        : { product, ...payload(people[0]) };
      const { id } = await api<{ id: string }>(`/api/readings?locale=${locale}`, body);
      router.push(`/${locale}/result?id=${id}`);
    } catch {
      setError(t.loadFailed);
      setSending(false);
    }
  }

  return (
    <form className="stack-lg" onSubmit={submit}>
      <div><h1>{x[product].title}</h1><p className="muted">{x[product].hint}</p></div>
      {product === 'compat' && (
        <div className="field">
          <span className="label">{x.relationTitle}</span>
          <div className="chips">
            {RELATIONS.map((r) => (
              <button type="button" key={r} className="chip" aria-pressed={relation === r} onClick={() => setRelation(r)}>{x.relations[r]}</button>
            ))}
          </div>
        </div>
      )}
      {people.map((p, i) => (
        <PersonFields key={i} id={`p${i}`} legend={product === 'compat' ? [x.me, x.partner][i] : null} value={p} set={set(i)} zones={zones} t={t} x={x} />
      ))}
      {error && <p className="error" role="alert">{error}</p>}
      <button type="submit" className="btn block" disabled={sending}>{sending ? t.sending : x.submit}</button>
    </form>
  );
}
