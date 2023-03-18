import axios from "axios";

export interface WeatherData {
  hourly: {
    time: string[];
    temperature_2m: number[];
    relativehumidity_2m: number[];
  };
  hourly_units: {
    relativehumidity_2m: string;
    time: string;
    temperature_2m: string;
  };
}

export interface WeatherDataInput {
  lat: number;
  long: number;
  start?: string;
  end?: string;
  data: string[];
}

export async function fetchWeatherData(
  input: WeatherDataInput
): Promise<WeatherData> {
  const dataToShow = input.data.join(",");
  //this should be moved to the .env file
  const endpoint =
    process.env.REACT_APP_WEATHER_URL +
    `?latitude=${input.lat}&longitude=${input.long}&hourly=${dataToShow}`;

  try {
    const response = await axios.get(endpoint);
    const data: WeatherData = await response.data;

    return data;
  } catch (error) {
    throw new Error(`Error fetching weather data: ${error}`);
  }
}
