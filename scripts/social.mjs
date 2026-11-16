// 일간 10종 홍보 카드(1080x1350)를 영어·일본어로 만든다.  실행: node scripts/social.mjs
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const PAPER = '#f6f1e7', INK = '#1f1b16', MUTED = '#6f665a', SEAL = '#b8372b', LINE = '#e2d9c8';
const COLOR = { wood: '#4f8a5b', fire: '#c8553d', earth: '#b08a3e', metal: '#8a8f98', water: '#3d6a96' };
const FONT = {
  en: { serif: "'Iowan Old Style', 'Palatino', serif", sans: "'Helvetica Neue', 'Arial', sans-serif" },
  ja: { serif: "'Hiragino Mincho ProN', serif", sans: "'Hiragino Sans', sans-serif" },
};
const HANJA_FONT = "'Hiragino Mincho ProN', 'Songti SC', serif";

const TEXT = {
  en: { eyebrow: 'KOREAN SAJU · DAY MASTER', weak: 'Weak spot', cta: "What's your Day Master? Free in one minute." },
  ja: { eyebrow: '韓国式四柱推命 · 日干', weak: '弱点', cta: 'あなたの日干は？無料で1分。' },
};

// [한자, 파일 이름, 오행, 영어(이름, 제목, 강점 3줄, 약점), 일본어(같은 순서)]
const CARDS = [
  ['甲', 'gap', 'wood', ['Gap · Yang Wood', 'The Tall Tree', ['Sets the goal first', 'Never wavers', 'Leads by direction'], 'would rather break than bend'],
    ['きのえ · 陽の木', '大木タイプ', ['目標を先に決める', 'ぶれずにまっすぐ伸びる', '背中で人を引っぱる'], '曲げるより折れるほう']],
  ['乙', 'eul', 'wood', ['Eul · Yin Wood', 'The Vine', ['Finds the way around', 'Reads people fast', 'Fits into any team'], 'leans on whoever is nearest'],
    ['きのと · 陰の木', 'つる草タイプ', ['回り道を見つける', '空気を読むのが早い', 'どんなチームにもなじむ'], '近くの人に頼りがち']],
  ['丙', 'byeong', 'fire', ['Byeong · Yang Fire', 'The Sun', ['Lifts the whole room', 'Born to present and sell', 'Gets things started'], 'starts more than it finishes'],
    ['ひのえ · 陽の火', '太陽タイプ', ['場を明るくする', '発表と営業が得意', '立ち上げに強い'], '終わらせるのが苦手']],
  ['丁', 'jeong', 'fire', ['Jeong · Yin Fire', 'The Candle', ['Lights one thing well', 'Warm and precise', 'Trusted with what matters'], 'burns out quietly'],
    ['ひのと · 陰の火', 'ろうそくタイプ', ['一つを丁寧に照らす', '温かく、正確', '大事な仕事を任される'], '静かに燃え尽きる']],
  ['戊', 'mu', 'earth', ['Mu · Yang Earth', 'The Mountain', ['Steady when things shake', 'Holds and protects', 'Built to manage'], 'slow to act'],
    ['つちのえ · 陽の土', '山タイプ', ['揺れる時ほど頼られる', '守りと管理に強い', 'どっしり構える'], '決断が遅い']],
  ['己', 'gi', 'earth', ['Gi · Yin Earth', 'The Field', ['Grows other people', 'Practical and patient', 'Makes rough ideas work'], "carries everyone's work"],
    ['つちのと · 陰の土', '畑タイプ', ['人を育てる', '現実的で細やか', 'アイデアを形にする'], '仕事を抱え込む']],
  ['庚', 'gyeong', 'metal', ['Gyeong · Yang Metal', 'The Blade', ['Decides fast', 'At its best in a crisis', 'Fair before liked'], 'wins the argument, loses the room'],
    ['かのえ · 陽の金', '刃タイプ', ['決断が早い', '危機に強い', '好かれるより公平に'], '言い方が直球すぎる']],
  ['辛', 'sin', 'metal', ['Sin · Yin Metal', 'The Jewel', ['Sharp eye for detail', 'High standards', 'Quality is the signature'], 'criticism cuts deep'],
    ['かのと · 陰の金', '宝石タイプ', ['小さなずれに気づく', '基準が高い', '仕上がりが美しい'], '批判に深く傷つく']],
  ['壬', 'im', 'water', ['Im · Yang Water', 'The Ocean', ['Thinks big', 'Comfortable with change', 'A natural strategist'], 'hard to pin down'],
    ['みずのえ · 陽の水', '海タイプ', ['大きく考える', '変化を恐れない', '戦略を立てるのが得意'], 'つかみどころがない']],
  ['癸', 'gye', 'water', ['Gye · Yin Water', 'The Rain', ['Quietly reaches everywhere', 'Intuitive and observant', 'Sees the problem first'], 'absorbs the mood around it'],
    ['みずのと · 陰の水', '雨タイプ', ['静かにすみずみまで届く', '直感と観察力', '問題に最初に気づく'], '周りの気分を吸い込む']],
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const mark = (await readFile('brand/mark.svg', 'utf8')).replace(/<\/?svg[^>]*>/g, '');

for (const lang of ['en', 'ja']) {
  await mkdir(`brand/social/${lang}`, { recursive: true });
  const f = FONT[lang], t = TEXT[lang];
  for (const [i, [hanja, file, element, en, ja]] of CARDS.entries()) {
    const [name, title, strengths, weak] = lang === 'en' ? en : ja;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350" width="1080" height="1350" text-anchor="middle">
      <rect width="1080" height="1350" fill="${PAPER}"/>
      <rect x="40" y="40" width="1000" height="1270" fill="none" stroke="${LINE}" stroke-width="3"/>
      <g transform="translate(346 96) scale(0.875)">${mark}</g>
      <text x="570" y="140" font-family="${FONT.en.serif}" font-size="40" fill="${INK}">K-LuckyLetter</text>
      <text x="540" y="218" font-family="${f.sans}" font-size="26" fill="${SEAL}" letter-spacing="3">${esc(t.eyebrow)} ${i + 1}/10</text>
      <circle cx="540" cy="450" r="176" fill="${COLOR[element]}"/>
      <circle cx="540" cy="450" r="160" fill="none" stroke="${PAPER}" stroke-width="2" opacity="0.55"/>
      <text x="540" y="526" font-family="${HANJA_FONT}" font-size="220" fill="${PAPER}">${hanja}</text>
      <text x="540" y="706" font-family="${f.sans}" font-size="36" fill="${MUTED}">${esc(name)}</text>
      <text x="540" y="806" font-family="${f.serif}" font-size="84" font-weight="600" fill="${INK}">${esc(title)}</text>
      ${strengths.map((s, n) => `<text x="540" y="${906 + n * 62}" font-family="${f.sans}" font-size="40" fill="${INK}">${esc(s)}</text>`).join('')}
      <text x="540" y="1118" font-family="${f.sans}" font-size="34" fill="${SEAL}">${esc(t.weak)}: ${esc(weak)}</text>
      <rect x="480" y="1166" width="120" height="3" fill="${LINE}"/>
      <text x="540" y="1220" font-family="${f.sans}" font-size="32" fill="${MUTED}">${esc(t.cta)}</text>
      <text x="540" y="1270" font-family="${FONT.en.sans}" font-size="36" font-weight="600" fill="${INK}">k-luckyletter.com</text>
    </svg>`;
    await writeFile(`brand/social/${lang}/${String(i + 1).padStart(2, '0')}-${file}.png`, await sharp(Buffer.from(svg)).png().toBuffer());
  }
}
console.log('done');
