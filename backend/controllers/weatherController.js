const axios = require('axios');
const { formatCurrentWeather, formatForecast } = require('../utils/weatherFormatter');

const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Validates unit parameter
 * @param {String} unit 
 * @returns {String} 'metric' or 'imperial'
 */
const sanitizeUnit = (unit) => {
  if (unit && unit.toLowerCase() === 'imperial') {
    return 'imperial';
  }
  return 'metric';
};

/**
 * Checks if OpenWeatherMap API key is configured
 * @returns {String|null}
 */
const getApiKey = () => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey || apiKey === 'your_openweathermap_api_key' || apiKey.trim() === '') {
    return null;
  }
  return apiKey.trim();
};

/**
 * Handles OpenWeatherMap API error responses cleanly
 */
const handleApiError = (error, city, res) => {
  if (error.response) {
    const status = error.response.status;
    const errorMsg = error.response.data?.message || '';

    if (status === 404) {
      return res.status(404).json({
        success: false,
        message: `City '${city}' not found. Please check the spelling.`
      });
    }

    if (status === 401) {
      return res.status(502).json({
        success: false,
        message: 'OpenWeatherMap API key is invalid or pending activation. Note: Newly created OpenWeather keys take about 15-60 minutes to activate. Please verify OPENWEATHER_API_KEY in backend/.env'
      });
    }

    if (status === 429) {
      return res.status(429).json({
        success: false,
        message: 'OpenWeatherMap API rate limit reached. Please wait a moment and try again.'
      });
    }

    return res.status(status).json({
      success: false,
      message: errorMsg || 'Unable to fetch weather from provider.'
    });
  }

  // Network / connection timeout errors
  return res.status(503).json({
    success: false,
    message: 'Unable to reach weather service. Please check your internet connection or try again later.'
  });
};

/**
 * @desc    Get current weather for a city
 * @route   GET /api/weather
 * @access  Public
 */
const getCurrentWeather = async (req, res, next) => {
  try {
    const { city, unit } = req.query;

    if (!city || city.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Please enter a city name.'
      });
    }

    const apiKey = getApiKey();
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'OpenWeatherMap API key is not configured. Please add OPENWEATHER_API_KEY to backend/.env'
      });
    }

    const selectedUnit = sanitizeUnit(unit);
    const trimmedCity = city.trim();

    const response = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
      params: {
        q: trimmedCity,
        appid: apiKey,
        units: selectedUnit
      },
      timeout: 8000
    });

    const formattedData = formatCurrentWeather(response.data, selectedUnit);

    return res.status(200).json({
      success: true,
      message: 'Weather fetched successfully',
      data: formattedData
    });
  } catch (error) {
    return handleApiError(error, req.query.city, res);
  }
};

/**
 * @desc    Get 5-day weather forecast for a city
 * @route   GET /api/weather/forecast
 * @access  Public
 */
const getForecast = async (req, res, next) => {
  try {
    const { city, unit } = req.query;

    if (!city || city.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Please enter a city name.'
      });
    }

    const apiKey = getApiKey();
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'OpenWeatherMap API key is not configured. Please add OPENWEATHER_API_KEY to backend/.env'
      });
    }

    const selectedUnit = sanitizeUnit(unit);
    const trimmedCity = city.trim();

    const response = await axios.get(`${OPENWEATHER_BASE_URL}/forecast`, {
      params: {
        q: trimmedCity,
        appid: apiKey,
        units: selectedUnit
      },
      timeout: 8000
    });

    const formattedForecast = formatForecast(response.data, selectedUnit);

    return res.status(200).json({
      success: true,
      message: 'Forecast fetched successfully',
      data: formattedForecast
    });
  } catch (error) {
    return handleApiError(error, req.query.city, res);
  }
};

module.exports = {
  getCurrentWeather,
  getForecast
};
