import { useSelector } from "react-redux";
import { RootState, Chart } from "../../../store/types";

import { AreaChart, Area, Tooltip, XAxis, YAxis } from "recharts";

interface ChartDataFormatted {
  name: string;
  temperature_2m: number;
  relativehumidity_2m: number;
}

function formatChartData(chart: Chart): ChartDataFormatted[] {
  const result = chart.hourly.time.map((name, index) => {
    return {
      name,
      temperature_2m: chart.hourly.temperature_2m[index],
      relativehumidity_2m: chart.hourly.relativehumidity_2m[index],
    };
  });
  return result;
}

function ChartDisplay() {
  const charts = useSelector((state: RootState) => state.charts);
  const form = useSelector((state: RootState) => state.form);
  return (
    <div className="chart-charts-container">
      {charts.map((chart) => (
        <div className="chart-item" key={chart.id}>
          <p>{chart.city?.name}</p>
          <AreaChart width={400} height={300} data={formatChartData(chart)}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0094C6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0094C6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#001242" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#001242" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            {form.relativehumidity_2m && (
              <Area
                type="monotone"
                dataKey="relativehumidity_2m"
                stroke="#0094C6"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            )}
            {form.temperature_2m && (
              <Area
                type="monotone"
                dataKey="temperature_2m"
                stroke="#001242"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            )}
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </AreaChart>
        </div>
      ))}
    </div>
  );
}

export default ChartDisplay;
