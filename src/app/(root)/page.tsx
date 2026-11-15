import { SEO } from '@/lib/seo';
import { HTML_LANG, LOCALES, LOCALE_NAMES, ui } from '@/lib/ui';

// 정적 배포에는 서버가 없으므로, 브라우저 언어에 맞는 화면으로 보내는 일을 브라우저에서 한다.
const redirect = `
  var supported = ${JSON.stringify(LOCALES)};
  var wanted = (navigator.languages || [navigator.language || 'en']).map(function (l) { return l.slice(0, 2).toLowerCase(); });
  var locale = wanted.filter(function (l) { return supported.indexOf(l) >= 0; })[0] || 'en';
  location.replace('/' + locale + location.search + location.hash);
`;

/** 스크립트를 돌리지 않는 검색 로봇과 브라우저에는 언어를 고르는 화면이 그대로 보인다. */
export default function Home() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirect }} />
      <main className="shell gate">
        <img src="/icon.svg" alt="" width={72} height={72} />
        <h1>K-LuckyLetter</h1>
        <p className="muted">Korean Saju Fortune Reading</p>
        {LOCALES.map((l) => (
          <a key={l} className="choice" href={`/${l}`} lang={HTML_LANG[l]} hrefLang={HTML_LANG[l]}>
            <strong>{LOCALE_NAMES[l]} · {ui(l).tagline}</strong>
            <span>{SEO[l].description}</span>
          </a>
        ))}
      </main>
    </>
  );
}
