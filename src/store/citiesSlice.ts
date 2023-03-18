import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CitiesState, City } from "./types";

const citiesSlice = createSlice({
  name: "cities",
  initialState: [{ id: 1 }] as CitiesState,
  reducers: {
    addCity: (state, action: PayloadAction<City>) => {
      state.push(action.payload);
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
