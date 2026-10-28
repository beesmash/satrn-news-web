# SATRN News — Editorial storage and media delivery

## Storage roles

**Dropbox — private system of record**
Raw journalism, source documents, high-resolution photographs, original footage, recorded interviews, editorial audio, masters for Daily Source newspapers, page files, backups, licenses and release evidence.

**GitHub — application code / public, approved metadata only**
Astro website and publishing workflows; approved article JSON and newspaper index records. Do not put originals, passwords, embargoed materials, private source identities or unpublished content here.

**Cloudflare R2 Standard — public derivatives**
Compressed cover thumbnails, licensed article images, approved page JPG/WEBP previews and released PDF editions. Cloudflare Workers hosts the application. R2 is optional for initial staging; the live R2 bucket and custom domain have NOT been created by this commit.

**Cloudflare Stream (future) — public streaming**
Use an actual streaming service for 24/7 SATRN TV and long-form video, not Dropbox shared-link URLs or public R2 downloads as the video player backend.

## Suggested Dropbox folder organization (not created)

SATRN_NEWS_EDITORIAL/
  00_INBOX/
  01_RESEARCH_AND_SOURCES/
  02_DRAFTS/
  03_FACT_CHECK/
  04_EDITOR_APPROVAL/
  05_PHOTOS_MASTERS/
  06_VIDEO_MASTERS/
  07_AUDIO_MASTERS/
  08_NEWSPAPERS/DAILY_SOURCE/YYYY/MM/DD/
  08_NEWSPAPERS/SPECIAL_INVESTIGATIONS/
  09_APPROVED_EXPORTS/
  10_CORRECTIONS_AND_AUDIT/
  11_BACKUPS/

Keep originals immutable where reasonable; use separate derivative files when resizing or adding overlays.

## Public media naming (proposal)

media.satrnnews.com/articles/YYYY/MM/DD/story-slug/lead.webp
media.satrnnews.com/newspapers/YYYY/MM/DD/cover.webp
media.satrnnews.com/newspapers/YYYY/MM/DD/pages/001.webp
media.satrnnews.com/newspapers/YYYY/MM/DD/edition.pdf
media.satrnnews.com/video-thumbnails/show-slug/episode-id.webp

The above domain is **proposed, not activated**. A verified custom domain connected to R2 is preferable to the development-only r2.dev URL. Configure caching and access appropriately. Cloudflare egress pricing and operation charges can change; verify billing before scaling.

## Approval handoff

Dropbox private original -> human editorial review -> approved derivative -> R2 upload with verified image/media rights -> record in public catalog -> reviewed GitHub PR -> Worker deploy -> live verification.

Never embed Dropbox shared URLs in published HTML; Dropbox links may expire, be revoked, or encounter sharing-bandwidth restrictions.

## Future automation

A private intake worker or controlled publishing service could access authorized Dropbox folders, create content hashes, convert images, ingest OCR/metadata with verification, send approval packages to editors, then upload only signed-off derivatives to R2. Keep Dropbox OAuth secrets in an authenticated backend, never in the Astro static bundle.
