import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWeatherData, WeatherDataInput } from "../../Pages/Weather/api";
import { Form, WeatherState } from "../types";

function validateForm(input: WeatherDataInput) {
  if (!input.lat || !input.long || !input.start || !input.end) {
    throw new Error("Please complete the form");
  }
}

export const fetchWeatherFromForm = createAsyncThunk(
  "weather/fetchWeatherFromForm",
  async (form: Form, thunkAPI) => {
    const data: WeatherDataInput = {
      lat: form.lat,
      long: form.long,
      end: form.dateRange?.to,
      start: form.dateRange?.from,
    };
    validateForm(data);
    const weather = await fetchWeatherData(data);
    weather.id = form.id;
    weather.city = form.city;
    return weather;
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: [] as WeatherState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherFromForm.fulfilled, (state, action) => {
      const index = state.findIndex(
        (weather) => weather.id === action.payload.id
      );
      if (index === -1) {
        state.push(action.payload);
      } else {
        state[index] = action.payload;
      }
    });
  },
});
export default weatherSlice.reducer;
