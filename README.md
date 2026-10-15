# Run Log

A static site for storing and reviewing running data. No build step, no server: open `index.html`.

- **Training:** runs table with search/sort and per-run details; per-run Details (laps, time in HR zones, ascent, cadence, calories, sweat loss); stats, HR-zone badges, weekly mileage chart (weeks run Sat–Fri), next-up sessions
- **Training:** stats, next sessions, a 50-week plan to the half marathon, 10K and 5K (weekly distance and long-run charts with the dotted plan against actual, phases, week-by-week plan vs actual, checkpoints, principles, race plans), all runs
- **Trends:** long-run progression, easy-run efficiency, rep progression (pace and HR), weekly volume by HR zone, weekly training load; each run's details include a pace/HR lap chart
- **History:** what the Garmin export (2019 to now) says, this block vs the 2025/26 trail-marathon block, monthly distance, easy-run efficiency and race-effort fitness history
- **Review:** latest training review (updated each Wednesday after the interval session), estimated finish times for the three races, line charts of estimated VO2 max (VDOT) and race pace, block stats (weekly volume, time in HR zones, quality work, easy-run efficiency)
- **Plan & goals:** race goals with target pace and countdown, upcoming schedule, missed/changed sessions
- **Gear & fuel:** shoe mileage, nutrition table
- **Profile:** runner details, HR zones, PBs and prior races, data caveats
- Distances in km; dark theme; sidebar navigation

All data lives in `data.js`, which is updated after each session. The page is read-only: nothing is stored in the browser, and there are no add, edit or delete controls.
