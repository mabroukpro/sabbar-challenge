import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
});

export {
  addForm,
  updateFormEntry,
  removeForm,
  toggleTemp,
  toggleRelativeHumidity,
} from "./slices/formSlice";
export { removeCity, updateCity, addCity } from "./slices/citiesSlice";
export default store;
