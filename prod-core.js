// prod-core.js — builds the indexes for the Production Network page.
// Every person named in a project credit gets a resume, even if they have no hand-written profile.
(function(){
const D=window.PROD;
const sp=s=>String(s||'').split(/;\s*/).map(x=>x.trim()).filter(Boolean);
const uniq=a=>[...new Set(a.filter(Boolean))];
const SK=[[/fpv/i,'FPV'],[/drone|aerial/i,'Drone/aerial'],[/\bdop\b|\bdp\b|director of photography|cinematograph|camera|filmer|footage/i,'Cinematography'],[/(?<!(art|creative) )\bdirector\b(?! of photography)|\bdirecting\b|filmmaker/i,'Directing'],[/edit/i,'Editing'],[/colou?r/i,'Color'],[/photo(?!graphy\b)|photographer/i,'Photography'],[/producer|producing|agency production/i,'Producing'],[/creative (director|lead)|art director|\bcco\b|\bacd\b|\becd\b/i,'Creative direction'],[/vfx|motion/i,'VFX/motion'],[/music|audio|sound/i,'Sound/music'],[/writ|copy/i,'Writing'],[/creator/i,'Content creation'],[/production design|production manager|gaffer|grip|\bac\b|\bdit\b|\bad\b/i,'Crew/technical']];
const skills=r=>uniq(SK.filter(([re])=>re.test(r)).map(([,s])=>s));
const AG=new Set(D.co.filter(c=>/agency/i.test(c.type)).map(c=>c.n));

// projects
D.pj.forEach((p,i)=>{
  p.id=i;
  p.crew=sp(p.cr).map(x=>{const k=x.indexOf('=');return{role:x.slice(0,k).trim(),name:x.slice(k+1).trim()}}).filter(c=>c.name);
  p.aths=sp(p.ath);p.prods=sp(p.prod);p.ags=sp(p.agency);p.clients=sp(p.client);
  p.yr=parseInt((String(p.y).match(/\d{4}/)||[0])[0]);
});

// companies (auto-add any company named in a project)
const C={};
D.co.forEach(c=>C[c.n]={...c,peopleL:sp(c.people),kind:AG.has(c.n)?'Agency':'Production / media',auto:false});
D.pj.forEach(p=>{p.prods.forEach(n=>{if(!C[n])C[n]={n,type:'Production company',kind:'Production / media',base:'(verify)',peopleL:[],spec:'',notes:'Auto-added from project credits.',src:p.src,v:1,auto:true}});
  p.ags.forEach(n=>{if(!C[n])C[n]={n,type:'Creative agency',kind:'Agency',base:'(verify)',peopleL:[],spec:'',notes:'Auto-added from project credits.',src:p.src,v:1,auto:true}})});
Object.values(C).forEach(c=>{
  c.pjs=D.pj.filter(p=>p.prods.includes(c.n)||p.ags.includes(c.n));
  c.clients=uniq(c.pjs.flatMap(p=>p.clients));
  c.partners=uniq(c.pjs.flatMap(p=>[...p.prods,...p.ags]).filter(x=>x!==c.n));
  c.aths=uniq(c.pjs.flatMap(p=>p.aths));
  c.crew=uniq([...c.peopleL,...c.pjs.flatMap(p=>p.crew.map(x=>x.name))]);
});

// people
const P={};
D.pe.forEach(x=>P[x.n]={...x,rolesL:sp(x.roles),affL:sp(x.aff),demoL:sp(x.demo),claimL:sp(x.claim),cred:[],auto:false});
D.pj.forEach(p=>p.crew.forEach(c=>{
  if(!P[c.name])P[c.name]={n:c.name,roles:'',rolesL:[],base:'(verify)',affL:[],demoL:[],claimL:[],links:'',notes:'Resume auto-built from published project credits. Add base, links and portfolio.',src:p.src,v:1,cred:[],auto:true};
  P[c.name].cred.push({p,role:c.role});
}));
// company staff lists also count as affiliations
Object.values(C).forEach(c=>c.peopleL.forEach(n=>{if(P[n]&&!P[n].affL.some(a=>a.startsWith(c.n)))P[n].affL.push(c.n)}));
Object.values(P).forEach(q=>{
  q.rolesL=uniq([...q.rolesL,...q.cred.map(c=>c.role)]);
  q.demoAll=uniq([...q.demoL,...q.cred.flatMap(c=>skills(c.role))]);
  q.claimOnly=q.claimL.filter(s=>!q.demoAll.some(d=>d.toLowerCase()===s.toLowerCase()));
  q.clients=uniq(q.cred.flatMap(c=>c.p.clients));
  q.cos=uniq([...q.cred.flatMap(c=>[...c.p.prods,...c.p.ags]),...q.affL.map(a=>a.replace(/\s*\(.*$/,'').replace(/\s+—.*$/,''))]);
  q.aths=uniq(q.cred.flatMap(c=>c.p.aths));
  q.collab=uniq(q.cred.flatMap(c=>c.p.crew.map(x=>x.name)).filter(n=>n!==q.n));
  q.years=q.cred.map(c=>c.p.yr).filter(Boolean);
  q.last=q.years.length?Math.max(...q.years):0;
  q.kind=q.auto?'Auto (credits)':(q.v?'Verified':'Needs check');
});

// clients (resorts, passes, brands, publications)
const K={};
D.pj.forEach(p=>p.clients.forEach(n=>{(K[n]=K[n]||{n,pjs:[]}).pjs.push(p)}));
Object.values(K).forEach(k=>{
  k.ags=uniq(k.pjs.flatMap(p=>p.ags));k.prods=uniq(k.pjs.flatMap(p=>p.prods));
  k.crew=uniq(k.pjs.flatMap(p=>p.crew.map(x=>x.name)));k.aths=uniq(k.pjs.flatMap(p=>p.aths));
  k.cat=/pass|resort|mountain|basin|ski area|superski|tourism|vail|sun valley|jackson hole|mammoth|palisades|whistler|aspen|snowmass|laax|telluride|steamboat|big sky|ski big 3|heli|targhee|destination|zermatt|dolomiti/i.test(k.n)?'Resort / pass / destination':/freeskier|powder|magazine|national geographic/i.test(k.n)?'Publication':'Brand';
});

// links parser
function links(s){return sp(s).map(x=>{const i=x.indexOf(':');const k=x.slice(0,i),v=x.slice(i+1).trim();
  if(k==='ig')return{l:'Instagram @'+v,u:'https://www.instagram.com/'+v};
  if(k==='yt')return{l:'YouTube',u:v};if(k==='vimeo')return{l:'Vimeo',u:v};if(k==='imdb')return{l:'IMDb',u:v};
  return{l:v.replace(/^https?:\/\/(www\.)?/,'').replace(/\/$/,''),u:v}})}

window.PN={D,P,C,K,sp,uniq,skills,links,SKILLS:uniq(SK.map(s=>s[1]))};
})();
