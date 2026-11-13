const dns = require('node:dns').promises;
const https = require('node:https');
const net = require('node:net');
const MAX = 2 * 1024 * 1024;

function publicIp(ip) {
  if (net.isIP(ip) === 4) {
    const [a,b,c] = ip.split('.').map(Number);
    return !(a === 0 || a === 10 || a === 127 || a >= 224 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && (b === 168 || (b === 0 && c <= 2))) || (a === 100 && b >= 64 && b <= 127) || (a === 198 && (b === 18 || b === 19 || (b === 51 && c === 100))) || (a === 203 && b === 0 && c === 113));
  }
  return net.isIP(ip) === 6 && /^[23]/.test(ip.toLowerCase());
}

async function page(url, redirects = 0) {
  if (url.protocol !== 'https:' || url.username || url.password || redirects > 3) throw new Error('Use a public HTTPS recipe page.');
  const host = url.hostname.replace(/^\[|\]$/g, '').toLowerCase();
  if (!host || host === 'localhost' || host.endsWith('.local') || host.endsWith('.localhost')) throw new Error('That is not a public recipe page.');
  const ips = net.isIP(host) ? [{address:host,family:net.isIP(host)}] : await dns.lookup(host,{all:true,verbatim:true});
  if (!ips.length || ips.some(x => !publicIp(x.address))) throw new Error('That is not a public recipe page.');
  return new Promise((resolve,reject) => {
    const req = https.get(url,{headers:{'user-agent':'RecipeWise/1.0 recipe metadata import','accept':'text/html'},lookup:(name,opts,cb)=>cb(null,ips[0].address,ips[0].family),servername:net.isIP(host)?undefined:host,timeout:8000},res=>{
      if ([301,302,303,307,308].includes(res.statusCode)) { const next=res.headers.location; res.resume(); if(!next)return reject(new Error('Recipe page redirect was invalid.')); return page(new URL(next,url),redirects+1).then(resolve,reject); }
      if(res.statusCode!==200){res.resume();return reject(new Error('Recipe page could not be accessed.'));}
      const type=String(res.headers['content-type']||'').toLowerCase(); if(!type.includes('text/html')&&!type.includes('application/xhtml+xml')){res.resume();return reject(new Error('That link is not a recipe webpage.'));}
      const chunks=[];let size=0;res.on('data',chunk=>{size+=chunk.length;if(size>MAX){res.destroy(new Error('Recipe page is too large.'));return;}chunks.push(chunk);});
      res.on('end',()=>resolve(Buffer.concat(chunks).toString('utf8')));res.on('error',reject);
    });
    req.on('timeout',()=>req.destroy(new Error('Recipe page took too long to respond.')));req.on('error',reject);
  });
}

function recipeOf(value) {
  if(Array.isArray(value)){for(const x of value){const r=recipeOf(x);if(r)return r;}return null;}
  if(!value||typeof value!=='object')return null;
  const types=Array.isArray(value['@type'])?value['@type']:[value['@type']];
  if(types.some(x=>String(x).toLowerCase()==='recipe')&&(value.recipeIngredient||value.ingredients))return value;
  return recipeOf(value['@graph']||value.mainEntity||value.itemListElement||[]);
}
function stepsOf(value){
  if(typeof value==='string')return [value.trim()].filter(Boolean);
  if(Array.isArray(value))return value.flatMap(stepsOf);
  if(value&&typeof value==='object')return value.text||value.name?[String(value.text||value.name).trim()]:stepsOf(value.itemListElement||value.steps||[]);
  return [];
}
function extract(html){
  const matches=html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script\s*>/gi);
  for(const m of matches){try{const r=recipeOf(JSON.parse(m[1].trim()));if(!r)continue;const ingredients=(Array.isArray(r.recipeIngredient||r.ingredients)?(r.recipeIngredient||r.ingredients):[r.recipeIngredient||r.ingredients]).filter(x=>typeof x==='string'&&x.trim()).map(x=>x.trim());if(!ingredients.length)continue;const yieldText=Array.isArray(r.recipeYield)?r.recipeYield[0]:r.recipeYield;const servings=String(yieldText||'').match(/\d+(?:\.\d+)?/);return {name:String(r.name||''),ingredients,instructions:stepsOf(r.recipeInstructions),servings:servings?Number(servings[0]):null};}catch{}}
  return null;
}

module.exports = async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Use POST to import a recipe link.'});}
  const raw=req.body&&req.body.url;if(typeof raw!=='string'||raw.length>2048)return res.status(400).json({error:'Enter a valid recipe link.'});
  let url;try{url=new URL(raw);}catch{return res.status(400).json({error:'Enter a valid recipe link.'});}
  try{const data=extract(await page(url));if(!data)return res.status(422).json({error:'No structured ingredients were found. This page may block imports; enter the recipe manually instead.'});return res.status(200).json(data);}
  catch(error){return res.status(422).json({error:/public|HTTPS|redirect|too large|too long|could not be accessed|not a recipe/i.test(error.message)?error.message:'This recipe page could not be read. Try another link or enter it manually.'});}
};
