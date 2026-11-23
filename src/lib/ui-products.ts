// 신년운세·궁합 화면 문구. 결과 화면의 라벨은 서버가 내려주고, 여기에는 입력 폼과 메인 화면 카드, 결제 상자 문구만 둔다.

import type { Locale } from './ui';

export const PRODUCTS = ['yearly', 'compat'] as const;
export type Product = (typeof PRODUCTS)[number];
export const RELATIONS = ['dating', 'married', 'crush', 'reunion'] as const;
export type Relation = (typeof RELATIONS)[number];

interface Card { title: string; body: string; cta: string }
interface Page { title: string; hint: string; seoTitle: string; seoDescription: string }

export interface ProductUi {
  sectionTitle: string;
  cards: { career: Card; yearly: Card; compat: Card };
  yearly: Page;
  compat: Page;
  me: string; partner: string;
  relationTitle: string; relations: Record<Relation, string>;
  name: string; gender: string; birthDate: string; birthTime: string;
  submit: string; invalid: string;
  payTitle: string; payBody: string; payCta: string;
  lockedAria: string;
}

const ko: ProductUi = {
  sectionTitle: '세 가지 풀이',
  cards: {
    career: { title: '커리어 판정', body: '남을지 옮길지, 붙을지. 지금 상황에 대한 답 한 단어와 움직일 달을 알려드립니다.', cta: '커리어 판정 보기' },
    yearly: { title: '2027 신년운세', body: '정미년 한 해의 총점, 재물·직업·연애·건강 등 여섯 영역, 12개월 흐름을 계산합니다.', cta: '2027년 운세 보기' },
    compat: { title: '커플 궁합', body: '두 사람의 명식을 겹쳐 끌림, 소통, 생활, 오래가는 힘을 점수로 보여드립니다.', cta: '우리 궁합 보기' },
  },
  yearly: {
    title: '2027년, 나에게 어떤 해일까요?', hint: '생년월일을 입력하면 정미년 한 해의 점수와 가장 좋은 달을 바로 보여드립니다. 무료입니다.',
    seoTitle: '2027년 신년운세 무료: 정미년 사주 운세와 월별 흐름 | K-LuckyLetter',
    seoDescription: '생년월일로 보는 2027년 정미년 신년운세. 한 해 총점, 재물운·직업운·연애운·건강운과 가장 좋은 달을 무료로 확인하세요. 회원가입 없이 1분.',
  },
  compat: {
    title: '두 사람, 얼마나 잘 맞을까요?', hint: '두 사람의 생년월일을 입력하면 궁합 점수와 가장 잘 맞는 부분을 바로 보여드립니다. 무료입니다.',
    seoTitle: '무료 궁합: 생년월일로 보는 커플 사주 궁합 점수 | K-LuckyLetter',
    seoDescription: '두 사람의 생년월일로 사주 궁합을 계산합니다. 끌림, 소통, 생활, 오래가는 힘까지 다섯 가지 점수와 두 사람에게 좋은 달을 무료로 확인하세요.',
  },
  me: '나', partner: '상대',
  relationTitle: '지금 어떤 사이인가요?', relations: { dating: '연애 중', married: '부부', crush: '썸·짝사랑', reunion: '재회 고민' },
  name: '이름 또는 닉네임', gender: '성별', birthDate: '생년월일', birthTime: '태어난 시간',
  submit: '무료 결과 보기', invalid: '입력하지 않은 칸이 있습니다.',
  payTitle: '전체 풀이 열기', payBody: '잠긴 점수 전부, 12개월 달력, {n}장 분량의 풀이가 열립니다.', payCta: '전체 풀이 · {price}',
  lockedAria: '전체 풀이에서 열립니다',
};

const en: ProductUi = {
  sectionTitle: 'Three readings',
  cards: {
    career: { title: 'Career verdict', body: 'Stay or move, pass or wait. One clear answer for your situation and the month to act.', cta: 'See my career verdict' },
    yearly: { title: '2027 yearly fortune', body: 'Your overall score for the year, six areas from money to health, and a 12-month flow.', cta: 'See my 2027 fortune' },
    compat: { title: 'Couple compatibility', body: 'Two charts side by side: attraction, communication, daily life, and staying power, each scored.', cta: 'See our compatibility' },
  },
  yearly: {
    title: 'What kind of year will 2027 be for you?', hint: 'Enter your birth date to see your score for the year and your best month right away. It is free.',
    seoTitle: 'Free 2027 Saju Yearly Fortune: Your Year and Best Months | K-LuckyLetter',
    seoDescription: 'A free Korean saju (Four Pillars) fortune for 2027. See your overall score for the year, money, career, love, and health, and your best month. No sign-up needed.',
  },
  compat: {
    title: 'How well do the two of you fit?', hint: 'Enter both birth dates to see your compatibility score and where you fit best. It is free.',
    seoTitle: 'Free Saju Compatibility: Couple Compatibility by Birth Date | K-LuckyLetter',
    seoDescription: 'Korean saju (Four Pillars) compatibility for couples. Enter two birth dates to see five scores, from attraction to staying power, and your best months together.',
  },
  me: 'You', partner: 'Your partner',
  relationTitle: 'What are you to each other right now?', relations: { dating: 'Dating', married: 'Married', crush: 'Crush or talking stage', reunion: 'Thinking of getting back together' },
  name: 'Name or nickname', gender: 'Gender', birthDate: 'Birth date', birthTime: 'Birth time',
  submit: 'See my free result', invalid: 'Some fields are still empty.',
  payTitle: 'Open the full reading', payBody: 'Unlocks every score, the 12-month calendar, and a {n}-chapter reading.', payCta: 'Full reading · {price}',
  lockedAria: 'Opens in the full reading',
};

const ja: ProductUi = {
  sectionTitle: '3つの鑑定',
  cards: {
    career: { title: '仕事運の判定', body: '残るか移るか、受かるか。今の状況への答えと、動くべき月をお伝えします。', cta: '仕事運の判定を見る' },
    yearly: { title: '2027年の運勢', body: '丁未年の総合スコア、金運・仕事運・恋愛運・健康運など6分野、12か月の流れを計算します。', cta: '2027年の運勢を見る' },
    compat: { title: 'カップル相性', body: '二人の命式を重ね、惹かれ合う力、コミュニケーション、生活、長続きする力をスコアで示します。', cta: '二人の相性を見る' },
  },
  yearly: {
    title: '2027年は、あなたにとってどんな年でしょうか?', hint: '生年月日を入力すると、一年のスコアと一番良い月をすぐにお見せします。無料です。',
    seoTitle: '2027年の運勢を無料で：四柱推命で見る丁未年と月別の流れ | K-LuckyLetter',
    seoDescription: '生年月日で見る2027年(丁未年)の四柱推命。年間の総合スコア、金運・仕事運・恋愛運・健康運と一番良い月を無料で確認できます。会員登録は不要です。',
  },
  compat: {
    title: '二人の相性はどのくらいでしょうか?', hint: '二人の生年月日を入力すると、相性スコアと一番合うところをすぐにお見せします。無料です。',
    seoTitle: '無料の相性占い：生年月日で見る四柱推命カップル相性 | K-LuckyLetter',
    seoDescription: '二人の生年月日から四柱推命の相性を計算します。惹かれ合う力から長続きする力まで5つのスコアと、二人に良い月を無料で確認できます。',
  },
  me: 'あなた', partner: 'お相手',
  relationTitle: '今はどんな関係ですか?', relations: { dating: '交際中', married: '夫婦', crush: '片思い・いい感じ', reunion: '復縁を考えている' },
  name: 'お名前またはニックネーム', gender: '性別', birthDate: '生年月日', birthTime: '出生時刻',
  submit: '無料の結果を見る', invalid: '入力されていない項目があります。',
  payTitle: '全体鑑定を開く', payBody: 'すべてのスコア、12か月カレンダー、{n}章の鑑定が開きます。', payCta: '全体鑑定 · {price}',
  lockedAria: '全体鑑定で開きます',
};

const zh: ProductUi = {
  sectionTitle: '三种解读',
  cards: {
    career: { title: '事业判定', body: '留下还是跳槽，能不能考上。针对你现在的处境给出一个明确的答案和行动的月份。', cta: '查看事业判定' },
    yearly: { title: '2027年运势', body: '计算丁未年的全年总分，财运、事业、感情、健康等六个方面，以及12个月的走势。', cta: '查看2027年运势' },
    compat: { title: '情侣合盘', body: '把两人的命盘叠在一起，用分数呈现吸引力、沟通、生活和长久之力。', cta: '查看我们的合盘' },
  },
  yearly: {
    title: '2027年对你来说会是怎样的一年?', hint: '输入出生日期，马上看到全年分数和最好的月份。免费。',
    seoTitle: '免费2027年运势：八字看丁未年运程与每月走势 | K-LuckyLetter',
    seoDescription: '用出生日期看2027年(丁未年)八字运势。免费查看全年总分、财运、事业、感情、健康和最好的月份，无需注册。',
  },
  compat: {
    title: '你们两个人有多合?', hint: '输入两人的出生日期，马上看到合盘分数和最合拍的地方。免费。',
    seoTitle: '免费八字合盘：用出生日期看情侣配对分数 | K-LuckyLetter',
    seoDescription: '用两人的出生日期计算八字合盘。免费查看从吸引力到长久之力的五项分数，以及适合两人的月份。',
  },
  me: '我', partner: '对方',
  relationTitle: '你们现在是什么关系?', relations: { dating: '恋爱中', married: '夫妻', crush: '暧昧·暗恋', reunion: '考虑复合' },
  name: '姓名或昵称', gender: '性别', birthDate: '出生日期', birthTime: '出生时间',
  submit: '查看免费结果', invalid: '还有未填写的项目。',
  payTitle: '打开完整解读', payBody: '解锁全部分数、12个月月历和{n}章的解读。', payCta: '完整解读 · {price}',
  lockedAria: '在完整解读中开放',
};

const ALL: Record<Locale, ProductUi> = { ko, en, ja, zh };
export const productUi = (locale: Locale): ProductUi => ALL[locale];
