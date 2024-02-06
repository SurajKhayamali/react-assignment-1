import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { SerializedError } from '@reduxjs/toolkit';

import { getWeatherByCity } from '../../services/weather';
import type { ForecastApiResponse } from '../../services/weather';

interface WeatherState {
  status: 'uninitialized' | 'loading' | 'succeeded' | 'failed';
  data?: ForecastApiResponse;
  error?: SerializedError;
}

const initialState: WeatherState = {
  status: 'uninitialized',
};

export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchWeatherByCity',
  async (city: string) => {
    const response = await getWeatherByCity(city);

    return response;
  },
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.status = 'failed';
        state.data = undefined;
        state.error = action.error;
      });
  },
});

export default weatherSlice.reducer;
