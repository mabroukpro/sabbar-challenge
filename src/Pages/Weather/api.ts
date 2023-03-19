import axios from "axios";
import { Weather } from "../../store/types";
export interface WeatherDataInput {
  lat?: number;
  long?: number;
  start?: string;
  end?: string;
}

export async function fetchWeatherData(
  input: WeatherDataInput
): Promise<Weather> {
  const endpoint =
    process.env.REACT_APP_WEATHER_URL +
    `?latitude=${input.lat}&longitude=${input.long}&hourly=temperature_2m,relativehumidity_2m&start_date=${input.start}&end_date=${input.end}`;

  try {
    const response = await axios.get(endpoint);
    const data: Weather = await response.data;

    return data;
  } catch (error) {
    throw new Error(`Error fetching weather data: ${error}`);
  }
}
