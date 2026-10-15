# Run Log

A static site for storing and reviewing running data. No build step, no server: open `index.html`.

- **Training:** runs table with search/sort and per-run details (runs are added by editing `data.js`, no in-page form); per-run Details (laps, time in HR zones, ascent, cadence, calories, sweat loss); stats, HR-zone badges, weekly mileage chart (weeks run Sat–Fri), next-up sessions
- **Review:** latest training review (updated each Wednesday after the interval session), estimated finish times for the three races, line charts of estimated VO2 max (VDOT) and race pace, block stats (weekly volume, time in HR zones, quality work, easy-run efficiency)
- **Plan & goals:** race goals with target pace and countdown, upcoming schedule, missed/changed sessions
- **Gear & fuel:** shoe mileage, nutrition table
- **Profile:** runner details, HR zones, PBs and prior races, data caveats
- km / mi toggle (stored internally in km); CSV export/import of runs; full JSON backup/restore

`data.js` holds the starter data (loaded on first open; Profile → Reset to starter data reloads it).
Data lives in the browser's `localStorage`, so use **Backup JSON** regularly. Browsers keep separate data per
browser/profile and per file location, so open the site from the same place each time.
