import { WEATHER_API_KEY, WEATHER_BASE_URL } from '../config';

const CACHE_DURATION = 60 * 1000;

class WeatherService {
  constructor() {
    this.cache = new Map();
  }

  async getCurrentWeather(city) {
    const cached = this.getFromCache(`current_${city}`);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    try {
      const response = await fetch(
        `${WEATHER_BASE_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      
      const data = await response.json();
      this.setToCache(`current_${city}`, data);
      return data;
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  }

  async getForecast(city) {
    const cached = this.getFromCache(`forecast_${city}`);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    try {
      const response = await fetch(
        `${WEATHER_BASE_URL}/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error(`Forecast API error: ${response.status}`);
      }
      
      const data = await response.json();
      this.setToCache(`forecast_${city}`, data);
      return data;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  }

  getFromCache(key) {
    return this.cache.get(key);
  }

  setToCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  clearCache() {
    this.cache.clear();
  }
}

export default new WeatherService();