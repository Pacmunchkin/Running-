'use strict';
// Starter data, loaded the first time the site is opened (or via Profile → Reset to starter data).
// Distances are stored in km, times in seconds.
const T = s => s.split(':').map(Number).reduce((a, n) => a * 60 + n, 0);
const run = (date, type, km, time, hr, maxhr, notes = '', flag = '', shoe = '') =>
  ({ id: 'r' + date.replace(/-/g, ''), date, type, km, secs: T(time), hr, maxhr, shoe, notes, flag });

const SEED = {
  v: 1,
  profile: {
    name: 'Philip Coote', location: 'Bath, UK', phase: 'Phase 1 (Base Building)',
    longDay: 'Saturday = long/tempo day',
    week: 'Sat / Sun / Mon / Tue (rest) / Wed / Thu (rest) / Fri (yoga)',
    maxHr: 188, maxHrNote: 'possible sensor spike',
    z1: 85, z2: 102, z3: 135, z4: 155, z5: 160,
    zoneNote: 'Zone 2/3 boundary is 134/135 bpm'
  },
  runs: [
    run('2026-08-16', 'Race', 22.11, '2:11:33', 159, null, 'HM, Bath (ultra block). Avg 5:57/km'),
    run('2026-09-05', 'Easy', 9.71, '1:23:56', 139, 161, 'Post-HM recovery, 8:39/km'),
    run('2026-09-06', 'Recovery', 4.11, '37:07', 129, 156),
    run('2026-09-07', 'Easy', 8.08, '1:14:50', 128, 150, '9:16/km'),
    run('2026-09-09', 'Intervals', 6.54, '45:49', 127, 159, '3 x 3 min efforts, 4:10-4:45/km, old shoes',
      'Garmin labelled this "Tempo" but it was 3 x 3 min intervals'),
    run('2026-09-12', 'Long/Tempo', 8.50, '57:04', 132, 166,
      'Intended 10 km with 20 min Z4; two 10-min efforts at 5:06 and 5:09/km. First run in Torin 9', '', 'Altra Torin 9'),
    run('2026-09-13', 'Recovery', 5.92, '48:57', 114, 130, '8:16/km'),
    run('2026-09-14', 'Easy', 8.05, '51:03', 136, 151, 'Ran 6:21/km, about 1 bpm into Z3, intended Z2'),
    run('2026-09-19', 'Parkrun', 5.23, '27:47', 159, 188, 'Felt easy. Planned 12 km not done',
      'HR spike, later confirmed as incoming respiratory illness'),
    run('2026-09-26', 'Easy', 9.29, '1:11:20', 120, 144, 'Post-illness. 7:41/km, 92% Z2'),
    run('2026-09-27', 'Recovery', 3.48, '33:05', 108, 133, '9:30/km'),
    run('2026-09-30', 'Repeats', 8.38, '1:00:57', 129, 175,
      '1k repeats: 4:37, 4:22, 4:23, 4:22/km. Recoveries were 3 min (should be 1 min); 5th rep logged, abandoned'),
    run('2026-10-03', 'Trail', 6.88, '1:00:50', 133, 164, 'Trail long run (intended tempo). 209 m ascent, 2 x 10 min efforts'),
    run('2026-10-05', 'Easy', 7.93, '57:50', 127, 152, '7:18/km'),
    run('2026-10-07', 'Repeats', 9.23, '1:05:05', 135, 163, '1k repeats: 4:18, 4:12, 4:12, 4:10/km. 1 min recovery. Garmin PR flagged'),
    run('2026-10-10', 'Tempo', 8.17, '1:04:24', 139, 174,
      'Out and back: 10 min out at 5:44/km, 10 min back at 6:08/km. HR drifted into Z5 on return'),
    run('2026-10-11', 'Recovery', 6.07, '50:17', 112, 135, '8:17/km'),
    run('2026-10-14', 'Repeats', 9.46, '1:04:49', 134, 184, '1k repeats: 4:04, 4:03, 4:05, 3:58/km. 1 min recovery',
      'Reps 3-4 HR (150-157) looks low for pace, possible strap issue')
  ],
  goals: [
    { id: 'g1', event: 'Half marathon', distKm: 21.0975, race: 'Great Bristol Run', date: '2027-05-09', target: '1:45:00', estimate: '1:49-1:51', notes: 'Estimate as of 14 Oct 2026, based on 1k reps ~4:04/km' },
    { id: 'g2', event: '10K', distKm: 10, race: 'Bath Two Tunnels', date: '2027-08-15', target: '45:00', estimate: '45:30-46:30', notes: 'Estimate as of 14 Oct 2026' },
    { id: 'g3', event: '5K', distKm: 5, race: 'Redcar parkrun', date: '2027-09-26', target: '21:00', estimate: '21:15-21:30', notes: 'Estimate as of 14 Oct 2026' }
  ],
  pbs: [
    { id: 'p1', event: '5K parkrun', place: 'Redcar', time: '21:06', when: 'Apr 2025', notes: '' },
    { id: 'p2', event: 'Half marathon', place: 'Bristol', time: '1:46:50', when: 'May 2025', notes: '' },
    { id: 'p3', event: '10K', place: '', time: '46:58', when: '7 Jun 2026', notes: '' },
    { id: 'p4', event: 'Half marathon (not a PB)', place: 'Bath', time: '2:11:33', when: '16 Aug 2026', notes: '22.11 km, avg 5:57/km, avg HR 159. Ultra block' }
  ],
  plan: [
    { id: 's1', date: '2026-10-17', session: 'Tempo, out and back', details: '10 min out, 10 min back, Z4 (155-159)' },
    { id: 's2', date: '2026-10-18', session: 'Recovery', details: '5-6 km Z2' },
    { id: 's3', date: '2026-10-19', session: 'Easy', details: '8-9 km, HR ≤135' },
    { id: 's4', date: '2026-10-20', session: 'Rest', details: '' },
    { id: 's5', date: '2026-10-21', session: '400m pyramid', details: 'Lighter, Z5' },
    { id: 's6', date: '2026-10-22', session: 'Trail run', details: '3 hours, easy Z2 (day off work)' },
    { id: 's7', date: '2026-10-23', session: 'Rest or yoga', details: '' },
    { id: 's8', date: '2026-10-24', session: '5K parkrun', details: 'Z4. Half term week' },
    { id: 's9', date: '2026-10-25', session: 'Easy', details: 'Half term' },
    { id: 's10', date: '2026-10-26', session: 'Easy', details: 'Half term' },
    { id: 's11', date: '2026-10-27', session: 'Easy', details: 'Half term' },
    { id: 's12', date: '2026-10-28', session: '1k repeats', details: 'Half term' },
    { id: 's13', date: '2026-10-29', session: 'Easy', details: 'Half term' },
    { id: 's14', date: '2026-10-30', session: 'Easy', details: 'Half term' }
  ],
  missed: [
    { id: 'm1', when: 'Wed 16 Sep', status: 'Missed', what: 'Session', reason: 'Family' },
    { id: 'm2', when: 'Sat 19 Sep', status: 'Not done', what: '12 km trail', reason: 'Illness' },
    { id: 'm3', when: '20-25 Sep', status: 'Rest', what: 'All running', reason: 'Illness' },
    { id: 'm4', when: 'Sat 3 Oct', status: 'Changed', what: 'Trail run instead of tempo', reason: 'Habit' },
    { id: 'm5', when: 'Sun 4 Oct', status: 'Missed', what: 'Session', reason: '' },
    { id: 'm6', when: 'Mon 12 Oct', status: 'Missed', what: 'Session', reason: '' }
  ],
  shoes: [
    { id: 'h1', name: 'Altra Olympus 275', status: 'Retired', km: 1013, asOf: '', notes: 'Retired at ~1,013 km (exceeded max)' },
    { id: 'h2', name: 'Altra Torin 9', status: 'In use', km: 103, asOf: '2026-10-14', notes: 'In use since 11 Sep. ~103 km at 14 Oct' },
    { id: 'h3', name: 'Altra Olympus 7', status: 'Considered', km: null, asOf: '', notes: 'Not chosen' },
    { id: 'h4', name: 'Altra Timp 6', status: 'Considered', km: null, asOf: '', notes: 'Not chosen' }
  ],
  nutrition: [
    { id: 'n1', item: 'Training gel (per gel)', use: 'Training', kcal: 100, carbs: 25, sodium: 100, notes: '' },
    { id: 'n2', item: 'Race gel (per gel)', use: 'Race', kcal: 110, carbs: 30, sodium: 120, notes: 'Planned 2/hr = 60 g carbs, 240 mg sodium' },
    { id: 'n3', item: 'Endurance drink, 500 ml', use: 'Training', kcal: 90, carbs: 25, sodium: 300, notes: '' },
    { id: 'n4', item: 'Race endurance drink, 500 ml', use: 'Race', kcal: 100, carbs: 30, sodium: 400, notes: 'Planned 1/hr' },
    { id: 'n5', item: 'Protein', use: 'Recovery', kcal: null, carbs: null, sodium: null, notes: '20-30 g after Z4-5 sessions' }
  ],
  caveats: [
    { id: 'c1', note: '19 Sep: HR spike (incoming respiratory illness)' },
    { id: 'c2', note: '14 Oct reps 3-4: possible strap dropout, HR looks low for pace' },
    { id: 'c3', note: '9 Sep: Garmin label says "Tempo" but the session was 3 x 3 min intervals' },
    { id: 'c4', note: 'Max HR 188 may be a sensor spike' },
    { id: 'c5', note: 'Zone 2/3 boundary is 134/135 bpm' }
  ]
};
