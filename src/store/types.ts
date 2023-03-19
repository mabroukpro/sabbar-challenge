import { Dayjs } from "dayjs";
import rootReducer from "./rootReducer";
export type RangeValue = [Dayjs | null, Dayjs | null] | null;
export interface Form {
  id: number;
  name?: string;
  lat?: number;
  long?: number;
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
export interface FormState {
  entries: Form[];
  temperature_2m: boolean;
  relativehumidity_2m: boolean;
}
export interface CitiesState extends Array<City> {}

export type RootState = ReturnType<typeof rootReducer>;
