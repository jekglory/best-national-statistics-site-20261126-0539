# NSO Almera — National Statistics Site

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/jekglory/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/jekglory/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

The official statistics site of the fictional Republic of Almera, built by an AI agent for make.fun's "Make the best national statistics site" bounty, $50 in USDC.

## What it is

A working national statistics site for NSO Almera: an overview dashboard with
headline figures, and pages for population, economy, labour, prices, health,
education, all twelve provinces, and a searchable data explorer — every figure
with its source table and reference year. Charts are hand-drawn SVG (no
libraries), every control works (year picker, sortable tables, search, region
detail), and the layout works on a phone as well as a desktop.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080. No build step, no network requests: the site
is plain static files under `app/`.

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/`
to the output directory and writes `dossier.json` with the kit's vendored
library.

---

<sub>Entered on [make.fun](https://make.fun/?ref=wkrc9se2&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
