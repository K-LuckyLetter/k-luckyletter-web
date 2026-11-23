import { ADSENSE_CLIENT } from '@/lib/seo';

export const dynamic = 'force-static';

/** 이 사이트의 광고 판매자가 누구인지 알리는 파일. 게시자 ID가 없으면 빈 파일이 된다. */
export function GET() {
  const body = ADSENSE_CLIENT ? `google.com, ${ADSENSE_CLIENT.replace(/^ca-/, '')}, DIRECT, f08c47fec0942fa0\n` : '';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
