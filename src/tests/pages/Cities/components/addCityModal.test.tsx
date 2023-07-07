import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import AddCityModal from "../../../../Pages/Cities/components/addCityModal";
import store from "../../../../store";

describe("AddCityModal", () => {
  it('should add a city when "Add" button is clicked', async () => {
    const onClose = jest.fn();
    render(
      <Provider store={store}>
        <AddCityModal open={true} onClose={onClose} />
      </Provider>
    );

    const cityNameInput = screen.getByLabelText("City Name");
    const latInput = screen.getByLabelText("Latitude");
    const longInput = screen.getByLabelText("Longitud");
    const addButton = screen.getByText("Add");

    fireEvent.change(cityNameInput, { target: { value: "New York" } });
    fireEvent.change(latInput, { target: { value: "40.7128" } });
    fireEvent.change(longInput, { target: { value: "-74.0060" } });

    fireEvent.click(addButton);

    await waitFor(() => expect(store.getState().cities).toHaveLength(4));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
