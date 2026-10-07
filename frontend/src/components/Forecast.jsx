import ForecastCard from './ForecastCard';
import Loading from './Loading';

const Forecast = ({ forecast, loading, error }) => {
  return (
    <section className="forecast-section">
      <h3 className="section-title">5-Day Weather Forecast</h3>

      {loading && <Loading text="Loading 5-day forecast..." />}

      {!loading && error && (
        <div className="empty-state" style={{ padding: '24px' }}>
          <p className="empty-state-desc">Forecast data is currently unavailable.</p>
        </div>
      )}

      {!loading && !error && (!forecast || forecast.length === 0) && (
        <div className="empty-state" style={{ padding: '24px' }}>
          <p className="empty-state-desc">No forecast information to display.</p>
        </div>
      )}

      {!loading && !error && forecast && forecast.length > 0 && (
        <div className="forecast-grid">
          {forecast.map((day, idx) => (
            <ForecastCard key={idx} day={day} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Forecast;
