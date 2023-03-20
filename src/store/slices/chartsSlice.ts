import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchChartData, ChartDataInput } from "../../Pages/Home/api";
import { Form, ChartState } from "../types";

function validateForm(input: ChartDataInput) {
  if (!input.lat || !input.long || !input.start || !input.end) {
    throw new Error("Please complete the form");
  }
}

export const fetchChartFromForm = createAsyncThunk(
  "chart/fetchChartFromForm",
  async (form: Form, thunkAPI) => {
    const data: ChartDataInput = {
      lat: form.lat,
      long: form.long,
      end: form.dateRange?.to,
      start: form.dateRange?.from,
    };
    validateForm(data);
    const chart = await fetchChartData(data);
    chart.id = form.id;
    chart.city = form.city;
    return chart;
  }
);

const chartsSlice = createSlice({
  name: "chart",
  initialState: [] as ChartState,
  reducers: {
    clearCharts(_: ChartState, action: PayloadAction) {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChartFromForm.fulfilled, (state, action) => {
      const index = state.findIndex((chart) => chart.id === action.payload.id);
      if (index === -1) {
        state.push(action.payload);
      } else {
        state[index] = action.payload;
      }
    });
  },
});
export const { clearCharts } = chartsSlice.actions;
export default chartsSlice.reducer;
