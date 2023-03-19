import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
});

export {
  addForm,
  updateFormEntry,
  viewForm,
  removeForm,
  toggleTemp,
  toggleRelativeHumidity,
} from "./slices/formSlice";
export { removeCity, updateCity, addCity } from "./slices/citiesSlice";
export { fetchChartFromForm, clearCharts } from "./slices/chartsSlice";
export { removeReports, addReport } from "./slices/reportsSlice";
export type AppDispatch = typeof store.dispatch;
export default store;
