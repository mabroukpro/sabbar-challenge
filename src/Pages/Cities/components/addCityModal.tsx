import { Button, Input, Modal } from "antd";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addCity } from "../../../store";
export interface AddCityModalProps {
  open: boolean;
  onClose: () => void;
}
function AddCityModal(props: AddCityModalProps) {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);

  const onAddCity = useCallback(() => {
    dispatch(addCity({ editMode: false, lat, long, name }));
    //reset form
    setName("");
    setLat(0);
    setLong(0);
    props.onClose();
  }, [lat, long, name, dispatch, props]);
  return (
    <Modal
      open={props.open}
      title="Add a new City!"
      onCancel={props.onClose}
      footer={[
        <Button key="add" onClick={(ev) => onAddCity()}>
          Add
        </Button>,
      ]}
    >
      <label htmlFor="name">City Name</label>
      <Input
        style={{ marginBottom: 10 }}
        id="name"
        placeholder="City Name"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      <label htmlFor="lat">Latitude</label>
      <Input
        style={{ marginBottom: 10 }}
        id="lat"
        placeholder="Latitude"
        type="number"
        value={lat || ""}
        onChange={(ev) => setLat(parseFloat(ev.target.value))}
      />

      <label htmlFor="long">Longitude</label>
      <Input
        style={{ marginBottom: 10 }}
        id="long"
        placeholder="Longtude"
        type="number"
        value={long || ""}
        onChange={(ev) => setLong(parseFloat(ev.target.value))}
      />
    </Modal>
  );
}

export default AddCityModal;
