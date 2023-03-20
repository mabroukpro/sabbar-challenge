import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, FloatButton, Table } from "antd";
import { ColumnType } from "antd/es/table";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeReports, viewForm } from "../../../store";
import { FormState, RootState } from "../../../store/types";
import { useNavigate } from "react-router-dom";

interface ReportRow {
  id?: string;
  key?: string;
  cities?: string[];
  includedData?: string;
  longAndLat?: string[];
  dateRange?: string[];
  creationDate?: string;
}

function formatIncludedData(form: FormState): string {
  if (form.relativehumidity_2m && form.temperature_2m) {
    return "Temperature & Relative Humidity";
  } else if (form.relativehumidity_2m) {
    return "Relative Himidity Only";
  } else {
    return "Temperature Only";
  }
}

function ReportsTable() {
  const reports = useSelector((state: RootState) => state.reports);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState<ReportRow[]>([]);

  useEffect(() => {
    localStorage.setItem("reports", JSON.stringify(reports.entries));
    console.log("Setting reports!", reports.entries.length);
  }, [reports]);

  const rowsFromReports: ReportRow[] = reports.entries.map((report) => {
    const cities = report.form.entries.map((form) => form.city?.name || "");
    const dateRange = report.form.entries.map((form) =>
      form.dateRange?.from && form.dateRange.to
        ? form.dateRange?.from?.toString() +
          " - " +
          form.dateRange?.to?.toString()
        : ""
    );
    const longAndLat: string[] = report.form.entries.map((form) =>
      form?.long && form.long
        ? form?.long?.toString() + " - " + form?.lat?.toString()
        : ""
    );
    const includedData = formatIncludedData(report.form);
    return {
      id: report.id,
      cities: cities,
      creationDate: report.creationDate,
      dateRange: dateRange,
      includedData: includedData,
      key: report.id?.toString(),
      longAndLat: longAndLat,
    };
  });

  const onDeleteReports = useCallback(() => {
    dispatch(removeReports(selectedRows.map((row) => row.id!)));
  }, [dispatch, selectedRows]);

  const onViewReport = useCallback(
    (id: string) => {
      const index = reports.entries.findIndex((report) => report.id === id);
      navigate("/", { state: { loadAllForms: true } });
      dispatch(viewForm(reports.entries[index].form));
    },
    [dispatch, reports, navigate]
  );

  const columns: ColumnType<ReportRow>[] = [
    {
      title: "Cities",
      dataIndex: "cities",
      key: "cities",
      render: (_: any, record) => {
        return record.cities?.map((city, index) => {
          if (city) {
            return <div key={index}>{city}</div>;
          } else {
            return <div key={index}>Not Set</div>;
          }
        });
      },
    },
    {
      title: "Included Data",
      dataIndex: "includedData",
      key: "includedData",
    },
    {
      title: "Longitude & Latitude",
      dataIndex: "longAndLat",
      key: "longAndLat",
      render: (_: any, record) => {
        return record.longAndLat?.map((longLat, index) => {
          if (longLat) {
            return <div key={index}>{longLat}</div>;
          } else {
            return <div key={index}>Not Set</div>;
          }
        });
      },
    },
    {
      title: "Date Range",
      dataIndex: "dateRange",
      key: "dateRange",
      render: (_: any, record) => {
        return record.dateRange?.map((range, index) => {
          if (range) {
            return <div key={index}>{range}</div>;
          } else {
            return <div key={index}>Not Set</div>;
          }
        });
      },
    },
    {
      title: "Creation Date",
      dataIndex: "creationDate",
      key: "creationDate",
    },

    {
      title: "View",
      dataIndex: "view",
      key: "view",
      render: (_: any, record) => {
        return (
          <Button
            onClick={(ev) => onViewReport(record.id!)}
            icon={<EyeOutlined />}
          />
        );
      },
    },
  ];

  return (
    <>
      {selectedRows.length > 0 && (
        <FloatButton
          tooltip="Delete"
          type="primary"
          icon={<DeleteOutlined />}
          onClick={(ev) => {
            setSelectedRows([]);
            onDeleteReports();
          }}
        />
      )}
      <Table
        columns={columns}
        dataSource={rowsFromReports}
        rowSelection={{
          type: "checkbox",
          onChange: (
            selectedRowKeys: React.Key[],
            selectedRows: ReportRow[]
          ) => {
            setSelectedRows(selectedRows);
          },
          getCheckboxProps: (record: ReportRow) => ({
            name: record.key,
          }),
        }}
      />
    </>
  );
}

export default ReportsTable;
