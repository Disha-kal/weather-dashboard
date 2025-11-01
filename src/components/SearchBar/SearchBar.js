import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WEATHER_API_KEY, WEATHER_BASE_URL } from '../../config';
import { addFavorite } from '../../store/slices/weatherSlice';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.weather.favorites);

  useEffect(() => {
    console.log('🔑 Using API Key:', WEATHER_API_KEY);
  }, []);

  useEffect(() => {
    if (query.length > 2) {
      console.log('🔍 Searching for:', query);
      setLoading(true);
      
      const delayDebounce = setTimeout(() => {
        fetchSuggestions(query);
      }, 300);

      return () => {
        clearTimeout(delayDebounce);
        setLoading(false);
      };
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const fetchSuggestions = async (searchQuery) => {
    try {
      console.log('🌐 Fetching city data...');
      
      const apiUrl = `${WEATHER_BASE_URL}/weather?q=${searchQuery}&appid=${WEATHER_API_KEY}&units=metric`;
      console.log('📡 API URL:', apiUrl);
      
      const response = await fetch(apiUrl);
      console.log('✅ Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('📦 City data found:', data.name);
        setSuggestions([data]);
        setShowSuggestions(true);
      } else {
        const errorData = await response.json();
        console.error('❌ API Error:', errorData);
        setSuggestions([]);
      }
    } catch (error) {
      console.error('❌ Search error:', error.message);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (city) => {
    console.log('🎯 Adding city:', city.name);
    const cityName = city.name;
    
    if (!favorites.includes(cityName)) {
      dispatch(addFavorite(cityName));
      console.log('⭐ Added to favorites:', cityName);
    }
    
    setQuery('');
    setShowSuggestions(false);
  };

  return (
    <div className="search-bar">
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <input
          type="text"
          placeholder="Search for any city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 2 && setShowSuggestions(true)}
          style={{ 
            width: '350px', 
            padding: '12px',
            border: '2px solid #3498db',
            borderRadius: '8px',
            fontSize: '16px'
          }}
        />
        {loading && (
          <div style={{
            position: 'absolute',
            right: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#3498db',
            fontSize: '14px'
          }}>
            🔍 Searching...
          </div>
        )}
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          width: '350px',
          background: 'white',
          border: '2px solid #3498db',
          borderRadius: '8px',
          marginTop: '5px',
          maxHeight: '400px',
          overflowY: 'auto',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          {suggestions.map(city => (
            <div
              key={city.id}
              onClick={() => handleSuggestionClick(city)}
              style={{
                padding: '12px',
                cursor: 'pointer',
                borderBottom: '1px solid #ecf0f1',
                backgroundColor: favorites.includes(city.name) ? '#e8f5e8' : 'white',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
              onMouseLeave={(e) => e.target.style.backgroundColor = favorites.includes(city.name) ? '#e8f5e8' : 'white'}
            >
              <div style={{ fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {city.name}, {city.sys.country}
                {favorites.includes(city.name) && ' ★'}
              </div>
              <div style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
                🌡️ {Math.round(city.main.temp)}°C • {city.weather[0].description}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;