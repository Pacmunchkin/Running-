'use strict';
const KM_PER_MI = 1.609344;
// Show any uncaught error on the page instead of failing silently
window.addEventListener('error', e => {
  if (document.querySelector('.errbar')) return;
  const bar = document.createElement('div'); bar.className = 'errbar';
  bar.textContent = `Something went wrong loading this page (${e.message}). Try a hard refresh (Ctrl+Shift+R).`;
  document.body.prepend(bar);
});
// Missing elements (e.g. a cached older page) are ignored rather than crashing the whole script
const $ = id => document.getElementById(id) || document.createElement('div');
const clone = o => JSON.parse(JSON.stringify(o));
let db = clone(SEED);   // data.js is the only source of data
try { localStorage.removeItem('rl_db'); localStorage.removeItem('rl_units'); } catch { /* ignore */ }
const units = 'km';
const openRuns = new Set();
let sort = { key: 'date', dir: -1 };

// ---------- helpers ----------
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const parseD = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const today = () => iso(new Date());
const fmtDate = s => /^\d{4}-\d{2}-\d{2}$/.test(s || '')
  ? parseD(s).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : esc(s);
const weekStart = s => { const d = parseD(s); d.setDate(d.getDate() - (d.getDay() + 1) % 7); return iso(d); }; // weeks run Sat–Fri
const toUnit = km => units === 'mi' ? km / KM_PER_MI : km;
const fromUnit = v => units === 'mi' ? v * KM_PER_MI : v;
const fmtDist = km => toUnit(km).toFixed(2);
const fmtTime = s => {
  s = Math.round(s); const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), sec = s % 60;
  return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(sec).padStart(2, '0');
};
const fmtPace = (secs, km) => km > 0 ? fmtTime(secs / toUnit(km)) + '/' + units : '–';
const parseTime = t => {
  const p = String(t).trim().split(':').map(Number);
  if (p.some(isNaN) || p.length < 2 || p.length > 3) return NaN;
  return p.reduce((a, n) => a * 60 + n, 0);
};
const zoneOf = hr => {
  if (hr == null || hr === '') return null;
  for (let n = 5; n >= 1; n--) if (hr >= db.profile['z' + n]) return n;
  return 0;
};
const zoneBadge = hr => { const z = zoneOf(hr); return z == null ? '' : `<span class="z z${z}">${z ? 'Z' + z : '<Z1'}</span>`; };

// ---------- training tab ----------
function renderStats() {
  const runs = db.runs, km = runs.reduce((a, r) => a + r.km, 0), secs = runs.reduce((a, r) => a + r.secs, 0);
  const longest = runs.reduce((m, r) => Math.max(m, r.km), 0);
  const wk = weekStart(today()), mo = today().slice(0, 7);
  const sum = f => runs.filter(f).reduce((a, r) => a + r.km, 0);
  const withHr = runs.filter(r => r.hr), hrSecs = withHr.reduce((a, r) => a + r.secs, 0);
  const items = [
    ['Runs logged', runs.length], [`Total ${units}`, fmtDist(km)],
    ['This week (Sat–Fri)', fmtDist(sum(r => weekStart(r.date) === wk)) + ' ' + units],
    ['This month', fmtDist(sum(r => r.date.startsWith(mo))) + ' ' + units],
    ['Avg pace', fmtPace(secs, km)], ['Longest', fmtDist(longest) + ' ' + units],
    ['Avg HR (time-weighted)', hrSecs ? Math.round(withHr.reduce((a, r) => a + r.hr * r.secs, 0) / hrSecs) : '–'],
    ['Total time', fmtTime(secs)], ['Total ascent', runs.reduce((a, r) => a + (r.asc || 0), 0) + ' m'],
    ...(db.bp && db.bp.length ? [['Blood pressure (' + parseD(db.bp[db.bp.length - 1].date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + ')', db.bp[db.bp.length - 1].sys + '/' + db.bp[db.bp.length - 1].dia]] : []),
    ...(db.weight && db.weight.length ? [['Weight (' + parseD(db.weight[db.weight.length - 1].date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + ')', db.weight[db.weight.length - 1].kg + ' kg']] : [])
  ];
  $('stats').innerHTML = items.map(([l, v]) => `<div class="stat"><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join('');
}

function renderNext() {
  const up = db.plan.filter(p => p.date >= today()).sort((a, b) => a.date < b.date ? -1 : 1).slice(0, 5);
  $('next').innerHTML = up.length
    ? up.map(p => `<li><b>${fmtDate(p.date)}</b> — ${esc(p.session)}${p.details ? ' <span class="muted">(' + esc(p.details) + ')</span>' : ''}${p.fuel ? `<span class="flag">Fuel: ${esc(p.fuel)}</span>` : ''}</li>`).join('')
    : '<li class="muted">Nothing scheduled. Add sessions on the Plan &amp; goals tab.</li>';
}

function renderChart() {
  const cur = parseD(weekStart(today())); cur.setDate(cur.getDate() - 77);
  const weeks = [];
  for (let i = 0; i < 12; i++, cur.setDate(cur.getDate() + 7))
    weeks.push({ key: iso(cur), km: 0, label: cur.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) });
  db.runs.forEach(r => { const w = weeks.find(w => w.key === weekStart(r.date)); if (w) w.km += r.km; });
  const max = Math.max(1, ...weeks.map(w => toUnit(w.km))), W = 600, H = 180, bw = W / 12;
  $('chart').innerHTML = `<svg viewBox="0 0 ${W} ${H + 24}" role="img" aria-label="Weekly distance, weeks starting Saturday">` + weeks.map((w, i) => {
    const v = toUnit(w.km), h = v / max * (H - 20);
    return `<rect x="${i * bw + 6}" y="${H - h}" width="${bw - 12}" height="${h}" rx="3"><title>Week from ${w.label}: ${v.toFixed(1)} ${units}</title></rect>` +
      (v ? `<text x="${i * bw + bw / 2}" y="${H - h - 4}" text-anchor="middle">${v.toFixed(0)}</text>` : '') +
      `<text x="${i * bw + bw / 2}" y="${H + 16}" text-anchor="middle">${w.label}</text>`;
  }).join('') + '</svg>';
}

const fmtPaceStr = p => units === 'km' ? p : fmtTime(parseTime(p) * KM_PER_MI);
function detailHtml(r) {
  const meta = [['Start', r.time], ['Location', r.loc], ['Garmin title', r.title], ['Ascent', r.asc != null ? r.asc + ' m' : ''], ['Calories', r.cal],
    ['Est. sweat loss', r.sweat ? r.sweat + ' ml' : ''], ['Cadence', r.cad ? r.cad + ' spm' : ''], ['Stride', r.stride ? r.stride + ' m' : ''],
    ['Moving time', r.moving ? fmtTime(r.moving) : ''], ['Recovery HR', r.recHr ? r.recHr + ' bpm' : '']]
    .filter(([, v]) => v !== '' && v != null).map(([k, v]) => `<span><b>${esc(k)}</b>${esc(v)}</span>`).join('');
  let zones = '';
  if (r.zones) {
    const sum = r.zones.reduce((a, b) => a + b, 0), below = r.secs - sum > 15 ? r.secs - sum : 0, tot = sum + below;
    const parts = [...(below ? [[0, below]] : []), ...r.zones.map((s, i) => [i + 1, s])].filter(p => p[1] > 0);
    const name = n => n ? 'Z' + n : '<Z1';
    zones = `<div class="zbar" role="img" aria-label="Time in HR zones">${parts.map(([n, s]) => `<i class="seg z${n}" style="width:${s / tot * 100}%" title="${name(n)} ${fmtTime(s)}"></i>`).join('')}</div>` +
      `<div class="legend">${parts.map(([n, s]) => `<span><span class="z z${n}">${name(n)}</span> ${fmtTime(s)} (${Math.round(s / tot * 100)}%)</span>`).join('')}</div>`
      + (r.zoneNote ? `<div class="muted legend">${esc(r.zoneNote)}</div>` : '');
  }
  const laps = r.laps ? `<table class="laps"><thead><tr><th>Lap</th><th>Time</th><th>${units}</th><th>Pace</th><th>HR avg / max</th><th>Cadence</th></tr></thead><tbody>` +
    r.laps.map(l => `<tr><td>${esc(l.label)}</td><td>${esc(l.time)}</td><td>${fmtDist(l.km)}</td><td>${fmtPaceStr(l.pace)}/${units}</td><td>${l.hr} / ${l.max} ${zoneBadge(l.hr)}</td><td>${l.cad}</td></tr>`).join('') + '</tbody></table>' : '';
  return `<div class="meta">${meta}</div>${zones}${lapChart(r)}${laps}`;
}

function renderTable() {
  const q = $('search').value.toLowerCase();
  const val = r => ({ pace: r.secs / r.km, dist: r.km, hr: r.hr ?? 0 })[sort.key] ?? r[sort.key];
  const list = db.runs.filter(r => !q || [r.notes, r.type, r.flag, r.shoe].join(' ').toLowerCase().includes(q))
    .sort((a, b) => (val(a) > val(b) ? 1 : val(a) < val(b) ? -1 : 0) * sort.dir);
  $('empty').hidden = db.runs.length > 0;
  $('rows').innerHTML = list.map(r => `<tr>
    <td>${fmtDate(r.date)}</td><td>${esc(r.type)}</td><td class="num">${fmtDist(r.km)} ${units}</td><td>${fmtTime(r.secs)}</td><td>${fmtPace(r.secs, r.km)}</td>
    <td>${r.hr ?? ''}${r.maxhr ? ' / ' + r.maxhr : ''} ${zoneBadge(r.hr)}</td>
    <td class="notes">${esc(r.notes)}${r.shoe ? `<span class="flag">👟 ${esc(r.shoe)}</span>` : ''}${r.flag ? `<span class="flag">⚠ ${esc(r.flag)}</span>` : ''}</td>
    <td><button class="link" data-more="${r.id}">${openRuns.has(r.id) ? 'Hide' : 'Details'}</button></td></tr>` +
    (openRuns.has(r.id) ? `<tr class="detail"><td colspan="8">${detailHtml(r)}</td></tr>` : '')).join('');
}

$('search').oninput = renderTable;
(document.querySelector('thead') || document.body).addEventListener('click', e => {
  const k = e.target.dataset.sort; if (!k) return;
  sort = { key: k, dir: sort.key === k ? -sort.dir : -1 }; renderTable();
});
$('rows').addEventListener('click', e => {
  const { more } = e.target.dataset;
  if (more) { openRuns.has(more) ? openRuns.delete(more) : openRuns.add(more); renderTable(); }
});

// ---------- generic editable lists (goals, plan, shoes, …) ----------
// fields: [key, label, input type, required]
const COLS = {
  goals: {
    single: 'goal', fields: [['event', 'Event', 'text', 1], ['race', 'Race', 'text'], ['date', 'Date', 'date'], ['distKm', 'Distance (km)', 'number', 1],
      ['target', 'Target time', 'text', 1], ['notes', 'Notes', 'text']],
    hide: ['distKm'], sort: (a, b) => a.date < b.date ? -1 : 1,
    extra: [['Target pace', g => esc(fmtPace(parseTime(g.target), g.distKm))],
            ['Estimate now', g => { const e = estOf(g.id); return e ? fmtRange(e.est[g.id]) : ''; }],
            ['Days to go', g => { const d = Math.round((parseD(g.date) - parseD(today())) / 864e5); return d >= 0 ? d : 'done'; }]]
  },
  plan: {
    single: 'session', fields: [['date', 'Date', 'date', 1], ['session', 'Session', 'text', 1], ['details', 'Details', 'text', 0, 1], ['fuel', 'Fuelling', 'text', 0, 1]],
    sort: (a, b) => a.date < b.date ? -1 : 1,
    extra: [['Logged', p => { const r = db.runs.filter(r => r.date === p.date); return r.length ? '✓ ' + esc(r.map(r => fmtDist(r.km) + ' ' + units).join(', ')) : ''; }]]
  },
  missed: { single: 'entry', fields: [['when', 'When', 'text', 1], ['status', 'Status', 'text'], ['what', 'What', 'text'], ['reason', 'Reason', 'text']] },
  shoes: {
    single: 'shoe', fields: [['name', 'Name', 'text', 1], ['status', 'Status', 'text'], ['km', 'Mileage (km)', 'number'], ['asOf', 'Mileage as of', 'date'], ['notes', 'Notes', 'text']],
    extra: [['Total', s => {
      if (s.km == null) return '';
      const more = db.runs.filter(r => r.shoe === s.name && (!s.asOf || r.date > s.asOf)).reduce((a, r) => a + r.km, 0);
      return esc(Math.round(toUnit(s.km + more)) + ' ' + units);
    }]]
  },
  nutrition: { single: 'item', fields: [['item', 'Item', 'text', 1], ['use', 'Use', 'text'], ['kcal', 'kcal', 'number'], ['carbs', 'Carbs (g)', 'number'], ['sodium', 'Sodium (mg)', 'number'], ['notes', 'Notes', 'text']] },
  pbs: { single: 'result', fields: [['event', 'Event', 'text', 1], ['time', 'Time', 'text', 1], ['place', 'Place', 'text'], ['when', 'When', 'text'], ['notes', 'Notes', 'text']] },
  caveats: { single: 'caveat', fields: [['note', 'Caveat', 'text', 1]] }
};
function renderCol(key) {
  const c = COLS[key], shown = c.fields.filter(f => !(c.hide || []).includes(f[0]));
  const items = [...db[key]]; if (c.sort) items.sort(c.sort);
  $('c-' + key).innerHTML = items.length
    ? `<table><thead><tr>${shown.map(f => `<th>${esc(f[1])}</th>`).join('')}${(c.extra || []).map(x => `<th>${esc(x[0])}</th>`).join('')}</tr></thead><tbody>` +
      items.map(it => `<tr>${shown.map(([k, , t, , wrap]) => `<td${t === 'number' ? ' class="num"' : wrap ? ' class="notes"' : ''}>${t === 'date' ? fmtDate(it[k]) : esc(it[k])}</td>`).join('')}` +
        (c.extra || []).map(x => `<td>${x[1](it)}</td>`).join('') + '</tr>').join('') + '</tbody></table>'
    : '<p class="muted">Nothing here yet.</p>';
}

// ---------- profile ----------
function renderProfile() {
  const p = db.profile;
  $('who').textContent = [p.name, p.location, p.phase].filter(Boolean).join(' · ');
  $('profile').innerHTML = [['Name', p.name], ['Location', p.location], ['Phase', p.phase], ['Long/tempo day', p.longDay], ['Running week', p.week],
    ['Max HR seen', p.maxHr ? p.maxHr + ' bpm' + (p.maxHrNote ? ` (${p.maxHrNote})` : '') : ''],
    ['Resting HR', p.restHr ? p.restHr + ' bpm' + (p.restHrNote ? ` (${p.restHrNote})` : '') : '']]
    .map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('');
  $('zones').innerHTML = '<table><thead><tr><th>Zone</th><th>Range (bpm)</th></tr></thead><tbody>' +
    [1, 2, 3, 4, 5].map(n => `<tr><td><span class="z z${n}">Z${n}</span></td><td>${p['z' + n]}${n < 5 ? '–' + (p['z' + (n + 1)] - 1) : '+'}</td></tr>`).join('') +
    '</tbody></table>' + (p.zoneNote ? `<p class="muted">${esc(p.zoneNote)}</p>` : '');
}


// ---------- review tab ----------
const sortedEsts = () => [...db.estimates].sort((a, b) => a.date < b.date ? -1 : 1);
const estOf = (gid, back = 0) => { const l = sortedEsts().filter(e => e.est && e.est[gid]); return l[l.length - 1 - back]; };
const fmtRange = r => `${fmtTime(r[0])}–${fmtTime(r[1])}`;
const mid = r => (r[0] + r[1]) / 2;
const secPerUnit = secPerKm => secPerKm * (units === 'mi' ? KM_PER_MI : 1);
const shortName = g => g.event.replace('Half marathon', 'HM');
const signed = x => (x > 0 ? '+' : x < 0 ? '−' : '') + fmtTime(Math.abs(x));
let paceView = 'race';

// Daniels VDOT equations (same model used to build the estimates)
const dVo2 = v => -4.60 + 0.182258 * v + 0.000104 * v * v;
const dPct = t => 0.8 + 0.1894393 * Math.exp(-0.012778 * t) + 0.2989558 * Math.exp(-0.1932605 * t);
const dVdot = (m, s) => { const t = s / 60; return dVo2(m / t) / dPct(t); };
function predictTime(vdot, m) {
  let lo = 60, hi = 21600;
  for (let i = 0; i < 60; i++) { const x = (lo + hi) / 2; dVdot(m, x) > vdot ? lo = x : hi = x; }
  return (lo + hi) / 2;
}

// Projected race-day pace: VDOT rises towards +vdotGain, endurance factor eases to its floor. Anchored on the latest estimate.
function projectionFor(g) {
  const e = estOf(g.id), P = db.projection; if (!e || !P) return null;
  const t0 = parseD(e.date).getTime(), end = parseD(g.date).getTime(); if (end <= t0) return null;
  const m = g.distKm * 1000, mid0 = mid(e.est[g.id]), gap0 = (e.gap || {})[g.id] || 1, floor = Math.min(P.gapFloor[g.id] || gap0, gap0);
  const base = predictTime(e.vdot, m) * gap0, rt = g.distKm > 15 ? 10 : g.distKm > 8 ? 5 : 1;
  const at = t => {
    const w = (t - t0) / (7 * 864e5);
    const v = e.vdot + P.vdotGain * (1 - Math.exp(-w / P.vdotWeeks)), gap = floor + (gap0 - floor) * Math.exp(-w / P.gapWeeks);
    return Math.round(mid0 * predictTime(v, m) * gap / base / rt) * rt;
  };
  const ts = []; for (let t = t0; t < end; t += 28 * 864e5) ts.push(t); ts.push(end);
  return ts.map(t => ({ t, time: at(t) }));
}

function reviewHtml(r) {
  return `<h3>${esc(r.title)}</h3><p class="muted">${fmtDate(r.date)}</p>` +
    r.sections.map(s => `<h4>${esc(s.heading)}</h4><ul>${s.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`).join('');
}

function renderEstimates() {
  const goals = [...db.goals].sort((a, b) => a.date < b.date ? -1 : 1);
  const last = sortedEsts().slice(-1)[0];
  $('est-table').innerHTML = '<table><thead><tr><th>Race</th><th>Date</th><th>Goal</th><th>Estimate now</th><th>Gap to goal</th><th>Projected on race day</th><th>Since last update</th></tr></thead><tbody>' +
    goals.map(g => {
      const e = estOf(g.id), p = estOf(g.id, 1); if (!e) return '';
      const gap = mid(e.est[g.id]) - parseTime(g.target), d = p ? mid(e.est[g.id]) - mid(p.est[g.id]) : null;
      const pr = projectionFor(g), pt = pr && pr[pr.length - 1].time, pg = pt && pt - parseTime(g.target);
      return `<tr><td>${esc(g.event)} <span class="muted">${esc(g.race)}</span></td><td>${fmtDate(g.date)}</td><td>${esc(g.target)}</td>
        <td><b>${fmtRange(e.est[g.id])}</b></td><td>${signed(gap)} ${gap > 0 ? 'slower' : 'faster'}</td>
        <td>${pt ? `<b>${fmtTime(pt)}</b> <span class="muted">(${signed(pg)} vs goal)</span>` : ''}</td>
        <td>${d == null ? '' : d === 0 ? 'no change' : signed(d) + (d < 0 ? ' (faster)' : ' (slower)')}</td></tr>`;
    }).join('') + '</tbody></table>';
  $('est-note').textContent = last ? `Last updated ${fmtDate(last.date)}. VDOT ${last.vdot}. Basis: ${last.basis}.` : 'No estimates yet.';
}

// SVG line chart. series kinds: line, proj (dotted projection), goal (dashed), ref (grey dashed reference)
function lineChart(el, series, o) {
  const pts = series.flatMap(s => s.pts);
  if (!pts.length) { el.innerHTML = '<p class="muted">No data yet.</p>'; return; }
  const W = 640, H = 270, m = { l: 50, r: 132, t: 16, b: 30 };
  const t0 = o.t0 || parseD(db.block.start).getTime(), t1 = o.t1 || Math.max(...pts.map(p => p.t)) + 7 * 864e5;
  let lo = Math.min(...pts.map(p => p.v)), hi = Math.max(...pts.map(p => p.v)); if (o.minSpan && hi - lo < o.minSpan) { const c = (hi + lo) / 2; lo = c - o.minSpan / 2; hi = c + o.minSpan / 2; }
  const pad = (hi - lo || 1) * 0.1; lo -= pad; hi += pad;
  const step = o.steps.find(s => (hi - lo) / s <= 6) || o.steps[o.steps.length - 1];
  const yTicks = []; for (let v = Math.ceil(lo / step) * step; v <= hi; v += step) yTicks.push(v);
  const x = t => m.l + (t - t0) / (t1 - t0) * (W - m.l - m.r);
  const y = v => o.faster === 'down' ? m.t + (v - lo) / (hi - lo) * (H - m.t - m.b) : m.t + (hi - v) / (hi - lo) * (H - m.t - m.b);   // 'down': lower values are better and plot higher
  const spanDays = (t1 - t0) / 864e5, xTicks = [];
  if (spanDays > 1000) { for (let yr = new Date(t0).getFullYear() + (new Date(t0).getMonth() ? 1 : 0); new Date(yr, 0, 1).getTime() <= t1; yr++) xTicks.push([new Date(yr, 0, 1), String(yr)]); }
  else if (spanDays > 120) { const d = parseD(iso(new Date(t0))); d.setDate(1); d.setMonth(d.getMonth() + 1); for (; d.getTime() <= t1; d.setMonth(d.getMonth() + (spanDays > 300 ? 2 : 1))) xTicks.push([new Date(d), d.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' })]); }
  else { const d = parseD(iso(new Date(t0))); d.setDate(d.getDate() + (6 - d.getDay() + 7) % 7); for (; d.getTime() <= t1; d.setDate(d.getDate() + 14)) xTicks.push([new Date(d), d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })]); }
  let g = '', labels = '';
  yTicks.forEach(v => { g += `<line x1="${m.l}" x2="${W - m.r}" y1="${y(v)}" y2="${y(v)}" class="grid"/><text x="${m.l - 6}" y="${y(v) + 4}" text-anchor="end">${o.fmt(v)}</text>`; });
  xTicks.forEach(([t, l]) => { g += `<text x="${x(t.getTime())}" y="${H - 8}" text-anchor="middle">${l}</text>`; });
  series.forEach(s => {
    if (s.kind === 'ref') { const yy = y(s.pts[0].v); g += `<line x1="${m.l}" x2="${W - m.r}" y1="${yy}" y2="${yy}" class="ref"/><text class="reflbl" x="${m.l + 4}" y="${yy - 4}">${esc(s.name)}</text>`; return; }
    if (s.kind === 'goal') { const yy = y(s.pts[0].v); g += `<line x1="${m.l}" x2="${W - m.r}" y1="${yy}" y2="${yy}" class="goal ${s.cls}"/>`; return; }
    const poly = s.pts.map(q => `${x(q.t).toFixed(1)},${y(q.v).toFixed(1)}`).join(' ');
    const l = s.pts[s.pts.length - 1];
    if (s.kind === 'proj') {
      g += `<polyline points="${poly}" class="proj ${s.cls}"/><circle cx="${x(l.t)}" cy="${y(l.v)}" r="5" class="pend ${s.cls}"><title>${esc(l.tip)}</title></circle>`;
    } else {
      g += (s.noLine ? '' : `<polyline points="${poly}" class="ln ${s.cls}"/>`) + (s.noDots ? [s.pts[s.pts.length - 1]] : s.pts).map(q => `<circle cx="${x(q.t)}" cy="${y(q.v)}" r="4" class="dot ${s.cls}"><title>${esc(q.tip)}</title></circle>`).join('');
      if (s.topLabel) labels += `<text class="now ${s.cls}" x="${x(l.t)}" y="${y(l.v) - 10}" text-anchor="middle">${esc(s.topLabel)}</text>`;
    }
    if (s.endLabel) labels += `<text class="end ${s.cls}" x="${x(l.t) + 9}" y="${y(l.v) + 4}">${esc(s.endLabel)}</text>`;
  });
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.label)}">${g}${labels}</svg>`;
}

function renderCharts() {
  const ests = sortedEsts(), dt = e => parseD(e.date).getTime();
  const pb = (name, vdot) => ({ kind: 'ref', name: `${name} ${vdot}`, pts: [{ t: 0, v: vdot }] });
  lineChart($('chart-vo2'), [pb('5K PB', 46.8), pb('10K PB', 43.3), pb('HM PB', 41.8),
    ...((db.garmin && db.garmin.vo2Block.length) ? [{ kind: 'line', cls: 'c3', endLabel: `Garmin ${db.garmin.vo2Block[db.garmin.vo2Block.length - 1][1]}`, pts: db.garmin.vo2Block.map(([d, v]) => ({ t: parseD(d).getTime(), v, tip: `${fmtDate(d)}: Garmin VO2 max ${v}` })) }] : []),
    { kind: 'line', cls: 'c0', endLabel: `Est. ${ests.length ? ests[ests.length - 1].vdot.toFixed(1) : ''}`, pts: ests.map(e => ({ t: dt(e), v: e.vdot, tip: `${fmtDate(e.date)}: VDOT ${e.vdot}. ${e.basis}` })) }],
    { steps: [0.5, 1, 2], fmt: v => v.toFixed(1), faster: 'up', label: 'Estimated VO2 max over time' });

  const goals = [...db.goals].sort((a, b) => a.date < b.date ? -1 : 1), cls = ['c1', 'c2', 'c3'];
  const pace = (g, secs) => secPerUnit(secs / g.distKm), series = [], tiles = [];
  let lastRace = 0;
  goals.forEach((g, i) => {
    const c = cls[i % 3], es = ests.filter(e => e.est && e.est[g.id]), n = shortName(g), latest = es[es.length - 1];
    if (!latest) return;
    const now = mid(latest.est[g.id]), pr = projectionFor(g), pend = pr && pr[pr.length - 1];
    series.push({ kind: 'line', cls: c, topLabel: fmtTime(now), endLabel: paceView === 'now' ? `${n} ${fmtTime(pace(g, now))}/${units}` : '',
      pts: es.map(e => ({ t: dt(e), v: pace(g, mid(e.est[g.id])), tip: `${fmtDate(e.date)}: ${n} ${fmtRange(e.est[g.id])} (${fmtTime(pace(g, mid(e.est[g.id])))}/${units})` })) });
    series.push({ kind: 'goal', cls: c, pts: [{ t: 0, v: pace(g, parseTime(g.target)) }] });
    if (paceView === 'race' && pr) {
      lastRace = Math.max(lastRace, pend.t);
      series.push({ kind: 'proj', cls: c, endLabel: `${n} ${parseD(g.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} ${fmtTime(pend.time)}`,
        pts: pr.map(q => ({ t: q.t, v: pace(g, q.time), tip: `${fmtDate(iso(new Date(q.t)))}: projected ${n} ${fmtTime(q.time)} (${fmtTime(pace(g, q.time))}/${units})` })) });
    }
    tiles.push(`<div class="stat"><b class="${c}">${fmtRange(latest.est[g.id])}</b><span>${esc(g.event)} now. ` +
      `${pend ? `Projected ${fmtTime(pend.time)} on ${fmtDate(g.date)}. ` : ''}Goal ${esc(g.target)}</span></div>`);
  });
  $('pace-tiles').innerHTML = tiles.join('');
  document.querySelectorAll('[data-pv]').forEach(b => b.classList.toggle('on', b.dataset.pv === paceView));
  lineChart($('chart-pace'), series, { steps: [5, 10, 15, 30, 60], fmt: fmtTime, faster: 'down', t1: paceView === 'race' && lastRace ? lastRace + 14 * 864e5 : null,
    label: 'Estimated race pace over time, with projection to race day and goal pace' });
}

function renderBlock() {
  const start = db.block.start, runs = db.runs.filter(r => r.date >= start);
  const range = `${fmtDate(start)} to ${fmtDate(runs.map(r => r.date).sort().pop() || start)}`;
  $('block-title').textContent = range; $('zones-title').textContent = range;
  const km = runs.reduce((a, r) => a + r.km, 0), secs = runs.reduce((a, r) => a + r.secs, 0);
  const weeks = {};
  runs.forEach(r => { const k = weekStart(r.date), w = weeks[k] ||= { n: 0, km: 0, secs: 0, long: 0, runs: [] }; w.n++; w.km += r.km; w.secs += r.secs; w.long = Math.max(w.long, r.km); w.runs.push(r); });
  const wk = Object.entries(weeks).sort();
  const ok = wk.filter(([, w]) => w.km > 10);
  const items = [['Runs', runs.length], [`Total ${units}`, fmtDist(km)], ['Total time', fmtTime(secs)], [`Avg per week (${units})`, ok.length ? fmtDist(ok.reduce((a, [, w]) => a + w.km, 0) / ok.length) : '–'],
    ['Longest run', fmtDist(runs.reduce((a, r) => Math.max(a, r.km), 0)) + ' ' + units], ['Total ascent', runs.reduce((a, r) => a + (r.asc || 0), 0) + ' m']];
  $('block-stats').innerHTML = items.map(([l, v]) => `<div class="stat"><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join('');
  $('block-weeks').innerHTML = '<table><thead><tr><th>Week from</th><th>Runs</th><th>' + units + '</th><th>Time</th><th>Longest</th></tr></thead><tbody>' +
    wk.map(([k, w]) => `<tr><td>${fmtDate(k)}</td><td>${w.n}</td><td class="num">${fmtDist(w.km)}</td><td>${fmtTime(w.secs)}</td><td class="num">${fmtDist(w.long)}</td></tr>`).join('') + '</tbody></table>';

  // time in zones: whole block, then week by week
  const zoneParts = rs => {
    const z = [0, 0, 0, 0, 0]; let below = 0, tot = 0;
    rs.filter(r => r.zones).forEach(r => { r.zones.forEach((s, i) => z[i] += s); below += Math.max(0, r.secs - r.zones.reduce((a, b) => a + b, 0)); tot += r.secs; });
    return { z, below, tot, parts: [[0, below], ...z.map((s, i) => [i + 1, s])].filter(p => p[1] > 0) };
  };
  const bar = zp => `<div class="zbar" role="img" aria-label="Time in HR zones">${zp.parts.map(([n, s]) => `<i class="seg z${n}" style="width:${s / zp.tot * 100}%" title="${n ? 'Z' + n : '<Z1'} ${fmtTime(s)}"></i>`).join('')}</div>`;
  const all = zoneParts(runs), pct = s => Math.round(s / all.tot * 100);
  $('block-zones').innerHTML = all.tot ? bar(all) +
    `<div class="legend">${all.parts.map(([n, s]) => `<span><span class="z z${n}">${n ? 'Z' + n : '<Z1'}</span> ${fmtTime(s)} (${pct(s)}%)</span>`).join('')}</div>` +
    `<p class="muted">Z1–Z2 and below ${pct(all.below + all.z[0] + all.z[1])}%, Z3 ${pct(all.z[2])}%, Z4–Z5 ${pct(all.z[3] + all.z[4])}%. Includes warm-ups, cool-downs and recoveries.</p>` +
    '<h3>Week by week</h3><div class="zweeks">' + wk.map(([k, w]) => { const zp = zoneParts(w.runs); if (!zp.tot) return '';
      const hard = Math.round((zp.z[2] + zp.z[3] + zp.z[4]) / zp.tot * 100);
      return `<div class="zweek"><span>${fmtDate(k).replace(/^\w+, /, '').replace(/ 20\d\d$/, '')}</span>${bar(zp)}<span class="muted">Z3+ ${hard}%</span></div>`; }).join('') + '</div>'
    : '<p class="muted">No zone data.</p>';

  // quality work: rep/effort laps
  const lt = l => l.time.split(':').reduce((a, n) => a * 60 + +n, 0);
  const q = runs.map(r => {
    const L = (r.laps || []).filter(l => /^(Rep \d|Effort|Out|Back)/.test(l.label) && !/abandoned/.test(l.label)); if (!L.length) return null;
    const T = L.reduce((a, l) => a + lt(l), 0), K = L.reduce((a, l) => a + l.km, 0);
    return { r, n: L.length, pace: secPerUnit(T / K), hr: L.reduce((a, l) => a + l.hr * lt(l), 0) / T };
  }).filter(Boolean).sort((a, b) => a.r.date < b.r.date ? -1 : 1);
  $('block-quality').innerHTML = '<table><thead><tr><th>Date</th><th>Session</th><th>Reps</th><th>Avg rep pace</th><th>Avg HR</th></tr></thead><tbody>' +
    q.map(x => `<tr><td>${fmtDate(x.r.date)}</td><td>${esc(x.r.type)}</td><td>${x.n}</td><td>${fmtTime(x.pace)}/${units}</td><td>${Math.round(x.hr)} ${zoneBadge(Math.round(x.hr))}</td></tr>`).join('') + '</tbody></table>';

  const easy = runs.filter(r => ['Easy', 'Recovery'].includes(r.type)).sort((a, b) => a.date < b.date ? -1 : 1);
  $('block-easy').innerHTML = '<table><thead><tr><th>Date</th><th>Type</th><th>' + units + '</th><th>Pace</th><th>Avg HR</th><th>Time in Z3+</th></tr></thead><tbody>' +
    easy.map(r => `<tr><td>${fmtDate(r.date)}</td><td>${esc(r.type)}</td><td class="num">${fmtDist(r.km)}</td><td>${fmtPace(r.secs, r.km)}</td><td>${r.hr} ${zoneBadge(r.hr)}</td>
      <td>${r.zones ? Math.round((r.zones[2] + r.zones[3] + r.zones[4]) / r.secs * 100) + '%' : ''}</td></tr>`).join('') + '</tbody></table>';
}

function renderReview() {
  const rv = [...db.reviews].sort((a, b) => a.date < b.date ? 1 : -1);
  $('review-latest').innerHTML = rv.length ? reviewHtml(rv[0]) : '<p class="muted">No review yet.</p>';
  $('review-older').innerHTML = rv.length > 1 ? rv.slice(1).map(r => `<details><summary>${fmtDate(r.date)}: ${esc(r.title)}</summary>${reviewHtml(r)}</details>`).join('') : '<p class="muted">None yet.</p>';
  renderEstimates(); renderCharts(); renderBlock();
}
document.addEventListener('click', e => { const v = e.target.dataset && e.target.dataset.pv; if (v) { paceView = v; renderCharts(); } });

// ---------- trends tab ----------
const WEEKDAY_FMT = { day: 'numeric', month: 'short' };
const weekKeys = (from, to) => { const out = [], d = parseD(from); while (iso(d) <= to) { out.push(iso(d)); d.setDate(d.getDate() + 7); } return out; };
const wkLabel = k => parseD(k).toLocaleDateString('en-GB', WEEKDAY_FMT);
const ZONE_WEIGHT = [1, 2, 3, 4, 5];   // Edwards-style load: minutes in each zone x zone number
const runLoad = r => r.zones ? r.zones.reduce((a, s, i) => a + s / 60 * ZONE_WEIGHT[i], 0) : r.secs / 60 * (zoneOf(r.hr) || 0);

function niceTop(maxV, steps) {
  const step = steps.find(s => maxV * 1.05 / s <= 7) || steps[steps.length - 1];
  return [step, Math.ceil(maxV * 1.05 / step) * step];
}

// vertical bars (optionally stacked) with optional planned (hollow) bars, a line overlay and reference lines
function barChart(el, cats, stacks, o) {
  const W = 640, H = 250, m = { l: 46, r: 16, t: 18, b: 32 }, n = cats.length;
  const totals = cats.map((_, i) => stacks.reduce((a, s) => a + (s.vals[i] || 0), 0));
  const lineVals = o.line ? o.line.vals.filter(v => v != null) : [];
  const [step, top] = niceTop(Math.max(1e-9, ...totals, ...(o.hollow || []), ...lineVals, ...(o.refs || []).map(r => r.v)), o.steps);
  const y = v => m.t + (1 - v / top) * (H - m.t - m.b), bw = (W - m.l - m.r) / n, bx = i => m.l + i * bw + bw * 0.19, bwid = bw * 0.62;
  let g = '', labels = '';
  for (let v = 0; v <= top + 1e-9; v += step) g += `<line x1="${m.l}" x2="${W - m.r}" y1="${y(v)}" y2="${y(v)}" class="grid"/><text x="${m.l - 6}" y="${y(v) + 4}" text-anchor="end">${o.axisFmt ? o.axisFmt(v) : v}</text>`;
  cats.forEach((c, i) => { if (i % (o.labelEvery || 1) === 0) g += `<text x="${bx(i) + bwid / 2}" y="${H - 10}" text-anchor="middle">${esc(c.label)}</text>`; });
  const acc = new Array(n).fill(0);
  stacks.forEach(s => s.vals.forEach((v, i) => {
    if (!(v > 0)) return;
    g += `<rect x="${bx(i)}" y="${y(acc[i] + v)}" width="${bwid}" height="${y(acc[i]) - y(acc[i] + v)}" class="${s.cls}"><title>${esc(cats[i].label)}: ${esc(s.name)} ${o.fmt(v)}</title></rect>`;
    acc[i] += v;
  }));
  totals.forEach((t, i) => { if (t > 0 && !o.noTotals) labels += `<text class="tot" x="${bx(i) + bwid / 2}" y="${y(t) - 5}" text-anchor="middle">${o.fmt(t)}</text>`; });
  (o.hollow || []).forEach((h, i) => { if (h > totals[i]) g += `<rect x="${bx(i)}" y="${y(h)}" width="${bwid}" height="${y(0) - y(h)}" class="hollow"><title>${esc(cats[i].label)}: planned ${o.fmt(h)}</title></rect>`;
    if (h > totals[i]) labels += `<text class="tot plan" x="${bx(i) + bwid / 2}" y="${y(h) - 5}" text-anchor="middle">${o.fmt(h)} planned</text>`; });
  if (o.line) {
    const pts = o.line.vals.map((v, i) => v == null ? null : [bx(i) + bwid / 2, y(v), v]).filter(Boolean);
    g += `<polyline points="${pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ')}" class="ln c1"/>` + pts.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="3.5" class="dot c1"><title>${esc(o.line.name)} ${o.fmt(p[2])}</title></circle>`).join('');
  }
  (o.refs || []).forEach(r => { g += `<line x1="${m.l}" x2="${W - m.r}" y1="${y(r.v)}" y2="${y(r.v)}" class="ref"/>`; labels += `<text class="reflbl" x="${m.l + 4}" y="${y(r.v) - 4}">${esc(r.label)}</text>`; });
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.label)}">${g}${labels}</svg>`;
}

// lines over categories (e.g. rep 1..4), one series per session
function catLines(el, cats, series, o) {
  const W = 640, H = 230, m = { l: 50, r: 70, t: 14, b: 28 };
  const all = series.flatMap(s => s.vals.filter(v => v != null));
  let lo = Math.min(...all), hi = Math.max(...all); const pad = (hi - lo || 1) * 0.12; lo -= pad; hi += pad;
  const step = o.steps.find(s => (hi - lo) / s <= 6) || o.steps[o.steps.length - 1];
  const x = i => m.l + (cats.length === 1 ? 0 : i / (cats.length - 1)) * (W - m.l - m.r);
  const y = v => o.faster === 'down' ? m.t + (v - lo) / (hi - lo) * (H - m.t - m.b) : m.t + (hi - v) / (hi - lo) * (H - m.t - m.b);
  let g = '', ends = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi; v += step) g += `<line x1="${m.l}" x2="${W - m.r}" y1="${y(v)}" y2="${y(v)}" class="grid"/><text x="${m.l - 6}" y="${y(v) + 4}" text-anchor="end">${o.fmt(v)}</text>`;
  cats.forEach((c, i) => { if (i % (o.labelEvery || 1) === 0 || i === cats.length - 1) g += `<text x="${x(i)}" y="${H - 8}" text-anchor="middle">${esc(c)}</text>`; });
  (o.marks || []).forEach(k => { g += `<line x1="${x(k.i)}" x2="${x(k.i)}" y1="${m.t}" y2="${H - m.b}" class="ref"/><text class="reflbl" x="${x(k.i) - 4}" y="${m.t + 10}" text-anchor="end">${esc(k.label)}</text>`; });
  series.forEach(s => {
    const pts = s.vals.map((v, i) => v == null ? null : [x(i), y(v), v, i]).filter(Boolean);
    g += `<polyline points="${pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ')}" class="ln ${s.cls}"/>` +
      pts.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="4" class="dot ${s.cls}"><title>${esc(s.name)}, ${esc(cats[p[3]])}: ${o.fmt(p[2])}</title></circle>`).join('');
    const l = pts[pts.length - 1]; ends.push({ y: l[1], text: s.name, cls: s.cls, x: l[0] });
  });
  ends.sort((a, b) => a.y - b.y); ends.forEach((e, i) => { if (i && e.y < ends[i - 1].y + 14) e.y = ends[i - 1].y + 14; });   // keep end labels apart
  g += ends.map(e => `<text class="end ${e.cls}" x="${e.x + 9}" y="${e.y + 4}">${esc(e.text)}</text>`).join('');
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.label)}">${g}</svg>`;
}

// bars = pace per lap (taller is faster), line = average HR per lap
function lapChart(r) {
  const L = r.laps; if (!L || L.length < 2) return '';
  const W = 640, H = 200, m = { l: 8, r: 44, t: 18, b: 26 }, n = L.length, bw = (W - m.l - m.r) / n, ph = H - m.t - m.b;
  const speed = l => 3600 / Math.max(1, parseTime(l.pace));
  const vmax = Math.max(...L.map(speed));
  const hrs = L.map(l => l.hr), hmin = Math.min(...hrs) - 6, hmax = Math.max(...hrs) + 6;
  const hy = h => m.t + (1 - (h - hmin) / (hmax - hmin)) * ph;
  const short = l => l.label.replace('Warm up', 'WU').replace('Cool down', 'CD').replace('Recovery', 'Rec').replace(/^Rep (\d)( \(abandoned\))?/, 'R$1').replace('Effort ', 'E').replace(/^Run (\d)/, 'Run$1');
  const isWork = l => /^(Rep|Effort|Out|Back|Run \d)/.test(l.label);
  let g = '', labels = '';
  L.forEach((l, i) => {
    const h = speed(l) / vmax * ph * 0.88, x = m.l + i * bw + 3;
    g += `<rect x="${x}" y="${m.t + ph - h}" width="${bw - 6}" height="${h}" rx="2" class="${isWork(l) ? 'lapw' : 'lapr'}"><title>${esc(l.label)}: ${l.pace}/km, ${l.time}, avg HR ${l.hr}</title></rect>`;
    g += `<text x="${x + (bw - 6) / 2}" y="${H - 8}" text-anchor="middle">${esc(short(l))}</text>`;
    if (bw > 36) labels += `<text class="tot" x="${x + (bw - 6) / 2}" y="${m.t + ph - h - 4}" text-anchor="middle">${esc(l.pace)}</text>`;
  });
  g += `<polyline class="laphr" points="${L.map((l, i) => `${(m.l + i * bw + bw / 2).toFixed(1)},${hy(l.hr).toFixed(1)}`).join(' ')}"/>` +
    L.map((l, i) => `<circle class="lapdot" r="3.5" cx="${m.l + i * bw + bw / 2}" cy="${hy(l.hr)}"><title>${esc(l.label)} avg HR ${l.hr}</title></circle>`).join('');
  [hmin + 6, (hmin + hmax) / 2, hmax - 6].forEach(h => { g += `<text class="hraxis" x="${W - m.r + 6}" y="${hy(h) + 4}">${Math.round(h)}</text>`; });
  return `<div class="chart lapchart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Pace and heart rate by lap">${g}${labels}</svg>` +
    `<p class="muted">Bars: pace per lap in min/km (taller is faster). Line: average HR per lap (bpm, right axis).</p></div>`;
}

function renderWeight() {
  const wts = [...(db.weight || [])].sort((a, b) => a.date < b.date ? -1 : 1);
  if (!wts.length) { $('chart-weight').innerHTML = '<p class="muted">No weigh-ins yet.</p>'; return; }
  const first = wts[0], last = wts[wts.length - 1], change = last.kg - first.kg;
  lineChart($('chart-weight'), [{ kind: 'line', cls: 'c0', endLabel: `${last.kg} kg`, pts: wts.map(w => ({ t: parseD(w.date).getTime(), v: w.kg, tip: `${fmtDate(w.date)}: ${w.kg} kg${w.note ? '. ' + w.note : ''}` })) }],
    { t0: parseD(first.date).getTime() - 14 * 864e5, minSpan: 4, steps: [0.5, 1, 2], fmt: v => v.toFixed(1), faster: 'up', label: 'Body weight over time' });
  $('weight-note').textContent = wts.length > 1 ? `${wts.length} weigh-ins since ${fmtDate(first.date)}. Change: ${change > 0 ? '+' : ''}${change.toFixed(1)} kg.` : `One weigh-in so far: ${last.kg} kg on ${fmtDate(last.date)}.`;
}
function renderBp() {
  const bp = [...(db.bp || [])].sort((a, b) => a.date < b.date ? -1 : 1);
  if (!bp.length) { $('chart-bp').innerHTML = '<p class="muted">No readings yet.</p>'; return; }
  const last = bp[bp.length - 1], tip = (b, k) => `${fmtDate(b.date)}: ${b.sys}/${b.dia}${b.note ? '. ' + b.note : ''}`;
  lineChart($('chart-bp'), [
    { kind: 'line', cls: 'c1', endLabel: `${last.sys} sys`, pts: bp.map(b => ({ t: parseD(b.date).getTime(), v: b.sys, tip: tip(b) })) },
    { kind: 'line', cls: 'c2', endLabel: `${last.dia} dia`, pts: bp.map(b => ({ t: parseD(b.date).getTime(), v: b.dia, tip: tip(b) })) }],
    { t0: parseD(bp[0].date).getTime() - 14 * 864e5, minSpan: 60, steps: [5, 10, 20], fmt: v => v.toFixed(0), faster: 'up', label: 'Blood pressure over time' });
  $('bp-note').textContent = `${bp.length} reading${bp.length > 1 ? 's' : ''}. Latest ${last.sys}/${last.dia} on ${fmtDate(last.date)}${last.note ? ' (' + last.note + ')' : ''}.`;
}
function renderRhr() {
  const G = db.garmin; if (!G || !G.rhrDaily.length) return;
  const pts = G.rhrDaily.map(([d, v]) => ({ t: parseD(d).getTime(), v, tip: `${fmtDate(d)}: resting HR ${v}` })), last = G.rhrDaily[G.rhrDaily.length - 1];
  lineChart($('chart-rhr'), [{ kind: 'ref', name: `Baseline ${G.rhrBaseline}`, pts: [{ t: 0, v: G.rhrBaseline }] }, { kind: 'line', cls: 'c2', noDots: true, endLabel: `${last[1]} bpm`, pts }],
    { t0: pts[0].t - 3 * 864e5, minSpan: 6, steps: [1, 2], fmt: v => v.toFixed(0), faster: 'up', label: 'Daily resting heart rate since mid August' });
  $('rhr-note').textContent = `Latest ${last[1]} bpm on ${fmtDate(last[0])}. Baseline about ${G.rhrBaseline} bpm. Source: Garmin daily summaries.`;
}
function renderTrends() {
  renderWeight(); renderBp(); renderRhr();
  const now = weekStart(today());
  const runs = db.runs.filter(r => r.date >= db.block.start);
  const start = weekStart(runs.map(r => r.date).sort()[0] || db.block.start), planKm = db.plan.filter(p => p.km);
  const lastPlan = planKm.map(p => weekStart(p.date)).sort().pop() || now;
  const weeks = weekKeys(start, lastPlan > now ? lastPlan : now), cats = weeks.map(k => ({ label: wkLabel(k) }));
  const inWeek = k => runs.filter(r => weekStart(r.date) === k);

  // 1. long run progression
  barChart($('chart-long'), cats, [{ name: 'Longest run', cls: 'bar bc1', vals: weeks.map(k => Math.max(0, ...inWeek(k).map(r => r.km))) }],
    { hollow: weeks.map(k => Math.max(0, ...planKm.filter(p => weekStart(p.date) === k).map(p => p.km))), refs: [{ v: 21.0975, label: 'Half marathon distance 21.1 km' }],
      fmt: v => v.toFixed(1), axisFmt: v => v, steps: [2, 5, 10], label: 'Longest run each week' });

  // 2. easy-run efficiency (speed in m/min per beat per minute)
  const eff = type => runs.filter(r => r.type === type && r.hr).sort((a, b) => a.date < b.date ? -1 : 1).map(r => {
    const v = (1000 / (r.secs / r.km / 60)) / r.hr;
    return { t: parseD(r.date).getTime(), v, tip: `${fmtDate(r.date)}: ${fmtPace(r.secs, r.km)} at avg HR ${r.hr}, efficiency ${v.toFixed(2)}` };
  });
  lineChart($('chart-eff'), [{ kind: 'line', cls: 'c3', endLabel: 'Easy', pts: eff('Easy') }, { kind: 'line', cls: 'c2', endLabel: 'Recovery', pts: eff('Recovery') }].filter(s => s.pts.length),
    { steps: [0.02, 0.05, 0.1], fmt: v => v.toFixed(2), faster: 'up', label: 'Easy-run efficiency over time' });

  // 3. rep progression
  const lt = l => l.time.split(':').reduce((a, n) => a * 60 + +n, 0);
  const sessions = runs.map(r => ({ r, reps: (r.laps || []).filter(l => /^Rep \d/.test(l.label) && !/abandoned/.test(l.label)) })).filter(s => s.reps.length >= 3).sort((a, b) => a.r.date < b.r.date ? -1 : 1);
  const repCls = ['c1', 'c3', 'c2', 'c0'], maxReps = Math.max(0, ...sessions.map(s => s.reps.length));
  const repCats = Array.from({ length: maxReps }, (_, i) => 'Rep ' + (i + 1));
  const sName = s => parseD(s.r.date).toLocaleDateString('en-GB', WEEKDAY_FMT);
  const pick = f => sessions.map((s, i) => ({ name: sName(s), cls: repCls[sessions.length - 1 - i], vals: repCats.map((_, j) => s.reps[j] ? f(s.reps[j]) : null) }));
  catLines($('chart-rep-pace'), repCats, pick(l => lt(l) / l.km), { steps: [5, 10, 15, 30], fmt: fmtTime, faster: 'down', label: 'Pace per rep, by session' });
  catLines($('chart-rep-hr'), repCats, pick(l => l.hr), { steps: [2, 5, 10], fmt: v => Math.round(v), faster: 'up', label: 'Average HR per rep, by session' });

  // 4. weekly volume split by HR zone (hours)
  const wz = weeks.map(k => { const z = [0, 0, 0, 0, 0, 0]; inWeek(k).forEach(r => { const zs = r.zones || [0, 0, 0, 0, 0]; z[0] += Math.max(0, r.secs - zs.reduce((a, b) => a + b, 0)); zs.forEach((s, i) => z[i + 1] += s); }); return z; });
  barChart($('chart-zones'), cats, [0, 1, 2, 3, 4, 5].map(n => ({ name: n ? 'Z' + n : '<Z1', cls: 'bar zf' + n, vals: wz.map(z => z[n] / 3600) })),
    { fmt: v => v.toFixed(1) + ' h', axisFmt: v => v + ' h', steps: [0.5, 1, 2], label: 'Weekly time by HR zone' });
  $('zones-legend').innerHTML = '<span class="z z0">&lt;Z1</span> ' + [1, 2, 3, 4, 5].map(n => `<span class="z z${n}">Z${n}</span>`).join(' ');

  // 5. weekly training load, with 4-week average
  const load = weeks.map(k => inWeek(k).reduce((a, r) => a + runLoad(r), 0));
  const first = load.findIndex(v => v > 0);
  const avg = load.map((_, i) => weeks[i] <= now && i >= first ? load.slice(Math.max(first, i - 3), i + 1).reduce((x, y) => x + y, 0) / (i - Math.max(first, i - 3) + 1) : null);
  barChart($('chart-load'), cats, [{ name: 'Training load', cls: 'bar bc2', vals: load.map((v, i) => weeks[i] <= now ? v : 0) }],
    { line: { name: '4-week average', vals: avg }, fmt: v => Math.round(v), axisFmt: v => v, steps: [50, 100, 200, 250], label: 'Weekly training load' });
}


// ---------- history tab (Garmin CSV, 2019 to now) ----------
function renderHistory() {
  const H = db.history; if (!H) return;
  $('history-notes').innerHTML = H.notes.map(sec => `<h4>${esc(sec.heading)}</h4><ul>${sec.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`).join('');

  // weekly distance and longest run: this block vs the marathon block, by week of block (week 1 contains 1 Sept)
  const wk0 = parseD(weekStart(db.block.start)).getTime(), idxOf = d => Math.round((parseD(weekStart(d)).getTime() - wk0) / (7 * 864e5));
  const cur = idxOf(today()), mine = {};
  db.runs.filter(r => r.date >= db.block.start).forEach(r => { const w = mine[idxOf(r.date)] ||= { km: 0, long: 0 }; w.km += r.km; w.long = Math.max(w.long, r.km); });
  const n = H.block.length, cats = Array.from({ length: n }, (_, i) => String(i + 1)), mark = [{ i: n - 1, label: 'Marathon 12 Apr' }];
  const both = f => [{ name: '2025/26', cls: 'c2', vals: H.block.map(f) }, { name: 'Now', cls: 'c1', vals: cats.map((_, i) => i <= cur ? f(mine[i] || { km: 0, long: 0 }) : null) }];
  catLines($('chart-hist-km'), cats, both(w => w.km), { steps: [5, 10, 20], fmt: v => v.toFixed(0), faster: 'up', labelEvery: 4, marks: mark, label: 'Weekly distance, this block against the marathon block' });
  const bothLong = both(w => w.long); bothLong[0].vals[n - 1] = null;   // leave the 45 km race out so the weekly long runs stay readable
  catLines($('chart-hist-long'), cats, bothLong, { steps: [2, 5, 10], fmt: v => v.toFixed(0), faster: 'up', labelEvery: 4, marks: mark, label: 'Longest run each week, this block against the marathon block' });

  // monthly distance
  const inMarathon = m => m >= '2025-09' && m <= '2026-04', inNow = m => m >= db.block.start.slice(0, 7);
  const mcats = H.monthly.map(x => ({ label: new Date(x.m + '-01T12:00:00').toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }) }));
  const pick = f => H.monthly.map(x => f(x.m) ? x.km : 0);
  barChart($('chart-hist-month'), mcats, [{ name: 'Other months', cls: 'bar bc2', vals: pick(m => !inMarathon(m) && !inNow(m)) },
    { name: 'Marathon block', cls: 'bar bc3', vals: pick(inMarathon) }, { name: 'This block', cls: 'bar bc1', vals: pick(inNow) }],
    { fmt: v => v.toFixed(0) + ' km', axisFmt: v => v, steps: [25, 50, 100], noTotals: true, labelEvery: 6, label: 'Running distance per month since mid-2022' });

  // easy-run efficiency by month
  const ts = m => parseD(m + '-15').getTime();
  lineChart($('chart-hist-eff'), [{ kind: 'line', cls: 'c3', endLabel: 'Easy runs', pts: H.eff.map(e => ({ t: ts(e.m), v: e.ef, tip: `${e.m}: efficiency ${e.ef} from ${e.n} runs, average ${fmtTime(e.pace)}/km at HR ${e.hr}` })) }],
    { t0: parseD('2025-01-01').getTime(), steps: [0.02, 0.05, 0.1], fmt: v => v.toFixed(2), faster: 'up', label: 'Easy-run efficiency by month' });

  const G = db.garmin;
  if (G) {
    lineChart($('chart-hist-rhr'), [{ kind: 'line', cls: 'c2', noDots: true, endLabel: `${G.rhrWeekly[G.rhrWeekly.length - 1][1]} bpm`, pts: G.rhrWeekly.map(([d, v]) => ({ t: parseD(d).getTime(), v, tip: `Week from ${fmtDate(d)}: resting HR ${v}` })) }],
      { t0: parseD('2024-01-01').getTime(), steps: [1, 2, 5], fmt: v => v.toFixed(0), faster: 'up', label: 'Weekly average resting heart rate since 2024' });
    lineChart($('chart-hist-vo2'), [{ kind: 'line', cls: 'c3', noDots: true, endLabel: `${G.vo2Monthly[G.vo2Monthly.length - 1][1]}`, pts: G.vo2Monthly.map(([m, v]) => ({ t: parseD(m + '-15').getTime(), v, tip: `${m}: Garmin VO2 max ${v}` })) }],
      { t0: parseD('2020-01-01').getTime(), t1: parseD('2026-12-01').getTime(), steps: [1, 2, 5], fmt: v => v.toFixed(0), faster: 'up', label: 'Garmin VO2 max by month since 2020' });
  }
  // race-effort fitness (VDOT)
  const ser = (dist, cls, kind) => ({ kind: 'line', cls, noLine: kind === 'steady', endLabel: kind === 'race' ? dist : '',
    pts: H.efforts.filter(e => e.dist === dist && e.kind === kind).map(e => ({ t: parseD(e.date).getTime(), v: e.vdot,
      tip: `${fmtDate(e.date)}: ${dist} ${fmtTime(e.secs)} (${e.km} km)${e.hr ? `, HR ${e.hr}/${e.mhr}` : ''}, VDOT ${e.vdot}${kind === 'steady' ? '. Steady effort, not a race' : ''}` })) });
  const est = sortedEsts().slice(-1)[0];
  lineChart($('chart-hist-vdot'), [...(est ? [{ kind: 'ref', name: `Estimate now ${est.vdot}`, pts: [{ t: 0, v: est.vdot }] }] : []),
    ser('5K', 'c1', 'race'), ser('10K', 'c2', 'race'), ser('HM', 'c3', 'race'),
    { kind: 'line', cls: 'c4', noLine: true, pts: H.efforts.filter(e => e.kind === 'steady').map(e => ({ t: parseD(e.date).getTime(), v: e.vdot, tip: `${fmtDate(e.date)}: ${e.dist} ${fmtTime(e.secs)} (${e.km} km), HR ${e.hr}/${e.mhr}, VDOT ${e.vdot}. Steady effort, not a race` })) }].filter(s => s.pts.length),
    { t0: parseD('2019-01-01').getTime(), t1: parseD('2026-12-01').getTime(), steps: [1, 2, 5], fmt: v => v.toFixed(0), faster: 'up', label: 'Fitness (VDOT) from race efforts, 2019 to now' });
}

// ---------- long-term training plan (Training tab) ----------
const PHASE_RACE = { found: 'base', reset1: 'base', reset2: 'base', hm1: 'hm', hm2: 'hm', hms: 'hm', hmt: 'hm', k10: 'k10', k10t: 'k10', k5: 'k5', k5t: 'k5' };
const PHASE_SHORT = { found: 'Base', hm1: 'HM build 1', hm2: 'HM build 2', hms: 'HM specific', hmt: 'Taper', reset1: 'Reset', k10: '10K build', k10t: 'Taper', reset2: 'Reset', k5: '5K', k5t: 'Taper' };
const planWeekEnd = w => { const d = parseD(w.start); d.setDate(d.getDate() + 6); return iso(d); };
function weekActual(k) {
  const rs = db.runs.filter(r => weekStart(r.date) === k);
  return { km: rs.reduce((a, r) => a + r.km, 0), long: Math.max(0, ...rs.map(r => r.km)), n: rs.length };
}
function planStatus(w) {
  const t = today(); if (t < w.start) return '';
  if (t <= planWeekEnd(w)) return 'in progress';
  const r = weekActual(w.start).km / w.km; return r < 0.85 ? 'under' : r > 1.15 ? 'over' : 'on plan';
}

// weekly distance (or long run): actual bars against the dotted plan, with phase bands and race markers
function planChart(el, metric) {
  const P = db.longPlan; if (!P || !P.weeks.length) return;
  const first = weekStart(db.runs.map(r => r.date).filter(d => d >= db.block.start).sort()[0] || db.block.start), last = P.weeks[P.weeks.length - 1].start;
  const weeks = weekKeys(first, last), N = weeks.length, now = weekStart(today());
  const W = 760, H = 320, m = { l: 44, r: 14, t: 48, b: 34 }, cw = (W - m.l - m.r) / N, x = i => m.l + (i + 0.5) * cw;
  const val = k => weekActual(k)[metric], planOf = k => { const w = P.weeks.find(p => p.start === k); return w ? w : null; };
  const maxV = Math.max(1, ...weeks.map(k => weeks.indexOf(k) <= weeks.indexOf(now) ? val(k) : 0), ...P.weeks.map(w => w[metric]));
  const [step, top] = niceTop(maxV, metric === 'km' ? [5, 10, 20] : [2, 5, 10]);
  const y = v => m.t + (1 - v / top) * (H - m.t - m.b), idx = k => weeks.indexOf(k);
  let g = '', labels = '';
  P.phases.forEach(p => {
    const i0 = idx(p.start), i1 = idx(weekStart(p.end)); if (i0 < 0) return;
    const taper = /taper|race/i.test(p.name);
    g += `<rect x="${m.l + i0 * cw}" y="${m.t}" width="${(i1 - i0 + 1) * cw}" height="${H - m.t - m.b}" class="pband pb-${PHASE_RACE[p.id]}${taper ? ' pb-strong' : ''}"><title>${esc(p.name)}: ${esc(p.focus)}</title></rect>`;
    if ((i1 - i0 + 1) * cw >= 46) labels += `<text class="plab" x="${m.l + (i0 + (i1 - i0 + 1) / 2) * cw}" y="${m.t + 12}" text-anchor="middle">${esc(PHASE_SHORT[p.id])}</text>`;
  });
  for (let v = 0; v <= top + 1e-9; v += step) g += `<line x1="${m.l}" x2="${W - m.r}" y1="${y(v)}" y2="${y(v)}" class="grid"/><text x="${m.l - 6}" y="${y(v) + 4}" text-anchor="end">${v}</text>`;
  let lastMonth = '';
  weeks.forEach((k, i) => { const d = parseD(k), lab = d.toLocaleDateString('en-GB', { month: 'short' }) + " '" + String(d.getFullYear()).slice(2);
    if (lab !== lastMonth && d.getDate() <= 7) { lastMonth = lab; g += `<text x="${x(i)}" y="${H - 10}" text-anchor="middle">${lab}</text>`; } });
  weeks.forEach((k, i) => { if (i <= idx(now)) { const v = val(k); if (v > 0) g += `<rect x="${x(i) - cw * 0.34}" y="${y(v)}" width="${cw * 0.68}" height="${y(0) - y(v)}" class="bar bc1"><title>Week from ${fmtDate(k)}: ${v.toFixed(1)} km actual</title></rect>`; } });
  const pw = P.weeks.map(w => ({ w, i: idx(w.start) })).filter(p => p.i >= 0);
  g += `<polyline points="${pw.map(p => `${x(p.i).toFixed(1)},${y(p.w[metric]).toFixed(1)}`).join(' ')}" class="proj c2"/>`;
  pw.forEach(({ w, i }) => {
    const done = w.start <= now, act = done ? val(w.start) : null, tip = `Week from ${fmtDate(w.start)}: plan ${w[metric]} km (${w.type})${act != null && w.start < now ? `, actual ${act.toFixed(1)} km` : ''}`;
    if (w.type === 'race') g += `<path d="M${x(i)},${y(w[metric]) - 7} l6,7 l-6,7 l-6,-7 z" class="pdia"><title>${esc(tip)}</title></path>`;
    else g += `<circle cx="${x(i)}" cy="${y(w[metric])}" r="${w.type === 'recovery' || w.type === 'taper' || w.type === 'reset' ? 3.6 : 2.6}" class="pdot ${w.type === 'recovery' || w.type === 'taper' || w.type === 'reset' ? 'hollow-dot' : ''}"><title>${esc(tip)}</title></circle>`;
  });
  [...db.goals].sort((a, b) => a.date < b.date ? -1 : 1).forEach((gl, gi) => { const i = idx(weekStart(gl.date)); if (i < 0) return;
    g += `<line x1="${x(i)}" x2="${x(i)}" y1="${m.t - 6}" y2="${H - m.b}" class="ref"/>`; labels += `<text class="rlab" x="${Math.min(x(i), W - 6)}" y="${m.t - 12 - (gi % 2) * 13}" text-anchor="${x(i) > W - 70 ? 'end' : 'middle'}">${esc(shortName(gl))} ${parseD(gl.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</text>`; });
  if (idx(now) >= 0) g += `<line x1="${x(idx(now))}" x2="${x(idx(now))}" y1="${m.t}" y2="${H - m.b}" class="todayline"/>`;
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${metric === 'km' ? 'Weekly distance' : 'Longest run'}: actual against the training plan">${g}${labels}</svg>`;
}

function renderPlan() {
  const P = db.longPlan; if (!P) return;
  planChart($('chart-plan-km'), 'km'); planChart($('chart-plan-long'), 'long');
  $('plan-legend').innerHTML = '<span><span class="sw sw-base"></span>Base / reset</span> <span><span class="sw sw-hm"></span>Half marathon</span> <span><span class="sw sw-k10"></span>10K</span> <span><span class="sw sw-k5"></span>5K</span>';
  const now = weekStart(today());
  const fmtD = s => parseD(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' });
  $('plan-phases').innerHTML = '<table><thead><tr><th>Phase</th><th>Dates</th><th>Weeks</th><th>Weekly km</th><th>Long run</th><th>Focus</th></tr></thead><tbody>' +
    P.phases.map(p => `<tr><td><b>${esc(p.name)}</b></td><td>${fmtD(p.start)} to ${fmtD(p.end)}</td><td class="num">${p.weeks}</td><td>${p.kmMin === p.kmMax ? p.kmMax : p.kmMin + ' to ' + p.kmMax}</td><td>${p.longMax == null ? '' : p.longMin === p.longMax ? p.longMax : p.longMin + ' to ' + p.longMax} km</td><td class="notes">${esc(p.focus)}</td></tr>`).join('') + '</tbody></table>';
  $('plan-assumptions').innerHTML = '<h4>Assumptions to check</h4><ul>' + P.assumptions.map(a => `<li>${esc(a)}</li>`).join('') + '</ul>';
  $('plan-weeks').innerHTML = P.phases.map(p => {
    const ws = P.weeks.filter(w => w.phase === p.id), cur = p.start <= iso(new Date()) && iso(new Date()) <= p.end || (ws.some(w => w.start === now));
    return `<details${cur ? ' open' : ''}><summary>${esc(p.name)} <span class="muted">${fmtD(p.start)} to ${fmtD(p.end)}</span></summary><div class="table-wrap"><table><thead><tr><th>Week from</th><th>Type</th><th>Plan km</th><th>Actual km</th><th>Long run plan / actual</th><th>Status</th><th>Sessions</th></tr></thead><tbody>` +
      ws.map(w => { const a = weekActual(w.start), st = planStatus(w), past = w.start <= now;
        return `<tr><td>${fmtDate(w.start)}</td><td>${esc(w.type)}</td><td class="num">${w.km}</td><td class="num">${past ? a.km.toFixed(1) : ''}</td><td>${w.long} km${past && w.start < now ? ' / ' + a.long.toFixed(1) : ''}</td>` +
          `<td>${st ? `<span class="st st-${st.replace(' ', '-')}">${st}</span>` : ''}</td>` +
          `<td class="notes"><b>Sat</b> ${esc(w.sat)}<br><b>Sun</b> ${esc(w.sun)}<br><b>Mon</b> ${esc(w.mon)}<br><b>Wed</b> ${esc(w.wed)}${w.opt ? `<br>${esc(w.opt)}` : ''}${w.fuel ? `<br><b>Fuel</b> ${esc(w.fuel)}` : ''}${w.note ? `<br><span class="muted">${esc(w.note)}</span>` : ''}</td></tr>`; }).join('') + '</tbody></table></div></details>'; }).join('');
  $('plan-checkpoints').innerHTML = '<table><thead><tr><th>Date</th><th>Checkpoint</th><th>Target</th></tr></thead><tbody>' +
    P.checkpoints.map(c => `<tr class="${c.date < today() ? 'past' : ''}"><td>${fmtDate(c.date)}</td><td><b>${esc(c.what)}</b></td><td class="notes">${esc(c.target)}</td></tr>`).join('') + '</tbody></table>';
  $('plan-principles').innerHTML = P.principles.map(s => `<h4>${esc(s.heading)}</h4><ul>${s.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`).join('');
  $('plan-races').innerHTML = P.races.map(r => `<h4>${esc(r.name)}</h4><ul>${r.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`).join('');
}

// ---------- tabs ----------
function showTab(name) {
  if (!document.querySelector(`[data-panel="${name}"]`)) name = 'train';
  document.querySelectorAll('[data-panel]').forEach(p => p.hidden = p.dataset.panel !== name);
  document.querySelectorAll('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === name));
  history.replaceState(null, '', '#' + name);
}
$('tabs').addEventListener('click', e => e.target.dataset.tab && showTab(e.target.dataset.tab));

function render() {
  document.querySelectorAll('.u').forEach(e => e.textContent = units);
  renderStats(); renderNext(); renderChart(); renderTable(); renderProfile(); renderReview(); renderTrends(); renderHistory(); renderPlan();
  Object.keys(COLS).forEach(renderCol);
}

render(); showTab(location.hash.slice(1) || 'train');
