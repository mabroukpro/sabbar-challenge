import { combineReducers } from "@reduxjs/toolkit";
import formReducer from "./slices/formSlice";
import citiesReducer from "./slices/citiesSlice";

const rootReducer = combineReducers({
  form: formReducer,
  cities: citiesReducer,
});
export default rootReducer;
