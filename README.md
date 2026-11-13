# Ski & Snowboard Athlete Database

A clickable, searchable database of influential skiers and snowboarders, plus the filmmakers, photographers and industry people behind them. The focus is freeride and backcountry athletes who do film and video work, with a smaller set of competition athletes.

**Last updated:** November 12, 2026

## Current status

| Metric | Count |
|---|---|
| Total people | 399 |
| Athletes | 363 (178 ski / 185 snowboard) |
| USA / Canada athletes | 279 |
| International athletes | 84 (includes some with nationality still to confirm) |
| Industry people | 36 (filmmakers, production companies, photographers, producers, hosts) |
| Crews / companies | 78 |
| ✅ Updated against 2025-26 sources | 73 |

### How the data was built

- **Version 1 (168 athletes):** compiled from general knowledge, current to about early 2025. These records still need 2025-26 updates unless they show a ✅.
- **Batches 2-7 (132 athletes):** added in Nov 2026 from rosters and team pages (Natural Selection, Kings & Queens of Corbet's, FWT 2026, iF3 2025, TGR, MSP, Burton, Jones, Arbor).
- **2026 research pass (Nov 2026):**
  - `data/updates-2026.js` updates **73 existing records** with 2025-26 results, films and corrected home bases. Updated records show a ✅.
  - `data/additions-2026.js` adds **63 new athletes** who stood out in 2025-26. They show a **New** badge.
  - `data/industry.js` adds **36 industry people and companies**. They show an **Industry** badge.

### Main sources for the 2026 pass

- **Natural Selection 2026:** The Inertia, Snowboarder and Trail Times for snowboard (Revelstoke); Freeskier for ski (Alaska).
- **Freeride World Tour:** Freeskier's 2026 Xtreme Verbier recap and final standings.
- **2026 iF3 Movie Awards:** Forecast Ski's full list of winners and nominees.
- **Slush 6th Annual Awards (2026):** Rider of the Year and Long Video of the Year.
- **Films:** Powder's fall 2026 ski film guide and Snowboard International's best snowboard films 2025-26.
- **Film credits:** PAVED, The Realm, Between Days, Eternal Descent, Wayward, GNU, Arbor, Nitro and 686.

### Corrections made in 2026

- **Ted Borland:** now Salt Lake City, UT (was Washington). Listed as a filmmaker, including Nitro 'Spike' and Slush video director.
- **Brin Alexander:** now Canadian, based in Whistler (was USA).
- **Nils Mindnich:** now based in Annecy, France, where he works as a Salomon engineer. He is the 2026 NST champion.
- **Dustin Craven:** now listed in Revelstoke, BC.

## To-do list

### Priority 1: Data
- [x] Add 2025-26 projects for PAVED, The Realm, Between Days, NST 2025/26, FWT 2026, iF3 2026 and the Slush awards
- [x] Fix Ted Borland, Brin Alexander and Nils Mindnich
- [x] Add the 2025-26 standouts as new athletes
- [x] Start the industry people list
- [ ] Add 2025-26 updates for the remaining unchecked Version 1 records (use the "Drafts only" filter)
- [ ] Confirm home bases for records still marked "Verify" (about 120)
- [ ] Confirm nationality for new athletes listed as "Verify". The site currently counts them as international.
- [ ] Add more industry people: brand team managers, agents, resort marketing leads and more photographers
- [ ] Watch the 2026-27 season: X Games, FWT 2027, NST 2027 and the fall 2027 films

### Priority 2: Site and repo
- [x] Show updated and new badges, an industry role filter and a "Verified / Drafts / New" filter
- [x] Hide "Verify" values from the home-area filter
- [ ] Enable GitHub Pages (Settings > Pages > Deploy from a branch > `main` / root)
- [ ] Treat unknown nationality as its own region instead of international
- [ ] Consider making the repo private before adding any agency or contact notes

### Priority 3: Later
- [ ] Instagram and YouTube handles per person
- [ ] Rising-talent / watchlist tags
- [ ] Relationship views (athlete, filmmaker, brand, resort)
- [ ] Location tracking and alerts (**on hold**)

## Open it

**As a website:** enable GitHub Pages (Settings > Pages > Deploy from a branch > `main` / root). The site will then be at `https://deanisaac06.github.io/Athlete-Database/`.

**Locally:** download the repo (Code > Download ZIP) and open `index.html` in any browser.

## Files

| File | Purpose |
|---|---|
| `index.html` | Layout, styles, and the `A()` / `I()` / `U()` record helpers |
| `app.js` | Interface logic; applies updates |
| `data/ski-na.js`, `data/ski-intl.js` | Skiers (base records) |
| `data/snowboard-na.js`, `data/snowboard-intl.js` | Snowboarders (base records) |
| `data/additions-2026.js` | New athletes added in 2026 |
| `data/industry.js` | Filmmakers, photographers, producers, companies, media |
| `data/updates-2026.js` | 2026 research updates to existing records, matched by exact name |

## Adding or editing

**New athlete:**
```js
A("Name","Ski","USA","Home area","Home mountain / base","Disciplines, comma","Zones; semicolon","Projects; semicolon","Crews; semicolon",tier,"Notes")
```

**New industry person:**
```js
I("Name","Ski|Snowboard|Both","Country","Area","Base","Roles, comma","Works in; semicolon","Projects; semicolon","Companies; semicolon",tier,"Notes")
```

**Update an existing record** (newest projects go first):
```js
U("Exact Name", {add:"New project; Another", home:"Base", area:"Area", crews:"A; B", notes:"Source: ..."})
```

**Rules:**
- Use exactly `"USA"` or `"Canada"` for North American athletes.
- Put a source in the notes for every update.
- Write "Verify" in a field whenever a detail is still uncertain.

## Privacy

Only publicly shared professional information is included: home mountain, riding zones, projects and crews. There are no personal addresses or private details.
