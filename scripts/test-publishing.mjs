import assert from "node:assert/strict";
import {test} from "node:test";
import {approved,released,publishedArticles,publishedEditions,editionPath} from "../src/lib/publication.mjs";
import {validateArticles,validateEditions,isAssetUrl} from "./validate-content.mjs";
const review={approvedBy:"Authorized SATRN Editor",approvedAt:"2026-10-01T13:00:00Z"};
const article={slug:"sample-story",title:"Verified sample headline",summary:"A sample summary",date:"2026-10-01",
 author:"SATRN News",category:"World News",status:"published",review,
 paragraphs:["A first factual paragraph.","A second paragraph."],sources:[{title:"Primary source",url:"https://example.org/report"}]};
const edition={slug:"sample-2026-10-01",title:"SATRN Daily Source",summary:"A two-page paper",date:"2026-10-01",
 type:"daily-source",pages:2,status:"published",review,
 pageImages:["https://media.example.org/1.png","https://media.example.org/2.png"]};
test("valid publication records pass",()=>{
 assert.deepEqual(validateArticles([article]),[]);
 assert.deepEqual(validateEditions([edition]),[]);
});
test("draft and unapproved content never releases",()=>{
 assert.equal(approved({...article,status:"draft"}),false);
 assert.equal(approved({...article,review:null}),false);
 assert.deepEqual(publishedArticles([article,{...article,slug:"draft",status:"draft"},{...article,slug:"unapproved",review:null}]),[article]);
 assert.ok(validateArticles([{...article,status:"draft"}]).length>0);
 assert.ok(validateArticles([{...article,review:null}]).length>0);
});
test("bad data and duplicate articles fail",()=>{
 assert.ok(validateArticles([article,article]).some(e=>e.includes("duplicate")));
 assert.ok(validateArticles([{...article,sources:[]}]).length>0);
 assert.ok(validateEditions([{...edition,pageImages:["https://media.example.org/1.png"]}]).length>0);
});
test("future date withheld; future records rejected from public catalog",()=>{
 const future={...article,publishAt:"2035-01-01T00:00:00Z"};
 assert.equal(released(future,new Date("2026-10-28T12:00:00Z")),false);
 assert.ok(validateArticles([future]).some(e=>e.includes("future")));
});
test("Dropbox sharing URLs cannot be public media URLs",()=>{
 assert.equal(isAssetUrl("https://www.dropbox.com/s/example/file.jpg"),false);
 assert.equal(isAssetUrl("https://www.dropboxusercontent.com/photo.jpg"),false);
 assert.equal(isAssetUrl("https://media.satrnnews.com/photo.jpg"),true);
});
test("newest articles and newspaper issues sort first",()=>{
 assert.equal(publishedArticles([{...article,slug:"older",date:"2025-01-01"},article])[0].slug,"sample-story");
 assert.equal(publishedEditions([{...edition,slug:"older",date:"2025-01-01"},edition])[0].slug,"sample-2026-10-01");
 assert.equal(editionPath("sample-2026-10-01"),"/newspapers/sample-2026-10-01/");
});
