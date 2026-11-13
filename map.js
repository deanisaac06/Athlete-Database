// Interactive map view - who is where (home bases, usual riding zones, recent project locations)
// Uses Leaflet + data/places.js and the filters from app.js. Pins are approximate (town / resort level).
// Dashed pins = general area only (exact base not confirmed).
(function () {
const norm = s => String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const PL = {};
const build = (arr, lvl) => (arr || []).flatMap(([label, lat, lng, ...keys]) => {
PL[label] = { label, lat, lng, lvl };
return keys.map(k => ({ label, len: k.length, re: new RegExp("(^|[^a-z0-9])" + reEsc(norm(k)) + "(?=[^a-z0-9]|$)") }));
});
const SK = build(window.SPOTS, "spot"), RK = build(window.REGIONS, "region");
function hits(text, keys) {
const t = norm(text), out = [];
keys.forEach(o => { const m = o.re.exec(t); if (m) out.push({ label: o.label, pos: m.index + m[1].length, end: m.index + m[0].length, len: o.len }); });
return out.sort((a, b) => a.pos - b.pos || b.len - a.len);
}
const clean = s => String(s || "").replace(/\((from|taught|also)[^)]*\)/gi, " ");

// Home base: specific spot in home, then in home area, then region/state/country
function homeLoc(a) {
const h = clean(a.home), ar = clean(a.area);
const sh = hits(h, SK)[0], sa = hits(ar, SK)[0];
if (sh) return { label: sh.label, approx: /verify/i.test(a.home) };
if (sa) return { label: sa.label, approx: true };
if (norm(a.area).trim() === "are") return { label: "Are, Sweden", approx: true };
const r = hits(h, RK)[0] || hits(ar, RK)[0] || hits(a.country, RK)[0];
return r ? { label: r.label, approx: true } : null;
}
// Zones / projects: every place named in each item (state/country qualifiers right after a spot are ignored)
function listLocs(items) {
const set = new Set();
items.forEach(z => {
const s = hits(z, SK);
s.forEach(x => set.add(x.label));
hits(z, RK).forEach(r => { if (!s.some(x => r.pos >= x.end && r.pos - x.end <= 3)) set.add(r.label); });
});
return [...set];
}

const COL = { ski: "#54aaff", snow: "#ff8c42", mix: "#78dcbe", ind: "#c792ea", inf: "#ff6fa8", ris: "#9be15d", ath: "#e6ecf2", gold: "#ffd25a", silver: "#b8c2ce", grey: "#6b7785" };
const LEG = {
sport: [[COL.ski, "Ski only"], [COL.snow, "Snowboard only"], [COL.mix, "Ski + snowboard"]],
role: [[COL.ath, "Mostly athletes"], [COL.ind, "Mostly industry"], [COL.inf, "Mostly influencers"]],
tier: [[COL.gold, "Has a ★★★ marquee name"], [COL.silver, "Best is ★★"], [COL.grey, "★ only"]],
rising: [[COL.ris, "Has up-and-coming riders"], [COL.grey, "No rising riders"]]
};
const st = { mode: "home", color: "sport", sort: "count", approx: true };
let map, layer, markers = {}, cur = [], lastSig = "";
const cnt = (g, f) => g.people.filter(x => f(x.a)).length;
const sportCol = a => a.sport === "Ski" ? COL.ski : a.sport === "Snowboard" ? COL.snow : COL.mix;

function colorOf(g) {
const n = f => cnt(g, f);
if (st.color === "role") {
const c = { Athlete: n(a => a.role === "Athlete"), Industry: n(a => a.role === "Industry"), Influencer: n(a => a.role === "Influencer") };
const top = Object.keys(c).sort((x, y) => c[y] - c[x])[0];
return top === "Industry" ? COL.ind : top === "Influencer" ? COL.inf : COL.ath;
}
if (st.color === "tier") { const t = Math.min(...g.people.map(x => x.a.tier)); return t === 1 ? COL.gold : t === 2 ? COL.silver : COL.grey; }
if (st.color === "rising") return n(a => a.rising) ? COL.ris : COL.grey;
const s = n(a => a.sport === "Ski"), b = n(a => a.sport === "Snowboard");
return s && !b ? COL.ski : b && !s ? COL.snow : COL.mix;
}

function popup(g) {
const ps = g.people.slice().sort((x, y) => x.a.tier - y.a.tier || x.a.name.localeCompare(y.a.name));
const ind = cnt(g, a => a.role !== "Athlete");
return `<div class="mp"><div class="mph">${esc(g.pl.label)}</div>
<div class="mpm">${ps.length} ${ps.length > 1 ? "people" : "person"} · ${cnt(g, a => a.sport === "Ski")} ski · ${cnt(g, a => a.sport === "Snowboard")} snowboard${ind ? ` · ${ind} industry/creator` : ""}${cnt(g, a => a.rising) ? ` · ${cnt(g, a => a.rising)} rising` : ""}</div>
${g.pl.lvl === "region" ? `<div class="mpw">General area only - exact base not confirmed yet</div>` : ""}
<div class="mpl">${ps.map(({ a, approx }) => `<div class="mpr" data-id="${a.id}"><i style="background:${sportCol(a)}"></i><span class="mpn">${esc(a.name)}${a.verified ? " ✅" : ""}${approx && g.pl.lvl === "spot" ? ` <small title="Base not fully confirmed">(approx.)</small>` : ""}<small>${esc(a.role !== "Athlete" ? a.role + (a.disc[0] ? " · " + a.disc[0] : "") : (a.rising ? "Rising · " : "") + (a.projects[0] || a.disc[0] || ""))}</small></span><span class="tier">${stars(a.tier)}</span></div>`).join("")}</div>
<div class="mpf">Click a name for the full profile</div></div>`;
}

function init() {
map = L.map("map", { worldCopyJump: true, minZoom: 2 }).setView([45, -40], 3);
const t = (u, o) => L.tileLayer(u, o);
const base = {
"Dark": t("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", { subdomains: "abcd", maxZoom: 19, attribution: "&copy; OpenStreetMap contributors &copy; CARTO" }),
"Terrain": t("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", { maxZoom: 17, attribution: "&copy; OpenStreetMap contributors, SRTM | &copy; OpenTopoMap (CC-BY-SA)" }),
"Satellite": t("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", { maxZoom: 18, attribution: "Tiles &copy; Esri" }),
"Streets": t("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "&copy; OpenStreetMap contributors" })
};
base.Dark.addTo(map);
L.control.layers(base, null, { position: "topright" }).addTo(map);
L.control.scale().addTo(map);
layer = L.layerGroup().addTo(map);
}

function fit() {
if (!map || !cur.length) return;
map.fitBounds(L.latLngBounds(cur.map(g => [g.pl.lat, g.pl.lng])).pad(0.12), { maxZoom: 8 });
}

function side() {
const q = norm($("mQ").value);
const key = {
count: g => -g.people.length,
az: null,
ski: g => -cnt(g, a => a.sport === "Ski"),
snow: g => -cnt(g, a => a.sport === "Snowboard"),
top: g => -cnt(g, a => a.tier === 1),
rising: g => -cnt(g, a => a.rising),
ind: g => -cnt(g, a => a.role !== "Athlete"),
verified: g => -cnt(g, a => a.verified),
north: g => -g.pl.lat,
west: g => g.pl.lng
}[st.sort];
const arr = cur.filter(g => !q || norm(g.pl.label).includes(q) || g.people.some(x => norm(x.a.name).includes(q)))
.sort((x, y) => (key ? key(x) - key(y) : 0) || x.pl.label.localeCompare(y.pl.label));
$("mList").innerHTML = arr.map(g => {
const t1 = cnt(g, a => a.tier === 1), ri = cnt(g, a => a.rising), ind = cnt(g, a => a.role !== "Athlete");
return `<div class="pl" data-pl="${esc(g.pl.label)}"><div><b>${esc(g.pl.label)}</b>${g.pl.lvl === "region" ? ` <small class="note">general area</small>` : ""}
<div class="plm">${cnt(g, a => a.sport === "Ski")} ski · ${cnt(g, a => a.sport === "Snowboard")} board${t1 ? ` · ${t1} ★★★` : ""}${ri ? ` · ${ri} rising` : ""}${ind ? ` · ${ind} industry/creator` : ""}</div></div><span class="pc" style="border-color:${colorOf(g)}">${g.people.length}</span></div>`;
}).join("") || `<p class="note">No places match.</p>`;
}

window.renderMap = function (list) {
if (!window.L) { $("mInfo").textContent = "Map library did not load - check your internet connection and refresh."; return; }
if (!map) init();
setTimeout(() => map.invalidateSize(), 30);
const groups = {};
let unm = 0;
list.forEach(a => {
let locs;
if (st.mode === "home") { const h = homeLoc(a); locs = h ? [h] : []; }
else locs = listLocs(st.mode === "zones" ? a.zones : a.projects).map(l => ({ label: l, approx: PL[l].lvl === "region" }));
if (!st.approx) locs = locs.filter(l => PL[l.label].lvl === "spot");
if (!locs.length) { unm++; return; }
locs.forEach(l => { (groups[l.label] = groups[l.label] || { pl: PL[l.label], people: [] }).people.push({ a, approx: l.approx }); });
});
cur = Object.values(groups).sort((x, y) => y.people.length - x.people.length);
layer.clearLayers();
markers = {};
cur.forEach(g => {
const n = g.people.length, reg = g.pl.lvl === "region", c = colorOf(g);
const m = L.circleMarker([g.pl.lat, g.pl.lng], { radius: Math.min(6 + 3.2 * Math.sqrt(n), 32), color: c, weight: reg ? 1.5 : 2, fillColor: c, fillOpacity: reg ? 0.12 : 0.55, dashArray: reg ? "4 4" : null })
.bindTooltip(`${esc(g.pl.label)} · ${n}`, { direction: "top" })
.bindPopup(() => popup(g), { maxWidth: 360, minWidth: 270 });
m.addTo(layer);
markers[g.pl.label] = m;
});
const sig = st.mode + st.approx + list.map(a => a.id).join(",");
if (sig !== lastSig) { lastSig = sig; fit(); }
const what = { home: "home base", zones: "riding zones", projects: "project locations" }[st.mode];
$("mInfo").textContent = `${list.length - unm} of ${list.length} people mapped by ${what} across ${cur.length} places` + (unm ? ` · ${unm} not on the map (${st.mode === "home" ? "base not confirmed yet" : "no place named"})` : "");
$("mLegend").innerHTML = LEG[st.color].map(([c, l]) => `<span><i style="background:${c}"></i>${l}</span>`).join("") + `<span><i class="dash"></i>Dashed = general area / base not confirmed</span><span>Bigger circle = more people</span>`;
side();
};

// Show the map when the Map tab is active; re-draw whenever any filter changes
function sync() {
const on = view === "map";
$("mapWrap").style.display = on ? "" : "none";
$("view").style.display = on ? "none" : "";
if (on) window.renderMap(filtered());
}
["q", "fRole", "fSport", "fReg", "fArea", "fDisc", "fCrew", "fTier", "fVer"].forEach(id => $(id).addEventListener("input", sync));
document.querySelectorAll(".tab").forEach(b => b.addEventListener("click", sync));
document.addEventListener("click", e => { if (e.target.closest("[data-f]")) sync(); });

[["mMode", "mode"], ["mColor", "color"], ["mSort", "sort"]].forEach(([id, k]) => $(id).addEventListener("input", () => { st[k] = $(id).value; k === "sort" ? side() : sync(); }));
$("mApprox").addEventListener("change", () => { st.approx = $("mApprox").checked; sync(); });
$("mQ").addEventListener("input", side);
$("mFit").addEventListener("click", fit);
$("mList").addEventListener("click", e => {
const p = e.target.closest("[data-pl]");
if (!p) return;
const g = cur.find(x => x.pl.label === p.dataset.pl);
if (!g) return;
map.flyTo([g.pl.lat, g.pl.lng], Math.max(map.getZoom(), g.pl.lvl === "region" ? 5 : 9), { duration: 0.8 });
setTimeout(() => markers[g.pl.label] && markers[g.pl.label].openPopup(), 850);
});
sync();
})();
