'use strict';
const KM_PER_MI = 1.609344;
const TYPES = ['Easy', 'Recovery', 'Long/Tempo', 'Tempo', 'Intervals', 'Repeats', 'Trail', 'Parkrun', 'Race', 'Other'];
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
      `<div class="legend">${parts.map(([n, s]) => `<span><span class="z z${n}">${name(n)}</span> ${fmtTime(s)} (${Math.round(s / tot * 100)}%)</span>`).join('')}</div>`;
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
    <td><button class="link" data-more="${r.id}">${openRuns.has(r.id) ? 'Hide' : 'Details'}</button><button class="link" data-edit="${r.id}">Edit</button><button class="link" data-del="${r.id}">Delete</button></td></tr>` +
    (openRuns.has(r.id) ? `<tr class="detail"><td colspan="8">${detailHtml(r)}</td></tr>` : '')).join('');
}

function setTypeOptions(selected) {
  const opts = TYPES.includes(selected) || !selected ? TYPES : [...TYPES, selected];
  $('type').innerHTML = opts.map(t => `<option>${esc(t)}</option>`).join('');
  if (selected) $('type').value = selected;
}
function resetForm() {
  $('run-form').reset(); $('run-id').value = ''; setTypeOptions(); $('date').value = today();
  $('form-title').textContent = 'Add a run'; $('cancel').hidden = true;
}

$('run-form').addEventListener('submit', e => {
  e.preventDefault();
  const secs = parseTime($('time').value), km = fromUnit(parseFloat($('distance').value));
  if (!(secs > 0) || !(km > 0)) return alert('Please enter a valid distance and time.');
  const n = id => $(id).value ? +$(id).value : null;
  const run = { id: $('run-id').value || uid(), date: $('date').value, km, secs, type: $('type').value,
    hr: n('hr'), maxhr: n('maxhr'), shoe: $('shoe').value.trim(), notes: $('notes').value.trim(), flag: $('flag').value.trim() };
  const i = db.runs.findIndex(r => r.id === run.id);
  i >= 0 ? db.runs[i] = { ...db.runs[i], ...run } : db.runs.push(run);
  resetForm(); persist();
});
$('cancel').onclick = resetForm;
$('units').onchange = e => { units = e.target.value; store.set('rl_units', units); render(); };
$('search').oninput = renderTable;
document.querySelector('thead').addEventListener('click', e => {
  const k = e.target.dataset.sort; if (!k) return;
  sort = { key: k, dir: sort.key === k ? -sort.dir : -1 }; renderTable();
});
$('rows').addEventListener('click', e => {
  const { edit, del, more } = e.target.dataset;
  if (more) { openRuns.has(more) ? openRuns.delete(more) : openRuns.add(more); renderTable(); }
  if (del && confirm('Delete this run?')) { db.runs = db.runs.filter(r => r.id !== del); persist(); }
  if (edit) {
    const r = db.runs.find(r => r.id === edit);
    $('run-id').value = r.id; $('date').value = r.date; setTypeOptions(r.type); $('distance').value = +toUnit(r.km).toFixed(2);
    $('time').value = fmtTime(r.secs); $('hr').value = r.hr ?? ''; $('maxhr').value = r.maxhr ?? '';
    $('shoe').value = r.shoe || ''; $('notes').value = r.notes || ''; $('flag').value = r.flag || '';
    $('form-title').textContent = 'Edit run'; $('cancel').hidden = false; scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// ---------- generic editable lists (goals, plan, shoes, …) ----------
// fields: [key, label, input type, required]
const COLS = {
  goals: {
    single: 'goal', fields: [['event', 'Event', 'text', 1], ['race', 'Race', 'text'], ['date', 'Date', 'date'], ['distKm', 'Distance (km)', 'number', 1],
      ['target', 'Target time', 'text', 1], ['estimate', 'Current estimate', 'text'], ['notes', 'Notes', 'text']],
    hide: ['distKm'], sort: (a, b) => a.date < b.date ? -1 : 1,
    extra: [['Target pace', g => esc(fmtPace(parseTime(g.target), g.distKm))],
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
  $('shoe-list').innerHTML = db.shoes.filter(s => s.status !== 'Considered').map(s => `<option value="${esc(s.name)}">`).join('');
  renderStats(); renderNext(); renderChart(); renderTable(); renderProfile();
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

resetForm(); render(); showTab(location.hash.slice(1) || 'train');
