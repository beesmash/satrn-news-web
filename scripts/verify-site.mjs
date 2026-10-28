import {existsSync,readFileSync} from "node:fs";
import {resolve,join} from "node:path";
import {fileURLToPath} from "node:url";
const root=resolve(fileURLToPath(new URL("..",import.meta.url)));
const paths=["dist/index.html","dist/news/index.html","dist/newspapers/index.html","dist/search/index.html","dist/robots.txt","dist/_headers"];
const errors=[];
for(const path of paths)if(!existsSync(join(root,path)))errors.push("Missing: "+path);
const home=existsSync(join(root,"dist/index.html"))?readFileSync(join(root,"dist/index.html"),"utf8"):"";
for(const needle of ["JANUS INTELLIGENCE","DESIGN PREVIEW","SATRN"])if(!home.includes(needle))errors.push("Homepage missing: "+needle);
if(errors.length){console.error(errors.join("\n"));process.exit(1);}
console.log("SATRN static-site smoke test PASSED.");
