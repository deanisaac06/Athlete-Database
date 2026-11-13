// prod-net.js — relationship map (force layout on canvas). Nodes: creatives, production cos, agencies, clients, athletes.
(function(){
const {D,P,C}=window.PN;
const cv=document.getElementById('cv'),ctx=cv.getContext('2d');
const COL={person:'#58a6ff',prod:'#3fb950',ag:'#f0883e',client:'#ff7b72',ath:'#bc8cff'};
let nodes=[],edges=[],view={x:0,y:0,k:1},hover=null,query='';

function build(mode,min){
  const N=new Map(),E=new Map();
  const node=(id,label,type,ref)=>{if(!N.has(id))N.set(id,{id,label,type,ref,deg:0});return id};
  const edge=(a,b)=>{if(!a||!b||a===b)return;const k=a<b?a+'|'+b:b+'|'+a;if(!E.has(k))E.set(k,[a,b])};
  D.pj.forEach(p=>{
    const orgs=[...p.prods.map(n=>node('c:'+n,n,'prod',['c',n])),...p.ags.map(n=>node('c:'+n,n,'ag',['c',n]))];
    const cls=p.clients.map(n=>node('k:'+n,n,'client',['k',n]));
    orgs.forEach(o=>cls.forEach(c=>edge(o,c)));
    for(let i=0;i<orgs.length;i++)for(let j=i+1;j<orgs.length;j++)edge(orgs[i],orgs[j]);
    const hubs=orgs.length?orgs:cls;
    const crewIds=mode==='core'?[]:p.crew.map(c=>node('p:'+c.name,c.name,'person',['p',c.name]));
    if(hubs.length)crewIds.forEach(id=>hubs.forEach(h=>edge(id,h)));
    else for(let i=0;i<crewIds.length;i++)for(let j=i+1;j<crewIds.length;j++)edge(crewIds[i],crewIds[j]);
    if(mode==='all')p.aths.forEach(a=>{const id=node('a:'+a,a,'ath',null);if(hubs.length)hubs.forEach(h=>edge(id,h));else crewIds.forEach(c=>edge(id,c))});
  });
  if(mode!=='core')Object.values(C).forEach(c=>c.peopleL.forEach(n=>{const cid=node('c:'+c.n,c.n,c.kind==='Agency'?'ag':'prod',['c',c.n]);edge(node('p:'+n,n,'person',['p',n]),cid)}));
  E.forEach(([a,b])=>{N.get(a).deg++;N.get(b).deg++});
  const keep=new Set([...N.values()].filter(n=>n.deg>=min).map(n=>n.id));
  nodes=[...N.values()].filter(n=>keep.has(n.id));
  const idx=new Map(nodes.map((n,i)=>[n.id,i]));
  edges=[...E.values()].filter(([a,b])=>keep.has(a)&&keep.has(b)).map(([a,b])=>[idx.get(a),idx.get(b)]);
  layout();
}

function layout(){
  const n=nodes.length;
  nodes.forEach((d,i)=>{const a=i/n*Math.PI*2*7.3,r=40+Math.sqrt(i)*28;d.x=Math.cos(a)*r;d.y=Math.sin(a)*r;d.vx=0;d.vy=0});
  for(let it=0;it<320;it++){
    const t=1-it/320;
    for(let i=0;i<n;i++){const a=nodes[i];for(let j=i+1;j<n;j++){const b=nodes[j];let dx=a.x-b.x,dy=a.y-b.y,d2=dx*dx+dy*dy+0.01;if(d2>250000)continue;const f=1800/d2;a.vx+=dx*f;a.vy+=dy*f;b.vx-=dx*f;b.vy-=dy*f}}
    edges.forEach(([i,j])=>{const a=nodes[i],b=nodes[j];const dx=b.x-a.x,dy=b.y-a.y,d=Math.sqrt(dx*dx+dy*dy)+0.01,f=(d-55)*0.02;a.vx+=dx/d*f;a.vy+=dy/d*f;b.vx-=dx/d*f;b.vy-=dy/d*f});
    nodes.forEach(d=>{d.vx-=d.x*0.004;d.vy-=d.y*0.004;const s=Math.min(1,10*t/Math.max(1,Math.hypot(d.vx,d.vy)));d.x+=d.vx*s;d.y+=d.vy*s;d.vx*=0.5;d.vy*=0.5});
  }
  fit();
}
function fit(){
  size();if(!nodes.length)return;
  const xs=nodes.map(d=>d.x),ys=nodes.map(d=>d.y);
  const w=Math.max(...xs)-Math.min(...xs)+80,h=Math.max(...ys)-Math.min(...ys)+80;
  view.k=Math.min(cv.clientWidth/w,cv.clientHeight/h,2);
  view.x=cv.clientWidth/2-(Math.max(...xs)+Math.min(...xs))/2*view.k;
  view.y=cv.clientHeight/2-(Math.max(...ys)+Math.min(...ys))/2*view.k;
}
function size(){const r=window.devicePixelRatio||1;cv.width=cv.clientWidth*r;cv.height=cv.clientHeight*r;ctx.setTransform(r,0,0,r,0,0)}
const R=d=>(3+Math.sqrt(d.deg)*2.2)*Math.max(1,0.9/view.k);
function draw(){
  const r=window.devicePixelRatio||1;ctx.setTransform(r,0,0,r,0,0);ctx.clearRect(0,0,cv.clientWidth,cv.clientHeight);
  ctx.save();ctx.translate(view.x,view.y);ctx.scale(view.k,view.k);
  const hi=hover?new Set([hover.i,...edges.filter(e=>e[0]===hover.i||e[1]===hover.i).flat()]):null;
  ctx.lineWidth=1/view.k;
  edges.forEach(([i,j])=>{const a=nodes[i],b=nodes[j];const on=hi&&hi.has(i)&&hi.has(j)&&(i===hover.i||j===hover.i);ctx.strokeStyle=on?'rgba(230,237,243,.7)':hi?'rgba(139,148,158,.06)':'rgba(139,148,158,.18)';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()});
  nodes.forEach((d,i)=>{const m=query&&d.label.toLowerCase().includes(query);ctx.globalAlpha=hi&&!hi.has(i)?0.25:1;ctx.fillStyle=COL[d.type];ctx.beginPath();ctx.arc(d.x,d.y,R(d),0,7);ctx.fill();if(m){ctx.strokeStyle='#fff';ctx.lineWidth=2/view.k;ctx.stroke();ctx.lineWidth=1/view.k}});
  ctx.globalAlpha=1;ctx.font=(11/view.k)+'px system-ui';ctx.fillStyle='#e6edf3';
  nodes.forEach((d,i)=>{const m=query&&d.label.toLowerCase().includes(query);if(d.deg>=4||m||(hi&&hi.has(i))||view.k>1.6)ctx.fillText(d.label,d.x+R(d)+2,d.y+3/view.k)});
  ctx.restore();
}
function hit(mx,my){const x=(mx-view.x)/view.k,y=(my-view.y)/view.k;let best=null,bd=1e9;nodes.forEach((d,i)=>{const dd=Math.hypot(d.x-x,d.y-y);if(dd<R(d)+4/view.k&&dd<bd){bd=dd;best={d,i}}});return best}
let drag=null;
cv.addEventListener('mousedown',e=>{drag={x:e.offsetX,y:e.offsetY,vx:view.x,vy:view.y,moved:false}});
cv.addEventListener('mousemove',e=>{if(drag){const dx=e.offsetX-drag.x,dy=e.offsetY-drag.y;if(Math.abs(dx)+Math.abs(dy)>3)drag.moved=true;view.x=drag.vx+dx;view.y=drag.vy+dy;draw();return}
  const h=hit(e.offsetX,e.offsetY);if((h&&h.i)!==(hover&&hover.i)){hover=h;cv.style.cursor=h&&h.d.ref?'pointer':'grab';cv.title=h?h.d.label+' ('+h.d.deg+' connections)':'';draw()}});
cv.addEventListener('mouseup',e=>{const was=drag;drag=null;if(was&&!was.moved){const h=hit(e.offsetX,e.offsetY);if(h&&h.d.ref)window.PNopen(h.d.ref[0],h.d.ref[1])}});
cv.addEventListener('mouseleave',()=>{drag=null;hover=null;draw()});
cv.addEventListener('wheel',e=>{e.preventDefault();const f=e.deltaY<0?1.15:1/1.15;view.x=e.offsetX-(e.offsetX-view.x)*f;view.y=e.offsetY-(e.offsetY-view.y)*f;view.k*=f;draw()},{passive:false});
window.addEventListener('resize',()=>{if(cv.clientWidth){size();draw()}});

let last='';
window.drawNet=function(mode,min,q){
  query=(q||'').trim().toLowerCase();
  const key=mode+'|'+min;
  requestAnimationFrame(()=>{if(key!==last||!nodes.length){build(mode||'all',min||1);last=key}else size();draw()});
};
if(document.getElementById('net').style.display==='block')window.PNrender();
})();
