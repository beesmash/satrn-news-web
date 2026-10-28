# SATRN NEWS — Editorial publication pipeline, v0.2

This version provides build-validated publication in a static Astro site. It is **not** an authenticated editorial CMS or autonomous publishing service.

1. **Intake (private):** Use an access-controlled Dropbox editorial folder for raw reporting, fact sheets, original audio, photos, video, source records and original newspaper page masters. Do not use publicly shared Dropbox links for the public site.
2. **Research (private):** JANUS/MORGAN can prepare source packets for human review; keep them out of the public repository.
3. **Fact-check:** Verify factual claims, dates, legal restrictions, image rights, provenance, attributions and editorial judgment.
4. **Approval:** Authorized editor signs off on the complete article or edition.
5. **Media publication:** Export approved web-optimized derivatives to Cloudflare R2 (or temporarily to public/media in the repo for small assets). Never upload original unapproved media into a public bucket. R2 should be private until public access is deliberately configured for a production custom domain.
6. **Public catalog:** Add ONLY approved article records to src/data/articles.json and approved editions to src/data/editions.json. Each requires review.approvedBy and review.approvedAt, with attributable sources for articles. Do not enter sensitive material, API keys, unpublished content or Dropbox private links.
7. **Pull request:** Submit changes with fact-check notes. Run npm run check and request authorized human review.
8. **Merge:** Cloudflare builds the site automatically from main. Verify the live issue and article.
9. **Correct or retract:** Use a reviewed change with published correction or retraction notice; maintain internal audit history.

## Important limitations

The review fields in JSON are NOT proof of identity. Enable GitHub Settings > Branches > main protection to require pull requests, approvals and passing checks. Protect access to Dropbox source folders separately.

This public repo cannot securely host embargoed or future-scheduled articles, even if the HTML generator hides them. The validator rejects future publishAt dates to avoid leaking unpublished reporting via GitHub.

Scheduled publication, secure CMS accounts, authenticated Dropbox-to-R2 transfers and newsroom databases are later phases. No automation is authorized to move originals to public storage without editorial approval.
