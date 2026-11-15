// 로고 원본(brand/mark.svg)에서 파비콘, 앱 아이콘, 공유 이미지, 광고용 로고를 만든다.  실행: node scripts/brand.mjs
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const PAPER = '#f6f1e7';
const INK = '#1f1b16';
const SERIF = "'Iowan Old Style', 'Palatino', 'AppleMyungjo', serif";
const mark = await readFile('brand/mark.svg', 'utf8');
const markInner = mark.replace(/<\/?svg[^>]*>/g, '');
const png = (svg, size) => sharp(Buffer.from(svg), { density: 600 }).resize(size, size).png().toBuffer();

await mkdir('brand/ads', { recursive: true });
await writeFile('public/icon.svg', mark);
for (const [file, size] of [['public/icon-192.png', 192], ['public/icon-512.png', 512], ['public/logo.png', 512]]) {
  await writeFile(file, await png(mark, size));
}

// 홈 화면 아이콘은 모서리가 잘리므로 한지색 바탕에 여백을 둔다.
const padded = (size, scale) => {
  const m = (64 * (1 - scale)) / 2 / scale;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-m} ${-m} ${64 + 2 * m} ${64 + 2 * m}" width="${size}" height="${size}">
    <rect x="${-m}" y="${-m}" width="${64 + 2 * m}" height="${64 + 2 * m}" fill="${PAPER}"/>${markInner}</svg>`;
};
await writeFile('public/apple-touch-icon.png', await png(padded(180, 0.78), 180));
await writeFile('brand/ads/logo-square-1200.png', await png(padded(1200, 0.62), 1200));

// favicon.ico: PNG 를 그대로 담는 형식(16, 32, 48).
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((s) => png(mark, s)));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const at = 6 + 16 * i;
  header.writeUInt8(s, at);
  header.writeUInt8(s, at + 1);
  header.writeUInt16LE(1, at + 4);
  header.writeUInt16LE(32, at + 6);
  header.writeUInt32LE(images[i].length, at + 8);
  header.writeUInt32LE(offset, at + 12);
  offset += images[i].length;
});
await writeFile('public/favicon.ico', Buffer.concat([header, ...images]));

// 가로형 로고(광고 플랫폼의 4:1 칸).
const wide = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300" width="1200" height="300">
  <rect width="1200" height="300" fill="${PAPER}"/>
  <g transform="translate(150 62) scale(2.75)">${markInner}</g>
  <text x="372" y="168" font-family="${SERIF}" font-size="104" fill="${INK}">K-LuckyLetter</text>
  <text x="376" y="222" font-family="${SERIF}" font-size="34" fill="#6f665a" letter-spacing="3">KOREAN SAJU FORTUNE READING</text>
</svg>`;
await writeFile('brand/ads/logo-wide-1200x300.png', await sharp(Buffer.from(wide)).png().toBuffer());

// 공유 이미지(1200x630): 대표 사진 위에 로고와 이름.
const overlay = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#1f1b16" stop-opacity="0.15"/><stop offset="0.55" stop-color="#1f1b16" stop-opacity="0.55"/><stop offset="1" stop-color="#1f1b16" stop-opacity="0.92"/>
  </linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <g transform="translate(72 330) scale(1.75)">${markInner}</g>
  <text x="212" y="418" font-family="${SERIF}" font-size="88" fill="${PAPER}">K-LuckyLetter</text>
  <text x="74" y="504" font-family="${SERIF}" font-size="44" fill="${PAPER}">Korean Saju Fortune Reading</text>
  <text x="74" y="562" font-family="${SERIF}" font-size="30" fill="#e2d9c8">Four Pillars birth chart · Free career verdict · 사주 · 四柱推命 · 八字</text>
</svg>`;
const og = await sharp('public/hero.jpg').resize(1200, 630, { fit: 'cover' })
  .composite([{ input: Buffer.from(overlay) }]).jpeg({ quality: 84 }).toBuffer();
await writeFile('public/og.jpg', og);
await writeFile('brand/ads/landscape-1200x628.jpg', await sharp(og).resize(1200, 628, { fit: 'cover' }).jpeg({ quality: 88 }).toBuffer());
console.log('done');
