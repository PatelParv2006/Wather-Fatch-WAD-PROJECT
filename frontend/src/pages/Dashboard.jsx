import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Info, Star } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import Forecast from '../components/Forecast';
import Loading from '../components/Loading';

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCity = searchParams.get('city');

  const [city, setCity] = useState(urlCity || 'Ahmedabad');
  const [unit, setUnit] = useState('metric'); // 'metric' (°C) or 'imperial' (°F)
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [favourites, setFavourites] = useState([]);

  // Loading states
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [favActionLoading, setFavActionLoading] = useState(false);

  // Error and Notification states
  const [error, setError] = useState('');
  const [forecastError, setForecastError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { isAuthenticated } = useAuth();

  // Fetch logged-in user's favourites
  const fetchFavourites = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const res = await api.get('/favourites');
      if (res.data && res.data.data) {
        setFavourites(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load favourites:', err);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchFavourites();
  }, [fetchFavourites]);

  // Fetch Current Weather & Forecast
  const fetchWeatherData = useCallback(
    async (targetCity, targetUnit) => {
      if (!targetCity || !targetCity.trim()) return;

      setError('');
      setForecastError('');
      setSuccessMsg('');
      setWeatherLoading(true);
      setForecastLoading(true);

      const queryCity = targetCity.trim();

      // 1. Fetch Current Weather
      try {
        const weatherRes = await api.get('/weather', {
          params: { city: queryCity, unit: targetUnit }
        });
        if (weatherRes.data && weatherRes.data.data) {
          setWeather(weatherRes.data.data);
          setCity(weatherRes.data.data.city); // Normalize city name
        }
      } catch (err) {
        const msg =
          err.response?.data?.message ||
          'Unable to fetch current weather. Please verify the city name.';
        setError(msg);
        setWeather(null);
      } finally {
        setWeatherLoading(false);
      }

      // 2. Fetch 5-Day Forecast
      try {
        const forecastRes = await api.get('/weather/forecast', {
          params: { city: queryCity, unit: targetUnit }
        });
        if (forecastRes.data && forecastRes.data.data) {
          setForecast(forecastRes.data.data);
        }
      } catch (err) {
        const msg =
          err.response?.data?.message ||
          'Forecast data is currently unavailable.';
        setForecastError(msg);
        setForecast(null);
      } finally {
        setForecastLoading(false);
      }
    },
    []
  );

  // Load weather on mount or when URL city param changes
  useEffect(() => {
    const initialCity = urlCity || 'Ahmedabad';
    fetchWeatherData(initialCity, unit);
  }, [urlCity, fetchWeatherData]); // Initial load

  // Handle Search Submission
  const handleSearch = (newCity) => {
    setCity(newCity);
    setSearchParams({ city: newCity });
    fetchWeatherData(newCity, unit);
  };

  // Handle Unit Toggle (°C <-> °F)
  const handleUnitToggle = (newUnit) => {
    if (newUnit === unit) return;
    setUnit(newUnit);
    if (city) {
      fetchWeatherData(city, newUnit);
    }
  };

  // Check if current city is in user's favourites
  const currentFavourite = favourites.find(
    (f) =>
      weather &&
      f.cityName.toLowerCase() === weather.city.toLowerCase()
  );
  const isFavourite = !!currentFavourite;

  // Add or Remove Favourite Toggle
  const handleToggleFavourite = async () => {
    if (!weather) return;
    setFavActionLoading(true);
    setSuccessMsg('');
    setError('');

    try {
      if (isFavourite) {
        // Remove from favourites
        await api.delete(`/favourites/${currentFavourite._id}`);
        setFavourites((prev) => prev.filter((f) => f._id !== currentFavourite._id));
        setSuccessMsg(`${weather.city} removed from your favourites.`);
      } else {
        // Add to favourites
        const payload = {
          cityName: weather.city,
          country: weather.country,
          latitude: weather.coordinates?.lat,
          longitude: weather.coordinates?.lon
        };
        const res = await api.post('/favourites', payload);
        if (res.data && res.data.data) {
          setFavourites((prev) => [res.data.data, ...prev]);
          setSuccessMsg(`${weather.city} added to your favourites.`);
        }
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        'Unable to update favourite city. Please try again.';
      setError(msg);
    } finally {
      setFavActionLoading(false);
    }
  };

  return (
    <div>
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} loading={weatherLoading} />

      {/* Quick Access to Favourites Chips if any */}
      {favourites.length > 0 && (
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Quick Access:
          </span>
          {favourites.map((fav) => (
            <button
              key={fav._id}
              type="button"
              onClick={() => handleSearch(fav.cityName)}
              className="btn btn-secondary"
              style={{
                padding: '4px 10px',
                fontSize: '0.82rem',
                borderRadius: '16px'
              }}
            >
              <Star size={13} fill="var(--accent-primary)" color="var(--accent-primary)" />
              {fav.cityName}
            </button>
          ))}
        </div>
      )}

      {/* Notifications / Alerts */}
      {successMsg && (
        <div className="alert alert-success">
          <CheckCircle2 size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Current Weather Card */}
      {weatherLoading ? (
        <Loading text="Loading current weather..." />
      ) : weather ? (
        <WeatherCard
          weather={weather}
          unit={unit}
          onUnitToggle={handleUnitToggle}
          isFavourite={isFavourite}
          onToggleFavourite={isAuthenticated ? handleToggleFavourite : null}
          favouriteLoading={favActionLoading}
        />
      ) : !error ? (
        <div className="empty-state">
          <Info size={40} className="empty-state-icon" />
          <h3 className="empty-state-title">No Weather Selected</h3>
          <p className="empty-state-desc">
            Search for a city name above to view real-time weather information and a 5-day forecast.
          </p>
        </div>
      ) : null}

      {/* 5-Day Forecast Section */}
      <Forecast
        forecast={forecast}
        loading={forecastLoading}
        error={forecastError}
      />
    </div>
  );
};

export default Dashboard;
