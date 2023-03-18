import { useEffect } from "react";
// import { fetchWeatherData } from "../api";
import Cities from "./cities";

function WeatherPage() {
  async function fetchWeather() {
    // const result = await fetchWeatherData({
    //   lat: 30,
    //   long: 31,
    //   data: ["temperature_2m", "relativehumidity_2m"],
    // });
    // console.log(result.hourly.relativehumidity_2m);
  }
  useEffect(() => {
    fetchWeather();
  }, []);
  return (
    <>
      <Cities />
    </>
  );
}

export default WeatherPage;
