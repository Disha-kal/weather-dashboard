import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import WeatherCharts from '../components/Charts/WeatherCharts';

const CityDetailPage = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const { current, forecast } = useSelector(state => state.weather);
  const { temperatureUnit } = useSelector(state => state.preferences);
  
  const weatherData = current[cityName];
  const forecastData = forecast[cityName];

  if (!weatherData) {
    return (
      <div className="loading-detail">
        <h2>Loading weather data for {cityName}...</h2>
        <button onClick={() => navigate('/')}>← Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="city-detail">
      <header className="detail-header">
        <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
        <h1>📊 {cityName} - Weather Analytics</h1>
      </header>

      <div className="current-weather-card">
        <div className="weather-main">
          <img 
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
            alt={weatherData.weather[0].description}
          />
          <div className="temp-section">
            <div className="main-temp">
              {Math.round(weatherData.main.temp)}°{temperatureUnit === 'celsius' ? 'C' : 'F'}
            </div>
            <div className="weather-desc">
              {weatherData.weather[0].description}
            </div>
          </div>
        </div>
        
        <div className="detailed-stats">
          <div className="stat-row">
            <div className="stat">
              <span className="label">Feels Like</span>
              <span className="value">{Math.round(weatherData.main.feels_like)}°</span>
            </div>
            <div className="stat">
              <span className="label">Humidity</span>
              <span className="value">{weatherData.main.humidity}%</span>
            </div>
            <div className="stat">
              <span className="label">Wind Speed</span>
              <span className="value">{weatherData.wind.speed} m/s</span>
            </div>
          </div>
          <div className="stat-row">
            <div className="stat">
              <span className="label">Pressure</span>
              <span className="value">{weatherData.main.pressure} hPa</span>
            </div>
            <div className="stat">
              <span className="label">Visibility</span>
              <span className="value">{weatherData.visibility / 1000} km</span>
            </div>
            <div className="stat">
              <span className="label">Cloudiness</span>
              <span className="value">{weatherData.clouds.all}%</span>
            </div>
          </div>
        </div>
      </div>

      {forecastData && (
        <div className="charts-section">
          <h2>📈 Weather Forecast & Analytics</h2>
          <WeatherCharts forecastData={forecastData} unit={temperatureUnit} />
        </div>
      )}
    </div>
  );
};

export default CityDetailPage;