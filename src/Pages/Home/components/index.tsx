import { useEffect } from "react";
// import { fetchChartData } from "../api";
import Form from "./form";
import ChartDisplay from "./chart";

function ChartPage() {
  return (
    <>
      <Form />
      <ChartDisplay />
    </>
  );
}

export default ChartPage;
