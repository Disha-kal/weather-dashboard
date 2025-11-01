import { createSlice } from '@reduxjs/toolkit';

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: {
    temperatureUnit: 'celsius',
    theme: 'light',
  },
  reducers: {
    setTemperatureUnit: (state, action) => {
      state.temperatureUnit = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTemperatureUnit, setTheme } = preferencesSlice.actions;
export default preferencesSlice.reducer;