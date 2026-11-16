'use client';

import { useState } from 'react';
import type { Reading } from '@/lib/api';
import { SITE_URL } from '@/lib/seo';
import type { Locale, Text } from '@/lib/ui';

const W = 1080;
const H = 1350;
const PAPER = '#f6f1e7';
const INK = '#1f1b16';
const MUTED = '#6f665a';
const SEAL = '#b8372b';
const SEAL_SOFT = '#f5e1dc';
const LINE = '#e2d9c8';
const SERIF = "'Iowan Old Style', 'Palatino Linotype', 'Noto Serif KR', 'Noto Serif JP', 'Songti SC', 'Hiragino Mincho ProN', serif";
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Apple SD Gothic Neo', 'Hiragino Sans', 'PingFang SC', 'Noto Sans KR', sans-serif";

/** 폭에 맞춰 줄을 나눈다. 띄어쓰기가 없는 언어는 글자 단위로 나눈다. */
function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const units = text.includes(' ') ? text.split(/(?<= )/) : [...text];
  const lines: string[] = [];
  let line = '';
  for (const unit of units) {
    if (line && ctx.measureText((line + unit).trimEnd()).width > maxWidth) {
      lines.push(line.trimEnd());
      line = unit;
    } else line += unit;
  }
  if (line.trim()) lines.push(line.trimEnd());
  return lines;
}

/** 폭을 넘지 않는 가장 큰 글자 크기로 맞춘다. */
function fit(ctx: CanvasRenderingContext2D, text: string, family: string, weight: number, size: number, maxWidth: number) {
  for (let px = size; px > 24; px -= 4) {
    ctx.font = `${weight} ${px}px ${family}`;
    if (ctx.measureText(text).width <= maxWidth) return px;
  }
  return 24;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** 판정 카드 그림. 이름·생년월일·남긴 질문 같은 개인 정보는 넣지 않고 판정과 시기만 담는다. */
async function draw(reading: Reading, t: Text): Promise<Blob> {
  const v = reading.verdictCard;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = LINE;
  ctx.lineWidth = 3;
  ctx.strokeRect(40, 40, W - 80, H - 80);

  const mark = await loadImage('/icon.svg');
  ctx.drawImage(mark, W / 2 - 48, 120, 96, 96);
  ctx.fillStyle = INK;
  ctx.font = `600 46px ${SERIF}`;
  ctx.fillText(t.brand, W / 2, 268);
  ctx.fillStyle = SEAL;
  ctx.font = `500 30px ${SANS}`;
  ctx.fillText(t.tagline.toUpperCase(), W / 2, 326);

  ctx.fillStyle = INK;
  ctx.font = `600 62px ${SERIF}`;
  const question = wrap(ctx, v.question, W - 240).slice(0, 2);
  question.forEach((line, i) => ctx.fillText(line, W / 2, 500 + i * 84 - (question.length - 1) * 42));

  // 도장: 결과 화면의 판정 도장과 같은 모양.
  const size = fit(ctx, v.answer, SERIF, 700, 132, W - 340);
  const sealW = Math.max(ctx.measureText(v.answer).width + 150, 420);
  const sealH = size + 130;
  ctx.save();
  ctx.translate(W / 2, 760);
  ctx.rotate((-2 * Math.PI) / 180);
  ctx.fillStyle = SEAL_SOFT;
  ctx.strokeStyle = SEAL;
  for (const [inset, width] of [[0, 7], [16, 3]] as const) {
    ctx.beginPath();
    ctx.roundRect(-sealW / 2 + inset, -sealH / 2 + inset, sealW - inset * 2, sealH - inset * 2, 30 - inset / 2);
    if (inset === 0) ctx.fill();
    ctx.lineWidth = width;
    ctx.stroke();
  }
  ctx.fillStyle = SEAL;
  ctx.fillText(v.answer, 0, 6);
  ctx.restore();

  ctx.fillStyle = MUTED;
  ctx.font = `400 38px ${SANS}`;
  ctx.fillText(v.whenLabel, W / 2, 990);
  ctx.fillStyle = INK;
  ctx.font = `600 ${fit(ctx, v.when, SERIF, 600, 68, W - 240)}px ${SERIF}`;
  ctx.fillText(v.when, W / 2, 1066);

  ctx.fillStyle = LINE;
  ctx.fillRect(W / 2 - 60, 1150, 120, 3);
  ctx.fillStyle = MUTED;
  ctx.font = `400 34px ${SANS}`;
  ctx.fillText(t.shareCardCta, W / 2, 1204);
  ctx.fillStyle = INK;
  ctx.font = `600 38px ${SANS}`;
  ctx.fillText(SITE_URL.replace('https://', ''), W / 2, 1258);

  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('no image'))), 'image/png'));
}

/** 판정을 그림 한 장으로 공유하거나 저장한다. 링크는 개인 결과가 아니라 첫 화면으로 건다. */
export function ShareCard({ reading, t, locale }: { reading: Reading; t: Text; locale: Locale }) {
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  async function share() {
    setBusy(true);
    try {
      const file = new File([await draw(reading, t)], 'k-luckyletter.png', { type: 'image/png' });
      const data = { files: [file], text: `${t.shareText} ${SITE_URL}/${locale}` };
      if (navigator.canShare?.(data)) {
        await navigator.share(data);
      } else {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = file.name;
        link.click();
        URL.revokeObjectURL(link.href);
        setSaved(true);
      }
    } catch {
      // 공유 창을 닫은 경우다. 따로 알릴 일이 없다.
    }
    setBusy(false);
  }

  return (
    <div className="stack center" style={{ gap: 8 }}>
      <button type="button" className="btn ghost block" disabled={busy} onClick={share}>{t.shareCta}</button>
      <p className="small muted" role="status">{saved ? t.shareSaved : t.shareHint}</p>
    </div>
  );
}
