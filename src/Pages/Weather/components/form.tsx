//react
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//js
import dayjs, { Dayjs } from "dayjs";

//ui
import { Button, Checkbox, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

//store
import { Form, RangeValue, RootState } from "../../../store/types";
import {
  addForm,
  updateFormEntry,
  toggleTemp,
  toggleRelativeHumidity,
} from "../../../store";

const { RangePicker } = DatePicker;

function CityForm() {
  const form = useSelector((store: RootState) => store.form);
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
    (val: RangeValue, index: number, form: Form) => {
      dispatch(
        updateFormEntry({
          ...form,
          dateRange: {
            from: val?.[0]?.format("YYYY-MM-DD"),
            to: val?.[1]?.format("YYYY-MM-DD"),
          },
        })
      );
    },
    [dispatch]
  );

  const selectCity = useCallback(
    (val: string, form: Form) => {
      const city = cities.filter((city) => city.id === parseInt(val))[0];
      dispatch(
        updateFormEntry({
          ...form,
          lat: city.lat,
          long: city.long,
        })
      );
    },
    [dispatch, cities]
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
      form.entries.map((form, index) => (
        <div className="city-form" key={form.id}>
          <Input
            className="lat-long-input"
            placeholder="Latitude"
            title="Latitude"
            type="number"
            value={form.lat}
            onChange={(ev) =>
              dispatch(
                updateFormEntry({
                  ...form,
                  lat: parseFloat(ev.target.value || "0"),
                })
              )
            }
          />
          <Input
            className="lat-long-input"
            type="number"
            placeholder="Latitude"
            value={form.long}
            onChange={(ev) =>
              dispatch(
                updateFormEntry({
                  ...form,
                  long: parseFloat(ev.target.value || "0"),
                })
              )
            }
            title="Latitude"
          />
          <Select
            className="city-select"
            showSearch
            placeholder="Select a City"
            optionFilterProp="children"
            onChange={(val) => selectCity(val, form)}
            // onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={cities.map((city) => ({
              label: city.name,
              value: city.id,
            }))}
          />
          <RangePicker
            className="date-range-picker"
            value={
              form.dateRange
                ? [dayjs(form.dateRange?.from), dayjs(form.dateRange?.to)]
                : dates[index]
            }
            disabledDate={(current) => disabledDate(current, dates[index])}
            onCalendarChange={(val) => updateDateState(val, index)}
            onChange={(val) => selectDate(val, index, form)}
            onOpenChange={(val) => onOpenChange(val, index)}
          />
        </div>
      )),
    [
      form,
      cities,
      dates,
      onOpenChange,
      updateDateState,
      selectDate,
      disabledDate,
      dispatch,
      selectCity,
    ]
  );
  console.log(form);

  return (
    <div className="weather-forms">
      {renderForms}
      <div className="button-row">
        <Button
          className="add-btn"
          icon={<PlusOutlined />}
          onClick={(ev) => {
            dispatch(addForm({ id: form.entries.length + 1 }));
          }}
        />
      </div>
      <div className="checkboxes-row">
        <Checkbox
          checked={form.temperature_2m}
          onChange={(ev: CheckboxChangeEvent) =>
            dispatch(toggleTemp(ev.target.checked))
          }
        >
          Temperature
        </Checkbox>
        <Checkbox
          checked={form.relativehumidity_2m}
          onChange={(ev: CheckboxChangeEvent) =>
            dispatch(toggleRelativeHumidity(ev.target.checked))
          }
        >
          Relative Humidity
        </Checkbox>
      </div>
    </div>
  );
}

export default CityForm;
