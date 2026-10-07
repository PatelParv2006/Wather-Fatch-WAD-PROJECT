/**
 * Formats OpenWeatherMap current weather response into clean frontend data
 * @param {Object} rawData - OpenWeatherMap API response
 * @param {String} unit - 'metric' or 'imperial'
 * @returns {Object} Clean weather object
 */
const formatCurrentWeather = (rawData, unit = 'metric') => {
  const isMetric = unit === 'metric';
  const tempUnit = isMetric ? '°C' : '°F';
  const windUnit = isMetric ? 'm/s' : 'mph';

  const weatherItem = (rawData.weather && rawData.weather[0]) || {};
  const main = rawData.main || {};
  const wind = rawData.wind || {};
  const sys = rawData.sys || {};
  const coord = rawData.coord || {};

  // Format sunrise / sunset into localized time string
  const formatTime = (timestamp, timezoneOffset = 0) => {
    if (!timestamp) return 'N/A';
    // Use UTC + city timezone offset
    const date = new Date((timestamp + timezoneOffset) * 1000);
    return date.toUTCString().slice(17, 22); // "HH:MM"
  };

  const timezone = rawData.timezone || 0;

  return {
    city: rawData.name,
    country: sys.country || '',
    coordinates: {
      lat: coord.lat || null,
      lon: coord.lon || null
    },
    temperature: Math.round(main.temp ?? 0),
    feelsLike: Math.round(main.feels_like ?? 0),
    tempMin: Math.round(main.temp_min ?? 0),
    tempMax: Math.round(main.temp_max ?? 0),
    humidity: main.humidity ?? 0,
    pressure: main.pressure ?? 0,
    visibility: rawData.visibility ? (rawData.visibility / 1000).toFixed(1) : 'N/A', // in km
    windSpeed: Math.round(wind.speed ?? 0),
    windDirection: wind.deg ?? 0,
    weatherDescription: weatherItem.description
      ? weatherItem.description.charAt(0).toUpperCase() + weatherItem.description.slice(1)
      : 'Clear',
    weatherMain: weatherItem.main || 'Clear',
    weatherIcon: weatherItem.icon || '01d',
    weatherIconUrl: weatherItem.icon
      ? `https://openweathermap.org/img/wn/${weatherItem.icon}@2x.png`
      : 'https://openweathermap.org/img/wn/01d@2x.png',
    sunrise: formatTime(sys.sunrise, timezone),
    sunset: formatTime(sys.sunset, timezone),
    unit,
    tempUnit,
    windUnit,
    timestamp: rawData.dt ? new Date(rawData.dt * 1000).toISOString() : new Date().toISOString()
  };
};

/**
 * Formats OpenWeatherMap 5-day / 3-hour forecast into 5 distinct daily forecasts
 * @param {Object} rawData - OpenWeatherMap API forecast response
 * @param {String} unit - 'metric' or 'imperial'
 * @returns {Array} List of 5 daily forecast summaries
 */
const formatForecast = (rawData, unit = 'metric') => {
  const isMetric = unit === 'metric';
  const tempUnit = isMetric ? '°C' : '°F';
  const list = rawData.list || [];

  if (!list.length) return [];

  // Group by local calendar date (YYYY-MM-DD)
  const groupedByDate = {};
  const todayStr = new Date().toISOString().split('T')[0];

  list.forEach((item) => {
    // dt_txt is "YYYY-MM-DD HH:mm:ss" in UTC
    const dateStr = item.dt_txt ? item.dt_txt.split(' ')[0] : new Date(item.dt * 1000).toISOString().split('T')[0];

    if (!groupedByDate[dateStr]) {
      groupedByDate[dateStr] = [];
    }
    groupedByDate[dateStr].push(item);
  });

  const dailyForecasts = [];
  const dateKeys = Object.keys(groupedByDate).slice(0, 5); // Take 5 days

  dateKeys.forEach((dateStr, index) => {
    const dayItems = groupedByDate[dateStr];

    let minTemp = Infinity;
    let maxTemp = -Infinity;
    let totalHumidity = 0;

    dayItems.forEach((item) => {
      const tempMin = item.main?.temp_min ?? item.main?.temp;
      const tempMax = item.main?.temp_max ?? item.main?.temp;
      if (tempMin < minTemp) minTemp = tempMin;
      if (tempMax > maxTemp) maxTemp = tempMax;
      totalHumidity += item.main?.humidity ?? 0;
    });

    const avgHumidity = Math.round(totalHumidity / dayItems.length);

    // Pick midday item (~12:00 or closest) for representative icon and description
    let representativeItem = dayItems.find((it) => it.dt_txt && it.dt_txt.includes('12:00:00')) || dayItems[Math.floor(dayItems.length / 2)];
    const weatherObj = representativeItem.weather && representativeItem.weather[0] ? representativeItem.weather[0] : {};

    // Determine Day label
    const dateObj = new Date(dateStr + 'T12:00:00Z');
    const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
    const monthDay = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

    let label = `${dayOfWeek}, ${monthDay}`;
    if (index === 0) {
      label = 'Today';
    } else if (index === 1) {
      label = 'Tomorrow';
    }

    dailyForecasts.push({
      date: dateStr,
      dayOfWeek,
      label,
      fullDateLabel: `${dayOfWeek}, ${monthDay}`,
      weatherMain: weatherObj.main || 'Clear',
      weatherDescription: weatherObj.description
        ? weatherObj.description.charAt(0).toUpperCase() + weatherObj.description.slice(1)
        : 'Clear',
      weatherIcon: weatherObj.icon || '01d',
      weatherIconUrl: weatherObj.icon
        ? `https://openweathermap.org/img/wn/${weatherObj.icon}@2x.png`
        : 'https://openweathermap.org/img/wn/01d@2x.png',
      tempMin: Math.round(minTemp === Infinity ? 0 : minTemp),
      tempMax: Math.round(maxTemp === -Infinity ? 0 : maxTemp),
      humidity: avgHumidity,
      tempUnit
    });
  });

  return dailyForecasts;
};

module.exports = {
  formatCurrentWeather,
  formatForecast
};
