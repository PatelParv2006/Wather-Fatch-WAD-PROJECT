import { Thermometer, Droplets, Wind, Gauge, Eye, Sunrise, Sunset } from 'lucide-react';

const WeatherDetails = ({ weather }) => {
  if (!weather) return null;

  const details = [
    {
      icon: <Thermometer size={20} />,
      label: 'Feels Like',
      value: `${weather.feelsLike}${weather.tempUnit}`
    },
    {
      icon: <Droplets size={20} />,
      label: 'Humidity',
      value: `${weather.humidity}%`
    },
    {
      icon: <Wind size={20} />,
      label: 'Wind Speed',
      value: `${weather.windSpeed} ${weather.windUnit}`
    },
    {
      icon: <Gauge size={20} />,
      label: 'Pressure',
      value: `${weather.pressure} hPa`
    },
    {
      icon: <Eye size={20} />,
      label: 'Visibility',
      value: weather.visibility !== 'N/A' ? `${weather.visibility} km` : 'N/A'
    },
    {
      icon: <Sunrise size={20} />,
      label: 'Sunrise (UTC)',
      value: weather.sunrise || 'N/A'
    },
    {
      icon: <Sunset size={20} />,
      label: 'Sunset (UTC)',
      value: weather.sunset || 'N/A'
    }
  ];

  return (
    <div className="weather-details-grid">
      {details.map((item, idx) => (
        <div key={idx} className="detail-item">
          <div className="detail-icon-wrap">{item.icon}</div>
          <div className="detail-info">
            <span className="detail-label">{item.label}</span>
            <span className="detail-value">{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherDetails;
