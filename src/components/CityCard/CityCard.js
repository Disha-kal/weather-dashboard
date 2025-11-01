import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFavorite } from '../../store/slices/weatherSlice';
import { convertTemperature } from '../../utils/helpers';
import './CityCard.css';

const CityCard = ({ city, weatherData, unit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!weatherData) {
    return (
      <div className="city-card loading">
        <h3>{city}</h3>
        <p>⏳ Loading weather data...</p>
      </div>
    );
  }

  const handleRemoveFavorite = () => {
    dispatch(removeFavorite(city));
  };

  const handleCardClick = () => {
    navigate(`/city/${city}`);
  };

  const temp = convertTemperature(weatherData.main.temp, unit);
  const feelsLike = convertTemperature(weatherData.main.feels_like, unit);

  return (
    <div className="city-card" onClick={handleCardClick}>
      <button className="remove-btn" onClick={(e) => { e.stopPropagation(); handleRemoveFavorite(); }}>
        ❌
      </button>
      
      <div className="card-header">
        <h3>📍 {weatherData.name}</h3>
        <img 
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={weatherData.weather[0].description}
        />
      </div>

      <div className="temperature">
        {Math.round(temp)}°{unit === 'celsius' ? 'C' : 'F'}
      </div>

      <div className="weather-description">
        {weatherData.weather[0].description}
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span>🌡️ Feels like</span>
          <span>{Math.round(feelsLike)}°</span>
        </div>
        <div className="detail-item">
          <span>💧 Humidity</span>
          <span>{weatherData.main.humidity}%</span>
        </div>
        <div className="detail-item">
          <span>💨 Wind</span>
          <span>{Math.round(weatherData.wind.speed)} m/s</span>
        </div>
        <div className="detail-item">
          <span>📊 Pressure</span>
          <span>{weatherData.main.pressure} hPa</span>
        </div>
      </div>
      
      <div className="card-footer">
        <small>Click for detailed analytics →</small>
      </div>
    </div>
  );
};

export default CityCard;