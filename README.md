# K-LuckyLetter Web

The web front end for [k-luckyletter.com](https://k-luckyletter.com). It is a Next.js app exported as static files and served from GitHub Pages. All data comes from a separate API server.

## Develop

```sh
cp .env.example .env.local   # point NEXT_PUBLIC_API_URL at the API server
npm install
npm run dev                  # http://localhost:3000/ko
```

## Deploy

Pushing to `main` builds the site and publishes the `out` folder to GitHub Pages. The API address is read from the repository variable `NEXT_PUBLIC_API_URL`.

## Search and sharing

- Titles, descriptions, keywords, and the landing-page saju introduction and FAQ for each language are in `src/lib/seo.ts`.
- `sitemap.xml` and `robots.txt` are generated at build time from `src/app/sitemap.ts` and `src/app/robots.ts`. `public/llms.txt` is a plain summary for AI search.
- Site ownership codes for Google Search Console and Naver Search Advisor are read from the repository variables `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and `NEXT_PUBLIC_NAVER_SITE_VERIFICATION`.

## Logo

The source is `brand/mark.svg`. `node scripts/brand.mjs` regenerates the favicon, app icons, and share image in `public/`, and the logo files for ad platforms in `brand/ads/`.

`node scripts/social.mjs` regenerates the Day Master cards for social posts (ten cards and a closing card, English and Japanese, 1080x1350) in `brand/social/`. The post text for each card is in `posts.md` in the same folders.
