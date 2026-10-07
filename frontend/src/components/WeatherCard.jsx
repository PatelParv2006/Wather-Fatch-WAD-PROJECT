import { Star, MapPin } from 'lucide-react';
import UnitToggle from './UnitToggle';
import WeatherDetails from './WeatherDetails';

const WeatherCard = ({
  weather,
  unit,
  onUnitToggle,
  isFavourite,
  onToggleFavourite,
  favouriteLoading
}) => {
  if (!weather) return null;

  return (
    <div className="card" style={{ marginBottom: '28px' }}>
      {/* Card Header */}
      <div className="weather-card-header">
        <div className="city-title-group">
          <h2>
            <MapPin size={22} style={{ display: 'inline', marginRight: '6px', color: 'var(--accent-primary)', verticalAlign: 'text-bottom' }} />
            {weather.city}{weather.country ? `, ${weather.country}` : ''}
          </h2>
          <span className="city-date-text">
            Current Weather Forecast & Observations
          </span>
        </div>

        <div className="weather-header-actions">
          {/* Unit Switcher */}
          <UnitToggle unit={unit} onToggle={onUnitToggle} />

          {/* Favourite Button */}
          {onToggleFavourite && (
            <button
              type="button"
              onClick={onToggleFavourite}
              disabled={favouriteLoading}
              className={`btn ${isFavourite ? 'btn-danger' : 'btn-outline'}`}
              title={isFavourite ? 'Remove from favourites' : 'Save to favourites'}
            >
              <Star
                size={18}
                fill={isFavourite ? 'currentColor' : 'none'}
                color={isFavourite ? 'var(--error)' : 'var(--accent-primary)'}
              />
              <span>{isFavourite ? 'Favourited' : 'Add to Favourite'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Temperature and Weather Description */}
      <div className="current-weather-main">
        <div className="temp-large-display">
          <img
            src={weather.weatherIconUrl}
            alt={weather.weatherDescription}
            className="weather-condition-icon"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://openweathermap.org/img/wn/01d@2x.png';
            }}
          />
          <div>
            <span className="temp-number">{weather.temperature}</span>
            <span className="temp-unit-symbol">{weather.tempUnit}</span>
          </div>
        </div>

        <div className="weather-desc-group">
          <div className="weather-desc-main">{weather.weatherDescription}</div>
          <div className="weather-temp-range">
            High: {weather.tempMax}{weather.tempUnit} • Low: {weather.tempMin}{weather.tempUnit}
          </div>
        </div>
      </div>

      {/* Detailed Weather Metrics Grid */}
      <WeatherDetails weather={weather} />
    </div>
  );
};

export default WeatherCard;
