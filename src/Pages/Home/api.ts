import axios from "axios";
import { Chart } from "../../store/types";
export interface ChartDataInput {
  lat?: number;
  long?: number;
  start?: string;
  end?: string;
}

export async function fetchChartData(
  input: ChartDataInput
): Promise<Chart> {
  const endpoint =
    process.env.REACT_APP_WEATHER_URL +
    `?latitude=${input.lat}&longitude=${input.long}&hourly=temperature_2m,relativehumidity_2m&start_date=${input.start}&end_date=${input.end}`;

  try {
    const response = await axios.get(endpoint);
    const data: Chart = await response.data;

    return data;
  } catch (error) {
    throw new Error(`Error fetching chart data: ${error}`);
  }
}
