// Mountain Industry Database - resort marketing page logic
(function(){
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const PARENTS=[["Vail Resorts",/Vail Resorts|Epic Pass/],["Alterra Mountain Company",/Alterra|Ikon Pass/],["Aspen One",/Aspen/],["Boyne Resorts",/Boyne/],["POWDR",/POWDR/],
 ["Jackson Hole",/Jackson Hole/],["Passes + associations",/Indy Pass|Association|Tourism Board|^Ski California/],["Agencies",/^SNOW Partners|Agency|JVP Communications/],["Brands",/^(Atomic|Obermeyer)/]];
const LEVEL={1:"Exec / VP",2:"Director",3:"Manager / coordinator"};
MKT.forEach((p,i)=>{p.id=i;
  const g=PARENTS.find(([,re])=>re.test(p.employer));p.group=g?g[0]:"Independents + other operators";
  p.verified=/^Verified/i.test(p.notes);p.region=p.country==="USA"?p.state:p.country;});
const uniq=a=>[...new Set(a)].sort((x,y)=>x.localeCompare(y));
function opts(el,label,vals){el.innerHTML=`<option value="">${label}</option>`+vals.map(v=>`<option>${esc(v)}</option>`).join("");}
opts($("#fGrp"),"All companies",uniq(MKT.map(p=>p.group)));
opts($("#fRole"),"All functions",uniq(MKT.flatMap(p=>p.roles)));
opts($("#fState"),"All states / countries",uniq(MKT.map(p=>p.region)));
$("#fBatch").innerHTML=`<option value="">All batches</option>`+uniq(MKT.map(p=>p.batch)).map(b=>`<option value="${b}">Batch ${b.replace("B","")}</option>`).join("");
let view="cards";
function filtered(){
  const q=$("#q").value.trim().toLowerCase(),g=$("#fGrp").value,r=$("#fRole").value,s=$("#fState").value,t=$("#fTier").value,v=$("#fVer").value,b=$("#fBatch").value;
  return MKT.filter(p=>(!q||[p.name,p.base,p.covers,p.history,p.employer,p.notes,p.roles.join(" ")].join(" ").toLowerCase().includes(q))
    &&(!g||p.group===g)&&(!r||p.roles.includes(r))&&(!s||p.region===s)&&(!t||p.tier==t)&&(!v||(v==="v")===p.verified)&&(!b||p.batch===b))
   .sort((a,b)=>a.group.localeCompare(b.group)||a.tier-b.tier||a.name.localeCompare(b.name));
}
const title=p=>p.history.split(/;|\(/)[0].trim();
const vtag=p=>p.verified?`<span class="tag v">Verified</span>`:`<span class="tag c">Needs check</span>`;
function card(p){return `<div class="card" data-id="${p.id}"><h3><span>${esc(p.name)}</span><span class="ti">${LEVEL[p.tier]}</span></h3>
 <div>${esc(title(p))}</div><div class="mu">${esc(p.covers)} · ${esc(p.base)}</div>
 <div>${p.roles.map(r=>`<span class="tag">${esc(r)}</span>`).join("")}${vtag(p)}${p.updated?`<span class="tag n">Updated ${p.updated}</span>`:""}</div></div>`;}
function row(p){return `<tr class="r" data-id="${p.id}"><td><b>${esc(p.name)}</b></td><td>${esc(title(p))}</td><td>${esc(p.covers)}</td><td>${esc(p.roles.join(", "))}</td><td>${esc(p.base)}</td><td>${p.verified?"Verified":"Needs check"}</td></tr>`;}
const HEAD=`<tr><th>Name</th><th>Title</th><th>Resorts / brands</th><th>Function</th><th>Based</th><th>Source</th></tr>`;
function render(){
  const L=filtered();
  const res=new Set(MKT.flatMap(p=>p.covers.split(/;/).map(s=>s.trim())));
  $("#st").textContent=`${L.length} of ${MKT.length} people · ${uniq(MKT.map(p=>p.group)).length} company groups · ${MKT.filter(p=>p.verified).length} with a verified source · ${MKT.filter(p=>p.tier===1).length} exec/VP`;
  const out=$("#out");
  if(view==="cards") out.innerHTML=`<div class="grid">${L.map(card).join("")}</div>`;
  else if(view==="table") out.innerHTML=`<div class="tbl"><table>${HEAD}${L.map(row).join("")}</table></div>`;
  else if(view==="coverage") out.innerHTML=coverage();
  else if(view==="agencies") out.innerHTML=agencies();
  else if(view==="creators") out.innerHTML=creators();
  else{const by={};L.forEach(p=>(by[p.group]=by[p.group]||[]).push(p));
    out.innerHTML=`<div class="grp">${Object.keys(by).sort().map(g=>`<h2>${esc(g)} <span class="mu">(${by[g].length})</span></h2><div class="tbl" style="padding:0"><table>${HEAD}${by[g].map(row).join("")}</table></div>`).join("")}</div>`;}
}

// ---- Extra views built from Isaac's other repos (resorts master list, Google Ads buyers, Instagram photo credits) ----
const RS=window.RESORTS||[],AGS=window.AGENCIES||[],CRS=window.CREATORS||[];
const normP=s=>String(s).toLowerCase().replace(/\b(ski|resort|area|mountain|mtn|the|and|ski area|snow resort|mountain resort)\b/g," ").replace(/[^a-z0-9]+/g," ").trim();
const norm=s=>String(s).toLowerCase().replace(/\(.*?\)/g," ").replace(/\b(ski|resort|area|mountain|mtn|the|and|ski area|snow resort|mountain resort)\b/g," ").replace(/[^a-z0-9]+/g," ").trim();
const RKEY=RS.map(r=>[norm(r[0]),r]);
function peopleFor(r){const k=norm(r[0]);if(!k)return[];return MKT.filter(p=>{const t=" "+normP(p.covers+" ; "+p.employer)+" ";return t.includes(" "+k+" ");});}
function resortsFor(p){const t=" "+normP(p.covers+" ; "+p.employer)+" ";return RKEY.filter(([k])=>k.length>2&&t.includes(" "+k+" ")).map(([,r])=>r);}
const ig=h=>h?`<a class="l" target="_blank" rel="noopener" href="https://www.instagram.com/${esc(h)}/">@${esc(h)}</a>`:"";
function qmatch(...a){const q=$("#q").value.trim().toLowerCase();return !q||a.join(" ").toLowerCase().includes(q);}
function coverage(){
  const tierSel=$("#fTier").value, st=$("#fState").value;
  const rows=RS.map(r=>({r,ps:peopleFor(r)})).filter(x=>qmatch(x.r[0],x.r[1],x.r[3])&&(!st||x.r[1]===st||x.r[2]===st));
  const ord={Major:0,Mid:1,Small:2};rows.sort((a,b)=>ord[a.r[3]]-ord[b.r[3]]||a.ps.length-b.ps.length||a.r[0].localeCompare(b.r[0]));
  const by=t=>{const x=RS.filter(r=>r[3]===t);return `${x.filter(r=>peopleFor(r).length).length}/${x.length}`;};
  return `<div class="tbl"><p class="mu">Every US + Canadian ski area (731, from Resort-Account-Tracking) and how many marketing people we have for it. Covered: Major ${by("Major")} · Mid ${by("Mid")} · Small ${by("Small")}. Sorted by tier, then fewest people first - the top of the list is the to-do list. Search box filters this view.</p>
  <table><tr><th>Resort</th><th>State</th><th>Tier</th><th>People</th><th>Instagram</th><th>Website</th></tr>${rows.map(({r,ps})=>`<tr><td><b>${esc(r[0])}</b></td><td>${esc(r[1])}</td><td>${esc(r[3])}</td><td>${ps.length?ps.map(p=>`<a class="l" data-id="${p.id}">${esc(p.name)}</a>`).join(", "):'<span class="tag c">none yet</span>'}</td><td>${ig(r[5])}${r[6]?` <span class="mu">${(r[6]/1000).toFixed(r[6]<10000?1:0)}K</span>`:""}</td><td>${r[4]?`<a class="l" target="_blank" rel="noopener" href="${esc(r[4])}">site</a>`:""}</td></tr>`).join("")}</table></div>`;
}
function agencies(){
  const ak=n=>n.toLowerCase().replace(/[.,]/g,'').replace(/\b(inc|llc|ltd|co)\b/g,'').replace(/\s+/g,' ').trim();const nm={};const by={};AGS.filter(a=>qmatch(a[0],a[1])).forEach(a=>{const k=ak(a[1]);nm[k]=nm[k]||a[1];const g=(by[nm[k]]=by[nm[k]]||{kind:a[2],rs:[]});const ex=g.rs.find(x=>x[0]===a[0]);if(ex)ex[3]=ex[3]||a[3];else g.rs.push(a.slice());});
  const keys=Object.keys(by).sort((a,b)=>by[b].rs.length-by[a].rs.length||a.localeCompare(b));
  return `<div class="tbl"><p class="mu">Who pays for each resort's Google ads, from Google's Ads Transparency Center (Ski-Area-Ad-Tracking repo, ${new Set(AGS.map(a=>a[0])).size} resorts with an outside buyer). Resorts buying their own ads are left out. <b>Bold</b> = current buyer. "Person" = an individual's verified ad account (often a freelancer or owner) - check before treating as a contact.</p>
  <table><tr><th>Advertiser</th><th>Type</th><th>Resorts</th></tr>${keys.map(k=>`<tr><td><b>${esc(k)}</b></td><td>${esc(by[k].kind)}</td><td>${by[k].rs.map(a=>a[3]?`<b>${esc(a[0])}</b>`:esc(a[0])).join(", ")}</td></tr>`).join("")}</table></div>`;
}
function creators(){
  const L=CRS.filter(c=>qmatch(c[0],Object.keys(c[3]).join(" ")));
  return `<div class="tbl"><p class="mu">Photographers and filmmakers credited in resort Instagram captions ("📸: @handle"), mined from ${"4,331"} recent posts in the Resort-Account-Tracking repo. Handles only - confirm the real name (LinkedIn, their bio) before adding them as people. Grows as the tracker collects more posts.</p>
  <table><tr><th>Handle</th><th>Type</th><th>Credits</th><th>Resorts</th><th>Example</th></tr>${L.map(c=>`<tr><td>${ig(c[0])}</td><td>${esc(c[1])}</td><td>${c[2]}</td><td>${Object.entries(c[3]).map(([r,n])=>esc(r)+(n>1?` (${n})`:"")).join(", ")}</td><td><a class="l" target="_blank" rel="noopener" href="${esc(c[4])}">post</a></td></tr>`).join("")}</table></div>`;
}
function open(p){
  const gq=encodeURIComponent(`${p.name} ${p.employer.split(";")[0]}`);
  $("#ob").innerHTML=`<h2>${esc(p.name)}</h2><div class="mu">${esc(LEVEL[p.tier])} · ${esc(p.group)} · Batch ${esc(p.batch.replace("B",""))}${p.updated?` (updated ${esc(p.updated)})`:""}</div>
   <div>${p.roles.map(r=>`<span class="tag">${esc(r)}</span>`).join("")}${vtag(p)}</div>
   <h4>Current / recent roles</h4><div>${esc(p.history).split("; ").join("<br>")}</div>
   <h4>Resorts and brands covered</h4><div>${esc(p.covers)}</div>
   <h4>Employer / parent / pass</h4><div>${esc(p.employer)}</div>
   ${(()=>{const rs=resortsFor(p);if(!rs.length)return"";const ads=AGS.filter(a=>rs.some(r=>norm(r[0])===norm(a[0])));return `<h4>Resort socials${ads.length?" + ad buyer":""}</h4><div>${rs.map(r=>`${esc(r[0])}: ${ig(r[5])||"no Instagram on file"}`).join("<br>")}${ads.length?"<br>Google ads bought by: "+ads.map(a=>esc(a[1])+(a[3]?" (current)":"")).join(", "):""}</div>`;})()}
   <h4>Based</h4><div>${esc(p.base)} (${esc(p.country)})</div>
   <h4>Source and notes</h4><div>${esc(p.notes)}</div>
   <h4>Research links</h4><div><a target="_blank" rel="noopener" href="https://www.google.com/search?q=${gq}+linkedin">LinkedIn (Google)</a> · <a target="_blank" rel="noopener" href="https://www.google.com/search?q=${gq}+site%3Asaminfo.com">SAM Magazine</a> · <a target="_blank" rel="noopener" href="https://www.google.com/search?q=${gq}+instagram">Instagram</a> · <a target="_blank" rel="noopener" href="https://www.google.com/search?q=${gq}&tbm=nws">News</a></div>`;
  $("#ov").style.display="block";history.replaceState(null,"","#p="+encodeURIComponent(p.name));
}
document.addEventListener("click",e=>{const c=e.target.closest("[data-id]");if(c&&!e.target.closest("#ov"))open(MKT[c.dataset.id]);
  const v=e.target.closest(".views button");if(v){view=v.dataset.v;document.querySelectorAll(".views button").forEach(b=>b.classList.toggle("on",b===v));render();}});
$("#ox").onclick=()=>{$("#ov").style.display="none";history.replaceState(null,"",location.pathname);};
$("#ov").onclick=e=>{if(e.target.id==="ov")$("#ox").click();};
document.addEventListener("keydown",e=>{if(e.key==="Escape")$("#ox").click();});
["#q","#fGrp","#fRole","#fState","#fTier","#fVer","#fBatch"].forEach(s=>$(s).addEventListener("input",render));
$("#csv").onclick=()=>{const cols=["name","group","tier","history","covers","employer","roles","country","state","base","verified","batch","notes"];
  const q=v=>`"${String(Array.isArray(v)?v.join(", "):v).replace(/"/g,'""')}"`;
  const blob=new Blob([[cols.join(","),...filtered().map(p=>cols.map(c=>q(p[c])).join(","))].join("\n")],{type:"text/csv"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="resort-marketing.csv";a.click();};
render();
const m=location.hash.match(/#p=(.+)/);if(m){const p=MKT.find(x=>x.name===decodeURIComponent(m[1]));if(p)open(p);}
})();
