import type { Grade, Reading } from '@/lib/api';
import { fill, type Text as Ui } from '@/lib/ui';

/**
 * 판정 카드. 질문을 남겼으면 그 질문을 제목으로 올리고, 도장(계산으로 정한 판정) 아래에 질문에 대한 답을 붙인다.
 * answer: undefined = 답을 받아오는 중, null = 답 없음.
 */
export function VerdictCard({ reading, t, answer = null }: { reading: Reading; t: Ui; answer?: string | null }) {
  const v = reading.verdictCard;
  return (
    <section className="card verdict">
      <p className="eyebrow">{fill(t.verdictOf, { name: reading.name })}</p>
      {reading.question ? (
        <>
          <p className="q asked">“{reading.question}”</p>
          <p className="small muted">{v.question}</p>
        </>
      ) : (
        <p className="q">{v.question}</p>
      )}
      <div className="seal">{v.answer}</div>
      <p className="when">{v.whenLabel} · <b>{v.when}</b></p>
      {reading.question && answer === undefined && <p className="answer muted" role="status">{t.answering}</p>}
      {answer && <p className="answer">{answer}</p>}
      <p className="summary">{v.summary}</p>
      <p className="small muted reason"><strong>{t.confidence}: {v.confidence}</strong> — {v.confidenceReason}</p>
      {v.noteMonth && (
        <p className="small" style={{ marginTop: 14 }}>
          <span className="muted">{t.mentioned}: </span>{v.noteMonth.month} · <GradeDot grade={v.noteMonth.grade} />{v.noteMonth.label}
        </p>
      )}
      <p className="basis">{v.basis}</p>
    </section>
  );
}

export function Now({ reading, t }: { reading: Reading; t: Ui }) {
  return (
    <section className="card">
      <h2>{t.nowTitle}</h2>
      <div className="bars">
        {reading.now.map((n) => (
          <div className="now" key={n.label}>
            <div className="bar">
              <span><strong>{n.label}</strong></span>
              <div className="track"><div className={`fill g-${n.grade}`} style={{ width: `${n.score}%` }} /></div>
              <span className="num">{n.score}</span>
            </div>
            <p className="small muted">{n.value} · {n.gradeLabel}</p>
          </div>
        ))}
      </div>
      <p className="small muted legend-row">
        {reading.legend.map((l) => (
          <span key={l.grade}><GradeDot grade={l.grade} />{l.label} {l.min > 0 ? `${l.min}+` : `<${reading.legend[3].min}`}</span>
        ))}
      </p>
      <p className="small muted">{t.legendNote}</p>
    </section>
  );
}

export function GradeDot({ grade }: { grade: Grade }) {
  return <span className={`dot g-${grade}`} aria-hidden="true" />;
}

export function Pillars({ reading, t }: { reading: Reading; t: Ui }) {
  return (
    <section className="card">
      <h2>{t.pillarsTitle}</h2>
      <div className="pillars">
        {reading.pillars.map((p) => (
          <div className="pillar" key={p.key}>
            <span className="small muted">{p.label}</span>
            {p.present ? (
              <>
                <div className={`cell el-${p.stem.element}`}>{p.stem.hanja}<small>{p.stem.god}</small></div>
                <div className={`cell el-${p.branch.element}`}>{p.branch.hanja}<small>{p.branch.god}</small></div>
              </>
            ) : (
              <>
                <div className="cell empty">—</div>
                <div className="cell empty">—</div>
              </>
            )}
          </div>
        ))}
      </div>
      <p className="small muted" style={{ marginTop: 12 }}>
        {reading.dayMaster.label}: {reading.dayMaster.hanja} ({reading.dayMaster.element}) · {t.strength}: {reading.strength.label}
      </p>
    </section>
  );
}

export function Elements({ reading, t }: { reading: Reading; t: Ui }) {
  return (
    <section className="card">
      <h2>{t.elementsTitle}</h2>
      <div className="bars">
        {reading.elements.map((e) => (
          <div className="bar" key={e.key}>
            <span>{e.label}</span>
            <div className="track"><div className={`fill el-${e.key}`} style={{ width: `${e.pct}%` }} /></div>
            <span className="num">{e.pct}%</span>
          </div>
        ))}
      </div>
      {reading.elementNotes.map((note) => <p className="small muted" style={{ marginTop: 10 }} key={note}>{note}</p>)}
    </section>
  );
}

export function Traits({ reading, t }: { reading: Reading; t: Ui }) {
  return (
    <section className="card">
      <h2>{t.traitsTitle}</h2>
      <div className="bars">
        {reading.traits.map((tr) => (
          <div className="bar" key={tr.group}>
            <span>{tr.label}</span>
            <div className="track"><div className="fill" style={{ width: `${tr.score}%` }} /></div>
            <span className="num">{tr.score}</span>
          </div>
        ))}
      </div>
      <p className="small muted" style={{ marginTop: 12 }}>{reading.traitLine}</p>
    </section>
  );
}

export function Flows({ reading, t }: { reading: Reading; t: Ui }) {
  return (
    <>
      <section className="card">
        <h2>{t.basisTitle}</h2>
        <p><strong>{t.patternLabel}: {reading.basis.pattern}</strong></p>
        {reading.basis.patternNote && <p className="small muted">{reading.basis.patternNote}</p>}
        <p style={{ marginTop: 10 }}>{reading.basis.rolesLine}</p>
      </section>
      <section className="card">
        <h2>{t.daeunTitle}</h2>
        <div className="flow">
          {reading.daeun.map((d) => (
            <div className={`item${d.current ? ' now' : ''}`} key={d.startYear}>
              <span className="gz">{d.ganji}</span>
              <span>
                {fill(t.age, { from: d.startAge, to: d.endAge })} · {d.startYear} · {d.stage}{d.current ? ` · ${t.current}` : ''}
                <br /><span className="small muted">{d.roles}</span>
              </span>
              <span><GradeDot grade={d.grade} />{d.label} {d.score}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="card">
        <h2>{t.yearsTitle}</h2>
        <div className="flow">
          {reading.years.map((y) => (
            <div className="item" key={y.year}>
              <span className="gz">{y.ganji}</span>
              <span>{y.year}<br /><span className="small muted">{y.roles}</span></span>
              <span><GradeDot grade={y.grade} />{y.label} {y.score}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function Months({ reading, t }: { reading: Reading; t: Ui }) {
  if (!reading.months) return null;
  return (
    <section className="card">
      <h2>{t.calendarTitle}</h2>
      <div className="bars">
        {reading.months.map((m) => (
          <div className="bar" key={m.ym}>
            <span>{m.label}</span>
            <div className="track"><div className={`fill g-${m.grade}`} style={{ width: `${m.score}%` }} /></div>
            <span className="num">{m.score}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function LockedList({ reading, t }: { reading: Reading; t: Ui }) {
  return (
    <section className="card locked">
      <h2>{reading.paid ? t.answersTitle : t.lockedTitle}</h2>
      <ul>
        {reading.locked.map((l) => (
          <li key={l.q}>
            <span>{l.q} <span className="tag">{fill(t.chapterRef, { n: l.chapter })}</span></span>
            {l.answer ? <strong>{l.answer}</strong> : <span className="blur" role="img" aria-label={t.lockedHint} />}
          </li>
        ))}
      </ul>
      {!reading.paid && <p className="small muted">{t.lockedHint}</p>}
    </section>
  );
}

export function Proof({ reading, t }: { reading: Reading; t: Ui }) {
  if (!reading.proof) return null;
  return (
    <section className="card">
      <h2>{t.proofTitle}</h2>
      <p>{reading.proof}</p>
      <p className="small muted" style={{ marginTop: 10 }}>{t.proofNote}</p>
    </section>
  );
}

export function Stars({ reading, t }: { reading: Reading; t: Ui }) {
  if (!reading.sinsal.length) return null;
  return (
    <section className="card">
      <h2>{t.sinsalTitle}</h2>
      <p className="small muted">{t.sinsalSub}</p>
      <ul className="stars">
        {reading.sinsal.map((s) => (
          <li key={s.key}>
            <strong>{s.name}</strong> <span className="tag">{s.pillars.join(' · ')}</span>
            <div className="small muted">{s.meaning}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Interest({ rows, t }: { rows: { key: string; label: string; test: number; saju: number }[]; t: Ui }) {
  return (
    <section className="card">
      <h2>{t.interestTitle}</h2>
      <p className="small muted legend"><i className="swatch test" />{t.legendTest}<i className="swatch saju" />{t.legendSaju}</p>
      <div className="bars">
        {rows.map((r) => (
          <div className="bar" key={r.key}>
            <span>{r.label}</span>
            <div className="pair">
              <div className="track"><div className="fill test" style={{ width: `${r.test}%` }} /></div>
              <div className="track"><div className="fill saju" style={{ width: `${r.saju}%` }} /></div>
            </div>
            <span className="num">{r.test}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
