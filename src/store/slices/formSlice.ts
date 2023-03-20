import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Form, FormState } from "../types";
import { v4 as uuidv4 } from "uuid";

const defaultForm = [{ id: uuidv4() }];

const formSlice = createSlice({
  name: "forms",
  initialState: {
    entries: defaultForm,
    relativehumidity_2m: true,
    temperature_2m: true,
  } as FormState,
  reducers: {
    addForm: (state, action: PayloadAction) => {
      const id = uuidv4();
      state.entries.push({ id });
    },
    removeForm: (state, action: PayloadAction<string>) => {
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
    viewForm: (state, action: PayloadAction<FormState>) => {
      return action.payload;
    },
  },
});

export const {
  addForm,
  removeForm,
  updateFormEntry,
  viewForm,
  toggleTemp,
  toggleRelativeHumidity,
} = formSlice.actions;
export default formSlice.reducer;
