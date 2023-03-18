import { combineReducers } from "@reduxjs/toolkit";
import citiesReducer from "./citiesSlice";

const rootReducer = combineReducers({
  cities: citiesReducer,
});
export default rootReducer;
