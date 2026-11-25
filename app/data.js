// All figures on this site are the National Statistics Office of Almera's own
// published estimates for the fictional Republic of Almera. Every indicator
// carries its reference year and its source table so a visitor can check it.

export const META = {
  country: 'Republic of Almera',
  shortName: 'Almera',
  office: 'National Statistics Office of Almera',
  officeShort: 'NSO Almera',
  capital: 'Port Meridia',
  currency: 'almer',
  currencyCode: 'ALM',
  updated: '14 November 2026',
  nextRelease: '12 December 2026',
};

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

// Annual series. Each series lists one value per year in YEARS, plus the
// source table and the unit a chart or table should print beside it.
export const SERIES = {
  population: {
    label: 'Resident population',
    unit: 'million people',
    source: 'Population Estimates, Table P-01',
    values: [7.82, 7.91, 8.0, 8.09, 8.18, 8.21, 8.26, 8.31, 8.36, 8.39, 8.42],
  },
  gdp: {
    label: 'Gross domestic product',
    unit: 'billion almers',
    source: 'National Accounts, Table N-02',
    values: [182.4, 191.7, 201.3, 212.8, 221.5, 208.9, 224.6, 247.3, 256.1, 261.8, 268.4],
  },
  gdpPerCapita: {
    label: 'GDP per person',
    unit: 'almers',
    source: 'National Accounts, Table N-02',
    values: [23325, 24235, 25163, 26304, 27079, 25444, 27191, 29759, 30634, 31203, 31876],
  },
  unemployment: {
    label: 'Unemployment rate',
    unit: '% of labour force',
    source: 'Labour Force Survey, Table L-04',
    values: [9.8, 9.1, 8.4, 7.6, 6.9, 8.7, 7.8, 6.6, 5.9, 5.6, 5.4],
  },
  employment: {
    label: 'People in work',
    unit: 'million people',
    source: 'Labour Force Survey, Table L-01',
    values: [3.41, 3.5, 3.6, 3.71, 3.82, 3.74, 3.86, 3.98, 4.06, 4.11, 4.15],
  },
  cpi: {
    label: 'Consumer price inflation',
    unit: '% per year',
    source: 'Consumer Prices, Table C-01',
    values: [1.8, 2.1, 2.4, 2.9, 2.2, 1.1, 3.4, 8.9, 5.2, 3.6, 2.7],
  },
  lifeExpectancy: {
    label: 'Life expectancy at birth',
    unit: 'years',
    source: 'Vital Statistics, Table V-03',
    values: [76.9, 77.2, 77.5, 77.8, 78.1, 77.6, 77.9, 78.0, 78.2, 78.3, 78.4],
  },
  medianWage: {
    label: 'Median monthly wage',
    unit: 'almers',
    source: 'Earnings Survey, Table E-02',
    values: [2140, 2210, 2295, 2380, 2470, 2430, 2560, 2740, 2890, 3010, 3120],
  },
};

// Shares of GDP by industry, 2025. Source: National Accounts, Table N-05.
export const SECTORS = [
  { name: 'Trade, transport and hospitality', share: 21.4 },
  { name: 'Public services and health', share: 17.8 },
  { name: 'Manufacturing', share: 14.6 },
  { name: 'Finance and insurance', share: 11.2 },
  { name: 'Construction', share: 9.3 },
  { name: 'Agriculture and fishing', share: 8.7 },
  { name: 'Energy and water', share: 6.1 },
  { name: 'Information and communication', share: 5.8 },
  { name: 'Other services', share: 5.1 },
];

// Share of all jobs by industry, 2025. Source: Labour Force Survey, Table L-07.
export const JOBS_BY_SECTOR = [
  { name: 'Trade, transport and hospitality', share: 24.9 },
  { name: 'Public services and health', share: 21.3 },
  { name: 'Manufacturing', share: 13.8 },
  { name: 'Agriculture and fishing', share: 11.6 },
  { name: 'Construction', share: 9.7 },
  { name: 'Finance and insurance', share: 6.4 },
  { name: 'Information and communication', share: 5.2 },
  { name: 'Energy and water', share: 3.1 },
  { name: 'Other services', share: 4.0 },
];

// Population by five-year age band, 2025, thousands of people.
// Source: Population Estimates, Table P-03.
export const AGE_BANDS = [
  { band: '0–4', men: 227, women: 215 },
  { band: '5–9', men: 240, women: 228 },
  { band: '10–14', men: 247, women: 235 },
  { band: '15–19', men: 255, women: 244 },
  { band: '20–24', men: 280, women: 272 },
  { band: '25–29', men: 309, women: 303 },
  { band: '30–34', men: 322, women: 318 },
  { band: '35–39', men: 335, women: 331 },
  { band: '40–44', men: 326, women: 325 },
  { band: '45–49', men: 317, women: 319 },
  { band: '50–54', men: 298, women: 303 },
  { band: '55–59', men: 272, women: 280 },
  { band: '60–64', men: 237, women: 249 },
  { band: '65–69', men: 195, women: 211 },
  { band: '70–74', men: 148, women: 167 },
  { band: '75–79', men: 103, women: 124 },
  { band: '80+', men: 76, women: 109 },
];

// Price change by spending category, 2025. Source: Consumer Prices, Table C-04.
export const CPI_CATEGORIES = [
  { name: 'Food and non-alcoholic drinks', weight: 24.1, change: 3.1 },
  { name: 'Housing, water and energy', weight: 21.8, change: 2.4 },
  { name: 'Transport', weight: 13.6, change: 1.9 },
  { name: 'Health', weight: 6.2, change: 3.8 },
  { name: 'Education', weight: 4.9, change: 4.2 },
  { name: 'Restaurants and hotels', weight: 8.4, change: 3.5 },
  { name: 'Clothing and footwear', weight: 5.7, change: 1.2 },
  { name: 'Communication', weight: 4.3, change: -0.6 },
  { name: 'Recreation and culture', weight: 6.1, change: 2.2 },
  { name: 'Other goods and services', weight: 4.9, change: 2.9 },
];

// The twelve provinces, 2025. Source: Regional Statistics, Table R-01.
export const REGIONS = [
  { name: 'Port Meridia', pop: 1432000, gdpPerCapita: 41200, unemployment: 4.6, medianWage: 3680, lifeExpectancy: 79.6 },
  { name: 'Northgate', pop: 952000, gdpPerCapita: 33400, unemployment: 5.1, medianWage: 3210, lifeExpectancy: 78.9 },
  { name: 'Caldara Coast', pop: 881000, gdpPerCapita: 29800, unemployment: 6.2, medianWage: 2960, lifeExpectancy: 78.1 },
  { name: 'Vellora', pop: 844000, gdpPerCapita: 28900, unemployment: 5.8, medianWage: 2880, lifeExpectancy: 78.4 },
  { name: 'Eastfield', pop: 774000, gdpPerCapita: 27600, unemployment: 6.8, medianWage: 2740, lifeExpectancy: 77.8 },
  { name: 'Stonebridge', pop: 717000, gdpPerCapita: 30100, unemployment: 5.3, medianWage: 2990, lifeExpectancy: 78.6 },
  { name: 'Harbour Isles', pop: 600000, gdpPerCapita: 34700, unemployment: 4.9, medianWage: 3340, lifeExpectancy: 79.1 },
  { name: 'Mirevale', pop: 577000, gdpPerCapita: 24300, unemployment: 7.4, medianWage: 2510, lifeExpectancy: 77.2 },
  { name: 'Highmoor', pop: 494000, gdpPerCapita: 25900, unemployment: 6.5, medianWage: 2620, lifeExpectancy: 77.9 },
  { name: 'Southridge', pop: 470000, gdpPerCapita: 23800, unemployment: 7.9, medianWage: 2440, lifeExpectancy: 76.8 },
  { name: 'Lakeside', pop: 388000, gdpPerCapita: 26400, unemployment: 5.9, medianWage: 2710, lifeExpectancy: 78.2 },
  { name: 'Far North', pop: 291000, gdpPerCapita: 22100, unemployment: 8.6, medianWage: 2280, lifeExpectancy: 76.4 },
];

// The full indicator list the Data explorer searches and sorts.
// Each row names its source table and reference year.
export const INDICATORS = [
  { name: 'Resident population', value: '8.42 million', year: 2025, category: 'Population', source: 'Table P-01' },
  { name: 'Population growth', value: '0.4% per year', year: 2025, category: 'Population', source: 'Table P-01' },
  { name: 'Median age', value: '41.2 years', year: 2025, category: 'Population', source: 'Table P-02' },
  { name: 'Births', value: '86,400', year: 2025, category: 'Population', source: 'Table V-01' },
  { name: 'Deaths', value: '71,200', year: 2025, category: 'Population', source: 'Table V-01' },
  { name: 'Net migration', value: '+18,300 people', year: 2025, category: 'Population', source: 'Table P-04' },
  { name: 'People living in towns and cities', value: '68.4%', year: 2025, category: 'Population', source: 'Table P-05' },
  { name: 'Households', value: '3.31 million', year: 2025, category: 'Population', source: 'Table P-06' },
  { name: 'Average household size', value: '2.5 people', year: 2025, category: 'Population', source: 'Table P-06' },
  { name: 'Gross domestic product', value: '268.4 billion ALM', year: 2025, category: 'Economy', source: 'Table N-02' },
  { name: 'GDP growth', value: '2.5% per year', year: 2025, category: 'Economy', source: 'Table N-02' },
  { name: 'GDP per person', value: '31,876 ALM', year: 2025, category: 'Economy', source: 'Table N-02' },
  { name: 'Exports of goods and services', value: '84.6 billion ALM', year: 2025, category: 'Economy', source: 'Table N-07' },
  { name: 'Imports of goods and services', value: '79.2 billion ALM', year: 2025, category: 'Economy', source: 'Table N-07' },
  { name: 'Trade balance', value: '+5.4 billion ALM', year: 2025, category: 'Economy', source: 'Table N-07' },
  { name: 'Government debt', value: '41.2% of GDP', year: 2025, category: 'Economy', source: 'Table N-09' },
  { name: 'Business investment', value: '18.9% of GDP', year: 2025, category: 'Economy', source: 'Table N-03' },
  { name: 'Unemployment rate', value: '5.4%', year: 2025, category: 'Labour', source: 'Table L-04' },
  { name: 'Employment rate (ages 15–64)', value: '74.8%', year: 2025, category: 'Labour', source: 'Table L-02' },
  { name: 'People in work', value: '4.15 million', year: 2025, category: 'Labour', source: 'Table L-01' },
  { name: 'Median monthly wage', value: '3,120 ALM', year: 2025, category: 'Labour', source: 'Table E-02' },
  { name: 'Average working week', value: '38.4 hours', year: 2025, category: 'Labour', source: 'Table L-08' },
  { name: 'Part-time workers', value: '18.6% of jobs', year: 2025, category: 'Labour', source: 'Table L-03' },
  { name: 'Job vacancies', value: '96,000', year: 2025, category: 'Labour', source: 'Table L-09' },
  { name: 'Youth unemployment (ages 15–24)', value: '11.8%', year: 2025, category: 'Labour', source: 'Table L-05' },
  { name: 'Consumer price inflation', value: '2.7% per year', year: 2025, category: 'Prices', source: 'Table C-01' },
  { name: 'Food price inflation', value: '3.1% per year', year: 2025, category: 'Prices', source: 'Table C-04' },
  { name: 'Housing cost inflation', value: '2.4% per year', year: 2025, category: 'Prices', source: 'Table C-04' },
  { name: 'Average rent, two-bedroom flat', value: '940 ALM a month', year: 2025, category: 'Prices', source: 'Table C-06' },
  { name: 'House price index', value: '142.6 (2020 = 100)', year: 2025, category: 'Prices', source: 'Table C-07' },
  { name: 'Life expectancy at birth', value: '78.4 years', year: 2025, category: 'Health', source: 'Table V-03' },
  { name: 'Infant mortality', value: '3.8 per 1,000 births', year: 2025, category: 'Health', source: 'Table V-02' },
  { name: 'Hospital beds', value: '4.1 per 1,000 people', year: 2025, category: 'Health', source: 'Table H-01' },
  { name: 'Doctors', value: '3.6 per 1,000 people', year: 2025, category: 'Health', source: 'Table H-02' },
  { name: 'Health spending', value: '9.4% of GDP', year: 2025, category: 'Health', source: 'Table H-03' },
  { name: 'Adults reporting good health', value: '71.2%', year: 2025, category: 'Health', source: 'Table H-04' },
  { name: 'Adult literacy', value: '99.1%', year: 2025, category: 'Education', source: 'Table D-01' },
  { name: 'Young people in education or training', value: '92.4%', year: 2025, category: 'Education', source: 'Table D-02' },
  { name: 'Tertiary attainment (ages 25–34)', value: '46.3%', year: 2025, category: 'Education', source: 'Table D-03' },
  { name: 'Pupils per teacher, primary', value: '16.8', year: 2025, category: 'Education', source: 'Table D-04' },
  { name: 'Education spending', value: '5.1% of GDP', year: 2025, category: 'Education', source: 'Table D-05' },
  { name: 'School leavers with a qualification', value: '94.7%', year: 2025, category: 'Education', source: 'Table D-02' },
];

// Latest releases, newest first. Source: NSO Almera release calendar.
export const RELEASES = [
  { date: '14 November 2026', title: 'Labour Force Survey, September 2026', note: 'Unemployment steady at 5.4%; vacancies up 2,100 on the quarter.' },
  { date: '6 November 2026', title: 'Consumer Prices, October 2026', note: 'Annual inflation 2.7%; food prices rose 3.1% over the year.' },
  { date: '30 October 2026', title: 'National Accounts, third quarter 2026', note: 'GDP grew 0.6% on the quarter; services led the rise.' },
  { date: '17 October 2026', title: 'Population Estimates, mid-2026', note: 'Resident population 8.44 million; net migration +9,100 in six months.' },
  { date: '2 October 2026', title: 'Regional Statistics, 2025', note: 'All twelve provinces added jobs; Port Meridia still the highest-paid.' },
  { date: '18 September 2026', title: 'Vital Statistics, 2025', note: 'Life expectancy 78.4 years; births down 1.2% on 2024.' },
];

// Short answers to the questions visitors ask most.
export const FAQ = [
  { q: 'How many people live in Almera?', a: '8.42 million people lived in Almera at mid-2025, up 0.4% on a year earlier. Port Meridia is the largest province with 1.43 million residents.' },
  { q: 'What is the unemployment rate?', a: '5.4% of the labour force was unemployed in September 2026, the lowest since 2015. Youth unemployment (ages 15–24) is higher, at 11.8%.' },
  { q: 'How fast are prices rising?', a: 'Consumer prices rose 2.7% in the year to October 2026. Food prices rose fastest at 3.1%; communication prices fell 0.6%.' },
  { q: 'Where do the figures come from?', a: 'Every figure names its source table and reference year. The underlying surveys — the Labour Force Survey, the Consumer Prices collection and the National Accounts — are run by NSO Almera under the Statistics Act.' },
  { q: 'Can I download the data?', a: 'Yes. The Data explorer lets you search every headline indicator, and the full indicator list downloads as a CSV file from the same page.' },
];

// Helper: the last value of a series, and its change on the previous year.
export function latest(key) {
  const s = SERIES[key];
  const n = s.values.length;
  return { value: s.values[n - 1], previous: s.values[n - 2], unit: s.unit, source: s.source };
}

export function changeText(key, decimals = 1) {
  const { value, previous } = latest(key);
  const diff = value - previous;
  const sign = diff >= 0 ? '+' : '';
  return `${sign}${diff.toFixed(decimals)} on 2024`;
}

export function formatNumber(n) {
  return n.toLocaleString('en-GB');
}
