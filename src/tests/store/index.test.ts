import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../../store/rootReducer";

test("store is created correctly and have the right intial state", () => {
  const store = configureStore({
    reducer: rootReducer,
  });
  expect(store.getState().charts).toEqual([]);
  expect(store.getState().cities).toHaveLength(3);
  expect(store.getState().form.entries).toHaveLength(1);
  expect(store.getState().reports.entries).toEqual([]);
});
