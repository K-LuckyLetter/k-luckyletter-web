// 검색·공유용 정보: 주소, 언어별 제목·설명·검색어, 첫 화면의 사주 소개와 질문 답변.

import type { Metadata } from 'next';
import { HTML_LANG, LOCALES, type Locale } from './ui';

export const SITE_URL = 'https://k-luckyletter.com';
export const SITE_NAME = 'K-LuckyLetter';

type Seo = {
  title: string;
  description: string;
  keywords: string[];
  ogLocale: string;
  careerTitle: string;
  careerDescription: string;
  aboutTitle: string;
  about: string[];
  faq: { q: string; a: string }[];
};

export const SEO: Record<Locale, Seo> = {
  ko: {
    title: '무료 사주 직업운·이직운 판정 | K-LuckyLetter',
    description: '생년월일로 보는 무료 사주. 만세력으로 명식을 세워 직업운·이직운·취업운·시험운을 판정하고, 앞으로 18개월 중 가장 좋은 달을 알려드립니다. 회원가입 없이 1분.',
    keywords: [
      '사주', '무료 사주', '사주풀이', '사주팔자', '운세', '무료 운세', '신년운세', '2027년 운세', '정미년 운세',
      '직업운', '이직운', '취업운', '시험운', '사업운', '이직 시기', '사주 직업', '사주 적성', '커리어 사주',
      '만세력', '명리학', '대운', '세운', '오행', '용신', '신살', '영어 사주', '외국인 사주', '케이럭키레터', 'K-LuckyLetter',
    ],
    ogLocale: 'ko_KR',
    careerTitle: '무료 사주 보기: 생년월일로 직업운·이직운 판정 | K-LuckyLetter',
    careerDescription: '생년월일과 태어난 시간, 지금 상황을 입력하면 1분 안에 무료 사주 판정과 가장 좋은 달을 알려드립니다. 회원가입이 필요 없습니다.',
    aboutTitle: '사주란? 생년월일시로 보는 한국의 운세',
    about: [
      '사주(四柱)는 태어난 해·달·날·시를 네 개의 기둥, 여덟 글자로 세워 타고난 기질과 운의 흐름을 읽는 한국의 전통 명리학입니다. 영어권에서는 Four Pillars of Destiny, 중국에서는 八字(BaZi), 일본에서는 四柱推命이라고 부릅니다.',
      '띠 운세나 별자리 운세가 같은 해, 같은 달에 태어난 사람을 한데 묶는다면, 사주는 내 여덟 글자의 오행(목·화·토·금·수) 균형과 대운·세운·월운이 만나는 시기를 따로 계산합니다. 그래서 이직, 취업, 시험, 창업처럼 시기가 중요한 결정과 신년운세에 많이 쓰입니다.',
      'K-LuckyLetter는 만세력으로 명식을 세우고 직업운·이직운·취업운·시험운·사업운을 판정 한 단어와 가장 좋은 달로 알려드립니다. 무료 사주 판정은 1분이면 되고, 회원가입 없이 한국어·영어·일본어·중국어로 볼 수 있습니다.',
    ],
    faq: [
      { q: '사주 풀이가 정말 무료인가요?', a: '네. 판정, 가장 좋은 달, 명식(만세력), 오행 분포, 일하는 기질, 신살까지 회원가입 없이 무료로 볼 수 있습니다. 10장 또는 14장 분량의 전체 리포트만 유료입니다.' },
      { q: '2027년 운세도 볼 수 있나요?', a: '네. 풀이마다 앞으로 18개월의 달별 흐름과 3년의 연도별 흐름을 계산하므로 2027년 정미년(丁未年) 운세가 포함됩니다.' },
      { q: '띠 운세나 별자리 운세와 무엇이 다른가요?', a: '띠는 태어난 해, 별자리는 태어난 달만 봅니다. 사주는 연·월·일·시 네 기둥을 모두 쓰고, 10년 단위 대운과 해마다·달마다 바뀌는 운을 겹쳐 시기를 계산합니다.' },
      { q: '해외에서 태어났어도 볼 수 있나요?', a: '네. 태어난 곳의 시간대를 고르면 그 기준으로 명식을 세웁니다. 양력과 음력 모두 입력할 수 있습니다.' },
    ],
  },
  en: {
    title: 'Korean Saju Fortune Reading: Free Career Verdict | K-LuckyLetter',
    description: 'Free Korean saju (Four Pillars of Destiny) fortune reading from your birth date. Get a clear career verdict, the best month for a job change, and your 2027 outlook. No sign-up.',
    keywords: [
      'Korean fortune telling', 'saju', 'saju reading', 'Korean saju', 'free saju reading', 'Four Pillars of Destiny',
      'four pillars birth chart', 'Korean astrology', 'Korean horoscope', 'Korean zodiac', 'BaZi reading', 'Chinese astrology',
      'birth chart reading', 'career horoscope', 'career fortune', 'job change timing', 'fortune teller online',
      'free fortune reading', 'horoscope 2027', '2027 fortune', 'Year of the Sheep 2027', 'five elements', 'destiny reading',
      'Korean fortune teller', 'K-culture', 'lucky months', 'K-LuckyLetter',
    ],
    ogLocale: 'en_US',
    careerTitle: 'Start Your Free Saju Reading: Birth Date to Career Verdict | K-LuckyLetter',
    careerDescription: 'Enter your birth date, birth time, and current situation. In about a minute you get a free Korean saju career verdict and your best month. No sign-up needed.',
    aboutTitle: 'What is saju, the Korean Four Pillars reading?',
    about: [
      'Saju (사주) is Korea\'s traditional way of reading fortune from the moment you were born. Your birth year, month, day, and hour become four pillars of two characters each, eight characters in total. The same system is known as Four Pillars of Destiny in English, BaZi in Chinese, and Shichu Suimei in Japanese.',
      'A zodiac horoscope groups together everyone born under the same sign. A saju birth chart instead reads the balance of the five elements (wood, fire, earth, metal, water) in your own eight characters and how it meets your ten-year, yearly, and monthly luck cycles. In Korea, people consult saju before a job change, an exam, or a new business, and at the start of every new year.',
      'K-LuckyLetter builds your chart with a Korean manseryeok calendar engine and turns it into a clear career verdict: stay or move, push or wait, and which month ahead is your best. The free fortune reading takes about a minute, needs no sign-up, and is available in English, Korean, Japanese, and Chinese.',
    ],
    faq: [
      { q: 'Is the saju reading really free?', a: 'Yes. The verdict, your best month, your Four Pillars chart, five-element balance, working temperament, and stars are free and need no sign-up. Only the full written report of 10 or 14 chapters is paid.' },
      { q: 'How is Korean saju different from Western astrology or a zodiac horoscope?', a: 'A zodiac sign uses only your birth month, and the animal zodiac only your birth year. Saju uses all four pillars (year, month, day, and hour) and layers ten-year, yearly, and monthly cycles on top to calculate timing.' },
      { q: 'Is saju the same as BaZi or Chinese astrology?', a: 'Saju and BaZi share the same Four Pillars calendar system. K-LuckyLetter follows Korean practice and Korean terms such as daeun (the ten-year luck cycle) and sinsal (symbolic stars), and explains them in plain English.' },
      { q: 'Can I see my fortune for 2027?', a: 'Yes. Every reading calculates the next 18 months month by month and a three-year outlook, so it covers 2027, the year of the Fire Sheep (丁未).' },
    ],
  },
  ja: {
    title: '韓国式四柱推命の無料占い｜仕事運・転職運を判定 | K-LuckyLetter',
    description: '生年月日でわかる韓国式四柱推命（サジュ）の無料占い。仕事運・転職運・就職運をひと言で判定し、今後18か月でいちばん良い月をお伝えします。会員登録不要、約1分。',
    keywords: [
      '四柱推命', '四柱推命 無料', '韓国 占い', '韓国式四柱推命', 'サジュ', 'サジュ 占い', '占い', '無料占い', '運勢',
      '仕事運', '転職運', '転職 占い', '転職 時期', '就職運', '試験運', '適職 占い', '生年月日 占い', '命式', '五行', '大運',
      '2027年 運勢', '丁未', '韓国カルチャー', 'K-LuckyLetter',
    ],
    ogLocale: 'ja_JP',
    careerTitle: '無料の四柱推命を始める：生年月日から仕事運を判定 | K-LuckyLetter',
    careerDescription: '生年月日と出生時刻、今の状況を入力すると、約1分で無料の判定といちばん良い月がわかります。会員登録は不要です。',
    aboutTitle: '韓国式の四柱推命「サジュ」とは',
    about: [
      'サジュ（사주・四柱）は、生まれた年・月・日・時を四つの柱、八つの文字に置き換えて、生まれ持った気質と運の流れを読む韓国の伝統的な占いです。日本では四柱推命、中国では八字（BaZi）、英語では Four Pillars of Destiny と呼ばれます。',
      '星座占いや干支占いが同じ月・同じ年に生まれた人をひとまとめに見るのに対し、四柱推命はあなたの八文字の五行（木・火・土・金・水）のバランスと、大運・年運・月運が重なる時期を個別に計算します。韓国では転職、就職、試験、起業の前や、新年の運勢を見るときによく使われます。',
      'K-LuckyLetter は万年暦で命式を立て、仕事運・転職運・就職運・試験運・事業運を、ひと言の判定といちばん良い月でお伝えします。無料占いは約1分、会員登録なしで、日本語・韓国語・英語・中国語に対応しています。',
    ],
    faq: [
      { q: '本当に無料で占えますか？', a: 'はい。判定、いちばん良い月、命式、五行のバランス、仕事の気質、神殺まで、会員登録なしで無料でご覧いただけます。有料になるのは、10章または14章の全文レポートだけです。' },
      { q: '2027年の運勢も見られますか？', a: 'はい。鑑定ごとに今後18か月の月ごとの流れと3年分の年運を計算するので、2027年（丁未）の運勢も含まれます。' },
      { q: '星座占いや干支占いと何が違いますか？', a: '星座は生まれた月、干支は生まれた年だけを見ます。四柱推命は年・月・日・時の四つの柱をすべて使い、10年ごとの大運と毎年・毎月の運を重ねて時期を計算します。' },
      { q: '海外で生まれた場合も鑑定できますか？', a: 'はい。出生地のタイムゾーンを選ぶと、その時刻を基準に命式を立てます。新暦でも旧暦でも入力できます。' },
    ],
  },
  zh: {
    title: '韩国四柱八字免费算命｜事业运·跳槽运判定 | K-LuckyLetter',
    description: '用出生日期免费测算韩国四柱八字。给出事业运、跳槽运、求职运的明确判定，并告诉你未来18个月中最好的月份。无需注册，约一分钟。',
    keywords: [
      '八字', '四柱八字', '八字算命', '生辰八字', '免费算命', '免费八字', '韩国算命', '韩国四柱', '韩国占卜', '算命', '运势',
      '事业运', '跳槽运', '求职运', '考试运', '创业运', '跳槽时机', '职业测算', '命盘', '排盘', '五行', '大运', '流年',
      '2027年运势', '丁未年运势', '韩流', 'K-LuckyLetter',
    ],
    ogLocale: 'zh_CN',
    careerTitle: '开始免费八字测算：用出生日期看事业运 | K-LuckyLetter',
    careerDescription: '输入出生日期、出生时间和目前的处境，约一分钟即可免费得到判定和最好的月份，无需注册。',
    aboutTitle: '什么是韩国四柱（사주）？',
    about: [
      '四柱（韩语写作「사주」，读作 Saju）是韩国传统的命理方法：把出生的年、月、日、时排成四柱八字，解读一个人天生的气质和运势走向。它与中国的八字（BaZi）、日本的四柱推命同源，英文称为 Four Pillars of Destiny。',
      '星座运势和生肖运势把同月、同年出生的人归为一类；四柱八字则单独计算你八个字的五行（木、火、土、金、水）平衡，以及大运、流年、流月交汇的时机。在韩国，人们在跳槽、求职、考试、创业之前，以及每逢新年看运势时，常常会看四柱。',
      'K-LuckyLetter 用万年历排出命盘，把事业运、跳槽运、求职运、考试运、创业运归结为一个明确的判定和最好的月份。免费算命约需一分钟，无需注册，支持中文、韩语、英语和日语。',
    ],
    faq: [
      { q: '真的可以免费算吗？', a: '可以。判定、最好的月份、命盘、五行分布、工作气质和神煞都可免费查看，无需注册。只有10章或14章的完整报告需要付费。' },
      { q: '可以看2027年的运势吗？', a: '可以。每次解读都会计算未来18个月的逐月走势和三年的流年走势，因此包含2027年（丁未年）的运势。' },
      { q: '和星座、生肖运势有什么不同？', a: '星座只看出生月份，生肖只看出生年份。四柱八字会用到年、月、日、时四柱，并叠加十年大运和每年、每月的运势来计算时机。' },
      { q: '韩国四柱和中国八字一样吗？', a: '两者同源，都以干支历和四柱八字为基础。K-LuckyLetter 按韩国的命理习惯排盘和解读，并用中文撰写结果。' },
    ],
  },
};

/** Google AdSense 게시자 ID(ca-pub-…)와 광고 단위 ID. 둘 다 있어야 메인 화면에 광고가 나온다. */
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '';
export const ADSENSE_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT || '';

const verification = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  other: {
    ...(process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION && { 'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION }),
    // AdSense 사이트 소유 확인. 게시자 ID만 있어도 모든 화면에 실린다.
    ...(ADSENSE_CLIENT && { 'google-adsense-account': ADSENSE_CLIENT }),
  },
};

/** 모든 화면에 공통인 값. 두 최상위 틀(언어 선택 화면, 언어별 화면)이 함께 쓴다. */
export const SITE_META: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  icons: {
    icon: [{ url: '/favicon.ico', sizes: '48x48' }, { url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
  verification,
};

const OG_IMAGE = { url: '/og.jpg', width: 1200, height: 630, alt: 'K-LuckyLetter: Korean saju fortune reading' };

/** 같은 화면의 언어별 주소. path 는 언어 뒤의 경로('' 또는 '/career'). */
export function languageLinks(path: string) {
  return {
    ...Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], `${SITE_URL}/${l}${path}`])),
    'x-default': path ? `${SITE_URL}/en${path}` : SITE_URL,
  };
}

/** 검색에 올릴 화면 하나의 제목·설명·대표 주소·언어별 주소·공유 카드. */
export function pageMeta(locale: Locale, path: string, title: string, description: string): Metadata {
  const url = `${SITE_URL}/${locale}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageLinks(path) },
    openGraph: {
      type: 'website', siteName: SITE_NAME, title, description, url,
      locale: SEO[locale].ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => SEO[l].ogLocale),
      images: [OG_IMAGE],
    },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE.url] },
  };
}

/** Cloudflare Web Analytics 토큰. 비어 있으면 방문 통계 스크립트를 넣지 않는다. */
export const ANALYTICS_TOKEN = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN || '';

/** 구조화 데이터를 <script> 안에 안전하게 넣기 위한 문자열. */
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');
