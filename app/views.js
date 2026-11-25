// One renderer per route. Each returns the HTML for its page; main.js puts it
// in #app and wires up the controls. Figures come from data.js and always
// print their source table and reference year beside them.

import {
  META, YEARS, SERIES, SECTORS, JOBS_BY_SECTOR, AGE_BANDS, CPI_CATEGORIES,
  REGIONS, INDICATORS, RELEASES, FAQ, latest, formatNumber,
} from './data.js';
import { lineChart, barChart, pyramid } from './charts.js';

function sourceLine(source, year) {
  return `<p class="source">Source: ${source} · ${year}</p>`;
}

function kpi(label, value, change, href) {
  return `<a class="kpi" href="${href}"><span class="kpi-label">${label}</span>
<span class="kpi-value">${value}</span><span class="kpi-change">${change}</span></a>`;
}

function yearOptions(selected) {
  return YEARS.map((y) => `<option value="${y}"${y === selected ? ' selected' : ''}>${y}</option>`).join('');
}

function seriesTable(key, year) {
  const s = SERIES[key];
  const idx = YEARS.indexOf(year);
  const rows = YEARS.map((y, i) => `<tr${y === year ? ' class="hl"' : ''}><td>${y}</td><td>${s.values[i].toLocaleString('en-GB')}</td></tr>`).join('');
  return `<table class="data-table"><thead><tr><th>Year</th><th>${s.label} (${s.unit})</th></tr></thead><tbody>${rows}</tbody></table>`;
}

export function viewOverview() {
  const pop = latest('population');
  const gdp = latest('gdp');
  const unemp = latest('unemployment');
  const cpi = latest('cpi');
  const life = latest('lifeExpectancy');
  const wage = latest('medianWage');
  const releases = RELEASES.slice(0, 4)
    .map((r) => `<li><span class="rel-date">${r.date}</span><strong>${r.title}</strong><span>${r.note}</span></li>`)
    .join('');
  return `<section class="hero">
<h1>Almera in numbers</h1>
<p class="lede">The official statistics of the Republic of Almera — population, the economy,
jobs, prices, health and education — published by the National Statistics Office,
free for everyone to use.</p>
<p class="updated">Last updated ${META.updated} · Next release ${META.nextRelease}</p>
</section>
<section class="kpis" aria-label="Headline figures">
${kpi('Resident population', '8.42 million', '+0.4% on 2024', '#/population')}
${kpi('GDP', '268.4bn ALM', '+2.5% on 2024', '#/economy')}
${kpi('Unemployment', '5.4%', '−0.2 points on 2024', '#/labour')}
${kpi('Inflation', '2.7% a year', '−0.9 points on 2024', '#/prices')}
${kpi('Life expectancy', '78.4 years', '+0.1 years on 2024', '#/health')}
${kpi('Median monthly wage', '3,120 ALM', '+3.7% on 2024', '#/labour')}
</section>
<div class="grid-2">
<section class="card"><h2>Population, 2015–2025</h2>
${lineChart({ labels: YEARS.map(String), values: SERIES.population.values, decimals: 2, unit: 'million' })}
${sourceLine(SERIES.population.source, 2025)}
<p><a href="#/population">Population in detail →</a></p></section>
<section class="card"><h2>GDP, 2015–2025</h2>
${lineChart({ labels: YEARS.map(String), values: SERIES.gdp.values, color: '#12395b', decimals: 1, unit: 'bn ALM' })}
${sourceLine(SERIES.gdp.source, 2025)}
<p><a href="#/economy">The economy in detail →</a></p></section>
</div>
<div class="grid-2">
<section class="card"><h2>Latest releases</h2><ul class="releases">${releases}</ul>
<p><a href="#/about">Release calendar →</a></p></section>
<section class="card"><h2>Explore by topic</h2>
<ul class="topic-links">
<li><a href="#/population">Population — who lives here, and where</a></li>
<li><a href="#/economy">Economy — GDP, trade and government debt</a></li>
<li><a href="#/labour">Labour — jobs, wages and vacancies</a></li>
<li><a href="#/prices">Prices — inflation by spending category</a></li>
<li><a href="#/health">Health — life expectancy and care</a></li>
<li><a href="#/education">Education — schools and qualifications</a></li>
<li><a href="#/regions">Regions — all twelve provinces compared</a></li>
<li><a href="#/data">Data explorer — search every headline indicator</a></li>
</ul></section>
</div>`;
}

export function viewPopulation() {
  const rows = REGIONS.slice(0, 5)
    .map((r) => `<tr><td><a href="#/regions/${encodeURIComponent(r.name)}">${r.name}</a></td><td>${formatNumber(r.pop)}</td></tr>`)
    .join('');
  return `<h1>Population</h1>
<p class="lede">8.42 million people lived in Almera at mid-2025. The population has grown
every year since 2015, most recently by 0.4% — 33,000 more people than a year earlier.</p>
<section class="card"><h2>Resident population, 2015–2025</h2>
${lineChart({ labels: YEARS.map(String), values: SERIES.population.values, decimals: 2, unit: 'million' })}
${sourceLine(SERIES.population.source, 2025)}</section>
<div class="grid-2">
<section class="card"><h2>Age and sex, 2025</h2>
${pyramid({ bands: AGE_BANDS })}
${sourceLine('Population Estimates, Table P-03', 2025)}
<p>Median age 41.2 years. The largest five-year band is 35–39, with 666,000 people.</p></section>
<section class="card"><h2>Largest provinces, 2025</h2>
<table class="data-table"><thead><tr><th>Province</th><th>Residents</th></tr></thead><tbody>${rows}</tbody></table>
${sourceLine('Regional Statistics, Table R-01', 2025)}
<p><a href="#/regions">Compare all twelve provinces →</a></p></section>
</div>
<section class="card"><h2>Births, deaths and migration</h2>
<table class="data-table"><thead><tr><th>Measure</th><th>2025</th><th>2024</th></tr></thead><tbody>
<tr><td>Births</td><td>86,400</td><td>87,100</td></tr>
<tr><td>Deaths</td><td>71,200</td><td>70,800</td></tr>
<tr><td>Net migration</td><td>+18,300</td><td>+16,900</td></tr>
<tr><td>Natural change (births minus deaths)</td><td>+15,200</td><td>+16,300</td></tr>
</tbody></table>
${sourceLine('Vital Statistics, Tables V-01 and P-04', 2025)}</section>`;
}

export function viewEconomy(year) {
  const idx = YEARS.indexOf(year);
  const gdp = SERIES.gdp.values[idx];
  const pc = SERIES.gdpPerCapita.values[idx];
  const growth = idx === 0 ? '—' : `${(((SERIES.gdp.values[idx] / SERIES.gdp.values[idx - 1]) - 1) * 100).toFixed(1)}%`;
  return `<h1>Economy</h1>
<p class="lede">Almera's economy was worth ${gdp.toLocaleString('en-GB')} billion almers in ${year} —
${formatNumber(pc)} almers per person. Choose a year to see that year's figures.</p>
<p><label class="year-pick">Year <select id="year-select" data-page="economy">${yearOptions(year)}</select></label></p>
<div class="kpis">
${kpi('GDP', `${gdp.toLocaleString('en-GB')}bn ALM`, `${growth} on ${year - 1}`, '#/economy')}
${kpi('GDP per person', `${formatNumber(pc)} ALM`, idx === 0 ? '2015 figure' : `+${(((pc / SERIES.gdpPerCapita.values[idx - 1]) - 1) * 100).toFixed(1)}% on ${year - 1}`, '#/economy')}
${kpi('Trade balance', '+5.4bn ALM', 'Exports 84.6bn, imports 79.2bn (2025)', '#/economy')}
</div>
<div class="grid-2">
<section class="card"><h2>GDP, 2015–2025</h2>
${lineChart({ labels: YEARS.map(String), values: SERIES.gdp.values, color: '#12395b', decimals: 1, unit: 'bn ALM' })}
${sourceLine(SERIES.gdp.source, 2025)}
<p>GDP fell 5.7% in 2020, then recovered — up 7.5% in 2021 and 10.1% in 2022.</p></section>
<section class="card"><h2>What makes up GDP, 2025</h2>
${barChart({ rows: SECTORS.map((s) => ({ label: s.name, value: s.share })), unit: '%', height: 320 })}
${sourceLine('National Accounts, Table N-05', 2025)}</section>
</div>
<section class="card"><h2>GDP by year</h2>${seriesTable('gdp', year)}${sourceLine(SERIES.gdp.source, 2025)}</section>`;
}

export function viewLabour() {
  return `<h1>Labour</h1>
<p class="lede">4.15 million people were in work in 2025 and 5.4% of the labour force was
unemployed — the lowest rate since 2015. There were 96,000 job vacancies.</p>
<div class="grid-2">
<section class="card"><h2>Unemployment rate, 2015–2025</h2>
${lineChart({ labels: YEARS.map(String), values: SERIES.unemployment.values, color: '#b3541e', decimals: 1, unit: '%' })}
${sourceLine(SERIES.unemployment.source, 2025)}
<p>Unemployment jumped to 8.7% in 2020, then fell every year after.</p></section>
<section class="card"><h2>Median monthly wage, 2015–2025</h2>
${lineChart({ labels: YEARS.map(String), values: SERIES.medianWage.values, decimals: 0, unit: 'ALM' })}
${sourceLine(SERIES.medianWage.source, 2025)}
<p>The median wage reached 3,120 almers a month in 2025, up 3.7% on 2024.</p></section>
</div>
<div class="grid-2">
<section class="card"><h2>Where people work, 2025</h2>
${barChart({ rows: JOBS_BY_SECTOR.map((s) => ({ label: s.name, value: s.share })), unit: '%', height: 320 })}
${sourceLine('Labour Force Survey, Table L-07', 2025)}</section>
<section class="card"><h2>Labour market at a glance, 2025</h2>
<table class="data-table"><tbody>
<tr><th>Employment rate (15–64)</th><td>74.8%</td></tr>
<tr><th>Part-time workers</th><td>18.6% of jobs</td></tr>
<tr><th>Average working week</th><td>38.4 hours</td></tr>
<tr><th>Youth unemployment (15–24)</th><td>11.8%</td></tr>
<tr><th>Job vacancies</th><td>96,000</td></tr>
</tbody></table>
${sourceLine('Labour Force Survey, Tables L-02, L-03, L-05, L-08, L-09', 2025)}</section>
</div>`;
}

export function viewPrices(year) {
  const idx = YEARS.indexOf(year);
  const cpi = SERIES.cpi.values[idx];
  const cats = CPI_CATEGORIES
    .map((c) => `<tr><td>${c.name}</td><td>${c.weight.toFixed(1)}%</td><td>${c.change > 0 ? '+' : ''}${c.change.toFixed(1)}%</td></tr>`)
    .join('');
  return `<h1>Prices</h1>
<p class="lede">Consumer prices rose ${cpi.toFixed(1)}% in the year to ${year}. Inflation peaked
at 8.9% in 2022 and has fallen every year since.</p>
<p><label class="year-pick">Year <select id="year-select" data-page="prices">${yearOptions(year)}</select></label></p>
<div class="grid-2">
<section class="card"><h2>Inflation, 2015–2025</h2>
${lineChart({ labels: YEARS.map(String), values: SERIES.cpi.values, color: '#b3541e', decimals: 1, unit: '%' })}
${sourceLine(SERIES.cpi.source, 2025)}</section>
<section class="card"><h2>What a household pays, 2025</h2>
<table class="data-table"><tbody>
<tr><th>Average rent, two-bedroom flat</th><td>940 ALM a month</td></tr>
<tr><th>House price index</th><td>142.6 (2020 = 100)</td></tr>
<tr><th>Food price inflation</th><td>3.1% a year</td></tr>
<tr><th>Communication prices</th><td>−0.6% a year</td></tr>
</tbody></table>
${sourceLine('Consumer Prices, Tables C-04, C-06, C-07', 2025)}</section>
</div>
<section class="card"><h2>Inflation by spending category, 2025</h2>
<table class="data-table"><thead><tr><th>Category</th><th>Share of spending</th><th>Price change on 2024</th></tr></thead><tbody>${cats}</tbody></table>
${sourceLine('Consumer Prices, Table C-04', 2025)}</section>`;
}

export function viewHealth() {
  return `<h1>Health</h1>
<p class="lede">A newborn in Almera in 2025 can expect to live 78.4 years. Health spending
was 9.4% of GDP, and 71.2% of adults said their health was good.</p>
<div class="grid-2">
<section class="card"><h2>Life expectancy, 2015–2025</h2>
${lineChart({ labels: YEARS.map(String), values: SERIES.lifeExpectancy.values, decimals: 1, unit: 'years' })}
${sourceLine(SERIES.lifeExpectancy.source, 2025)}
<p>Life expectancy dipped to 77.6 years in 2020 and has risen every year since.</p></section>
<section class="card"><h2>Health in 2025</h2>
<table class="data-table"><tbody>
<tr><th>Infant mortality</th><td>3.8 per 1,000 births</td></tr>
<tr><th>Hospital beds</th><td>4.1 per 1,000 people</td></tr>
<tr><th>Doctors</th><td>3.6 per 1,000 people</td></tr>
<tr><th>Health spending</th><td>9.4% of GDP</td></tr>
<tr><th>Adults reporting good health</th><td>71.2%</td></tr>
</tbody></table>
${sourceLine('Vital Statistics and Health, Tables V-02, V-03, H-01 to H-04', 2025)}</section>
</div>`;
}

export function viewEducation() {
  const rows = [
    { name: 'Tertiary education (ages 25–34)', value: 46.3 },
    { name: 'Upper secondary completed', value: 88.1 },
    { name: 'School leavers with a qualification', value: 94.7 },
    { name: 'Young people in education or training', value: 92.4 },
  ];
  return `<h1>Education</h1>
<p class="lede">99.1% of adults in Almera can read and write. Almost half of 25- to
34-year-olds hold a tertiary qualification, and 94.7% of school leavers left
with a qualification in 2025.</p>
<div class="grid-2">
<section class="card"><h2>Attainment, 2025</h2>
${barChart({ rows, unit: '%', height: 220 })}
${sourceLine('Education Statistics, Tables D-02 and D-03', 2025)}</section>
<section class="card"><h2>Schools in 2025</h2>
<table class="data-table"><tbody>
<tr><th>Pupils per teacher, primary</th><td>16.8</td></tr>
<tr><th>Pupils per teacher, secondary</th><td>14.2</td></tr>
<tr><th>Education spending</th><td>5.1% of GDP</td></tr>
<tr><th>Adult literacy</th><td>99.1%</td></tr>
</tbody></table>
${sourceLine('Education Statistics, Tables D-01, D-04, D-05', 2025)}</section>
</div>`;
}

export function regionRows(sortKey, dir) {
  const sorted = [...REGIONS].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    const cmp = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
    return dir === 'asc' ? cmp : -cmp;
  });
  return sorted
    .map((r) => `<tr><td><a href="#/regions/${encodeURIComponent(r.name)}">${r.name}</a></td><td>${formatNumber(r.pop)}</td><td>${formatNumber(r.gdpPerCapita)}</td><td>${r.unemployment.toFixed(1)}%</td><td>${formatNumber(r.medianWage)}</td><td>${r.lifeExpectancy.toFixed(1)}</td></tr>`)
    .join('');
}

export function viewRegions(state) {
  const sel = state.region ? REGIONS.find((r) => r.name === state.region) : null;
  const detail = sel ? `<section class="card"><h2>${sel.name}</h2>
<table class="data-table"><tbody>
<tr><th>Residents</th><td>${formatNumber(sel.pop)}</td></tr>
<tr><th>GDP per person</th><td>${formatNumber(sel.gdpPerCapita)} ALM</td></tr>
<tr><th>Unemployment</th><td>${sel.unemployment.toFixed(1)}%</td></tr>
<tr><th>Median monthly wage</th><td>${formatNumber(sel.medianWage)} ALM</td></tr>
<tr><th>Life expectancy</th><td>${sel.lifeExpectancy.toFixed(1)} years</td></tr>
</tbody></table>
${sourceLine('Regional Statistics, Table R-01', 2025)}
<p><a href="#/regions">Back to all provinces</a></p></section>` : '';
  const th = (key, label) => {
    const arrow = state.sortKey === key ? (state.sortDir === 'asc' ? ' ▲' : ' ▼') : '';
    return `<th><button class="sort-btn" data-sort="${key}">${label}${arrow}</button></th>`;
  };
  return `<h1>Regions</h1>
<p class="lede">Almera has twelve provinces. Port Meridia, the capital province, is the
largest and the highest-paid; Far North has the highest unemployment at 8.6%.
Click a column heading to sort the table, or a province name for its detail.</p>
${detail}
<section class="card"><h2>All provinces, 2025</h2>
<table class="data-table sortable"><thead><tr>
${th('name', 'Province')}${th('pop', 'Residents')}${th('gdpPerCapita', 'GDP per person (ALM)')}${th('unemployment', 'Unemployment')}${th('medianWage', 'Median wage (ALM)')}${th('lifeExpectancy', 'Life expectancy')}
</tr></thead><tbody>${regionRows(state.sortKey, state.sortDir)}</tbody></table>
${sourceLine('Regional Statistics, Table R-01', 2025)}</section>`;
}

export function viewData(state) {
  const q = state.query.trim().toLowerCase();
  let rows = INDICATORS.filter((i) => {
    if (state.category !== 'All' && i.category !== state.category) return false;
    if (!q) return true;
    return (i.name + ' ' + i.value + ' ' + i.category + ' ' + i.source).toLowerCase().includes(q);
  });
  rows = [...rows].sort((a, b) => {
    const av = a[state.sortKey];
    const bv = b[state.sortKey];
    const cmp = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
    return state.sortDir === 'asc' ? cmp : -cmp;
  });
  const body = rows
    .map((i) => `<tr><td>${i.name}</td><td>${i.value}</td><td>${i.category}</td><td>${i.year}</td><td>${i.source}</td></tr>`)
    .join('');
  const cats = ['All', ...new Set(INDICATORS.map((i) => i.category))];
  const opts = cats.map((c) => `<option${c === state.category ? ' selected' : ''}>${c}</option>`).join('');
  const th = (key, label) => {
    const arrow = state.sortKey === key ? (state.sortDir === 'asc' ? ' ▲' : ' ▼') : '';
    return `<th><button class="sort-btn" data-sort="${key}">${label}${arrow}</button></th>`;
  };
  return `<h1>Data explorer</h1>
<p class="lede">Search all ${INDICATORS.length} headline indicators, filter by topic, or sort
any column. Every row names its source table and reference year.</p>
<p class="controls"><label>Search <input id="data-search" type="search" value="${state.query.replace(/"/g, '&quot;')}" placeholder="Try “wage” or “inflation”"></label>
<label>Topic <select id="data-category">${opts}</select></label>
<a class="btn" href="data/indicators.csv" download>Download all indicators (CSV)</a></p>
<p class="count">${rows.length} of ${INDICATORS.length} indicators shown</p>
<section class="card"><table class="data-table sortable"><thead><tr>
${th('name', 'Indicator')}${th('value', 'Value')}${th('category', 'Topic')}${th('year', 'Year')}${th('source', 'Source')}
</tr></thead><tbody>${body || '<tr><td colspan="5">No indicators match that search.</td></tr>'}</tbody></table></section>`;
}

export function viewAbout() {
  const releases = RELEASES
    .map((r) => `<li><span class="rel-date">${r.date}</span><strong>${r.title}</strong><span>${r.note}</span></li>`)
    .join('');
  const faqs = FAQ
    .map((f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`)
    .join('');
  return `<h1>About this site</h1>
<p class="lede">NSO Almera is the Republic of Almera's national statistics office. It runs
the country's surveys and censuses, and publishes the results free for everyone —
for citizens checking a figure, for businesses planning ahead, and for researchers
studying how the country is changing.</p>
<section class="card"><h2>How the figures are made</h2>
<p>Headline figures come from four regular collections: the Population Estimates,
the National Accounts, the Labour Force Survey (12,000 households every quarter)
and the Consumer Prices collection (48,000 prices every month). Each figure names
its source table and reference year on the page where it appears, and the Data
explorer lists every indicator with its table. Figures are revised when better
data arrives; revisions are marked on the release page.</p>
<p>The figures on this site describe the fictional Republic of Almera. They are
internally consistent estimates published for illustration, not the statistics
of any real country.</p></section>
<section class="card"><h2>Release calendar</h2><ul class="releases">${releases}</ul></section>
<section class="card"><h2>Questions people ask</h2>${faqs}</section>
<section class="card"><h2>Contact</h2>
<p>National Statistics Office of Almera · 1 Census Square, Port Meridia ·
Enquiries: enquiries@nso-almera.example · Figures are free to reuse with
a credit to NSO Almera.</p></section>`;
}
