import { Dayjs } from "dayjs";
import rootReducer from "./rootReducer";
export type RangeValue = [Dayjs | null, Dayjs | null] | null;
export interface Form {
  id?: string;
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
  id?: string;
  name: string;
  long: number;
  lat: number;
  editMode?: boolean;
}
export interface Chart {
  id?: string;
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
  id?: string;
  form: FormState;
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
export interface ChartState extends Array<Chart> {}

export type RootState = ReturnType<typeof rootReducer>;
