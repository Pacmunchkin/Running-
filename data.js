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
     "km": 50,
     "long": 27.3,
     "sat": "Z4 tempo, 20 min (10 min out, 10 min back)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Steady high Z2, 8-9 km (HR 125-134)",
     "wed": "Rest (pyramid skipped to save energy for Thursday)",
     "opt": "Thu: trail run/hike 27.3 km, 3:08 h, easy Z2",
     "fuel": "Tempo: nothing during. Thursday trail: 1 gel + 1 drink + 1 homemade bar every hour (see the schedule).",
     "note": "Wednesday pyramid skipped. The Thursday trail came in at 20.5 km instead of the planned 27.3 km, so the week is about 41 km (Sat 8.4, Sun 6.0, Mon 6.4, Thu 20.5). The 24 Oct week is unchanged."
    },
    {
     "start": "2026-10-24",
     "phase": "found",
     "type": "build",
     "km": 36,
     "long": 10,
     "sat": "5K parkrun at Z4 (HR-led), done: 4.87 km at 4:49/km",
     "sun": "Rest (ran a 5.4 km recovery run instead, HR 116)",
     "mon": "Rest",
     "wed": "5 x 1 km @ about 4:00-4:05, 1 min jog",
     "opt": "Tue easy, Thu recovery, Fri easy",
     "fuel": "None during any run this week. Breakfast before parkrun.",
     "note": "Two rest days after a heavy few days, so this is a light week of about 36 km. The Z3 session moves to a later week."
    },
    {
     "start": "2026-10-31",
     "phase": "found",
     "type": "recovery",
     "km": 30,
     "long": 11,
     "sat": "Easy 8-10 km, Z2",
     "sun": "Pure recovery 5 km (HR under 125)",
     "mon": "Easy 7 km",
     "wed": "Easy 6 km + 6 x 100 m strides",
     "opt": "Optional easy 5 km Thu/Fri",
     "fuel": "None.",
     "note": "Recovery week after two big ones: no Z4 or Z5."
    },
    {
     "start": "2026-11-07",
     "phase": "hm1",
     "type": "build",
     "km": 36,
     "long": 14,
     "sat": "Long run 14 km: Z2 (HR 134 or lower), then the last 15 min in Z3 (HR 135-154)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Z3 steady 5-6 km (HR 135-154)",
     "wed": "6 x 1 km @ about 4:03, 1 min jog",
     "opt": "Optional Thu: easy 5 km",
     "fuel": "Before: breakfast 2 h before. During: 1 gel at about 50 min. After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2026-11-14",
     "phase": "hm1",
     "type": "build",
     "km": 38,
     "long": 15,
     "sat": "Long run 15 km: Z2 (HR 134 or lower), then the last 20 min in Z3 (HR 135-154)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Steady high Z2, 8-9 km",
     "wed": "6 x 800 m @ about 3:55, 1 min jog",
     "opt": "Optional Thu: easy 5 km",
     "fuel": "Before: breakfast 2 h before. During: 1 gel at about 50 min. After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2026-11-21",
     "phase": "hm1",
     "type": "build",
     "km": 40,
     "long": 17,
     "sat": "Long run 17 km: Z2 (HR 134 or lower), then the last 20 min in Z3 (HR 135-154)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Split threshold: 15 min total, jog 1-3 min whenever you feel yourself going over",
     "wed": "6 x 1 km @ about 4:00, 1 min jog",
     "opt": "Optional Thu: easy 5 km",
     "fuel": "Before: breakfast 2 h before. During: 2 gels (at about 45 and 90 min). After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2026-11-28",
     "phase": "hm1",
     "type": "recovery",
     "km": 29,
     "long": 12,
     "sat": "Easy long run 12 km, all Z2",
     "sun": "Pure recovery 5 km (HR under 125)",
     "mon": "Easy 6-7 km",
     "wed": "Easy 6 km + 6 x 100 m strides",
     "opt": "",
     "fuel": "None.",
     "note": ""
    },
    {
     "start": "2026-12-05",
     "phase": "hm1",
     "type": "build",
     "km": 40,
     "long": 17,
     "sat": "Long run 17 km: Z2 (HR 134 or lower), then the last 20 min in Z3 (HR 135-154)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Split threshold: 20 min total, jog 1-3 min whenever you feel yourself going over",
     "wed": "6 x 1 km @ about 4:03, 1 min jog",
     "opt": "Optional Thu: easy 5 km",
     "fuel": "Before: breakfast 2 h before. During: 2 gels (at about 45 and 90 min). After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2026-12-12",
     "phase": "hm1",
     "type": "build",
     "km": 42,
     "long": 18,
     "sat": "Long run 18 km: Z2 (HR 134 or lower), then the last 25 min in Z3 (HR 135-154)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Steady high Z2, 8-9 km",
     "wed": "6 x 800 m @ about 3:55, 1 min jog",
     "opt": "Optional Thu: easy 5 km",
     "fuel": "Before: breakfast 2 h before. During: 2 gels (at about 45 and 90 min). After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2026-12-19",
     "phase": "hm1",
     "type": "build",
     "km": 44,
     "long": 19,
     "sat": "Long run 19 km: Z2 (HR 134 or lower), then the last 25 min in Z3 (HR 135-154)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Split threshold: 25 min total, jog 1-3 min whenever you feel yourself going over",
     "wed": "6 x 1 km @ about 4:00, 1 min jog",
     "opt": "Optional Thu: easy 5 km",
     "fuel": "Before: breakfast 2 h before. During: 2 gels (at about 45 and 90 min). After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2026-12-26",
     "phase": "hm1",
     "type": "recovery",
     "km": 30,
     "long": 12,
     "sat": "Easy long run 12 km, all Z2",
     "sun": "Pure recovery 5 km (HR under 125)",
     "mon": "Easy 6-7 km",
     "wed": "Easy 6 km + 6 x 100 m strides",
     "opt": "",
     "fuel": "None.",
     "note": ""
    },
    {
     "start": "2027-01-02",
     "phase": "hm2",
     "type": "build",
     "km": 42,
     "long": 18,
     "sat": "Long run 18 km: Z2 (HR 134 or lower), then the last 25 min in Z3 (HR 135-154)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Split threshold: 25 min total, jog 1-3 min whenever you feel yourself going over",
     "wed": "5 x 1.2 km @ about 4:15 (10K effort)",
     "opt": "Optional Thu: easy 5 km",
     "fuel": "Before: breakfast 2 h before. During: 2 gels (at about 45 and 90 min). After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2027-01-09",
     "phase": "hm2",
     "type": "build",
     "km": 44,
     "long": 20,
     "sat": "Long run 20 km: Z2 (HR 134 or lower), then the last 30 min in Z3 (HR 135-154)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Split threshold: 30 min total, jog 1-3 min whenever you feel yourself going over",
     "wed": "8 x 400 m @ about 3:50",
     "opt": "Optional Thu: easy 5 km",
     "fuel": "Before: breakfast 2 h before. During: 2 gels (at about 45 and 90 min). After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2027-01-16",
     "phase": "hm2",
     "type": "build",
     "km": 46,
     "long": 21,
     "sat": "Long run 21 km: Z2 (HR 134 or lower), then the last 30 min in Z3 (HR 135-154)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Split threshold: 30 min total, jog 1-3 min whenever you feel yourself going over",
     "wed": "6 x 1 km @ about 4:00",
     "opt": "Optional Thu: easy 5 km",
     "fuel": "Before: breakfast 2-3 h before. During: 1 gel + 1 drink every hour from about 40 min. After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2027-01-23",
     "phase": "hm2",
     "type": "recovery",
     "km": 32,
     "long": 13,
     "sat": "Easy long run 13 km, all Z2",
     "sun": "Pure recovery 5 km (HR under 125)",
     "mon": "Easy 6-7 km",
     "wed": "Easy 6 km + 6 x 100 m strides",
     "opt": "",
     "fuel": "None.",
     "note": ""
    },
    {
     "start": "2027-01-30",
     "phase": "hm2",
     "type": "build",
     "km": 44,
     "long": 20,
     "sat": "Long run 20 km: Z2 (HR 134 or lower), then the last 30 min in Z3 (HR 135-154)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Split threshold: 30 min total, jog 1-3 min whenever you feel yourself going over",
     "wed": "5 x 1.2 km @ about 4:15 (10K effort)",
     "opt": "Optional Thu: easy 5 km",
     "fuel": "Before: breakfast 2 h before. During: 2 gels (at about 45 and 90 min). After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2027-02-06",
     "phase": "hm2",
     "type": "build",
     "km": 46,
     "long": 22,
     "sat": "Long run 22 km: Z2 (HR 134 or lower), then the last 35 min in Z3 (HR 135-154)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Split threshold: 35 min total, jog 1-3 min whenever you feel yourself going over",
     "wed": "8 x 400 m @ about 3:50",
     "opt": "Optional Thu: easy 5 km",
     "fuel": "Before: breakfast 2-3 h before. During: 1 gel + 1 drink every hour from about 40 min. After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2027-02-13",
     "phase": "hm2",
     "type": "build",
     "km": 48,
     "long": 22,
     "sat": "Long run 22 km: Z2 (HR 134 or lower), then the last 35 min in Z3 (HR 135-154)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Split threshold: 35 min total, jog 1-3 min whenever you feel yourself going over",
     "wed": "6 x 1 km @ about 4:00",
     "opt": "Optional Thu: easy 5 km",
     "fuel": "Before: breakfast 2-3 h before. During: 1 gel + 1 drink every hour from about 40 min. After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2027-02-20",
     "phase": "hm2",
     "type": "recovery",
     "km": 33,
     "long": 14,
     "sat": "Easy long run 14 km, all Z2",
     "sun": "Pure recovery 5 km (HR under 125)",
     "mon": "Easy 6-7 km",
     "wed": "Easy 6 km + 6 x 100 m strides",
     "opt": "",
     "fuel": "None.",
     "note": ""
    },
    {
     "start": "2027-02-27",
     "phase": "hms",
     "type": "build",
     "km": 46,
     "long": 22,
     "sat": "Long run 22 km: Z2, then 3 x 2 km @ about 5:05 inside the long run (Z3-Z4 effort)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Split threshold: 35 min total, jog 1-3 min whenever you feel yourself going over",
     "wed": "4 x 2 km @ about 4:30",
     "opt": "Optional Thu: easy 5 km",
     "fuel": "Before: breakfast 2-3 h before. During: 1 gel + 1 drink every hour from about 40 min. After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2027-03-06",
     "phase": "hms",
     "type": "peak",
     "km": 48,
     "long": 23,
     "sat": "Long run 23 km: 2 x 5 km @ HM pace (4:59-5:05) (Z3-Z4 effort)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Split threshold: 30 min total, jog 1-3 min whenever you feel yourself going over, with 4 x 30 s surges",
     "wed": "6 x 1 km @ about 4:00",
     "opt": "Optional Thu: easy 5 km",
     "fuel": "Before: breakfast 2-3 h before. During: 1 gel + 1 drink every hour from about 40 min. After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2027-03-13",
     "phase": "hms",
     "type": "build",
     "km": 46,
     "long": 21,
     "sat": "Long run 21 km: 8 km @ HM pace (Z3-Z4 effort)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Split threshold: 35 min total, jog 1-3 min whenever you feel yourself going over",
     "wed": "5 x 1.6 km @ about 4:25",
     "opt": "Optional Thu: easy 5 km",
     "fuel": "Race rehearsal. Before: breakfast 2-3 h before. During: 2 race gels + 1 race drink every hour. After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2027-03-20",
     "phase": "hms",
     "type": "recovery",
     "km": 34,
     "long": 14,
     "sat": "Easy long run 14 km, all Z2",
     "sun": "Pure recovery 5 km (HR under 125)",
     "mon": "Easy 6-7 km",
     "wed": "Easy 6 km + 6 x 100 m strides",
     "opt": "",
     "fuel": "None.",
     "note": ""
    },
    {
     "start": "2027-03-27",
     "phase": "hms",
     "type": "build",
     "km": 46,
     "long": 22,
     "sat": "Long run 22 km: 10 km @ HM pace (peak) (Z3-Z4 effort)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Split threshold: 35 min total, jog 1-3 min whenever you feel yourself going over (uphill threshold instead if it has stalled)",
     "wed": "4 x 2 km @ about 4:30",
     "opt": "Optional Thu: easy 5 km. Optional 10K tune-up race around 27-28 Mar",
     "fuel": "Race rehearsal. Before: breakfast 2-3 h before. During: 2 race gels + 1 race drink every hour. After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2027-04-03",
     "phase": "hms",
     "type": "build",
     "km": 44,
     "long": 20,
     "sat": "Long run 20 km: Rehearsal: 16 km with 10 km @ HM pace, race fuelling (Z3-Z4 effort)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Split threshold: 30 min total, jog 1-3 min whenever you feel yourself going over",
     "wed": "6 x 1 km @ about 4:00",
     "opt": "Optional Thu: easy 5 km",
     "fuel": "Race rehearsal. Before: breakfast 2-3 h before. During: 2 race gels + 1 race drink every hour. After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2027-04-10",
     "phase": "hms",
     "type": "recovery",
     "km": 36,
     "long": 16,
     "sat": "Easy long run 16 km, all Z2",
     "sun": "Pure recovery 5 km (HR under 125)",
     "mon": "Easy 6-7 km",
     "wed": "Easy 6 km + 6 x 100 m strides",
     "opt": "",
     "fuel": "None.",
     "note": ""
    },
    {
     "start": "2027-04-17",
     "phase": "hms",
     "type": "build",
     "km": 42,
     "long": 18,
     "sat": "Long run 18 km: Last long run: 18 km with 8 km @ HM pace (Z3-Z4 effort)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Split threshold: 25 min total, jog 1-3 min whenever you feel yourself going over",
     "wed": "5 x 1.6 km @ about 4:25",
     "opt": "Optional Thu: easy 5 km",
     "fuel": "Race rehearsal. Before: breakfast 2-3 h before. During: 2 race gels + 1 race drink every hour. After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2027-04-24",
     "phase": "hmt",
     "type": "taper",
     "km": 34,
     "long": 14,
     "sat": "14 km easy with 4 km @ HM pace",
     "sun": "Pure recovery 5 km",
     "mon": "Z3 steady 5 km",
     "wed": "4 x 1 km @ about 4:00 (stay sharp, short)",
     "opt": "",
     "fuel": "None.",
     "note": ""
    },
    {
     "start": "2027-05-01",
     "phase": "hmt",
     "type": "taper",
     "km": 26,
     "long": 10,
     "sat": "10 km easy + 3 x 1 km @ HM pace",
     "sun": "Pure recovery 5 km",
     "mon": "Easy 6 km",
     "wed": "3 x 1 km @ HM pace, easy 5 km around it",
     "opt": "",
     "fuel": "None.",
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
     "fuel": "Race plan: 2 gels + 1 drink every hour. Carb dinner the night before.",
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
     "fuel": "None.",
     "note": ""
    },
    {
     "start": "2027-05-22",
     "phase": "reset1",
     "type": "build",
     "km": 24,
     "long": 8,
     "sat": "Long run 8 km, easy Z2",
     "sun": "Pure recovery 5 km (HR under 125)",
     "mon": "Z3 steady 5 km (HR 135-154)",
     "wed": "Easy 6 km + 6 x 100 m strides",
     "opt": "Return week: build volume gently",
     "fuel": "None. Breakfast 2 h before.",
     "note": ""
    },
    {
     "start": "2027-05-29",
     "phase": "k10",
     "type": "build",
     "km": 34,
     "long": 12,
     "sat": "Long run 12 km: Z2 (HR 134 or lower), then the last 20 min in Z3 (HR 135-154)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Z3 steady 6 km (HR 135-154)",
     "wed": "3 x 2 km @ about 4:30 (10K pace)",
     "opt": "Optional Thu: easy 5 km.",
     "fuel": "None. Breakfast 2 h before.",
     "note": ""
    },
    {
     "start": "2027-06-05",
     "phase": "k10",
     "type": "build",
     "km": 38,
     "long": 14,
     "sat": "Long run 14 km: Z2 (HR 134 or lower), then the last 20 min in Z3 (HR 135-154)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Split threshold: 20 min total, jog 1-3 min whenever you feel yourself going over",
     "wed": "5 x 1 km @ about 4:05",
     "opt": "Optional Thu: easy 5 km.",
     "fuel": "Before: breakfast 2 h before. During: 1 gel at about 50 min. After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2027-06-12",
     "phase": "k10",
     "type": "build",
     "km": 40,
     "long": 15,
     "sat": "Long run 15 km: Z2 (HR 134 or lower), then the last 25 min in Z3 (HR 135-154)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Split threshold: 25 min total, jog 1-3 min whenever you feel yourself going over",
     "wed": "5 x 1.2 km @ about 4:15",
     "opt": "Optional Thu: easy 5 km.",
     "fuel": "Before: breakfast 2 h before. During: 1 gel at about 50 min. After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2027-06-19",
     "phase": "k10",
     "type": "recovery",
     "km": 28,
     "long": 11,
     "sat": "Easy long run 11 km, all Z2",
     "sun": "Pure recovery 5 km",
     "mon": "Easy 6 km",
     "wed": "Easy 6 km + strides",
     "opt": "",
     "fuel": "None.",
     "note": ""
    },
    {
     "start": "2027-06-26",
     "phase": "k10",
     "type": "build",
     "km": 40,
     "long": 16,
     "sat": "Long run 16 km: Z2 (HR 134 or lower), then the last 30 min in Z3 (HR 135-154)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Split threshold: 30 min total, jog 1-3 min whenever you feel yourself going over",
     "wed": "6 x 1 km @ about 4:05",
     "opt": "Optional Thu: easy 5 km.",
     "fuel": "Before: breakfast 2 h before. During: 1 gel at about 50 min. After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2027-07-03",
     "phase": "k10",
     "type": "build",
     "km": 42,
     "long": 16,
     "sat": "Long run 16 km: Z2 (HR 134 or lower), then the last 30 min in Z3 (HR 135-154)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Split threshold: 30 min total, jog 1-3 min whenever you feel yourself going over, with 4 x 30 s surges",
     "wed": "3 x 2 km @ about 4:30 (10K pace)",
     "opt": "Optional Thu: easy 5 km.",
     "fuel": "Before: breakfast 2 h before. During: 1 gel at about 50 min. After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2027-07-10",
     "phase": "k10",
     "type": "build",
     "km": 44,
     "long": 17,
     "sat": "Long run 17 km: Z2 (HR 134 or lower), then the last 35 min in Z3 (HR 135-154)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Split threshold: 35 min total, jog 1-3 min whenever you feel yourself going over",
     "wed": "5 x 1 km @ about 4:05",
     "opt": "Optional Thu: easy 5 km.",
     "fuel": "Before: breakfast 2 h before. During: 2 gels (at about 45 and 90 min). After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2027-07-17",
     "phase": "k10",
     "type": "recovery",
     "km": 30,
     "long": 12,
     "sat": "Easy long run 12 km, all Z2",
     "sun": "Pure recovery 5 km",
     "mon": "Easy 6 km",
     "wed": "Easy 6 km + strides",
     "opt": "",
     "fuel": "None.",
     "note": ""
    },
    {
     "start": "2027-07-24",
     "phase": "k10",
     "type": "build",
     "km": 42,
     "long": 16,
     "sat": "Long run 16 km: Z2 (HR 134 or lower), then the last 35 min in Z3 (HR 135-154)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Split threshold: 35 min total, jog 1-3 min whenever you feel yourself going over, with 4 x 30 s surges",
     "wed": "4 x 1.6 km @ about 4:20",
     "opt": "Optional Thu: easy 5 km. Parkrun 5K time trial this week (Sat or in place of the long run).",
     "fuel": "Before: breakfast 2 h before. During: 1 gel at about 50 min. After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2027-07-31",
     "phase": "k10",
     "type": "build",
     "km": 40,
     "long": 14,
     "sat": "Long run 14 km: Z2 (HR 134 or lower), then the last 35 min in Z3 (HR 135-154)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Split threshold: 30 min total, jog 1-3 min whenever you feel yourself going over",
     "wed": "6 x 1 km @ about 4:05",
     "opt": "Optional Thu: easy 5 km.",
     "fuel": "Before: breakfast 2 h before. During: 1 gel at about 50 min. After: carbs + protein.",
     "note": ""
    },
    {
     "start": "2027-08-07",
     "phase": "k10t",
     "type": "taper",
     "km": 30,
     "long": 10,
     "sat": "Easy 10 km + 4 x 200 m strides",
     "sun": "Pure recovery 5 km",
     "mon": "Z3 steady 5 km",
     "wed": "4 x 1 km @ about 4:30 (10K pace), sharp not tiring",
     "opt": "",
     "fuel": "None.",
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
     "fuel": "None during. Carb dinner the night before.",
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
     "fuel": "None.",
     "note": ""
    },
    {
     "start": "2027-08-28",
     "phase": "k5",
     "type": "build",
     "km": 30,
     "long": 10,
     "sat": "Parkrun 5K at Z4/threshold effort",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Z3 steady 6 km",
     "wed": "8 x 400 m @ about 3:50",
     "opt": "",
     "fuel": "None. Breakfast 2 h before.",
     "note": ""
    },
    {
     "start": "2027-09-04",
     "phase": "k5",
     "type": "build",
     "km": 34,
     "long": 12,
     "sat": "Parkrun 5K time trial (race effort)",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Z3 steady 6 km",
     "wed": "6 x 800 m @ about 3:55",
     "opt": "",
     "fuel": "None. Breakfast 2 h before.",
     "note": ""
    },
    {
     "start": "2027-09-11",
     "phase": "k5",
     "type": "build",
     "km": 32,
     "long": 12,
     "sat": "Parkrun 5K at Z4/threshold effort",
     "sun": "Pure recovery 5-6 km (HR under 125)",
     "mon": "Z3 steady 6 km",
     "wed": "5 x 1 km @ about 4:00",
     "opt": "",
     "fuel": "None. Breakfast 2 h before.",
     "note": ""
    },
    {
     "start": "2027-09-18",
     "phase": "k5t",
     "type": "taper",
     "km": 26,
     "long": 8,
     "sat": "Easy 8 km + 4 x 200 m strides",
     "sun": "Pure recovery 5 km",
     "mon": "Z3 steady 5 km",
     "wed": "4 x 800 m @ about 3:55, sharp not tiring",
     "opt": "",
     "fuel": "None.",
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
     "fuel": "None during. Carb dinner the night before.",
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
     "focus": "Long run 14 to 19 km with a Z3 finish most weeks, Z3 steady Mondays with split threshold (15 to 25 min) from late November, 1k reps, 3:1 weeks.",
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
     "focus": "Long run 18 to 22 km with 25 to 35 min of Z3, split threshold on Mondays (25 to 35 min total).",
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
     "focus": "Long run with a Z3 finish, split threshold on Mondays (20 to 35 min total), 10K-pace reps, parkrun time trial.",
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
    "Saturday becomes the long run from 7 Nov, because the long run is the biggest gap against your history. Every build-week long run has a deliberate Z3 finish (15 to 35 min in Z3, HR 135-154, after the Z2 part), and the Z4 tempo moves to Monday. Recovery weeks stay all easy.",
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
     "target": "35 min split threshold by feel. At the same talk-test effort, aim for 10 to 15 s/km faster than the first split threshold in late November."
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
      "Sat: long run with a Z3 finish (most weeks). Sun: pure recovery, 5 to 6 km at HR under 125 (Z1 to low Z2). Mon: Z3 steady, then split threshold from late November. Tue: rest. Wed: intervals. Thu: rest (optional easy 5 km, or a long trail on a day off). Fri: rest or yoga.",
      "No more than two hard sessions a week besides the long run, and never on back-to-back days. Z3 in the long run is the second half only, so the first half stays easy."
     ]
    },
    {
     "heading": "Load and recovery",
     "items": [
      "3 build weeks then 1 recovery week at about 65 to 75% of the previous week. In recovery weeks keep the run days, drop the long run to 12 to 14 km and drop all Z4 and Z5.",
      "After the 17 and 24 Oct weeks, grow volume by no more than about 10% a week and the long run by 1 to 2 km a week.",
      "Missed days: up to 3 days, just resume with no catch-up. 4 to 7 days (illness), repeat the week before at about 80% and push the plan back a week.",
      "Taper: 2 weeks for the half marathon (about 75% then 55% of peak), 1 to 2 weeks for the 10K and 5K. Easy only for a week after each race.",
      "If a long run with a Z3 finish leaves you flat on Monday, swap Monday's split threshold for a Z3 steady run that week and tell me.",
      "Resting HR check: your baseline is about 40 bpm. If it is 3 bpm or more above that for two mornings, make the next day easy or rest, and tell me. In September it rose from 40 to 44 across the week of the illness."
     ]
    },
    {
     "heading": "Intensity",
     "items": [
      "Aim for about 65 to 70% of time in Z1-Z2, about 15 to 20% in Z3 and about 10 to 12% in Z4-Z5. Z3 is now a deliberate part of the plan (long-run finishes and Monday steady runs), not drift on easy days. Set a watch alert at 134 bpm for the easy parts and at 154 for the Z3 parts.",
      "Pace the reps by pace, not HR (HR lags and the strap has dropped out once). Check the strap fit before every quality session.",
      "Threshold runs are split threshold sessions (after Steve Magness, The Science of Running, 2014). Each has a total time at threshold. Run until you feel yourself going over the edge or slowing, jog 1 to 3 minutes, and carry on until the total is done. Usually one break for 25 minutes or less, two for 30, three for more. Finish feeling invigorated, not torn down.",
      "Threshold intensity is set by feel first: comfortably hard, breathing harder but not laboured, and able to say one or two short sentences. As a check, that is probably about 4:45 to 5:05/km and HR about 150 to 156 for you now, below the top of Z4. If HR climbs past 160, you are over: ease off or take a break.",
      "Threshold progresses by adding a few minutes of total time (15, 20, 25 and so on). About 35 minutes is the ceiling. If it stalls, use an uphill threshold (treadmill at 3 to 4% and rising) or add 20 to 60 s surges inside the threshold."
     ]
    },
    {
     "heading": "Support",
     "items": [
      "Friday yoga stays. Add one short strength session a week (calves, glutes, single-leg work).",
      "Fuel rule of thumb. Runs under 75 min: nothing during. Longer: 1 gel from about 13 km, 2 gels at 17 to 20 km, and 1 gel + 1 drink every hour beyond 2 hours. Carb breakfast before long runs, protein after hard sessions. Tell me if your gut disagrees. Every run I schedule gets a short fuel note.",
      "Practise race fuelling on at least three long runs in March and April. Your race plan (2 gels and 1 drink an hour) is about 90 g carbs and 640 mg sodium an hour. If the gut complains, drop to 60 g an hour.",
      "Torin 9 is at about 103 km and weekly volume is about to double. Consider a second pair to rotate before the long-run weeks.",
      "Weigh in once a week, first thing in the morning, and look at the trend, not single readings. Weight is context, not a target: a steady drift down as volume doubles can mean under-fuelling. 77.8 kg on 16 Oct 2026 is the starting point."
     ]
    },
    {
     "heading": "Wednesday review routine",
     "items": [
      "After the Wednesday intervals, send me that session plus the other runs since the last review (Sat, Sun, Mon) and a line on how it felt, sleep, niggles and illness.",
      "I check the week against the plan (km, long run, status), time in each HR zone (especially the Z3 share), interval pace and HR against the last session, easy-run efficiency, resting HR against the 40 bpm baseline, Garmin VO2 max, your weekly weight trend and any HR strap problems.",
      "Then I update the race estimates and charts, write a dated review and review the following week's sessions. I only change the plan when the data or your notes call for it: flat, ill or HR running high means cut or repeat the week; going well means hold the plan, not add volume; too many Z3 or Z4 sessions in a row means swap one for something easier.",
      "Any change to next week is shown in the Week by week table and in the review, with the reason."
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
      "This is the stretch goal against your history (best 46:46). Key sessions: split threshold 30 to 35 min total, and 10K-pace reps such as 3 x 2 km at 4:30.",
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
   "exportEnd": "2026-10-14",
   "other": {"2020": {"Walking": 7, "Strength Training": 11, "Pool Swim": 3, "Cycling": 2, "Breathwork": 2}, "2024": {"Breathwork": 1}, "2025": {"Strength Training": 1, "Yoga": 7, "Pool Swim": 2, "Walking": 1}, "2026": {"Pool Swim": 2, "Yoga": 2}},
   "runsAll": [["2019-03-17",21.24,6488,null,0,1708,0],["2019-05-12",10.0,2806,null,0,867,0],["2019-06-22",5.0,1316,null,0,407,0],["2020-02-18",0.49,419,96,0,34,0],["2020-02-19",18.48,6964,155,105,1454,0],["2020-02-27",17.85,6677,161,35,709,0],["2020-02-29",5.01,2076,131,65,371,0],["2020-03-01",1.46,894,116,32,127,0],["2020-03-01",10.0,2927,179,75,804,0],["2020-03-15",21.34,7358,157,64,1551,0],["2020-03-21",5.03,2303,122,65,375,0],["2020-03-22",7.96,3814,132,124,626,0],["2020-03-24",7.85,3716,133,110,622,0],["2020-03-25",7.91,6202,110,125,692,0],["2020-03-26",7.81,3555,130,112,591,0],["2020-03-28",8.02,3814,121,117,579,0],["2020-03-29",6.72,3222,122,116,469,0],["2020-03-31",7.7,3934,121,121,578,0],["2020-04-02",16.11,7975,128,137,1185,0],["2020-04-03",8.52,6266,110,123,700,0],["2020-04-04",7.46,3802,130,119,593,0],["2020-04-05",4.52,2222,136,93,381,0],["2020-04-06",6.44,3318,116,149,483,0],["2020-04-07",7.97,5234,116,118,640,0],["2020-04-09",8.22,5325,125,114,701,0],["2020-04-10",8.14,3786,143,115,689,0],["2020-04-11",8.11,3704,144,117,668,0],["2020-04-12",8.13,3735,141,115,659,0],["2020-04-13",8.16,3905,131,134,621,0],["2020-04-14",8.68,6061,116,117,711,0],["2020-04-15",8.44,4237,128,137,645,0],["2020-04-17",13.6,6317,129,198,983,0],["2020-04-18",7.69,3442,135,109,590,0],["2020-04-19",7.67,3835,126,109,585,0],["2020-04-21",7.82,4849,121,119,637,0],["2020-04-22",7.7,3383,138,109,604,0],["2020-04-23",7.76,3553,128,117,575,0],["2020-04-24",8.51,3918,133,115,647,0],["2020-04-25",6.05,3815,116,66,475,0],["2020-04-26",7.47,7339,100,125,700,0],["2020-04-28",7.75,5545,101,128,607,0],["2020-04-30",4.91,3284,125,89,452,0],["2020-05-01",9.66,4691,136,143,744,0],["2020-05-02",8.42,5134,124,114,664,0],["2020-05-03",10.18,5348,122,100,776,0],["2020-05-04",11.4,6503,120,115,822,0],["2020-06-08",8.7,5243,118,132,668,0],["2020-06-12",15.46,12140,118,183,1348,0],["2020-07-11",10.49,4930,139,135,824,0],["2020-12-24",5.35,1872,142,2,421,0],["2020-12-27",4.91,1989,157,48,491,0],["2021-01-03",7.58,2758,137,4714,552,0],["2021-01-10",5.02,1910,145,69,424,0],["2021-01-16",6.29,2955,143,220,601,0],["2021-01-17",6.3,2468,148,102,557,0],["2021-01-23",10.21,4582,132,101,808,0],["2021-06-26",7.66,3484,140,119,706,0],["2021-06-27",10.85,4959,140,156,956,0],["2021-07-04",10.07,4481,145,118,888,0],["2021-07-10",11.42,5499,133,157,888,0],["2021-07-11",9.89,4343,143,116,833,0],["2021-07-18",6.04,2330,149,13,507,0],["2021-07-27",2.74,894,null,0,225,1],["2021-07-28",4.02,1307,160,0,310,1],["2021-07-29",5.31,1771,152,0,400,1],["2021-08-03",5.01,1758,164,0,433,1],["2021-08-06",5.0,1539,159,0,359,1],["2021-08-07",7.05,5782,116,218,713,0],["2021-08-09",5.0,1598,157,0,360,1],["2021-08-13",5.0,1508,164,0,362,1],["2021-08-14",2.43,1041,137,14,195,0],["2021-09-11",10.07,4554,139,116,832,0],["2021-10-10",4.71,2331,135,105,414,0],["2021-10-23",5.14,2562,121,103,368,0],["2022-01-19",3.35,1216,153,20,282,0],["2022-06-21",4.88,2211,149,182,465,0],["2022-06-22",3.14,1363,140,121,284,0],["2022-06-23",2.76,1177,143,105,244,0],["2022-06-24",5.21,2221,147,191,474,0],["2022-06-27",3.35,1348,140,130,277,0],["2022-06-28",2.65,1108,134,108,209,0],["2022-06-29",2.54,1119,138,102,215,0],["2022-06-30",2.69,1075,140,106,224,0],["2022-07-01",2.14,861,144,103,181,0],["2022-07-04",3.58,1392,143,137,295,0],["2022-07-05",10.86,3907,149,132,837,0],["2022-07-06",4.03,1812,146,164,395,0],["2022-07-10",10.01,2922,176,76,828,0],["2022-07-11",3.39,1361,146,125,291,0],["2022-07-25",5.0,1500,159,0,367,1],["2022-07-26",4.1,1505,158,0,365,1],["2022-07-27",4.7,1510,154,0,359,1],["2022-07-28",7.0,2070,159,0,501,1],["2022-07-29",3.8,1201,147,0,264,1],["2022-07-30",6.0,1817,153,0,423,1],["2022-08-01",5.0,1431,160,0,342,1],["2022-08-02",4.1,1501,152,0,340,1],["2022-08-04",4.9,1501,157,0,346,1],["2022-08-05",5.0,1801,154,0,412,1],["2022-08-08",5.0,1402,156,0,324,1],["2022-08-09",5.2,1501,153,0,340,1],["2022-08-10",3.2,1175,158,0,271,1],["2022-08-11",3.3,1201,162,0,285,1],["2022-08-12",10.7,3600,null,0,817,1],["2022-08-16",5.7,1803,156,0,415,1],["2022-08-21",2.9,1839,85,9,193,0],["2022-08-22",11.67,3629,158,19,788,0],["2022-08-27",4.92,1550,152,6,348,0],["2022-08-28",21.25,6470,174,157,1685,0],["2022-10-16",21.67,8096,164,68,1836,0],["2022-12-28",10.53,4062,154,140,874,0],["2023-02-14",2.62,2084,110,14,258,0],["2023-02-14",8.61,2964,156,19,680,0],["2023-02-15",8.04,2570,159,26,605,0],["2023-02-16",8.04,3054,159,17,699,0],["2023-02-18",5.0,1959,null,0,415,0],["2023-02-19",9.4,3262,null,0,748,0],["2023-03-04",4.23,1623,148,173,343,0],["2023-03-19",2.83,1724,109,36,211,0],["2023-03-19",5.2,1904,153,105,436,0],["2023-03-20",5.18,1914,144,109,407,0],["2023-04-01",8.64,3197,151,176,701,0],["2023-04-02",11.39,3953,148,225,820,0],["2023-04-08",10.1,3496,154,21,796,0],["2023-04-09",0.82,277,140,5,59,0],["2023-04-11",4.0,1226,153,0,282,1],["2023-04-22",5.06,1373,168,23,344,0],["2023-04-23",3.87,1831,120,42,290,0],["2023-05-02",5.14,1708,152,96,390,0],["2023-05-03",5.09,1775,145,103,380,0],["2023-05-07",5.3,1844,142,96,387,0],["2023-05-07",5.5,2997,122,51,441,0],["2023-05-08",4.99,1705,152,94,383,0],["2023-05-09",1.56,540,126,5,98,0],["2023-05-09",4.49,1351,163,84,339,0],["2023-05-11",4.92,1753,145,92,383,0],["2023-05-14",4.97,1646,154,90,384,0],["2023-05-15",7.78,2495,152,147,574,0],["2023-05-17",2.42,796,167,74,207,0],["2023-05-17",5.45,1800,140,80,370,0],["2023-05-18",5.27,1800,140,96,373,0],["2023-05-20",5.65,1800,151,101,416,0],["2023-05-22",5.28,2041,137,108,405,0],["2023-05-28",3.78,2599,99,53,288,0],["2023-06-01",5.12,1708,143,98,370,0],["2023-06-13",5.17,1792,145,94,405,0],["2023-06-14",5.25,2314,126,90,390,0],["2023-06-25",7.93,3628,121,78,540,0],["2023-07-09",8.31,3434,134,69,623,0],["2023-07-26",5.0,1662,153,0,399,1],["2023-07-27",5.0,1768,134,0,351,1],["2023-08-01",5.0,1803,123,0,295,1],["2023-08-09",5.0,1509,157,0,373,1],["2023-08-10",6.0,1987,145,0,445,1],["2023-08-17",0.52,328,109,2,35,0],["2023-08-17",8.21,3514,126,11,572,0],["2023-08-18",10.07,3098,158,16,760,0],["2023-08-19",0.48,631,105,8,65,0],["2023-08-19",5.0,1330,179,9,383,0],["2023-08-21",12.02,4314,145,20,858,0],["2023-08-26",5.16,1865,144,93,400,0],["2023-08-28",12.08,4152,150,238,914,0],["2023-09-09",8.83,3422,135,167,629,0],["2023-09-10",2.07,1614,102,33,158,0],["2023-09-10",5.2,2153,134,100,407,0],["2023-09-17",3.74,1769,139,38,317,0],["2023-09-17",21.1,6422,174,90,1730,0],["2023-09-23",13.9,4694,142,151,894,0],["2023-09-24",3.69,2464,105,47,290,0],["2023-09-24",5.24,2003,153,100,453,0],["2023-09-27",4.3,1558,142,54,326,0],["2023-10-01",3.01,2066,98,56,235,0],["2023-10-07",2.51,4903,82,42,310,0],["2023-10-07",17.58,6701,138,193,1129,0],["2023-10-08",3.1,3067,97,46,284,0],["2023-10-08",4.81,1955,159,101,456,0],["2023-10-15",21.38,10069,119,82,1427,0],["2023-10-26",8.21,3148,146,131,633,0],["2023-11-04",15.23,5709,144,167,1126,0],["2023-11-05",12.55,4855,138,126,856,0],["2023-11-11",14.75,5702,143,92,1061,0],["2023-11-12",1.38,989,116,29,128,0],["2023-11-12",9.6,3750,143,224,724,0],["2023-11-18",8.06,3534,150,277,706,0],["2023-11-19",3.01,2137,115,76,256,0],["2023-11-19",12.18,3723,157,91,826,0],["2023-11-26",10.11,4111,131,107,685,0],["2023-12-02",10.22,4388,148,116,864,0],["2023-12-03",14.96,6051,128,130,980,0],["2023-12-10",15.04,6208,129,130,963,0],["2023-12-22",12.1,4341,144,258,843,0],["2023-12-23",10.06,3925,136,142,703,0],["2023-12-29",12.41,5128,135,267,872,0],["2024-02-03",8.81,3243,138,172,633,0],["2024-02-04",14.91,5867,132,137,983,0],["2024-02-12",11.15,3670,156,23,864,0],["2024-02-13",6.7,2512,140,37,525,0],["2024-03-17",21.41,7486,162,82,1721,0],["2024-03-29",15.62,6127,151,168,1283,0],["2024-03-30",11.05,4305,136,144,788,0],["2024-04-01",17.37,6209,154,138,1362,0],["2024-04-07",17.39,6457,137,94,1129,0],["2024-04-08",8.03,2451,156,19,568,0],["2024-04-09",5.05,1901,131,13,355,0],["2024-04-11",4.97,1696,149,10,384,0],["2024-04-13",5.0,1346,null,0,412,0],["2024-08-16",2.41,1567,94,49,178,0],["2024-08-18",42.64,16864,152,243,3255,0],["2024-08-22",4.8,1888,131,0,348,1],["2024-08-24",9.73,3598,139,0,707,1],["2024-08-28",5.77,1674,147,0,372,1],["2024-09-08",9.4,3604,138,0,687,1],["2024-09-14",5.01,1811,133,30,355,0],["2024-10-19",12.47,5365,130,124,941,0],["2024-10-20",12.95,5651,136,242,1023,0],["2024-10-26",11.46,4530,146,121,882,0],["2024-10-27",12.75,4995,131,107,866,0],["2024-11-03",12.92,5647,145,118,1051,0],["2024-11-09",17.51,6834,133,135,1171,0],["2024-11-10",12.11,4734,136,121,871,0],["2024-11-16",10.83,4443,140,204,852,0],["2024-11-17",4.52,1712,141,90,354,0],["2024-11-24",11.36,4976,134,233,891,0],["2024-11-30",4.99,1324,164,15,325,0],["2024-12-01",16.53,6880,136,83,1202,0],["2024-12-07",6.86,3434,129,117,561,0],["2024-12-23",11.96,4260,150,20,949,0],["2024-12-28",5.0,1447,165,6,369,0],["2025-01-11",6.45,2522,131,78,468,0],["2025-01-12",13.11,5577,132,212,1008,0],["2025-01-25",12.26,4520,140,115,875,0],["2025-02-09",6.76,2671,138,169,531,0],["2025-02-16",10.87,4304,138,19,718,0],["2025-02-17",11.32,4071,147,20,776,0],["2025-02-18",11.05,4103,148,136,844,0],["2025-02-19",10.52,4269,148,20,810,0],["2025-02-20",11.79,5494,127,60,840,0],["2025-02-22",1.16,518,144,0,97,0],["2025-02-22",4.99,1343,176,7,364,0],["2025-03-08",15.78,7530,126,254,1169,0],["2025-03-09",17.21,7565,128,227,1204,0],["2025-03-14",8.59,4437,111,104,624,0],["2025-03-15",18.92,8601,139,422,1439,0],["2025-03-16",10.59,4129,143,82,755,0],["2025-03-21",6.87,3353,121,112,510,0],["2025-03-22",17.13,6701,142,54,1142,0],["2025-03-23",20.77,9376,138,456,1587,0],["2025-03-29",14.75,4892,145,82,971,0],["2025-03-30",6.48,3540,126,296,548,0],["2025-04-05",18.78,6478,143,94,1178,0],["2025-04-06",19.08,7730,135,282,1266,0],["2025-04-12",16.73,7403,129,312,1163,0],["2025-04-13",1.84,720,134,2,141,0],["2025-04-13",10.47,3906,145,18,711,0],["2025-04-14",8.46,3461,120,19,527,0],["2025-04-15",9.16,3712,120,17,579,0],["2025-04-17",8.52,3601,129,20,597,0],["2025-04-18",7.93,3137,127,19,539,0],["2025-04-19",5.0,1267,179,9,366,0],["2025-04-20",17.97,7488,134,220,1215,0],["2025-04-26",11.69,4620,131,57,709,0],["2025-04-27",21.49,7643,133,192,1215,0],["2025-05-03",4.78,2372,120,57,378,0],["2025-05-05",12.71,4668,134,124,922,0],["2025-05-11",21.1,6410,180,66,2007,0],["2025-05-17",7.77,3219,120,129,531,0],["2025-05-25",12.28,4653,134,151,885,0],["2025-05-26",12.6,6181,138,387,1151,0],["2025-06-15",20.21,9042,142,392,1694,0],["2025-06-22",16.68,7201,130,244,1205,0],["2025-06-28",7.27,3310,124,71,532,0],["2025-07-27",9.59,3929,132,35,705,0],["2025-07-28",3.86,1726,123,9,282,0],["2025-07-30",8.28,3291,143,31,643,0],["2025-07-31",16.08,7201,141,170,1270,0],["2025-08-01",6.49,3259,116,6,445,0],["2025-08-02",10.12,3978,150,8,770,0],["2025-08-10",6.88,3568,131,255,638,0],["2025-08-16",5.06,1639,159,34,409,0],["2025-08-17",21.28,7180,173,124,2019,0],["2025-09-01",6.42,2812,118,117,456,0],["2025-09-05",5.03,2463,121,72,379,0],["2025-09-06",9.69,5405,130,225,928,0],["2025-09-08",5.79,3068,121,62,461,0],["2025-09-12",5.91,2793,118,57,433,0],["2025-09-13",13.14,6711,125,404,1061,0],["2025-09-15",6.71,3123,121,56,490,0],["2025-09-17",6.3,2968,115,66,451,0],["2025-09-20",11.49,5764,127,334,963,0],["2025-09-24",3.57,2107,114,83,296,0],["2025-09-27",8.84,4441,143,208,933,0],["2025-10-04",10.95,4960,126,203,843,0],["2025-10-06",6.27,3423,132,294,611,0],["2025-10-08",5.11,2492,115,58,371,0],["2025-10-11",10.66,5790,127,310,932,0],["2025-10-12",4.58,4965,84,83,375,0],["2025-10-13",9.66,3619,134,72,673,0],["2025-10-15",6.26,3050,117,102,464,0],["2025-10-18",13.95,7279,131,443,1258,0],["2025-10-20",8.81,4288,131,187,755,0],["2025-10-22",5.92,3241,121,106,469,0],["2025-10-25",0.2,99,105,3,13,0],["2025-10-25",12.08,7083,130,0,1194,0],["2025-11-01",11.94,5841,133,358,1067,0],["2025-11-03",8.0,3487,124,130,602,0],["2025-11-05",10.3,4424,133,280,809,0],["2025-11-08",13.17,6589,135,417,1223,0],["2025-11-09",7.53,3597,125,172,610,0],["2025-11-10",7.18,3629,131,108,648,0],["2025-11-12",7.3,3940,132,319,685,0],["2025-11-15",15.19,7242,136,545,1345,0],["2025-11-16",8.65,4390,116,128,634,0],["2025-11-19",10.32,4344,136,158,825,0],["2025-11-22",16.88,8601,143,455,1706,0],["2025-11-24",6.1,3297,121,104,481,0],["2025-11-29",6.63,3322,135,96,594,0],["2025-12-06",12.32,6594,129,425,1099,0],["2025-12-12",5.34,3132,137,93,601,0],["2025-12-14",8.49,4576,123,131,713,0],["2025-12-17",5.05,2681,124,82,421,0],["2025-12-20",16.83,7200,132,189,1293,0],["2025-12-21",7.9,4374,116,127,609,0],["2025-12-23",7.78,3996,116,122,577,0],["2025-12-26",7.6,3798,141,123,748,0],["2025-12-27",4.98,1808,133,22,355,0],["2025-12-28",15.89,8097,136,615,1439,0],["2025-12-29",7.49,3749,119,102,552,0],["2026-01-03",10.22,4281,123,307,777,0],["2026-01-04",15.5,7982,null,499,1079,0],["2026-01-07",6.92,3608,118,100,504,0],["2026-01-10",3.0,3556,101,106,346,0],["2026-01-10",6.69,3201,139,200,600,0],["2026-01-11",17.36,9734,137,661,1710,0],["2026-01-14",5.36,2797,117,100,411,0],["2026-01-17",2.95,4026,100,64,364,0],["2026-01-17",14.87,8548,132,0,1402,0],["2026-01-18",4.62,4760,87,73,379,0],["2026-01-18",7.26,3993,113,100,540,0],["2026-01-21",7.76,3718,121,117,578,0],["2026-01-24",1.34,538,136,2,109,0],["2026-01-24",17.34,8931,130,405,1429,0],["2026-01-28",0.94,540,121,31,90,0],["2026-01-28",4.35,2345,112,58,332,0],["2026-01-31",14.6,6835,123,127,1060,0],["2026-02-02",7.01,3614,129,103,600,0],["2026-02-04",11.44,4563,137,145,862,0],["2026-02-07",15.59,8539,129,589,1372,0],["2026-02-09",6.15,3429,122,103,539,0],["2026-02-11",11.48,5367,134,170,918,0],["2026-02-17",12.47,7355,134,0,1136,1],["2026-02-22",21.62,8298,151,272,1855,0],["2026-02-25",3.99,2530,129,63,430,0],["2026-02-27",10.46,4587,136,313,872,0],["2026-02-28",21.7,10601,128,517,1691,0],["2026-03-01",14.07,7366,123,279,1122,0],["2026-03-04",3.93,2419,126,82,396,0],["2026-03-15",21.36,7270,163,101,1874,0],["2026-03-21",0.9,2477,85,57,186,0],["2026-03-21",20.08,11402,130,911,1845,0],["2026-03-23",7.16,3373,116,103,505,0],["2026-03-25",5.99,2673,142,142,558,0],["2026-03-28",13.65,6818,135,424,1229,0],["2026-03-30",5.53,3185,129,98,546,0],["2026-04-11",7.45,3725,129,26,615,0],["2026-04-12",45.28,19584,153,804,4325,0],["2026-04-18",5.0,1982,125,25,367,0],["2026-05-17",4.06,5861,96,73,494,0],["2026-05-25",5.04,2087,115,7,353,0],["2026-05-26",5.01,1723,137,11,377,0],["2026-05-27",4.79,1776,133,13,367,0],["2026-05-28",4.41,1860,119,6,328,0],["2026-05-29",4.4,1797,122,6,332,0],["2026-05-30",6.73,2683,129,14,514,0],["2026-06-07",10.0,2818,174,69,815,0],["2026-07-30",10.0,4024,141,22,857,0],["2026-07-31",4.32,1966,134,6,375,0],["2026-08-01",4.93,1790,133,0,360,0],["2026-08-02",2.06,1126,123,0,188,0],["2026-08-15",5.0,1692,126,17,335,0],["2026-08-16",22.11,7893,159,117,2088,0],["2026-09-05",9.71,5036,139,283,989,0],["2026-09-06",4.11,2227,129,61,396,0],["2026-09-07",8.08,4490,128,119,725,0],["2026-09-09",6.54,2749,127,54,459,0],["2026-09-12",8.5,3424,132,58,634,0],["2026-09-13",5.92,2937,114,91,426,0],["2026-09-14",8.05,3063,136,56,641,0],["2026-09-19",5.23,1667,159,62,432,0],["2026-09-26",9.29,4280,120,113,674,0],["2026-09-27",3.48,1985,108,55,272,0],["2026-09-30",8.38,3657,129,115,654,0],["2026-10-03",6.88,3650,133,209,656,0],["2026-10-05",7.93,3470,127,60,612,0],["2026-10-07",9.23,3905,135,100,720,0],["2026-10-10",8.17,3864,139,67,751,0],["2026-10-11",6.07,3017,112,55,436,0],["2026-10-14",9.46,3889,134,101,719,0]],
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
    },
    {
     "heading": "From the extra Garmin export: resting HR, VO2 max, PRs",
     "items": [
      "Resting HR is about 40 bpm now (median 40 from mid Aug to 15 Oct, 39 this week). That is lower than in your PB builds (median 42 in Mar to May 2025) and close to your lowest ever (37, Sep 2022).",
      "The illness left a clear mark. Resting HR rose from 40 (14 Sep) to 44 (23 to 26 Sep) and was back to 40 by 7 Oct. It was already 1 to 2 bpm up on 15 to 18 Sep, before the 19 Sep parkrun. A rise of 3 bpm or more for two mornings is a useful early warning, so I will check it each Wednesday.",
      "Garmin's own VO2 max is 49 now (48 until 7 Oct). It peaked at 54 in late April and early May 2025 during the HM PB build and sat at 47 to 49 through the marathon block. On the watch's scale your aerobic engine is about 5 points below the PB-form peak, which matches the easy-run efficiency (1.04 to 1.07 now against 1.18 to 1.20). Your rep speed is back, the aerobic base is not yet.",
      "Official Garmin PRs: fastest 1 km 3:56.9 and mile 6:59.7 (14 Oct 2026), 5K 21:06.5 (19 Apr 2025), 10K 46:46 (12 May 2019), HM 1:46:50 (11 May 2025), marathon 4:41:04 (18 Aug 2024), longest run 45.3 km (12 Apr 2026).",
      "Max HR: the all-day monitor peaked at 196 (19 Apr and 17 Aug 2025) and 193 three times, while activity files peak at 201. The true max is probably 196 to 201. I am keeping 201 for now.",
      "HR zones: with resting HR 40 and max about 198, %HR-reserve zones come out near Z1 119-134, Z2 135-150, Z3 151-166, Z4 167-182, Z5 183-198. Your race HRs (10K 174, HM 180, 5K 179) sit in that Z4, so the current Garmin zones (Z5 from 160) read about one zone low, and your Garmin Z3 (135-154) is roughly an easy-aerobic Z2 on that scale. I have not changed the zones or the plan."
     ]
    }
   ]
  },
  weight: [
    { date: '2026-10-16', kg: 77.8, note: 'First entry' },
    { date: '2026-10-18', kg: 77.6, note: '' },
    { date: '2026-10-25', kg: 77.1, note: '' },
    { date: '2026-10-28', kg: 77.1, note: '' }
  ],
  peakflow: {
    best: null,
    readings: [
      { date: '2026-10-23', lpm: 460, note: 'First entry, timing not recorded' }
    ]
  },
  bp: [
    { date: '2026-10-19', sys: 137, dia: 71, note: 'First entry, timing not recorded' }
  ],
  meals: {
   "source": "Quick Roasting Tin",
   "nutrition": {"keys":["kcal","p","c","f","fib","fe","ca","mg","zn","k","b12","d","vc","fol","va","i","se"],"items":[["Breakfast","Rolled oats, 1 cup dry (about 85 g)",331,11.5,56,5.9,9,4.0,46,117,3.4,308,0,0,0,48,0,1,5],["Breakfast","Alpro almond drink, 1 cup (240 ml, label)",36,1.0,0.2,2.6,0.5,0.2,288,17,0.1,60,0.9,1.9,0,0,0,54,0],["Breakfast","Chia seeds, 1 tbsp (12 g)",58,2.0,5,3.7,4.1,0.9,76,40,0.5,50,0,0,0.2,7,0,0,0],["Breakfast","PhD Diet Whey, 1 scoop (32 g, label)",124,20,3.8,3.2,0,0.3,140,20,0.6,150,0.3,0,0,5,0,0,0],["Breakfast","Frozen summer fruits, a handful (70 g)",28,0.7,5.5,0.2,2.5,0.4,20,8,0.1,110,0,0,11,12,5,0,0],["Lunch","Salad, 500 ml box (about 150 g leaves and veg)",30,2,4,0.5,2.5,1.5,70,30,0.4,400,0,0,20,80,200,3,1],["Lunch","Organic firm tofu, a quarter of a 300 g pack (75 g, label)",88.5,8.9,1.4,5.1,0.8,1.9,75,52,1.0,90,0,0,0,15,0,0,8],["Lunch","Flatbread, 1 (80 g, label)",204,9,31.7,3.4,5.4,1.5,150,25,0.7,90,0,0,0,20,0,5,10],["Lunch","Apple, 180 g",90,0.5,20,0.3,3.7,0.2,10,9,0.1,190,0,0,8,5,5,0,0],["Lunch","Satsuma, 80 g",30,0.6,7,0.1,1.2,0.1,25,9,0.1,120,0,0,22,15,10,0,0],["Lunch","Banana, 120 g",105,1.3,27,0.4,3,0.3,6,32,0.2,430,0,0,10,24,3,0,0],["Lunch","Pear, 170 g",95,0.6,23,0.2,5,0.3,15,12,0.2,180,0,0,7,12,0,0,0],["Lunch","Plain Greek-style yogurt, 50 ml",60,2.5,2,5,0,0,55,6,0.3,80,0.25,0.1,0,5,20,15,2],["Lunch","Egg, 1 medium free-range (50 g), boiled or scrambled",75,6.3,0.2,5.2,0,0.9,28,6,0.65,65,0.55,1.0,0,25,80,28,11.5],["Lunch","Brazil nut, 1 (5 g, selenium varies a lot, 30 µg assumed)",33,0.7,0.2,3.3,0.4,0.1,8,19,0.2,33,0,0,0,1,0,0,30],["Dinner","Quick Roasting Tin dinner, one portion (typical of the 13 dishes, range 450-700 kcal)",550,27,40,28,8,3.5,250,90,3.5,900,1.0,1.0,40,100,350,40,25]],"targets":{"fe":[8.7,"mg"],"ca":[700,"mg"],"mg":[300,"mg"],"zn":[9.5,"mg"],"k":[3500,"mg"],"b12":[1.5,"µg"],"d":[10,"µg"],"vc":[40,"mg"],"fol":[200,"µg"],"va":[700,"µg"],"i":[140,"µg"],"se":[75,"µg"]},"labels":{"fe":"Iron","ca":"Calcium","mg":"Magnesium","zn":"Zinc","k":"Potassium","b12":"Vitamin B12","d":"Vitamin D","vc":"Vitamin C","fol":"Folate","va":"Vitamin A","i":"Iodine","se":"Selenium"},"assumptions":["Label values used for the PhD Diet Whey (32 g serving), the almond drink (per 100 ml), the flatbread (80 g) and the tofu (a quarter of a 300 g pack). Whey fat is worked out from the energy because it was not in the label text, and the minerals in the whey are assumed.","Estimated portions: 1 cup of rolled oats as 85 g, a handful of frozen fruit as 70 g, a dressing-free salad box as 150 g.","The tofu is set with magnesium chloride, not calcium, so its calcium (about 100 mg per 100 g), magnesium and trace minerals are estimates. The flatbread and almond drink calcium, and the flatbread iron and folate, are fortification estimates because the amounts are not on the label.","Dinner is one typical portion across the 13 roasting tin dishes. Fish and halloumi nights give more protein and B12, dhal and pilaf nights give more carbs and fibre.","Not counted: tea, juice, oil or dressing on the salad, the afternoon whey shake and biscuit, other snacks, run fuel, and any seconds.","Targets are UK adult male reference values (RNI). Vitamin D is the UK advice of 10 µg a day in autumn and winter, which food rarely meets.","One medium free-range egg a day is included (typical food-table values, about 50 g edible).","One Brazil nut a day is included. Selenium per nut varies from about 10 to 90 µg, so 30 µg is a middle-low assumption."],"notes":["Energy and carbs look low for 40+ km a week: the listed meals come to about 1,940 kcal and 2.9 g carbs per kg. Your weight is steady at about 77.6 kg, so other food is making up the difference. On long-run days add carbs at breakfast and dinner.","Protein is in range at about 1.2 g/kg (aim for 1.2 to 1.6 on a training week), helped by the daily egg and the quarter pack of tofu. Fibre is high at about 46 g, which is good for health but worth cutting back on the morning of a hard session or race to avoid gut trouble.","Iodine now meets the target (about 104%) with the daily egg, but half of it still comes from the fortified almond drink (54 µg a cup). Check the label of any other plant drink, and fish or dairy would help.","Vitamin D is low from food, as it is for almost everyone in the UK from October to March. A 10 µg (400 IU) supplement is the standard advice.","B12 looks fine, helped by the fortified almond drink, yogurt and the B12 tablet you bought. Selenium now meets the target (about 123%) with one Brazil nut a day. It varies a lot between nuts, so do not eat several. Vitamin A (about 96%) and potassium (about 92%) are slightly under. Iron and zinc look adequate, but plant iron and zinc are absorbed less well, so keep vitamin C foods with meals.","The table includes the 100 µg B12 and 25 µg vitamin D tablets, so those two are covered (the supplement amounts are well above the target, which is fine: the safe upper limit for vitamin D is 100 µg a day). Calcium and magnesium supplements are not needed, and B6 is not worth adding: food already gives roughly the 1.4 mg target."],"supplements":{"b12":100,"d":25},"ranges":[{"k":"p","label":"Protein","perKg":[1.2,1.6],"note":"Endurance athletes in a training week. 1.6 and above on hard weeks and when cutting energy."},{"k":"c","label":"Carbohydrate","perKg":[4,6],"note":"About 3-5 g/kg on easy or rest days, 5-7 on moderate days, 6-8 on long or hard days. 4-6 is a sensible weekly average at your volume."},{"k":"f","label":"Fat","pctEnergy":[20,35],"note":"Share of energy. Keep saturated fat under about 11% of energy."},{"k":"fib","label":"Fibre","min":30,"note":"UK target is 30 g a day. Higher is fine, but cut back on the morning of a hard run or race."}]},
   "recipes": [{"week":1,"dish":"Tikka-spiced paneer salad with chickpeas, mint and naan croutons","serves":"4 lunchboxes","n":4,"ing":[["Paneer","Paneer",1,null,null],["Chickpeas",null,1,null,null],["Red onion","Red Onions Loose",0.5,null,null],["Clove garlic","Large Garlic",0.1,null,null],["Ginger",null,1,null,null],["Turmeric, cumin, chilli, paprika, salt",null,1,null,null],["Natural yogurt, plus to serve","Greek Style Natural Yogurt",0.1,null,null],["Olive oil","Extra Virgin Olive Oil",0.05,null,null],["Naan breads","Flatbread",0.5,null,"Flatbreads on the receipt, recipe uses naan"],["Watercress","Watercress",1,null,null],["Handful of mint","Fresh Mint",1,null,null],["Lemon, juice","Lemons",0.5,null,null]]},{"week":1,"dish":"Lightly roasted chickpea, halloumi and red onion salad with giant couscous","serves":"2-3 lunchboxes","n":2.5,"ing":[["Giant couscous","Giant Couscous",0.67,null,null],["Vegetable stock",null,1,null,null],["Halloumi","Cypriot Halloumi",1,"2026-09-04","On the 4 Sep order"],["Chickpeas",null,1,null,null],["Red onion","Red Onions Loose",0.5,null,null],["Olive oil","Extra Virgin Olive Oil",0.03,null,null],["Smoked paprika",null,1,null,null],["Lemon juice","Lemons",0.5,null,null],["Spinach","Baby Leaf Spinach",0.5,null,null],["Coriander","Fresh Bunch Coriander",0.5,null,null]]},{"week":1,"dish":"Burgers","serves":"Not from the book","n":null,"ing":[["Smash burgers","British Smash Burgers",1,null,null],["Burger buns","Sheldon's Burger Buns",1,null,null],["Cheese slices","Cheesy Slices",1,null,null]]},{"week":2,"dish":"Tandoori-style salmon with sweet potatoes, tomatoes and red onion","serves":"4","n":4,"ing":[["Cloves garlic",null,1,null,null],["Ginger",null,1,null,null],["Natural yogurt, plus to serve","Greek Style Natural Yogurt",0.12,null,null],["Lemon, zest","Lemons",0.5,null,null],["Cumin, turmeric, paprika, chilli, salt",null,1,null,null],["Salmon fillets","Salmon Fillets",1,null,null],["Sweet potatoes","Sweet Potatoes",1,null,null],["Vegetable oil","Vegetable Oil",0.03,null,null],["Cherry tomatoes on the vine","Pomodorini",1,null,"Tinned pomodorini on the receipt, recipe uses fresh vine tomatoes"],["Red onion","Red Onions Loose",0.5,null,null]]},{"week":2,"dish":"Cinnamon-spiced aubergines with feta, olives and herbed bulgur wheat","serves":"3 lunchboxes","n":3,"ing":[["Bulgur wheat","Cracked Bulgur Wheat",0.4,"2026-09-04","On the 4 Sep order"],["Vegetable stock",null,1,null,null],["Green olives","Pitted Green Olives",0.3,null,null],["Large aubergine","Aubergine",1,null,null],["Red onion","Red Onions Loose",0.5,null,null],["Cinnamon, nutmeg, salt, olive oil",null,1,null,null],["Flat-leaf parsley","Flat Leaf Parsley",1,null,null],["Rocket","Spinach Watercress & Rocket",1,null,null],["Lemon, juice","Lemons",0.5,null,null],["Feta","Greek Feta",1,null,null],["Pomegranate","Pomegranate",1,"2026-09-04","On the 4 Sep order"]]},{"week":3,"dish":"Roasted halloumi with aubergines, tomatoes and pine nuts","serves":"4","n":4,"ing":[["Cherry tomatoes on the vine","Pomodorini",0.5,null,"Tinned pomodorini on the receipt, recipe uses fresh vine tomatoes"],["Aubergines","Aubergine",1,null,null],["Halloumi","Halloumi",1,null,null],["Oregano","Fresh Oregano",1,null,null],["Olive oil, chilli flakes, garlic",null,1,null,null],["Pine nuts","Pine Nuts",0.4,null,null],["Rocket","Spinach Watercress & Rocket",1,null,null],["Lemon, juice","Lemons",0.5,null,null]]},{"week":3,"dish":"All-in-one nigella-spiced whole tomato dhal","serves":"4","n":4,"ing":[["Cherry tomatoes on the vine","Pomodorini",0.5,null,"Tinned pomodorini on the receipt, recipe uses fresh vine tomatoes"],["Red lentils","Red Split Lentils",0.14,null,null],["Nigella seeds, cumin, coriander, salt",null,1,null,null],["Onion",null,1,null,null],["Oil",null,1,null,null],["Lemon, juice","Lemons",0.5,null,null],["Flatbreads to serve","Flatbread",1,null,null]]},{"week":4,"dish":"Roast sweet potato with oregano, feta and charred lemon","serves":"4-6 as a side","n":5,"ing":[["Sweet potato","Sweet Potatoes",0.62,null,null],["Olive oil, salt",null,1,null,null],["Bulb garlic","Garlic, So Organic",0.33,null,null],["Lemon","Unwaxed Lemons",0.25,null,null],["Feta","Attis Greek Feta",0.8,null,null],["Oregano","Fresh Oregano",1,null,null],["Sprigs rosemary","Fresh Rosemary",0.5,null,null],["Natural yogurt to serve","Greek Style Natural Yogurt",0.1,null,null]]},{"week":4,"dish":"Sesame and thyme roasted cauliflower pilaf with feta and watercress","serves":"4 as a side","n":4,"ing":[["Bulgur wheat","Buckwheat",0.4,null,"Buckwheat on the receipt, recipe uses bulgur"],["Vegetable stock",null,1,null,null],["Red onion",null,1,null,null],["Ginger","Ginger",0.25,null,null],["Large cauliflower",null,1,null,null],["Olive oil",null,1,null,null],["Za'atar","Zaatar",1,null,null],["Cloves garlic","Large Garlic",0.1,null,null],["Lemon","Unwaxed Lemons",0.25,null,null],["Watercress","Spinach Watercress & Rocket",1,null,"Mixed bag on the receipt, recipe uses watercress"],["Feta","Attis Greek Feta",0.2,null,null],["Radishes","Radish",0.25,null,null]]},{"week":5,"dish":"Sticky soy and honey roasted salmon with asparagus and sugar snap peas","serves":"4","n":4,"ing":[["Tenderstem broccoli","Tenderstem Broccoli",1,null,null],["Asparagus","Asparagus Spears",0.5,null,null],["Sugar snap peas","Sugar Snap Peas",1,null,null],["Frozen peas",null,1,null,null],["Sesame oil, soy sauce, honey, salt",null,1,null,null],["Salmon fillets","Salmon Fillets",1,null,null],["Ginger",null,1,null,null],["Lime",null,1,null,null],["Spring onions","Spring Onions",0.6,null,null],["Peanuts",null,1,null,null],["Red chilli",null,1,null,null]]},{"week":5,"dish":"Crispy thyme roasted leek and mushroom pasta bake","serves":"2-3","n":2.5,"ing":[["Tagliatelle","Tagliatelle",0.4,null,null],["Large leeks",null,1,null,null],["Chestnut mushrooms","Chestnut Mushrooms",0.83,null,null],["Crème fraîche","Crème Fraîche",1,null,null],["Olive oil, salt",null,1,null,null],["Sprigs thyme",null,1,null,null],["Cheddar","Cheddar",0.19,null,null],["Panko breadcrumbs","Panko",1,null,null]]},{"week":6,"dish":"Summer sausage traybake with long-stem broccoli and cherry tomatoes","serves":"2 adults + 2 children","n":4,"ing":[["Tenderstem broccoli","Tenderstem Broccoli",1,null,null],["Courgettes",null,1,null,null],["Cherry tomatoes on the vine","Pomodorini",0.5,null,"Tinned pomodorini on the receipt, recipe uses fresh vine tomatoes"],["Red onion","Red Onions",0.33,null,null],["Olive oil, garlic, rosemary, salt, chilli",null,1,null,null],["Chipolata sausages","Chipolata",1,null,"Gluten free chicken chipolatas"],["Lemon, juice","Lemons",0.5,null,null]]},{"week":6,"dish":"Thyme roasted ricotta with vine tomatoes, baby aubergines and red onion","serves":"2","n":2,"ing":[["Baby aubergines","Aubergine",1,null,"Ordinary aubergines"],["Cherry tomatoes on the vine","Pomodorini",0.5,null,"Tinned pomodorini on the receipt, recipe uses fresh vine tomatoes"],["Red onion","Red Onions",0.33,null,null],["Olive oil, salt",null,1,null,null],["Thyme, rosemary, sage",null,1,null,null],["Ricotta","Ricotta",1,null,null],["Lemon, zest and juice","Lemons",0.25,null,null],["Focaccia or olive bread to serve",null,1,null,null]]}],
   "method": "Prep on Sunday, store in the fridge, roast on the day.",
   "weeks": [
    {
     "week": 1,
     "order": "2026-09-11",
     "dishes": [
      "Tikka-spiced paneer salad with chickpeas, mint and naan croutons",
      "Chickpea, halloumi and red onion salad with giant couscous",
      "Burgers"
     ]
    },
    {
     "week": 2,
     "order": "2026-09-18",
     "dishes": [
      "Tandoori-style salmon with sweet potatoes, tomatoes and red onion",
      "Cinnamon-spiced aubergines with feta, olives and herbed bulgur wheat"
     ]
    },
    {
     "week": 3,
     "order": "2026-09-25",
     "dishes": [
      "Roasted halloumi with aubergines, tomatoes and pine nuts",
      "All-in-one nigella-spiced whole tomato dhal"
     ]
    },
    {
     "week": 4,
     "order": "2026-10-02",
     "dishes": [
      "Roast sweet potato with oregano, feta and charred lemon",
      "Sesame and thyme roasted cauliflower pilaf"
     ]
    },
    {
     "week": 5,
     "order": "2026-10-09",
     "dishes": [
      "Sticky soy and honey roasted salmon with asparagus and sugar snap peas",
      "Crispy thyme roasted leek and mushroom pasta bake"
     ]
    },
    {
     "week": 6,
     "order": "2026-10-16",
     "dishes": [
      "Summer sausage traybake",
      "Thyme roasted ricotta with vine tomatoes, baby aubergines and red onion"
     ]
    }
   ],
   "standing": [
    {
     "meal": "Adults' lunch",
     "what": "Tofu salad with fruit"
    },
    {
     "meal": "Children's packed lunch",
     "what": "Pasta, pretzels, apple, cucumber and chocolate biscuits"
    },
    {
     "meal": "Daily breakfast",
     "what": "Porridge with chia seeds, nuts and berries, made with almond milk"
    },
    {
     "meal": "Daily snacks",
     "what": "PhD whey protein shake and a chocolate biscuit"
    }
   ]
  },
  shop: {"store":"Sainsbury's","note":"Sainsbury's own brand unless a brand is named. Item prices are what each line cost after Nectar and offer savings. Coupons come off the order total on top.","cats":[{"id":"veg","label":"Fruit & veg"},{"id":"meat","label":"Meat, fish & tofu"},{"id":"dairy","label":"Dairy & eggs"},{"id":"drink","label":"Plant milk & drinks"},{"id":"carb","label":"Bread, pasta & grains"},{"id":"snack","label":"Snacks & sweets"},{"id":"frozen","label":"Frozen & convenience"},{"id":"store","label":"Store cupboard & sauces"},{"id":"supp","label":"Supplements"},{"id":"home","label":"Household & personal"}],"orders":[{"id":"1341028336","date":"2026-09-04","subtotal":120.08,"saved":19.7,"coupons":0,"paid":100.38,"notes":"French fries 900g swapped for 1.5kg (+£0.76)","items":[[2,"Alpro Almond No Sugar Long Life 1L",3.2,"drink"],[2,"Cadbury Chocolate Covered Shortcake Biscuits 5x20g",2.0,"snack"],[1,"Daddies Brown Sauce 400g",2.0,"store"],[1,"Deli Kitchen Greek Style Flatbread x4",1.0,"carb"],[2,"Fox's Rocky Stack'd Chocolate Cream 5x25g",2.5,"snack"],[1,"Frank's Redhot Original Pepper Sauce 148ml",2.0,"store"],[1,"Heinz Tomato Ketchup 910g",4.5,"store"],[1,"Oatly Oat Drink Barista Edition Chilled 1L",1.7,"drink"],[1,"Penn State Sea Salted Sharing Pretzels 175g",1.65,"snack"],[1,"Ramona's Original Houmous 500g",3.7,"store"],[1,"British Smash Burgers x10 750g",3.25,"meat"],[1,"Salt & Vinegar Rice & Corn Cakes 130g",0.95,"snack"],[1,"Lightly Salted Wholegrain Rice Cakes 135g",0.95,"snack"],[1,"Chicken Wings with Peperonata, Taste the Difference 300g",3.0,"meat"],[1,"Aubergine",0.95,"veg"],[1,"Baby Leaf Salad 90g",1.0,"veg"],[1,"Baking Potatoes x4",0.79,"veg"],[1,"Bananas Loose 1.022kg",0.97,"veg"],[1,"Bistro Salad 150g",1.1,"veg"],[1,"Blueberries 150g",1.0,"veg"],[1,"British Free Range Eggs Medium x12",2.5,"dairy"],[1,"British Lighter Crème Fraîche 300ml",0.75,"dairy"],[1,"British Mature Cheddar Cheese 400g",2.95,"dairy"],[1,"Chip Shop Style Mushy Peas 300g",0.5,"store"],[1,"Cracked Bulgur Wheat 500g",2.1,"carb"],[1,"Cypriot Halloumi Cheese 225g",1.99,"dairy"],[1,"Extra Crispy French Fries 900g",2.65,"frozen"],[1,"French Fries 1.5kg",1.88,"frozen"],[1,"Flat Leaf Parsley 30g",0.5,"veg"],[1,"Fresh Sage 20g",0.6,"veg"],[1,"Frosted Flakes Cereal 500g",0.95,"carb"],[1,"Grana Padano Cheese 200g",2.64,"dairy"],[1,"Greek Style Natural Yogurt 1kg",1.7,"dairy"],[1,"Green Pesto 190g",0.89,"store"],[1,"Italian Parma Ham 24 Month Matured, Taste the Difference 70g",2.5,"meat"],[1,"Lamb & Chicken Koftas, Taste the Difference 152g",2.5,"meat"],[1,"Loose Broccoli 0.494kg",1.18,"veg"],[1,"Mayonnaise Thick & Creamy 500ml",0.89,"store"],[1,"Multigrain Hoops Cereal 375g",0.79,"carb"],[1,"Pitted Spanish Queen Olives 340g",1.95,"store"],[1,"Pomegranate",1.5,"veg"],[1,"Red Onions Loose 0.31kg",0.29,"veg"],[3,"Reduced Sugar & Salt Baked Beans 400g",1.14,"store"],[1,"Ripe & Ready Kiwi x4",1.6,"veg"],[1,"Sheet Puff Pastry 320g",1.4,"store"],[1,"Small Whole Cucumber",0.7,"veg"],[1,"SO Organic Super Firm Tofu 300g",1.42,"meat"],[1,"Spirali Pasta 500g",0.75,"carb"],[2,"Strawberries 250g",3.0,"veg"],[1,"Swiss Mature Reserve Gruyere, Taste the Difference 200g",4.75,"dairy"],[1,"Taste the Difference Sweet Sunrise Grapefruit x2",0.84,"veg"],[2,"Thick Sliced Wholemeal Bread 800g",1.5,"carb"],[1,"Variety Multipack Crisps 12x25g",1.59,"snack"],[1,"Wild Rocket 60g",1.0,"veg"],[1,"Sheldon's Burger Buns x6",1.28,"carb"],[1,"Stamford Street Co. Porridge Oats 1kg",0.85,"carb"],[2,"Twister Mini Pineapple Ice Cream Lollies 6x50ml",2.9,"frozen"],[1,"Young's Chip Shop Omega 3 Fish Fillets x4 400g",3.25,"frozen"]]},{"id":"1342616455","date":"2026-09-11","subtotal":182.0,"saved":20.2,"coupons":0.76,"paid":161.04,"notes":"Rice cakes swapped for Snack a Jack (+£1.55); grapefruit swapped. Wholemeal bread and a setting spray unavailable, not charged","items":[[3,"Alpro Almond No Sugar Chilled 1L",4.8,"drink"],[2,"Alpro Oat No Sugar Chilled 1L",3.2,"drink"],[1,"Birds Eye Battered Fish Fillets x4 400g",4.2,"frozen"],[2,"Cadbury Chocolate Covered Shortcake Biscuits 5x20g",2.0,"snack"],[1,"Deli Kitchen Greek Style Flatbread x4",1.0,"carb"],[2,"Fox's Rocky Stack'd Chocolate Cream 5x25g",2.5,"snack"],[1,"Innocent Kids Strawberries, Raspberries & Apples Smoothies 4x150ml",3.6,"drink"],[1,"Listerine Essentials Milder Taste Mouthwash 500ml",2.6,"home"],[1,"Maybelline Lash Sensational Mascara",13.0,"home"],[1,"Maybelline Superstay Vinyl Ink Liquid Lipstick",12.0,"home"],[2,"Merchant Gourmet Glorious Grains Red Rice & Quinoa 250g",3.0,"carb"],[1,"Nature Valley Crunchy Variety Pack Bars 5x42g",3.5,"snack"],[1,"Penn State Sea Salted Sharing Pretzels 175g",1.65,"snack"],[1,"PhD Diet Whey Protein Powder Vanilla Crème 1kg",26.25,"supp"],[1,"Ramona's Original Houmous 500g",2.96,"store"],[1,"British Smash Burgers x10 750g",3.25,"meat"],[1,"Watercress 80g",1.25,"veg"],[1,"Apples 1kg",2.1,"veg"],[1,"Baby Leaf Salad 90g",1.0,"veg"],[1,"Baby Leaf Spinach 200g",1.5,"veg"],[1,"Bananas Loose 1.816kg",1.63,"veg"],[1,"Bistro Salad 150g",1.1,"veg"],[1,"Blueberries 150g",2.0,"veg"],[1,"British Free Range Eggs Medium x12",2.5,"dairy"],[1,"British Mature Cheddar Cheese 400g",2.95,"dairy"],[1,"Cheesy Slices x10 200g",1.45,"dairy"],[1,"Chip Shop Style Mushy Peas 300g",0.5,"store"],[1,"Extra Crispy French Fries 900g",2.65,"frozen"],[1,"Fresh Bunch Coriander 30g",0.55,"veg"],[1,"Fresh Mint 30g",0.5,"veg"],[1,"Frozen Summer Fruits 450g",3.5,"veg"],[1,"Giant Couscous 300g",1.6,"carb"],[1,"Greek Style Natural Yogurt 1kg",1.7,"dairy"],[1,"Green Pesto 190g",0.89,"store"],[1,"Large Garlic",0.5,"veg"],[1,"Lemons",0.37,"veg"],[1,"Mixed Leaf Salad 180g",1.8,"veg"],[1,"Extra Virgin Olive Oil 1L",7.75,"store"],[1,"Olive Spread 500g",1.28,"store"],[2,"Paneer 200g",3.54,"dairy"],[1,"Red & White Seedless Grapes 500g",1.6,"veg"],[1,"Red Label Fairtrade Decaf Tea Bags x80",1.9,"drink"],[1,"Red Onions Loose 0.432kg",0.41,"veg"],[1,"Rocha & Packham Pears x5",1.65,"veg"],[1,"Small Whole Cucumber",0.7,"veg"],[2,"Strawberries 250g",3.8,"veg"],[1,"Sultanas 500g",2.3,"store"],[1,"Variety Multipack Crisps 12x25g",1.59,"snack"],[1,"Vitamin B12 100ug x60",2.8,"supp"],[2,"White Grapefruit",1.1,"veg"],[1,"Whole Cucumber",0.99,"veg"],[1,"Sheldon's Burger Buns x6",1.6,"carb"],[1,"Snack a Jack Salt & Vinegar Rice Cake 117g",2.5,"snack"],[1,"Stamford Street Co. Mushy Peas 300g",0.39,"store"],[3,"Twister Mini Pineapple Ice Cream Lollies 6x50ml",4.35,"frozen"]]},{"id":"1345187508","date":"2026-09-18","subtotal":127.34,"saved":8.85,"coupons":1.55,"paid":116.94,"notes":"","items":[[4,"Alpro Almond No Sugar Chilled 1L",9.2,"drink"],[2,"Alpro Oat No Sugar Chilled 1L",4.4,"drink"],[1,"Birds Eye Breaded Omega 3 Fish Fingers x10 280g",1.65,"frozen"],[1,"Birds Eye Garden Peas & Sweetcorn 640g",2.6,"veg"],[2,"Cadbury Chocolate Covered Shortcake Biscuits 5x20g",2.0,"snack"],[1,"Deli Kitchen Greek Style Flatbread x4",1.0,"carb"],[2,"Fox's Rocky Stack'd Chocolate Cream 5x25g",2.5,"snack"],[1,"Innocent Kids Oranges, Mangoes & Pineapples Smoothies 4x150ml",3.6,"drink"],[1,"Innocent Pure Orange Juice Smooth 900ml",2.5,"drink"],[2,"Merchant Gourmet Glorious Grains Red Rice & Quinoa 250g",3.0,"carb"],[2,"Penn State Sea Salted Sharing Pretzels 175g",3.3,"snack"],[1,"Propercorn Lightly Sea Salted Popcorn 6x10g",1.5,"snack"],[1,"Propercorn Sweet & Salty Popcorn 6x14g",1.5,"snack"],[1,"Ramona's Original Houmous 500g",3.7,"store"],[1,"Salt & Vinegar Rice & Corn Cakes 130g",0.95,"snack"],[1,"Easy Peelers, Taste the Difference 600g",2.25,"veg"],[1,"Apples 1kg",2.1,"veg"],[1,"Aubergine",0.95,"veg"],[1,"Baby Leaf Salad 90g",0.9,"veg"],[1,"Bananas Loose 1.686kg",1.52,"veg"],[1,"Bistro Salad 150g",1.35,"veg"],[1,"Blueberries 150g",2.0,"veg"],[2,"British Free Range Eggs Medium x12",5.9,"dairy"],[1,"Chicken Breast Nuggets 1kg",3.67,"frozen"],[1,"Chip Shop Style Mushy Peas 300g",0.5,"store"],[1,"Fresh Bunch Coriander 30g",0.55,"veg"],[1,"Flat Leaf Parsley 30g",0.5,"veg"],[1,"Frozen Summer Fruits 450g",3.5,"veg"],[1,"Greek Feta Cheese 200g",2.35,"dairy"],[1,"Greek Style Natural Yogurt 1kg",1.7,"dairy"],[1,"Green Pesto 190g",0.89,"store"],[1,"Hazelnut Chocolate Spread 750g",3.0,"snack"],[1,"Italian Pomodorini Cherry Tomatoes in rich tomato juice, Taste the Difference 400g",1.3,"store"],[1,"Lemons",0.37,"veg"],[1,"Mixed Leaf Salad 180g",1.8,"veg"],[1,"Olive Spread 500g",1.6,"store"],[1,"Pitted Green Olives 340g",1.35,"store"],[1,"Ready To Eat Prunes 200g",1.75,"store"],[1,"Red Onions Loose 0.276kg",0.26,"veg"],[2,"Reduced Sugar & Salt Baked Beans 400g",0.76,"store"],[1,"Rocha & Packham Pears x5",1.65,"veg"],[2,"Skin on ASC Scottish Salmon Fillets x2 240g",9.9,"meat"],[1,"Small Whole Cucumber",0.7,"veg"],[1,"Spanish Chorizo Ring 225g",2.25,"meat"],[1,"Spinach Watercress & Rocket 100g",1.15,"veg"],[1,"Spirali Pasta 500g",0.75,"carb"],[2,"Strawberries 250g",3.8,"veg"],[1,"Sultanas 500g",2.3,"store"],[1,"Sweet Potatoes Loose 0.536kg",0.64,"veg"],[2,"Thick Sliced Wholemeal Bread 800g",1.5,"carb"],[1,"Variety Multipack Crisps 12x25g",1.59,"snack"],[1,"Vegetable Oil 1L",1.45,"store"],[1,"Whole Cucumber",0.99,"veg"],[1,"Sheldon's Burger Buns x6",1.6,"carb"],[1,"Sure Women Bright Bouquet Antiperspirant Aerosol 200ml",2.0,"home"]]},{"id":"1347319900","date":"2026-09-25","subtotal":102.28,"saved":6.53,"coupons":0,"paid":95.75,"notes":"","items":[[1,"Alpro Almond No Sugar Long Life 1L",2.3,"drink"],[1,"Alpro Oat No Sugar Chilled 1L",2.2,"drink"],[1,"BEAR Fruit Yoyos Raspberry Family Pack 9x20g",3.65,"snack"],[1,"BEAR Fruit Yoyos Strawberry Family Pack 9x20g",3.65,"snack"],[1,"Birds Eye Battered Fish Fillets x4 400g",2.1,"frozen"],[2,"Cadbury Chocolate Covered Shortcake Biscuits 5x20g",3.1,"snack"],[1,"Deli Kitchen Greek Style Flatbread x4",1.9,"carb"],[2,"Fox's Rocky Stack'd Vanilla Cream 5x25g",3.1,"snack"],[1,"Innocent Pure Orange Juice Smooth 900ml",2.5,"drink"],[1,"Laila Red Split Lentils 1kg",1.8,"carb"],[1,"Penn State Sea Salted Sharing Pretzels 175g",1.65,"snack"],[1,"Salt & Vinegar Rice & Corn Cakes 130g",0.95,"snack"],[2,"4 Quarter Pounder British Beef Burgers 454g",8.0,"meat"],[1,"Easy Peelers, Taste the Difference 600g",1.68,"veg"],[1,"Apples 1kg",2.1,"veg"],[2,"Aubergine",1.98,"veg"],[1,"Baby Leaf Salad 90g",0.9,"veg"],[1,"Baby Leaf Spinach 200g",1.5,"veg"],[1,"Bananas Loose 1.31kg",1.18,"veg"],[1,"Bistro Salad 150g",1.35,"veg"],[1,"British Free Range Eggs Medium x12",2.95,"dairy"],[1,"Chip Shop Style Mushy Peas 300g",0.5,"store"],[1,"Chopped Mixed Nuts 200g",1.9,"store"],[1,"Conference Pears x4",1.6,"veg"],[2,"Cypriot Halloumi Cheese 225g",3.98,"dairy"],[1,"Fresh Oregano 20g",0.7,"veg"],[1,"Frozen Summer Fruits 450g",3.5,"veg"],[1,"Greek Style Natural Yogurt 1kg",1.7,"dairy"],[1,"Green Pesto 190g",0.89,"store"],[1,"Happy Birthday Card, Green Present",1.5,"home"],[1,"Happy Birthday Card, Rainbow Letters",1.5,"home"],[1,"Honeydew Melon",1.89,"veg"],[2,"Italian Pomodorini Cherry Tomatoes in rich tomato juice, Taste the Difference 400g",1.94,"store"],[1,"Lemons",0.37,"veg"],[1,"Mixed Leaf Salad 180g",1.8,"veg"],[1,"Pine Nuts 100g",3.95,"store"],[1,"Reduced Sugar & Salt Baked Beans 400g",0.38,"store"],[2,"Small Whole Cucumber",1.4,"veg"],[2,"SO Organic Super Firm Tofu 300g",2.84,"meat"],[1,"Spinach Watercress & Rocket 100g",1.15,"veg"],[1,"Spirali Pasta 500g",0.75,"carb"],[2,"Strawberries 250g",3.8,"veg"],[2,"Thick Sliced Wholemeal Bread 800g",1.5,"carb"],[1,"Variety Multipack Crisps 12x25g",1.59,"snack"],[2,"Whole Cucumber",1.98,"veg"],[1,"Wholemeal Pittas x6",0.5,"carb"],[1,"Sheldon's Burger Buns x6",1.6,"carb"]]},{"id":"1349786898","date":"2026-10-02","subtotal":152.83,"saved":10.37,"coupons":0,"paid":142.46,"notes":"Maple syrup swapped for Maple Crest (+£0.25)","items":[[2,"Alpro Almond No Sugar Chilled 1L",4.6,"drink"],[2,"Alpro Oat No Sugar Chilled 1L",4.4,"drink"],[2,"Attis Greek Feta 2x75g",3.5,"dairy"],[1,"Baker Street Seeded Rye Bread 500g",2.0,"carb"],[2,"Birds Eye Battered Fish Fillets x4 400g",4.2,"frozen"],[2,"Cadbury Chocolate Covered Shortcake Biscuits 5x20g",2.48,"snack"],[1,"Deli Kitchen Greek Style Flatbread x4",1.9,"carb"],[1,"Extra Peppermint Sugarfree Chewing Gum x46",2.5,"home"],[1,"Fox's Rocky Stack'd Vanilla Cream 5x25g",1.55,"snack"],[1,"Innocent Pure Orange Juice Smooth 900ml",2.5,"drink"],[1,"Maple Crest Maple Syrup 250g",4.15,"store"],[1,"Penn State Sea Salted Sharing Pretzels 175g",1.65,"snack"],[1,"Ramona's Original Houmous 500g",3.7,"store"],[1,"Ryvita Crispbread Multigrain Crackers 250g",1.6,"snack"],[1,"Salt & Vinegar Rice & Corn Cakes 130g",0.95,"snack"],[1,"4 Quarter Pounder British Beef Burgers 454g",4.0,"meat"],[1,"Unwaxed Lemons x4",1.4,"veg"],[1,"Easy Peelers, Taste the Difference 600g",1.68,"veg"],[1,"Apples 1kg",2.1,"veg"],[1,"Baby Leaf Salad 90g",0.9,"veg"],[1,"Baby Leaf Spinach 200g",1.5,"veg"],[1,"Baking Potatoes x4",0.79,"veg"],[1,"Bananas Loose 1.686kg",1.52,"veg"],[1,"Bistro Salad 150g",1.35,"veg"],[1,"British Mature Cheddar Cheese 400g",2.95,"dairy"],[1,"Buckwheat 500g",2.7,"carb"],[1,"Cantaloupe Melon",2.0,"veg"],[2,"Chicken Dippers x20 450g",3.3,"frozen"],[1,"Chip Shop Style Mushy Peas 300g",0.6,"store"],[1,"Conchiglie Shells Pasta 500g",0.69,"carb"],[2,"Double Pepperoni Thin Pizza 339g",3.0,"frozen"],[1,"Edamame Beans 500g",2.88,"veg"],[1,"French Fries 900g",1.12,"frozen"],[1,"Fresh Oregano 20g",0.7,"veg"],[1,"Fresh Rosemary 20g",0.5,"veg"],[1,"Frozen Summer Fruits 450g",3.6,"veg"],[1,"Garden Peas 910g",1.55,"veg"],[1,"Garlic, So Organic x3",1.0,"veg"],[1,"Ginger 100g",1.25,"veg"],[1,"Greek Style Natural Yogurt 1kg",1.7,"dairy"],[1,"Green Pesto 190g",0.89,"store"],[1,"High Fibre Bran 500g",2.0,"carb"],[2,"Italian Milano Salami Slices x10 53g",1.76,"meat"],[2,"Large Garlic",1.0,"veg"],[2,"Little Gem Lettuce",1.54,"veg"],[1,"Loose Broccoli 0.298kg",0.59,"veg"],[1,"Mixed Leaf Salad 180g",1.8,"veg"],[1,"Olive Spread 500g",1.6,"store"],[3,"Reduced Sugar & Salt Baked Beans 400g",1.14,"store"],[1,"Rocha & Packham Pears x5",1.65,"veg"],[1,"Roquefort Blue Cheese, Taste the Difference 100g",2.25,"dairy"],[2,"Small Whole Cucumber",1.4,"veg"],[2,"SO Organic Super Firm Tofu 300g",2.84,"meat"],[2,"Speciality Radish, Taste the Difference 200g",1.42,"veg"],[1,"Spinach Watercress & Rocket 100g",1.15,"veg"],[1,"Spirali Pasta 500g",0.75,"carb"],[1,"Strawberries 400g",2.5,"veg"],[1,"Sultanas 500g",2.3,"store"],[1,"Sweet Potatoes Loose 1.204kg",1.43,"veg"],[1,"Sweetcorn, Super Sweet 1kg",1.9,"veg"],[2,"Thick Sliced Wholemeal Bread 800g",1.5,"carb"],[1,"Thin & Crispy Four Cheese Pizza 354g",1.5,"frozen"],[2,"Thin & Crispy Hawaiian Pizza 385g",3.0,"frozen"],[2,"Udon Noodles Quick To Cook x2 300g",2.2,"carb"],[1,"Variety Multipack Crisps 12x25g",1.59,"snack"],[2,"Whole Cucumber",1.5,"veg"],[1,"Zaatar, Inspired to Cook 35g",2.0,"store"],[1,"Sarson's Distilled Malt Vinegar 568ml",1.85,"store"],[1,"Sheldon's Burger Buns x6",1.6,"carb"],[1,"Stamford Street Co. Wholegrain Rolled Oats 1kg",0.85,"carb"],[1,"Viakal Classic Bathroom Limescale Remover Spray 750ml",4.0,"home"],[1,"Warburtons Gluten Free Greek Style Soft Flatbreads x3",2.5,"carb"]]},{"id":"1352607779","date":"2026-10-09","subtotal":136.01,"saved":8.9,"coupons":0.25,"paid":126.86,"notes":"","items":[[2,"Alpro Almond No Sugar Chilled 1L",3.2,"drink"],[2,"Alpro Oat No Sugar Chilled 1L",3.2,"drink"],[1,"Aveeno Kids Shampoo with Soothing Oat & Shea Butter 250ml",7.0,"home"],[1,"Baker Street Seeded Rye Bread 500g",2.0,"carb"],[2,"Cadbury Chocolate Covered Shortcake Biscuits 5x20g",3.1,"snack"],[1,"Deli Kitchen Greek Style Flatbread x4",1.9,"carb"],[1,"Fox's Rocky Stack'd Vanilla Cream 5x25g",1.55,"snack"],[1,"HP The Original Brown Sauce 600g",3.25,"store"],[1,"Innocent Pure Orange Juice Smooth 900ml",3.2,"drink"],[2,"Oatly Oat Drink Barista Edition Long Life 1L",2.9,"drink"],[1,"Penn State Sea Salted Sharing Pretzels 175g",1.65,"snack"],[1,"Pukka Organic Three Ginger Tea x20",3.25,"drink"],[1,"Ritter Sport Marzipan 100g",1.7,"snack"],[1,"Salt & Vinegar Rice & Corn Cakes 130g",0.95,"snack"],[1,"Asparagus Spears 250g",2.35,"veg"],[1,"Closed Cup Chestnut Mushrooms 300g",1.05,"veg"],[2,"4 Quarter Pounder British Beef Burgers 454g",8.0,"meat"],[1,"Easy Peelers, Taste the Difference 600g",1.68,"veg"],[1,"Apples 1kg",2.1,"veg"],[1,"Baby Leaf Salad 90g",1.0,"veg"],[1,"Baby Leaf Spinach 200g",1.5,"veg"],[1,"Bananas Loose 1.412kg",1.27,"veg"],[1,"Bistro Salad 150g",1.35,"veg"],[1,"British Free Range Eggs Medium x12",2.95,"dairy"],[1,"British Lighter Crème Fraîche 300ml",0.9,"dairy"],[1,"British Mature Cheddar Cheese 400g",2.95,"dairy"],[1,"Chip Shop Style Mushy Peas 300g",0.6,"store"],[1,"Emmental Cheese Slices 250g",2.5,"dairy"],[1,"French Fries 900g",1.12,"frozen"],[1,"Frozen Summer Fruits 450g",3.6,"veg"],[1,"Greek Style Natural Yogurt 1kg",1.7,"dairy"],[1,"Green Pesto 190g",0.89,"store"],[1,"Honeydew Melon",1.6,"veg"],[2,"Italian Milano Salami Slices x10 53g",2.2,"meat"],[1,"Little Gem Lettuce",0.77,"veg"],[1,"Loose Broccoli 0.492kg",1.18,"veg"],[1,"Mixed Leaf Salad 180g",1.5,"veg"],[1,"Panko Breadcrumbs, Inspired to Cook 100g",1.4,"carb"],[2,"Red Grapefruit",0.88,"veg"],[1,"Reduced Fat Mayonnaise 480ml",0.85,"store"],[1,"Reduced Sugar & Salt Baked Beans 400g",0.37,"store"],[1,"Rocha & Packham Pears x5",1.65,"veg"],[1,"Roquefort Blue Cheese, Taste the Difference 100g",3.0,"dairy"],[2,"Skin on ASC Scottish Salmon Fillets x2 240g",9.9,"meat"],[2,"Small Whole Cucumber",1.4,"veg"],[1,"SO Organic Super Firm Tofu 300g",1.42,"meat"],[1,"Spinach Watercress & Rocket 100g",1.15,"veg"],[1,"Spring Onions Bunch 100g",0.65,"veg"],[1,"Strawberries 250g",2.2,"veg"],[1,"Strawberries 400g",2.5,"veg"],[1,"Sugar Snap Peas 200g",1.7,"veg"],[1,"Tagliatelle Pasta 500g",0.75,"carb"],[1,"Tenderstem Broccoli 200g",1.6,"veg"],[2,"Thick Sliced Wholemeal Bread 800g",1.5,"carb"],[1,"Variety Multipack Crisps 12x25g",2.0,"snack"],[1,"Vegetable Stock Cubes 10x10g",1.1,"store"],[2,"Whole Cucumber",1.98,"veg"],[1,"Wholemeal Tortilla Wraps x8 512g",1.4,"carb"],[1,"Sheldon's Burger Buns x6",1.6,"carb"],[1,"Warburtons Gluten Free Greek Style Soft Flatbreads x3",2.5,"carb"]]},{"id":"1355068895","date":"2026-10-16","subtotal":172.26,"saved":13.19,"coupons":0,"paid":159.07,"notes":"Green pesto swapped for Sacla Basil Pesto (+£2.46); mixed leaf salad 180g swapped for 2 x 90g (+£0.50)","items":[[2,"Alpro Almond No Sugar Chilled 1L",3.2,"drink"],[2,"Alpro Oat No Sugar Chilled 1L",3.2,"drink"],[1,"Birds Eye Battered Fish Fillets x4 400g",4.2,"frozen"],[2,"Cadbury Chocolate Covered Shortcake Biscuits 5x20g",3.1,"snack"],[2,"Deli Kitchen Greek Style Flatbread x4",3.0,"carb"],[1,"Duracell Specialty 2025 Lithium Coin Battery 3V x2",5.0,"home"],[1,"Fox's Rocky Stack'd Vanilla Cream 5x25g",1.0,"snack"],[1,"Heck Chicken Italia Gluten Free Chipolata Sausages x10 340g",3.25,"meat"],[1,"Hero Mighty Original Spot Pimple Patches x36",8.8,"home"],[1,"Innocent Pure Orange Juice Smooth 1.35L",3.0,"drink"],[2,"Mutti Finely Chopped Tomatoes 400g",2.4,"store"],[1,"Penn State Sea Salted Sharing Pretzels 175g",1.65,"snack"],[1,"Ramona's Original Houmous 500g",3.75,"store"],[1,"Ritter Sport Cocoa Mousse 100g",2.0,"snack"],[1,"Ritter Sport Marzipan 100g",2.0,"snack"],[1,"Sacla Basil Pesto 190g",3.35,"store"],[1,"Salt & Vinegar Rice & Corn Cakes 130g",0.95,"snack"],[1,"4 Extra Thin Lightly Seasoned Smash Burgers, Taste the Difference 340g",4.5,"meat"],[1,"Apples 1kg",2.1,"veg"],[2,"Aubergine",2.1,"veg"],[1,"Baby Leaf Salad 90g",1.0,"veg"],[1,"Baby Leaf Spinach 200g",1.5,"veg"],[1,"Bananas Loose 1.148kg",1.03,"veg"],[1,"Bistro Salad 150g",1.35,"veg"],[1,"British Free Range Eggs Medium x12",2.95,"dairy"],[1,"British Mature Cheddar Cheese 400g",2.95,"dairy"],[2,"British or Irish 5% Fat Beef Mince 250g",5.1,"meat"],[1,"Chia Seeds 150g",1.85,"store"],[1,"Chip Shop Style Mushy Peas 300g",0.6,"store"],[1,"Dishwasher Salt Granules 1kg",1.5,"home"],[1,"Easy Peelers 600g",1.5,"veg"],[1,"Emmental Cheese Slices 250g",2.5,"dairy"],[1,"Free From Lasagne Sheets 250g",0.75,"carb"],[1,"French Fries 900g",1.12,"frozen"],[1,"Frozen Summer Fruits 450g",3.6,"veg"],[1,"Grana Padano Cheese 200g",3.3,"dairy"],[1,"Greek Style Natural Yogurt 1kg",1.7,"dairy"],[1,"Hazelnut Chocolate Spread 750g",2.98,"snack"],[1,"High Fibre Bran 500g",2.0,"carb"],[1,"Honeydew Melon",1.6,"veg"],[2,"Italian Milano Salami Slices x10 53g",2.2,"meat"],[2,"Italian Pomodorini Cherry Tomatoes in rich tomato juice, Taste the Difference 400g",2.6,"store"],[2,"Lemons",0.74,"veg"],[1,"Loose Broccoli 0.438kg",1.05,"veg"],[2,"Mixed Leaf Salad 90g",2.0,"veg"],[1,"Multigrain Hoops Cereal 375g",0.79,"carb"],[1,"Olive Spread 500g",1.6,"store"],[3,"Red Grapefruit",1.32,"veg"],[1,"Red Label Fairtrade Decaf Tea Bags x80",1.9,"drink"],[1,"Red Onions x3",0.95,"veg"],[1,"Reduced Sugar & Salt Baked Beans 400g",0.37,"store"],[1,"Ricotta Cheese 250g",1.47,"dairy"],[1,"Rocha & Packham Pears x5",1.65,"veg"],[1,"Roquefort Blue Cheese, Taste the Difference 100g",3.0,"dairy"],[2,"Small Whole Cucumber",1.6,"veg"],[1,"SO Organic Super Firm Tofu 300g",1.42,"meat"],[1,"Spinach Watercress & Rocket 100g",1.35,"veg"],[1,"Strawberries 250g",2.35,"veg"],[1,"Sultanas 500g",2.35,"store"],[1,"Tangerines 600g",1.5,"veg"],[1,"Tenderstem Broccoli 200g",1.6,"veg"],[2,"Thick Sliced Wholemeal Bread 800g",1.5,"carb"],[1,"Variety Multipack Crisps 12x25g",2.0,"snack"],[1,"West Country Whole Milk 1.13L",1.2,"drink"],[1,"Whole Cucumber",1.09,"veg"],[1,"Wholemeal Tortilla Wraps x8 512g",1.4,"carb"],[1,"Red Wine Vinegar 500ml",2.35,"store"],[1,"White Wine Vinegar 500ml",2.35,"store"],[1,"Sensodyne Whitening Repair & Protect Toothpaste 75ml",3.95,"home"],[1,"Sheldon's Burger Buns x6",1.6,"carb"],[1,"Stamford Street Co. Mushy Peas 300g",0.39,"store"],[1,"Sure Maximum Protection Anti Perspirant Cream Stick 60ml",4.0,"home"]]}]},
  garden: {"plot":"5 x 5 m","intro":"Plan for the spring 2027 growing season. Everything is started in modules, because slugs eat outdoor seedlings, and planted out once big enough to cope. Dates are a general UK guide for Bath (last frost about late April to mid May). Check each seed packet and adjust to the year.","crops":[{"n":"Tomato: De Colgar","fam":"fruit","h":[8,9,10],"sp":"45-60 cm apart, staked","note":"Thick-sauce or keeping tomato","m":[3,4],"p":[5,6]},{"n":"Tomato: Gigante Liscio","fam":"fruit","h":[8,9,10],"sp":"45-60 cm apart, staked","note":"Maincrop salad type","m":[3,4],"p":[5,6]},{"n":"Tomato: Moskvich","fam":"fruit","h":[7,8,9],"sp":"45-60 cm apart, staked","note":"Hardy and delicious","m":[3,4],"p":[5,6]},{"n":"Tomato: Urbikany","fam":"fruit","h":[7,8,9],"sp":"45-60 cm apart, staked","note":"Early salad type","m":[3,4],"p":[5,6]},{"n":"Summer squash: Early Prolific Straightneck","fam":"cuc","h":[7,8,9],"sp":"About 90 cm each","note":"","m":[4,5],"p":[5,6]},{"n":"Squash: Blue Hungarian","fam":"cuc","h":[9,10],"sp":"1 to 1.5 m, or train up a support","note":"Winter squash, harvest before frost and cure to store","m":[4,5],"p":[5,6]},{"n":"Cucumber: Boothby's Blond","fam":"cuc","h":[7,8,9],"sp":"About 45 cm, trained up a trellis","note":"Yellow lunchbox cucumber","m":[4,5],"p":[5,6]},{"n":"Cucumber: Miniature White","fam":"cuc","h":[7,8,9],"sp":"About 45 cm, trained up a trellis","note":"","m":[4,5],"p":[5,6]},{"n":"Pea: Oskar","fam":"leg","h":[5,6],"sp":"About 5 cm apart in a double row","note":"Very, very early. Root trainers or deep cells, plant out under fleece","m":[2,3],"p":[3,4]},{"n":"Pea: Champion of England","fam":"leg","h":[6,7,8],"sp":"5-8 cm apart, 1.5 to 2 m support","note":"Tall, needs strong netting or canes","m":[3,4],"p":[4,5]},{"n":"Bush bean: Vittoria Early","fam":"leg","h":[7,8,9],"sp":"15-20 cm apart, rows 45 cm","note":"Guest variety for trial. Plant out only after the last frost. Sow a second batch in June","m":[4,5,6],"p":[5,6,7]},{"n":"Cabbage: Copenhagen Market","fam":"bra","h":[7,8,9],"sp":"About 45 cm each","note":"Summer cabbage. Net against pigeons and butterflies","m":[3,4],"p":[4,5]},{"n":"Swede: Joan","fam":"bra","h":[10,11,12],"sp":"About 23 cm in rows 38 cm","note":"Long season, stays in the ground into winter","m":[4,5],"p":[5,6]},{"n":"Turnip: Navet de Nancy","fam":"bra","h":[6,7,8,9,10,11],"sp":"10-15 cm in rows 30 cm","note":"Sow little and often","m":[3,4,5,6,7],"p":[4,5,6,7,8]},{"n":"Radish: Pernot Clair","fam":"bra","h":[4,5,6,7,8,9,10],"sp":"2.5 cm in rows 15 cm","note":"Salad radish. Tuck it between slower crops","m":[2,3,4,5,6,7,8],"p":[3,4,5,6,7,8,9]},{"n":"Beetroot: Sanguina","fam":"root","h":[7,8,9,10],"sp":"10 cm in rows 30 cm","note":"","m":[3,4,5,6],"p":[4,5,6,7]},{"n":"Carrot: Beauty (Kraska)","fam":"root","h":[7,8,9,10],"sp":"Thin to 7 cm in rows 25 cm","note":"Guest variety for trial. Multi-sow in deep cells and plant out the whole clump while small","m":[3,4,6],"p":[4,5,7]},{"n":"Leek: Jaune de Poitou","fam":"all","h":[10,11,12,1,2,3],"sp":"15 cm in rows 30 cm, dibbed in","note":"Yellow leek. Slow, 8 to 10 weeks in modules","m":[2,3],"p":[5,6,7]}],"families":[{"id":"fruit","label":"Tomatoes"},{"id":"cuc","label":"Squash and cucumbers"},{"id":"leg","label":"Peas and beans"},{"id":"bra","label":"Brassicas (cabbage, swede, turnip, radish)"},{"id":"root","label":"Roots (beetroot, carrot)"},{"id":"all","label":"Leeks"},{"id":"water","label":"Pond and swale (keep clear)"}],"layout":[{"x":0,"y":0,"w":1.5,"h":1,"f":"root","t":"Carrot"},{"x":1.5,"y":0,"w":1.5,"h":1,"f":"root","t":"Beetroot"},{"x":3,"y":0,"w":1,"h":1,"f":"bra","t":"Radish, turnip"},{"x":4,"y":0,"w":1,"h":1,"f":"water","t":"Frog pond"},{"x":0,"y":1,"w":2,"h":1.5,"f":"leg","t":"Oskar peas, Vittoria beans"},{"x":2,"y":1,"w":2.5,"h":1.5,"f":"bra","t":"Cabbage, swede"},{"x":4.5,"y":1,"w":0.5,"h":4,"f":"water","t":"Swale"},{"x":0,"y":2.5,"w":1.5,"h":1.3,"f":"all","t":"Leeks"},{"x":1.5,"y":2.5,"w":3,"h":1.3,"f":"cuc","t":"Straightneck and Blue Hungarian squash"},{"x":0,"y":3.8,"w":2,"h":1.2,"f":"fruit","t":"Tomatoes x4"},{"x":2,"y":3.8,"w":1.3,"h":1.2,"f":"leg","t":"Champion of England peas"},{"x":3.3,"y":3.8,"w":1.2,"h":1.2,"f":"cuc","t":"Cucumbers x2 on a trellis"}],"jobs":[["Feb","Set up and slug-proof the module bench. Sow leeks and Oskar peas in modules (root trainers or deep cells for the peas)."],["Mar","Sow tomatoes (needs warmth), summer cabbage and Champion of England peas. First modules of radish, turnip, beetroot and carrot. Plant out Oskar peas under fleece at the end of the month."],["Apr","Sow squash, cucumbers, bush beans and swede in modules. Plant out cabbage, Champion peas and the first radish, turnip, beetroot and carrot clumps. Keep sowing the next batches."],["May","Harden everything off. Plant out beans and swede once the last frost has passed (mid May is a safe guide for Bath). Pot on tomatoes, squash and cucumbers rather than planting them early."],["Late May to Jun","Plant out tomatoes, squash and cucumbers once frost has passed. Plant out leeks. Sow the second bean batch and the summer carrot and beetroot batches in modules."],["Jul to Aug","Harvest peas, early tomatoes, summer squash, cucumbers and the first roots. Keep sowing radish and turnip in modules for autumn. Fill any gaps with spares."],["Sep to Oct","Harvest tomatoes and cure the Blue Hungarian squash before the first frost. Lift beetroot and carrots."],["Nov to Mar","Leeks, swede and turnips stand in the ground and are lifted as needed."]],"layoutNote":"Draft layout. South is at the top, so the right side is west. The frog pond is in the top right corner and the swale runs down the right edge to the bottom right, so the right side is wettest. I assumed the pond is about 1 m square and the swale margin about 0.5 m wide, so correct me on the real sizes. Tall crops sit along the north (bottom) edge so they shade nothing. Paths come out of this space: with 1.2 m beds expect to lose roughly 3 m2.","rotation":"Rotation: move each family one bed on each year so tomatoes, squash, brassicas, roots and leeks do not sit in the same ground twice running. Brassicas need a gap of 3 to 4 years between visits to the same soil because of club root.","compass":{"top":"South (sun side)","bottom":"North","left":"East (drier)","right":"West (wettest)"},"site":["Right (west) side, wet: squash, cucumbers and brassicas, which like moisture. Leeks cope with it too. Keep crops off the swale itself and leave a margin around the pond so the frogs keep their cover. The frogs will help with slugs.","Left (east) side, drier: carrots, beetroot, beans, tomatoes and leeks. Carrots fork and rot in wet heavy soil, and tomatoes dislike wet feet and get blight more easily in damp air, so keep both well away from the swale. A raised mound or ridge helps if the soil stays heavy.","Brassicas are the risk on the wet side. Club root likes wet, acid soil, so lime the cabbage and swede ground to about pH 7 and keep a long rotation. Net the cabbage against pigeons and butterflies.","Peas want steady moisture but not waterlogging, so they sit in the middle of the plot rather than against the swale."],"principles":["Everything is sown in modules and planted out as sturdy plants, 3 to 8 weeks later depending on the crop. That makes the whole calendar about 3 to 5 weeks earlier than direct sowing, and the ground can keep growing something else until the modules are ready.","Stagger by date: sow radish every 2 to 3 weeks from February to August, beetroot and turnip every 3 weeks from March to July, and carrots in March, April and June. Sow the beans in two batches.","Stagger by variety: Oskar peas crop in May and June, Champion of England from June. Moskvich and Urbikany tomatoes ripen first in July, De Colgar and Gigante Liscio follow in August and September.","Follow every early crop with a late one: after Oskar peas come beans or swede, after summer cabbage comes turnip, and after radish come leeks. Peas and beans leave nitrogen behind for the brassicas and leeks that follow.","Modules make fast crops easy to interplant: plant radish and turnip clumps in the gaps where squash, tomatoes, cucumbers and leeks will go, and pull them in 4 to 6 weeks before the big plants need the ground."],"succession":[["Carrots, beetroot (front row)","Sow radish, beetroot and carrot in modules from March. Plant out the clumps in April and May. The radish clumps are pulled before the roots need the space.","Sow beetroot every 3 weeks to June and carrots again in June for autumn roots.","Lift roots from September to October."],["Radish and turnip patch (front row)","Sow radish every 2 to 3 weeks from February. First Navet de Nancy in March.","Small turnip and radish modules through to August. Keep harvesting young.","Last turnips come out by November."],["Oskar peas and Vittoria beans","Oskar in modules in February, planted out under fleece in late March. Plant beans between the pea rows in mid May after the frost.","Cut the Oskar haulm to the ground after the May and June crop and leave the roots in. Plant the second bean batch in July. Beans crop July to September.","Clear in October. Plant radish or turnip modules in any gaps in August."],["Cabbage and swede (wet side)","Sow cabbage in March, plant out in April or May under net. Radish clumps between the plants until they close up.","Plant out swede modules in May or June in the gaps. Cut cabbage July to September, then plant turnip modules in the cleared space.","Swede stays in the ground into winter. Lift as needed."],["Leeks","Sow leeks in modules in February or March. The ground grows radish or an early beetroot row meanwhile.","Plant out leeks in June or July as the early crop clears.","Lift from October and through the winter."],["Squash (middle, moist)","Sow squash in modules in April. Radish clumps go in the squash ground in April.","Plant squash in late May or June, about 1 m apart. Pull the radish first. Summer squash July to September.","Cure Blue Hungarian in September or October before frost. Sow a green manure after."],["Tomatoes, peas, cucumbers (north edge)","Sow tomatoes in March, Champion of England peas in March and April, cucumbers in April. Radish occupies the tomato and cucumber ground until June.","Plant out tomatoes and cucumbers in June. Early tomatoes ripen in July, maincrop in August. Peas crop June to August.","Clear tomatoes by October. Clear the pea ground in August and plant turnip or radish modules."]],"modules":[["Tomatoes","7 to 9 cm pots, one seed each, potted on","6 to 8 weeks","Sow 3 or 4 of each variety. Keep the best 2 as spares."],["Squash and cucumbers","7 to 9 cm pots, one seed on its edge each","3 to 4 weeks","Sow 3 of each variety. Do not let them get leggy. Keep warm and plant out after frost."],["Oskar and Champion peas","Root trainers or deep cells, 3 to 4 seeds each","3 to 4 weeks","Mice love pea seed. Keep trays covered until they are up."],["Bush beans","Deep cells, 2 seeds each","3 to 4 weeks","Plant out after the last frost. Sow 50% more than you need."],["Cabbage and swede","Cells, 2 seeds each, thinned to 1","4 to 6 weeks","Sow 2 to 3 times the slots you need. Collar and net on planting."],["Radish and turnip","Cells, 3 to 5 seeds each, not thinned","2 to 4 weeks","Plant out as clumps. Sow small batches often."],["Beetroot","Cells, 3 to 4 seeds each, not thinned","4 to 5 weeks","Plant clumps 15 to 20 cm apart."],["Carrot","Deepest cells or root trainers, 4 to 6 seeds each","4 to 5 weeks","Plant out the whole clump while small. Some forking is the price. Sow double."],["Leeks","Cells, 3 to 5 seeds each","8 to 10 weeks","Slow. Plant out in clumps or dibbed."]],"spares":["Overseed by default: sow about 150% of the plants you need, and 2 to 3 times for the crops where every plant counts (tomatoes, squash, cucumbers, cabbage, swede).","Keep a spares tray of each crop going at the bench until planting is done. Anything that dies outdoors is replaced from there the same week.","Plant a few extra modules at the edge of each bed as living spares and move them into any gap that opens up.","Label every tray with the variety and sow date. When the spares run low, sow the next batch.","Slugs climb legs. Put the bench on legs standing in water or with copper tape, keep trays off the ground, and check under pots. Slugs will still eat transplants, so plant out big, hardened-off plants in the evening. The pond frogs are your ally.","Each batch is only 3 to 5 weeks of bench time for most crops, but tomatoes, leeks and the early peas hold space for longer. Bench and cold-frame space is the real limit."]},
  packing: {"intro":"Family packing list for the trip, built from the earlier trip planner and your latest list. Tick things off as you pack. Ticks are saved in this browser only.","groups":[{"name":"Me","items":[["T-shirt",1,200,450],["Jumper",1,600,2500],["Shirt",1,200,800],["Shorts (swim)",1,150,300],["Pants",2,50,150],["Socks",2,40,150],["PJs",1,300,900],["Bar shampoo",1,60,70],["Bar Conditioner",1,55,65],["Bar Sunblock",1,45,55],["Anti-bac gel",1,60,70],["Tissues",1,30,50],["Wet Wipes",1,80,120],["Towel",1,400,500],["Toothbrush",1,15,30],["Toothpaste",1,70,80],["Comb",1,15,15],["Medication",1,100,150],["Passport",1,40,40],["Travel insurance",1,10,20],["Cash",1,20,20],["Travel Plug",1,70,100],["Chargers",1,150,200],["Power block",1,200,180],["Wet bag",1,50,100],["Washing Line",1,50,60],["First aid Kit",1,250,400],["Sunglasses",1,50,150],["Reading Glasses",1,40,100],["Sippy cup",1,100,250],["Kindle",1,200,150],["Raincoat",1,400,1000],["Packable cups",1,40,60],["Hat",1,80,400],["Tote",1,60,80],["Sleeveless top",1,200,800],["Compression top",1,200,800],["Running shorts",1,150,400],["Running belt",1,20,50],["Sandals / flip-flops",1,800,3500],["Ear plugs",1,20,50],["Heavy shoes / trainers",1,800,3500,1],["Trousers / jeans",1,500,2000,1],["Jumper / fleece",1,600,3500,1],["Underwear and socks",1,90,200,1]]},{"name":"Wife","items":[["Dresses",2,250,700],["T-shirts",2,190,350],["Hoodie",1,600,2500],["Swimsuit",1,150,200],["Pants",7,50,80],["Socks",2,40,130],["PJs",1,330,800],["Towel",1,400,500],["Toothbrush",1,15,30],["Hairbrush",1,80,200],["Bobbles",1,10,15],["Hairclips",1,15,20],["Contact lenses",1,100,150],["Glasses",1,50,150],["Medication",1,100,150],["Toiletries",1,600,1200],["Sunglasses",1,50,150],["Kindle",1,200,150],["Hat",1,80,400],["Phone",1,190,100],["Charger",1,80,100],["Dark trousers",3,500,2000],["Sandals / flip-flops",1,800,3500],["Pink handheld fan",1,250,400],["Eagle Creek packing cube",1,150,400],["Heavy shoes / trainers",1,800,3500,1],["Travel trousers / leggings",1,500,2000,1],["Hoodie / cardigan",1,600,3500,1],["Underwear and socks",1,90,200,1]]},{"name":"Girl","items":[["Tops",3,100,250],["Bottoms",2,200,350],["Swimsuit",1,50,150],["Hoodie",1,300,1500],["Pants",7,20,60],["Socks",2,20,90],["PJs",1,150,500],["After Towel",1,200,400],["Sunglasses",1,30,100],["Hat",1,60,300],["Travel doll",1,150,400],["Trainers",1,270,1500,1],["Comfortable bottoms",1,200,1000,1],["Hoodie",1,300,1500,1],["Underwear and socks",1,40,100,1]]},{"name":"Boy","items":[["Tops",3,50,250],["Bottoms",2,100,350],["Swimsuit",1,30,150],["Hoodie",1,150,1500],["Pants",7,10,60],["Socks",2,10,90],["PJs",1,80,500],["After Towel",1,200,400],["Sunglasses",1,30,100],["Hat",1,60,300],["Green water bottle",1,150,400],["Trainers",1,120,800,1],["Comfortable bottoms",1,100,500,1],["Hoodie",1,150,800,1],["Underwear and socks",1,20,40,1]]},{"name":"Shared","items":[["Trimui Brick (retro handheld)",1,250,400],["Power bank (10,000 mAh or more)",1,250,400],["Charging cables and tech pouch",3,50,100],["Multi-port universal charger (GaN)",1,250,400],["Wet wipes",2,150,400],["Towels (Turkish / peshtemal)",4,400,2500],["Travel cup / mug",1,150,400],["Packing cubes (colour-coded)",4,150,400],["Passports, driving licence and cash",1,150,400],["Smartphones and Kindles",4,250,400],["Headphones / earbuds",2,250,400],["Empty water bottles (fill at the airport)",3,150,400],["Flight snacks",1,150,400],["Games (Fox in the Forest, Uno, travel chess, Deep Sea Adventure Boost, King of Tokyo)",1,150,400],["Drawing pads and pens",2,150,400],["Armbands (floaties)",2,150,400],["Mosquito control (spray or plug-in diffusers)",1,100,300],["Deodorant and lip balm",2,100,300],["Bar toiletries (soap, shampoo, sunblock)",4,100,300],["Toothbrushes and paste",4,100,300],["Dental floss",1,100,300],["Contact lenses and solution",1,100,300],["Hairbrush, comb and bobbles",1,100,300],["Flannels and microfibre cloth",2,150,400],["Tissues and handkerchief",2,150,400],["Flat sink stopper (for laundry)",1,150,400],["Washing line and wet bag (dry bag)",2,150,400],["Blister tape, first aid and meds",1,150,400]]},{"name":"Luggage","items":[["Suitcase 1 (Me, Girl, Boy and shared)",1,3500,0],["Suitcase 2 (Wife)",1,3500,0]]}],"suggestions":["Running top, running socks and running shoes from the earlier list, if you plan to run on the trip (the planner has running shorts and a belt but no running shoes).","Inhalers and the peak flow meter, if \"Medication\" does not already cover them. Pack the reliever where you can reach it.","B12 and vitamin D tablets and any other supplements.","Run fuel (gels, bars) and the sodium mix, if you are running or doing long walks.","Anything that is on both a personal list and the shared list, so we can remove the double counting."],"note":"Weights and volumes are rough estimates (grams and millilitres per item, packed and squashed), to refine over time. Worn items are listed but not counted. Items that appear on a personal list and the shared list (wet wipes, tissues, washing line, first aid, toothbrushes, towels, phones) are counted twice for now. Medication, first aid and toiletries are placeholders.","lastTrip":{"rows":[["Suitcase 1 (Me, Girl, Boy and shared gear)",16,"Weighed total including the suitcase"],["Suitcase 2 (Wife)",11,"Weighed total including the suitcase"],["Packing cube, Me",2,"Matches the 2.0 kg of items in the planner (T-shirts, shirts, shorts, belt, underwear, socks, PJs)"],["Packing cube, Girl",2,"Planner said about 1.75 kg"],["Packing cube, Boy",1,"Planner said about 1.2 kg"]],"suitcaseEmpty":3.5,"note":"From the earlier trip planner (7 days, 22 C, two suitcases). It assumed 3.5 kg for each empty suitcase, so the contents were about 12.5 kg and 7.5 kg. Item weights in that planner were within about 10 to 20% of the weighed cubes."},"suitcases":[{"name":"Suitcase 1 (Me, Girl, Boy, Shared)","groups":["Me","Girl","Boy","Shared"],"last":16},{"name":"Suitcase 2 (Wife)","groups":["Wife"],"last":11}]},
  nt: {"source":"Lists of National Trust properties in England and in Wales, Wikipedia (CC BY-SA 4.0)","note":"England and Wales, as listed on Wikipedia, which may be out of date. The Welsh list covers the more notable sites only, not every moorland, farm or coastal holding. Scotland has its own National Trust for Scotland, and Northern Ireland is not included. A property that appears under two counties is one place and counts once.","visited":[["Washington Old Hall","2026-10-26"],["Lacock Abbey, Fox Talbot Museum","2026-08-31"],["Dyrham Park","2026-08-09"],["Fountains Abbey and Studley Royal Water Garden","2026-07-28"],["Stonehenge Landscape","2026-09-06"],["Tredegar House","2026-08-15"]],"counties":[{"name":"Bedfordshire","places":["Dunstable Downs","Sharpenhoe","Whipsnade Tree Cathedral","Willington Dovecote and Stables"],"country":"England"},{"name":"Berkshire","places":["Ashdown House","Basildon Park","Cock Marsh","Lardon Chase, the Holies and Lough Down"],"country":"England"},{"name":"Bristol","places":["Blaise Hamlet","Westbury College Gatehouse"],"country":"England"},{"name":"Buckinghamshire","places":["Ascott House","Ashridge Estate","Boarstall Duck Decoy","Boarstall Tower","Bradenham Village","Buckingham Chantry Chapel","Claydon House","Cliveden","Coombe Hill","Dorneywood Garden","Hartwell House","Hughenden Manor","The King's Head Inn, Aylesbury","Long Crendon Courthouse","Pitstone Windmill","Princes Risborough Manor House","Stowe Gardens","Waddesdon Manor","West Wycombe Park","West Wycombe Village"],"country":"England"},{"name":"Cambridgeshire","places":["Anglesey Abbey, Garden & Lode Mill","Houghton Mill","Peckover House & Garden","Ramsey Abbey Gatehouse","Wicken Fen","Wimpole Hall","Wimpole Home Farm"],"country":"England"},{"name":"Cheshire","places":["Alderley Edge","Dunham Massey","Helsby Hill","Hare Hill","Little Moreton Hall","Lyme Park","Nether Alderley Mill","Quarry Bank Mill and Styal Estate","Tatton Park"],"country":"England"},{"name":"Cornwall","places":["Antony House","Boscastle","Botallack Mine","Cadsonbury","Carnewas & Bedruthan Steps","Cornish Mines & Engines","Cotehele","Glendurgan Garden","Godolphin Estate","Godrevy","Hawker's Hut","Kynance Cove","Lanhydrock House","Lawrence House","Levant Mine & Beam Engine","Penrose, Cornwall","Sandymouth Beach","St Anthony Head","St Michael's Mount","Tintagel Old Post Office","Trelissick Garden","Trengwainton Garden","Trerice","Wheal Coates"],"country":"England"},{"name":"County Durham","places":["Crook Hall"],"country":"England"},{"name":"Cumbria","places":["Acorn Bank Garden & Watermill","Aira Force","Allan Bank","Beatrix Potter Gallery","Borrowdale","Bowder Stone","Buttermere and Ennerdale","Cartmel Priory Gatehouse","Cross Keys Inn, Sedbergh","Dalton Castle","Derwent Island House","Fell Foot Park","Gondola, Coniston Water","Grasmere and Great Langdale","Hawkshead and Claife","Hill Top","Keld Chapel, Shap","Old Dungeon Ghyll","Sandscale Haws","Sizergh Castle & Garden","Stagshaw Garden","Tarn Hows","Townend","Ullswater","Wasdale, Eskdale and Duddon","Windermere and Troutbeck","Wordsworth House","Wray Castle"],"country":"England"},{"name":"Derbyshire","places":["Calke Abbey","Duffield Castle","Hardwick Hall","High Peak Estate","Ilam Park","Kedleston Hall","Longshaw Estate","Stainsby Mill","Sudbury Hall","The Old Manor","White Peak Estate","Winster Market House"],"country":"England"},{"name":"Devon","places":["A La Ronde","Arlington Court","Baggy Point","Bolberry Down","Bradley","Branscombe: The Old Bakery, Manor Mill & Forge","Buckland Abbey","Castle Drogo","The Church House","Coleton Fishacre","Compton Castle","Finch Foundry","Greenway","Heddon Valley Shop","Killerton","Knightshayes Court","Loughwood Meeting House","Lundy","Lydford Gorge","Morte Point","The Old Mill, Wembury","Overbeck's","Parke","Plymbridge Woods","Saltram","Shute Barton","Watersmeet House"],"country":"England"},{"name":"Dorset","places":["Badbury Rings","Ballard Down","Brownsea Island","Cerne Giant","Clouds Hill","Corfe Castle","Eggardon Hill","Hambledon Hill","Hardy Monument","Hardy's Cottage","Hod Hill","Kingston Lacy","Lambert's Castle","Lewesdon Hill","Max Gate","Old Harry Rocks","Pilsdon Pen","Portland House","Spyway","Studland Beach","White Mill"],"country":"England"},{"name":"Essex","places":["Bourne Mill","Coggeshall Grange Barn","Danbury Commons and Blakes Wood","Hatfield Forest","Northey Island","Paycocke's","Ray Island","Rayleigh Mount"],"country":"England"},{"name":"Gloucestershire","places":["Ashleworth Tithe Barn","Bibury","Chedworth Roman Villa","Dyrham Park","Hailes Abbey","Haresfield Beacon and Standish Wood","Hidcote Manor Garden","Horton Court","Little Fleece Bookshop","Lodge Park and Sherborne Estate","May Hill (part)","Minchinhampton Common","Newark Park","Snowshill Manor","Westbury Court Garden","Woodchester Park"],"country":"England"},{"name":"Greater Manchester","places":["Castlefield Viaduct","Dunham Massey"],"country":"England"},{"name":"Hampshire","places":["Hinton Ampner","Ludshott Common and Waggoners Wells","Mottisfont Abbey","Sandham Memorial Chapel","Selborne Common","Stockbridge Down","Stockbridge Marsh","The Vyne","West Green House","Winchester City Mill"],"country":"England"},{"name":"Herefordshire","places":["Berrington Hall","Brockhampton Estate","Croft Castle","Cwmmau Farmhouse","The Weir Garden"],"country":"England"},{"name":"Hertfordshire","places":["Ashridge Estate","Shaw's Corner"],"country":"England"},{"name":"Isle of Wight","places":["Bembridge Fort","Bembridge Windmill","Brighstone Shop","Borthwood Copse","Chillerton Down","Mottistone Manor","The Needles","The Needles Batteries","Newtown Old Town Hall","St. Catherine's Oratory","Rosetta Cottage"],"country":"England"},{"name":"Kent","places":["Chartwell","Chiddingstone","Cobham Wood and Mausoleum","Coldrum Long Barrow","Emmetts Garden","Ightham Mote","Knole","Old Soar Manor","Oldbury Camp","One Tree Hill and Bitchet Common","Owletts","Quebec House","Scotney Castle","Sissinghurst Castle Garden","Smallhythe Place","South Foreland Lighthouse","Sprivers Garden","St. John's Jerusalem","Stoneacre","The White Cliffs of Dover","Toys Hill"],"country":"England"},{"name":"Lancashire","places":["Gawthorpe Hall","Rufford Old Hall","Heysham Head"],"country":"England"},{"name":"Leicestershire","places":["Staunton Harold Church","Stoneywell","Ulverscroft Nature Reserve"],"country":"England"},{"name":"Lincolnshire","places":["Belton House","Grantham House","Gunby Hall and Monksthorpe chapel","Sandilands","Tattershall Castle","Woolsthorpe Manor"],"country":"England"},{"name":"Greater London","places":["2 Willow Road","575 Wandsworth Road","Blewcoat School","Carlyle's House","Eastbury Manor House","East Sheen Common","Fenton House","George Inn","Ham House","Lindsey House","Morden Hall Park","Osterley Park","Petts Wood & Hawkwood","Rainham Hall","Red House","Roman Baths, Strand Lane","Selsdon Wood","Sutton House","Watermeads"],"country":"England"},{"name":"Merseyside","places":["Formby","Speke Hall","20 Forthlin Road","251 Menlove Avenue","59 Rodney Street"],"country":"England"},{"name":"Norfolk","places":["Blakeney Point","Blickling Hall","Brancaster","Darrow Wood","Elizabethan House Museum, Great Yarmouth","Felbrigg Hall","Horsey Windpump","Oxburgh Hall","Sheringham Park","St. George's Guildhall, King's Lynn"],"country":"England"},{"name":"Northamptonshire","places":["Canons Ashby House","Lyveden New Bield","Priest's House, Easton on the Hill"],"country":"England"},{"name":"Northumberland","places":["Allen Banks & Staward Gorge","Cherryburn","Cragside","Dunstanburgh Castle","Farne Islands","George Stephenson's Birthplace","Hadrian's Wall and Housesteads Roman Fort","Lindisfarne Castle","Northumberland Coast (25.75 km)","Ros Castle","St Cuthbert's Cave","Seaton Delaval Hall","Wallington Hall"],"country":"England"},{"name":"Nottinghamshire","places":["Clumber Park","Mr. Straw's House","The Workhouse, Southwell"],"country":"England"},{"name":"Oxfordshire","places":["Buscot Park","Chastleton House","Great Coxwell Barn","Greys Court","Lock Cottage, Buscot","Nuffield Place","Priory Cottages","Uffington White Horse"],"country":"England"},{"name":"Shropshire","places":["Attingham Park","Benthall Hall","Carding Mill Valley","Cronkhill","Dudmaston Hall","Morville Hall","Sunnycroft","Town Walls Tower, Shrewsbury","Wilderhope Manor"],"country":"England"},{"name":"Somerset","places":["Barrington Court","Bath Assembly Rooms","Brean Down","Brean Down Fort","Burrow Mump","Cadbury Camp","Cheddar Gorge","Clevedon Court","Coleridge Cottage","Crook Peak to Shute Shelve Hill","Dolebury Warren","Dunster Castle","Dunster Working Watermill","Ebbor Gorge","Fyne Court","Glastonbury Tor","Holnicote Estate","King Alfred's Tower","King John's Hunting Lodge","Leigh Woods","Lytes Cary Manor","Montacute House","The Priest's House, Muchelney","Prior Park Landscape Garden","Sand Point","Solsbury Hill","Stembridge Tower Mill","Stoke sub Hamdon Priory","Tintinhull Garden","Treasurer's House, Martock","Tyntesfield","Walton and Ivythorn Hills","Wellington Monument","West Pennard Court Barn","Yarn Market, Dunster"],"country":"England"},{"name":"Staffordshire","places":["Biddulph Grange","Downs Banks","Kinver Edge","Kinver Edge Hillfort","Kinver Rock Houses","Letocetum","Mow Cop Castle","Moseley Old Hall","South Peak Estate","Shugborough Hall"],"country":"England"},{"name":"Suffolk","places":["Angel Corner, Bury St Edmunds","Bridge Cottage, Flatford","Dunwich Heath","Ickworth House","Lavenham Guildhall","Melford Hall","Orford Ness","Theatre Royal, Bury St Edmunds","Sutton Hoo","Thorington Hall"],"country":"England"},{"name":"Surrey","places":["Abinger Roughs and Netley Park","Bookham Commons","Box Hill","Clandon House (largely destroyed by fire)","Claremont Landscape Garden","Dapdune Wharf","Hatchlands Park","Hindhead Common","The Homewood","Hydon's Ball","Leith Hill","Oakhurst Cottage","Polesden Lacey","Reigate Hill and Gatton Park","River Wey and Godalming Navigations","Runnymede","Shalford Mill","Winkworth Arboretum","The Witley Centre"],"country":"England"},{"name":"East Sussex","places":["Alfriston Clergy House","Bateman's","Birling Gap","Bodiam Castle","Lamb House","Monk's House","Sheffield Park and Garden","Litlington White Horse"],"country":"England"},{"name":"West Sussex","places":["Cissbury Ring","Devil's Dyke","Harting Down","Lavington Common","Nymans","Petworth House","Standen","Swan Barn Farm","Uppark","Wakehurst Place Garden","Woolbeding Gardens"],"country":"England"},{"name":"Teesside","places":["Ormesby Hall"],"country":"England"},{"name":"Tyne and Wear","places":["Gibside","Penshaw Monument","Souter Lighthouse","Washington Old Hall"],"country":"England"},{"name":"Warwickshire","places":["Baddesley Clinton","Charlecote Park","Coughton Court","Farnborough Hall","Kinwarton Dovecote","Packwood House","Upton House"],"country":"England"},{"name":"West Midlands","places":["Birmingham Back to Backs","Roundhouse, Birmingham","Wightwick Manor"],"country":"England"},{"name":"Wiltshire","places":["Avebury","Avebury Manor & Garden","Calstone and Cherhill Downs","Cley Hill","The Courts Garden","Figsbury Ring","Great Chalfield Manor","Heelis","Lacock Abbey, Fox Talbot Museum","Little Clarendon, Dinton","Mompesson House","Pepperbox Hill","Philipps House and Dinton Park","Piggledene","Stonehenge Landscape","Stourhead","The Coombes","Westwood Manor","White Barrow"],"country":"England"},{"name":"Worcestershire","places":["Bredon Barn","Croome Park","The Firs (Elgar Birthplace Museum)","The Fleece Inn","The Greyfriars","Hanbury Hall","Hawford Dovecote","Knowles Mill, Bewdley","Middle Littleton Tythe Barn","Rosedene, Chartist cottage","Wichenford Dovecote"],"country":"England"},{"name":"East Riding of Yorkshire","places":["Maister House, Hull"],"country":"England"},{"name":"North Yorkshire","places":["Beningbrough Hall and gardens","Braithwaite Hall","Bridestones, Crosscliff and Blakey Topping","Brimham Rocks","Fountains Abbey and Studley Royal Water Garden","Goddards House and Garden","Malham Tarn Estate","Middlethorpe Hall","Moulton Hall","Mount Grace Priory","Nunnington Hall","Ormesby Hall","Rievaulx Terrace & Temples","Robin Hood's Bay, Old Coastguard Station","Roseberry Topping","Treasurer's House, York","Upper Wharfedale","Yorkshire Coast"],"country":"England"},{"name":"South Yorkshire","places":["Wentworth Castle Gardens"],"country":"England"},{"name":"West Yorkshire","places":["East Riddlesden Hall","Hardcastle Crags","Longshaw Estate","Marsden Moor Estate","Nostell Priory"],"country":"England"},{"name":"Anglesey","country":"Wales","places":["Plas Newydd","Cemlyn and North Anglesey Coast","Swtan"]},{"name":"Carmarthenshire","country":"Wales","places":["Aberdeunant","Dinefwr Park and Newton House","Dolaucothi Gold Mines","Dolaucothi Estate woodland","Paxton's Tower"]},{"name":"Ceredigion","country":"Wales","places":["Llanerchaeron","Mwnt","Penbryn"]},{"name":"Conwy","country":"Wales","places":["Aberconwy House","Bodnant Garden","Bodysgallen Hall","Conwy Suspension Bridge","Tŷ Mawr Wybrnant","Ysbyty Ifan"]},{"name":"Gwynedd","country":"Wales","places":["Carneddau and Glyderau","Craflwyn and Beddgelert","Dolmelynllyn Estate","Hafod y Llan","Llanbedrog Beach","Ogwen Cottage","Penrhyn Castle","Plas yn Rhiw","Porth Meudwy","Porth y Swnt","Porthdinllaen","Porthor","Segontium"]},{"name":"Monmouthshire","country":"Wales","places":["Clytha Park","The Kymin","Skenfrith Castle"]},{"name":"Neath Port Talbot","country":"Wales","places":["Aberdulais Tin Works and Waterfall"]},{"name":"Newport","country":"Wales","places":["Tredegar House"]},{"name":"Pembrokeshire","country":"Wales","places":["Cilgerran Castle","Colby Woodland Garden","Marloes Sands and Mere","Martin's Haven","Cleddau Woodlands","Solva Coast","Southwood Estate","Stackpole","St Davids Peninsula and Visitor Centre","Tudor Merchant's House, Tenby"]},{"name":"Powys","country":"Wales","places":["Abergwesyn Common","Powis Castle & Garden","Brecon Beacons"]},{"name":"Swansea","country":"Wales","places":["Rhossili and south Gower coast","Pennard, Pwll Du and Bishopston Valley","Whiteford and North Gower"]},{"name":"Vale of Glamorgan","country":"Wales","places":["Dyffryn Gardens"]},{"name":"Wrexham","country":"Wales","places":["Chirk Castle","Erddig"]}]},
  media: {"types":["Book","Poem","Film","TV","Podcast","Game","Music","Article","Other"],"statuses":["Now","Finished","Want to","Gave up"],"items":[{"type":"Poem","title":"Those Winter Sundays","creator":"Robert Hayden","year":1962,"tags":"poetry, family, memory, love","status":"Finished","review":""},{"type":"TV","title":"Widow's Bay","status":"Finished","highlight":"Best TV show of 2026","review":""},{"type":"Book","title":"Planetes","creator":"Makoto Yukimura","series":"Volume 1","pages":234,"year":1999,"tags":"manga, science fiction","status":"Finished","started":"2026-10-25","finished":"2026-10-26","rating":3.5,"review":"I enjoyed the setting and the genre, but some of the narrative wasn't given time to breathe. Story elements were introduced, established and then concluded quickly, so there was no time to dwell in the depth of the location. Space is endless but the story beats didn't reflect this. Hopefully as the story develops we get more time to empathise with the characters, because the rapid pace meant that I didn't have time to care about the bad things that were happening."},{"type":"Book","title":"Perfume: The Story of a Murderer","creator":"Patrick Süskind","year":1985,"status":"Now","started":"","review":""},{"type":"Book","title":"Cuddy","creator":"Benjamin Myers","pages":438,"year":2023,"tags":"literary, magical realism, emotional, informative, reflective","status":"Finished","finished":"2024-04-19","review":"","rating":4.25},{"type":"Book","title":"The Familiar","creator":"Leigh Bardugo","pages":385,"year":2024,"tags":"fantasy, historical, dark, emotional, mysterious","status":"Finished","finished":"2024-05-06","review":"","rating":2.5},{"type":"Book","title":"Whale Fall","creator":"Elizabeth O'Connor","pages":224,"year":2024,"tags":"historical, literary, emotional, reflective, sad","status":"Finished","finished":"2024-10-01","review":"","rating":3.25},{"type":"Book","title":"Mercia's Take","creator":"Daniel Wiles","pages":198,"year":2022,"tags":"historical, challenging, emotional, reflective","status":"Finished","finished":"2024-04-24","review":"","rating":4.25},{"type":"Book","title":"Piranesi","creator":"Susanna Clarke","pages":245,"year":2020,"tags":"fantasy, literary, adventurous, mysterious, reflective","status":"Finished","finished":"2024-05-16","review":"","rating":4.0},{"type":"Book","title":"Skellig","creator":"David Almond","pages":182,"year":1998,"tags":"fantasy, middle grade, dark, hopeful, mysterious","status":"Finished","finished":"2024-04-04","review":"","rating":4.0,"series":"Skellig #1"},{"type":"Book","title":"Project Hail Mary","creator":"Andy Weir","pages":476,"year":2021,"tags":"science fiction, adventurous, funny, hopeful","status":"Finished","finished":"","review":"","rating":3.75},{"type":"Book","title":"Negative Space","creator":"Gillian Linden","pages":176,"year":2024,"tags":"contemporary, funny, reflective, fast-paced","status":"Finished","finished":"2024-04-22","review":"","rating":3.5},{"type":"Book","title":"The Bear and the Nightingale","creator":"Katherine Arden","pages":322,"year":2017,"tags":"fantasy, historical, literary, adventurous, dark, mysterious","status":"Finished","finished":"2024-03-30","review":"","rating":3.75,"series":"Winternight Trilogy #1"},{"type":"Book","title":"All the Names","creator":"José Saramago","pages":245,"year":1997,"tags":"literary, thriller, reflective, slow-paced","status":"Finished","finished":"2025-01-20","review":""},{"type":"Book","title":"Sacrificial Animals","creator":"Kailee Pedersen","pages":312,"year":2024,"tags":"horror, dark, mysterious, tense, slow-paced","status":"Finished","finished":"2024-09-15","review":"","rating":3.0},{"type":"Book","title":"Watchmen","creator":"Alan Moore","pages":416,"year":1987,"tags":"classics, dystopian, graphic novel, speculative fiction, dark, mysterious, tense","status":"Finished","finished":"","review":"","rating":4.75,"series":"Watchmen #01-12"},{"type":"Book","title":"The Secret History","creator":"Donna Tartt","pages":559,"year":1992,"tags":"literary, mystery, thriller, dark, mysterious, tense, slow-paced","status":"Finished","finished":"2026-07-12","review":"","rating":2.75}]},
  routineLog: [],
  journal: { future: [] },
  routines: [{"id":"morning","name":"Morning","steps":[["Morning pages",15],["Weigh in",1],["Shower",5],["Dress",5],["Empty dishwasher",5],["Make breakfast",5],["Make tea",5],["Make lunch",20],["Wake kids",5]]}],
  sweat: [
    { id: 'w1', date: '2026-10-19', run: 'Easy run, 60 min, 6.4 km (HR 126)', before: 77.8, after: 77.8, garmin: 668, conditions: '12 C, feels like 9 C. Shorts, long sleeve top, cap, buff (off halfway). No drink, food or toilet.',
      result: 'Not usable', note: 'No change on a scale that reads to 0.1 kg. Even in cool weather an hour of running should cost about 0.4-0.7 kg (sweat plus breathing). Check clothing state at each weigh-in and recent drinks. Repeat on the Thursday trail, where the loss will be much bigger.' }
  ],
  garmin: {"rhrBaseline":40,"rhrLatest":40,"rhrAsOf":"2026-10-28","rhrDaily":[["2026-08-15",40],["2026-08-16",40],["2026-08-17",40],["2026-08-18",40],["2026-08-19",40],["2026-08-20",40],["2026-08-21",40],["2026-08-22",39],["2026-08-23",39],["2026-08-24",39],["2026-08-25",38],["2026-08-26",38],["2026-08-27",39],["2026-08-28",39],["2026-08-29",40],["2026-08-30",40],["2026-08-31",40],["2026-09-01",40],["2026-09-02",40],["2026-09-03",40],["2026-09-04",39],["2026-09-05",39],["2026-09-06",39],["2026-09-07",39],["2026-09-08",40],["2026-09-09",40],["2026-09-10",40],["2026-09-11",40],["2026-09-12",39],["2026-09-13",40],["2026-09-14",40],["2026-09-15",41],["2026-09-16",40],["2026-09-17",41],["2026-09-18",41],["2026-09-19",42],["2026-09-20",42],["2026-09-21",43],["2026-09-22",43],["2026-09-23",44],["2026-09-24",44],["2026-09-25",43],["2026-09-26",44],["2026-09-27",43],["2026-09-28",42],["2026-09-29",42],["2026-09-30",42],["2026-10-01",43],["2026-10-02",42],["2026-10-03",42],["2026-10-04",41],["2026-10-05",41],["2026-10-06",41],["2026-10-07",40],["2026-10-08",40],["2026-10-09",40],["2026-10-10",39],["2026-10-11",40],["2026-10-12",40],["2026-10-13",39],["2026-10-14",39],["2026-10-15",39],["2026-10-23",44],["2026-10-24",37],["2026-10-25",39],["2026-10-27",39],["2026-10-28",40]],"rhrWeekly":[["2024-01-06",48.6],["2024-01-13",47.4],["2024-01-20",46.1],["2024-01-27",44.7],["2024-02-03",44.6],["2024-02-10",44.1],["2024-02-17",44.4],["2024-02-24",44.9],["2024-03-02",45.1],["2024-03-09",46.9],["2024-03-16",47.6],["2024-03-23",48.6],["2024-03-30",47.7],["2024-04-06",45.2],["2024-08-10",47.2],["2024-08-17",42.7],["2024-08-24",42.3],["2024-08-31",41.6],["2024-09-07",41.9],["2024-09-14",42.3],["2024-09-21",44.9],["2024-09-28",41.3],["2024-10-05",42.4],["2024-10-12",45.3],["2024-10-19",44.7],["2024-10-26",44.7],["2024-11-02",44.9],["2024-11-09",44.4],["2024-11-16",43.1],["2024-11-23",44.4],["2024-11-30",43.7],["2024-12-07",44.0],["2024-12-14",43.3],["2024-12-21",43.9],["2024-12-28",46.4],["2025-01-04",45.3],["2025-01-11",44.9],["2025-01-18",43.4],["2025-01-25",43.6],["2025-02-01",44.9],["2025-02-08",45.6],["2025-02-15",45.6],["2025-02-22",48.9],["2025-03-01",46.1],["2025-03-08",44.0],["2025-03-15",43.7],["2025-03-22",42.1],["2025-03-29",42.3],["2025-04-05",41.9],["2025-04-12",41.7],["2025-04-19",42.0],["2025-04-26",41.0],["2025-05-03",41.1],["2025-05-10",41.0],["2025-05-17",41.0],["2025-05-24",41.1],["2025-05-31",43.1],["2025-06-07",40.7],["2025-06-14",41.0],["2025-06-21",41.0],["2025-06-28",40.9],["2025-07-05",41.0],["2025-07-12",43.0],["2025-07-19",43.4],["2025-07-26",43.3],["2025-08-02",43.3],["2025-08-09",42.6],["2025-08-16",42.1],["2025-08-23",41.3],["2025-08-30",40.7],["2025-09-06",41.4],["2025-09-13",41.3],["2025-09-20",41.9],["2025-09-27",41.7],["2025-10-04",44.1],["2025-10-11",44.1],["2025-10-18",44.3],["2025-10-25",45.5],["2025-11-01",44.7],["2025-11-08",43.0],["2025-11-15",42.9],["2025-11-22",43.0],["2025-11-29",49.1],["2025-12-06",45.7],["2025-12-13",45.6],["2025-12-20",42.7],["2025-12-27",42.4],["2026-01-03",42.6],["2026-01-10",45.7],["2026-01-17",46.0],["2026-01-24",45.3],["2026-01-31",44.7],["2026-02-07",43.0],["2026-02-14",41.9],["2026-02-21",41.9],["2026-02-28",41.9],["2026-03-07",40.7],["2026-03-14",42.1],["2026-03-21",43.0],["2026-03-28",42.3],["2026-04-04",43.7],["2026-04-11",42.4],["2026-04-18",40.9],["2026-04-25",42.1],["2026-05-02",42.0],["2026-05-09",43.0],["2026-05-16",43.6],["2026-05-23",43.6],["2026-05-30",43.7],["2026-06-06",41.0],["2026-06-13",40.0],["2026-06-20",40.3],["2026-06-27",41.0],["2026-07-04",40.7],["2026-07-11",38.9],["2026-07-18",40.1],["2026-07-25",41.1],["2026-08-01",41.4],["2026-08-08",40.9],["2026-08-15",40.0],["2026-08-22",38.7],["2026-08-29",39.9],["2026-09-05",39.6],["2026-09-12",40.3],["2026-09-19",43.0],["2026-09-26",42.6],["2026-10-03",40.7],["2026-10-10",39.3]],"vo2Monthly":[["2020-02",48.0],["2020-03",46.5],["2020-04",44.4],["2020-05",43.5],["2020-06",44.0],["2020-07",45.0],["2020-12",50.5],["2021-01",49.5],["2021-06",48.5],["2021-07",47.2],["2021-08",47.0],["2021-09",47.0],["2021-10",47.0],["2022-01",50.0],["2022-06",49.1],["2022-07",49.4],["2022-08",50.0],["2022-10",51.0],["2022-12",50.0],["2023-02",49.0],["2023-03",49.3],["2023-04",49.0],["2023-05",50.1],["2023-06",52.0],["2023-07",52.0],["2023-08",51.2],["2023-09",50.4],["2023-10",50.0],["2023-11",49.3],["2023-12",49.0],["2024-02",49.0],["2024-03",48.0],["2024-04",48.2],["2024-08",49.0],["2024-09",49.0],["2024-10",48.5],["2024-11",48.0],["2024-12",47.8],["2025-01",48.0],["2025-02",48.6],["2025-03",48.7],["2025-04",51.3],["2025-05",52.3],["2025-06",50.3],["2025-07",49.0],["2025-08",48.0],["2025-09",48.0],["2025-10",47.6],["2025-11",48.0],["2025-12",47.3],["2026-01",47.0],["2026-02",47.0],["2026-03",47.2],["2026-04",48.0],["2026-05",48.0],["2026-06",48.0],["2026-07",48.0],["2026-08",48.0],["2026-09",48.0],["2026-10",48.7]],"vo2Block":[["2026-09-05",48.0],["2026-09-07",48.0],["2026-09-09",48.0],["2026-09-12",48.0],["2026-09-13",48.0],["2026-09-14",48.0],["2026-09-19",48.0],["2026-09-26",48.0],["2026-09-30",48.0],["2026-10-03",48.0],["2026-10-05",48.0],["2026-10-07",49.0],["2026-10-10",49.0],["2026-10-11",49.0],["2026-10-14",49.0]],"vo2Peak":{"value":54,"date":"2025-04-26"},"maxHrMonitorPeak":196},
  block: { start: '2026-09-01', name: 'Phase 1: base building' },
  profile: {
    name: 'Philip Coote', location: 'Bath, UK', phase: 'Phase 1 (Base Building)',
    longDay: 'Saturday = long/tempo day',
    week: 'Sat / Sun / Mon / Tue (rest) / Wed / Thu (rest) / Fri (yoga)',
    maxHr: 201, maxHrNote: 'activity peak at the Redcar 5K PB, 19 Apr 2025. Garmin all-day monitoring peaked at 196 (19 Apr and 17 Aug 2025). Likely range 196 to 201, to be reviewed as new data comes in', restHr: 40, restHrNote: 'Garmin daily resting HR, median 40 from mid Aug to 15 Oct 2026 (39 this week). Lowest ever 37 (Sep 2022)',
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
    run('2026-10-07', '19:17', 'Repeats', 9.23, '1:05:05', 135, 163, '1k repeats: 4:18, 4:12, 4:12, 4:10/km. 1 min recovery. Garmin PR: fastest 1 km 4:08.9 (beaten on 14 Oct)', '', TOR,
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
      '1k repeats: 4:04, 4:03, 4:05, 3:58/km. 1 min recovery. Garmin PRs: fastest 1 km 3:56.9 and fastest mile 6:59.7', 'Reps 3-4 HR (avg 145 and 150) looks low for pace, possible strap issue. The 184 max was in the first recovery lap (avg 174), not a rep', TOR,
      { title: '1k repeats', asc: 101, cal: 719, sweat: 763, cad: 154, stride: 0.92, moving: '1:04:15', best: '3:38', zones: Z('0:13', '37:12', '17:23', '3:07', '6:45'), laps: [
        lap('Warm up', '21:28', 2.49, '8:37', 130, 160, 147), lap('Rep 1', '4:04.3', 1.00, '4:04', 155, 177, 182), lap('Recovery', '1:00', 0.10, '10:26', 174, 184, 133),
        lap('Rep 2', '4:02.9', 1.00, '4:03', 164, 173, 179), lap('Recovery', '1:00', 0.10, '9:44', 161, 174, 128), lap('Rep 3', '4:05.1', 1.00, '4:05', 145, 155, 181),
        lap('Recovery', '1:00', 0.11, '8:43', 151, 155, 131), lap('Rep 4', '3:58.4', 1.00, '3:58', 150, 157, 180), lap('Recovery', '1:00', 0.10, '10:30', 148, 158, 136),
        lap('Cool down', '23:11', 2.56, '9:04', 119, 130, 144)] }),
    run('2026-10-17', '11:01', 'Tempo', 8.35, '54:17', 138, 177,
      'Z4 tempo, 2 x 10 min (out and back): 4:30/km at HR 158, then 4:34/km at HR 166. Benchmarks at similar HR: 5:09/km at 157 (12 Sep), 5:44/km at 154 (10 Oct)',
      'Second 10 min ran above the 155-159 target (avg 166). Garmin titled it "Long run"', TOR,
      { title: 'Long run', asc: 56, cal: 635, sweat: 659, cad: 156, stride: 0.97, moving: '54:00', best: '3:56', zones: Z('0:38', '30:47', '4:45', '3:20', '14:46'), laps: [
        lap('Warm up', '16:43', 2.00, '8:21', 124, 139, 151), lap('Out', '10:00', 2.22, '4:30', 158, 168, 175), lap('Back', '10:00', 2.19, '4:34', 166, 177, 182),
        lap('Cool down', '17:34', 1.93, '9:05', 123, 175, 134)] }),
    run('2026-10-18', '07:46', 'Recovery', 6.01, '53:38', 120, 146,
      'Pure recovery after the Saturday tempo. Avg HR 120 (target under 125), but 8:55/km at HR 120 is slower and higher than the 11 Oct recovery (8:17/km at HR 112), so some fatigue from Saturday', '', TOR,
      { title: 'Recovery', asc: 52, cal: 476, sweat: 569, cad: 152, stride: 0.74, moving: '53:24', best: '7:34', zones: Z('0:47', '48:32', '3:56', '', '') }),
    run('2026-10-19', '19:08', 'Easy', 6.44, '1:00:02', 126, 143,
      'Planned steady high Z2, 8-9 km. Ran 6.4 km at 9:19/km, avg HR 126. Same HR as the 5 Oct easy run (127) but about 2 min/km slower, so still carrying fatigue from the Saturday tempo. 12 C (feels like 9 C)',
      'Sweat test run: weight 77.8 kg before and after, which is not a usable result (see Gear & fuel)', TOR,
      { title: 'Easy', asc: 79, cal: 593, sweat: 668, cad: 144, stride: 0.75, moving: '59:58', best: '4:34', zones: Z('0:24', '50:06', '9:16', '', '') }),
    run('2026-10-22', '10:53', 'Trail', 20.46, '2:59:04', 133, 161,
      'Weary traveller statue run, an event in itself rather than a session to judge against the current block. Shortened from the planned 27.3 km to get back in the allotted time. 20.46 km in 2:59 with 543 m of climbing. Felt really good and could have kept going. Avg HR 133 (right on the Z2/Z3 boundary), 52% of the time in Z3 on the climbs and 43% in Z2, only 0:11 in Z5. Walking was mainly the hills and junctions to check the route (moving pace 8:25/km, cadence 139 spm). Longest run since the 16 Aug half marathon. Recovery HR 14. Fuel: 3 x 500 ml drinks (1.5 L), 3 gels and 3 bars, all homemade, with the corrected sodium amounts. That is about 210 g carbs (70 g an hour) and 960 kcal, against Garmin 1,845 kcal burned. Sodium about 450-500 mg an hour (drinks 305 mg each, gels 101 mg each, bars roughly 50-100 mg each). Fluid 1.5 L against a Garmin sweat estimate of 2.1 L',
      'Distance 20.46 km, not the planned 27.3 km. No before and after weights, so no sweat test', TOR,
      { title: 'Running', asc: 543, cal: 1845, sweat: 2104, cad: 139, stride: 0.82, moving: '2:52:17', best: '5:17', zones: Z('5:14', '1:18:29', '1:34:14', '0:56', '0:11') }),
    run('2026-10-24', '09:02', 'Parkrun', 4.87, '23:27', 145, 164,
      'Planned 5K parkrun at Z4 (155-159 bpm), half term week away from Bath. GPS 4.87 km in 23:27, 4:49/km (4:46 moving), steady pace throughout. HR climbed from about 110 to the 150s in the first 8 min, then held 150-165: 44% of the time in Z4/Z5 (6:23 and 4:04), max 164 so a little above the Z4 ceiling. Cadence 180. About 20 s/km faster than the plan benchmark (5:09/km at HR 157 on 12 Sep) but slower than the 17 Oct tempo at a similar HR (4:30 at 158, 4:34 at 166), which fits a tired Saturday after the 3 h trail run on Thursday and resting HR 44 on Friday',
      'GPS short of 5 km, official parkrun time not recorded. Resting HR this morning not recorded', TOR,
      { title: 'Running', loc: 'Harrogate', asc: 59, cal: 332, sweat: 299, cad: 180, stride: 1.15, moving: '23:11', best: '3:49', zones: Z('0:42', '5:05', '7:01', '6:23', '4:04') }),
    run('2026-10-25', '08:28', 'Recovery', 5.39, '40:01', 116, 126,
      'Pure recovery run, done instead of the planned rest day after resting HR 39 and body battery 100%. Avg HR 116 and max 126, 98% of the time in Z2. 7:26/km at HR 116 is much better than the last two recoveries (8:17/km at HR 112 on 11 Oct, 8:55/km at HR 120 on 18 Oct), so the tiredness from Thursday and Saturday is clearing',
      '', TOR,
      { title: 'Running', loc: 'Redcar and Cleveland', asc: 21, cal: 390, sweat: 411, cad: 167, stride: 0.81, moving: '40:01', best: '6:40', zones: Z('0:41', '39:20', '', '', '') }),
    run('2026-10-27', '08:58', 'Easy', 8.78, '1:00:01', 124, 137,
      'Planned easy run to keep Wednesday\'s intervals fresh. 8.78 km at 6:50/km, avg HR 124 (98% in Z2, 33 s in Z3), max 137, recovery HR 25. Flat Redcar route (13 m of climbing), so not directly comparable with the hillier Bath easy runs: 7:18/km at HR 127 on 5 Oct and 9:19/km at HR 126 on 19 Oct. Speed per heartbeat about 1.18, back at the marathon-block level of 1.18-1.20',
      '', TOR,
      { title: 'Running', loc: 'Redcar and Cleveland', asc: 13, cal: 652, sweat: 659, cad: 170, stride: 0.86, moving: '1:00:01', best: '5:49', zones: Z('0:29', '58:59', '0:33', '', '') })
  ],
  goals: [
    { id: 'g1', event: 'Half marathon', distKm: 21.0975, race: 'Great Bristol Run', date: '2027-05-09', target: '1:45:00', notes: '' },
    { id: 'g2', event: '10K', distKm: 10, race: 'Bath Two Tunnels', date: '2027-08-15', target: '45:00', notes: '' },
    { id: 'g3', event: '5K', distKm: 5, race: 'Redcar parkrun', date: '2027-09-26', target: '21:00', notes: '' }
  ],
  pbs: [
    { id: 'p1', event: '5K parkrun', place: 'Redcar', time: '21:06', when: 'Apr 2025', notes: 'Garmin record 21:06.5 on 19 Apr 2025, avg HR 179 / max 201, effort 9/10' },
    { id: 'p2', event: 'Half marathon', place: 'Bristol', time: '1:46:50', when: 'May 2025', notes: 'Great Bristol Run, 11 May. Garmin: 21.10 km, avg HR 180 / max 196' },
    { id: 'p3', event: '10K', place: '', time: '46:46', when: '12 May 2019', notes: 'True 10K PB (Garmin record, no HR data)' },
    { id: 'p5', event: '10K (best on Garmin)', place: 'Bath', time: '46:58', when: '7 Jun 2026', notes: 'Second-fastest overall. Avg HR 174 / max 190. Garmin summary edited: laps total 9.63 km vs 10.00 km' },
    { id: 'p6', event: '1 km (fastest)', place: 'Bath', time: '3:56.9', when: '14 Oct 2026', notes: 'Garmin PR during the 1k repeats. Previous best 4:08.9 on 7 Oct 2026' },
    { id: 'p7', event: '1 mile (fastest)', place: 'Bath', time: '6:59.7', when: '14 Oct 2026', notes: 'Garmin PR, same session' },
    { id: 'p8', event: 'Marathon', place: 'Bath', time: '4:41:04', when: '18 Aug 2024', notes: 'Road, 42.64 km at 6:35/km' },
    { id: 'p9', event: 'Longest run', place: 'Redcar and Cleveland', time: '5:26:24', when: '12 Apr 2026', notes: 'Trail marathon, 45.28 km, 804 m ascent, avg HR 153' },
    { id: 'p4', event: 'Half marathon (not a PB)', place: 'Bath', time: '2:11:33', when: '16 Aug 2026', notes: '22.11 km, avg 5:57/km, avg HR 159. Ultra block' }
  ],
  plan: [
    { id: 's1', date: '2026-10-17', session: 'Zone 4 tempo, 20 min', details: 'Z4 (155-159 bpm). Out and back: 10 min out, 10 min back', fuel: "Before: breakfast 2 h before. During: nothing. After: protein." },
    { id: 's2', date: '2026-10-18', session: 'Recovery run', details: '5-6 km, pure recovery (HR under 125)', fuel: "None." },
    { id: 's3', date: '2026-10-19', session: 'Steady, high Z2', details: 'HR about 125-134. 8-9 km', fuel: "None during. Sweat test: weigh before and after, no drinking. Snack 2 h before if it is an evening run." },
    { id: 's4', date: '2026-10-20', session: 'Rest', details: '', fuel: "Normal meals, carbs at dinner." },
        { id: 's5', date: '2026-10-21', session: 'Rest', details: 'Pyramid skipped to save energy for Thursday', fuel: "Normal meals, extra carbs at dinner ahead of Thursday." },
            { id: 's6', date: '2026-10-22', km: 27.3, session: 'Trail run / hike', details: '3:08 h, 27.3 km, 430 m ascent. Day off work. Take it easy, Z2 (about 6:53/km average)', fuel: "Before: big carb breakfast 2-3 h before. During: 1 gel + 1 drink + 1 homemade bar every hour from about 40 min (about 70 g carbs an hour). Water as well. After: carbs + protein." },
    { id: 's7', date: '2026-10-23', session: 'Rest or yoga', details: '', fuel: "None." },
    { id: 's8', date: '2026-10-24', session: '5K parkrun, Z4', details: 'Z4 (155-159 bpm). Half term week', fuel: "Before: breakfast 2 h before. During: nothing. After: protein." },
    { id: 's9', date: '2026-10-25', session: 'Recovery run', details: 'Planned as a rest day. Ran 5.4 km at HR 116 instead, pure recovery. Half term', fuel: "None. Add carbs at lunch and dinner." },
    { id: 's10', date: '2026-10-26', session: 'Rest', details: 'Second rest day. The 5K at Z3 moves to a later week. Half term', fuel: "Normal meals, add carbs at lunch and dinner." },
    { id: 's11', date: '2026-10-27', session: 'Easy run', details: 'Low Z2, keeps Wednesday\'s intervals fresh. Half term', fuel: "None." },
    { id: 's12', date: '2026-10-28', session: 'Intervals: 5 x 1 km', details: 'About 4:00-4:05/km, 1 min jog recovery. 15-20 min warm-up, 10 min cool-down. Check the HR strap first', fuel: "Before: carb snack 2 h before. During: nothing. After: protein." },
    { id: 's13', date: '2026-10-29', session: 'Recovery run', details: 'Half term', fuel: "None." },
    { id: 's14', date: '2026-10-30', session: 'Easy run', details: 'Easy Z2, keeps Saturday fresh. Half term', fuel: "None." }
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
    { id: 'h2', name: 'Altra Torin 9', status: 'In use', km: 163.5, asOf: '2026-10-27', notes: 'In use since 11 Sep. Garmin: 21 activities, 163.5 km at 27 Oct (Garmin limit 1,000). Includes a 6.61 km walk on 11 Oct that is not logged as a run' },
    { id: 'h5', name: 'Vivobarefoot Primus Lite', status: 'Earlier', km: 527, asOf: '2026-10-14', notes: 'Garmin: 45 activities, 527.0 of 1,200 km, first use 12 Jan 2025. Worn for the 2025 PBs' },
    { id: 'h3', name: 'Altra Olympus 7', status: 'Considered', km: null, asOf: '', notes: 'Not chosen' },
    { id: 'h4', name: 'Altra Timp 6', status: 'Considered', km: null, asOf: '', notes: 'Not chosen' }
  ],
  supplements: [{"name":"Vitamin B12","dose":"100 µg","when":"Daily or a few times a week, with any meal","why":"Insurance for a mostly plant-based diet. The diet estimate (about 2.5 µg a day) already meets the 1.5 µg target, so this is a top-up","start":"2026-10-23","note":"No known harm at this dose, and the body absorbs only a small part of a large dose. A blood test is the only way to know your status"},{"name":"Vitamin D","dose":"25 µg (1,000 IU)","when":"Daily with the biggest meal, October to March","why":"Food gives only about 3 µg a day and UK sunlight cannot make enough in winter. UK advice is 10 µg a day from October to March","start":"2026-10-23","note":"Upper safe limit is 100 µg a day. Review in spring"}],
  fuelRecipes: [
    {
      name: 'Homemade energy bar', per: 'Makes one bar', targets: '130 kcal, 20 g carbs, 3 g protein, moderate sodium',
      ingredients: ['10 g rolled oats', '5 g pea protein powder', '5 g fructose', '8 g glucose syrup', '4 g chopped raisins or dates', '2 g mixed seeds (pumpkin, chia, sesame)', 'Pinch of salt, or 0.2 g sodium citrate', 'Rapeseed oil (amount not in the original recipe)', 'Optional: a few drops of lime or rhubarb flavouring', 'Optional: pinch of nutritional yeast flakes (for B12)'],
      method: ['Mix the oats, protein, fructose, seeds, nutritional yeast and salt (or sodium citrate).', 'Warm the glucose syrup slightly, then mix in the dried fruit, flavouring drops and rapeseed oil.', 'Cook at 150 C for 15 minutes.'],
      notes: 'Multiply the amounts by the number of bars you are making. Sodium: 0.2 g of sodium citrate is only about 47 mg, a pinch of table salt (about 0.25 g) is about 100 mg. Check: protein works out nearer 6 g than 3 g. The rapeseed oil has no amount, so note what you use next time (about 9 kcal per g).'
    },
    {
      name: 'Homemade energy gel', per: 'Makes one gel', targets: '100 kcal, 25 g carbs, 100 mg sodium',
      ingredients: ['0.2 g gellan gum (high acyl)', '15 g glucose syrup', '7 g maltodextrin', '3 g fructose', '0.43 g sodium citrate (corrected from 0.2 g)', 'A few drops of lime or rhubarb flavouring', 'Optional: 1 tbsp water to adjust the consistency'],
      method: ['Mix everything to a smooth, gel-like consistency.', 'Store in a soft flask or reusable gel pouch.'],
      notes: 'Carbs add up to 25 g. Sodium corrected: sodium citrate (trisodium citrate dihydrate) is about 23.5% sodium, so 0.43 g gives 100 mg. The original 0.2 g gave only about 47 mg. Check your pack: if it says anhydrous (about 26.7% sodium), use 0.37 g.'
    },
    {
      name: 'Homemade endurance drink', per: '500 ml bottle', targets: '90 kcal, 25 g carbs, 300 mg sodium, optional 100 mg potassium',
      ingredients: ['15 g maltodextrin', '5 g fructose', '5 g dextrose', '1.3 g sodium citrate (corrected from 0.25 g)', '0.1 g citric acid (tartness, helps absorption)', '1 g beetroot powder', 'Optional: potassium chloride for about 100 mg potassium (not needed, see the note)'],
      method: ['Mix the powders first, then dissolve in 500 ml of water.', 'Shake until completely dissolved.'],
      notes: 'Carbs add up to 25 g. Sodium corrected: 1.3 g of sodium citrate gives 305 mg (the original 0.25 g gave only about 59 mg). Table salt is a simpler source: 0.77 g gives 300 mg. Potassium and other electrolytes are not needed for runs of a few hours: sweat is mostly sodium and chloride, and food covers potassium. The beetroot powder adds a little potassium anyway.'
    },
    {
      name: 'Race day gel', per: 'Makes one gel', targets: '110 kcal, 30 g carbs, about 120 mg sodium',
      ingredients: ['0.2 g gellan gum (high acyl)', '18 g glucose syrup (up from 15 g)', '9 g maltodextrin (up from 7 g)', '3 g fructose (same)', '0.5 g sodium citrate (corrected from 0.25 g)', 'Lime or rhubarb flavouring drops', '1 tbsp water if needed'],
      method: ['Mix everything to a smooth, gel-like consistency.', 'Store in a soft flask or reusable gel pouch.'],
      notes: 'Race intake: 2 gels an hour is 60 g carbs and 240 mg sodium. Sodium corrected: 0.5 g of sodium citrate gives about 117 mg a gel (the original 0.25 g gave only about 59 mg).'
    },
    {
      name: 'Race day endurance drink', per: '500 ml bottle', targets: '100 kcal, 30 g carbs, about 400 mg sodium',
      ingredients: ['18 g maltodextrin (up from 15 g)', '6 g fructose (up from 5 g)', '6 g dextrose (up from 5 g)', '1.7 g sodium citrate (corrected from 0.35 g)', '0.1 g citric acid', '1 g beetroot powder'],
      method: ['Mix the powders first, then dissolve in 500 ml of water.', 'Shake until completely dissolved.'],
      notes: 'Race intake: 1 bottle an hour is 30 g carbs and 400 mg sodium. Sodium corrected: 1.7 g of sodium citrate gives about 399 mg (the original 0.35 g gave only about 82 mg). Table salt alternative: about 1 g.'
    }
  ],
  nutrition: [
    { id: 'n1', item: 'Training gel (per gel)', use: 'Training', kcal: 100, carbs: 25, sodium: 100, notes: '' },
    { id: 'n2', item: 'Race gel (per gel)', use: 'Race', kcal: 110, carbs: 30, sodium: 120, notes: 'Planned 2/hr = 60 g carbs, 240 mg sodium' },
    { id: 'n3', item: 'Endurance drink, 500 ml', use: 'Training', kcal: 90, carbs: 25, sodium: 300, notes: '' },
    { id: 'n4', item: 'Race endurance drink, 500 ml', use: 'Race', kcal: 100, carbs: 30, sodium: 400, notes: 'Planned 1/hr' },
    { id: 'n6', item: 'Homemade energy bar (per bar)', use: 'Training', kcal: 130, carbs: 20, sodium: null, notes: 'Oats, pea protein, fructose, glucose syrup, dates, seeds, salt. Protein is nearer 6 g than 3 g by my count. Rapeseed oil is in the method but not the ingredients (about 9 kcal per g). Sodium depends on the pinch of salt, roughly 50-150 mg' },
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
    { id: 'c10', note: 'HR zones: with resting HR 40 and max about 198, %HR-reserve zones would be about Z1 119-134, Z2 135-150, Z3 151-166, Z4 167-182, Z5 183-198. Race HRs (10K 174, HM 180, 5K 179) fall in that Z4, so the current Garmin zones (Z5 from 160) read about one zone low. Not changed yet, to decide together.' },
    { id: 'c7', note: 'Garmin "best pace" values (e.g. 2:08/km on 3 Oct trail run) are GPS artefacts, ignore them' }
  ]
};
