import { Dayjs } from "dayjs";
import rootReducer from "./rootReducer";
export type RangeValue = [Dayjs | null, Dayjs | null] | null;
export interface Form {
  id: number;
  name?: string;
  lat?: number;
  long?: number;
  city?: City;
  dateRange?: {
    from?: string;
    to?: string;
  };
}
export interface City {
  id: number;
  name: string;
  long: number;
  lat: number;
  editMode: boolean;
}
export interface Weather {
  id: number;
  city?: City;
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
export interface Report {
  id: number;
  form: Form;
  creationDate: string;
}
export interface ReportState {
  entries: Report[];
}
export interface FormState {
  entries: Form[];
  temperature_2m: boolean;
  relativehumidity_2m: boolean;
}
export interface CitiesState extends Array<City> {}
export interface WeatherState extends Array<Weather> {}

export type RootState = ReturnType<typeof rootReducer>;
