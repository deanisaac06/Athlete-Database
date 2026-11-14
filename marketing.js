// Mountain Industry Database - resort marketing page logic
(function(){
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const PARENTS=[["Vail Resorts",/Vail Resorts|Epic Pass/],["Alterra Mountain Company",/Alterra|Ikon Pass/],["Aspen One",/Aspen/],["Boyne Resorts",/Boyne/],["POWDR",/POWDR/],
 ["Jackson Hole",/Jackson Hole/],["Passes + associations",/Indy Pass|Association|Tourism Board/],["Agencies",/Partners$|SNOW Partners|Agency/],["Brands",/^(Atomic|Obermeyer)/]];
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
  else{const by={};L.forEach(p=>(by[p.group]=by[p.group]||[]).push(p));
    out.innerHTML=`<div class="grp">${Object.keys(by).sort().map(g=>`<h2>${esc(g)} <span class="mu">(${by[g].length})</span></h2><div class="tbl" style="padding:0"><table>${HEAD}${by[g].map(row).join("")}</table></div>`).join("")}</div>`;}
}
function open(p){
  const gq=encodeURIComponent(`${p.name} ${p.employer.split(";")[0]}`);
  $("#ob").innerHTML=`<h2>${esc(p.name)}</h2><div class="mu">${esc(LEVEL[p.tier])} · ${esc(p.group)} · Batch ${esc(p.batch.replace("B",""))}${p.updated?` (updated ${esc(p.updated)})`:""}</div>
   <div>${p.roles.map(r=>`<span class="tag">${esc(r)}</span>`).join("")}${vtag(p)}</div>
   <h4>Current / recent roles</h4><div>${esc(p.history).split("; ").join("<br>")}</div>
   <h4>Resorts and brands covered</h4><div>${esc(p.covers)}</div>
   <h4>Employer / parent / pass</h4><div>${esc(p.employer)}</div>
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
