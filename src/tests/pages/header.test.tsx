import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../../Pages/header";
import '@testing-library/jest-dom'

describe("Header component", () => {
  test("renders the menu items correctly", () => {
    render(
      <MemoryRouter initialEntries={["/reports"]}>
        <Header />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole("link", { name: /home/i });
    const reportsLink = screen.getByRole("link", { name: /reports/i });
    const citiesLink = screen.getByRole("link", { name: /cities/i });

    expect(homeLink).toBeInTheDocument();
    expect(reportsLink).toBeInTheDocument();
    expect(citiesLink).toBeInTheDocument();
  });

  test("sets the correct menu item as active based on current route", () => {
    render(
      <MemoryRouter initialEntries={["/reports"]}>
        <Header />
      </MemoryRouter>
    );

    const activeMenuItem = screen.getByRole("menuitem", { name: /reports/i });

    expect(activeMenuItem).toHaveClass("ant-menu-item-selected");
  });
});
