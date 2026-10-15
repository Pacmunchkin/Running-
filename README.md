# Run Log

A static site for storing and reviewing running data. No build step, no server: open `index.html`.

- **Training:** runs table with search/sort and per-run details; per-run Details (laps, time in HR zones, ascent, cadence, calories, sweat loss); stats, HR-zone badges, weekly mileage chart (weeks run Sat–Fri), next-up sessions
- **Trends:** long-run progression, easy-run efficiency, rep progression (pace and HR), weekly volume by HR zone, weekly training load; each run's details include a pace/HR lap chart
- **Review:** latest training review (updated each Wednesday after the interval session), estimated finish times for the three races, line charts of estimated VO2 max (VDOT) and race pace, block stats (weekly volume, time in HR zones, quality work, easy-run efficiency)
- **Plan & goals:** race goals with target pace and countdown, upcoming schedule, missed/changed sessions
- **Gear & fuel:** shoe mileage, nutrition table
- **Profile:** runner details, HR zones, PBs and prior races, data caveats
- Distances in km; dark theme; sidebar navigation

All data lives in `data.js`, which is updated after each session. The page is read-only: nothing is stored in the browser, and there are no add, edit or delete controls.
