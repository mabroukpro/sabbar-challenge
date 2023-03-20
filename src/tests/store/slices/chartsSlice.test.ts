import { configureStore } from "@reduxjs/toolkit";
import chartsReducer, {
  clearCharts,
  fetchChartFromForm,
} from "../../../store/slices/chartsSlice";
import { Chart, Form } from "../../../store/types";
import { fetchChartData } from "../../../Pages/Home/api";

jest.mock("../../../Pages/Home/api", () => ({
  fetchChartData: jest.fn(),
}));

describe("chartsSlice", () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        chart: chartsReducer,
      },
    });
  });

  afterEach(() => {
    (fetchChartData as jest.Mock).mockReset();
  });

  describe("fetchChartFromForm", () => {
    const form: Form = {
      lat: 40.7128,
      long: -74.006,
      dateRange: {
        from: "2022-01-01",
        to: "2022-01-31",
      },
    };

    it("should fetch chart data and update state when fulfilled", async () => {
      const chartData = {
        hourly: [
          {
            relativehumidity_2m: [1, 2],
            temperature_2m: [2, 3],
            time: ["", ""],
          },
        ],
        hourly_units: {
          relativehumidity_2m: "",
          time: "",
          temperature_2m: "",
        },
      };
      (fetchChartData as jest.Mock).mockResolvedValue(chartData);

      const action = await store.dispatch(fetchChartFromForm(form));
      const state = store.getState().chart;

      expect(fetchChartData).toHaveBeenCalledWith({
        lat: form.lat,
        long: form.long,
        start: form.dateRange?.from,
        end: form.dateRange?.to,
      });
      expect(action.type).toBe(fetchChartFromForm.fulfilled.type);
      expect(action.payload).toEqual({
        id: form.id,
        city: form.city,
        ...chartData,
      });
      expect(state).toEqual([{ id: form.id, city: form.city, ...chartData }]);
    });

    it("should not call fetchChartData API if form is not complete", async () => {
      const formWithMissingFields: Form = {
        lat: 40.7128,
        long: -74.006,
        dateRange: undefined,
      };
      await store.dispatch(fetchChartFromForm(formWithMissingFields));
      expect(fetchChartData as jest.Mock).not.toHaveBeenCalled();
    });
  });

  describe("clearCharts", () => {
    it("should clear the charts array", () => {
      const initialState = [
        { id: 1, city: "New York" },
        { id: 2, city: "San Francisco" },
      ];
      store.dispatch({ type: "chart/setCharts", payload: initialState });

      const action = store.dispatch(clearCharts());
      const state = store.getState().chart;

      expect(action.type).toBe(clearCharts.type);
      expect(state).toEqual([]);
    });
  });
});
