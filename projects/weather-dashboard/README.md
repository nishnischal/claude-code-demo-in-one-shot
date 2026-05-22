# Weather Dashboard

Live weather dashboard built with React + Vite. Fetches current conditions and a 7-day forecast using the free [Open-Meteo API](https://open-meteo.com/) — no API key required.

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite |
| Styling | Plain CSS |
| API | Open-Meteo (free, no key) + Open-Meteo Geocoding |

## Features

- Search any city by name
- Current temperature, wind speed, and weather condition
- 7-day daily forecast with high/low temperatures
- Weather condition icons (emoji-based, no external assets)

## Project structure

```
weather-dashboard/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx       # City search input
│   │   ├── CurrentWeather.jsx  # Current conditions card
│   │   └── ForecastRow.jsx     # Single day in the 7-day forecast
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Running locally

```bash
npm install
npm run dev     # → http://localhost:5173
```

## API used

- **Geocoding**: `https://geocoding-api.open-meteo.com/v1/search?name=<city>`
- **Forecast**: `https://api.open-meteo.com/v1/forecast?latitude=...&longitude=...&current=...&daily=...`

Both endpoints are free, CORS-friendly, and require no authentication.
