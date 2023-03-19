import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { City, RootState } from "../../../store/types";
import { removeCity, updateCity } from "../../../store";
import { MessageType } from "../../../enums/messageType";

interface CityTableRow {
  key: string;
  name: string;
  latitude: number;
  longtude: number;
  editMode: boolean;
}

interface CitiesTableProps {
  onMessage: (message: string, type: MessageType) => void;
}

function CitiesTable(props: CitiesTableProps) {
  const cities = useSelector((state: RootState) => state.cities);
  const dispatch = useDispatch();
  const [longInput, setLongInput] = useState<string>();
  const [latInput, setLatInput] = useState<string>();
  const [nameInput, setNameInput] = useState<string>();

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
    console.log("Setting cities!", cities.length);
  }, [cities]);

  const rowsFromCities: CityTableRow[] = cities.map((city) => ({
    key: city.id.toString(),
    name: city.name,
    latitude: city.lat,
    longtude: city.long,
    editMode: city.editMode,
  }));

  const onToggleEditMode = useCallback(
    (key: string, enable: boolean) => {
      const city: City = cities.filter((city) => city.id === parseInt(key))[0];
      //reset inputs
      setLatInput(city.lat.toString());
      setLongInput(city.long.toString());
      setNameInput(city.name.toString());

      dispatch(updateCity({ ...city, editMode: enable }));
    },
    [dispatch, cities]
  );

  const onRemoveCity = useCallback(
    (id: number) => {
      dispatch(removeCity(id));
      props.onMessage(`Removed City`, MessageType.ERROR);
    },
    [dispatch, props]
  );

  const onUpdateCity = useCallback(
    (key: string) => {
      dispatch(
        updateCity({
          id: parseInt(key),
          editMode: false,
          lat: parseFloat(latInput || "0"),
          long: parseFloat(longInput || "0"),
          name: nameInput || "",
        })
      );
      props.onMessage(`Updated City: ${nameInput}`, MessageType.SUCCESS);
    },
    [dispatch, latInput, longInput, nameInput, props]
  );

  const renderActions = useCallback(
    (record: CityTableRow) => {
      if (record.editMode) {
        return (
          <Space size="middle">
            <Button
              type="primary"
              danger
              onClick={(ev) => onToggleEditMode(record.key, false)}
              icon={<CloseOutlined />}
            ></Button>
            <Button
              type="primary"
              onClick={(ev) => onUpdateCity(record.key)}
              icon={<CheckOutlined />}
            ></Button>
          </Space>
        );
      } else {
        return (
          <Space size="middle">
            <Button
              onClick={(ev) => onRemoveCity(parseInt(record.key))}
              icon={<DeleteOutlined />}
            ></Button>
            <Button
              onClick={(ev) => onToggleEditMode(record.key, true)}
              icon={<EditOutlined />}
            ></Button>
          </Space>
        );
      }
    },
    [onToggleEditMode, onRemoveCity, onUpdateCity]
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: CityTableRow) =>
        record.editMode ? (
          <Input
            value={nameInput}
            onChange={(ev) => setNameInput(ev.target.value)}
          />
        ) : (
          <div className="table-col">{record.name}</div>
        ),
    },
    {
      title: "Latitude",
      dataIndex: "latitude",
      key: "latitude",
      render: (_: any, record: CityTableRow) =>
        record.editMode ? (
          <Input
            type="number"
            value={latInput}
            onChange={(ev) => setLatInput(ev.target.value)}
          />
        ) : (
          <div className="table-col">{record.latitude}</div>
        ),
    },
    {
      title: "Longtude",
      dataIndex: "longtude",
      key: "longtude",
      render: (_: any, record: CityTableRow) =>
        record.editMode ? (
          <Input
            type="number"
            value={longInput}
            onChange={(ev) => setLongInput(ev.target.value)}
          />
        ) : (
          <div className="table-col">{record.longtude}</div>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: CityTableRow) => renderActions(record),
    },
  ];

  return (
    <>
      <Table
        tableLayout="fixed"
        className="cities-table"
        dataSource={rowsFromCities}
        columns={columns}
      />
    </>
  );
}

export default CitiesTable;
