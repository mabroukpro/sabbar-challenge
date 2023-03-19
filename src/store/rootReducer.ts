import { combineReducers } from "@reduxjs/toolkit";
import formReducer from "./slices/formSlice";
import citiesReducer from "./slices/citiesSlice";
import chartReducer from "./slices/chartsSlice";
import reportsReducer from "./slices/reportsSlice";

const rootReducer = combineReducers({
  form: formReducer,
  cities: citiesReducer,
  charts: chartReducer,
  reports: reportsReducer,
});
export default rootReducer;
