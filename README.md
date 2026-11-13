# Ski & Snowboard Athlete Database

A clickable, searchable database of influential skiers and snowboarders, focused on freeride / backcountry athletes with film and video work, plus a smaller set of competition athletes. Target: ~300 athletes, 50/50 ski/snowboard, ~50 international.

## Open it

**As a website:** enable GitHub Pages (Settings > Pages > Deploy from a branch > `main` / root). The site will then be at `https://deanisaac06.github.io/Athlete-Database/`.

**Locally:** download the repo (Code > Download ZIP) and open `index.html` in any browser. No build step or server needed.

## Features

Search across names, mountains, films and crews; filter by sport, region (USA/Canada vs international), home area, discipline, crew/company and tier; switch between Cards, By home area, By crew and a sortable Table view. Click any athlete for a profile panel with home mountain, usual riding zones, projects, crews, notes and one-click research links (Google, Instagram, YouTube, News). Chips in the profile are clickable filters.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page layout and styles |
| `app.js` | Interface logic |
| `data/ski-na.js` | Skiers - USA and Canada |
| `data/ski-intl.js` | Skiers - international |
| `data/snowboard-na.js` | Snowboarders - USA and Canada |
| `data/snowboard-intl.js` | Snowboarders - international |

## Adding or editing athletes

Each athlete is one line in a data file:

```js
A("Name", "Ski", "USA", "Home area (state/province/region)", "Home mountain / base",
  "Disciplines, comma, separated", "Usual zones; semicolon; separated",
  "Projects / films; semicolon separated", "Crews / companies; semicolon separated",
  tier, "Notes")
```

Tier: `1` = marquee name, `2` = established pro, `3` = competition-focused or rising. Add the word `verified` to the notes once a record has been checked and the profile will show a verified badge.

## Data status

Version 1 (~165 athletes) was compiled from general public knowledge (film credits, competition results, media coverage) current to roughly early 2025 and has **not yet been individually verified**. Home bases, crews and recent projects change often, and 2025-26 projects are not yet included. Records marked "Verify" in notes are the least certain. Only publicly shared professional information is included (home mountain / riding zones, projects, crews) - no personal addresses or private details.
