import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Report, ReportState } from "../types";
import { v4 as uuidv4 } from "uuid";

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
      const id = uuidv4();
      state.entries.push({ ...action.payload, id: id });
    },
    removeReports: (state, action: PayloadAction<string[]>) => {
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
