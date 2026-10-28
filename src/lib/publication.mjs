// Release selectors for public, editor-approved SATRN News catalogs.
// This metadata is not user authentication: protect main with reviewed pull requests.
export const approved = record =>
  record?.status === "published" &&
  typeof record?.review?.approvedBy === "string" &&
  record.review.approvedBy.trim().length > 0 &&
  typeof record.review.approvedAt === "string" &&
  !Number.isNaN(Date.parse(record.review.approvedAt));
export const released = (record, now = new Date()) =>
  approved(record) &&
  (!record.publishAt || Date.parse(record.publishAt) <= now.getTime());
export const publishedArticles = (records, now = new Date()) =>
  records.filter(r => released(r, now))
    .sort((a, b) => (b.publishAt || b.date).localeCompare(a.publishAt || a.date));
export const publishedEditions = (records, now = new Date()) =>
  records.filter(r => released(r, now))
    .sort((a, b) => b.date.localeCompare(a.date));
export const articlePath = slug => "/news/" + encodeURIComponent(slug) + "/";
export const editionPath = slug => "/newspapers/" + encodeURIComponent(slug) + "/";
export const dateLabel = date => {
  const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(date || "") ? date+"T12:00:00Z" : date);
  return Number.isNaN(d.getTime()) ? date :
    new Intl.DateTimeFormat("en-US",{month:"long",day:"numeric",year:"numeric",timeZone:"UTC"}).format(d);
};
