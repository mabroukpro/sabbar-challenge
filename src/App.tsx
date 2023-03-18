import React from "react";
import Header from "./Pages/header";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.scss";
import WeatherPage from "./Pages/Weather/components";
import ReportsPage from "./Pages/Reports";
import CitiesPage from "./Pages/Cities/components";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" Component={WeatherPage} />
          <Route path="/reports" Component={ReportsPage} />
          <Route path="/cities" Component={CitiesPage} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
