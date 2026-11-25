// Router and page state for the NSO Almera site. Hash routes only, no network:
// every page is rendered from the data in data.js, and every control on a page
// updates that page in place.

import { META, YEARS } from './data.js';
import {
  viewOverview, viewPopulation, viewEconomy, viewLabour, viewPrices,
  viewHealth, viewEducation, viewRegions, viewData, viewAbout,
} from './views.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('.nav-link')];

// Page state that survives navigation: the year shown on the economy and
// prices pages, the regions table sort, and the data explorer's search.
const state = {
  economyYear: 2025,
  pricesYear: 2025,
  regionSort: { key: 'pop', dir: 'desc' },
  region: null,
  data: { query: '', category: 'All', sortKey: 'name', sortDir: 'asc' },
};

const ROUTES = [
  { path: '', view: viewOverview, title: 'Almera in numbers' },
  { path: 'population', view: viewPopulation, title: 'Population' },
  { path: 'economy', view: () => viewEconomy(state.economyYear), title: 'Economy' },
  { path: 'labour', view: viewLabour, title: 'Labour' },
  { path: 'prices', view: () => viewPrices(state.pricesYear), title: 'Prices' },
  { path: 'health', view: viewHealth, title: 'Health' },
  { path: 'education', view: viewEducation, title: 'Education' },
  { path: 'regions', view: () => viewRegions(regionState()), title: 'Regions' },
  { path: 'data', view: () => viewData(state.data), title: 'Data explorer' },
  { path: 'about', view: viewAbout, title: 'About' },
];

function regionState() {
  return { sortKey: state.regionSort.key, sortDir: state.regionSort.dir, region: state.region };
}

// Parse the hash: "#/economy" or "#/regions/Port%20Meridia".
function parseHash() {
  const raw = location.hash.replace(/^#\/?/, '');
  const [path, ...rest] = raw.split('/');
  return { path: path || '', arg: rest.length ? decodeURIComponent(rest.join('/')) : null };
}

function render() {
  const { path, arg } = parseHash();
  state.region = path === 'regions' ? arg : null;
  const route = ROUTES.find((r) => r.path === path) ?? ROUTES[0];
  document.title = `${route.title} · ${META.officeShort} — ${META.country}`;
  app.innerHTML = route.view();
  for (const link of navLinks) {
    const href = link.getAttribute('href');
    const linkPath = href.replace(/^#\/?/, '');
    link.classList.toggle('active', linkPath === path || (linkPath === '' && path === ''));
    if (linkPath === path) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  window.scrollTo(0, 0);
}

// One delegated listener handles every control on every page.
app.addEventListener('change', (event) => {
  const el = event.target;
  if (el.id === 'year-select') {
    const year = Number(el.value);
    if (!YEARS.includes(year)) return;
    if (el.dataset.page === 'economy') state.economyYear = year;
    if (el.dataset.page === 'prices') state.pricesYear = year;
    render();
  }
  if (el.id === 'data-category') {
    state.data.category = el.value;
    render();
  }
});

app.addEventListener('input', (event) => {
  const el = event.target;
  if (el.id === 'data-search') {
    state.data.query = el.value;
    // Re-render only the table and the count, so the search box keeps focus.
    const fresh = viewData(state.data);
    const tmp = document.createElement('div');
    tmp.innerHTML = fresh;
    const newTable = tmp.querySelector('table');
    const oldTable = app.querySelector('table');
    if (newTable && oldTable) oldTable.replaceWith(newTable);
    const newCount = tmp.querySelector('.count');
    const oldCount = app.querySelector('.count');
    if (newCount && oldCount) oldCount.replaceWith(newCount);
  }
});

app.addEventListener('click', (event) => {
  const btn = event.target.closest('.sort-btn');
  if (!btn) return;
  const key = btn.dataset.sort;
  const inData = app.querySelector('#data-search') !== null;
  if (inData) {
    const s = state.data;
    if (s.sortKey === key) s.sortDir = s.sortDir === 'asc' ? 'desc' : 'asc';
    else { s.sortKey = key; s.sortDir = 'asc'; }
  } else {
    const s = state.regionSort;
    if (s.key === key) s.dir = s.dir === 'asc' ? 'desc' : 'asc';
    else { s.key = key; s.dir = key === 'name' ? 'asc' : 'desc'; }
  }
  render();
});

window.addEventListener('hashchange', render);
render();
