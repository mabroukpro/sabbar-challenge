import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CitiesState, City } from "../types";

const localCities: CitiesState | null = localStorage.getItem("cities")
  ? JSON.parse(localStorage.getItem("cities")!)
  : null;

const citiesSlice = createSlice({
  name: "cities",
  initialState:
    localCities ||
    ([
      { id: 1, name: "Cairo", lat: 30.0444, long: 31.2357 },
      { id: 2, name: "London", lat: 51.5072, long: 0.1276 },
      { id: 3, name: "Paris", lat: 48.8566, long: 2.3522 },
    ] as CitiesState),
  reducers: {
    addCity: (state, action: PayloadAction<City>) => {
      state.push({ ...action.payload, id: state.length + 1 });
    },
    removeCity: (state, action: PayloadAction<number>) => {
      return state.filter((city) => city.id !== action.payload);
    },
    updateCity: (state, action: PayloadAction<City>) => {
      const index = state.findIndex((city) => city.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addCity, removeCity, updateCity } = citiesSlice.actions;
export default citiesSlice.reducer;
