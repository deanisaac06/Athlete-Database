// Ski & Snowboard Athlete Database - interface logic
const $ = id => document.getElementById(id);
const NA = ["USA", "Canada"];
let view = "cards";
let sortBy = "name";

const esc = s => { const d = document.createElement("div"); d.textContent = s == null ? "" : s; return d.innerHTML.replace(/"/g, "&quot;"); };
const stars = t => "★".repeat(4 - t);
const uniq = a => [...new Set(a)].sort((x, y) => x.localeCompare(y));
const isVerify = v => /verify|unknown/i.test(v || "");
// Region: USA/Canada, International, or country not yet confirmed (no longer counted as international)
const reg = a => NA.includes(a.country) ? "NA" : (!a.country || isVerify(a.country)) ? "UNK" : "INT";
const isRising = a => a.disc.some(d => /up-and-coming/i.test(d));

// Apply 2026 research updates (data/updates-2026.js)
(window.PATCH || []).forEach(([n, o]) => {
const a = DB.find(x => x.name.toLowerCase() === n.toLowerCase());
if (!a) { console.warn("Update skipped - name not found:", n); return; }
["area", "home", "country", "notes", "sport"].forEach(k => { if (o[k] != null) a[k] = o[k]; });
if (o.tier) a.tier = o.tier;
if (o.disc) a.disc = sp(o.disc, ",");
if (o.zones) a.zones = sp(o.zones, ";");
if (o.crews) a.crews = sp(o.crews, ";");
if (o.projects) a.projects = sp(o.projects, ";");
if (o.add) a.projects = [...sp(o.add, ";"), ...a.projects.filter(p => !/film segments$|verify/i.test(p))];
a.updated = true;
});

DB.forEach((a, i) => {
a.id = i;
a.verified = a.updated || /\bverified\b/i.test(a.notes);
a.isNew = a.added === "2026";
a.rising = isRising(a);
a.text = [a.name, a.sport, a.country, a.area, a.home, a.notes, a.role, ...a.disc, ...a.zones, ...a.projects, ...a.crews].join(" ").toLowerCase();
});

function fill(id, label, vals) {
$(id).innerHTML = `<option value="">${label}</option>` + vals.map(v => `<option>${esc(v)}</option>`).join("");
}
fill("fArea", "All home areas", uniq(DB.map(a => a.area).filter(v => v && !isVerify(v))));
fill("fDisc", "All disciplines / roles", uniq(DB.flatMap(a => a.disc)));
fill("fCrew", "All crews / companies", uniq(DB.flatMap(a => a.crews)));

function stats() {
const c = f => DB.filter(f).length;
const ath = a => a.role === "Athlete";
$("stats").innerHTML = [
["Athletes", c(ath)],
["Skiers", c(a => ath(a) && a.sport === "Ski")],
["Snowboarders", c(a => ath(a) && a.sport === "Snowboard")],
["USA + Canada", c(a => ath(a) && reg(a) === "NA")],
["International", c(a => ath(a) && reg(a) === "INT")],
["Country TBC", c(a => ath(a) && reg(a) === "UNK")],
["Up-and-coming", c(a => a.rising)],
["Industry people", c(a => a.role === "Industry")],
["Influencers / creators", c(a => a.role === "Influencer")],
["Crews / companies", uniq(DB.flatMap(a => a.crews)).length],
["✅ Updated 2026", c(a => a.verified)]
].map(([k, v]) => `<div class="stat"><b>${v}</b>${k}</div>`).join("");
}

function filtered() {
const q = $("q").value.trim().toLowerCase();
const ro = $("fRole").value, s = $("fSport").value, r = $("fReg").value, ar = $("fArea").value;
const d = $("fDisc").value, cr = $("fCrew").value, t = $("fTier").value, v = $("fVer").value;
return DB.filter(a =>
(!q || q.split(/\s+/).every(w => a.text.includes(w))) &&
(!ro || a.role === ro) &&
(!s || a.sport === s) &&
(!r || reg(a) === r) &&
(!ar || a.area === ar) &&
(!d || a.disc.includes(d)) &&
(!cr || a.crews.includes(cr)) &&
(!t || String(a.tier) === t) &&
(!v || (v === "v" && a.verified) || (v === "d" && !a.verified) || (v === "n" && a.isNew) || (v === "r" && a.rising))
).sort((x, y) => sortBy === "tier"
? (x.tier - y.tier) || x.name.localeCompare(y.name)
: String(x[sortBy]).localeCompare(String(y[sortBy])));
}

function badges(a) {
const role = a.role !== "Athlete" ? `<span class="badge ${a.role}">${a.role}</span>` : "";
return `<div class="badges">${role}${a.rising ? `<span class="badge Rising">Rising</span>` : ""}${a.isNew ? `<span class="badge New">New</span>` : ""}<span class="badge ${a.sport}">${a.sport}</span></div>`;
}

function card(a) {
return `<div class="card" data-id="${a.id}">
<div class="top"><div><div class="name">${esc(a.name)}${a.verified ? " ✅" : ""}</div><div class="tier">${stars(a.tier)}</div></div>${badges(a)}</div>
<div class="meta">${esc(a.country)} · ${esc(a.disc.join(", "))}</div>
<div class="home">${a.role !== "Athlete" ? "Based" : "Home"}: <span>${esc(a.home || "—")}</span></div>
<div class="meta">${a.projects.length ? "Latest: " + esc(a.projects[0]) : "Rides: " + esc(a.zones.slice(0, 3).join(", ") || "—")}</div>
<div class="chips">${a.crews.slice(0, 3).map(c => `<span class="chip">${esc(c)}</span>`).join("")}</div>
</div>`;
}

function groupBy(list, keyFn) {
const g = {};
list.forEach(a => keyFn(a).forEach(k => { (g[k] = g[k] || []).push(a); }));
const keys = Object.keys(g).sort((x, y) => (g[y].length - g[x].length) || x.localeCompare(y));
if (!keys.length) return `<p class="note">No matches.</p>`;
return keys.map(k => `<div class="group"><h2>${esc(k)} <small>${g[k].length} ${g[k].length > 1 ? "people" : "person"}</small></h2><div class="grid">${g[k].map(card).join("")}</div></div>`).join("");
}

function table(list) {
const th = (k, l) => `<th data-sort="${k}">${l}${sortBy === k ? " ▾" : ""}</th>`;
return `<table><tr>${th("name", "Name")}${th("role", "Role")}${th("sport", "Sport")}${th("country", "Country")}${th("area", "Home area")}${th("home", "Home mountain / base")}<th>Latest project</th><th>Crews</th>${th("tier", "Tier")}</tr>` +
list.map(a => `<tr class="r" data-id="${a.id}"><td><b>${esc(a.name)}</b>${a.verified ? " ✅" : ""}</td><td>${esc(a.role !== "Athlete" ? a.role + ": " + a.disc.join(", ") : a.rising ? "Athlete (rising)" : "Athlete")}</td><td><span class="badge ${a.sport}">${a.sport}</span></td><td>${esc(a.country)}</td><td>${esc(a.area)}</td><td>${esc(a.home)}</td><td>${esc(a.projects[0] || "")}</td><td>${esc(a.crews.join("; "))}</td><td class="tier">${stars(a.tier)}</td></tr>`).join("") + `</table>`;
}

function render() {
const list = filtered();
$("count").textContent = `${list.length} of ${DB.length} people`;
let html;
if (view === "cards") html = list.length ? `<div class="grid">${list.map(card).join("")}</div>` : `<p class="note">No matches.</p>`;
else if (view === "areas") html = groupBy(list, a => [isVerify(a.area) || !a.area ? "Home area not yet confirmed" : a.area]);
else if (view === "crews") html = groupBy(list, a => a.crews.length ? a.crews : ["No crew listed"]);
else html = table(list);
$("view").innerHTML = html;
}

function chips(arr, filterId) {
if (!arr.length) return `<span class="note">—</span>`;
return `<div class="chips">` + arr.map(v => filterId
? `<span class="chip link" data-f="${filterId}" data-v="${esc(v)}" title="Filter by this">${esc(v)}</span>`
: `<span class="chip">${esc(v)}</span>`).join("") + `</div>`;
}

function openP(i) {
const a = DB[i];
const enc = encodeURIComponent;
const ind = a.role !== "Athlete";
const who = `${a.name} ${ind ? (a.sport === "Snowboard" ? "snowboard" : "ski") + " " + (a.disc[0] || "") : a.sport === "Ski" ? "skier" : "snowboarder"}`;
const sec = (t, body) => `<div class="sec"><h3>${t}</h3>${body}</div>`;
$("panel").innerHTML = [
`<button class="close" id="closeBtn">✕</button><h2>${esc(a.name)}</h2>`,
`<div class="meta">${badges(a).replace('class="badges"', 'class="badges" style="display:inline-flex"')} ${esc(a.country)} · <span class="tier">${stars(a.tier)}</span> · ${a.verified ? "✅ checked against 2025-26 sources" : "unverified draft"}</div>`,
sec(ind ? "Based" : "Home mountain / base", `<div class="home"><span>${esc(a.home || "—")}</span></div><div style="margin-top:8px">${chips([a.area].filter(v => v && !isVerify(v)), "fArea")}</div>`),
sec(ind ? "Works in" : "Usual riding zones", chips(a.zones)),
sec(ind ? "Roles / content" : "Disciplines", chips(a.disc, "fDisc")),
sec("Notable projects / films (newest first)", a.projects.length ? `<ul>${a.projects.map(p => `<li>${esc(p)}</li>`).join("")}</ul>` : `<span class="note">—</span>`),
sec("Production companies / crews / brands", chips(a.crews, "fCrew")),
sec("Notes", `<div class="note">${esc(a.notes || "—")}</div>`),
sec("Research / verify", `<div class="links">
<a target="_blank" rel="noopener" href="https://www.google.com/search?q=${enc(who)}">Google</a>
<a target="_blank" rel="noopener" href="https://www.google.com/search?q=${enc(a.name + " instagram")}">Find Instagram</a>
<a target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${enc(who)}">YouTube</a>
<a target="_blank" rel="noopener" href="https://www.google.com/search?tbm=nws&q=${enc(who)}">News</a>
</div>`)
].join("");
$("ov").classList.add("open");
}
function closeP() { $("ov").classList.remove("open"); }

document.addEventListener("click", e => {
const f = e.target.closest("[data-f]");
if (f) { $(f.dataset.f).value = f.dataset.v; closeP(); render(); window.scrollTo(0, 0); return; }
const s = e.target.closest("[data-sort]");
if (s) { sortBy = s.dataset.sort; render(); return; }
const c = e.target.closest("[data-id]");
if (c) { openP(+c.dataset.id); return; }
if (e.target.id === "ov" || e.target.id === "closeBtn") closeP();
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeP(); });
["q", "fRole", "fSport", "fReg", "fArea", "fDisc", "fCrew", "fTier", "fVer"].forEach(id => $(id).addEventListener("input", render));
document.querySelectorAll(".tab").forEach(b => b.addEventListener("click", () => {
document.querySelectorAll(".tab").forEach(x => x.classList.remove("on"));
b.classList.add("on");
view = b.dataset.v;
render();
}));

stats();
render();

// Deep link: index.html#p=Name opens that profile (used by athlete/talent links on production.html).
// If the name is not in the database, the search box is filled with it instead.
function openFromHash() {
  const m = location.hash.match(/^#p=(.+)$/);
  if (!m) return;
  const n = decodeURIComponent(m[1]).trim();
  const a = DB.find(x => x.name.toLowerCase() === n.toLowerCase());
  if (a) openP(a.id); else { $("q").value = n; render(); }
}
window.addEventListener("hashchange", openFromHash);
openFromHash();
