// 화면 문구. 상황·분야·명리 용어처럼 판정과 묶인 문구는 서버가 언어별로 내려준다.

import { MORE, type UiMore } from './ui-more';

export const LOCALES = ['ko', 'en', 'ja', 'zh'] as const;
export type Locale = (typeof LOCALES)[number];
export const LOCALE_NAMES: Record<Locale, string> = { ko: '한국어', en: 'English', ja: '日本語', zh: '简体中文' };
export const HTML_LANG: Record<Locale, string> = { ko: 'ko', en: 'en', ja: 'ja', zh: 'zh-Hans' };
/** 출생지 시간대의 기본값. 브라우저 시간대를 읽지 못할 때 쓴다. */
export const DEFAULT_TZ: Record<Locale, string> = { ko: 'Asia/Seoul', en: 'America/New_York', ja: 'Asia/Tokyo', zh: 'Asia/Shanghai' };

export const isLocale = (v: string): v is Locale => (LOCALES as readonly string[]).includes(v);

const ko = {
  brand: 'K-LuckyLetter',
  tagline: '사주로 읽는 커리어 판정',
  heroTitle: '남을지, 옮길지, 밀지.\n막연한 위로 대신 판정을 드립니다.',
  heroSub: '생년월일로 명식을 세우고, 지금 상황에 맞춰 답과 시기를 계산합니다. 판정은 무료로 바로 확인할 수 있습니다.',
  start: '내 판정 무료로 보기',
  features: [
    { title: '계산으로 정하는 판정', body: '판정과 시기는 명식·대운·세운·월운을 정해진 규칙으로 계산합니다. 같은 입력이면 언제 봐도 같은 답이 나옵니다.' },
    { title: '내 상황에 맞춘 답', body: '재직 중, 구직, 시험, 입시, 사업, 복귀 준비. 상황마다 묻는 질문과 판정 기준이 달라집니다.' },
    { title: '원하는 언어로', body: '한국어, 영어, 일본어, 중국어로 읽을 수 있고, 리포트는 각 언어로 새로 씁니다.' },
  ],
  birthTitle: '언제 태어나셨나요?', birthHint: '태어난 날로 명식을 세웁니다.',
  solar: '양력', lunar: '음력', leapMonth: '윤달', year: '년', month: '월', day: '일',
  timeTitle: '태어난 시간을 알려주세요', timeHint: '시간을 알면 시기 판정이 더 정확해집니다. 몰라도 됩니다.',
  hour: '시 (0~23)', minute: '분 (0~59)', timeUnknown: '시간을 몰라요',
  timeZone: '태어난 곳의 시간대',
  jasi: '23시대 출생 처리', jasiMidnight: '자정 기준 (기본)', jasiNext: '다음 날로 보기', jasiSplit: '야자시 적용',
  genderTitle: '성별을 선택해주세요', genderHint: '대운이 흐르는 방향이 달라집니다.', male: '남성', female: '여성',
  nameTitle: '어떻게 불러드릴까요?', nameHint: '풀이에서 이 이름으로 불러드립니다.', namePlaceholder: '이름 또는 닉네임',
  situationTitle: '지금 어떤 상황이세요?', situationHint: '하나만 고르면 됩니다. 상황에 따라 판정이 달라집니다.',
  optional: '선택', required: '필수', jobCustom: '직접 입력', jobCustomPlaceholder: '하는 일을 적어주세요',
  questionTitle: '딱 하나만 물어본다면?', questionHint: '비워도 됩니다. 날짜를 적으면 그 달의 흐름까지 짚어드립니다.',
  questionNote: '회사나 학교 이름은 참고만 하고, 특정 이름으로 합격을 단정하지 않습니다.',
  back: '이전', next: '다음', skip: '건너뛰기', submit: '내 판정 보기', sending: '계산하는 중…',
  verdictOf: '{name}님의 판정', confidence: '확신도', yourQuestion: '남기신 질문', mentioned: '질문에 적은 달',
  lockedTitle: '아직 잠긴 답', lockedHint: '전체 풀이에서 열립니다', chapterRef: '{n}장',
  unlock: '전체 풀이 열기', openReport: '내 리포트 열기',
  pillarsTitle: '명식', elementsTitle: '오행 분포', traitsTitle: '일하는 기질', strength: '일간의 힘',
  daeunTitle: '10년 단위 흐름', yearsTitle: '올해부터 3년', age: '{from}~{to}세', current: '현재',
  tocTitle: '전체 풀이 목차',
  trustTitle: '판정은 계산으로, 글은 설명으로', trustBody: '판정과 열리는 달은 규칙으로 먼저 확정합니다. 리포트의 글은 그 값을 바꾸지 않고 이유를 풀어 씁니다.',
  priceNote: '평생 다시 열어볼 수 있습니다',
  mockTitle: '테스트 결제', mockBody: '결제 연동 전 개발용 화면입니다. 실제 결제는 일어나지 않습니다.', mockPay: '테스트 결제 완료하기',
  processing: '결제를 확인하는 중…', cancelled: '결제가 취소되었습니다.', backToResult: '결과로 돌아가기',
  generating: '리포트를 쓰는 중입니다', generatingHint: '창을 닫아도 계속 진행됩니다. 보통 몇 분 안에 끝납니다.',
  failed: '리포트를 만들지 못했습니다.', retry: '다시 시도', prev: '이전 장', nextChapter: '다음 장',
  chapterOf: '{n} / {total}장', draft: '초안', calendarTitle: '달별 흐름', answersTitle: '열린 답',
  loadFailed: '불러오지 못했습니다. 서버가 켜져 있는지 확인해주세요.', notFound: '찾을 수 없는 풀이입니다.',
  disclaimer: '이 서비스는 자기이해를 돕는 참고 자료이며, 의학·법률·투자 조언이 아닙니다.',
};

export type Ui = typeof ko;

const en: Ui = {
  brand: 'K-LuckyLetter',
  tagline: 'Career verdicts from Korean saju',
  heroTitle: 'Stay, move, or push?\nGet a verdict, not vague comfort.',
  heroSub: 'We build your Four Pillars chart from your birth date and calculate an answer and a timing for your situation. The verdict is free and instant.',
  start: 'See my verdict for free',
  features: [
    { title: 'A verdict from calculation', body: 'The verdict and timing come from fixed rules applied to your chart and its ten-year, yearly, and monthly cycles. Same input, same answer, every time.' },
    { title: 'Fitted to your situation', body: 'Employed, job hunting, exams, admissions, business, or returning to work. Each one asks a different question and uses different criteria.' },
    { title: 'In your language', body: 'Read it in Korean, English, Japanese, or Chinese. Reports are written fresh in each language.' },
  ],
  birthTitle: 'When were you born?', birthHint: 'Your chart is built from your birth date.',
  solar: 'Solar', lunar: 'Lunar', leapMonth: 'Leap month', year: 'Year', month: 'Month', day: 'Day',
  timeTitle: 'What time were you born?', timeHint: 'Birth time sharpens the timing. It is fine if you do not know it.',
  hour: 'Hour (0-23)', minute: 'Minute (0-59)', timeUnknown: 'I do not know my birth time',
  timeZone: 'Time zone of your birthplace',
  jasi: 'Births between 23:00 and 23:59', jasiMidnight: 'Day changes at midnight (default)', jasiNext: 'Count as the next day', jasiSplit: 'Late-night hour rule',
  genderTitle: 'Select your gender', genderHint: 'It sets the direction of your ten-year cycles.', male: 'Male', female: 'Female',
  nameTitle: 'What should we call you?', nameHint: 'We will use this name in your reading.', namePlaceholder: 'Name or nickname',
  situationTitle: 'What is your situation right now?', situationHint: 'Pick one. The verdict depends on it.',
  optional: 'optional', required: 'required', jobCustom: 'Other', jobCustomPlaceholder: 'Describe your work',
  questionTitle: 'If you could ask just one thing?', questionHint: 'You can leave this blank. Mention a date and we will read that month too.',
  questionNote: 'Company and school names are used for context only. We do not promise an outcome for a named organization.',
  back: 'Back', next: 'Next', skip: 'Skip', submit: 'See my verdict', sending: 'Calculating…',
  verdictOf: 'Verdict for {name}', confidence: 'Confidence', yourQuestion: 'Your question', mentioned: 'The month you mentioned',
  lockedTitle: 'Still locked', lockedHint: 'Opens in the full reading', chapterRef: 'Ch. {n}',
  unlock: 'Unlock the full reading', openReport: 'Open my report',
  pillarsTitle: 'Your chart', elementsTitle: 'Five elements', traitsTitle: 'Working temperament', strength: 'Day Master strength',
  daeunTitle: 'Ten-year cycles', yearsTitle: 'The next three years', age: 'Age {from}-{to}', current: 'Now',
  tocTitle: 'What the full reading covers',
  trustTitle: 'Calculated verdict, explained in writing', trustBody: 'The verdict and the open months are fixed by rules first. The report explains the reasons without changing those results.',
  priceNote: 'Yours to reopen any time',
  mockTitle: 'Test payment', mockBody: 'This is a development screen used before payment is connected. No real charge is made.', mockPay: 'Complete test payment',
  processing: 'Confirming your payment…', cancelled: 'The payment was cancelled.', backToResult: 'Back to my result',
  generating: 'Writing your report', generatingHint: 'It keeps going if you close this window. It usually takes a few minutes.',
  failed: 'We could not create the report.', retry: 'Try again', prev: 'Previous', nextChapter: 'Next',
  chapterOf: 'Chapter {n} of {total}', draft: 'Draft', calendarTitle: 'Month by month', answersTitle: 'Unlocked answers',
  loadFailed: 'Could not load. Check that the server is running.', notFound: 'This reading does not exist.',
  disclaimer: 'This service is for self-reflection and is not medical, legal, or investment advice.',
};

const ja: Ui = {
  brand: 'K-LuckyLetter',
  tagline: '四柱推命で読むキャリア判定',
  heroTitle: '残るか、移るか、攻めるか。\nあいまいな励ましではなく、判定を。',
  heroSub: '生年月日から命式を立て、今の状況に合わせて答えと時期を計算します。判定は無料ですぐに確認できます。',
  start: '無料で判定を見る',
  features: [
    { title: '計算で決まる判定', body: '判定と時期は、命式・大運・年運・月運を決まった規則で計算します。同じ入力なら、いつ見ても同じ答えです。' },
    { title: '状況に合わせた答え', body: '在職中、求職、試験、受験、事業、復帰準備。状況ごとに問いと判定基準が変わります。' },
    { title: 'お好きな言語で', body: '韓国語、英語、日本語、中国語で読めます。レポートは各言語で新しく書きます。' },
  ],
  birthTitle: '生年月日を教えてください', birthHint: '生まれた日から命式を立てます。',
  solar: '新暦', lunar: '旧暦', leapMonth: '閏月', year: '年', month: '月', day: '日',
  timeTitle: '生まれた時刻を教えてください', timeHint: '時刻がわかると時期の判定がより正確になります。わからなくても大丈夫です。',
  hour: '時 (0〜23)', minute: '分 (0〜59)', timeUnknown: '時刻がわからない',
  timeZone: '出生地のタイムゾーン',
  jasi: '23時台生まれの扱い', jasiMidnight: '午前0時で日付が変わる（標準）', jasiNext: '翌日として扱う', jasiSplit: '夜子時を適用',
  genderTitle: '性別を選んでください', genderHint: '大運の流れる向きが変わります。', male: '男性', female: '女性',
  nameTitle: 'お名前を教えてください', nameHint: '鑑定の中でこの名前でお呼びします。', namePlaceholder: '名前またはニックネーム',
  situationTitle: '今の状況は？', situationHint: '一つ選んでください。状況によって判定が変わります。',
  optional: '任意', required: '必須', jobCustom: '自分で入力', jobCustomPlaceholder: 'お仕事を入力してください',
  questionTitle: '一つだけ聞くとしたら？', questionHint: '空欄でも構いません。日付を書くと、その月の流れも見ます。',
  questionNote: '会社名や学校名は参考にするだけで、特定の名前で合格を断定することはありません。',
  back: '戻る', next: '次へ', skip: 'スキップ', submit: '判定を見る', sending: '計算中…',
  verdictOf: '{name}さんの判定', confidence: '確信度', yourQuestion: 'ご質問', mentioned: 'ご質問にあった月',
  lockedTitle: 'まだ開いていない答え', lockedHint: '全文鑑定で開きます', chapterRef: '第{n}章',
  unlock: '全文鑑定を開く', openReport: 'レポートを開く',
  pillarsTitle: '命式', elementsTitle: '五行の分布', traitsTitle: '仕事の気質', strength: '日干の強さ',
  daeunTitle: '10年ごとの流れ', yearsTitle: '今年から3年', age: '{from}〜{to}歳', current: '現在',
  tocTitle: '全文鑑定の目次',
  trustTitle: '判定は計算で、文章は解説で', trustBody: '判定と開く月は規則で先に確定します。レポートの文章はその値を変えず、理由を解説します。',
  priceNote: 'いつでも読み返せます',
  mockTitle: 'テスト決済', mockBody: '決済連携前の開発用画面です。実際の請求は発生しません。', mockPay: 'テスト決済を完了する',
  processing: '決済を確認しています…', cancelled: '決済がキャンセルされました。', backToResult: '結果に戻る',
  generating: 'レポートを作成しています', generatingHint: 'ウィンドウを閉じても続きます。通常は数分で終わります。',
  failed: 'レポートを作成できませんでした。', retry: 'もう一度試す', prev: '前の章', nextChapter: '次の章',
  chapterOf: '第{n}章 / 全{total}章', draft: '下書き', calendarTitle: '月ごとの流れ', answersTitle: '開いた答え',
  loadFailed: '読み込めませんでした。サーバーが起動しているか確認してください。', notFound: 'この鑑定は見つかりません。',
  disclaimer: '本サービスは自己理解のための参考資料であり、医療・法律・投資の助言ではありません。',
};

const zh: Ui = {
  brand: 'K-LuckyLetter',
  tagline: '用八字看职业判定',
  heroTitle: '留下、跳槽，还是放手一搏？\n不给含糊的安慰，给你一个判定。',
  heroSub: '根据出生日期排出命盘，结合你现在的处境计算出答案和时机。判定免费，立即可看。',
  start: '免费查看我的判定',
  features: [
    { title: '由计算得出的判定', body: '判定和时机由命盘、大运、流年、流月按固定规则计算。同样的输入，任何时候看都是同样的答案。' },
    { title: '贴合你的处境', body: '在职、求职、备考、升学、创业、准备复出。每种处境问的问题和判定标准都不同。' },
    { title: '用你的语言', body: '可用韩语、英语、日语、中文阅读，报告会用每种语言重新撰写。' },
  ],
  birthTitle: '你的出生日期是？', birthHint: '用出生日期排出命盘。',
  solar: '公历', lunar: '农历', leapMonth: '闰月', year: '年', month: '月', day: '日',
  timeTitle: '你的出生时间是？', timeHint: '知道时间会让时机判定更准确。不知道也没关系。',
  hour: '时 (0-23)', minute: '分 (0-59)', timeUnknown: '不知道出生时间',
  timeZone: '出生地的时区',
  jasi: '23点后出生的处理', jasiMidnight: '零点换日（默认）', jasiNext: '算作第二天', jasiSplit: '区分夜子时',
  genderTitle: '请选择性别', genderHint: '性别决定大运的顺逆。', male: '男', female: '女',
  nameTitle: '怎么称呼你？', nameHint: '解读中会用这个名字称呼你。', namePlaceholder: '姓名或昵称',
  situationTitle: '你现在的处境是？', situationHint: '选一个即可。处境不同，判定也不同。',
  optional: '选填', required: '必填', jobCustom: '自己填写', jobCustomPlaceholder: '请填写你的工作',
  questionTitle: '如果只问一个问题？', questionHint: '可以留空。写上日期，会连那个月的走势一起看。',
  questionNote: '公司或学校名称仅作参考，不会针对具体名称断言结果。',
  back: '上一步', next: '下一步', skip: '跳过', submit: '查看我的判定', sending: '计算中…',
  verdictOf: '{name}的判定', confidence: '把握度', yourQuestion: '你的问题', mentioned: '你提到的月份',
  lockedTitle: '尚未解锁的答案', lockedHint: '在完整解读中解锁', chapterRef: '第{n}章',
  unlock: '解锁完整解读', openReport: '打开我的报告',
  pillarsTitle: '命盘', elementsTitle: '五行分布', traitsTitle: '工作气质', strength: '日主强弱',
  daeunTitle: '十年大运', yearsTitle: '今年起三年', age: '{from}-{to}岁', current: '当前',
  tocTitle: '完整解读目录',
  trustTitle: '判定靠计算，文字做解释', trustBody: '判定和打开的月份先由规则确定。报告的文字不会改动这些结果，只解释理由。',
  priceNote: '可随时重新打开',
  mockTitle: '测试支付', mockBody: '这是接入支付前的开发页面，不会产生真实扣款。', mockPay: '完成测试支付',
  processing: '正在确认支付…', cancelled: '支付已取消。', backToResult: '返回结果',
  generating: '正在撰写报告', generatingHint: '关闭窗口也会继续，通常几分钟内完成。',
  failed: '报告生成失败。', retry: '重试', prev: '上一章', nextChapter: '下一章',
  chapterOf: '第{n}章 / 共{total}章', draft: '草稿', calendarTitle: '逐月走势', answersTitle: '已解锁的答案',
  loadFailed: '加载失败，请确认服务器已启动。', notFound: '找不到这份解读。',
  disclaimer: '本服务仅供自我了解参考，不构成医疗、法律或投资建议。',
};

const ALL: Record<Locale, Ui> = { ko, en, ja, zh };
export type Text = Ui & UiMore;
export const ui = (locale: Locale): Text => ({ ...ALL[locale], ...MORE[locale] });

export const fill = (template: string, params: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, k) => String(params[k] ?? ''));
