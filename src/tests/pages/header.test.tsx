import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../../Pages/header";
import "@testing-library/jest-dom";

describe("Header component", () => {
  test("renders the menu items correctly", async () => {
    render(
      <MemoryRouter initialEntries={["/reports"]}>
        <Header />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole("link", { name: /home/i });
    const reportsLink = screen.getByRole("link", { name: /reports/i });
    const citiesLink = screen.getByRole("link", { name: /cities/i });

    await waitFor(() => expect(homeLink).toBeInTheDocument());
    expect(reportsLink).toBeInTheDocument();
    expect(citiesLink).toBeInTheDocument();
  });

  test("sets the correct menu item as active based on current route", async () => {
    render(
      <MemoryRouter initialEntries={["/reports"]}>
        <Header />
      </MemoryRouter>
    );

    const activeMenuItem = screen.getByRole("menuitem", { name: /reports/i });

    await waitFor(() =>
      expect(activeMenuItem).toHaveClass("ant-menu-item-selected")
    );
  });
});
