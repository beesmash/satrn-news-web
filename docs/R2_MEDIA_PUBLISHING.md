# SATRN News R2 Media Publishing — Setup and Release v0.3

STATUS: Code and validation are prepared. An R2 bucket and public media domain have NOT been created or connected by ChatGPT.

## One-time Cloudflare dashboard setup

1. Sign into the Cloudflare account hosting SATRN News; review R2 pricing before enabling it.
2. R2 Object Storage -> Create bucket. Proposed name: satrn-news-media. Choose the Standard storage class and leave public access disabled.
3. Keep the bucket private during staging. Do not enable r2.dev public access for production use.
4. When SATRNNews.com is connected to the same Cloudflare account/zone, R2 Settings -> Custom Domains -> Connect domain for a validated media subdomain (proposed: media.satrnnews.com). This hostname is NOT live.
5. Set production cache/security policies before opening public access. The media domain is intended for approved derivatives only, never Dropbox originals.

Docs: https://developers.cloudflare.com/r2/buckets/create-buckets/
Docs: https://developers.cloudflare.com/r2/buckets/public-buckets/
Docs: https://developers.cloudflare.com/r2/reference/wrangler-commands/

## Private folder and newspaper import

Dropbox editorial master: /Erick Brown/SATRN NEWS EDITORIAL/08_NEWSPAPERS/DAILY_SOURCE
Dropbox export handoff: /Erick Brown/SATRN NEWS EDITORIAL/09_APPROVED_EXPORTS

An authorized editor must first place the complete verified newspaper PDF and all page originals into the private editorial folder. Prepare independent compressed page images numbered 001.webp, 002.webp, etc., and keep the original ZIP/PDF unchanged. The Daily Source directories are presently empty; do not invent newspaper pages or articles.

## Manifest format — local and private

On your computer, create a file such as .satrn-private/issue.json (gitignored). Files in the manifest must exist locally. Manifest example fields:

  bucket: satrn-news-media
  approval: { editor: Authorized editor, approvedAt: ISO timestamp, rightsVerified: true }
  objects: [{ source: /absolute/path/to/001.webp, key: newspapers/2026/10/28/001-<12_hex_hash>.webp, contentType: image/webp, sha256: <64_hex_hash> }]

Hash each exact approved image file with this macOS command:

    shasum -a 256 /path/to/001.webp

The first twelve SHA256 characters must appear in the object key, so later revisions get new immutable URLs. No keys may point outside newspapers/articles/audio/video-thumbnails. PDF files are supported under the 315 MiB Wrangler single-object upload cap; larger media requires a multipart uploader.

## Dry-run validation: no upload

    npm install
    node scripts/r2-media.mjs --manifest .satrn-private/issue.json

## Upload only after the editor verifies all assets

Requires an existing bucket, an authenticated Cloudflare Wrangler session in the correct account, and human approval. The explicit command is:

    SATRN_R2_PUBLISH=APPROVED node scripts/r2-media.mjs --manifest .satrn-private/issue.json --upload

This uploads objects one-by-one with Wrangler --remote. It DOES NOT modify the public article/newspaper catalogs or authorize publication by itself.

## Final editorial release to SATRN News

1. Inspect the uploaded public-object URLs on the verified media domain.
2. Write an edition record in src/data/editions.json with exact slug/date/title/page count, editor review, and verified PDF/page-image URLs.
3. Validate catalog with npm run check, require review on the GitHub pull request and merge only after editorial approval.
4. Inspect the production newspaper archive, page viewer and PDF; only then consider domain cutover from Bluehost.

No OAuth keys, Cloudflare API tokens, or Dropbox share URLs should ever be placed in git or the public HTML.
