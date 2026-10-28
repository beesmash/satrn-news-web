# SATRN News v2 — GitHub/Cloudflare Astro Edition

This is the **Astro adaptation** of the user-supplied **SATRN News v2 WordPress Theme 1.0.0** (archive uploaded October 28, 2026). The original archive remains a separate WordPress/PHP theme; it **cannot** be installed directly in Cloudflare Pages or GitHub Pages.

## Visual and editorial modules retained

- SATRN aqua (`#13aeb9`), orange (`#f28c28`), ink/black colors, masthead, and QUESTION EVERYTHING tagline.
- Breaking ticker, 1+4 feature-story grid, Top Headlines, Latest / Trending.
- WordPress-inspired taxonomy of World News, World Videos, Culture, Business, Blockchain, Crypto Videos, Videos, Science, Technology, Sport, Soccer Videos, Racing Videos, plus extended news/opinion/markets categories.
- JANUS Intelligence dark module, SATRN Audio, Daily Brief newsletter presentation and a separate SATRN.TV network bridge.
- Static article templates, editorial metadata, mobile navigation, newsroom search and digital newspaper index.

**Important visual note:** The original ZIP contains a WordPress theme screenshot (a brand graphic) but not a separate transparent logo asset. The Astro masthead now includes a vector adaptation from the supplied SATRN logo; the approved desktop design remains the visual reference.

## Development

Requires Node.js **24**.

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Cloudflare Pages deployment

Connect GitHub repository `beesmash/satrn-news-web`, production branch `main`, framework `Astro`, build command `npm run build`, output directory `dist`, Node.js `24`.

**Staging only:** `public/robots.txt` and `public/_headers` block search indexing until production review.

## Editorial workflow

The site only renders articles with `status: "published"` in `src/data/articles.json`; never commit confidential drafts or JANUS proprietary formulas in this public repository. Example article structure:

```json
{
  "slug": "your-verified-headline",
  "title": "Your Verified Headline",
  "summary": "Accurate editorial summary.",
  "subheadline": "Optional supporting deck.",
  "date": "2026-10-28",
  "author": "SATRN News",
  "category": "World News",
  "categories": ["world-news"],
  "status": "published",
  "verification": "Verified",
  "storyType": "News",
  "trendingScore": 0,
  "breaking": false,
  "image": "/media/approved-image.jpg",
  "imageAlt": "Description",
  "imageCaption": "Photo credit and caption",
  "paragraphs": ["First paragraph.", "Second paragraph."],
  "sources": [{"title":"Official source","url":"https://example.org/"}]
}
```

The site currently has **zero imported articles and editions**. All editorial content requires review before publishing. Add a full newspaper PDF to `public/editions` and a matching `src/data/editions.json` entry to publish a paper.

## Not yet implemented

- WordPress PHP theme runtime or WordPress REST endpoints (`/wp-json/satrn/v1/...`).
- Staff login, secure editorial CMS, scheduled publication, subscriptions, advertising backend.
- JANUS/MORGAN publishing automation and verification gate.
- SATRN.TV live feed infrastructure.
- Bluehost/WordPress content migration, historical URLs/redirects, domain cutover and email DNS migration.
- Final official SVG/PNG logo and original newspaper page-image viewer.

## Safety

Do not blindly import PHP, unknown plugins or cron entries from a compromised WordPress host. Use a reviewed backup and migrate data/articles/assets separately. Never expose API secrets in client code, GitHub commits or the public repository.

SATRN News © 2026. All rights reserved; no open-source license granted.


## v0.2 editorial publishing and Dropbox strategy (Oct 28, 2026)

- Front-end now includes a full article reader, source attribution and credit display.
- Each approved daily newspaper can have a detail page with every image page in order and/or a PDF.
- Publication catalogs remain empty until actual SATRN editorial approval and import.
- Public JSON catalog validation rejects drafts, missing review metadata, broken local asset paths, and Dropbox shared links used as public media.
- Pipeline and automated tests: npm run check.
- Storage: private Dropbox originals; approved derivatives on Cloudflare R2; public site on Cloudflare Workers.
- Architecture and workflows: docs/STORAGE_ARCHITECTURE.md, docs/EDITORIAL_WORKFLOW.md, docs/CONTENT_SCHEMAS.md.

This is a static approved-release workflow, NOT yet a multi-user authentication system or continuously scheduled publishing agent. Dropbox editorial subfolders were created and verified on October 28, 2026. An R2 bucket and public media domain have NOT yet been created. Configure GitHub branch protection to enforce editorial review.


## v0.3 R2 media preparation

A dry-run validation utility has been added at scripts/r2-media.mjs. It checks editor signoff, file rights, SHA256 fingerprints and immutable keys. Actual R2 upload requires both --upload and SATRN_R2_PUBLISH=APPROVED in a locally authenticated Cloudflare session. See docs/R2_MEDIA_PUBLISHING.md. No media has been uploaded and no bucket has been created by this change.
