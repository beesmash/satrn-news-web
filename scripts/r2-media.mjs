import {createHash} from "node:crypto";
import {createReadStream,existsSync,statSync} from "node:fs";
import {readFile} from "node:fs/promises";
import {resolve,dirname,extname} from "node:path";
import {fileURLToPath} from "node:url";
import {spawnSync} from "node:child_process";

const mime={".webp":"image/webp",".jpg":"image/jpeg",".jpeg":"image/jpeg",".png":"image/png",".avif":"image/avif",".pdf":"application/pdf",".mp3":"audio/mpeg"};
export async function sha256(path){
 const hash=createHash("sha256");
 for await(const chunk of createReadStream(path))hash.update(chunk);
 return hash.digest("hex");
}
export async function inspect(manifest,manifestPath){
 const errors=[],files=[],seen=new Set();
 const dir=dirname(resolve(manifestPath));
 if(!/^[a-z0-9](?:[a-z0-9-]{1,61})[a-z0-9]$/.test(manifest?.bucket||""))errors.push("Invalid R2 bucket name");
 if(typeof manifest?.approval?.editor!=="string"||!manifest.approval.editor.trim())errors.push("Missing editor signoff");
 if(!manifest?.approval?.approvedAt||Number.isNaN(Date.parse(manifest.approval.approvedAt)))errors.push("Missing or invalid approval date");
 if(manifest?.approval?.rightsVerified!==true)errors.push("Media rights verification required");
 if(!Array.isArray(manifest?.objects)||!manifest.objects.length)errors.push("No media assets supplied");
 for(const [index,obj] of (Array.isArray(manifest?.objects)?manifest.objects:[]).entries()){
  const loc="Asset "+(index+1),key=obj?.key||"",source=obj?.source||"";
  if(typeof key!=="string"||!/^(newspapers|articles|audio|video-thumbnails)\/[a-z0-9][a-z0-9/_.-]*$/.test(key)||key.includes("..")||key.includes("//"))errors.push(loc+": unsafe object key");
  if(seen.has(key))errors.push(loc+": duplicate object key");seen.add(key);
  if(typeof source!=="string"||!source.trim()||source.includes("\0")||/^https?:/i.test(source)){errors.push(loc+": source must be a local file, not a Dropbox link");continue;}
  const path=resolve(dir,source);
  if(!existsSync(path)){errors.push(loc+": file missing");continue;}
  const stat=statSync(path);
  if(!stat.isFile()||stat.size<1||stat.size>315*1024*1024){errors.push(loc+": file not supported by single-object Wrangler upload");continue;}
  const mediaType=mime[extname(path).toLowerCase()];
  if(!mediaType||obj.contentType!==mediaType)errors.push(loc+": incorrect or unsupported content type");
  if(!/^[a-f0-9]{64}$/.test(obj.sha256||"")){errors.push(loc+": invalid sha256");continue;}
  const digest=await sha256(path);
  if(digest!==obj.sha256)errors.push(loc+": file hash does not match");
  if(!key.includes(digest.slice(0,12)))errors.push(loc+": immutable object key must include 12-character SHA256 prefix");
  files.push({path,key,mediaType,size:stat.size});
 }
 return {errors,files};
}
export async function main(args=process.argv.slice(2),env=process.env){
 const i=args.indexOf("--manifest");
 if(i<0||!args[i+1]){console.error("Usage: node scripts/r2-media.mjs --manifest /private/batch.json [--upload]");return 2;}
 const manifestPath=resolve(args[i+1]);
 const manifest=JSON.parse(await readFile(manifestPath,"utf8"));
 const {errors,files}=await inspect(manifest,manifestPath);
 if(errors.length){console.error("BLOCKED: "+errors.join("; "));return 1;}
 console.log("SATRN R2: "+files.length+" approved asset(s) ready for "+manifest.bucket);
 for(const f of files)console.log(" - "+f.key+" ("+f.size+" bytes)");
 if(!args.includes("--upload")){console.log("DRY RUN ONLY: no media uploaded.");return 0;}
 if(env.SATRN_R2_PUBLISH!=="APPROVED"){console.error("Upload blocked: SATRN_R2_PUBLISH=APPROVED is required.");return 1;}
 const command=process.platform==="win32"?"npx.cmd":"npx";
 for(const f of files){
  const parameters=["--no-install","wrangler","r2","object","put",manifest.bucket+"/"+f.key,"--file",f.path,"--remote","--content-type",f.mediaType,"--cache-control","public, max-age=31536000, immutable"];
  if(spawnSync(command,parameters,{stdio:"inherit",shell:false,env}).status!==0){console.error("Upload failed on "+f.key);return 1;}
 }
 console.log("Uploaded media; website catalog remains unchanged until separately reviewed.");
 return 0;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 main().then(code=>{process.exitCode=code}).catch(e=>{console.error(e.message);process.exitCode=1;});
}
