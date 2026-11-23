export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function api<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(API_URL + path, body === undefined ? undefined : {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new ApiError(res.status, await res.text());
  return res.json() as Promise<T>;
}

export type Tier = 'basic' | 'deep';
export type Grade = 'great' | 'good' | 'mixed' | 'caution' | 'hard';
export type Element = 'wood' | 'fire' | 'earth' | 'metal' | 'water';

export interface Price { display: string }

export interface SituationOption {
  key: string; label: string; sub: string; detailLabel: string; details: string[];
  detailRequired: boolean; jobLabel: string | null; placeholder: string; suggested: string[];
}
export interface WizardContent { jobFields: string[]; situations: SituationOption[] }

interface Glyph { hanja: string; ko: string; element: Element; god: string }
export type PillarView =
  | { key: string; label: string; present: false }
  | { key: string; label: string; present: true; stem: Glyph; branch: Glyph };

export interface Reading {
  id: string; paid: boolean; tier: Tier | null; needsTest: boolean; name: string; headline: string;
  verdictCard: {
    situation: string; detail: string | null; question: string; answer: string; tone: 'go' | 'steady' | 'wait';
    confidence: string; confidenceReason: string; summary: string; whenLabel: string; when: string; basis: string;
    noteMonth: { month: string; grade: Grade; label: string } | null;
  };
  question: string | null;
  now: { label: string; value: string; grade: Grade; gradeLabel: string; score: number }[];
  basis: { pattern: string; patternNote: string | null; rolesLine: string };
  legend: { grade: Grade; label: string; min: number }[];
  elementNotes: string[];
  proof: string | null;
  sinsal: { key: string; name: string; meaning: string; pillars: string[] }[];
  dayMaster: { label: string; text: string; hanja: string; element: string };
  pillars: PillarView[];
  elements: { key: Element; label: string; count: number; pct: number }[];
  strength: { label: string; pct: number };
  traits: { group: string; label: string; sub: string; score: number }[];
  traitLine: string;
  daeun: { ganji: string; startAge: number; endAge: number; startYear: number; score: number; grade: Grade; label: string; stage: string; roles: string; current: boolean }[];
  years: { year: number; ganji: string; score: number; grade: Grade; label: string; roles: string }[];
  locked: { q: string; chapter: number; answer: string | null }[];
  months: { ym: string; label: string; score: number; grade: Grade; gradeLabel: string }[] | null;
  toc: { no: number; deep: boolean; label: string; title: string; items: string[] }[];
  prices: Record<Tier, Price>;
}

/** 명식 한 벌: 일간, 네 기둥, 일간의 힘. */
export interface ChartView {
  dayMaster: { label: string; text: string; hanja: string; element: string };
  pillars: PillarView[];
  strength: { label: string; pct: number };
}

/** 신년운세·궁합의 결과. 라벨까지 서버가 붙여서 내려준다. 무료 화면에서는 잠긴 점수가 null 이고 months 가 없다. */
export interface ProductView {
  id: string; product: 'yearly' | 'compat'; paid: boolean; name: string; title: string; headline: string;
  score: { label: string; value: number; grade: Grade; gradeLabel: string };
  summary: string[];
  basis: string;
  bars: { title: string; items: { label: string; score: number | null; grade: Grade | null; gradeLabel: string | null }[] };
  bestMonth: string;
  months: { rows: { ym: string; label: string; ganji: string; score: number; grade: Grade; gradeLabel: string }[]; best: string[]; caution: string[] } | null;
  notes: { title: string; lines: string[] }[];
  legend: { grade: Grade; label: string; min: number }[];
  scaleNote: string;
  labels: { total: string; locked: string; lockedNote: string; bestMonth: string; best: string; caution: string; months: string; chart: string };
  charts: (ChartView & { name: string })[];
  toc: { no: number; label: string; title: string; items: string[] }[];
  price?: Price;
}
export const isProduct = (r: Reading | ProductView): r is ProductView => 'product' in r;

export interface Chapter {
  no: number; key: string; label: string; title: string; source: 'ai' | 'draft';
  items: { heading: string; body: string }[];
}
export interface Report {
  status: 'generating' | 'completed' | 'failed';
  chapters: Chapter[];
  reading: Reading | ProductView;
  interest: { key: string; label: string; test: number; saju: number }[] | null;
  mail: { to: string; status: 'sent' | 'skipped' | 'failed' } | null;
}
