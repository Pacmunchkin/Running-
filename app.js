'use strict';
const KM_PER_MI = 1.609344;
const $ = id => document.getElementById(id);
const store = {
  load(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  save(k, v) { localStorage.setItem(k, JSON.stringify(v)); }
};
let runs = store.load('runs', []);          // distance always stored in km
let units = store.load('units', 'km');
let sort = { key: 'date', dir: -1 };

const toUnit = km => units === 'mi' ? km / KM_PER_MI : km;
const fromUnit = v => units === 'mi' ? v * KM_PER_MI : v;
const fmtDist = km => toUnit(km).toFixed(2);
const fmtTime = s => {
  s = Math.round(s); const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), sec = s % 60;
  return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(sec).padStart(2, '0');
};
const fmtPace = (secs, km) => km > 0 ? fmtTime(secs / toUnit(km)) + '/' + units : '–';
const parseTime = t => {
  const p = t.trim().split(':').map(Number);
  if (p.some(isNaN) || p.length < 2 || p.length > 3) return NaN;
  return p.reduce((a, n) => a * 60 + n, 0);
};
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const persist = () => { store.save('runs', runs); render(); };
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

function render() {
  document.querySelectorAll('.u').forEach(e => e.textContent = units);
  $('units').value = units;
  renderStats(); renderChart(); renderTable();
}

function renderStats() {
  const km = runs.reduce((a, r) => a + r.km, 0), secs = runs.reduce((a, r) => a + r.secs, 0);
  const longest = runs.reduce((m, r) => r.km > m ? r.km : m, 0);
  const best = runs.filter(r => r.km >= 1).reduce((m, r) => (!m || r.secs / r.km < m.secs / m.km) ? r : m, null);
  const monthKey = new Date().toISOString().slice(0, 7);
  const month = runs.filter(r => r.date.startsWith(monthKey)).reduce((a, r) => a + r.km, 0);
  const items = [
    ['Total runs', runs.length], [`Total ${units}`, fmtDist(km)], ['This month', fmtDist(month) + ' ' + units],
    ['Avg pace', fmtPace(secs, km)], ['Longest', fmtDist(longest) + ' ' + units],
    ['Best pace', best ? fmtPace(best.secs, best.km) : '–'], ['Total time', fmtTime(secs)]
  ];
  $('stats').innerHTML = items.map(([l, v]) => `<div class="stat"><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join('');
}

function weekStart(d) { // Monday, local-time, as YYYY-MM-DD
  const [y, m, day] = d.split('-').map(Number), dt = new Date(y, m - 1, day);
  dt.setDate(dt.getDate() - (dt.getDay() + 6) % 7);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
}
function renderChart() {
  const now = new Date(), weeks = [];
  const cur = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  cur.setDate(cur.getDate() - (cur.getDay() + 6) % 7 - 77);
  for (let i = 0; i < 12; i++) {
    weeks.push({ key: weekStart(`${cur.getFullYear()}-${cur.getMonth() + 1}-${cur.getDate()}`), km: 0, label: `${cur.getMonth() + 1}/${cur.getDate()}` });
    cur.setDate(cur.getDate() + 7);
  }
  runs.forEach(r => { const w = weeks.find(w => w.key === weekStart(r.date)); if (w) w.km += r.km; });
  const max = Math.max(1, ...weeks.map(w => toUnit(w.km))), W = 600, H = 180, bw = W / 12;
  $('chart').innerHTML = `<svg viewBox="0 0 ${W} ${H + 24}" role="img" aria-label="Weekly distance">` + weeks.map((w, i) => {
    const v = toUnit(w.km), h = v / max * (H - 20);
    return `<rect x="${i * bw + 6}" y="${H - h}" width="${bw - 12}" height="${h}" rx="3"><title>${w.label}: ${v.toFixed(1)} ${units}</title></rect>` +
      (v ? `<text x="${i * bw + bw / 2}" y="${H - h - 4}" text-anchor="middle">${v.toFixed(0)}</text>` : '') +
      `<text x="${i * bw + bw / 2}" y="${H + 16}" text-anchor="middle">${w.label}</text>`;
  }).join('') + '</svg>';
}

function renderTable() {
  const q = $('search').value.toLowerCase();
  const val = r => sort.key === 'pace' ? r.secs / r.km : sort.key === 'dist' ? r.km : r[sort.key];
  const list = runs.filter(r => !q || (r.notes + ' ' + r.type).toLowerCase().includes(q))
    .sort((a, b) => (val(a) > val(b) ? 1 : val(a) < val(b) ? -1 : 0) * sort.dir);
  $('empty').hidden = runs.length > 0;
  $('rows').innerHTML = list.map(r => `<tr>
    <td>${esc(r.date)}</td><td>${fmtDist(r.km)} ${units}</td><td>${fmtTime(r.secs)}</td><td>${fmtPace(r.secs, r.km)}</td>
    <td>${esc(r.type)}</td><td>${r.hr ?? ''}</td><td class="notes">${esc(r.notes)}</td>
    <td><button class="link" data-edit="${r.id}">Edit</button><button class="link" data-del="${r.id}">Delete</button></td></tr>`).join('');
}

function resetForm() {
  $('run-form').reset(); $('run-id').value = ''; $('date').value = new Date().toLocaleDateString('en-CA');
  $('form-title').textContent = 'Add a run'; $('cancel').hidden = true;
}

$('run-form').addEventListener('submit', e => {
  e.preventDefault();
  const secs = parseTime($('time').value), km = fromUnit(parseFloat($('distance').value));
  if (!(secs > 0) || !(km > 0)) return alert('Please enter a valid distance and time.');
  const run = { id: $('run-id').value || uid(), date: $('date').value, km, secs, type: $('type').value,
    hr: $('hr').value ? +$('hr').value : null, notes: $('notes').value.trim() };
  const i = runs.findIndex(r => r.id === run.id);
  i >= 0 ? runs[i] = run : runs.push(run);
  resetForm(); persist();
});
$('cancel').onclick = resetForm;
$('units').onchange = e => { units = e.target.value; store.save('units', units); render(); };
$('search').oninput = renderTable;
document.querySelector('thead').addEventListener('click', e => {
  const k = e.target.dataset.sort; if (!k) return;
  sort = { key: k, dir: sort.key === k ? -sort.dir : -1 }; renderTable();
});
$('rows').addEventListener('click', e => {
  const { edit, del } = e.target.dataset;
  if (del && confirm('Delete this run?')) { runs = runs.filter(r => r.id !== del); persist(); }
  if (edit) {
    const r = runs.find(r => r.id === edit);
    $('run-id').value = r.id; $('date').value = r.date; $('distance').value = +toUnit(r.km).toFixed(2);
    $('time').value = fmtTime(r.secs); $('type').value = r.type; $('hr').value = r.hr ?? ''; $('notes').value = r.notes;
    $('form-title').textContent = 'Edit run'; $('cancel').hidden = false; scrollTo({ top: 0, behavior: 'smooth' });
  }
});

function download(name, text, mime) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: mime })); a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
const csvCell = v => /[",\n]/.test(v = String(v ?? '')) ? '"' + v.replace(/"/g, '""') + '"' : v;
$('export-csv').onclick = () => download('runs.csv',
  ['date,distance_km,time_seconds,type,avg_hr,notes', ...[...runs].sort((a, b) => a.date < b.date ? -1 : 1)
    .map(r => [r.date, r.km.toFixed(3), r.secs, r.type, r.hr ?? '', r.notes].map(csvCell).join(','))].join('\n'), 'text/csv');
$('export-json').onclick = () => download('runs-backup.json', JSON.stringify(runs, null, 2), 'application/json');

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
$('import').onchange = async e => {
  const file = e.target.files[0]; e.target.value = ''; if (!file) return;
  try {
    const text = await file.text(); let incoming;
    if (file.name.endsWith('.json')) incoming = JSON.parse(text);
    else {
      const [head, ...body] = parseCSV(text), col = n => head.findIndex(h => h.trim().toLowerCase() === n);
      const [d, k, s, t, h, n] = ['date', 'distance_km', 'time_seconds', 'type', 'avg_hr', 'notes'].map(col);
      incoming = body.map(r => ({ date: r[d], km: parseFloat(r[k]), secs: parseFloat(r[s]), type: r[t] || 'Other', hr: r[h] ? +r[h] : null, notes: r[n] || '' }));
    }
    const ok = incoming.filter(r => /^\d{4}-\d{2}-\d{2}$/.test(r.date) && r.km > 0 && r.secs > 0)
      .map(r => ({ id: r.id || uid(), date: r.date, km: +r.km, secs: +r.secs, type: r.type || 'Other', hr: r.hr || null, notes: r.notes || '' }));
    const seen = new Set(runs.map(r => `${r.date}|${r.km.toFixed(2)}|${r.secs}`));
    const fresh = ok.filter(r => !seen.has(`${r.date}|${r.km.toFixed(2)}|${r.secs}`));
    runs.push(...fresh); persist();
    alert(`Imported ${fresh.length} runs (${incoming.length - fresh.length} skipped as invalid or duplicate).`);
  } catch (err) { alert('Could not import file: ' + err.message); }
};

resetForm(); render();
