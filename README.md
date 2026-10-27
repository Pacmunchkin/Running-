# Run Log

A static site for storing and reviewing running data. No build step, no server: open `index.html`.

- **Home:** an overview card for every other tab (this week, health, gear and fuel, meals, shopping, garden, packing, National Trust)
- **Running:** one page with all the charts at the top (race pace estimates, weekly distance, plan, long runs, efficiency, reps, HR-zone volume, training load, VO2 max, year-by-year and history), then this week and reviews, plan and goals, all runs with per-run details (laps, HR zones, ascent, cadence), history notes and the runner profile
- **Health:** weight, blood pressure, peak flow and resting heart rate
- **Gear & fuel:** shoe mileage, sweat tests, supplements, fuel recipes, nutrition table
- **Meals, Shopping, Garden, Packing, National Trust:** the Quick Roasting Tin meals and a daily nutrition estimate, Sainsbury's spend by category, the 5 x 5 m garden plan, the family packing list with weights, and National Trust places visited
- Distances in km; dark theme; sidebar navigation

All data lives in `data.js`, which is updated after each session. The page is read-only: nothing is stored in the browser, and there are no add, edit or delete controls.
