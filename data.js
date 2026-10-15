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
  longPlan: {
   "weeks": [
    {
     "start": "2026-10-17",
     "phase": "found",
     "type": "build",
     "km": 58,
     "long": 27.3,
     "sat": "Z4 tempo, 20 min (10 min out, 10 min back)",
     "sun": "Recovery 5-6 km, Z2",
     "mon": "Steady high Z2, 8-9 km (HR 125-134)",
     "wed": "400m pyramid, lighter (Z5)",
     "opt": "Thu: trail run/hike 27.3 km, 3:08 h, easy Z2",
     "note": "Biggest week of the block by far. Everything else stays easy."
    },
    {
     "start": "2026-10-24",
     "phase": "found",
     "type": "build",
     "km": 53,
     "long": 10,
     "sat": "5K parkrun at Z4 (HR-led)",
     "sun": "Recovery run",
     "mon": "5K at Z3 (HR 135-154), first planned Z3 session",
     "wed": "5 x 1 km @ about 4:00-4:05, 1 min jog",
     "opt": "Tue easy, Thu recovery, Fri steady (half term, run every day)",
     "note": "Second big week. Stay under the weekly cap on the easy days."
    },
    {
     "start": "2026-10-31",
     "phase": "found",
     "type": "recovery",
     "km": 30,
     "long": 11,
     "sat": "Easy 8-10 km, Z2",
     "sun": "Recovery 5 km",
     "mon": "Easy 7 km",
     "wed": "Easy 6 km + 6 x 100 m strides",
     "opt": "Optional easy 5 km Thu/Fri",
     "note": "Recovery week after two big ones: no Z4 or Z5."
    },
    {
     "start": "2026-11-07",
     "phase": "hm1",
     "type": "build",
     "km": 36,
     "long": 14,
     "sat": "Long run 14 km, easy Z2",
     "sun": "Recovery 5-6 km",
     "mon": "Z3 steady 5-6 km (HR 135-154)",
     "wed": "6 x 1 km @ about 4:03, 1 min jog",
     "opt": "Optional Thu: easy 5 km",
     "note": ""
    },
    {
     "start": "2026-11-14",
     "phase": "hm1",
     "type": "build",
     "km": 38,
     "long": 15,
     "sat": "Long run 15 km, easy Z2",
     "sun": "Recovery 5-6 km",
     "mon": "Steady high Z2, 8-9 km",
     "wed": "6 x 800 m @ about 3:55, 1 min jog",
     "opt": "Optional Thu: easy 5 km",
     "note": ""
    },
    {
     "start": "2026-11-21",
     "phase": "hm1",
     "type": "build",
     "km": 40,
     "long": 17,
     "sat": "Long run 17 km, easy Z2, last 15 min Z3",
     "sun": "Recovery 5-6 km",
     "mon": "Z3 steady 6 km (HR 135-154)",
     "wed": "6 x 1 km @ about 4:00, 1 min jog",
     "opt": "Optional Thu: easy 5 km",
     "note": ""
    },
    {
     "start": "2026-11-28",
     "phase": "hm1",
     "type": "recovery",
     "km": 29,
     "long": 12,
     "sat": "Easy long run 12 km, Z2",
     "sun": "Recovery 5 km",
     "mon": "Easy 6-7 km",
     "wed": "Easy 6 km + 6 x 100 m strides",
     "opt": "",
     "note": ""
    },
    {
     "start": "2026-12-05",
     "phase": "hm1",
     "type": "build",
     "km": 40,
     "long": 17,
     "sat": "Long run 17 km, easy Z2",
     "sun": "Recovery 5-6 km",
     "mon": "Z3 steady 6 km",
     "wed": "6 x 1 km @ about 4:03, 1 min jog",
     "opt": "Optional Thu: easy 5 km",
     "note": ""
    },
    {
     "start": "2026-12-12",
     "phase": "hm1",
     "type": "build",
     "km": 42,
     "long": 18,
     "sat": "Long run 18 km, easy Z2",
     "sun": "Recovery 5-6 km",
     "mon": "Steady high Z2, 8-9 km",
     "wed": "6 x 800 m @ about 3:55, 1 min jog",
     "opt": "Optional Thu: easy 5 km",
     "note": ""
    },
    {
     "start": "2026-12-19",
     "phase": "hm1",
     "type": "build",
     "km": 44,
     "long": 19,
     "sat": "Long run 19 km, easy Z2, last 15 min Z3",
     "sun": "Recovery 5-6 km",
     "mon": "Z3 steady 7 km",
     "wed": "6 x 1 km @ about 4:00, 1 min jog",
     "opt": "Optional Thu: easy 5 km",
     "note": ""
    },
    {
     "start": "2026-12-26",
     "phase": "hm1",
     "type": "recovery",
     "km": 30,
     "long": 12,
     "sat": "Easy long run 12 km, Z2",
     "sun": "Recovery 5 km",
     "mon": "Easy 6-7 km",
     "wed": "Easy 6 km + 6 x 100 m strides",
     "opt": "",
     "note": ""
    },
    {
     "start": "2027-01-02",
     "phase": "hm2",
     "type": "build",
     "km": 42,
     "long": 18,
     "sat": "Long run 18 km, Z2",
     "sun": "Recovery 5-6 km",
     "mon": "Z4 2 x 12 min, 3 min jog",
     "wed": "5 x 1.2 km @ about 4:15 (10K effort)",
     "opt": "Optional Thu: easy 5 km",
     "note": ""
    },
    {
     "start": "2027-01-09",
     "phase": "hm2",
     "type": "build",
     "km": 44,
     "long": 20,
     "sat": "Long run 20 km, Z2, last 25 min Z3",
     "sun": "Recovery 5-6 km",
     "mon": "Z4 tempo 25 min",
     "wed": "8 x 400 m @ about 3:50",
     "opt": "Optional Thu: easy 5 km",
     "note": ""
    },
    {
     "start": "2027-01-16",
     "phase": "hm2",
     "type": "build",
     "km": 46,
     "long": 21,
     "sat": "Long run 21 km, Z2, last 25 min Z3",
     "sun": "Recovery 5-6 km",
     "mon": "Z4 2 x 15 min, 3 min jog",
     "wed": "6 x 1 km @ about 4:00",
     "opt": "Optional Thu: easy 5 km",
     "note": ""
    },
    {
     "start": "2027-01-23",
     "phase": "hm2",
     "type": "recovery",
     "km": 32,
     "long": 13,
     "sat": "Easy long run 13 km, Z2",
     "sun": "Recovery 5 km",
     "mon": "Easy 6-7 km",
     "wed": "Easy 6 km + 6 x 100 m strides",
     "opt": "",
     "note": ""
    },
    {
     "start": "2027-01-30",
     "phase": "hm2",
     "type": "build",
     "km": 44,
     "long": 20,
     "sat": "Long run 20 km, Z2",
     "sun": "Recovery 5-6 km",
     "mon": "Z4 2 x 12 min, 3 min jog",
     "wed": "5 x 1.2 km @ about 4:15 (10K effort)",
     "opt": "Optional Thu: easy 5 km",
     "note": ""
    },
    {
     "start": "2027-02-06",
     "phase": "hm2",
     "type": "build",
     "km": 46,
     "long": 22,
     "sat": "Long run 22 km, Z2, last 25 min Z3",
     "sun": "Recovery 5-6 km",
     "mon": "Z4 tempo 25 min",
     "wed": "8 x 400 m @ about 3:50",
     "opt": "Optional Thu: easy 5 km",
     "note": ""
    },
    {
     "start": "2027-02-13",
     "phase": "hm2",
     "type": "build",
     "km": 48,
     "long": 22,
     "sat": "Long run 22 km, Z2, last 25 min Z3",
     "sun": "Recovery 5-6 km",
     "mon": "Z4 2 x 15 min, 3 min jog",
     "wed": "6 x 1 km @ about 4:00",
     "opt": "Optional Thu: easy 5 km",
     "note": ""
    },
    {
     "start": "2027-02-20",
     "phase": "hm2",
     "type": "recovery",
     "km": 33,
     "long": 14,
     "sat": "Easy long run 14 km, Z2",
     "sun": "Recovery 5 km",
     "mon": "Easy 6-7 km",
     "wed": "Easy 6 km + 6 x 100 m strides",
     "opt": "",
     "note": ""
    },
    {
     "start": "2027-02-27",
     "phase": "hms",
     "type": "build",
     "km": 46,
     "long": 22,
     "sat": "Long run 22 km: 3 x 2 km @ about 5:05 inside the long run",
     "sun": "Recovery 5-6 km",
     "mon": "Z4 25 min continuous",
     "wed": "4 x 2 km @ about 4:30",
     "opt": "Optional Thu: easy 5 km",
     "note": ""
    },
    {
     "start": "2027-03-06",
     "phase": "hms",
     "type": "peak",
     "km": 48,
     "long": 23,
     "sat": "Long run 23 km: 2 x 5 km @ HM pace (4:59-5:05)",
     "sun": "Recovery 5-6 km",
     "mon": "Z4 3 x 10 min",
     "wed": "6 x 1 km @ about 4:00",
     "opt": "Optional Thu: easy 5 km",
     "note": ""
    },
    {
     "start": "2027-03-13",
     "phase": "hms",
     "type": "build",
     "km": 46,
     "long": 21,
     "sat": "Long run 21 km: 8 km @ HM pace",
     "sun": "Recovery 5-6 km",
     "mon": "Z4 2 x 15 min",
     "wed": "5 x 1.6 km @ about 4:25",
     "opt": "Optional Thu: easy 5 km",
     "note": ""
    },
    {
     "start": "2027-03-20",
     "phase": "hms",
     "type": "recovery",
     "km": 34,
     "long": 14,
     "sat": "Easy long run 14 km, Z2",
     "sun": "Recovery 5 km",
     "mon": "Easy 6-7 km",
     "wed": "Easy 6 km + 6 x 100 m strides",
     "opt": "",
     "note": ""
    },
    {
     "start": "2027-03-27",
     "phase": "hms",
     "type": "build",
     "km": 46,
     "long": 22,
     "sat": "Long run 22 km: 10 km @ HM pace (peak)",
     "sun": "Recovery 5-6 km",
     "mon": "Z4 25 min continuous",
     "wed": "4 x 2 km @ about 4:30",
     "opt": "Optional Thu: easy 5 km. Optional 10K tune-up race around 27-28 Mar",
     "note": ""
    },
    {
     "start": "2027-04-03",
     "phase": "hms",
     "type": "build",
     "km": 44,
     "long": 20,
     "sat": "Long run 20 km: Rehearsal: 16 km with 10 km @ HM pace, race fuelling",
     "sun": "Recovery 5-6 km",
     "mon": "Z4 3 x 10 min",
     "wed": "6 x 1 km @ about 4:00",
     "opt": "Optional Thu: easy 5 km",
     "note": ""
    },
    {
     "start": "2027-04-10",
     "phase": "hms",
     "type": "recovery",
     "km": 36,
     "long": 16,
     "sat": "Easy long run 16 km, Z2",
     "sun": "Recovery 5 km",
     "mon": "Easy 6-7 km",
     "wed": "Easy 6 km + 6 x 100 m strides",
     "opt": "",
     "note": ""
    },
    {
     "start": "2027-04-17",
     "phase": "hms",
     "type": "build",
     "km": 42,
     "long": 18,
     "sat": "Long run 18 km: Last long run: 18 km with 8 km @ HM pace",
     "sun": "Recovery 5-6 km",
     "mon": "Z4 3 x 10 min, 2 min jog",
     "wed": "5 x 1.6 km @ about 4:25",
     "opt": "Optional Thu: easy 5 km",
     "note": ""
    },
    {
     "start": "2027-04-24",
     "phase": "hmt",
     "type": "taper",
     "km": 34,
     "long": 14,
     "sat": "14 km easy with 4 km @ HM pace",
     "sun": "Recovery 5 km",
     "mon": "Z3 steady 5 km",
     "wed": "4 x 1 km @ about 4:00 (stay sharp, short)",
     "opt": "",
     "note": ""
    },
    {
     "start": "2027-05-01",
     "phase": "hmt",
     "type": "taper",
     "km": 26,
     "long": 10,
     "sat": "10 km easy + 3 x 1 km @ HM pace",
     "sun": "Recovery 5 km",
     "mon": "Easy 6 km",
     "wed": "3 x 1 km @ HM pace, easy 5 km around it",
     "opt": "",
     "note": ""
    },
    {
     "start": "2027-05-08",
     "phase": "hmt",
     "type": "race",
     "km": 28,
     "long": 21.1,
     "sat": "Shakeout 4 km + 4 strides",
     "sun": "Great Bristol Run, HM (target 1:45:00, 4:59/km)",
     "mon": "Easy 5 km",
     "wed": "Easy 5 km + 4 strides",
     "opt": "Fri rest. Next week: easy only",
     "note": ""
    },
    {
     "start": "2027-05-15",
     "phase": "reset1",
     "type": "reset",
     "km": 12,
     "long": 5,
     "sat": "Easy 5 km",
     "sun": "Easy 5 km",
     "mon": "Rest",
     "wed": "Easy 4 km",
     "opt": "Post-HM week: easy only, no quality",
     "note": ""
    },
    {
     "start": "2027-05-22",
     "phase": "reset1",
     "type": "build",
     "km": 24,
     "long": 8,
     "sat": "Long run 8 km, Z2, last 20 min Z3",
     "sun": "Recovery 5-6 km",
     "mon": "Z3 steady 6-8 km (HR 135-154)",
     "wed": "6 x 1 km @ about 4:05",
     "opt": "Optional Thu: easy 5 km.",
     "note": ""
    },
    {
     "start": "2027-05-29",
     "phase": "k10",
     "type": "build",
     "km": 34,
     "long": 12,
     "sat": "Z4 tempo 30-35 min (cruise intervals ok)",
     "sun": "Recovery 5-6 km",
     "mon": "Z3 steady 6-8 km (HR 135-154)",
     "wed": "3 x 2 km @ about 4:30 (10K pace)",
     "opt": "Optional Thu: easy 5 km.",
     "note": ""
    },
    {
     "start": "2027-06-05",
     "phase": "k10",
     "type": "build",
     "km": 38,
     "long": 14,
     "sat": "Long run 14 km, Z2, last 20 min Z3",
     "sun": "Recovery 5-6 km",
     "mon": "Z3 steady 6-8 km (HR 135-154)",
     "wed": "5 x 1 km @ about 4:05",
     "opt": "Optional Thu: easy 5 km.",
     "note": ""
    },
    {
     "start": "2027-06-12",
     "phase": "k10",
     "type": "build",
     "km": 40,
     "long": 15,
     "sat": "Z4 tempo 30-35 min (cruise intervals ok)",
     "sun": "Recovery 5-6 km",
     "mon": "Z3 steady 6-8 km (HR 135-154)",
     "wed": "5 x 1.2 km @ about 4:15",
     "opt": "Optional Thu: easy 5 km.",
     "note": ""
    },
    {
     "start": "2027-06-19",
     "phase": "k10",
     "type": "recovery",
     "km": 28,
     "long": 11,
     "sat": "Easy long run 11 km",
     "sun": "Recovery 5 km",
     "mon": "Easy 6 km",
     "wed": "Easy 6 km + strides",
     "opt": "",
     "note": ""
    },
    {
     "start": "2027-06-26",
     "phase": "k10",
     "type": "build",
     "km": 40,
     "long": 16,
     "sat": "Z4 tempo 30-35 min (cruise intervals ok)",
     "sun": "Recovery 5-6 km",
     "mon": "Z3 steady 6-8 km (HR 135-154)",
     "wed": "6 x 1 km @ about 4:05",
     "opt": "Optional Thu: easy 5 km.",
     "note": ""
    },
    {
     "start": "2027-07-03",
     "phase": "k10",
     "type": "build",
     "km": 42,
     "long": 16,
     "sat": "Long run 16 km, Z2, last 20 min Z3",
     "sun": "Recovery 5-6 km",
     "mon": "Z3 steady 6-8 km (HR 135-154)",
     "wed": "3 x 2 km @ about 4:30 (10K pace)",
     "opt": "Optional Thu: easy 5 km.",
     "note": ""
    },
    {
     "start": "2027-07-10",
     "phase": "k10",
     "type": "build",
     "km": 44,
     "long": 17,
     "sat": "Z4 tempo 30-35 min (cruise intervals ok)",
     "sun": "Recovery 5-6 km",
     "mon": "Z3 steady 6-8 km (HR 135-154)",
     "wed": "5 x 1 km @ about 4:05",
     "opt": "Optional Thu: easy 5 km.",
     "note": ""
    },
    {
     "start": "2027-07-17",
     "phase": "k10",
     "type": "recovery",
     "km": 30,
     "long": 12,
     "sat": "Easy long run 12 km",
     "sun": "Recovery 5 km",
     "mon": "Easy 6 km",
     "wed": "Easy 6 km + strides",
     "opt": "",
     "note": ""
    },
    {
     "start": "2027-07-24",
     "phase": "k10",
     "type": "build",
     "km": 42,
     "long": 16,
     "sat": "Z4 tempo 30-35 min (cruise intervals ok)",
     "sun": "Recovery 5-6 km",
     "mon": "Z3 steady 6-8 km (HR 135-154)",
     "wed": "4 x 1.6 km @ about 4:20",
     "opt": "Optional Thu: easy 5 km. Parkrun 5K time trial this week.",
     "note": ""
    },
    {
     "start": "2027-07-31",
     "phase": "k10",
     "type": "build",
     "km": 40,
     "long": 14,
     "sat": "Long run 14 km, Z2, last 20 min Z3",
     "sun": "Recovery 5-6 km",
     "mon": "Z3 steady 6-8 km (HR 135-154)",
     "wed": "6 x 1 km @ about 4:05",
     "opt": "Optional Thu: easy 5 km.",
     "note": ""
    },
    {
     "start": "2027-08-07",
     "phase": "k10t",
     "type": "taper",
     "km": 30,
     "long": 10,
     "sat": "Easy 10 km + 4 x 200 m strides",
     "sun": "Recovery 5 km",
     "mon": "Z3 steady 5 km",
     "wed": "4 x 1 km @ about 4:30 (10K pace), sharp not tiring",
     "opt": "",
     "note": ""
    },
    {
     "start": "2027-08-14",
     "phase": "k10t",
     "type": "race",
     "km": 26,
     "long": 10,
     "sat": "Shakeout 4 km + 4 strides",
     "sun": "Bath Two Tunnels 10K (target 45:00, 4:30/km)",
     "mon": "Easy 5 km",
     "wed": "Easy 5 km + strides",
     "opt": "Next week: easy only",
     "note": ""
    },
    {
     "start": "2027-08-21",
     "phase": "reset2",
     "type": "reset",
     "km": 14,
     "long": 6,
     "sat": "Easy 5 km",
     "sun": "Easy 5 km",
     "mon": "Rest",
     "wed": "Easy 4 km",
     "opt": "Post-10K week: easy only",
     "note": ""
    },
    {
     "start": "2027-08-28",
     "phase": "k5",
     "type": "build",
     "km": 30,
     "long": 10,
     "sat": "Parkrun 5K at Z4/threshold effort",
     "sun": "Recovery 5-6 km",
     "mon": "Z3 steady 6 km",
     "wed": "8 x 400 m @ about 3:50",
     "opt": "",
     "note": ""
    },
    {
     "start": "2027-09-04",
     "phase": "k5",
     "type": "build",
     "km": 34,
     "long": 12,
     "sat": "Parkrun 5K time trial (race effort)",
     "sun": "Recovery 5-6 km",
     "mon": "Z3 steady 6 km",
     "wed": "6 x 800 m @ about 3:55",
     "opt": "",
     "note": ""
    },
    {
     "start": "2027-09-11",
     "phase": "k5",
     "type": "build",
     "km": 32,
     "long": 12,
     "sat": "Parkrun 5K at Z4/threshold effort",
     "sun": "Recovery 5-6 km",
     "mon": "Z3 steady 6 km",
     "wed": "5 x 1 km @ about 4:00",
     "opt": "",
     "note": ""
    },
    {
     "start": "2027-09-18",
     "phase": "k5t",
     "type": "taper",
     "km": 26,
     "long": 8,
     "sat": "Easy 8 km + 4 x 200 m strides",
     "sun": "Recovery 5 km",
     "mon": "Z3 steady 5 km",
     "wed": "4 x 800 m @ about 3:55, sharp not tiring",
     "opt": "",
     "note": ""
    },
    {
     "start": "2027-09-25",
     "phase": "k5t",
     "type": "race",
     "km": 20,
     "long": 5,
     "sat": "Shakeout 3 km + 4 strides",
     "sun": "Redcar 5K (target 21:00, 4:12/km)",
     "mon": "Easy 5 km",
     "wed": "",
     "opt": "If the race is the Saturday parkrun (25 Sep), shift this week back one day",
     "note": ""
    }
   ],
   "phases": [
    {
     "id": "found",
     "name": "Foundation",
     "focus": "Rebuild after the layoff. Two big weeks, then a recovery week.",
     "start": "2026-10-17",
     "end": "2026-11-06",
     "weeks": 3,
     "kmMin": 30,
     "kmMax": 58,
     "longMin": 10,
     "longMax": 27.3
    },
    {
     "id": "hm1",
     "name": "HM build 1: aerobic base",
     "focus": "Long run 14 to 19 km, Z3 introduced, 1k reps, 3:1 weeks.",
     "start": "2026-11-07",
     "end": "2027-01-01",
     "weeks": 8,
     "kmMin": 29,
     "kmMax": 44,
     "longMin": 12,
     "longMax": 19
    },
    {
     "id": "hm2",
     "name": "HM build 2: threshold and long run",
     "focus": "Long run 18 to 22 km with Z3 finishes, Z4 threshold on Mondays.",
     "start": "2027-01-02",
     "end": "2027-02-26",
     "weeks": 8,
     "kmMin": 32,
     "kmMax": 48,
     "longMin": 13,
     "longMax": 22
    },
    {
     "id": "hms",
     "name": "HM specific",
     "focus": "Long runs with HM-pace blocks, rehearsal run, optional 10K tune-up.",
     "start": "2027-02-27",
     "end": "2027-04-23",
     "weeks": 8,
     "kmMin": 34,
     "kmMax": 48,
     "longMin": 14,
     "longMax": 23
    },
    {
     "id": "hmt",
     "name": "HM taper and race",
     "focus": "Two-week taper, Great Bristol Run 9 May.",
     "start": "2027-04-24",
     "end": "2027-05-14",
     "weeks": 3,
     "kmMin": 26,
     "kmMax": 34,
     "longMin": 10,
     "longMax": 14
    },
    {
     "id": "reset1",
     "name": "Reset",
     "focus": "Easy running only after the half marathon.",
     "start": "2027-05-15",
     "end": "2027-05-28",
     "weeks": 2,
     "kmMin": 12,
     "kmMax": 24,
     "longMin": 5,
     "longMax": 8
    },
    {
     "id": "k10",
     "name": "10K build",
     "focus": "Speed endurance: tempo, 10K-pace reps, parkrun time trial.",
     "start": "2027-05-29",
     "end": "2027-08-06",
     "weeks": 10,
     "kmMin": 28,
     "kmMax": 44,
     "longMin": 11,
     "longMax": 17
    },
    {
     "id": "k10t",
     "name": "10K taper and race",
     "focus": "Short sharp reps, Bath Two Tunnels 10K 15 Aug.",
     "start": "2027-08-07",
     "end": "2027-08-20",
     "weeks": 2,
     "kmMin": 26,
     "kmMax": 30,
     "longMin": 10,
     "longMax": 10
    },
    {
     "id": "reset2",
     "name": "Reset",
     "focus": "One easy week after the 10K.",
     "start": "2027-08-21",
     "end": "2027-08-27",
     "weeks": 1,
     "kmMin": 14,
     "kmMax": 14,
     "longMin": 6,
     "longMax": 6
    },
    {
     "id": "k5",
     "name": "5K sharpen",
     "focus": "800 m and 1 km reps near 5K pace, parkruns as time trials.",
     "start": "2027-08-28",
     "end": "2027-09-17",
     "weeks": 3,
     "kmMin": 30,
     "kmMax": 34,
     "longMin": 10,
     "longMax": 12
    },
    {
     "id": "k5t",
     "name": "5K taper and race",
     "focus": "Short sharp reps, Redcar 5K 26 Sep.",
     "start": "2027-09-18",
     "end": "2027-10-01",
     "weeks": 2,
     "kmMin": 20,
     "kmMax": 26,
     "longMin": 8,
     "longMax": 8
    }
   ],
   "updated": "2026-10-15",
   "assumptions": [
    "Saturday becomes the long run from 7 Nov, because the long run is the biggest gap against your history. The Z4 tempo moves to Monday (and into the long run) so the long run can keep growing. Tell me if you would rather keep Saturday as the tempo day.",
    "Four runs a week (Sat, Sun, Mon, Wed), Tue and Thu rest, Fri yoga. Peak weeks add an optional easy 5 km on Thursday. Daytime days off can host a longer trail run.",
    "Weekly km for 17 and 24 Oct are my estimates from your schedule (only the 27.3 km trail has a fixed distance). Every later week is a target.",
    "Recovery weeks follow a 3 build : 1 recovery pattern, at about 65 to 75% of the previous week. The 31 Oct week is the first one.",
    "Rep and tempo paces start from where you are now (reps about 4:03/km) and move with each Wednesday update. Race-pace work uses the goal paces: HM 4:59, 10K 4:30, 5K 4:12.",
    "The 5K date in your list (26 Sep 2027) is a Sunday and parkrun is on Saturdays. The plan uses Sun 26 Sep. If the race is Sat 25 Sep, shift that final week back a day."
   ],
   "checkpoints": [
    {
     "date": "2026-10-24",
     "what": "Z4 parkrun (HR-led)",
     "target": "Hold HR 155-159 and note the pace. Benchmark: 5:09/km at HR 157 on 12 Sep."
    },
    {
     "date": "2026-11-21",
     "what": "Long run 17 km",
     "target": "Easy, HR 134 or lower for the first three quarters. Easy-run efficiency at 1.08 or better."
    },
    {
     "date": "2026-12-19",
     "what": "End of HM build 1",
     "target": "Long run 19 km done. Last 8 weeks average 36 km or more. No more than about 25% of time in Z3."
    },
    {
     "date": "2027-01-16",
     "what": "Long run 21 km",
     "target": "Longest run since the marathon block, at easy pace."
    },
    {
     "date": "2027-01-30",
     "what": "10K time trial (or race)",
     "target": "46:00 or faster (estimate now 45:30-46:30)."
    },
    {
     "date": "2027-02-27",
     "what": "Threshold check",
     "target": "25 min in Z4 at least 15 s/km faster than the 17 Oct tempo."
    },
    {
     "date": "2027-03-27",
     "what": "10K tune-up race (optional)",
     "target": "45:30 or better supports the 1:45:00 half marathon goal."
    },
    {
     "date": "2027-04-03",
     "what": "HM-pace rehearsal",
     "target": "10 km at 5:00-5:05/km with race fuelling. It should feel controlled; if not, reset the goal to 1:46-1:47."
    },
    {
     "date": "2027-05-09",
     "what": "Great Bristol Run (HM)",
     "target": "1:45:00 (4:59/km)."
    },
    {
     "date": "2027-07-24",
     "what": "5K time trial",
     "target": "21:10 or faster."
    },
    {
     "date": "2027-08-15",
     "what": "Bath Two Tunnels 10K",
     "target": "45:00 (4:30/km)."
    },
    {
     "date": "2027-09-11",
     "what": "5K time trial (parkrun)",
     "target": "21:00 or faster."
    },
    {
     "date": "2027-09-26",
     "what": "Redcar 5K",
     "target": "21:00 (4:12/km)."
    }
   ],
   "principles": [
    {
     "heading": "Weekly structure",
     "items": [
      "Sat: long run (or tempo in the foundation weeks). Sun: recovery. Mon: Z3 steady, then Z4 threshold. Tue: rest. Wed: intervals. Thu: rest (optional easy 5 km, or a long trail on a day off). Fri: rest or yoga.",
      "No more than two hard sessions a week besides the long run, and never on back-to-back days."
     ]
    },
    {
     "heading": "Load and recovery",
     "items": [
      "3 build weeks then 1 recovery week at about 65 to 75% of the previous week. In recovery weeks keep the run days, drop the long run to 12 to 14 km and drop all Z4 and Z5.",
      "After the 17 and 24 Oct weeks, grow volume by no more than about 10% a week and the long run by 1 to 2 km a week.",
      "Missed days: up to 3 days, just resume with no catch-up. 4 to 7 days (illness), repeat the week before at about 80% and push the plan back a week.",
      "Taper: 2 weeks for the half marathon (about 75% then 55% of peak), 1 to 2 weeks for the 10K and 5K. Easy only for a week after each race."
     ]
    },
    {
     "heading": "Intensity",
     "items": [
      "Aim for about 75 to 80% of time in Z1-Z2, about 10% in Z3 and about 10 to 12% in Z4-Z5. Right now Z3 is 27%, mostly easy runs that drift up, so set a watch alert at 134 bpm.",
      "Pace the reps by pace, not HR (HR lags and the strap has dropped out once). Check the strap fit before every quality session."
     ]
    },
    {
     "heading": "Support",
     "items": [
      "Friday yoga stays. Add one short strength session a week (calves, glutes, single-leg work).",
      "Practise race fuelling on at least three long runs in March and April. Your race plan (2 gels and 1 drink an hour) is about 90 g carbs and 640 mg sodium an hour. If the gut complains, drop to 60 g an hour.",
      "Torin 9 is at about 103 km and weekly volume is about to double. Consider a second pair to rotate before the long-run weeks.",
      "Every Wednesday after the interval session I will compare the week against this plan, update the race estimates and adjust the next week."
     ]
    }
   ],
   "races": [
    {
     "id": "g1",
     "name": "Great Bristol Run, half marathon, Sun 9 May 2027",
     "items": [
      "Target 1:45:00 (4:59/km). Km 1 to 3 at 5:03-5:05 (hold back), km 4 to 15 at 4:59, then hold on and finish as strong as you can.",
      "Past HMs: 1:46:50 (5:04/km, avg HR 180 in the older zones). If the rehearsal on 3 Apr cannot hold 5:00-5:05 under control, plan on 1:46-1:47.",
      "Fuel: your plan of 2 gels and 1 drink an hour, practised in training."
     ]
    },
    {
     "id": "g2",
     "name": "Bath Two Tunnels, 10K, Sun 15 Aug 2027",
     "items": [
      "Target 45:00 (4:30/km). Km 1 to 3 at 4:32-4:33, km 3 to 8 steady at 4:30, last 2 km as hard as you can hold.",
      "This is the stretch goal against your history (best 46:46). Key sessions: Z4 tempo 30 to 35 min, and 10K-pace reps such as 3 x 2 km at 4:30.",
      "Warm up 15 min with strides. Gel 15 min before is optional."
     ]
    },
    {
     "id": "g3",
     "name": "Redcar 5K, Sun 26 Sep 2027",
     "items": [
      "Target 21:00 (4:12/km). Km 1 at 4:13-4:14, km 2 to 4 at 4:12, km 5 all out.",
      "Your 5K PB is 21:07, so the goal is about 0.5% faster. Key sessions: 800 m and 1 km reps near 4:00 and parkrun time trials.",
      "Warm up 20 min with strides."
     ]
    }
   ]
  },
  history: {
   "monthly": [
    {
     "m": "2022-06",
     "runs": 8,
     "km": 27.2,
     "h": 3.2,
     "asc": 1045
    },
    {
     "m": "2022-07",
     "runs": 12,
     "km": 64.6,
     "h": 6.1,
     "asc": 737
    },
    {
     "m": "2022-08",
     "runs": 14,
     "km": 92.8,
     "h": 8.4,
     "asc": 191
    },
    {
     "m": "2022-09",
     "runs": 0,
     "km": 0.0,
     "h": 0.0,
     "asc": 0
    },
    {
     "m": "2022-10",
     "runs": 1,
     "km": 21.7,
     "h": 2.2,
     "asc": 68
    },
    {
     "m": "2022-11",
     "runs": 0,
     "km": 0.0,
     "h": 0.0,
     "asc": 0
    },
    {
     "m": "2022-12",
     "runs": 1,
     "km": 10.5,
     "h": 1.1,
     "asc": 140
    },
    {
     "m": "2023-01",
     "runs": 0,
     "km": 0.0,
     "h": 0.0,
     "asc": 0
    },
    {
     "m": "2023-02",
     "runs": 6,
     "km": 41.7,
     "h": 4.4,
     "asc": 76
    },
    {
     "m": "2023-03",
     "runs": 4,
     "km": 17.4,
     "h": 2.0,
     "asc": 423
    },
    {
     "m": "2023-04",
     "runs": 7,
     "km": 43.9,
     "h": 4.3,
     "asc": 492
    },
    {
     "m": "2023-05",
     "runs": 16,
     "km": 77.6,
     "h": 8.0,
     "asc": 1370
    },
    {
     "m": "2023-06",
     "runs": 4,
     "km": 23.5,
     "h": 2.6,
     "asc": 360
    },
    {
     "m": "2023-07",
     "runs": 3,
     "km": 18.3,
     "h": 1.9,
     "asc": 69
    },
    {
     "m": "2023-08",
     "runs": 11,
     "km": 69.5,
     "h": 6.8,
     "asc": 397
    },
    {
     "m": "2023-09",
     "runs": 9,
     "km": 68.1,
     "h": 7.2,
     "asc": 780
    },
    {
     "m": "2023-10",
     "runs": 7,
     "km": 60.6,
     "h": 8.9,
     "asc": 651
    },
    {
     "m": "2023-11",
     "runs": 9,
     "km": 86.9,
     "h": 9.6,
     "asc": 1189
    },
    {
     "m": "2023-12",
     "runs": 6,
     "km": 74.8,
     "h": 8.3,
     "asc": 1043
    },
    {
     "m": "2024-01",
     "runs": 0,
     "km": 0.0,
     "h": 0.0,
     "asc": 0
    },
    {
     "m": "2024-02",
     "runs": 4,
     "km": 41.6,
     "h": 4.2,
     "asc": 369
    },
    {
     "m": "2024-03",
     "runs": 3,
     "km": 48.1,
     "h": 5.0,
     "asc": 394
    },
    {
     "m": "2024-04",
     "runs": 6,
     "km": 57.8,
     "h": 5.6,
     "asc": 274
    },
    {
     "m": "2024-05",
     "runs": 0,
     "km": 0.0,
     "h": 0.0,
     "asc": 0
    },
    {
     "m": "2024-06",
     "runs": 0,
     "km": 0.0,
     "h": 0.0,
     "asc": 0
    },
    {
     "m": "2024-07",
     "runs": 0,
     "km": 0.0,
     "h": 0.0,
     "asc": 0
    },
    {
     "m": "2024-08",
     "runs": 5,
     "km": 65.3,
     "h": 7.1,
     "asc": 292
    },
    {
     "m": "2024-09",
     "runs": 2,
     "km": 14.4,
     "h": 1.5,
     "asc": 30
    },
    {
     "m": "2024-10",
     "runs": 4,
     "km": 49.6,
     "h": 5.7,
     "asc": 594
    },
    {
     "m": "2024-11",
     "runs": 7,
     "km": 74.2,
     "h": 8.2,
     "asc": 916
    },
    {
     "m": "2024-12",
     "runs": 4,
     "km": 40.4,
     "h": 4.5,
     "asc": 226
    },
    {
     "m": "2025-01",
     "runs": 3,
     "km": 31.8,
     "h": 3.5,
     "asc": 405
    },
    {
     "m": "2025-02",
     "runs": 8,
     "km": 68.5,
     "h": 7.4,
     "asc": 431
    },
    {
     "m": "2025-03",
     "runs": 10,
     "km": 137.1,
     "h": 16.7,
     "asc": 2089
    },
    {
     "m": "2025-04",
     "runs": 13,
     "km": 157.1,
     "h": 17.0,
     "asc": 1261
    },
    {
     "m": "2025-05",
     "runs": 6,
     "km": 71.2,
     "h": 7.6,
     "asc": 914
    },
    {
     "m": "2025-06",
     "runs": 3,
     "km": 44.2,
     "h": 5.4,
     "asc": 707
    },
    {
     "m": "2025-07",
     "runs": 4,
     "km": 37.8,
     "h": 4.5,
     "asc": 245
    },
    {
     "m": "2025-08",
     "runs": 5,
     "km": 49.8,
     "h": 5.5,
     "asc": 427
    },
    {
     "m": "2025-09",
     "runs": 11,
     "km": 82.9,
     "h": 11.6,
     "asc": 1684
    },
    {
     "m": "2025-10",
     "runs": 12,
     "km": 94.4,
     "h": 14.0,
     "asc": 1861
    },
    {
     "m": "2025-11",
     "runs": 13,
     "km": 129.2,
     "h": 17.4,
     "asc": 3270
    },
    {
     "m": "2025-12",
     "runs": 11,
     "km": 99.7,
     "h": 13.9,
     "asc": 2031
    },
    {
     "m": "2026-01",
     "runs": 17,
     "km": 141.1,
     "h": 22.1,
     "asc": 2950
    },
    {
     "m": "2026-02",
     "runs": 10,
     "km": 121.9,
     "h": 16.4,
     "asc": 2275
    },
    {
     "m": "2026-03",
     "runs": 9,
     "km": 92.7,
     "h": 13.1,
     "asc": 2197
    },
    {
     "m": "2026-04",
     "runs": 3,
     "km": 57.7,
     "h": 7.0,
     "asc": 855
    },
    {
     "m": "2026-05",
     "runs": 7,
     "km": 34.4,
     "h": 4.9,
     "asc": 130
    },
    {
     "m": "2026-06",
     "runs": 1,
     "km": 10.0,
     "h": 0.8,
     "asc": 69
    },
    {
     "m": "2026-07",
     "runs": 2,
     "km": 14.3,
     "h": 1.7,
     "asc": 28
    },
    {
     "m": "2026-08",
     "runs": 4,
     "km": 34.1,
     "h": 3.5,
     "asc": 134
    },
    {
     "m": "2026-09",
     "runs": 11,
     "km": 77.3,
     "h": 9.9,
     "asc": 1067
    },
    {
     "m": "2026-10",
     "runs": 6,
     "km": 47.7,
     "h": 6.1,
     "asc": 592
    }
   ],
   "block": [
    {
     "km": 11.4,
     "runs": 2,
     "long": 6.4,
     "h": 1.5,
     "asc": 189
    },
    {
     "km": 21.4,
     "runs": 3,
     "long": 9.7,
     "h": 3.1,
     "asc": 344
    },
    {
     "km": 26.1,
     "runs": 3,
     "long": 13.1,
     "h": 3.6,
     "asc": 526
    },
    {
     "km": 15.1,
     "runs": 2,
     "long": 11.5,
     "h": 2.2,
     "asc": 417
    },
    {
     "km": 8.8,
     "runs": 1,
     "long": 8.8,
     "h": 1.2,
     "asc": 208
    },
    {
     "km": 22.3,
     "runs": 3,
     "long": 10.9,
     "h": 3.0,
     "asc": 555
    },
    {
     "km": 31.2,
     "runs": 4,
     "long": 10.7,
     "h": 4.8,
     "asc": 567
    },
    {
     "km": 28.7,
     "runs": 3,
     "long": 13.9,
     "h": 4.1,
     "asc": 736
    },
    {
     "km": 12.3,
     "runs": 2,
     "long": 12.1,
     "h": 2.0,
     "asc": 3
    },
    {
     "km": 30.2,
     "runs": 3,
     "long": 11.9,
     "h": 3.8,
     "asc": 768
    },
    {
     "km": 35.2,
     "runs": 4,
     "long": 13.2,
     "h": 4.9,
     "asc": 1016
    },
    {
     "km": 34.2,
     "runs": 3,
     "long": 15.2,
     "h": 4.4,
     "asc": 831
    },
    {
     "km": 23.0,
     "runs": 2,
     "long": 16.9,
     "h": 3.3,
     "asc": 559
    },
    {
     "km": 6.6,
     "runs": 1,
     "long": 6.6,
     "h": 0.9,
     "asc": 96
    },
    {
     "km": 17.7,
     "runs": 2,
     "long": 12.3,
     "h": 2.7,
     "asc": 518
    },
    {
     "km": 13.5,
     "runs": 2,
     "long": 8.5,
     "h": 2.0,
     "asc": 213
    },
    {
     "km": 40.1,
     "runs": 4,
     "long": 16.8,
     "h": 5.4,
     "asc": 561
    },
    {
     "km": 28.4,
     "runs": 3,
     "long": 15.9,
     "h": 3.8,
     "asc": 739
    },
    {
     "km": 32.6,
     "runs": 3,
     "long": 15.5,
     "h": 4.4,
     "asc": 906
    },
    {
     "km": 32.4,
     "runs": 4,
     "long": 17.4,
     "h": 5.4,
     "asc": 1067
    },
    {
     "km": 37.5,
     "runs": 5,
     "long": 14.9,
     "h": 7.0,
     "asc": 354
    },
    {
     "km": 24.0,
     "runs": 4,
     "long": 17.3,
     "h": 3.4,
     "asc": 496
    },
    {
     "km": 33.0,
     "runs": 3,
     "long": 14.6,
     "h": 4.2,
     "asc": 375
    },
    {
     "km": 33.2,
     "runs": 3,
     "long": 15.6,
     "h": 4.8,
     "asc": 862
    },
    {
     "km": 12.5,
     "runs": 1,
     "long": 12.5,
     "h": 2.0,
     "asc": 0
    },
    {
     "km": 36.1,
     "runs": 3,
     "long": 21.6,
     "h": 4.3,
     "asc": 648
    },
    {
     "km": 39.7,
     "runs": 3,
     "long": 21.7,
     "h": 5.7,
     "asc": 878
    },
    {
     "km": 0,
     "runs": 0,
     "long": 0,
     "h": 0.0,
     "asc": 0
    },
    {
     "km": 21.4,
     "runs": 1,
     "long": 21.4,
     "h": 2.0,
     "asc": 101
    },
    {
     "km": 34.1,
     "runs": 4,
     "long": 20.1,
     "h": 5.5,
     "asc": 1213
    },
    {
     "km": 19.2,
     "runs": 2,
     "long": 13.7,
     "h": 2.8,
     "asc": 522
    },
    {
     "km": 0,
     "runs": 0,
     "long": 0,
     "h": 0.0,
     "asc": 0
    },
    {
     "km": 52.7,
     "runs": 2,
     "long": 45.3,
     "h": 6.5,
     "asc": 830
    }
   ],
   "eff": [
    {
     "m": "2025-01",
     "n": 2,
     "ef": 1.17,
     "pace": 380,
     "hr": 136
    },
    {
     "m": "2025-02",
     "n": 2,
     "ef": 1.06,
     "pace": 431,
     "hr": 132
    },
    {
     "m": "2025-04",
     "n": 5,
     "ef": 1.18,
     "pace": 406,
     "hr": 125
    },
    {
     "m": "2025-05",
     "n": 2,
     "ef": 1.2,
     "pace": 373,
     "hr": 134
    },
    {
     "m": "2025-09",
     "n": 5,
     "ef": 1.04,
     "pace": 486,
     "hr": 119
    },
    {
     "m": "2025-10",
     "n": 3,
     "ef": 1.02,
     "pace": 483,
     "hr": 126
    },
    {
     "m": "2025-11",
     "n": 2,
     "ef": 0.95,
     "pace": 504,
     "hr": 126
    },
    {
     "m": "2026-01",
     "n": 2,
     "ef": 0.97,
     "pace": 536,
     "hr": 116
    },
    {
     "m": "2026-02",
     "n": 3,
     "ef": 0.99,
     "pace": 461,
     "hr": 133
    },
    {
     "m": "2026-04",
     "n": 2,
     "ef": 1.07,
     "pace": 448,
     "hr": 127
    },
    {
     "m": "2026-05",
     "n": 3,
     "ef": 1.23,
     "pace": 386,
     "hr": 127
    },
    {
     "m": "2026-09",
     "n": 6,
     "ef": 1.07,
     "pace": 443,
     "hr": 129
    },
    {
     "m": "2026-10",
     "n": 5,
     "ef": 1.04,
     "pace": 448,
     "hr": 129
    }
   ],
   "efforts": [
    {
     "date": "2019-06-22",
     "dist": "5K",
     "km": 5.0,
     "secs": 1316,
     "hr": null,
     "mhr": null,
     "vdot": 44.7,
     "kind": "race",
     "title": "Running"
    },
    {
     "date": "2023-08-19",
     "dist": "5K",
     "km": 5.0,
     "secs": 1330,
     "hr": 179.0,
     "mhr": 199.0,
     "vdot": 44.1,
     "kind": "race",
     "title": "Redcar and Cleveland Running"
    },
    {
     "date": "2024-11-30",
     "dist": "5K",
     "km": 4.99,
     "secs": 1324,
     "hr": 164.0,
     "mhr": 184.0,
     "vdot": 44.3,
     "kind": "race",
     "title": "North Kesteven - 5kPb"
    },
    {
     "date": "2025-02-22",
     "dist": "5K",
     "km": 4.99,
     "secs": 1343,
     "hr": 176.0,
     "mhr": 191.0,
     "vdot": 43.5,
     "kind": "race",
     "title": "Redcar and Cleveland - 5kPb"
    },
    {
     "date": "2025-04-19",
     "dist": "5K",
     "km": 5.0,
     "secs": 1267,
     "hr": 179.0,
     "mhr": 201.0,
     "vdot": 46.7,
     "kind": "race",
     "title": "Redcar and Cleveland - 5kPb"
    },
    {
     "date": "2019-05-12",
     "dist": "10K",
     "km": 10.0,
     "secs": 2806,
     "hr": null,
     "mhr": null,
     "vdot": 43.3,
     "kind": "race",
     "title": "Running"
    },
    {
     "date": "2020-03-01",
     "dist": "10K",
     "km": 10.0,
     "secs": 2927,
     "hr": 179.0,
     "mhr": 196.0,
     "vdot": 41.2,
     "kind": "race",
     "title": "Bath Running"
    },
    {
     "date": "2022-07-10",
     "dist": "10K",
     "km": 10.01,
     "secs": 2922,
     "hr": 176.0,
     "mhr": 195.0,
     "vdot": 41.3,
     "kind": "race",
     "title": "Bath Running"
    },
    {
     "date": "2026-06-07",
     "dist": "10K",
     "km": 10.0,
     "secs": 2818,
     "hr": 174.0,
     "mhr": 190.0,
     "vdot": 43.1,
     "kind": "race",
     "title": "Bath - 10k"
    },
    {
     "date": "2019-03-17",
     "dist": "HM",
     "km": 21.24,
     "secs": 6488,
     "hr": null,
     "mhr": null,
     "vdot": 41.5,
     "kind": "race",
     "title": "Running"
    },
    {
     "date": "2022-08-28",
     "dist": "HM",
     "km": 21.25,
     "secs": 6470,
     "hr": 174.0,
     "mhr": 186.0,
     "vdot": 41.7,
     "kind": "race",
     "title": "Forest of Dean Running"
    },
    {
     "date": "2023-09-17",
     "dist": "HM",
     "km": 21.1,
     "secs": 6422,
     "hr": 174.0,
     "mhr": 190.0,
     "vdot": 41.7,
     "kind": "race",
     "title": "Wiltshire Running"
    },
    {
     "date": "2025-05-11",
     "dist": "HM",
     "km": 21.1,
     "secs": 6410,
     "hr": 180.0,
     "mhr": 196.0,
     "vdot": 41.8,
     "kind": "race",
     "title": "Bristol - Great Bristol Run"
    },
    {
     "date": "2025-08-17",
     "dist": "HM",
     "km": 21.28,
     "secs": 7180,
     "hr": 173.0,
     "mhr": 199.0,
     "vdot": 37.0,
     "kind": "race",
     "title": "Bath - 17Aug"
    },
    {
     "date": "2026-03-15",
     "dist": "HM",
     "km": 21.36,
     "secs": 7270,
     "hr": 163.0,
     "mhr": 184.0,
     "vdot": 36.6,
     "kind": "steady",
     "title": "Bath - Two tunnels hilly half"
    },
    {
     "date": "2026-08-16",
     "dist": "HM",
     "km": 22.11,
     "secs": 7893,
     "hr": 159.0,
     "mhr": 186.0,
     "vdot": 34.7,
     "kind": "steady",
     "title": "Bath - 16 Aug"
    }
   ],
   "blockStart": "2025-08-30",
   "notes": [
    {
     "heading": "This block vs the 2025/26 trail-marathon block (same dates, 1 Sep to 12 Oct)",
     "items": [
      "Same volume and frequency: 115.6 km in 16 runs this year, 120.5 km in 16 runs last year.",
      "Last year was slower and hillier: 17.6 h and 2,632 m of ascent against 14.8 h and 1,558 m now. The longest run was 13.1 km then and is 9.7 km now. Average HR was 122 then and 129 now, so this block is faster and harder but shorter on the long run.",
      "Quality work has changed. This block has 6 quality sessions in 6 weeks. Across the whole 32-week marathon block, titled quality or race-effort sessions came to about 10 (hill sessions, a few tempos and two \"hilly half\" runs). That counts titles only, so it may be an undercount."
     ]
    },
    {
     "heading": "What the marathon block built",
     "items": [
      "84 runs plus one treadmill run, 815 km, 115 hours and 17,098 m of ascent in 32 weeks (25.6 km and 2.7 runs a week). The biggest non-race week was 40 km (20 Dec).",
      "Twelve runs of 15 km or more before the race, four of them 20 km or more (21.7, 21.6, 21.4 and 20.1 km, Feb to Mar), then 45.3 km in 5:26:24 on 12 Apr 2026 (7:13/km, avg HR 153, 804 m ascent).",
      "Your 22 Oct trail (27.3 km, 3:08 h, 430 m) is the same time on feet as your 21 Mar long run (20.1 km, 3:10, 911 m), so it is well inside what you have done. The risk is the layoff: Jun to Aug 2026 was 58 km, against 132 km in 2025."
     ]
    },
    {
     "heading": "What built your half marathon PB (Feb to May 2025)",
     "items": [
      "About 37 km a week for eight weeks (8 Mar to 26 Apr 2025) from mostly 2 to 3 runs a week (one week had 7), with a long run of roughly 15 to 21 km every week (average 18 km). The 5K PB (21:07, 19 Apr) came in the middle of that block and the HM PB (1:46:50) three weeks later.",
      "Compare now: about 24 km a week and a longest run of 9 to 10 km."
     ]
    },
    {
     "heading": "Aerobic efficiency",
     "items": [
      "Speed per heartbeat on flat easy runs is 1.04 to 1.07 now, the same as Sep to Oct 2025 (1.02 to 1.04). It was 1.18 to 1.20 in Apr to May 2025 and 1.23 in May 2026. In pace terms, easy runs at HR 125 to 134 were 6:15 to 6:45/km then and are about 7:25/km now.",
      "In 2025 it rose from 1.06 (Feb) to 1.18 (Apr) over about two months of roughly 35 km weeks, so there is a precedent for the same recovery."
     ]
    },
    {
     "heading": "Race history and goals",
     "items": [
      "Your half marathons are remarkably consistent: 1:48:08 (2019), 1:47:50 (2022), 1:47:02 (2023) and 1:46:50 (2025) all work out at VDOT 41.5 to 41.8. The 1:45:00 goal (VDOT 42.6) is about 1.7% faster than your PB.",
      "The 5K goal (21:00) is about 0.5% faster than your 21:07 PB. The 10K goal (45:00) is the stretch: your best is 46:46 (2019) and 46:58 (Jun 2026), so 45:00 is 3.8% faster, even though your 5K PB predicts about 43:45.",
      "The 5K-to-HM conversion was 1.05 in 2023 and 1.10 in 2025. The race-day projections on the Review tab use a 2025-like conversion (x1.09 to x1.10), which is the cautious end."
     ]
    },
    {
     "heading": "Max HR and data caveats",
     "items": [
      "Max HR 201 (5K, Apr 2025) is backed by 199 in two other efforts (Aug 2023 5K, Aug 2025 HM), so it looks real rather than a spike. In 2026 your highest HR was 190, so the zones (Z5 from 160 bpm) are probably set for a lower max and are worth revisiting.",
      "The same Bath HM a year apart: 1:59:40 at avg HR 173 (Aug 2025) and 2:11:33 at avg HR 159 (Aug 2026). The 2026 run was a much less intense effort.",
      "Data gaps: the CSV is thin before 2023 (many months have no runs), so older weekly numbers are not reliable. Months with fewer than two flat easy runs are left out of the efficiency chart."
     ]
    }
   ]
  },
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
    { id: 's10', date: '2026-10-26', session: '5K at Z3', details: 'HR 135-154, first planned Z3 session. Start in low Z3. Half term' },
    { id: 's11', date: '2026-10-27', session: 'Easy run', details: 'Low Z2, keeps Wednesday\'s intervals fresh. Half term' },
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
        'Week of 24 Oct: Mon 26 is the first planned Z3 session (5K at HR 135-154, roughly 5:45-6:20/km; start in low Z3 and set an HR alert at 154). Tue 27 is an easy run so Wed 28 (5 x 1 km) starts fresh.'] }
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
