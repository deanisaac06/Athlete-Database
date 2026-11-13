# Ski & Snowboard Athlete Database

A clickable, searchable database of influential skiers and snowboarders. It focuses on freeride and backcountry athletes who do film and video work, with a smaller set of competition athletes.

**Last updated:** November 2026

## Current status (Nov 2026)

| Metric | Count | Target |
|---|---|---|
| Total athletes | 300 | ~300 |
| Skiers | 150 | 150 |
| Snowboarders | 150 | 150 |
| USA / Canada | 250 | ~250 |
| International | 50 | ~50 |
| Crews / production companies | 45 | - |

### How the data was built

- **Version 1 (168 athletes):** compiled from general knowledge of film credits, competition results and media coverage, current to about **early 2025**. These records do **not** yet include 2025-26 projects.
- **Batches 2-7 (132 athletes, Nov 2026):** added from online research of current rosters and team pages: Natural Selection 2025 (ski and snowboard), Kings & Queens of Corbet's 2027, Freeride World Tour 2026, iF3 2025, TGR *Pressure Drop*, MSP *After the Snowfall*, Burton / Red Bull *PAVED*, Whitelines best-of 2024/25, and the Jones, Burton and Arbor team pages. These athletes were checked for **who belongs**, but most have **not** been individually researched for home base and latest projects.
- About 30 athletes in batches 5-7 were added from general knowledge to fill gaps and are marked "Verify".

### Known data gaps

- **Outdated projects:** the 168 Version 1 records stop at roughly the 2024 season.
- **Placeholder profiles:** many batch 2-7 records have generic entries such as "Backcountry film segments" and home bases marked "(verify)". Ted Borland is an example.
- **Unverified records:** no records carry the `verified` badge yet.
- **Home-area filter:** "Verify" values show up as options in the home-area dropdown.

## To-do list

### Priority 1: Bring the data up to date for 2026
- [ ] Add 2025-26 projects to existing athletes, including:
  - [ ] *PAVED* (Burton / Red Bull, 2025): Gasser, Ferguson, Crouch, Davis, McMorris, Bang, Rúnarsdóttir, Powell, Sadowski-Synnott, Otsuka
  - [ ] *Pressure Drop* (TGR): TGR cast
  - [ ] *After the Snowfall* (MSP): Abma, Zeliff, Porteous, Bilous, Craig Murray
  - [ ] Natural Selection Ski 2025: Parker, Voisin, Kai Jones, Kye Petersen, Colby Stevenson, Parker White
  - [ ] *Mountains of the Moon*: Benchetler, Parker, Kuch
  - [ ] *Edge of Reason*: Townsend, Saugstad
  - [ ] 2026 Freeride World Tour and Natural Selection results
- [ ] Research each "Verify" record (home base, usual zones, crew, recent projects), starting with tier 1 and tier 2 athletes
- [ ] Replace placeholder entries such as "Backcountry film segments" with real project names
- [ ] Add `verified` to notes once a record has been checked against sources

### Priority 2: Site and repo
- [ ] Enable GitHub Pages (Settings > Pages > Deploy from a branch > `main` / root)
- [ ] Update the banner text in `index.html` to show 300 athletes and the Nov 2026 status
- [ ] Hide "Verify" values from the home-area filter in `app.js`
- [ ] Add a "Last updated" or source field per athlete
- [ ] Consider making the repo private before adding any agency or contact notes

### Priority 3: Later / nice to have
- [ ] Add Instagram and YouTube handles per athlete
- [ ] Add rising-talent and watchlist tags
- [ ] Add relationship views (athlete, filmmaker, brand, resort)
- [ ] Location tracking and alerts are **on hold** for now

## Open it

**As a website:** enable GitHub Pages (Settings > Pages > Deploy from a branch > `main` / root). The site will then be at `https://deanisaac06.github.io/Athlete-Database/`.

**Locally:** download the repo (Code > Download ZIP) and open `index.html` in any browser. No build step or server is needed.

## Features

- **Search:** search across names, mountains, films and crews.
- **Filters:** filter by sport, region (USA/Canada or international), home area, discipline, crew or company, and tier.
- **Views:** switch between Cards, By home area, By crew, and a sortable Table view.
- **Profiles:** click any athlete to open a profile panel. It shows home mountain, usual riding zones, projects, crews, notes and one-click research links (Google, Instagram, YouTube, News). Chips in the profile work as filters when clicked.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page layout and styles |
| `app.js` | Interface logic |
| `data/ski-na.js` | Skiers: USA and Canada |
| `data/ski-intl.js` | Skiers: international |
| `data/snowboard-na.js` | Snowboarders: USA and Canada |
| `data/snowboard-intl.js` | Snowboarders: international |

## Adding or editing athletes

Each athlete is one line in a data file:

```js
A("Name", "Ski", "USA", "Home area (state/province/region)", "Home mountain / base",
"Disciplines, comma, separated", "Usual zones; semicolon; separated",
"Projects / films; semicolon separated", "Crews / companies; semicolon separated",
tier, "Notes")
```

**Rules:**
- **Tier:** `1` = marquee name, `2` = established pro, `3` = competition-focused or rising.
- **Country:** use exactly `"USA"` or `"Canada"` for North American athletes. Put any uncertainty in the notes, not in the country field. Otherwise the athlete is counted as international.
- **Notes:** put `Verify` in the notes for uncertain data. Add `verified` once the record has been checked; the profile will then show a verified badge.

## Privacy

Only publicly shared professional information is included: home mountain, riding zones, projects and crews. There are no personal addresses or private details.
