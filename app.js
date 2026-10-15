'use strict';
const KM_PER_MI = 1.609344;
const $ = id => document.getElementById(id);
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } }
};
const clone = o => JSON.parse(JSON.stringify(o));
let db = store.get('rl_db') || clone(SEED);
if (db.rev !== SEED.rev) {   // saved by an older version of the site
  const keep = db.runs && db.runs.length && !confirm('This version adds detailed Garmin data (laps, HR zones, ascent, shoes).\n\nOK = replace your saved data with the new starter data.\nCancel = keep your current data (Profile → Reset to starter data loads it later).');
  if (keep) db.rev = SEED.rev; else db = clone(SEED);
  store.set('rl_db', db);
}
let units = store.get('rl_units') || 'km';
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
const persist = () => { store.set('rl_db', db); render(); };

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
    ['Total time', fmtTime(secs)], ['Total ascent', runs.reduce((a, r) => a + (r.asc || 0), 0) + ' m']
  ];
  $('stats').innerHTML = items.map(([l, v]) => `<div class="stat"><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join('');
}

function renderNext() {
  const up = db.plan.filter(p => p.date >= today()).sort((a, b) => a.date < b.date ? -1 : 1).slice(0, 5);
  $('next').innerHTML = up.length
    ? up.map(p => `<li><b>${fmtDate(p.date)}</b> — ${esc(p.session)}${p.details ? ' <span class="muted">(' + esc(p.details) + ')</span>' : ''}</li>`).join('')
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
  return `<div class="meta">${meta}</div>${zones}${laps}`;
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
    <td><button class="link" data-more="${r.id}">${openRuns.has(r.id) ? 'Hide' : 'Details'}</button><button class="link" data-del="${r.id}">Delete</button></td></tr>` +
    (openRuns.has(r.id) ? `<tr class="detail"><td colspan="8">${detailHtml(r)}</td></tr>` : '')).join('');
}

$('units').onchange = e => { units = e.target.value; store.set('rl_units', units); render(); };
$('search').oninput = renderTable;
document.querySelector('thead').addEventListener('click', e => {
  const k = e.target.dataset.sort; if (!k) return;
  sort = { key: k, dir: sort.key === k ? -sort.dir : -1 }; renderTable();
});
$('rows').addEventListener('click', e => {
  const { del, more } = e.target.dataset;
  if (more) { openRuns.has(more) ? openRuns.delete(more) : openRuns.add(more); renderTable(); }
  if (del && confirm('Delete this run?')) { db.runs = db.runs.filter(r => r.id !== del); persist(); }
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
    single: 'session', fields: [['date', 'Date', 'date', 1], ['session', 'Session', 'text', 1], ['details', 'Details', 'text']],
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
const PROFILE_FIELDS = [['name', 'Name', 'text'], ['location', 'Location', 'text'], ['phase', 'Training phase', 'text'], ['longDay', 'Long/tempo day', 'text'],
  ['week', 'Running week', 'text'], ['maxHr', 'Max HR seen (bpm)', 'number'], ['maxHrNote', 'Max HR note', 'text'],
  ['z1', 'Zone 1 starts at (bpm)', 'number'], ['z2', 'Zone 2 starts at', 'number'], ['z3', 'Zone 3 starts at', 'number'],
  ['z4', 'Zone 4 starts at', 'number'], ['z5', 'Zone 5 starts at', 'number'], ['zoneNote', 'Zone note', 'text']];

function renderCol(key) {
  const c = COLS[key], shown = c.fields.filter(f => !(c.hide || []).includes(f[0]));
  const items = [...db[key]]; if (c.sort) items.sort(c.sort);
  $('c-' + key).innerHTML = items.length
    ? `<table><thead><tr>${shown.map(f => `<th>${esc(f[1])}</th>`).join('')}${(c.extra || []).map(x => `<th>${esc(x[0])}</th>`).join('')}<th></th></tr></thead><tbody>` +
      items.map(it => `<tr>${shown.map(([k, , t]) => `<td${t === 'number' ? ' class="num"' : ''}>${t === 'date' ? fmtDate(it[k]) : esc(it[k])}</td>`).join('')}` +
        (c.extra || []).map(x => `<td>${x[1](it)}</td>`).join('') +
        `<td><button class="link" data-ed="${key}:${it.id}">Edit</button><button class="link" data-rm="${key}:${it.id}">Delete</button></td></tr>`).join('') + '</tbody></table>'
    : '<p class="muted">Nothing here yet.</p>';
}

let ctx = null;
function openDlg(key, id) {
  const profile = key === 'profile', fields = profile ? PROFILE_FIELDS : COLS[key].fields;
  const item = profile ? db.profile : (id ? db[key].find(i => i.id === id) : {});
  $('dlg-title').textContent = profile ? 'Edit runner details' : `${id ? 'Edit' : 'Add'} ${COLS[key].single}`;
  $('dlg-fields').innerHTML = fields.map(([k, l, t, req]) =>
    `<label>${esc(l)}<input name="${k}" type="${t}" ${t === 'number' ? 'step="any"' : ''} ${req ? 'required' : ''} value="${esc(item[k] ?? '')}"></label>`).join('');
  ctx = { key, id, fields }; $('dlg').showModal();
}
$('dlg-form').addEventListener('submit', e => {
  e.preventDefault();
  const fd = new FormData(e.target), out = {};
  ctx.fields.forEach(([k, , t]) => { const v = fd.get(k).trim(); out[k] = t === 'number' ? (v === '' ? null : parseFloat(v)) : v; });
  if (ctx.key === 'profile') Object.assign(db.profile, out);
  else if (ctx.id) Object.assign(db[ctx.key].find(i => i.id === ctx.id), out);
  else db[ctx.key].push({ id: uid(), ...out });
  $('dlg').close(); persist();
});
$('dlg-cancel').onclick = () => $('dlg').close();
document.addEventListener('click', e => {
  const d = e.target.dataset;
  if (d.add) openDlg(d.add);
  if (d.ed) openDlg(...d.ed.split(':'));
  if (d.editProfile !== undefined) openDlg('profile');
  if (d.rm) {
    const [key, id] = d.rm.split(':');
    if (confirm('Delete this entry?')) { db[key] = db[key].filter(i => i.id !== id); persist(); }
  }
});

// ---------- profile ----------
function renderProfile() {
  const p = db.profile;
  $('who').textContent = [p.name, p.location, p.phase].filter(Boolean).join(' · ');
  $('profile').innerHTML = [['Name', p.name], ['Location', p.location], ['Phase', p.phase], ['Long/tempo day', p.longDay], ['Running week', p.week],
    ['Max HR seen', p.maxHr ? p.maxHr + ' bpm' + (p.maxHrNote ? ` (${p.maxHrNote})` : '') : '']]
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
  const t0 = parseD(db.block.start).getTime(), t1 = o.t1 || Math.max(...pts.map(p => p.t)) + 7 * 864e5;
  let lo = Math.min(...pts.map(p => p.v)), hi = Math.max(...pts.map(p => p.v)); const pad = (hi - lo || 1) * 0.1; lo -= pad; hi += pad;
  const step = o.steps.find(s => (hi - lo) / s <= 6) || o.steps[o.steps.length - 1];
  const yTicks = []; for (let v = Math.ceil(lo / step) * step; v <= hi; v += step) yTicks.push(v);
  const x = t => m.l + (t - t0) / (t1 - t0) * (W - m.l - m.r);
  const y = v => o.faster === 'down' ? m.t + (v - lo) / (hi - lo) * (H - m.t - m.b) : m.t + (hi - v) / (hi - lo) * (H - m.t - m.b);   // 'down': lower values are better and plot higher
  const spanDays = (t1 - t0) / 864e5, xTicks = [];
  if (spanDays > 120) { const d = parseD(iso(new Date(t0))); d.setDate(1); d.setMonth(d.getMonth() + 1); for (; d.getTime() <= t1; d.setMonth(d.getMonth() + (spanDays > 300 ? 2 : 1))) xTicks.push([new Date(d), d.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' })]); }
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
      g += `<polyline points="${poly}" class="ln ${s.cls}"/>` + s.pts.map(q => `<circle cx="${x(q.t)}" cy="${y(q.v)}" r="4" class="dot ${s.cls}"><title>${esc(q.tip)}</title></circle>`).join('');
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
    { kind: 'line', cls: 'c0', endLabel: `VO2 max ${ests.length ? ests[ests.length - 1].vdot.toFixed(1) : ''}`, pts: ests.map(e => ({ t: dt(e), v: e.vdot, tip: `${fmtDate(e.date)}: VDOT ${e.vdot}. ${e.basis}` })) }],
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
  $('units').value = units;
  renderStats(); renderNext(); renderChart(); renderTable(); renderProfile(); renderReview();
  Object.keys(COLS).forEach(renderCol);
}

// ---------- import / export ----------
function download(name, text, mime) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: mime })); a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
const csvCell = v => /[",\n]/.test(v = String(v ?? '')) ? '"' + v.replace(/"/g, '""') + '"' : v;
$('export-csv').onclick = () => download('runs.csv',
  ['date,distance_km,time_seconds,type,avg_hr,max_hr,shoe,notes,flag', ...[...db.runs].sort((a, b) => a.date < b.date ? -1 : 1)
    .map(r => [r.date, r.km.toFixed(3), r.secs, r.type, r.hr ?? '', r.maxhr ?? '', r.shoe, r.notes, r.flag].map(csvCell).join(','))].join('\n'), 'text/csv');
$('export-json').onclick = () => download(`run-log-backup-${today()}.json`, JSON.stringify(db, null, 2), 'application/json');

function parseCSV(text) {
  const rows = []; let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += c; }
    else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(cell); rows.push(row); row = []; cell = ''; }
    else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter(r => r.some(x => x.trim()));
}
function mergeRuns(incoming) {
  const key = r => `${r.date}|${r.km.toFixed(2)}|${r.secs}`;
  const ok = incoming.filter(r => /^\d{4}-\d{2}-\d{2}$/.test(r.date) && r.km > 0 && r.secs > 0)
    .map(r => ({ id: r.id || uid(), date: r.date, km: +r.km, secs: +r.secs, type: r.type || 'Other', hr: r.hr || null, maxhr: r.maxhr || null,
      shoe: r.shoe || '', notes: r.notes || '', flag: r.flag || '' }));
  const seen = new Set(db.runs.map(key)), fresh = ok.filter(r => !seen.has(key(r)));
  db.runs.push(...fresh); persist();
  alert(`Imported ${fresh.length} runs (${incoming.length - fresh.length} skipped as invalid or duplicate).`);
}
$('import').onchange = async e => {
  const file = e.target.files[0]; e.target.value = ''; if (!file) return;
  try {
    const text = await file.text();
    if (file.name.endsWith('.json')) {
      const data = JSON.parse(text);
      if (Array.isArray(data)) return mergeRuns(data);
      if (!Array.isArray(data.runs)) throw new Error('not a Run Log backup');
      if (!confirm(`Replace ALL current data with this backup (${data.runs.length} runs)?`)) return;
      db = { ...clone(SEED), ...data }; return persist();
    }
    const [head, ...body] = parseCSV(text), col = n => head.findIndex(h => h.trim().toLowerCase() === n);
    const [d, k, s, t, h, m, sh, n, f] = ['date', 'distance_km', 'time_seconds', 'type', 'avg_hr', 'max_hr', 'shoe', 'notes', 'flag'].map(col);
    mergeRuns(body.map(r => ({ date: r[d], km: parseFloat(r[k]), secs: parseFloat(r[s]), type: r[t], hr: +r[h], maxhr: +r[m], shoe: r[sh], notes: r[n], flag: r[f] })));
  } catch (err) { alert('Could not import file: ' + err.message); }
};
$('reset').onclick = () => {
  if (confirm('Replace ALL data in this browser with the starter data? This cannot be undone (back up first).')) { db = clone(SEED); persist(); }
};

render(); showTab(location.hash.slice(1) || 'train');
