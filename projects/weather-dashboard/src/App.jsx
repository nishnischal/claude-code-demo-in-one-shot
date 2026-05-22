import { useState } from 'react'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import ForecastRow from './components/ForecastRow'

const WMO_CODES = {
  0: { label: 'Clear sky', icon: '☀️' },
  1: { label: 'Mainly clear', icon: '🌤️' },
  2: { label: 'Partly cloudy', icon: '⛅' },
  3: { label: 'Overcast', icon: '☁️' },
  45: { label: 'Foggy', icon: '🌫️' },
  48: { label: 'Icy fog', icon: '🌫️' },
  51: { label: 'Light drizzle', icon: '🌦️' },
  61: { label: 'Slight rain', icon: '🌧️' },
  63: { label: 'Moderate rain', icon: '🌧️' },
  65: { label: 'Heavy rain', icon: '🌧️' },
  71: { label: 'Slight snow', icon: '❄️' },
  80: { label: 'Rain showers', icon: '🌦️' },
  95: { label: 'Thunderstorm', icon: '⛈️' },
}

function describeWMO(code) {
  return WMO_CODES[code] ?? { label: 'Unknown', icon: '🌡️' }
}

export default function App() {
  const [weather, setWeather] = useState(null)
  const [cityName, setCityName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSearch(query) {
    setLoading(true)
    setError('')
    setWeather(null)

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
      )
      const geoData = await geoRes.json()
      if (!geoData.results?.length) throw new Error(`City "${query}" not found.`)

      const { latitude, longitude, name, country } = geoData.results[0]
      setCityName(`${name}, ${country}`)

      const forecastRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
        `&current=temperature_2m,wind_speed_10m,weather_code` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
        `&timezone=auto`
      )
      const forecastData = await forecastRes.json()
      setWeather(forecastData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const current = weather?.current
  const daily = weather?.daily

  return (
    <>
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />

      {loading && <p className="loading">Fetching weather…</p>}
      {error && <p className="error">{error}</p>}

      {current && (
        <CurrentWeather
          city={cityName}
          temp={Math.round(current.temperature_2m)}
          wind={Math.round(current.wind_speed_10m)}
          condition={describeWMO(current.weather_code)}
        />
      )}

      {daily && (
        <div className="forecast">
          {daily.time.map((date, i) => (
            <ForecastRow
              key={date}
              date={date}
              high={Math.round(daily.temperature_2m_max[i])}
              low={Math.round(daily.temperature_2m_min[i])}
              condition={describeWMO(daily.weather_code[i])}
            />
          ))}
        </div>
      )}
    </>
  )
}
