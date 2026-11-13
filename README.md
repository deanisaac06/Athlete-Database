# Ski & Snowboard Athlete Database

A clickable, searchable database of influential skiers and snowboarders, rising riders, influencers, and the filmmakers, photographers and industry people around them. The focus is freeride and backcountry athletes who do film and video work, with a smaller set of competition athletes.

**Last updated:** November 12, 2026

## Production Network (production.html)

A second page, `production.html`, maps **who makes the ski industry's content**: production companies, agencies, directors, DPs, editors, photographers, drone/FPV pilots, plus the resorts and brands they work for. Every person named in a project credit automatically gets a resume page (credits, clients, collaborators, athletes, skills).

| Metric (Nov 12, 2026) | Count |
|---|---|
| Creatives with resumes | 303 (216 auto-built from credits) |
| Companies + agencies | 68 (17 agencies) |
| Projects | 82 (299 credits logged) |
| Clients (resorts, passes, destinations, brands, publications) | 46 |

**Batch 1:** TGR, MSP, Sherpas, Legs of Steel, BLANK, Level 1, Brain Farm; Ikon Pass, Jackson Hole, Sun Valley, A-Basin, Mammoth, Vail; Arc'teryx, TNF, Patagonia; FREESKIER / POWDER photographers.

**Batch 2 (`data/prod-batch2.js`):**
- Resorts and destinations: Vail Resorts / Epic Pass (Fortnight "Epic for Everyone" 2019, Postcorp, Genesis 2008), Steamboat ("The Steamboat Way", full Hungryman crew), Arapahoe Basin ("Leave No Days Behind" 2024), Palisades Tahoe (four Toyota x Palisades films by H/L, Wolfhouse, Rabit Haus, Stept), Telluride + Mountain Village ("Beyond It All", Karsh Hagan), Aspen Snowmass ("The Aspen Way", Factory Labs "Before"), Whistler Blackcomb ("Magnetic"), Tourism Whistler, Big Sky, Grand Targhee, Ski Big 3, Mike Wiegele, Destination BC (Donderlab, MMGY Origin), LAAX ("Last Day Pass"), Austria Tourism ("NoSki Instructor"), Dolomiti Superski (directors added), and Zermatt / Taos leads.
- Brands: Burton (PAVED, BLOOOM), Salomon (The Edge of Reason, Cody Townsend 2026 film, Vantage), Patagonia (Papsura full credits, DIG, Simple as a Turn), The North Face (Defy Easy, Everest: The Other Side), Red Bull (PAVED co-production, We Can't Not creators), HEAD (Out Of The Ordinary), 686.
- Established relationships now visible: Cactus + Lumenati for A-Basin (2024 and 2026), H/L + Wolfhouse for Palisades Tahoe (2025 and 2026), Fortnight for Vail / Steamboat / Sun Valley, Donderlab for Tourism Whistler and Big Sky, Wien Nord Serviceplan for Austria Tourism, Patagonia Films' repeat in-house EPs.

**How to read profiles:** green skill tags = demonstrated in credited work; yellow `?` tags = claimed / self-described only. "Verified source" = primary or credits source; "needs check" = social caption, LinkedIn or search snippet.

### Production to-do
- [ ] Full crew lists: After the Snowfall (MSP), Weazy (Arc'teryx), Cold Calls (BLANK), SNO-Ciety (WME), TGR 2026 film, PAVED filmers
- [ ] Resolve Arc'teryx "Between Days" credit conflict (Alexander Douglas Craig vs. Alexi Godbout / Ty Urlich)
- [ ] Ikon Pass / Alterra resorts beyond Steamboat + Palisades (Deer Valley, Winter Park, Stratton, Solitude); Vail Resorts' 2025-26 Epic campaign credits
- [ ] Europe: Zermatt, Verbier, Chamonix, St. Anton, Kitzbühel, Ischgl, Engadin, Val d'Isère, Tignes credits
- [ ] Brands still thin: Oakley, Atomic, Rossignol, Völkl, K2, Black Diamond, Red Bull's own spots
- [ ] Donderlab, Mission Ranch Studios, Big Sky campaign: find named crew
- [ ] FPV / drone sweep; fill "(verify)" home bases and links
- [ ] Link production athletes to their athlete-database profiles

## Current status

| Metric | Count |
|---|---|
| Total people | 459 |
| Athletes | 403 (202 ski / 201 snowboard) |
| USA / Canada athletes | 292 |
| International athletes | 101 |
| Country not yet confirmed | 10 (now shown separately, no longer counted as international) |
| 🌱 Up-and-coming (Rising badge) | 39 |
| Industry people | 36 |
| Influencers / creators | 20 |
| Crews / companies | 114 |
| ✅ Updated against 2025-26 sources | 100 |

### How the data was built

- **Version 1 (168 athletes):** compiled from general knowledge, current to about early 2025. These still need 2025-26 updates unless they show a ✅.
- **Batches 2-7 (132 athletes):** rosters and team pages (NST, Kings & Queens of Corbet's, FWT 2026, iF3 2025, TGR, MSP, Burton, Jones, Arbor).
- **2026 research pass (Nov 2026):**
  - `data/updates-2026.js`: 2025-26 results, films, corrected home bases, FWT 2027 roster status and Rising tags.
  - `data/additions-2026.js`: 63 standout athletes from 2025-26.
  - `data/rising-2026.js`: **40 up-and-coming riders** - FWT 2027 rookies and qualifiers, 2026 FIS Freeride World Champions, Slush Rookies of the Year, SBC "Skiers to Watch 2026-27".
  - `data/industry.js`: 36 filmmakers, production companies, photographers, producers and hosts.
  - `data/creators.js`: **20 influencers / content creators** - top ski and snowboard YouTube channels plus Instagram/UGC creators.

### Main sources

- Natural Selection 2026 (The Inertia, Snowboarder, Trail Times, Freeskier)
- Freeride World Tour: 2026 results, FWT 2027 roster (Nov 2026), IFSA Challenger Region 2 qualifiers (Apr 2026)
- 2026 iF3 Movie Awards (Forecast Ski); Slush 6th Annual Awards incl. Rookie of the Year (Apr 2026)
- SBC Skier "10 Skiers to Watch 2026-27"; GearJunkie Mia Jones interview (Apr 2026)
- Alltubers best ski/snowboard YouTube channels (Nov 2026); Feedspot (Jul 2026); Popfly creators (Mar 2026)
- Film credits: PAVED, The Realm, Between Days, Eternal Descent, Wayward, GNU, Arbor, Nitro, 686

### Policy on young riders

Only adult riders are tagged up-and-coming (pro-tour rookies, award winners, magazine picks). Junior championship podiums and national development squads are deliberately left out.

## To-do list

### Data
- [x] 2025-26 projects/results for major films, NST, FWT, iF3, Slush
- [x] 2025-26 standouts, industry list, rising riders, influencers
- [ ] 2025-26 updates for remaining unchecked Version 1 records ("Drafts only" filter)
- [ ] Confirm home bases still marked "Verify"
- [ ] Confirm nationality for the 10 "Country TBC" athletes (e.g. Livia Tanno, Derek Lemke) and creators
- [ ] Add hometowns for FWT 2027 rookies once rider bios publish
- [ ] More influencers: core-scene riders who are primarily social creators (Instagram/TikTok), podcasts
- [ ] More industry: team managers, agents, resort marketing, photographers
- [ ] Watch 2026-27: X Games, FWT 2027, NST 2027, fall 2027 films

### Site and repo
- [x] Updated/New/Industry/Influencer/Rising badges and filters
- [x] Unknown nationality shown as its own region
- [ ] Enable GitHub Pages (Settings > Pages > Deploy from a branch > `main` / root)
- [ ] Consider making the repo private before adding agency or contact notes

### Later
- [ ] Instagram / YouTube handles per person
- [ ] Relationship views (athlete, filmmaker, brand, resort)
- [ ] Location tracking and alerts (**on hold**)

## Open it

**As a website:** enable GitHub Pages; the site will be at `https://deanisaac06.github.io/Athlete-Database/`.

**Locally:** Code > Download ZIP, then open `index.html`.

## Files

| File | Purpose |
|---|---|
| `index.html` | Layout, styles, and the `A()` / `I()` / `C()` / `U()` helpers |
| `app.js` | Interface logic; applies updates |
| `data/ski-na.js`, `data/ski-intl.js`, `data/snowboard-na.js`, `data/snowboard-intl.js` | Base athlete records |
| `data/additions-2026.js` | New athletes added in 2026 |
| `data/rising-2026.js` | Up-and-coming riders |
| `data/industry.js` | Filmmakers, photographers, producers, companies, media |
| `data/creators.js` | Influencers and content creators |
| `data/updates-2026.js` | 2026 updates to existing records, matched by exact name |

### Production Network files

| File | Purpose |
|---|---|
| `production.html` | Production Network page (tabs: Creatives, Companies & agencies, Projects, Clients, Network) |
| `prod-core.js` | Builds indexes, auto-resumes from credits, skill tags, client categories |
| `prod-ui.js` / `prod-net.js` | Cards, resume pop-ups, CSV export / relationship graph |
| `data/prod-companies.js` | Batch 1 companies + agencies, and the `CO()` / `PE()` / `PJ()` helpers |
| `data/prod-projects.js` / `data/prod-people.js` | Batch 1 projects with credits / enriched profiles |
| `data/prod-batch2.js` | Batch 2 resorts + brands; `COX()` / `PEX()` / `PJX()` merge into existing records instead of duplicating |

```js
PJ("Title","Year","Type","Client; Client","Agency","Prod co; Prod co","Role=Name; Role=Name","Athlete; Athlete","link","source")
PJX("Existing title",{cr:"Role=Name", ath:"Athlete", prod:"Company", src:"source"})
COX("Company","Type","Base","web","ig","Specialties","People; People","Notes","source",1)
PEX("Person","Roles","Base","Affiliations","Demonstrated skills","Claimed skills","web:URL; ig:handle","Notes","source",1)
```

## Adding or editing

```js
A("Name","Ski","USA","Home area","Home mountain","Disciplines, comma","Zones; semicolon","Projects; semicolon","Crews; semicolon",tier,"Notes")
I("Name","Ski|Snowboard|Both","Country","Area","Base","Roles, comma","Works in; semicolon","Projects; semicolon","Companies; semicolon",tier,"Notes")
C("Name","Ski|Snowboard|Both","Country","Area","Base","Content types, comma","Platforms; semicolon","Channels/projects; semicolon","Brands; semicolon",tier,"Notes")
U("Exact Name", {add:"New project; Another", home:"Base", area:"Area", disc:"..., Up-and-coming", notes:"Source: ..."})
```

Add `Up-and-coming` to disciplines to give someone the Rising badge. Use exactly `"USA"` or `"Canada"` for North America, put a source in the notes, and write "Verify" for anything uncertain.

## Privacy

Only publicly shared professional information: home mountain, riding zones, projects, crews, public channels. No personal addresses or private details.
