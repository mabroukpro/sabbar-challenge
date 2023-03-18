import { Dayjs } from "dayjs";
import rootReducer from "./rootReducer";
export type RangeValue = [Dayjs | null, Dayjs | null] | null;
export interface City {
  id: number;
  name?: string;
  lat?: number;
  long?: number;
  dateRange?: {
    from?: string;
    to?: string;
  };
}
export type RootState = ReturnType<typeof rootReducer>;
export interface CitiesState extends Array<City> {}