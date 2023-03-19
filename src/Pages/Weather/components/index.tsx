import { useEffect } from "react";
// import { fetchWeatherData } from "../api";
import Form from "./form";
import WeatherDisplay from "./weather";

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
      <Form />
      <WeatherDisplay />
    </>
  );
}

export default WeatherPage;
