// 이용약관, 개인정보 처리방침, 환불 정책과 사업자 표기. 4개 언어.
// 법률 검토를 거치지 않은 초안이다. 내용을 바꾸면 UPDATED 도 함께 바꾼다.

import type { Locale } from './ui';

export const LEGAL_DOCS = ['terms', 'privacy', 'refund'] as const;
export type LegalDoc = (typeof LEGAL_DOCS)[number];
export const isLegalDoc = (v: string): v is LegalDoc => (LEGAL_DOCS as readonly string[]).includes(v);

const UPDATED = '2026-11-14';
const CONTACT = 'k-luckyletter@k-luckyletter.com';

interface Section { heading: string; body: string[] }
interface Doc { title: string; intro: string; sections: Section[] }

interface Legal {
  updatedLabel: string;
  /** 결제 버튼 아래에 붙는 안내. 뒤에 약관과 환불 정책 링크가 이어진다. */
  checkoutNote: string;
  /** 사이트 하단 사업자 표기. */
  business: string[];
  docs: Record<LegalDoc, Doc>;
}

const ko: Legal = {
  updatedLabel: `시행일 ${UPDATED}`,
  checkoutNote: '결제 직후 리포트 생성이 시작되며, 생성된 뒤에는 단순 변심으로 환불되지 않습니다. 결제하면 아래 문서에 동의한 것으로 봅니다.',
  business: [
    '상호 글루메이트 · 대표 윤정훈 · 사업자등록번호 785-03-03768',
    '통신판매업 신고번호 제 2026-대전대덕-0372 호',
    '주소 대전광역시 대덕구 한남로 70, B203호 (오정동, 한남대학교 캠퍼스혁신파크)',
    `문의 ${CONTACT}`,
  ],
  docs: {
    terms: {
      title: '이용약관',
      intro: 'K-LuckyLetter(이하 "서비스")는 글루메이트(이하 "회사")가 운영합니다. 서비스를 이용하면 이 약관에 동의한 것으로 봅니다.',
      sections: [
        { heading: '1. 서비스 내용', body: [
          '서비스는 입력한 생년월일시와 상황을 바탕으로 사주 명식을 계산하고, 커리어에 관한 판정과 시기를 알려 줍니다. 무료 결과는 누구나 볼 수 있고, 전체 리포트(기본 10장, 심층 14장)는 유료입니다.',
          '판정과 시기는 정해진 규칙으로 계산하며, 리포트의 글은 그 계산 결과를 AI가 풀어 쓴 것입니다.',
        ] },
        { heading: '2. 참고 자료라는 점', body: [
          '서비스는 자기이해를 돕는 참고 자료입니다. 의학·법률·투자·진로에 관한 전문 조언이 아니며, 특정 결과(합격, 이직 성공, 수익 등)를 보장하지 않습니다.',
          '서비스 내용을 참고해 내린 결정과 그 결과는 이용자 본인의 책임입니다.',
        ] },
        { heading: '3. 이용 자격', body: [
          '만 14세 이상이면 이용할 수 있습니다. 유료 결제는 결제 수단을 쓸 권한이 있는 본인이 해야 합니다.',
        ] },
        { heading: '4. 결제와 제공', body: [
          '가격은 결제 화면에 표시된 금액과 통화를 따릅니다. 결제는 PayPal을 통해 이루어지며, 회사는 카드 번호 등 결제 수단 정보를 저장하지 않습니다.',
          '결제가 확정되면 리포트 생성이 바로 시작되고, 입력한 이메일로 리포트 링크를 보냅니다. 리포트는 그 링크로 다시 볼 수 있습니다.',
          '리포트 링크를 아는 사람은 누구나 리포트를 열 수 있습니다. 링크를 다른 사람과 공유하지 않도록 주의해 주세요.',
        ] },
        { heading: '5. 환불', body: [
          '환불 기준과 절차는 환불 정책을 따릅니다.',
        ] },
        { heading: '6. 이용자가 지켜야 할 것', body: [
          '다른 사람의 개인정보를 동의 없이 입력하거나, 자동화된 방법으로 서비스를 대량 호출하거나, 서비스 운영을 방해하는 행위를 해서는 안 됩니다.',
          '리포트는 개인적인 용도로 이용할 수 있습니다. 회사의 동의 없이 리포트나 서비스 내용을 판매하거나 상업적으로 재배포할 수 없습니다.',
        ] },
        { heading: '7. 서비스 변경과 중단', body: [
          '회사는 서비스 내용과 가격을 바꿀 수 있고, 점검이나 장애로 서비스가 일시 중단될 수 있습니다. 이미 결제한 리포트에는 결제 당시의 조건이 적용됩니다.',
        ] },
        { heading: '8. 책임의 한계', body: [
          '회사는 고의 또는 중대한 과실이 없는 한, 서비스 이용으로 생긴 간접 손해에 대해 책임지지 않습니다. 회사의 책임은 법이 허용하는 범위에서 이용자가 해당 리포트에 지불한 금액을 한도로 합니다.',
          '거주 국가의 소비자 보호법이 더 넓은 권리를 주는 경우 그 법이 우선합니다.',
        ] },
        { heading: '9. 준거법과 문의', body: [
          '이 약관은 대한민국 법을 따릅니다. 거주 국가의 강행 규정이 주는 소비자 권리는 그대로 유지됩니다.',
          `문의: ${CONTACT}`,
        ] },
      ],
    },
    privacy: {
      title: '개인정보 처리방침',
      intro: '글루메이트(이하 "회사")는 K-LuckyLetter 서비스를 제공하는 데 필요한 최소한의 개인정보만 처리합니다.',
      sections: [
        { heading: '1. 수집하는 정보', body: [
          '풀이를 만들 때: 생년월일과 태어난 시간, 양력·음력 구분, 태어난 곳의 시간대, 성별, 이름 또는 닉네임, 현재 상황과 직무, 남긴 질문.',
          '결제할 때: 리포트 링크를 받을 이메일 주소, 주문 금액과 통화, PayPal 주문 번호. 카드 번호 등 결제 수단 정보는 PayPal이 처리하며 회사는 받지 않습니다.',
          '심층 리포트를 이용할 때: 적성 검사 30문항의 답.',
          '회원 가입이 없고, 광고용 추적 도구나 쿠키를 쓰지 않습니다. 방문 통계는 쿠키 없이, 개인을 식별하지 않는 방식으로만 집계합니다.',
        ] },
        { heading: '2. 이용 목적', body: [
          '명식 계산과 판정, 리포트 생성과 제공, 리포트 링크 메일 발송, 결제 처리와 환불, 문의 응대에 씁니다. 광고나 마케팅 목적으로 쓰지 않으며 제3자에게 판매하지 않습니다.',
        ] },
        { heading: '3. 처리를 맡기는 곳과 국외 이전', body: [
          '서비스 제공을 위해 아래 업체에 필요한 범위의 정보를 전달합니다. 이들 업체의 서버는 대한민국 밖(주로 미국)에 있을 수 있습니다.',
          'PayPal: 결제 처리. 주문 금액과 설명이 전달됩니다.',
          'Anthropic: 리포트 문장 생성. 이름 또는 닉네임, 명식 계산 결과, 상황, 질문, 적성 검사 결과가 전달됩니다. 이메일 주소는 전달하지 않습니다.',
          'Resend: 리포트 링크 메일 발송. 이메일 주소와 이름이 전달됩니다.',
          'Cloudflare, GitHub: 사이트 전송과 접속 중계, 방문 통계(Cloudflare Web Analytics, 쿠키를 쓰지 않음). 접속 기록(IP 주소 등)이 처리될 수 있습니다.',
        ] },
        { heading: '4. 보관 기간', body: [
          '풀이와 리포트는 다시 볼 수 있도록 삭제를 요청할 때까지 보관합니다.',
          '결제 기록은 전자상거래 관련 법령에 따라 5년간 보관합니다.',
        ] },
        { heading: '5. 이용자의 권리', body: [
          `본인 정보의 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다. ${CONTACT} 로 리포트 링크 또는 결제에 쓴 이메일 주소를 알려 주시면 확인 후 10일 안에 처리합니다.`,
          '법령에 따라 보관해야 하는 결제 기록은 보관 기간이 끝난 뒤 삭제합니다.',
        ] },
        { heading: '6. 아동', body: [
          '만 14세 미만의 정보는 수집하지 않습니다. 해당하는 정보가 입력된 사실을 알게 되면 삭제합니다.',
        ] },
        { heading: '7. 안전 조치', body: [
          '전송 구간은 HTTPS로 암호화하고, 저장된 정보에는 운영자만 접근합니다. 리포트는 링크를 아는 사람이 열 수 있으므로 링크를 공유하지 않도록 주의해 주세요.',
        ] },
        { heading: '8. 개인정보 보호책임자', body: [
          `윤정훈 (글루메이트 대표) · ${CONTACT}`,
          '이 방침을 바꾸면 이 페이지에 시행일과 함께 게시합니다.',
        ] },
      ],
    },
    refund: {
      title: '환불 정책',
      intro: '리포트는 결제 직후 입력한 정보에 맞춰 새로 만들어지는 디지털 콘텐츠입니다. 그래서 환불 기준이 일반 상품과 다릅니다.',
      sections: [
        { heading: '1. 리포트 생성 전: 전액 환불', body: [
          '리포트가 생성되기 전이라면 전액 환불됩니다. 결제가 확정되면 생성이 바로 시작되므로, 실제로는 아래와 같은 경우가 해당합니다.',
          '결제했는데 리포트가 생성되지 않았거나 잠긴 상태로 남아 있는 경우.',
          '같은 풀이에 대해 두 번 결제된 경우(중복 결제분).',
        ] },
        { heading: '2. 리포트 생성 후: 환불 불가', body: [
          '리포트가 생성되어 열람할 수 있게 된 뒤에는 단순 변심이나 "내용이 기대와 다르다"는 이유로는 환불되지 않습니다. 결제 화면에서 이 점을 미리 안내합니다.',
          '판정 내용과 무료 결과는 결제 전에 확인할 수 있으니, 결제 전에 충분히 살펴봐 주세요.',
        ] },
        { heading: '3. 신청 방법', body: [
          `결제일로부터 14일 안에 ${CONTACT} 로 결제에 쓴 이메일 주소, 결제일, 사유를 보내 주세요. 3영업일 안에 답변드립니다.`,
          '환불은 결제에 쓴 PayPal 결제 수단으로 돌려드립니다. 실제 입금까지 걸리는 시간은 PayPal과 카드사에 따라 다릅니다.',
        ] },
        { heading: '4. 법이 정한 권리', body: [
          '이 정책은 거주 국가의 소비자 보호법이 주는 권리를 제한하지 않습니다. 그 법이 더 넓은 환불 권리를 정하고 있으면 그에 따릅니다.',
        ] },
      ],
    },
  },
};

const en: Legal = {
  updatedLabel: `Effective ${UPDATED}`,
  checkoutNote: 'Your report starts generating right after payment. Once it has been generated, it cannot be refunded for a change of mind. By paying you agree to the documents below.',
  business: [
    'GLUMATE (글루메이트) · Representative: Junghun Yun · Business registration no. 785-03-03768',
    'Mail-order business report no. 2026-대전대덕-0372',
    'B203, 70 Hannam-ro, Daedeok-gu, Daejeon, Republic of Korea',
    `Contact: ${CONTACT}`,
  ],
  docs: {
    terms: {
      title: 'Terms of Service',
      intro: 'K-LuckyLetter (the "Service") is operated by GLUMATE (the "Company"), a business registered in the Republic of Korea. By using the Service you agree to these terms.',
      sections: [
        { heading: '1. What the Service does', body: [
          'The Service calculates a saju (Four Pillars) chart from the birth date, birth time, and situation you enter, and gives a career verdict with timing. The free result is open to everyone. The full report (10 chapters for Basic, 14 for Deep) is paid.',
          'The verdict and timing are calculated by fixed rules. The text of the report is written by AI to explain those calculated results.',
        ] },
        { heading: '2. For reference only', body: [
          'The Service is material for self-reflection. It is not medical, legal, investment, or professional career advice, and it does not guarantee any outcome such as passing an exam, getting a job, or making a profit.',
          'Decisions you make with the Service in mind, and their results, are your own responsibility.',
        ] },
        { heading: '3. Who can use it', body: [
          'You must be at least 14 years old, or older if the law where you live requires it. Paid purchases must be made by a person authorized to use the payment method.',
        ] },
        { heading: '4. Payment and delivery', body: [
          'The price and currency are those shown on the checkout screen. Payment is processed by PayPal, and the Company does not store card numbers or other payment details.',
          'Once payment is confirmed, report generation starts immediately and a link to the report is sent to the email address you entered. You can reopen the report with that link.',
          'Anyone who has the report link can open the report. Please do not share it with others.',
        ] },
        { heading: '5. Refunds', body: [
          'Refund conditions and the request process are set out in the Refund Policy.',
        ] },
        { heading: '6. Your responsibilities', body: [
          'Do not enter another person\'s personal information without their consent, call the Service in bulk by automated means, or interfere with its operation.',
          'The report is for your personal use. You may not sell or commercially redistribute reports or Service content without the Company\'s consent.',
        ] },
        { heading: '7. Changes and interruptions', body: [
          'The Company may change the Service and its prices, and the Service may be temporarily unavailable because of maintenance or outages. A report you have already paid for stays under the conditions that applied when you paid.',
        ] },
        { heading: '8. Limitation of liability', body: [
          'Unless caused by intent or gross negligence, the Company is not liable for indirect damages arising from use of the Service. To the extent the law allows, the Company\'s liability is limited to the amount you paid for the report in question.',
          'If consumer protection law where you live gives you broader rights, that law prevails.',
        ] },
        { heading: '9. Governing law and contact', body: [
          'These terms are governed by the laws of the Republic of Korea. Consumer rights given by mandatory law where you live are not affected.',
          `Contact: ${CONTACT}`,
        ] },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      intro: 'GLUMATE (the "Company") processes only the personal information needed to provide the K-LuckyLetter service.',
      sections: [
        { heading: '1. Information we collect', body: [
          'When you create a reading: birth date and time, solar or lunar calendar, the time zone of your birthplace, gender, a name or nickname, your current situation and job field, and any question you leave.',
          'When you pay: the email address for your report link, the order amount and currency, and the PayPal order number. Card numbers and other payment details are handled by PayPal and never reach the Company.',
          'When you use the Deep report: your answers to the 30-question interest test.',
          'There are no accounts, and we do not use advertising trackers or cookies. Visit statistics are counted without cookies and without identifying individuals.',
        ] },
        { heading: '2. How we use it', body: [
          'To calculate your chart and verdict, generate and deliver your report, email the report link, process payments and refunds, and answer inquiries. We do not use it for advertising or marketing, and we do not sell it.',
        ] },
        { heading: '3. Service providers and international transfer', body: [
          'To provide the Service we pass the necessary information to the providers below. Their servers may be located outside your country, mainly in the United States, while our own server is in the Republic of Korea.',
          'PayPal: payment processing. Receives the order amount and description.',
          'Anthropic: writing the report text. Receives your name or nickname, the calculated chart, your situation, your question, and your test results. Your email address is not sent.',
          'Resend: sending the report link email. Receives your email address and name.',
          'Cloudflare and GitHub: delivering the site, relaying connections, and visit statistics (Cloudflare Web Analytics, which does not use cookies). They may process connection logs such as IP addresses.',
        ] },
        { heading: '4. How long we keep it', body: [
          'Readings and reports are kept until you ask us to delete them, so that you can reopen them.',
          'Payment records are kept for five years as required by Korean e-commerce law.',
        ] },
        { heading: '5. Your rights', body: [
          `You may ask to access, correct, or delete your information, or to stop its processing. Email ${CONTACT} with your report link or the email address used for payment, and we will act within 10 days after verifying the request.`,
          'Payment records that the law requires us to keep are deleted once the retention period ends. Depending on where you live, you may also have the right to complain to your data protection authority.',
        ] },
        { heading: '6. Children', body: [
          'We do not collect information from children under 14. If we learn that such information was entered, we delete it.',
        ] },
        { heading: '7. Security', body: [
          'Data in transit is encrypted with HTTPS, and stored data is accessible only to the operator. Because a report can be opened by anyone who has its link, please do not share the link.',
        ] },
        { heading: '8. Privacy contact', body: [
          `Junghun Yun (Representative, GLUMATE) · ${CONTACT}`,
          'If this policy changes, the new version is posted on this page with its effective date.',
        ] },
      ],
    },
    refund: {
      title: 'Refund Policy',
      intro: 'A report is digital content created for you from the information you entered, right after you pay. For that reason the refund rules differ from those for ordinary goods.',
      sections: [
        { heading: '1. Before the report is generated: full refund', body: [
          'If your report has not been generated yet, you get a full refund. Generation starts as soon as payment is confirmed, so in practice this covers the cases below.',
          'You paid but the report was not generated or stayed locked.',
          'You were charged twice for the same reading (the duplicate charge is refunded).',
        ] },
        { heading: '2. After the report is generated: no refund', body: [
          'Once the report has been generated and made available to you, it cannot be refunded for a change of mind or because the content differed from what you expected. This is stated on the checkout screen before you pay.',
          'The verdict and the free result are shown before payment, so please review them before you buy.',
        ] },
        { heading: '3. How to request a refund', body: [
          `Within 14 days of payment, email ${CONTACT} with the email address used for payment, the payment date, and the reason. We reply within 3 business days.`,
          'Refunds go back to the PayPal payment method you used. How long the money takes to arrive depends on PayPal and your card issuer.',
        ] },
        { heading: '4. Your legal rights', body: [
          'This policy does not limit the rights you have under consumer protection law where you live. If that law gives you broader refund rights, it applies.',
        ] },
      ],
    },
  },
};

const ja: Legal = {
  updatedLabel: `施行日 ${UPDATED}`,
  checkoutNote: '決済後すぐにレポートの生成が始まります。生成後は、お客様都合による返金はできません。決済により下記の文書に同意したものとみなします。',
  business: [
    '販売事業者 GLUMATE(글루메이트) · 代表者 Junghun Yun · 事業者登録番号 785-03-03768',
    '通信販売業届出番号 第2026-대전대덕-0372号',
    '所在地 B203, 70 Hannam-ro, Daedeok-gu, Daejeon, Republic of Korea',
    `お問い合わせ ${CONTACT}`,
  ],
  docs: {
    terms: {
      title: '利用規約',
      intro: 'K-LuckyLetter(以下「本サービス」)は、大韓民国の事業者であるGLUMATE(以下「当社」)が運営しています。本サービスを利用した場合、本規約に同意したものとみなします。',
      sections: [
        { heading: '1. サービスの内容', body: [
          '本サービスは、入力された生年月日・出生時刻と状況をもとに四柱推命の命式を計算し、キャリアに関する判定と時期をお伝えします。無料結果はどなたでもご覧いただけます。全文レポート(ベーシック10章、ディープ14章)は有料です。',
          '判定と時期は定められた規則で計算し、レポートの文章はその計算結果をAIが説明したものです。',
        ] },
        { heading: '2. 参考資料であること', body: [
          '本サービスは自己理解のための参考資料です。医療・法律・投資・進路に関する専門的な助言ではなく、合格・転職の成功・収益などの結果を保証するものではありません。',
          '本サービスを参考にして行った判断とその結果は、利用者ご自身の責任となります。',
        ] },
        { heading: '3. 利用資格', body: [
          '14歳以上の方がご利用いただけます。有料の決済は、その決済手段を使用する権限のあるご本人が行ってください。',
        ] },
        { heading: '4. 決済と提供', body: [
          '価格は決済画面に表示された金額と通貨に従います。決済はPayPalを通じて行われ、当社はカード番号などの決済情報を保存しません。',
          '決済が確定するとすぐにレポートの生成が始まり、入力されたメールアドレスにレポートのリンクをお送りします。レポートはそのリンクからいつでも読み返せます。',
          'レポートのリンクを知っている人は誰でもレポートを開くことができます。リンクを他人と共有しないようご注意ください。',
        ] },
        { heading: '5. 返金', body: [
          '返金の条件と手続きは返金ポリシーに定めます。',
        ] },
        { heading: '6. 利用者の遵守事項', body: [
          '他人の個人情報を同意なく入力すること、自動化された手段で大量にアクセスすること、本サービスの運営を妨げる行為は禁止します。',
          'レポートは個人的な目的でご利用いただけます。当社の同意なく、レポートや本サービスの内容を販売または商業的に再配布することはできません。',
        ] },
        { heading: '7. サービスの変更と中断', body: [
          '当社は本サービスの内容と価格を変更することがあり、点検や障害により一時的に利用できなくなる場合があります。すでに決済されたレポートには決済時の条件が適用されます。',
        ] },
        { heading: '8. 責任の制限', body: [
          '当社は、故意または重大な過失がある場合を除き、本サービスの利用により生じた間接的な損害について責任を負いません。当社の責任は、法令が認める範囲で、利用者が当該レポートに支払った金額を上限とします。',
          'お住まいの国の消費者保護法がより広い権利を定めている場合は、その法律が優先します。',
        ] },
        { heading: '9. 準拠法とお問い合わせ', body: [
          '本規約は大韓民国法に準拠します。お住まいの国の強行法規が定める消費者の権利は影響を受けません。',
          `お問い合わせ: ${CONTACT}`,
        ] },
      ],
    },
    privacy: {
      title: 'プライバシーポリシー',
      intro: 'GLUMATE(以下「当社」)は、K-LuckyLetterの提供に必要な最小限の個人情報のみを取り扱います。',
      sections: [
        { heading: '1. 取得する情報', body: [
          '鑑定を作成するとき: 生年月日と出生時刻、新暦・旧暦の区分、出生地のタイムゾーン、性別、お名前またはニックネーム、現在の状況と職種、ご質問。',
          '決済するとき: レポートのリンクを受け取るメールアドレス、注文金額と通貨、PayPalの注文番号。カード番号などの決済情報はPayPalが取り扱い、当社は受け取りません。',
          'ディープレポートをご利用のとき: 適性テスト30問の回答。',
          '会員登録はなく、広告用のトラッキングツールやクッキーは使用しません。アクセス統計は、クッキーを使わず、個人を特定しない方法でのみ集計します。',
        ] },
        { heading: '2. 利用目的', body: [
          '命式の計算と判定、レポートの生成と提供、レポートリンクのメール送信、決済と返金の処理、お問い合わせへの対応に利用します。広告やマーケティングには利用せず、第三者に販売しません。',
        ] },
        { heading: '3. 委託先と国外への移転', body: [
          'サービス提供のため、下記の事業者に必要な範囲の情報を提供します。これらの事業者のサーバーはお住まいの国の外(主に米国)にある場合があり、当社のサーバーは大韓民国にあります。',
          'PayPal: 決済処理。注文金額と説明が提供されます。',
          'Anthropic: レポート文章の生成。お名前またはニックネーム、命式の計算結果、状況、ご質問、適性テストの結果が提供されます。メールアドレスは提供しません。',
          'Resend: レポートリンクのメール送信。メールアドレスとお名前が提供されます。',
          'Cloudflare、GitHub: サイトの配信、通信の中継、アクセス統計(Cloudflare Web Analytics、Cookieは使用しません)。アクセス記録(IPアドレスなど)が処理される場合があります。',
        ] },
        { heading: '4. 保管期間', body: [
          '鑑定とレポートは、読み返せるよう、削除のご依頼があるまで保管します。',
          '決済記録は、韓国の電子商取引関連法令に基づき5年間保管します。',
        ] },
        { heading: '5. ご本人の権利', body: [
          `ご自身の情報の開示、訂正、削除、利用停止を請求できます。${CONTACT} 宛てにレポートのリンクまたは決済に使用したメールアドレスをお知らせください。確認のうえ10日以内に対応します。`,
          '法令により保管が必要な決済記録は、保管期間の終了後に削除します。',
        ] },
        { heading: '6. お子様', body: [
          '14歳未満の方の情報は取得しません。該当する情報が入力されたことが分かった場合は削除します。',
        ] },
        { heading: '7. 安全管理', body: [
          '通信はHTTPSで暗号化し、保存された情報には運営者のみがアクセスします。レポートはリンクを知っている人が開けるため、リンクを共有しないようご注意ください。',
        ] },
        { heading: '8. 個人情報保護責任者', body: [
          `Junghun Yun(GLUMATE 代表) · ${CONTACT}`,
          '本ポリシーを変更した場合は、施行日とともにこのページに掲載します。',
        ] },
      ],
    },
    refund: {
      title: '返金ポリシー',
      intro: 'レポートは、決済後すぐに、入力された情報に合わせて新しく作成されるデジタルコンテンツです。そのため、返金の基準が一般の商品とは異なります。',
      sections: [
        { heading: '1. レポート生成前: 全額返金', body: [
          'レポートが生成される前であれば全額返金します。決済が確定するとすぐに生成が始まるため、実際には次のような場合が該当します。',
          '決済したにもかかわらずレポートが生成されない、またはロックされたままの場合。',
          '同じ鑑定について二重に決済された場合(重複分)。',
        ] },
        { heading: '2. レポート生成後: 返金不可', body: [
          'レポートが生成され閲覧できる状態になった後は、お客様都合や「内容が期待と違う」という理由では返金できません。この点は決済画面で事前にご案内しています。',
          '判定内容と無料結果は決済前にご確認いただけます。ご購入前に十分ご確認ください。',
        ] },
        { heading: '3. 申請方法', body: [
          `決済日から14日以内に、${CONTACT} 宛てに、決済に使用したメールアドレス、決済日、理由をお送りください。3営業日以内に返信します。`,
          '返金は決済に使用したPayPalの支払い方法へ行います。実際の入金までの期間はPayPalとカード会社により異なります。',
        ] },
        { heading: '4. 法令上の権利', body: [
          '本ポリシーは、お住まいの国の消費者保護法が定める権利を制限するものではありません。その法律がより広い返金の権利を定めている場合は、それに従います。',
        ] },
      ],
    },
  },
};

const zh: Legal = {
  updatedLabel: `生效日期 ${UPDATED}`,
  checkoutNote: '付款后会立即开始生成报告。报告生成后，不能因个人原因退款。付款即表示您同意以下文件。',
  business: [
    '经营者 GLUMATE(글루메이트) · 代表人 Junghun Yun · 营业登记号 785-03-03768',
    '通信销售业申报号 第2026-대전대덕-0372号',
    '地址 B203, 70 Hannam-ro, Daedeok-gu, Daejeon, Republic of Korea',
    `联系方式 ${CONTACT}`,
  ],
  docs: {
    terms: {
      title: '服务条款',
      intro: 'K-LuckyLetter(以下称"本服务")由在大韩民国注册的经营者 GLUMATE(以下称"本公司")运营。使用本服务即表示您同意本条款。',
      sections: [
        { heading: '1. 服务内容', body: [
          '本服务根据您输入的出生日期、出生时间和当前情况计算四柱命盘，并给出职业方面的判断和时机。免费结果任何人都可以查看，完整报告(基础版10章、深度版14章)为付费内容。',
          '判断和时机按固定规则计算，报告的文字由AI根据计算结果撰写说明。',
        ] },
        { heading: '2. 仅供参考', body: [
          '本服务是帮助自我了解的参考资料，不构成医疗、法律、投资或职业方面的专业建议，也不保证任何结果(如考试通过、求职成功、获得收益等)。',
          '您参考本服务所做的决定及其结果由您本人负责。',
        ] },
        { heading: '3. 使用资格', body: [
          '年满14周岁方可使用。付费购买须由有权使用该支付方式的本人进行。',
        ] },
        { heading: '4. 付款与提供', body: [
          '价格以付款页面显示的金额和币种为准。付款通过PayPal完成，本公司不保存卡号等支付信息。',
          '付款确认后会立即开始生成报告，并把报告链接发送到您填写的邮箱。之后可以通过该链接重新查看报告。',
          '任何知道报告链接的人都可以打开报告，请不要把链接分享给他人。',
        ] },
        { heading: '5. 退款', body: [
          '退款条件和流程以退款政策为准。',
        ] },
        { heading: '6. 用户须遵守的事项', body: [
          '不得未经同意输入他人的个人信息，不得以自动化方式大量调用本服务，不得妨碍本服务的运营。',
          '报告仅供个人使用。未经本公司同意，不得出售或以商业目的再分发报告或本服务的内容。',
        ] },
        { heading: '7. 服务的变更与中断', body: [
          '本公司可能变更服务内容和价格，服务也可能因维护或故障而暂时中断。已付款的报告适用付款时的条件。',
        ] },
        { heading: '8. 责任限制', body: [
          '除故意或重大过失外，本公司不对因使用本服务产生的间接损失负责。在法律允许的范围内，本公司的责任以您为该报告支付的金额为限。',
          '如果您所在国家或地区的消费者保护法赋予您更广泛的权利，则以该法律为准。',
        ] },
        { heading: '9. 适用法律与联系方式', body: [
          '本条款适用大韩民国法律。您所在地强制性法律赋予的消费者权利不受影响。',
          `联系方式: ${CONTACT}`,
        ] },
      ],
    },
    privacy: {
      title: '隐私政策',
      intro: 'GLUMATE(以下称"本公司")只处理提供K-LuckyLetter服务所必需的最少个人信息。',
      sections: [
        { heading: '1. 收集的信息', body: [
          '生成解读时: 出生日期和时间、公历或农历、出生地时区、性别、姓名或昵称、当前情况和职业领域，以及您留下的问题。',
          '付款时: 接收报告链接的邮箱地址、订单金额和币种、PayPal订单号。卡号等支付信息由PayPal处理，本公司不会收到。',
          '使用深度报告时: 30道兴趣测试题的答案。',
          '本服务无需注册账号，也不使用广告类的追踪工具和Cookie。访问统计不使用Cookie，也不识别个人身份。',
        ] },
        { heading: '2. 使用目的', body: [
          '用于计算命盘和判断、生成并提供报告、发送报告链接邮件、处理付款和退款以及答复咨询。不用于广告或营销，也不向第三方出售。',
        ] },
        { heading: '3. 受托方与跨境传输', body: [
          '为提供服务，我们会向下列服务商提供必要范围内的信息。这些服务商的服务器可能位于您所在国家或地区之外(主要在美国)，本公司的服务器位于大韩民国。',
          'PayPal: 处理付款。会收到订单金额和说明。',
          'Anthropic: 生成报告文字。会收到姓名或昵称、命盘计算结果、当前情况、问题和测试结果。不会发送邮箱地址。',
          'Resend: 发送报告链接邮件。会收到邮箱地址和姓名。',
          'Cloudflare、GitHub: 网站分发、连接中转和访问统计（Cloudflare Web Analytics，不使用Cookie）。可能会处理IP地址等访问记录。',
        ] },
        { heading: '4. 保存期限', body: [
          '为了让您可以重新查看，解读和报告会保存到您要求删除为止。',
          '付款记录按韩国电子商务相关法规保存5年。',
        ] },
        { heading: '5. 您的权利', body: [
          `您可以要求查阅、更正、删除本人信息或停止处理。请将报告链接或付款时使用的邮箱地址发送至 ${CONTACT}，我们核实后会在10天内处理。`,
          '依法必须保存的付款记录会在保存期限届满后删除。',
        ] },
        { heading: '6. 儿童', body: [
          '我们不收集未满14周岁者的信息。如发现有此类信息被输入，我们会予以删除。',
        ] },
        { heading: '7. 安全措施', body: [
          '传输过程使用HTTPS加密，保存的信息只有运营者可以访问。由于知道链接的人都可以打开报告，请不要分享链接。',
        ] },
        { heading: '8. 个人信息保护负责人', body: [
          `Junghun Yun(GLUMATE 代表) · ${CONTACT}`,
          '本政策如有变更，会连同生效日期公布在本页面。',
        ] },
      ],
    },
    refund: {
      title: '退款政策',
      intro: '报告是在付款后立即根据您输入的信息生成的数字内容，因此退款标准与一般商品不同。',
      sections: [
        { heading: '1. 报告生成前: 全额退款', body: [
          '报告生成之前可以全额退款。付款确认后会立即开始生成，因此实际上是指以下情形。',
          '已付款但报告未生成，或仍处于锁定状态。',
          '同一份解读被重复扣款(退还重复部分)。',
        ] },
        { heading: '2. 报告生成后: 不予退款', body: [
          '报告生成并可以查看之后，不能以个人原因或"内容与预期不符"为由退款。付款页面会在付款前说明这一点。',
          '判断内容和免费结果在付款前即可查看，请在购买前仔细确认。',
        ] },
        { heading: '3. 申请方式', body: [
          `请在付款后14天内，将付款时使用的邮箱地址、付款日期和原因发送至 ${CONTACT}。我们会在3个工作日内回复。`,
          '退款会退回到您付款时使用的PayPal支付方式。实际到账时间取决于PayPal和发卡机构。',
        ] },
        { heading: '4. 法定权利', body: [
          '本政策不限制您所在国家或地区的消费者保护法赋予您的权利。如果该法律规定了更广泛的退款权利，则以其为准。',
        ] },
      ],
    },
  },
};

const ALL: Record<Locale, Legal> = { ko, en, ja, zh };
export const legal = (locale: Locale): Legal => ALL[locale];
