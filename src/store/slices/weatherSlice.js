import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import weatherService from '../../services/weatherService';

export const fetchCurrentWeather = createAsyncThunk(
  'weather/fetchCurrent',
  async (city) => {
    const data = await weatherService.getCurrentWeather(city);
    return data;
  }
);

export const fetchForecast = createAsyncThunk(
  'weather/fetchForecast', 
  async (city) => {
    const data = await weatherService.getForecast(city);
    return data;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    current: {},
    forecast: {},
    favorites: JSON.parse(localStorage.getItem('favoriteCities')) || [],
    loading: false,
    error: null,
    lastUpdated: null,
  },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
        localStorage.setItem('favoriteCities', JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(city => city !== action.payload);
      localStorage.setItem('favoriteCities', JSON.stringify(state.favorites));
    },
    updateLastUpdated: (state) => {
      state.lastUpdated = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.current[action.payload.name] = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.forecast[action.payload.city.name] = action.payload;
      });
  },
});

export const { addFavorite, removeFavorite, updateLastUpdated } = weatherSlice.actions;
export default weatherSlice.reducer;