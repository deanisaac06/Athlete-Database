// prod-athletes.js: loads the athlete-database records (data/*.js used by index.html) so athlete/talent tags on production.html
// link to the matching profile in index.html (opened via index.html#p=Name). Names must match exactly (case-insensitive).
// Works on GitHub Pages and when opened locally (plain script tags, no fetch).
(function(){
  const FILES=["data/ski-na.js","data/ski-intl.js","data/snowboard-na.js","data/snowboard-intl.js","data/additions-2026.js","data/rising-2026.js","data/industry.js","data/creators.js"];
  const KEYS=["A","I","C","U","sp","DB","PATCH","BATCH"];
  const saved={};KEYS.forEach(k=>{saved[k]=window[k]});
  const names={};
  const add=n=>{n=String(n||"").trim();if(n)names[n.toLowerCase()]=n};
  window.sp=(x,c)=>String(x||"").split(c).map(v=>v.trim()).filter(Boolean);
  window.A=window.I=window.C=function(n){add(n)};
  window.U=function(){};
  window.DB=[];window.PATCH=[];
  let i=0;
  function next(){
    if(i>=FILES.length)return done();
    const s=document.createElement("script");s.src=FILES[i++];s.onload=s.onerror=next;document.head.appendChild(s);
  }
  function done(){
    KEYS.forEach(k=>{if(saved[k]===undefined)delete window[k];else window[k]=saved[k]});
    window.ATHDB=names;
    if(window.PNrender)window.PNrender();
  }
  next();
})();
