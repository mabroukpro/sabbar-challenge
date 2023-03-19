import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Report, ReportState } from "../types";

const localReports: Report | null = localStorage.getItem("reports")
  ? JSON.parse(localStorage.getItem("reports")!)
  : null;

const reportsSlice = createSlice({
  name: "reports",
  initialState: {
    entries: localReports || [],
  } as ReportState,
  reducers: {
    addReport: (state, action: PayloadAction<Report>) => {
      state.entries.push({ ...action.payload, id: state.entries.length + 1 });
    },
    removeReports: (state, action: PayloadAction<number[]>) => {
      return {
        ...state,
        entries: state.entries.filter(
          (report) => !action.payload.includes(report.id!)
        ),
      };
    },
  },
});

export const { addReport, removeReports } = reportsSlice.actions;
export default reportsSlice.reducer;
