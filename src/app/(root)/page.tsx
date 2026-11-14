import { LOCALES, LOCALE_NAMES } from '@/lib/ui';

// 정적 배포에는 서버가 없으므로, 브라우저 언어에 맞는 화면으로 보내는 일을 브라우저에서 한다.
const redirect = `
  var supported = ${JSON.stringify(LOCALES)};
  var wanted = (navigator.languages || [navigator.language || 'en']).map(function (l) { return l.slice(0, 2).toLowerCase(); });
  var locale = wanted.filter(function (l) { return supported.indexOf(l) >= 0; })[0] || 'en';
  location.replace('/' + locale + location.search + location.hash);
`;

export default function Home() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirect }} />
      <noscript>
        {LOCALES.map((l) => <a key={l} href={`/${l}`} style={{ marginRight: 12 }}>{LOCALE_NAMES[l]}</a>)}
      </noscript>
    </>
  );
}
