import React from "react";
import Header from "./Pages/header";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.scss";
import ChartPage from "./Pages/Home/components";
import ReportsPage from "./Pages/Reports";
import CitiesPage from "./Pages/Cities";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" Component={ChartPage} />
          <Route path="/reports" Component={ReportsPage} />
          <Route path="/cities" Component={CitiesPage} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
