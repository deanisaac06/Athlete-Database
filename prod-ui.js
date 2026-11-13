// prod-ui.js — directory views, resume modals, filters, CSV export. Network graph lives in prod-net.js.
(function(){
const {D,P,C,K,uniq,links,SKILLS}=window.PN;
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const REG=[];
const L=(t,k,label)=>{REG.push([t,k]);return '<a class="l" data-r="'+(REG.length-1)+'">'+esc(label||k)+'</a>'};
const LP=n=>P[n]?L('p',n):esc(n), LC=n=>C[n]?L('c',n):esc(n), LK=n=>K[n]?L('k',n):esc(n), LJ=p=>L('j',p.id,p.t);
// Athlete/talent tags link to the athlete-database profile when the name exists there (window.ATHDB is filled by prod-athletes.js)
  const ATH=n=>{const hit=window.ATHDB&&window.ATHDB[String(n).trim().toLowerCase()];return hit?'<a class="tag a ath" href="index.html#p='+encodeURIComponent(hit)+'" target="_blank" rel="noopener" title="Open athlete-database profile">'+esc(n)+' &#8599;</a>':'<span class="tag a">'+esc(n)+'</span>'};
const join=(a,f)=>a&&a.length?a.map(f).join(', '):'<span class="mu">none documented yet</span>';
const ext=u=>u?'<a class="ext" href="'+esc(u)+'" target="_blank" rel="noopener">'+esc(u.replace(/^https?:\/\/(www\.)?/,'').replace(/\/$/,'').slice(0,70))+'</a>':'';
const vb=v=>v?'<span class="v1">&#9679; verified source</span>':'<span class="v0">&#9679; needs check</span>';
const sec=(t,b)=>'<h4>'+t+'</h4><div>'+b+'</div>';
const tagsD=a=>a.map(t=>'<span class="tag d">'+esc(t)+'</span>').join('');
const tagsC=a=>a.map(t=>'<span class="tag c">'+esc(t)+'</span>').join('');

const TABS=[['p','Creatives'],['c','Companies & agencies'],['j','Projects'],['k','Clients (resorts & brands)'],['n','Network']];
let tab='p';
$('tabs').innerHTML=TABS.map(([k,l])=>'<button data-tab="'+k+'">'+l+'</button>').join('');
$('tabs').onclick=e=>{const b=e.target.closest('button');if(b){tab=b.dataset.tab;setup()}};
function opts(el,arr){el.innerHTML=arr.map(([v,l])=>'<option value="'+esc(v)+'">'+esc(l)+'</option>').join('');el.style.display=arr.length?'':'none'}

function setup(){
  document.querySelectorAll('#tabs button').forEach(b=>b.classList.toggle('on',b.dataset.tab===tab));
  const f1=$('f1'),f2=$('f2'),s=$('srt');
  if(tab==='p'){opts(f1,[['','All specialties'],...SKILLS.map(x=>[x,x])]);opts(f2,[['','All profiles'],['Verified','Verified source'],['Needs check','Needs check'],['Auto (credits)','Auto-built from credits'],['claims','Has claims not yet backed by credits']]);opts(s,[['cred','Most credits'],['collab','Most collaborators'],['recent','Most recent work'],['az','A-Z']])}
  if(tab==='c'){opts(f1,[['','All types'],['Production / media','Production / film houses'],['Agency','Agencies']]);opts(f2,[['','Any track record'],['multi','2+ documented projects'],['one','Exactly 1 documented project'],['none','No linked project yet']]);opts(s,[['pj','Most projects'],['crew','Most people'],['cl','Most clients'],['az','A-Z']])}
  if(tab==='j'){const types=uniq(D.pj.map(p=>p.type)).sort();opts(f1,[['','All types'],['ad','Ads / campaigns / brand work'],['film','Films / videos'],['photo','Photography'],...types.map(t=>[t,t])]);const ys=uniq(D.pj.map(p=>String(p.yr||''))).sort().reverse();opts(f2,[['','All years'],...ys.map(y=>[y,y||'Year TBC'])]);opts(s,[['new','Newest'],['crew','Biggest credited crew'],['az','A-Z']])}
  if(tab==='k'){opts(f1,[['','All clients'],['Resort / pass / destination','Resorts / passes / destinations'],['Brand','Brands'],['Publication','Publications']]);opts(f2,[]);opts(s,[['pj','Most projects'],['crew','Most creatives'],['az','A-Z']])}
  if(tab==='n'){opts(f1,[['all','Everything'],['noath','Hide athletes'],['core','Companies + clients only']]);opts(f2,[['1','All nodes'],['2','2+ connections'],['3','3+ connections']]);opts(s,[])}
  $('g').style.display=tab==='n'?'none':'';$('net').style.display=tab==='n'?'block':'none';
  render();
}
['q','f1','f2','srt'].forEach(id=>$(id).addEventListener('input',render));

const sP=x=>[x.n,x.base,x.rolesL,x.affL,x.clients,x.cos,x.aths,x.demoAll,x.claimL,x.cred.map(c=>c.p.t),x.notes].flat().join(' ').toLowerCase();
const sC=c=>[c.n,c.type,c.base,c.spec,c.notes,c.clients,c.crew,c.aths,c.pjs.map(p=>p.t)].flat().join(' ').toLowerCase();
const sJ=p=>[p.t,p.y,p.type,p.clients,p.ags,p.prods,p.crew.map(x=>x.name+' '+x.role),p.aths,p.src].flat().join(' ').toLowerCase();
const sK=k=>[k.n,k.cat,k.ags,k.prods,k.crew,k.aths,k.pjs.map(p=>p.t)].flat().join(' ').toLowerCase();
const isAd=p=>/spot|campaign|commercial|brand|ad\b|resort|destination|pass/i.test(p.type);
const isPhoto=p=>/photo/i.test(p.type);
let ROWS=[];

function render(){
  REG.length=0;
  const q=$('q').value.trim().toLowerCase(),f1=$('f1').value,f2=$('f2').value,s=$('srt').value;
  const m=str=>!q||q.split(/\s+/).every(w=>str.includes(w));
  let h='';
  if(tab==='p'){
    const r=Object.values(P).filter(x=>m(sP(x))&&(!f1||x.demoAll.includes(f1)||x.claimOnly.includes(f1))&&(!f2||(f2==='claims'?x.claimOnly.length>0:x.kind===f2)));
    const so={cred:(a,b)=>b.cred.length-a.cred.length||a.n.localeCompare(b.n),collab:(a,b)=>b.collab.length-a.collab.length||a.n.localeCompare(b.n),recent:(a,b)=>b.last-a.last||a.n.localeCompare(b.n),az:(a,b)=>a.n.localeCompare(b.n)};
    r.sort(so[s]||so.cred);ROWS=r;
    $('st').innerHTML=r.length+' of '+Object.keys(P).length+' creatives &middot; '+Object.values(P).filter(x=>x.auto).length+' resumes auto-built from credits &middot; <span class="v1">green</span> = demonstrated in credited work, <span class="v0">yellow?</span> = claimed / self-described only';
    h=r.map(x=>'<div class="card" data-o="p" data-k="'+esc(x.n)+'"><h3>'+esc(x.n)+'</h3><div class="mu">'+esc(x.rolesL.slice(0,3).join(' · ')||'-')+'</div><div class="mu">'+esc(x.base||'')+(x.cos.length?' · '+esc(x.cos.slice(0,2).join(', ')):'')+'</div><div>'+tagsD(x.demoAll)+x.claimOnly.map(t=>'<span class="tag c">'+esc(t)+'?</span>').join('')+'</div><div class="mu" style="margin-top:4px">'+x.cred.length+' credit'+(x.cred.length==1?'':'s')+(x.clients.length?' · '+esc(x.clients.slice(0,3).join(', ')):'')+' · '+(x.auto?'<span class="v0">auto</span>':vb(x.v))+'</div></div>').join('');
  }
  if(tab==='c'){
    const r=Object.values(C).filter(c=>m(sC(c))&&(!f1||c.kind===f1)&&(!f2||(f2==='multi'?c.pjs.length>=2:f2==='one'?c.pjs.length===1:c.pjs.length===0)));
    const so={pj:(a,b)=>b.pjs.length-a.pjs.length||a.n.localeCompare(b.n),crew:(a,b)=>b.crew.length-a.crew.length,cl:(a,b)=>b.clients.length-a.clients.length,az:(a,b)=>a.n.localeCompare(b.n)};
    r.sort(so[s]||so.pj);ROWS=r;
    $('st').innerHTML=r.length+' of '+Object.keys(C).length+' companies &middot; '+Object.values(C).filter(c=>c.kind==='Agency').length+' agencies &middot; '+Object.values(C).filter(c=>c.pjs.length>=2).length+' with 2+ documented projects';
    h=r.map(c=>'<div class="card" data-o="c" data-k="'+esc(c.n)+'"><h3>'+esc(c.n)+'</h3><div class="mu">'+esc(c.type)+' · '+esc(c.base)+'</div><div class="mu" style="margin:4px 0">'+esc((c.spec||'').slice(0,140))+'</div><div class="mu">'+c.pjs.length+' project'+(c.pjs.length==1?'':'s')+' · '+c.crew.length+' people'+(c.clients.length?' · '+esc(c.clients.slice(0,3).join(', ')):'')+' · '+vb(c.v)+'</div></div>').join('');
  }
  if(tab==='j'){
    const r=D.pj.filter(p=>m(sJ(p))&&(!f1||(f1==='ad'?isAd(p)&&!isPhoto(p):f1==='film'?!isAd(p)&&!isPhoto(p):f1==='photo'?isPhoto(p):p.type===f1))&&(!f2||String(p.yr||'')===f2));
    const so={new:(a,b)=>b.yr-a.yr||a.t.localeCompare(b.t),crew:(a,b)=>b.crew.length-a.crew.length,az:(a,b)=>a.t.localeCompare(b.t)};
    r.sort(so[s]||so.new);ROWS=r;
    $('st').innerHTML=r.length+' of '+D.pj.length+' projects &middot; '+D.pj.reduce((a,p)=>a+p.crew.length,0)+' credits logged';
    h=r.map(p=>'<div class="card" data-o="j" data-k="'+p.id+'"><h3>'+esc(p.t)+'</h3><div class="mu">'+esc(p.y)+' · '+esc(p.type)+'</div><div class="mu">'+(p.clients.length?'Client: '+esc(p.clients.join(', '))+'<br>':'')+(p.ags.length?'Agency: '+esc(p.ags.join(', '))+'<br>':'')+(p.prods.length?'Production: '+esc(p.prods.join(', ')):'')+'</div><div class="mu" style="margin-top:4px">'+p.crew.length+' credited'+(p.aths.length?' · '+esc(p.aths.slice(0,3).join(', ')):'')+'</div></div>').join('');
  }
  if(tab==='k'){
    const r=Object.values(K).filter(k=>m(sK(k))&&(!f1||k.cat===f1));
    const so={pj:(a,b)=>b.pjs.length-a.pjs.length||a.n.localeCompare(b.n),crew:(a,b)=>b.crew.length-a.crew.length,az:(a,b)=>a.n.localeCompare(b.n)};
    r.sort(so[s]||so.pj);ROWS=r;
    $('st').innerHTML=r.length+' clients &middot; who makes their content: agencies, production companies, creatives';
    h=r.map(k=>'<div class="card" data-o="k" data-k="'+esc(k.n)+'"><h3>'+esc(k.n)+'</h3><div class="mu">'+esc(k.cat)+' · '+k.pjs.length+' project'+(k.pjs.length==1?'':'s')+'</div><div class="mu">'+(k.ags.length?'Agencies: '+esc(k.ags.join(', '))+'<br>':'')+(k.prods.length?'Production: '+esc(k.prods.join(', '))+'<br>':'')+k.crew.length+' credited creatives</div></div>').join('');
  }
  $('g').innerHTML=h||'<div class="mu">No matches.</div>';
  if(tab==='n'){$('st').innerHTML='Relationship map built from project credits and company rosters.';if(window.drawNet)window.drawNet($('f1').value,+$('f2').value||1,q)}
}

function credTable(rows){return '<table><tr><th>Year</th><th>Project</th><th>Role</th><th>Client</th><th>Agency / Production</th><th>Work</th></tr>'+rows.map(([p,role])=>'<tr><td>'+esc(p.y)+'</td><td>'+LJ(p)+'<div class="mu">'+esc(p.type)+'</div></td><td>'+esc(role)+'</td><td>'+join(p.clients,LK)+'</td><td>'+[...p.ags,...p.prods].map(LC).join(', ')+'</td><td>'+(p.link?ext(p.link):'<span class="mu">add link</span>')+'</td></tr>').join('')+'</table>'}

function openP(n){const x=P[n];if(!x)return;
  const cr=x.cred.slice().sort((a,b)=>b.p.yr-a.p.yr).map(c=>[c.p,c.role]);
  return '<h2>'+esc(x.n)+'</h2><div class="mu">'+esc(x.rolesL.join(' · '))+'</div><div class="mu">'+esc(x.base||'(location TBC)')+' · '+(x.auto?'<span class="v0">auto-built from credits</span>':vb(x.v))+'</div>'
  +sec('Capabilities',(x.demoAll.length?'<div><b>Demonstrated</b> '+tagsD(x.demoAll)+'</div>':'')+(x.claimOnly.length?'<div style="margin-top:4px"><b>Claimed / self-described</b> '+tagsC(x.claimOnly)+'</div>':'')+'<div class="note">Demonstrated = appears in a credited project or published work. Claimed = from their bio/portfolio, not yet tied to a credit here.</div>')
  +sec('Experience ('+cr.length+' credit'+(cr.length==1?'':'s')+')',cr.length?credTable(cr):'<span class="mu">No project credits logged yet; see notes and affiliations.</span>')
  +sec('Clients (resorts, brands, publications)',join(x.clients,LK))
  +sec('Companies & agencies',join(x.cos,LC))
  +sec('Athletes / talent on their projects',x.aths.length?x.aths.map(ATH).join(''):'<span class="mu">none documented yet</span>')
  +sec('Collaborators',join(x.collab,LP))
  +sec('Portfolio & links',(links(x.links).map(l=>'<a class="ext" href="'+esc(l.u)+'" target="_blank" rel="noopener">'+esc(l.l)+'</a>').join(' · '))||'<span class="mu">add website / Instagram / Vimeo</span>')
  +sec('Notes',esc(x.notes||'-'))+sec('Sources',esc(x.src||'-'))}
function openC(n){const c=C[n];if(!c)return;
  const rec=c.pjs.length>=2?'<span class="v1">Established: '+c.pjs.length+' documented projects</span>':c.pjs.length===1?'<span class="v0">1 documented project so far</span>':'<span class="mu">No linked project yet</span>';
  return '<h2>'+esc(c.n)+'</h2><div class="mu">'+esc(c.type)+' · '+esc(c.base)+' · '+vb(c.v)+'</div><div class="mu">'+rec+'</div>'
  +sec('Website & social',[c.web?ext(c.web):'',c.ig?'<a class="ext" href="https://www.instagram.com/'+esc(c.ig)+'" target="_blank" rel="noopener">Instagram @'+esc(c.ig)+'</a>':''].filter(Boolean).join(' · ')||'<span class="mu">add</span>')
  +sec('Specialties & capabilities',esc(c.spec||'-'))
  +sec('Projects',c.pjs.length?'<table><tr><th>Year</th><th>Project</th><th>Type</th><th>Client</th><th>Work</th></tr>'+c.pjs.slice().sort((a,b)=>b.yr-a.yr).map(p=>'<tr><td>'+esc(p.y)+'</td><td>'+LJ(p)+'</td><td>'+esc(p.type)+'</td><td>'+join(p.clients,LK)+'</td><td>'+(p.link?ext(p.link):'')+'</td></tr>').join('')+'</table>':'<span class="mu">none linked yet</span>')
  +sec('Clients',join(c.clients,LK))+sec('Worked alongside (agencies / production cos)',join(c.partners,LC))
  +sec('People',join(c.crew,LP))+sec('Athletes / talent',c.aths.length?c.aths.map(ATH).join(''):'<span class="mu">none documented yet</span>')
  +sec('Notes',esc(c.notes||'-'))+sec('Sources',esc(c.src||'-'))}
function openJ(id){const p=D.pj[+id];if(!p)return;
  return '<h2>'+esc(p.t)+'</h2><div class="mu">'+esc(p.y)+' · '+esc(p.type)+'</div>'
  +sec('Client',join(p.clients,LK))+sec('Agency',join(p.ags,LC))+sec('Production',join(p.prods,LC))
  +sec('Credits ('+p.crew.length+')',p.crew.length?'<table><tr><th>Role</th><th>Name</th></tr>'+p.crew.map(c=>'<tr><td>'+esc(c.role)+'</td><td>'+LP(c.name)+'</td></tr>').join('')+'</table>':'<span class="mu">crew not yet credited — research needed</span>')
  +sec('Athletes / talent',p.aths.length?p.aths.map(ATH).join(''):'<span class="mu">-</span>')
  +sec('Watch / source',(p.link?ext(p.link)+'<br>':'')+esc(p.src||''))}
function openK(n){const k=K[n];if(!k)return;
  return '<h2>'+esc(k.n)+'</h2><div class="mu">'+esc(k.cat)+'</div>'
  +sec('Projects',k.pjs.map(p=>'<div>'+esc(p.y)+' · '+LJ(p)+' <span class="mu">'+esc(p.type)+'</span></div>').join(''))
  +sec('Agencies',join(k.ags,LC))+sec('Production companies',join(k.prods,LC))
  +sec('Creatives who made their content',join(k.crew,LP))+sec('Athletes / talent featured',k.aths.length?k.aths.map(ATH).join(''):'<span class="mu">-</span>')}

function open(t,k){const h=t==='p'?openP(k):t==='c'?openC(k):t==='j'?openJ(k):t==='k'?openK(k):null;if(!h)return;$('ob').innerHTML=h;$('ov').style.display='block';$('ov').scrollTop=0}
window.PNopen=open;
document.addEventListener('click',e=>{
  const a=e.target.closest('[data-r]');if(a){const r=REG[+a.dataset.r];if(r){e.preventDefault();open(r[0],r[1])}return}
  const c=e.target.closest('.card');if(c){open(c.dataset.o,c.dataset.k);return}
  if(e.target.id==='ov'||e.target.id==='ox')$('ov').style.display='none';
});
document.addEventListener('keydown',e=>{if(e.key==='Escape')$('ov').style.display='none'});

// CSV export of the current view
$('csv').onclick=()=>{
  const J=a=>(a||[]).join('; ');let head=[],rows=[];
  if(tab==='p'){head=['Name','Roles','Base','Demonstrated','Claimed only','Credits','Projects','Clients','Companies','Athletes','Links','Status','Sources'];rows=ROWS.map(x=>[x.n,J(x.rolesL),x.base,J(x.demoAll),J(x.claimOnly),x.cred.length,J(x.cred.map(c=>c.p.t+' ('+c.role+')')),J(x.clients),J(x.cos),J(x.aths),x.links,x.kind,x.src])}
  else if(tab==='c'){head=['Company','Type','Base','Website','Instagram','Specialties','Projects','Clients','People','Athletes','Status','Sources'];rows=ROWS.map(c=>[c.n,c.type,c.base,c.web,c.ig,c.spec,J(c.pjs.map(p=>p.t)),J(c.clients),J(c.crew),J(c.aths),c.v?'verified':'needs check',c.src])}
  else if(tab==='j'){head=['Project','Year','Type','Client','Agency','Production','Credits','Athletes','Link','Source'];rows=ROWS.map(p=>[p.t,p.y,p.type,J(p.clients),J(p.ags),J(p.prods),J(p.crew.map(c=>c.role+': '+c.name)),J(p.aths),p.link,p.src])}
  else if(tab==='k'){head=['Client','Category','Projects','Agencies','Production companies','Creatives','Athletes'];rows=ROWS.map(k=>[k.n,k.cat,J(k.pjs.map(p=>p.t)),J(k.ags),J(k.prods),J(k.crew),J(k.aths)])}
  else return;
  const q=v=>'"'+String(v==null?'':v).replace(/"/g,'""')+'"';
  const csv=[head,...rows].map(r=>r.map(q).join(',')).join('\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='production-'+({p:'creatives',c:'companies',j:'projects',k:'clients'}[tab])+'.csv';a.click();
};

window.PNrender=render;
setup();
const s=document.createElement('script');s.src='prod-net.js';document.body.appendChild(s);
})();
