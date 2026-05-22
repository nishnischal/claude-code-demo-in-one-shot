export default function CurrentWeather({ city, temp, wind, condition }) {
  return (
    <div className="current-weather">
      <div className="city">{city}</div>
      <div className="condition">{condition.icon} {condition.label}</div>
      <div className="temp">{temp}°C</div>
      <div className="meta">Wind: {wind} km/h</div>
    </div>
  )
}
