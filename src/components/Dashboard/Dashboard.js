import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentWeather } from '../../store/slices/weatherSlice';
import CityCard from '../CityCard/CityCard';
import SearchBar from '../SearchBar/SearchBar';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { favorites, current, lastUpdated } = useSelector(state => state.weather);
  const { temperatureUnit } = useSelector(state => state.preferences);

  // Real-time updates every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      favorites.forEach(city => {
        dispatch(fetchCurrentWeather(city));
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [favorites, dispatch]);

  // Initial data load
  useEffect(() => {
    favorites.forEach(city => {
      dispatch(fetchCurrentWeather(city));
    });
  }, [favorites, dispatch]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">🌤️ Weather Analytics Dashboard</h1>
        <div className="dashboard-controls">
          <SearchBar />
          <div className="last-updated">
            📅 Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'Never'}
            {lastUpdated && (
              <span style={{fontSize: '0.8em', color: '#27ae60', marginLeft: '10px'}}>
                ✅ Live data
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="cities-grid">
        {favorites.map(city => (
          <CityCard 
            key={city} 
            city={city} 
            weatherData={current[city]}
            unit={temperatureUnit}
          />
        ))}
        {favorites.length === 0 && (
          <div className="empty-state">
            <h3>🌍 No Cities Added Yet</h3>
            <p>Use the search bar above to add cities to your dashboard!</p>
            <div style={{marginTop: '20px', fontSize: '14px', color: '#7f8c8d'}}>
              💡 <strong>Try searching for:</strong> London, New York, Tokyo, Paris, or any city
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;