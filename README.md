# Mountain Industry Database

A clickable, searchable database of the people who make the mountain industry run: athletes and creators, the crews who film them, and the marketing teams at resorts, passes and destinations who hire them. (Formerly the "Ski & Snowboard Athlete Database".)

| Page | What it covers |
|---|---|
| `index.html` - **Athletes & creators** | Skiers, snowboarders, rising riders, influencers, filmmakers and industry people. Freeride / backcountry focus. |
| `production.html` - **Production network** | Production companies, agencies, creatives, projects and clients. |
| `marketing.html` - **Resort marketing** | Key people on resort, pass and destination marketing teams. |

## Resort Marketing (marketing.html)

Key individuals on mountain marketing teams: CMOs and VPs, marketing directors, brand, communications/PR, social, content, creative production, partnerships and sales. Grouped by parent company (Vail Resorts, Alterra, Aspen One, Boyne, POWDR, independents...), filterable by function, state, level, source quality and batch, with CSV export and a deep link (`marketing.html#p=Name`).

| Metric (Nov 13, 2026) | Count |
|---|---|
| People | 174 |
| With a verified source | 74 |
| Exec / VP level | 38 |

**Source rules:** "Verified source" = resort press release or media page, SAM Magazine (Snow People, Summit Series), Telly Awards credits, Ski Utah, a tourism board staff page. "Needs check" = LinkedIn / theorg.com title found through search, or a source older than 2025. Public professional info only: no personal emails or phone numbers.

**Batch 1 (`data/mountain-marketing.js`, 82):** Vail Resorts / Epic corporate + regional comms, Alterra / Ikon (incl. My Ikon: My Joy credits), Palisades, Mammoth, Steamboat, Winter Park, Aspen One, Boyne (Big Sky, Sunday River, Sugarloaf, Brighton, Michigan), POWDR (Snowbird, Copper, Mt. Bachelor, Eldora), Jackson Hole, plus independents found in SAM.

**Batch 2 (`data/marketing-batch2.js`, 47 + 3 updates):** PNW + West independents: Crystal Mountain WA (Linnea Hansen now President/COO), Stevens Pass, Timberline, Mt. Hood Meadows, Sun Valley, Brundage, Whitefish, Alta, Snowbird comms, Deer Valley (new VP Marketing Kevin Kirksey), Sundance, Powder Mountain, A-Basin, Crested Butte, Telluride + Visit Telluride, Sierra-at-Tahoe; Indy Pass CMO; plus East marketing people found in SAM (Killington, Saddleback, Gunstock, Crystal MI). Updates: Ned Wonson is now JHMR VP Marketing; John Kanaly confirmed at Park City Mountain; Big Sky's VP Marketing & Sales seat was posted as open in 2026.

**Batch 3 (`data/marketing-batch3.js`, 23 + 2 updates):** Mission Ridge, Mt. Spokane, Stevens Pass (new comms manager), Schweitzer (influencer-visit contact), Bogus Basin, Tamarack, Grand Targhee, Sugar Bowl, Mt. Rose, Vail's Tahoe comms (Heavenly, Northstar, Kirkwood), Ski California + its PR agency, Loveland, Purgatory, Taos, Arizona Snowbowl.

**Batch 3b (`data/marketing-batch3b.js`, 22 + 3 updates):** LinkedIn pass on resorts with no public contacts: Crystal Mountain WA (new Director of Marketing Ryan Williams), White Pass, Mt. Bachelor, Mt. Hood Meadows, Silver, Sun Valley, Bridger Bowl, Red Lodge, Big Sky team, Alyeska, Big Bear, Wolf Creek, Taos, Crystal MI. All marked Needs check.

### Sourcing playbook (where to find people beyond press pages)

| Method | How | Yield so far | Trust |
|---|---|---|---|
| LinkedIn people search with filters | `linkedin.com/search/results/people/?company=<Resort>&title=marketing` (also try `title=social`, `communications`, `content`, `brand`, `creative`). Keep only people whose current headline names the resort - the Company filter also matches past jobs. Keep it to ~20 searches per sitting so the account isn't flagged. | Best: 22 people in one pass | Needs check |
| Press-room / media pages | Most resorts list a named media contact on `/media`, `/press`, `/pressroom`, `/media-center` | High for mid-size resorts | Verified |
| Press release footers | Vail Resorts releases (`news.vailresorts.com`) and resort PDFs end with a named media contact per resort | High for Vail | Verified |
| SAM Magazine | Monthly "Snow People" promotions + Summit Series mentor/mentee classes | Steady | Verified |
| Local news quotes | Opening/closing-day stories quote the marketing director or spokesperson by name | Good for small areas | Verified |
| Podcasts | Selling Snow (Andrew Zwicker), Ski Utah's Last Chair, SAM's PodSAM, Storm Skiing Journal - guest titles are on episode pages | Mostly GMs/CEOs | Verified |
| Award credits | Telly / Webby / NSAA award entries list resort marketing teams by name | High per campaign | Verified |
| Conference coverage | NSAA National / Eastern / Western, PNSAA, Ski California, Colorado Ski Country recaps on saminfo.com | Mostly execs | Verified |
| Instagram / TikTok | Resort posts that tag their own photographers, social managers or content team; team members often say "Social @resort" in bio. Pair the handle with a LinkedIn search before adding. | Good for content/social roles | Needs check |
| Job postings | Postings name who the role reports to; a fresh posting also flags that someone left | Signals turnover | Context only |

**Rules:** public, professional info only - names, titles, employers, public handles. No personal emails, phone numbers or home addresses even when a profile shows them.

### Research plan (batches)

Each batch = one region or company group, ~40-80 people, committed as its own `data/marketing-batchN.js` file.

| Batch | Scope | Status |
|---|---|---|
| 1 | Big operators: Vail, Alterra, Aspen, Boyne, POWDR, JHMR | Done |
| 2 | PNW + West independents | Done (first pass) |
| 3 | PNW + West gap-fill (Done, first pass; still thin: Mt. Baker, White Pass, 49 Degrees North, Silver, Mt. Hood Meadows, Mt. Bachelor, Bridger, Red Lodge, Monarch, Wolf Creek, Bear Valley, Big Bear, Alyeska, Sun Valley - none publish a named contact): Mt. Baker, White Pass, Mission Ridge, 49 Degrees North, Schweitzer, Silver, Mt. Hood Meadows team, Mt. Bachelor team, Bogus Basin, Tamarack, Sun Valley team, Grand Targhee, Bridger, Red Lodge, Taos, Purgatory / Mountain Capital Partners, Arizona Snowbowl, Wolf Creek, Loveland, Monarch, Sugar Bowl, Kirkwood, Mt. Rose, Bear Valley, Big Bear, Alyeska | Done |
| 4 (next) | Canada: Whistler (Vail), Revelstoke, SkiBig3 (Banff Sunshine, Lake Louise, Norquay), Resorts of the Canadian Rockies, Sun Peaks, Big White, Red, Fernie, Kicking Horse, Tremblant, Destination BC / Tourism Whistler | |
| 5 | East + Midwest: Killington/Pico, Stowe, Sugarbush, Jay Peak, Okemo, Mount Snow, Sunday River team, Loon, Bretton Woods, Gore/Whiteface (ORDA), Holiday Valley, Snowshoe, Boyne Michigan, Lutsen, Wisconsin/Minnesota hills | |
| 6 | Vail + Alterra resort-level teams (every resort's local marketing / social / comms) | |
| 7 | Europe + Southern Hemisphere: Zermatt, Verbier, St. Anton, Ischgl, Kitzbühel, Chamonix, Val d'Isère, Dolomiti Superski, LAAX, Niseko, NZ (NZSki, Cardrona), Australia | |
| 8 | Passes, associations, agencies and media: Ikon/Epic/Indy/Mountain Collective, NSAA, Ski Utah, Colorado Ski Country, PNSAA, SIA; resort agencies (Slopefillers, Struck, Origin, SNOW Partners, Backbone); SAM, Powder/Ski/Freeskier editors | |
| Ongoing | Social sweep: pull names from resort Instagram/TikTok credits, Telly / Webby / NSAA award credits, SAM "Best and Worst in Marketing", SAM Snow People each month; link people to Production Network projects | |

**How each person is researched:** (1) resort media / press / team pages, (2) SAM Snow People + Summit Series, (3) award credits (Telly, Webby, NSAA), (4) news quotes (spokespeople), (5) LinkedIn / org-chart titles via search for the rest, marked Needs check. Social accounts are used to confirm roles and campaign credits, not to collect personal info.

**Last updated:** November 13, 2026

## Athletes & creators (index.html)

## Production Network (production.html)

A second page, `production.html`, maps **who makes the ski industry's content**: production companies, agencies, directors, DPs, editors, photographers, drone/FPV pilots, plus the resorts and brands they work for. Every person named in a project credit automatically gets a resume page (credits, clients, collaborators, athletes, skills).

| Metric (Nov 13, 2026, after batch 6 + TGR split) | Count |
|---|---|
| Creatives with resumes | 513 (386 auto-built from credits) |
| Companies + agencies | 108 (26 agencies; 28 with 2+ documented projects) |
| Projects | 148 (611 credits logged) |
| Clients (resorts, passes, destinations, brands, publications) | 96 |

**Batch 1:** TGR, MSP, Sherpas, Legs of Steel, BLANK, Level 1, Brain Farm; Ikon Pass, Jackson Hole, Sun Valley, A-Basin, Mammoth, Vail; Arc'teryx, TNF, Patagonia; FREESKIER / POWDER photographers.

**Batch 2 (`data/prod-batch2.js`):**
- Resorts and destinations: Vail Resorts / Epic Pass (Fortnight "Epic for Everyone" 2019, Postcorp, Genesis 2008), Steamboat ("The Steamboat Way", full Hungryman crew), Arapahoe Basin ("Leave No Days Behind" 2024), Palisades Tahoe (four Toyota x Palisades films by H/L, Wolfhouse, Rabit Haus, Stept), Telluride + Mountain Village ("Beyond It All", Karsh Hagan), Aspen Snowmass ("The Aspen Way", Factory Labs "Before"), Whistler Blackcomb ("Magnetic"), Tourism Whistler, Big Sky, Grand Targhee, Ski Big 3, Mike Wiegele, Destination BC (Donderlab, MMGY Origin), LAAX ("Last Day Pass"), Austria Tourism ("NoSki Instructor"), Dolomiti Superski (directors added), and Zermatt / Taos leads.
- Brands: Burton (PAVED, BLOOOM), Salomon (The Edge of Reason, Cody Townsend 2026 film, Vantage), Patagonia (Papsura full credits, DIG, Simple as a Turn), The North Face (Defy Easy, Everest: The Other Side), Red Bull (PAVED co-production, We Can't Not creators), HEAD (Out Of The Ordinary), 686.

**Batch 3 (`data/prod-batch3.js`):**
- Resorts and destinations: Winter Park ("You're In", 2022: BravoEcho, Natives Outdoors, 11 Dollar Bill, full credits), Jackson Hole Mountain Resort (Jon Riley / Out In Space Studios 2021-2024, Après Visuals "A Grand Journey", KGB Productions "Rad Moms"), Visit Jackson Hole, Crested Butte, Austria Tourism ("Chat SkiPT" and "Austria's Youngest Ski Instructor"), Verbier (MGG "Dancing on the Edge", full crew), Visit Bend, plus Jungle Productions (Innsbruck service/location company).
- Big films: After the Snowfall (full cast, sponsors and locations), Warren Miller SNO-CIETY (cast and director Josh Haskins), All Time, Days Off (2026), and 8 more TGR features 2017-2022 via Jon Riley's GSS/aerial credits.
- Athlete films with full crews: Sammy Carlson "Harmony" (2026, Valdez: DP, 2 FPV pilots, drone, edit), Bobby Brown "White Gold" (2024: 5 filmers and an editor), The Bunch "Sensus" (FPV).
- Brands: Atomic (White Gold, Mountains of the Moon), Oakley (Harmony), Superdry, Thule, Merrell, 10 Barrel (Delve Media, Bend), Peak Performance (Alexander Rydén), Rossignol (Almo Film lead), Stio (Openface lead).
- Established relationships now visible: Cactus + Lumenati for A-Basin; H/L + Wolfhouse for Palisades; Fortnight for Vail / Steamboat / Sun Valley; Donderlab for Tourism Whistler and Big Sky; Wien Nord Serviceplan + Soviso for Austria Tourism (3 winter pieces in 2024); 11 Dollar Bill as post house for Winter Park and Sun Valley (same post producer); Jon Riley / Out In Space for Jackson Hole (4 JHMR pieces + 1 Visit Jackson Hole) and TGR (9 films); Delve Media with Matthias Giraud (2 films); FPV pilot Nathan McBride (Road to Palisades and Harmony).

**Batch 4 - data/prod-batch4.js:**
- Resorts and destinations: Steamboat x2 - When a Cowboy Rides a Mountain 2025 + Pull Up A Chair, both Fortnight Collective + Futuristic Films with full crews; Keystone 26/27 - dir. Marshall Burnette, Lumenati; Zermatt x2 - DP Jonas Steinbacher on both; Switzerland Tourism x Sidetracked Studios 2023; Diedamskopf Avalanche Alert Ads 2026 - DMB.; Chamonix - Yucca Films.
- Brands and films: Legs of Steel company profile - TNF, Red Bull, Apple Immersive, Dalbello, Volkl; The North Face Descendance 2023 - Sports Emmy, full crew; Red Bull The Ultimate Run; Adidas Terrex Kirsty Muir 2025; Helly Hansen 2025 brand film - Grey London + Field Productions, full crew; Picture North / Henrik Rostrup lead.
- New repeat relationships: Fortnight + Futuristic Films for Steamboat, same core crew on both; Fortnight producer Rachel Arther on Sun Valley + Steamboat; Lumenati now on 3 Colorado resorts - A-Basin, Discover Vail, Keystone, and Keystone's ECD handle matches Lumenati's Alex Dean Rodriguez; Michael Haunschmidt's Austrian crew repeats across Descendance and Kirsty Muir - Mathias Kogel, colorist Manuel Portschy, sound Matthias Muller / Martin Rohrmoser, art Fabian Fuchs.
- Still to check: Zermatt and Keystone credits come from Instagram captions - needs check; several Legs of Steel and Yucca projects have no year or crew yet; Sun Valley 2026, We Can't Not and LAAX Last Day Pass were already in the data, so they were skipped.

**Batch 5 - data/prod-batch5.js:**
- Legs of Steel full crews: We Can't Not (2026, dir. Adam Gendle, DP Johno Verity, editor Aina Punsola, FPV Luke Bredar, colour Ivan Filipovic; merged into the existing record) and Same Difference (Haunschmidt + Kogel, 8 cinematographers, Felix Neureuther / Alaska / big-air cast); dasblau collective added.
- Yucca Films (Chamonix) crews: Kia x Chamonix full credits (Pierre Cadot, Mathieu Deline, Thomas Guerrin); Patagonia The High Life 2023 and Le Moulin des Artistes; Entre les Lignes. Same trio also made Patagonia's Simple as a Turn, so Yucca is now an established Patagonia partner.
- Brands: Rossignol Every Mountain, Every Face 2023 (El Flamingo, full crew). Milano Cortina 2026 Olympic spots: BBC trail/titles (BBC Creative + NOMINT), Hershey's The Real Gold (Martin Agency + Tool), Toyota Affirmations (Sweatpants Media). French Alps: Ouigo Snow Cam Takeover 2022 (Rosa Paris).
- Still thin: K2 and Black Diamond (only Instagram-level credits found), French resort campaigns (Val Thorens, Tignes, Courchevel publish no credits), Dolomiti Superski was already in.

**Batch 6 - data/prod-batch6.js (Instagram credits pass):** went back through existing films and pulled the crew credit blocks people post on Instagram. Between Days now has its full 23-person crew (Alexander Douglas Craig, DPs Christopher Clark + Leo Hoorn, Whistler Creek Productions, Company 3 colour, 3 iF3 awards), which also fixes the old Godbout/Urlich mix-up. Also: Cold Calls (BLANK: Alexi Godbout, 4 principal cinematographers, Ridgeline Sound, Jeff Thomas colour), Tim (Arc'teryx / Boldly: Jordan Findlay + 17 crew), Weazy (Jules Bellot), Life Form (Videograss: Justin Meyer, Colt Morgan), Fortune Hunters + Wasteland photographers, SNO-CIETY and Mountains of the Moon casts and sponsors, plus new MSP The Way Out (2026) and Arc'teryx NZ short The Last Light Falls Gently.

**How to read profiles:** green skill tags = demonstrated in credited work; yellow `?` tags = claimed / self-described only. "Verified source" = primary or credits source, including a full credit block read directly on an Instagram post (post link kept in the source). "Needs check" = Google snippet of a social post, LinkedIn or another secondary source. People that Instagram names only by handle are listed as "@handle" until their real name is confirmed.

**Minors:** child talent in campaigns (e.g. Austria's Youngest Ski Instructor) and family members listed in film casts are deliberately not added.

### Production to-do
- [x] After the Snowfall and SNO-CIETY casts; Winter Park; Austria Tourism; Verbier; FPV start (Harmony, Sensus)
- [ ] Crew lists still missing: After the Snowfall + The Way Out (MSP doesn't publish crews, even on Instagram), Mountains of the Moon, TGR 2026 film, PAVED filmers, Days Off athletes. Done via Instagram: Weazy, Cold Calls, Tim, Life Form
- [x] Resolve Arc'teryx "Between Days" credit conflict: Instagram credit blocks confirm Alexander Douglas Craig (dir.), DPs Christopher Clark + Leo Hoorn, Whistler Creek Productions; the Godbout / Urlich credit was a snippet mix-up and was removed
- [x] Split "TGR: Legend Has It / Edge of the Earth" into two records: Teton Gravity Research: Legend Has It (2023 ski film; DP Jeff Wright, editor Joseph Searle) and Edge of the Earth (2022 HBO docuseries; dirs. Todd + Steve Jones, DPs Michael Ozier / Jeff Wright / Ben Danin, editors Justin Fann + Rose Corr)
- [ ] Deer Valley, Stratton, Solitude: no published campaign credits found yet (Nolan Matthews is a self-reported Deer Valley lead); Vail Resorts' 2025-26 Epic campaign credits
- [ ] Europe still thin: Zermatt, Chamonix, St. Anton, Kitzbühel, Ischgl, Engadin, Val d'Isère, Tignes, Switzerland Tourism winter spots
- [ ] Brands still thin: Rossignol (confirm Almo Film director), Völkl, K2, Black Diamond, Oakley's own campaigns
- [ ] Donderlab, Mission Ranch Studios, KGB Productions, Après Visuals: find named crew
- [ ] More FPV pilots (Sensus pilots; Patrick Conroy, Luke Bredar profiles); fill "(verify)" home bases and links
- [x] Link production athletes to their athlete-database profiles: athlete/talent tags on production.html now link (↗) to index.html#p=Name when the name exists in the athlete database (prod-athletes.js); names not in the database stay plain tags

## Current status

| Metric | Count |
|---|---|
| Total people | 459 |
| Athletes | 403 (202 ski / 201 snowboard) |
| USA / Canada athletes | 297 |
| International athletes | 106 |
| Country not yet confirmed | 0 athletes; 0 industry - Thomas Doyle set to Canada (where he works) Nov 13 2026. Country fixes in U9-U13: Paid Programming, Katie Burrell, Kennedi Deck, Tosh Krauskopf -> Canada; Mason Lemery (verify), Grace Henderson, Johnny Lazz, Pat Fava -> USA; Will Jackways -> New Zealand |
| 🌱 Up-and-coming (Rising badge) | 39 |
| Industry people | 36 |
| Influencers / creators | 20 |
| Crews / companies | 118 |
| ✅ Updated against 2025-26 sources | 225 |

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
- [ ] Confirm home bases still marked "Verify": industry entries all done Nov 13 2026 (U7 + U9; still no public base for Colton Feldman, Videograss, Circe Wallace; Grete Eliassen sources conflict). Athletes: U8 + U10-U15 filled ~105 records (site now shows 225 Updated). Still Verify, roughly 60 lower-profile records, e.g. Agostina Vietti, Ahmet Dadali, Alex Hackel, Alex Yoder, Austin Smith, Benny Milam, Brian Rice, Chris Christenson, Cody Bramwell, Cole Richardson, Darrell Mathes, Desiree Melancon, Fynn Powell, Gabe Taylor, Hazel Birnbaum, Henry Townshend, Jadyn Chomlack, Jake Doan, Jonathan Penfield, Judd Henkes, Kealan Venning, Kristi Leskinen, Lane Knaack, Lucas Wachs, Max Warbington, Michael Shaffer, Michaela Davis-Meehan, Quinn Wolferman, Severin van der Meer, Simon Hillis, Tanner Rainville, Tiemo Rolshoven, Toby Miller, Tommy Czeschin, Tucker Andrews, Zuzanna Witych, plus influencer bases
- [x] Confirm nationality for the 10 "Country TBC" athletes: done Nov 13 2026 (U4 in updates-2026.js; FIS bios + team pages)
- [x] Confirm country for creators / industry: done Nov 13 2026 (U5 + U6 in updates-2026.js) for all but Thomas Doyle (Big Natty Production; no public source yet). For channels/companies, country = where they operate (TDK Skiracing = Finland, Alpine Tutorials with George = France; nationality not confirmed)
- [ ] Add hometowns for FWT 2027 rookies once rider bios publish
- [ ] More influencers: core-scene riders who are primarily social creators (Instagram/TikTok), podcasts
- [ ] More industry: team managers, agents, photographers (resort marketing now has its own page: marketing.html)
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

**As a website:** enable GitHub Pages; the site will be at `https://deanisaac06.github.io/Mountain-Industry-Database/`.

**Locally:** Code > Download ZIP, then open `index.html`.

## Files

| File | Purpose |
|---|---|
| `index.html` | Athletes & creators page: layout, styles, and the `A()` / `I()` / `C()` / `U()` helpers |
| `marketing.html` + `marketing.js` | Resort marketing page; `M()` adds a person, `MU()` updates one |
| `data/mountain-marketing.js`, `data/marketing-batch2.js`, `data/marketing-batch3.js`, `data/marketing-batch3b.js` | Resort marketing batches 1-3b |
| `app.js` | Interface logic; applies updates; `index.html#p=Name` opens that profile |
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
| `prod-athletes.js` | Loads the athlete-database names so athlete/talent tags link to their profile (`index.html#p=Name`) |
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
