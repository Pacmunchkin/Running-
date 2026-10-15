'use strict';
// Starter data, loaded the first time the site is opened (or via Profile → Reset to starter data).
// Distances are stored in km, durations in seconds. Bump `rev` when this file changes so old saved data is offered a refresh.
const T = s => s.split(':').map(Number).reduce((a, n) => a * 60 + n, 0);
const Z = (...a) => a.map(s => s ? T(s) : 0);                       // time in HR zones Z1..Z5
const lap = (label, time, km, pace, hr, max, cad) => ({ label, time, km, pace, hr, max, cad });
const BANES = 'Bath and North East Somerset';
const run = (date, time, type, km, dur, hr, maxhr, notes = '', flag = '', shoe = '', x = {}) => {
  const { moving, ...rest } = x;
  return { id: 'r' + date.replace(/-/g, '') + time.replace(':', ''), date, time, type, km, secs: T(dur), hr, maxhr, shoe, notes, flag,
    loc: BANES, ...(moving ? { moving: T(moving) } : {}), ...rest };
};
const OLY = 'Altra Olympus 275', TOR = 'Altra Torin 9';

const SEED = {
  v: 1, rev: 8,
  projection: { vdotGain: 1.5, vdotWeeks: 26, gapWeeks: 20, gapFloor: { g1: 1.09, g2: 1.04, g3: 1.005 } },
  block: { start: '2026-09-01', name: 'Phase 1: base building' },
  profile: {
    name: 'Philip Coote', location: 'Bath, UK', phase: 'Phase 1 (Base Building)',
    longDay: 'Saturday = long/tempo day',
    week: 'Sat / Sun / Mon / Tue (rest) / Wed / Thu (rest) / Fri (yoga)',
    maxHr: 201, maxHrNote: 'Redcar 5K PB, 19 Apr 2025 (Garmin). Bristol HM max was 196. To be reviewed as new data comes in',
    z1: 85, z2: 102, z3: 135, z4: 155, z5: 160,
    zoneNote: 'Zone 2/3 boundary is 134/135 bpm'
  },
  runs: [
    run('2025-04-19', '08:59', 'Parkrun', 5.00, '21:07', 179, 201, 'Redcar parkrun 5K PB. Perceived effort 9/10 (extremely hard). Garmin summary data edited',
      'Garmin time is 21:07; PB table has 21:06', 'Vivobarefoot Primus Lite',
      { title: '5kPb', loc: 'Redcar and Cleveland', asc: 9, cal: 366, sweat: 189, cad: 187, stride: 1.26, moving: '21:01', best: '2:08',
        zones: Z('0:15', '0:24', '0:53', '1:27', '18:07'), zoneNote: 'Garmin zones at the time: Z1 94-111, Z2 112-130, Z3 131-149, Z4 150-167, Z5 >167 bpm. Not comparable with today\'s zones', laps: [
        lap('1', '4:25', 1.03, '4:16', 155, 174, 190), lap('2', '4:23', 1.04, '4:13', 177, 187, 188), lap('3', '4:19', 0.98, '4:23', 185, 191, 184),
        lap('4', '4:18', 1.01, '4:17', 188, 193, 187), lap('5', '3:41.5', 0.93, '3:58', 194, 201, 189)] }),
    run('2025-05-11', '10:03', 'Race', 21.10, '1:46:50', 180, 196, 'Great Bristol Run, HM PB. Garmin flagged a new personal record. Garmin summary data edited',
      'Lap distances total 21.25 km vs 21.10 km in the edited summary', 'Vivobarefoot Primus Lite',
      { title: 'Great Bristol Run', loc: 'Bristol', asc: 66, cal: 2007, sweat: 1389, cad: 177, stride: 1.12, moving: '1:46:50', best: '4:19',
        zones: Z('0:11', '0:41', '0:03', '2:59', '1:42:56'), zoneNote: 'Garmin zones at the time: Z1 91-108, Z2 109-134, Z3 135-149, Z4 150-163, Z5 >163 bpm. Not comparable with today\'s zones', laps: [
        lap('3 mi (1)', '23:04', 4.83, '4:47', 167, 178, 181), lap('3 mi (2)', '23:56', 4.83, '4:57', 179, 185, 176), lap('3 mi (3)', '24:51', 4.83, '5:09', 183, 191, 176),
        lap('3 mi (4)', '25:01', 4.83, '5:11', 187, 195, 176), lap('Last 1.2 mi', '9:58.7', 1.93, '5:11', 192, 196, 177)] }),
    run('2026-06-07', '11:05', 'Race', 10.00, '46:58', 174, 190, '10K, best of the Garmin era. Second-fastest 10K overall (PB 46:46 was before Garmin). Garmin summary data edited', 
      'Lap distances total 9.63 km vs 10.00 km in the edited summary (laps imply 4:53/km, not 4:42/km)', OLY,
      { title: '10k', asc: 69, cal: 815, sweat: 629, cad: 179, stride: 1.15, moving: '46:51', recHr: 43, best: '3:00', zones: Z('0:15', '0:33', '1:58', '1:41', '42:30'), laps: [
        lap('1', '23:16', 4.71, '4:56', 167, 183, 178), lap('2', '15:00', 3.00, '5:00', 179, 190, 177), lap('3', '8:41.5', 1.92, '4:31', 181, 189, 182)] }),
    run('2026-08-16', '11:11', 'Race', 22.11, '2:11:33', 159, 186, 'HM, Bath (ultra block). Avg 5:57/km. 59% of the run in Z5', '', OLY,
      { title: '16 Aug', asc: 117, cal: 2088, sweat: 1676, cad: 169, stride: 0.99, moving: '2:11:03', best: '4:50', zones: Z('0:10', '6:35', '33:59', '12:43', '1:17:57') }),
    run('2026-09-05', '06:14', 'Easy', 9.71, '1:23:56', 139, 161, 'Post-HM recovery, 8:39/km', '', OLY,
      { title: 'Running', asc: 283, cal: 989, sweat: 1028, cad: 155, stride: 0.75, moving: '1:23:41', best: '6:19', zones: Z('0:32', '21:20', '1:00:07', '1:27', '0:02') }),
    run('2026-09-06', '07:18', 'Recovery', 4.11, '37:07', 129, 156, '', '', OLY,
      { title: 'Running', asc: 61, cal: 396, sweat: 422, cad: 152, stride: 0.73, moving: '37:07', best: '7:07', zones: Z('1:32', '18:33', '16:26', '0:08', '') }),
    run('2026-09-07', '18:58', 'Easy', 8.08, '1:14:50', 128, 150, '9:16/km', '', OLY,
      { title: 'Easy', asc: 119, cal: 725, sweat: 843, cad: 135, stride: 0.80, moving: '1:14:13', best: '5:45', zones: Z('0:22', '57:33', '16:55', '', '') }),
    run('2026-09-09', '18:53', 'Intervals', 6.54, '45:49', 127, 159, '3 x 3 min efforts (4:45, 4:07, 4:10/km), 3 min recoveries, old shoes',
      'Garmin labelled this "Tempo" but it was 3 x 3 min intervals', OLY,
      { title: 'Tempo', asc: 54, cal: 459, sweat: 512, cad: 147, stride: 0.95, moving: '45:43', best: '3:19', zones: Z('1:43', '32:39', '10:57', '0:25', ''), laps: [
        lap('Warm up', '10:00', 1.72, '5:49', 126, 147, 159), lap('Effort 1', '3:00', 0.63, '4:45', 143, 155, 177), lap('Recovery', '3:00', 0.22, '13:27', 119, 154, 95),
        lap('Effort 2', '3:00', 0.73, '4:07', 136, 152, 178), lap('Recovery', '3:00', 0.27, '11:18', 121, 151, 103), lap('Effort 3', '3:00', 0.72, '4:10', 137, 159, 179),
        lap('Recovery', '3:00', 0.28, '10:45', 122, 155, 116), lap('Cool down', '17:49', 1.97, '9:02', 124, 140, 145)] }),
    run('2026-09-12', '07:16', 'Long/Tempo', 8.50, '57:04', 132, 166,
      'Intended 10 km with 20 min Z4; two 10-min efforts at 5:06 and 5:09/km. First run in Torin 9. Only the second effort reached Z4 (avg 157; first effort avg 142)', '', TOR,
      { title: 'Long run', asc: 58, cal: 634, sweat: 664, cad: 161, stride: 0.91, moving: '56:23', recHr: 26, best: '4:13', zones: Z('1:01', '36:15', '9:18', '7:40', '2:27'), laps: [
        lap('Warm up', '16:14', 2.00, '8:07', 116, 133, 157), lap('Effort 1', '10:00', 1.96, '5:06', 142, 157, 178), lap('Effort 2', '10:00', 1.94, '5:09', 157, 166, 177),
        lap('Cool down', '20:50', 2.59, '8:02', 128, 157, 149)] }),
    run('2026-09-13', '07:23', 'Recovery', 5.92, '48:57', 114, 130, '8:16/km', '', TOR,
      { title: 'Recovery', asc: 91, cal: 426, sweat: 491, cad: 155, stride: 0.78, moving: '48:56', recHr: 24, best: '5:24', zones: Z('3:26', '45:31', '', '', '') }),
    run('2026-09-14', '19:22', 'Easy', 8.05, '51:03', 136, 151, 'Ran 6:21/km, intended Z2 but 71% of the run was in Z3 (avg HR 136, 1 bpm over the boundary)', '', TOR,
      { title: 'Easy', asc: 56, cal: 641, sweat: 610, cad: 165, stride: 0.95, moving: '51:03', best: '5:14', zones: Z('0:26', '13:49', '36:42', '', '') }),
    run('2026-09-19', '09:00', 'Parkrun', 5.23, '27:47', 159, 188, 'Felt easy. Planned 12 km not done',
      'HR spike, later confirmed as incoming respiratory illness. Garmin zones: 17:09 (61%) in Z5, so HR was high for most of the run, not one spike', TOR,
      { title: 'Running', loc: 'Newark and Sherwood', asc: 62, cal: 432, sweat: 390, cad: 172, stride: 1.09, moving: '27:37', best: '2:56', zones: Z('0:09', '2:48', '5:16', '2:14', '17:09') }),
    run('2026-09-26', '06:15', 'Easy', 9.29, '1:11:20', 120, 144, 'Post-illness. 7:41/km, 92% Z2', '', TOR,
      { title: 'Running', asc: 113, cal: 674, sweat: 752, cad: 157, stride: 0.82, moving: '1:11:20', best: '4:51', zones: Z('1:35', '1:06:05', '3:40', '', '') }),
    run('2026-09-27', '08:01', 'Recovery', 3.48, '33:05', 108, 133, '9:30/km', '', TOR,
      { title: 'Running', asc: 55, cal: 272, sweat: 315, cad: 151, stride: 0.70, moving: '33:00', best: '7:10', zones: Z('7:26', '24:07', '', '', '') }),
    run('2026-09-30', '19:10', 'Repeats', 8.38, '1:00:57', 129, 175,
      '1k repeats: 4:37, 4:22, 4:23, 4:22/km. Recoveries were 3 min (should be 1 min); 5th rep logged, abandoned after 10 s', '', TOR,
      { title: '1k repeats', asc: 115, cal: 654, sweat: 696, cad: 147, stride: 0.91, moving: '56:59', best: '3:58', zones: Z('3:28', '36:28', '7:42', '1:27', '11:46'), laps: [
        lap('Warm up', '21:48', 2.67, '8:09', 111, 123, 158), lap('Rep 1', '4:37.0', 1.00, '4:37', 147, 166, 183), lap('Recovery', '3:00', 0.10, '29:06', 121, 163, 42),
        lap('Rep 2', '4:22.0', 1.00, '4:22', 151, 169, 179), lap('Recovery', '3:00', 0.29, '10:30', 142, 171, 109), lap('Rep 3', '4:23.5', 1.00, '4:23', 156, 172, 180),
        lap('Recovery', '3:00', 0.12, '24:26', 130, 161, 44), lap('Rep 4', '4:22.1', 1.00, '4:22', 160, 175, 183), lap('Recovery', '3:00', 0.27, '10:57', 140, 174, 120),
        lap('Rep 5 (abandoned)', '0:10.4', 0.02, '11:18', 113, 114, 49), lap('Recovery', '0:09.4', 0.01, '12:51', 111, 113, 110), lap('Cool down', '9:04.8', 0.89, '10:10', 123, 134, 145)] }),
    run('2026-10-03', '06:36', 'Trail', 6.88, '1:00:50', 133, 164, 'Trail long run (intended tempo). 209 m ascent, 2 x 10 min efforts (2.67 km, 7:29/km)', '', TOR,
      { title: 'Long run', asc: 209, cal: 656, sweat: 713, cad: 139, stride: 0.81, moving: '1:00:24', best: '2:08', zones: Z('0:38', '32:47', '20:23', '3:57', '2:13') }),
    run('2026-10-05', '19:56', 'Easy', 7.93, '57:50', 127, 152, '7:18/km', '', TOR,
      { title: 'Easy', asc: 60, cal: 612, sweat: 649, cad: 163, stride: 0.84, moving: '57:29', best: '5:15', zones: Z('0:08', '36:05', '21:13', '', '') }),
    run('2026-10-07', '19:17', 'Repeats', 9.23, '1:05:05', 135, 163, '1k repeats: 4:18, 4:12, 4:12, 4:10/km. 1 min recovery. Garmin PR flagged', '', TOR,
      { title: '1k repeats', asc: 100, cal: 720, sweat: 772, cad: 152, stride: 0.91, moving: '1:04:45', recHr: 29, best: '3:51', zones: Z('0:36', '37:02', '16:48', '8:32', '2:06'), laps: [
        lap('Warm up', '21:54', 2.36, '9:18', 127, 149, 144), lap('Rep 1', '4:17.5', 1.00, '4:18', 151, 161, 177), lap('Recovery', '1:00', 0.08, '11:52', 153, 159, 102),
        lap('Rep 2', '4:12.1', 1.00, '4:12', 152, 163, 180), lap('Recovery', '1:00', 0.10, '9:45', 159, 163, 103), lap('Rep 3', '4:11.6', 1.00, '4:12', 155, 163, 179),
        lap('Recovery', '1:00', 0.10, '10:02', 156, 162, 109), lap('Rep 4', '4:09.6', 1.00, '4:10', 150, 163, 182), lap('Recovery', '1:00', 0.09, '11:29', 151, 156, 123),
        lap('Cool down', '22:21', 2.50, '8:56', 125, 143, 145)] }),
    run('2026-10-10', '07:37', 'Tempo', 8.17, '1:04:24', 139, 174,
      'Out and back: 10 min out at 5:44/km, 10 min back at 6:08/km. HR drifted into Z5 on return (lap avg 163)', '', TOR,
      { title: 'Long run', asc: 67, cal: 751, sweat: 791, cad: 149, stride: 0.84, moving: '1:03:56', best: '4:08', zones: Z('0:38', '30:40', '12:53', '7:33', '12:40'), laps: [
        lap('Warm up', '19:13', 2.00, '9:37', 126, 144, 153), lap('Out', '10:00', 1.74, '5:44', 154, 170, 170), lap('Back', '10:00', 1.63, '6:08', 163, 174, 170),
        lap('Cool down', '25:11', 2.80, '9:00', 134, 171, 131)] }),
    run('2026-10-11', '07:58', 'Recovery', 6.07, '50:17', 112, 135, '8:17/km', '', TOR,
      { title: 'Recovery', asc: 55, cal: 436, sweat: 496, cad: 160, stride: 0.75, moving: '50:17', best: '5:32', zones: Z('4:59', '44:55', '0:01', '', ''), laps: [
        lap('Run 1', '25:05', 3.00, '8:22', 109, 128, 161), lap('Run 2', '24:39', 3.00, '8:13', 115, 135, 159), lap('Cool down', '0:33.2', 0.07, '7:29', 107, 110, 167)] }),
    run('2026-10-14', '19:13', 'Repeats', 9.46, '1:04:49', 134, 184,
      '1k repeats: 4:04, 4:03, 4:05, 3:58/km. 1 min recovery. Garmin flagged a new personal record', 'Reps 3-4 HR (avg 145 and 150) looks low for pace, possible strap issue. The 184 max was in the first recovery lap (avg 174), not a rep', TOR,
      { title: '1k repeats', asc: 101, cal: 719, sweat: 763, cad: 154, stride: 0.92, moving: '1:04:15', best: '3:38', zones: Z('0:13', '37:12', '17:23', '3:07', '6:45'), laps: [
        lap('Warm up', '21:28', 2.49, '8:37', 130, 160, 147), lap('Rep 1', '4:04.3', 1.00, '4:04', 155, 177, 182), lap('Recovery', '1:00', 0.10, '10:26', 174, 184, 133),
        lap('Rep 2', '4:02.9', 1.00, '4:03', 164, 173, 179), lap('Recovery', '1:00', 0.10, '9:44', 161, 174, 128), lap('Rep 3', '4:05.1', 1.00, '4:05', 145, 155, 181),
        lap('Recovery', '1:00', 0.11, '8:43', 151, 155, 131), lap('Rep 4', '3:58.4', 1.00, '3:58', 150, 157, 180), lap('Recovery', '1:00', 0.10, '10:30', 148, 158, 136),
        lap('Cool down', '23:11', 2.56, '9:04', 119, 130, 144)] })
  ],
  goals: [
    { id: 'g1', event: 'Half marathon', distKm: 21.0975, race: 'Great Bristol Run', date: '2027-05-09', target: '1:45:00', notes: '' },
    { id: 'g2', event: '10K', distKm: 10, race: 'Bath Two Tunnels', date: '2027-08-15', target: '45:00', notes: '' },
    { id: 'g3', event: '5K', distKm: 5, race: 'Redcar parkrun', date: '2027-09-26', target: '21:00', notes: '' }
  ],
  pbs: [
    { id: 'p1', event: '5K parkrun', place: 'Redcar', time: '21:06', when: 'Apr 2025', notes: 'Garmin, 19 Apr 2025: 21:07, 5.00 km, avg HR 179 / max 201, effort 9/10' },
    { id: 'p2', event: 'Half marathon', place: 'Bristol', time: '1:46:50', when: 'May 2025', notes: 'Great Bristol Run, 11 May. Garmin: 21.10 km, avg HR 180 / max 196' },
    { id: 'p3', event: '10K', place: '', time: '46:46', when: 'Before Garmin', notes: 'True 10K PB, not on Garmin' },
    { id: 'p5', event: '10K (best on Garmin)', place: 'Bath', time: '46:58', when: '7 Jun 2026', notes: 'Second-fastest overall. Avg HR 174 / max 190. Garmin summary edited: laps total 9.63 km vs 10.00 km' },
    { id: 'p4', event: 'Half marathon (not a PB)', place: 'Bath', time: '2:11:33', when: '16 Aug 2026', notes: '22.11 km, avg 5:57/km, avg HR 159. Ultra block' }
  ],
  plan: [
    { id: 's1', date: '2026-10-17', session: 'Zone 4 tempo, 20 min', details: 'Z4 (155-159 bpm). Out and back: 10 min out, 10 min back' },
    { id: 's2', date: '2026-10-18', session: 'Recovery run', details: '5-6 km, Z2' },
    { id: 's3', date: '2026-10-19', session: 'Steady, high Z2', details: 'HR about 125-134. 8-9 km' },
    { id: 's4', date: '2026-10-20', session: 'Rest', details: '' },
    { id: 's5', date: '2026-10-21', session: '400m pyramid', details: 'Lighter session, Z5' },
    { id: 's6', date: '2026-10-22', km: 27.3, session: 'Trail run / hike', details: '3:08 h, 27.3 km, 430 m ascent. Day off work. Take it easy, Z2 (about 6:53/km average)' },
    { id: 's7', date: '2026-10-23', session: 'Rest or yoga', details: '' },
    { id: 's8', date: '2026-10-24', session: '5K parkrun, Z4', details: 'Z4 (155-159 bpm). Half term week' },
    { id: 's9', date: '2026-10-25', session: 'Recovery run', details: 'Half term' },
    { id: 's10', date: '2026-10-26', session: 'Steady run', details: 'Half term' },
    { id: 's11', date: '2026-10-27', session: '5K at Z3', details: 'HR 135-154. Half term' },
    { id: 's12', date: '2026-10-28', session: 'Intervals: 5 x 1 km', details: 'About 4:00-4:05/km, 1 min jog recovery. 15-20 min warm-up, 10 min cool-down. Check the HR strap first' },
    { id: 's13', date: '2026-10-29', session: 'Recovery run', details: 'Half term' },
    { id: 's14', date: '2026-10-30', session: 'Steady run', details: 'Half term' }
  ],
  estimates: [
    { date: '2026-09-09', vdot: 43.1, gap: { g1: 1.136, g2: 1.052, g3: 1.014 }, est: { g1: [7020, 7140], g2: [2925, 3000], g3: [1370, 1385] },
      basis: '3 x 3 min efforts, avg 4:20/km (old shoes, avg HR 139). Retrospective' },
    { date: '2026-09-30', vdot: 41.8, gap: { g1: 1.136, g2: 1.052, g3: 1.014 }, est: { g1: [7200, 7350], g2: [3000, 3075], g3: [1405, 1420] },
      basis: '4 x 1 km, avg 4:26/km, 3 min recoveries, first quality session after illness. Retrospective' },
    { date: '2026-10-07', vdot: 44.5, gap: { g1: 1.136, g2: 1.052, g3: 1.014 }, est: { g1: [6840, 6960], g2: [2850, 2910], g3: [1330, 1350] },
      basis: '4 x 1 km, avg 4:13/km, 1 min recoveries. Retrospective' },
    { date: '2026-10-14', vdot: 46.8, gap: { g1: 1.136, g2: 1.052, g3: 1.014 }, est: { g1: [6540, 6660], g2: [2730, 2790], g3: [1275, 1290] },
      basis: '4 x 1 km, avg 4:03/km, 1 min recoveries. Reps 3-4 HR looks low (strap?), pace-based so unaffected' }
  ],
  reviews: [
    { id: 'v1', date: '2026-10-14', title: 'Block review: 1 Sep - 14 Oct 2026 (Phase 1, base building)', sections: [
      { heading: 'What went well', items: [
        'Volume: 125 km in 17 runs (15 h 55 min) over six weeks, excluding an 11 Oct walk. Weekly km: 28, 22, 5 (illness), 21, 24, 24. The five healthy weeks averaged 24 km.',
        'Speed is back quickly. Average rep pace went 4:20 (9 Sep), 4:26 (30 Sep, just after illness), 4:13 (7 Oct), 4:03 (14 Oct). The last three sessions had almost the same average HR (153, 152, 153), so you ran about 24 s/km faster at the same heart rate in two weeks.',
        'Estimated VO2 max (VDOT) rose 41.8, 44.5, 46.8. That equals your 5K PB fitness (46.8, Apr 2025) from the 14 Oct reps alone.',
        'Easy-run efficiency: 7 Sep 9:16/km at HR 128, 5 Oct 7:18/km at HR 127. That is nearly 2 min/km faster at the same HR (the 7 Sep run was soon after the HM and hillier, so some of this is recovery).',
        'Consistency since the illness: three Wednesday quality sessions in a row (30 Sep, 7 Oct, 14 Oct) and easy/recovery runs on 13 Sep, 26 Sep, 27 Sep and 11 Oct kept to 0-5% of time in Z3.'] },
      { heading: 'What to watch', items: [
        'Too much Z3. Time in zones for the block: Z1 3%, Z2 60%, Z3 27%, Z4 4%, Z5 6%. Most of the Z3 is easy runs creeping up: 5 Sep (72% in Z3), 14 Sep (72%) and 5 Oct (37%). Cap easy days at 134 bpm (set a Garmin HR alert) so the quality days stay quality.',
        'Saturday threshold work is the weak spot. 12 Sep: two 10-min efforts averaged 5:08/km at HR 150. 10 Oct: 5:56/km at HR 159, with HR drifting into Z5 on the way back. The shapes differed (out and back, 3 days after repeats), and 3 Oct became a trail run, so there has been no clean Z4 block since 12 Sep. The 17 Oct session is the test.',
        'Endurance, not speed, limits the HM and 10K. At VDOT 46.8 a perfect HM would be 1:36:52, but your May 2025 HM (1:46:50) was about 10% slower than your 5K fitness predicted. The 1:45:00 goal needs about 8%, so it is realistic but only if long runs and weekly volume build. The 5K goal (21:00) only needs a 0.4% better 5K than your current speed fitness.',
        'No run longer than 9.7 km since the 22.1 km HM on 16 Aug. The planned 27.3 km trail on 22 Oct is nearly three times that.',
        'HR quality: 19 Sep (illness spike) and reps 3-4 on 14 Oct (possible strap dropout). The VDOT estimate uses pace only, so it is not affected, but I cannot judge effort on those reps from HR.'] },
      { heading: 'Estimates after this review (if raced now)', items: [
        'Half marathon (9 May 2027): 1:49:00-1:51:00 vs goal 1:45:00.',
        '10K (15 Aug 2027): 45:30-46:30 vs goal 45:00.',
        '5K (26 Sep 2027): 21:15-21:30 vs goal 21:00.',
        'These match your own 14 Oct estimates. The model is explained under the charts. Next update: Wed 21 Oct after the pyramid session.'] },
      { heading: 'Next week (Sat 17 - Fri 23 Oct)', items: [
        'Sat 17, 20 min Z4: warm up 15-20 min, then a flat route (not hilly out-and-back). Hold HR 155-159 and settle pace by feel. Benchmarks: 5:09/km at HR 157 on 12 Sep, 5:44/km at HR 154 on 10 Oct. Around 5:10-5:25 at that HR would be a good sign; slower than 5:40 means the HM estimate should stay where it is.',
        'Sun 18, recovery 5-6 km: keep HR under about 125 (recent recovery runs averaged 108-115). It protects Monday and Wednesday.',
        'Mon 19, steady high Z2: HR 125-134, never 135+. On current form that is roughly 6:55-7:10/km (7:18/km at HR 127 on 5 Oct). 8-9 km.',
        'Wed 21, 400m pyramid: keep it lighter as planned and run by effort at about 3:55-4:05/km pace. HR lags on short reps, so judge by pace. Fit the strap snugly (14 Oct dropout).',
        'Thu 22, 27.3 km trail: HR 134 or below, hike the climbs, and start fuelling in the first 30-45 min. One gel plus one 500 ml endurance drink per hour is about 50 g carbs and 400 mg sodium. Friday is rest as planned.',
        'Sat 24, Z4 parkrun: only two days after the 3 h trail. Run it by HR (155-159), not pace or position. If the legs are flat, drop to Z3 instead.',
        'Week of 24 Oct: Tue 27 (5K Z3) and Wed 28 (5 x 1 km) are back to back, so keep Tuesday at the low end of Z3 (135-145) to protect the intervals.'] }
    ] }
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
    { id: 'h1', name: 'Altra Olympus 275', status: 'Retired', km: 1004.9, asOf: '2026-10-14', notes: 'Garmin: 110 activities, 1,004.9 km (Garmin limit 1,000, exceeded). Earlier note said retired at ~1,013 km' },
    { id: 'h2', name: 'Altra Torin 9', status: 'In use', km: 103.2, asOf: '2026-10-14', notes: 'In use since 11 Sep. Garmin: 14 activities, 103.2 km at 14 Oct (Garmin limit 1,000). Includes a 6.61 km walk on 11 Oct that is not logged as a run' },
    { id: 'h5', name: 'Vivobarefoot Primus Lite', status: 'Earlier', km: 527, asOf: '2026-10-14', notes: 'Garmin: 45 activities, 527.0 of 1,200 km, first use 12 Jan 2025. Worn for the 2025 PBs' },
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
    { id: 'c4', note: 'Max HR set to 201 (Redcar 5K PB, Apr 2025). Review as new data comes in; 188 on 19 Sep 2026 was during illness' },
    { id: 'c5', note: 'Zone 2/3 boundary is 134/135 bpm' },
    { id: 'c6', note: '11 Oct 3:38 PM: a 6.61 km walk. Not logged as a run, but it is in Garmin\'s Torin 9 total (103.2 km)' },
    { id: 'c8', note: 'Max HR on Garmin: 201 (5K Apr 2025), 196 (HM May 2025), 190 (10K Jun 2026), 186 (HM Aug 2026). HR zones start Z5 at 160 bpm, about 80% of 201 (85% of the old 188). Revisit zone boundaries once max HR is confirmed' },
    { id: 'c9', note: 'Garmin summary data was edited on the 2025 PBs and the 7 Jun 2026 10K. Lap distances do not match the summary on the Bristol HM (21.25 vs 21.10 km) or the 10K (9.63 vs 10.00 km)' },
    { id: 'c7', note: 'Garmin "best pace" values (e.g. 2:08/km on 3 Oct trail run) are GPS artefacts, ignore them' }
  ]
};
