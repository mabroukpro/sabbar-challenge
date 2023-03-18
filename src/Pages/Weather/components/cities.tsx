//react
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//js
import dayjs, { Dayjs } from "dayjs";

//ui
import { Button, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";

//store
import { City, RangeValue, RootState } from "../../../store/types";
import { addCity, updateCity } from "../../../store";

const { RangePicker } = DatePicker;

function Cities() {
  const cities = useSelector((store: RootState) => store.cities);
  const dispatch = useDispatch();

  const [dates, setDates] = useState<RangeValue[]>([]);

  const disabledDate = useCallback((current: Dayjs, dates: RangeValue) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") > 7;
    const tooEarly = dates[1] && dates[1].diff(current, "days") > 7;
    return !!tooEarly || !!tooLate;
  }, []);

  const updateDateState = useCallback(
    (val: RangeValue, index: number) => {
      const updatedDates = [...dates];
      updatedDates[index] = val;
      setDates(updatedDates);
    },
    [dates]
  );

  const selectDate = useCallback(
    (val: RangeValue, index: number, city: City) => {
      dispatch(
        updateCity({
          ...city,
          dateRange: {
            from: val?.[0]?.format("YYYY-MM-DD"),
            to: val?.[1]?.format("YYYY-MM-DD"),
          },
        })
      );
    },
    [dispatch]
  );

  const onOpenChange = useCallback(
    (open: boolean, index: number) => {
      if (open) {
        updateDateState([null, null], index);
      }
    },
    [updateDateState]
  );

  const renderForms: JSX.Element[] = useMemo(
    () =>
      cities.map((city, index) => (
        <div className="city-form" key={city.id}>
          <Input
            className="lat-long-input"
            placeholder="Latitude"
            title="Latitude"
          />
          <Input
            className="lat-long-input"
            placeholder="Latitude"
            title="Latitude"
          />
          <Select
            className="city-select"
            showSearch
            placeholder="Select a City"
            optionFilterProp="children"
            // onChange={onChange}
            // onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: "cairo",
                label: "Cairo",
              },
              {
                value: "london",
                label: "London",
              },
              {
                value: "paris",
                label: "Paris",
              },
            ]}
          />
          <RangePicker
            className="date-range-picker"
            value={
              city.dateRange
                ? [dayjs(city.dateRange?.from), dayjs(city.dateRange?.to)]
                : dates[index]
            }
            disabledDate={(current) => disabledDate(current, dates[index])}
            onCalendarChange={(val) => updateDateState(val, index)}
            onChange={(val) => selectDate(val, index, city)}
            onOpenChange={(val) => onOpenChange(val, index)}
          />
        </div>
      )),
    [cities, dates, onOpenChange, updateDateState, selectDate, disabledDate]
  );
  console.log(cities);

  return (
    <div className="cities-forms">
      {renderForms}
      <div className="button-row">
        <Button
          className="add-btn"
          icon={<PlusOutlined />}
          onClick={(ev) => {
            dispatch(addCity({ id: cities.length + 1 }));
          }}
        />
      </div>
    </div>
  );
}

export default Cities;
