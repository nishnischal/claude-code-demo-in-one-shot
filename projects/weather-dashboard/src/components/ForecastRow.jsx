const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function ForecastRow({ date, high, low, condition }) {
  const d = new Date(date)
  const day = DAY_NAMES[d.getUTCDay()]

  return (
    <div className="forecast-row">
      <span className="day">{day}</span>
      <span className="icon">{condition.icon}</span>
      <span className="temps">
        <span className="high">{high}°</span>
        {' / '}
        <span className="low">{low}°</span>
      </span>
    </div>
  )
}
