import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CitiesState, City } from "../types";
import { v4 as uuidv4 } from "uuid";

const localCities: CitiesState | null = localStorage.getItem("cities")
  ? JSON.parse(localStorage.getItem("cities")!)
  : null;

const defaultCities: CitiesState = [
  { id: uuidv4(), name: "Cairo", lat: 30.0444, long: 31.2357 },
  { id: uuidv4(), name: "London", lat: 51.5072, long: 0.1276 },
  { id: uuidv4(), name: "Paris", lat: 48.8566, long: 2.3522 },
];

const citiesSlice = createSlice({
  name: "cities",
  initialState: localCities || defaultCities,
  reducers: {
    addCity: (state, action: PayloadAction<City>) => {
      const id: string = uuidv4();
      state.push({ ...action.payload, id: id });
    },
    removeCity: (state, action: PayloadAction<string>) => {
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
