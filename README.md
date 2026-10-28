# SATRN News Web — v0.1 Starter

Official SATRN News publishing platform. Independent reporting, investigations, daily digital newspapers, SATRN.TV integration and human-reviewed AI-assisted newsroom operations.

## Current implementation

- Responsive Astro static news website and navigation.
- Build-time publication of **approved** articles from src/data/articles.json.
- Digital newspaper archive index from src/data/editions.json.
- Explicit SATRN LIVE placeholder (no functioning live player yet).
- No article migration, full newspaper images, CMS, video streaming backend, or automated editorial publishing yet.
- Staging is intentionally blocked from search-engine indexing until verified production launch.

## Local development

Requires Node.js 22.12+.

1. Run npm install
2. Run npm run dev
3. Run npm run build to verify the production build
4. Run npm run preview to inspect the built website

## Deploy on Cloudflare Pages

- Connect the GitHub repository beesmash/satrn-news-web through Cloudflare Workers & Pages.
- Framework preset: Astro.
- Production branch: main.
- Build command: npm run build.
- Output directory: dist.
- Verify the *.pages.dev preview before changing DNS.
- Before public launch: set the production site URL in astro.config.mjs; update robots.txt; remove the staging X-Robots-Tag: noindex, nofollow from public/_headers.
- Do not move DNS or cancel Bluehost before backups, URL redirects, media and email-record verification.

## Publish approved reporting

Add an object to src/data/articles.json with slug, title, summary, category, date, author, status: published, paragraphs, and optional owned/licensed image fields (image, imageAlt, imageCaption). The static build creates /news/SLUG/.

Never place unpublished confidential material or proprietary JANUS formulas in this public repository.

## Digital newspaper issues

Place a verified newspaper PDF in public/editions and add an object to src/data/editions.json containing title, summary, date, pages, status: published and url pointing to that PDF.

Exact SATRN News newspaper page-image layouts will require the approved source ZIP files and a later archive/viewer implementation.

## Next milestones

Audit Bluehost/WordPress content and backups; import approved articles and media; implement newspaper image viewer and archive; add private authenticated editorial CMS with audit trails and approvals; add RSS and SEO; connect approved SATRN.TV video; implement JANUS/MORGAN review workflow.

SATRN News content © 2026. All rights reserved. No open-source license selected. Do not commit any secrets or customer/subscriber records.

Build status: not verified locally because the npm registry was unavailable in this environment; use GitHub Actions to confirm before deploying.
