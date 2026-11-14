import type { NextConfig } from 'next';

// 서버 없이 정적 파일로 배포한다(GitHub Pages). 데이터는 전부 브라우저가 API 서버에서 가져온다.
const config: NextConfig = { output: 'export' };

export default config;
