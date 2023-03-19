import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Report, ReportState } from "../types";

const reportsSlice = createSlice({
  name: "reports",
  initialState: {
    entries: [{ id: 1 }],
  } as ReportState,
  reducers: {
    addReport: (state, action: PayloadAction<Report>) => {
      state.entries.push(action.payload);
    },
    removeForm: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        entries: state.entries.filter((report) => report.id !== action.payload),
      };
    },
  },
});

export const { addReport, removeForm } = reportsSlice.actions;
export default reportsSlice.reducer;
