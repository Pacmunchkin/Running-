# Run Log

A static site for storing and reviewing running data. No build step, no server: open `index.html`.

- **Training:** log runs (date, type, distance, time, avg/max HR, shoes, notes, data caveats), edit/delete, search, sort; stats, HR-zone badges, weekly mileage chart (weeks run Sat–Fri), next-up sessions
- **Plan & goals:** race goals with target pace and countdown, upcoming schedule, missed/changed sessions
- **Gear & fuel:** shoe mileage, nutrition table
- **Profile:** runner details, HR zones, PBs and prior races, data caveats
- km / mi toggle (stored internally in km); CSV export/import of runs; full JSON backup/restore

`data.js` holds the starter data (loaded on first open; Profile → Reset to starter data reloads it).
Data lives in the browser's `localStorage`, so use **Backup JSON** regularly. Browsers keep separate data per
browser/profile and per file location, so open the site from the same place each time.
