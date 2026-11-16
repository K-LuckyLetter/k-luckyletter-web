import { ANALYTICS_TOKEN } from '@/lib/seo';

/** 방문 통계(Cloudflare Web Analytics). 쿠키를 쓰지 않고, 화면 이동도 한 번씩 센다. */
export function Analytics() {
  if (!ANALYTICS_TOKEN) return null;
  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: ANALYTICS_TOKEN })}
    />
  );
}
