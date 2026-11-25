// Small SVG charts, drawn by hand with no library: a line chart, a bar chart
// and a population pyramid. Every chart labels its axes, marks its values and
// carries a text alternative for screen readers.

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const raw = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = raw / mag < 1.5 ? mag : raw / mag < 3.5 ? 2 * mag : raw / mag < 7.5 ? 5 * mag : 10 * mag;
  const start = Math.ceil(min / step) * step;
  const ticks = [];
  for (let v = start; v <= max + step * 0.001; v += step) ticks.push(v);
  return ticks;
}

function fmt(v, decimals) {
  return v.toLocaleString('en-GB', { maximumFractionDigits: decimals ?? 1, minimumFractionDigits: 0 });
}

// Line chart. labels: x-axis labels; values: one number per label.
// Returns an SVG string sized by viewBox, so it scales to any screen.
export function lineChart({ labels, values, color = '#0e7a6d', height = 260, decimals = 1, unit = '' }) {
  const w = 720;
  const h = height;
  const padL = 56;
  const padR = 16;
  const padT = 14;
  const padB = 34;
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const lo = min - (max - min) * 0.12;
  const hi = max + (max - min) * 0.12;
  const x = (i) => padL + (iw * i) / (values.length - 1);
  const y = (v) => padT + ih - ((v - lo) / (hi - lo)) * ih;
  const ticks = niceTicks(lo, hi, 4);
  const points = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = `${padL},${y(lo).toFixed(1)} ${points} ${x(values.length - 1).toFixed(1)},${y(lo).toFixed(1)}`;
  const dots = values
    .map((v, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="4" fill="${color}"><title>${labels[i]}: ${fmt(v, decimals)}${unit ? ' ' + unit : ''}</title></circle>`)
    .join('');
  const grid = ticks
    .map((t) => `<line x1="${padL}" y1="${y(t).toFixed(1)}" x2="${w - padR}" y2="${y(t).toFixed(1)}" stroke="#e3e0d8" stroke-width="1"/><text x="${padL - 8}" y="${(y(t) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#5c5a54">${fmt(t, decimals)}</text>`)
    .join('');
  const xlabels = labels
    .map((l, i) => `<text x="${x(i).toFixed(1)}" y="${h - 10}" text-anchor="middle" font-size="11" fill="#5c5a54">${l}</text>`)
    .join('');
  const last = values[values.length - 1];
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Line chart, latest value ${fmt(last, decimals)}${unit ? ' ' + unit : ''}" xmlns="http://www.w3.org/2000/svg">
${grid}
<polygon points="${area}" fill="${color}" opacity="0.10"/>
<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
${dots}
<text x="${x(values.length - 1).toFixed(1)}" y="${(y(last) - 10).toFixed(1)}" text-anchor="end" font-size="13" font-weight="700" fill="${color}">${fmt(last, decimals)}</text>
${xlabels}
</svg>`;
}

// Horizontal bar chart. rows: [{label, value}]. The longest bar fills the width.
export function barChart({ rows, color = '#12395b', decimals = 1, unit = '', height = 300 }) {
  const w = 720;
  const rowH = Math.max(26, Math.min(44, (height - 30) / rows.length));
  const h = rows.length * rowH + 34;
  const max = Math.max(...rows.map((r) => r.value));
  const labelW = 210;
  const valueW = 64;
  const barMax = w - labelW - valueW - 12;
  const bars = rows
    .map((r, i) => {
      const y = 8 + i * rowH;
      const bw = Math.max(2, (r.value / max) * barMax);
      return `<text x="0" y="${y + 15}" font-size="12.5" fill="#26241f">${r.label}</text>
<rect x="${labelW}" y="${y}" width="${bw.toFixed(1)}" height="20" rx="3" fill="${color}"><title>${r.label}: ${fmt(r.value, decimals)}${unit ? ' ' + unit : ''}</title></rect>
<text x="${labelW + bw + 8}" y="${y + 15}" font-size="12.5" font-weight="600" fill="#26241f">${fmt(r.value, decimals)}${unit === '%' ? '%' : ''}</text>`;
    })
    .join('\n');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Bar chart, largest value ${fmt(max, decimals)}${unit ? ' ' + unit : ''}" xmlns="http://www.w3.org/2000/svg">
${bars}
</svg>`;
}

// Population pyramid: men to the left, women to the right, one row per band.
export function pyramid({ bands }) {
  const w = 720;
  const rowH = 24;
  const h = bands.length * rowH + 44;
  const max = Math.max(...bands.flatMap((b) => [b.men, b.women]));
  const half = (w - 90) / 2;
  const mid = 45 + half;
  const rows = bands
    .map((b, i) => {
      const y = 8 + i * rowH;
      const mw = (b.men / max) * half;
      const ww = (b.women / max) * half;
      return `<text x="${w / 2}" y="${y + 15}" text-anchor="middle" font-size="11" fill="#5c5a54">${b.band}</text>
<rect x="${(mid - mw).toFixed(1)}" y="${y}" width="${mw.toFixed(1)}" height="18" fill="#12395b"><title>Men ${b.band}: ${b.men} thousand</title></rect>
<rect x="${mid.toFixed(1)}" y="${y}" width="${ww.toFixed(1)}" height="18" fill="#0e7a6d"><title>Women ${b.band}: ${b.women} thousand</title></rect>`;
    })
    .join('\n');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Population pyramid for 2025, thousands of people by age band" xmlns="http://www.w3.org/2000/svg">
<text x="${mid - half}" y="${h - 22}" font-size="12" font-weight="700" fill="#12395b">Men</text>
<text x="${mid + half}" y="${h - 22}" text-anchor="end" font-size="12" font-weight="700" fill="#0e7a6d">Women</text>
<text x="${mid - half}" y="${h - 6}" font-size="11" fill="#5c5a54">thousands of people</text>
${rows}
</svg>`;
}
