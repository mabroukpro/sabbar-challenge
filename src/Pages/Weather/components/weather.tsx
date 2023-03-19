import { useSelector } from "react-redux";
import { RootState, Weather } from "../../../store/types";

import { LineChart, Line, Tooltip, XAxis, YAxis } from "recharts";

interface WeatherDataFormatted {
  name: string;
  temperature_2m: number;
  relativehumidity_2m: number;
}

function formatWeatherData(weather: Weather): WeatherDataFormatted[] {
  const result = weather.hourly.time.map((name, index) => {
    return {
      name,
      temperature_2m: weather.hourly.temperature_2m[index],
      relativehumidity_2m: weather.hourly.relativehumidity_2m[index],
    };
  });
  return result;
}

function WeatherDisplay() {
  const weathers = useSelector((state: RootState) => state.weathers);
  const form = useSelector((state: RootState) => state.form);
  return (
    <div className="weather-charts-container">
      {weathers.map((weather) => (
        <div className="chart-item" key={weather.id}>
          <p>{weather.city?.name}</p>
          <LineChart width={400} height={300} data={formatWeatherData(weather)}>
            {form.relativehumidity_2m && (
              <Line
                type="monotone"
                dataKey="relativehumidity_2m"
                stroke="#0094C6"
              />
            )}
            {form.temperature_2m && (
              <Line type="monotone" dataKey="temperature_2m" stroke="#001242" />
            )}
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
      ))}
    </div>
  );
}

export default WeatherDisplay;
