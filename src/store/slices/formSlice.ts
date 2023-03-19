import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Form, FormState } from "../types";

const formSlice = createSlice({
  name: "forms",
  initialState: {
    entries: [{ id: 1 }],
    relativehumidity_2m: false,
    temperature_2m: true,
  } as FormState,
  reducers: {
    addForm: (state, action: PayloadAction<Form>) => {
      state.entries.push(action.payload);
    },
    removeForm: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        entries: state.entries.filter((form) => form.id !== action.payload),
      };
    },
    updateFormEntry: (state, action: PayloadAction<Form>) => {
      const index = state.entries.findIndex(
        (form) => form.id === action.payload.id
      );
      if (index !== -1) {
        state.entries[index] = action.payload;
      }
    },
    toggleTemp: (state, action: PayloadAction<boolean>) => {
      //make sure one of them is enabled
      if (!state.relativehumidity_2m) {
        state.temperature_2m = true;
        return;
      }
      state.temperature_2m = action.payload;
    },
    toggleRelativeHumidity: (state, action: PayloadAction<boolean>) => {
      //make sure one of them is enabled
      if (!state.temperature_2m) {
        state.relativehumidity_2m = true;
        return;
      }
      state.relativehumidity_2m = action.payload;
    },
  },
});

export const {
  addForm,
  removeForm,
  updateFormEntry,
  toggleTemp,
  toggleRelativeHumidity,
} = formSlice.actions;
export default formSlice.reducer;
