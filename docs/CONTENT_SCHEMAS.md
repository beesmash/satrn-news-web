# Public SATRN News catalog examples

**Examples are reference data only, not published articles.** Keep drafts in private Dropbox. To release, copy a fully verified and approved record into the public catalog with real citations and rights information.

### src/data/articles.json

    [
      {
        "slug": "example-approved-headline",
        "title": "Example approved headline",
        "summary": "Factual two-sentence summary after verification.",
        "date": "2026-10-28",
        "author": "SATRN News",
        "category": "World News",
        "categories": ["world-news"],
        "storyType": "News",
        "status": "published",
        "breaking": false,
        "review": {
          "approvedBy": "Authorized Editor",
          "approvedAt": "2026-10-28T15:00:00Z"
        },
        "paragraphs": ["First validated paragraph.", "Second validated paragraph."],
        "sources": [{"title":"Primary source", "url":"https://example.org/"}],
        "image": "https://media.example.org/approved-photo.webp",
        "imageAlt": "Accessible description",
        "imageCredit": "Licensed photo credit",
        "imageCaption": "Verified factual caption"
      }
    ]

### src/data/editions.json

    [
      {
        "slug":"daily-source-2026-10-28",
        "title":"SATRN Daily Source — October 28, 2026",
        "date":"2026-10-28",
        "summary":"Complete verified daily edition.",
        "type":"daily-source",
        "pages":10,
        "status":"published",
        "review":{"approvedBy":"Authorized Editor","approvedAt":"2026-10-28T15:00:00Z"},
        "cover":"https://media.example.org/newspapers/2026/10/28/cover.webp",
        "pdfUrl":"https://media.example.org/newspapers/2026/10/28/edition.pdf",
        "pageImages":[
          "https://media.example.org/newspapers/2026/10/28/001.webp"
        ]
      }
    ]

If pageImages is used it must have EXACTLY pages items (ten for a ten-page issue), each independently approved and uploaded. The single pageImages URL above is illustrative and intentionally not valid for publication. A PDF-only record is valid without pageImages. All media URLs must use HTTPS or an existing local public asset. Dropbox shared links are rejected by validation.

Run npm run validate, npm test and npm run build prior to deployment.
