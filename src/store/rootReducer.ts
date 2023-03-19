import { combineReducers } from "@reduxjs/toolkit";
import formReducer from "./slices/formSlice";
import citiesReducer from "./slices/citiesSlice";
import weatherReducer from "./slices/weatherSlice";

const rootReducer = combineReducers({
  form: formReducer,
  cities: citiesReducer,
  weathers: weatherReducer
});
export default rootReducer;
