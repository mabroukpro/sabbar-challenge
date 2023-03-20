import React from "react";
import { screen } from "@testing-library/react";
import App from "./App";
import { renderWithProviders } from "./tests/test.utils";
import "@testing-library/jest-dom";

test("renders the app correctly", async () => {
  renderWithProviders(<App />);
  const headerElement = screen.getByText(/weather app/i);
  expect(headerElement).toBeInTheDocument();
});
