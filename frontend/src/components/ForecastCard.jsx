import { Droplets } from 'lucide-react';

const ForecastCard = ({ day }) => {
  if (!day) return null;

  return (
    <div className="forecast-card">
      <div className="forecast-day">{day.label}</div>
      <div className="forecast-date">{day.fullDateLabel}</div>

      <img
        src={day.weatherIconUrl}
        alt={day.weatherDescription}
        className="forecast-icon"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://openweathermap.org/img/wn/01d@2x.png';
        }}
      />

      <div className="forecast-desc">{day.weatherDescription}</div>

      <div className="forecast-temps">
        <span className="temp-max">{day.tempMax}{day.tempUnit}</span>
        <span className="temp-min">/ {day.tempMin}{day.tempUnit}</span>
      </div>

      {day.humidity !== undefined && (
        <div className="forecast-humidity">
          <Droplets size={13} color="var(--accent-secondary)" />
          <span>{day.humidity}%</span>
        </div>
      )}
    </div>
  );
};

export default ForecastCard;
