import test from "node:test";
import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import {mkdtempSync,writeFileSync,rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {inspect,main} from "./r2-media.mjs";
function fixture(){
 const dir=mkdtempSync(join(tmpdir(),"satrn-r2-")),content="SATRN synthetic test file";
 writeFileSync(join(dir,"page.webp"),content);
 const sha=createHash("sha256").update(content).digest("hex");
 const m={bucket:"satrn-news-media",approval:{editor:"Authorized test editor",approvedAt:"2026-10-28T15:00:00Z",rightsVerified:true},objects:[{source:"page.webp",key:"newspapers/2026/10/28/001-"+sha.slice(0,12)+".webp",contentType:"image/webp",sha256:sha}]};
 const path=join(dir,"manifest.json");writeFileSync(path,JSON.stringify(m));return {dir,path,m};
}
test("Valid signed-off file and SHA256 pass",async()=>{
 const f=fixture();try{const r=await inspect(f.m,f.path);assert.deepEqual(r.errors,[]);assert.equal(r.files.length,1);}finally{rmSync(f.dir,{recursive:true,force:true});}
});
test("Reject public Dropbox links and missing rights verification",async()=>{
 const f=fixture();try{const m=structuredClone(f.m);m.approval.rightsVerified=false;m.objects[0].source="https://dropbox.com/s/example";const r=await inspect(m,f.path);
 assert.ok(r.errors.some(e=>e.includes("rights")));assert.ok(r.errors.some(e=>e.includes("local file")));}finally{rmSync(f.dir,{recursive:true,force:true});}
});
test("Reject object path traversal and wrong hash",async()=>{
 const f=fixture();try{const m=structuredClone(f.m);m.objects[0].key="newspapers/../../secret";m.objects[0].sha256="0".repeat(64);const r=await inspect(m,f.path);
 assert.ok(r.errors.some(e=>e.includes("unsafe object key")));assert.ok(r.errors.some(e=>e.includes("hash")));}finally{rmSync(f.dir,{recursive:true,force:true});}
});
test("Dry-run and denied upload do not invoke Cloudflare",async()=>{
 const f=fixture();try{assert.equal(await main(["--manifest",f.path],{}),0);assert.equal(await main(["--manifest",f.path,"--upload"],{}),1);}
 finally{rmSync(f.dir,{recursive:true,force:true});}
});
