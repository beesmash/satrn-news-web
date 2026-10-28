import {readFileSync,existsSync} from "node:fs";
import {resolve,join} from "node:path";
import {fileURLToPath} from "node:url";
import {publishedArticles,publishedEditions} from "../src/lib/publication.mjs";

const root=resolve(fileURLToPath(new URL("..",import.meta.url)));
const validTime=v=>typeof v==="string" && !Number.isNaN(Date.parse(v));
const validDay=v=>typeof v==="string" && /^\d{4}-\d{2}-\d{2}$/.test(v) && validTime(v+"T12:00:00Z");
const slugOK=v=>typeof v==="string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v);
const hasText=v=>typeof v==="string" && v.trim().length>0;
export const isAssetUrl=u=>typeof u==="string" &&
 ((u.startsWith("/")&&!u.startsWith("//")&&!u.includes("..")&&!u.includes("?")) || /^https:\/\//i.test(u)) &&
 !/^https:\/\/([^/]+\.)?(dropbox\.com|dropboxusercontent\.com)(\/|$)/i.test(u);
const err=(errors,loc,msg)=>errors.push(loc+": "+msg);
function localAsset(url,errors,loc){
 if(typeof url!=="string"||!url.startsWith("/")||url.startsWith("//")||url.includes(".."))return;
 if(!existsSync(join(root,"public",url.slice(1))))err(errors,loc,"missing local media asset "+url);
}
function common(r,kind,errors,index,slugs){
 const loc=kind+"["+index+"]";
 if(!r||typeof r!=="object"||Array.isArray(r)){err(errors,loc,"expected an object");return loc;}
 if(!slugOK(r.slug))err(errors,loc,"invalid URL slug");
 if(slugs.has(r.slug))err(errors,loc,"duplicate slug: "+r.slug);
 slugs.add(r.slug);
 for(const field of ["title","summary"])if(!hasText(r[field]))err(errors,loc,"missing "+field);
 if(!validDay(r.date))err(errors,loc,"date must be YYYY-MM-DD");
 if(r.status!=="published")err(errors,loc,"public catalog must contain approved published records only; store drafts in private Dropbox");
 if(!hasText(r.review?.approvedBy))err(errors,loc,"editor review.approvedBy is required");
 if(!validTime(r.review?.approvedAt))err(errors,loc,"editor review.approvedAt must be an ISO date/time");
 if(r.publishAt!==undefined && !validTime(r.publishAt))err(errors,loc,"invalid publishAt");
 if(validTime(r.publishAt) && Date.parse(r.publishAt)>Date.now())err(errors,loc,"future scheduled releases belong in a private store, not public GitHub");
 if(validTime(r.publishAt) && validTime(r.review?.approvedAt) && Date.parse(r.publishAt)<Date.parse(r.review.approvedAt))err(errors,loc,"release precedes approval");
 return loc;
}
export function validateArticles(records){
 if(!Array.isArray(records))return ["articles must be an array"];
 const errors=[],slugs=new Set();
 records.forEach((r,i)=>{
  const loc=common(r,"articles",errors,i,slugs);
  if(!r||typeof r!=="object")return;
  for(const field of ["author","category"])if(!hasText(r[field]))err(errors,loc,"missing "+field);
  if(!Array.isArray(r.paragraphs)||r.paragraphs.length<2||r.paragraphs.some(p=>!hasText(p)))err(errors,loc,"at least two nonempty text paragraphs required");
  if(!Array.isArray(r.sources)||r.sources.length===0||
     r.sources.some(s=>!hasText(s?.title)||!isAssetUrl(s?.url)))err(errors,loc,"at least one attributed HTTPS source required");
  if(r.categories!==undefined&&(!Array.isArray(r.categories)||r.categories.some(s=>!slugOK(s))))err(errors,loc,"invalid categories array");
  if(r.image!==undefined){
   if(!isAssetUrl(r.image))err(errors,loc,"public image must be HTTPS or a local media asset; Dropbox shared links are not allowed");
   if(!hasText(r.imageAlt)||!hasText(r.imageCredit))err(errors,loc,"imageAlt and imageCredit are required for images");
   localAsset(r.image,errors,loc);
  }
  if(r.audioUrl!==undefined && !isAssetUrl(r.audioUrl))err(errors,loc,"invalid audioUrl");
  if(r.breaking!==undefined&&typeof r.breaking!=="boolean")err(errors,loc,"breaking must be boolean");
 });
 return errors;
}
export function validateEditions(records){
 if(!Array.isArray(records))return ["editions must be an array"];
 const errors=[],slugs=new Set();
 records.forEach((r,i)=>{
  const loc=common(r,"editions",errors,i,slugs);
  if(!r||typeof r!=="object")return;
  if(!["daily-source","special-investigation","special-edition"].includes(r.type))err(errors,loc,"invalid edition type");
  if(!Number.isInteger(r.pages)||r.pages<1||r.pages>100)err(errors,loc,"pages must be an integer from 1 to 100");
  if(!r.pdfUrl&&!Array.isArray(r.pageImages))err(errors,loc,"issue requires pdfUrl or pageImages");
  if(r.pdfUrl!==undefined){if(!isAssetUrl(r.pdfUrl))err(errors,loc,"invalid PDF URL");localAsset(r.pdfUrl,errors,loc);}
  if(r.cover!==undefined){if(!isAssetUrl(r.cover))err(errors,loc,"invalid cover URL");localAsset(r.cover,errors,loc);}
  if(r.pageImages!==undefined){
   if(!Array.isArray(r.pageImages)||r.pageImages.length!==r.pages)err(errors,loc,"pageImages must contain exactly one image per page");
   else r.pageImages.forEach((u,j)=>{if(!isAssetUrl(u))err(errors,loc,"invalid page image "+(j+1));localAsset(u,errors,loc);});
  }
 });
 return errors;
}
export function verify(articles,editions){
 const errors=[...validateArticles(articles),...validateEditions(editions)];
 const published=[...publishedArticles(articles),...publishedEditions(editions)];
 if(published.some(r=>r.status!=="published"))errors.push("nonpublished record leaked into release");
 return errors;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const articles=JSON.parse(readFileSync(join(root,"src/data/articles.json"),"utf8"));
 const editions=JSON.parse(readFileSync(join(root,"src/data/editions.json"),"utf8"));
 const errors=verify(articles,editions);
 if(errors.length){console.error("SATRN editorial content gate FAILED:\n"+errors.map(e=>" - "+e).join("\n"));process.exitCode=1;}
 else console.log("SATRN editorial content gate PASSED: "+articles.length+" approved articles, "+editions.length+" approved editions.");
}
