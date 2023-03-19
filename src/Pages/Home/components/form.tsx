//react
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//js
import dayjs, { Dayjs } from "dayjs";

//ui
import { Button, Checkbox, Input, Select, message } from "antd";
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
  fetchChartFromForm,
  AppDispatch,
  clearCharts,
} from "../../../store";
import { addReport } from "../../../store/";
import { MessageType } from "../../../enums/messageType";
import { useLocation, useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;

function CityForm() {
  const form = useSelector((store: RootState) => store.form);
  const cities = useSelector((store: RootState) => store.cities);
  const dispatch = useDispatch<AppDispatch>();
  const [canSaveReport, setCanSaveReport] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.loadAllForms) {
      dispatch(clearCharts());
      form.entries.forEach((form) => {
        dispatch(fetchChartFromForm(form));
      });
      navigate(location.pathname, { state: {} });
    }
  }, [dispatch, location, navigate, form]);

  useEffect(() => {
    setCanSaveReport(true);
  }, [form]);

  const [messageApi, contextHolder] = message.useMessage();
  const showMessage = useCallback(
    (message: string, type: MessageType) => {
      switch (type) {
        case MessageType.ERROR:
          messageApi.error(message);
          break;
        case MessageType.SUCCESS:
          messageApi.success(message);
          break;
      }
    },
    [messageApi]
  );

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

  const onSelectDate = useCallback(
    (val: RangeValue, index: number, form: Form) => {
      const updatedForm = {
        ...form,
        dateRange: {
          from: val?.[0]?.format("YYYY-MM-DD"),
          to: val?.[1]?.format("YYYY-MM-DD"),
        },
      };
      dispatch(updateFormEntry(updatedForm));
      dispatch(fetchChartFromForm(updatedForm));
    },
    [dispatch]
  );

  const onSelectCity = useCallback(
    (val: string, form: Form) => {
      const city = cities.filter((city) => city.id === parseInt(val))[0];
      const updatedForm = {
        ...form,
        city: city,
        lat: city.lat,
        long: city.long,
      };
      dispatch(updateFormEntry(updatedForm));
      dispatch(fetchChartFromForm(updatedForm));
    },
    [dispatch, cities]
  );

  const onDateOpenChange = useCallback(
    (open: boolean, index: number) => {
      if (open) {
        updateDateState([null, null], index);
      }
    },
    [updateDateState]
  );

  const onSaveReport = useCallback(() => {
    const now = dayjs();
    dispatch(addReport({ form, creationDate: now.format("YYYY-MM-DD HH:mm") }));
    showMessage("Report Saved", MessageType.SUCCESS);
    setCanSaveReport(false);
  }, [dispatch, form, showMessage]);

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
            onBlur={(ev) =>
              dispatch(
                fetchChartFromForm({
                  ...form,
                  lat: parseFloat(ev.target.value || "0"),
                })
              )
            }
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
            onBlur={(ev) =>
              dispatch(
                fetchChartFromForm({
                  ...form,
                  long: parseFloat(ev.target.value || "0"),
                })
              )
            }
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
            onChange={(val) => onSelectCity(val, form)}
            value={form.city?.id.toString()}
            // onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={cities.map((city) => ({
              label: city.name,
              value: city.id.toString(),
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
            onChange={(val) => onSelectDate(val, index, form)}
            onOpenChange={(val) => onDateOpenChange(val, index)}
          />
        </div>
      )),
    [
      form,
      cities,
      dates,
      onDateOpenChange,
      updateDateState,
      onSelectDate,
      disabledDate,
      dispatch,
      onSelectCity,
    ]
  );

  return (
    <div className="chart-forms">
      {contextHolder}
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
      <div className="button-row">
        <Button
          disabled={!canSaveReport}
          onClick={(ev) => onSaveReport()}
          className="add-btn"
          type="primary"
        >
          Save Report
        </Button>
      </div>
    </div>
  );
}

export default CityForm;
