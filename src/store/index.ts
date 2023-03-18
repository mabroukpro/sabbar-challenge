import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
});

export { addCity, updateCity, removeCity } from "./citiesSlice";
export default store;
