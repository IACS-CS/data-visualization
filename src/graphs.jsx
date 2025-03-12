import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  LabelList,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

/**
 * Renders a PieChart component with the provided data.
 *
 * @param {Array} pieData - An array of objects representing the pie chart data. Each object should have 'name' and 'value' fields and optionally a 'color' field.
 * @param {number} [width=300] - The width of the PieChart component.
 * @param {number} [height=300] - The height of the PieChart component.
 * @returns {JSX.Element|null} The rendered PieChart component or null if the data array is empty.
 * @throws {Error} If pieData is not an array or if the objects in the array do not have 'name' and 'value' fields.
 */
export const renderPieChart = (pieData, width = 300, height = 300) => {
  if (!Array.isArray(pieData)) {
    throw new Error("Expected an array of objects");
  } else if (pieData.length === 0) {
    return null;
  } else if (pieData[0].name === undefined || pieData[0].value === undefined) {
    throw new Error("Expected objects with 'name' and 'value' fields");
  }
  return (
    <PieChart width={width} height={height}>
      <Pie data={pieData} dataKey="value" nameKey="name" label fill="yellow">
        <LabelList dataKey="name" position="middle" />
        {pieData.map((entry) => (
          <Cell key={entry.name} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
};

/**
 * Renders a BarChart component with the provided data.
 *
 * @param {Array} barData - An array of objects representing the bar chart data. Each object should have 'name' and 'value' fields and optionally a 'color' field.
 * @param {number} [width=300] - The width of the PieChart component.
 * @param {number} [height=300] - The height of the PieChart component.
 * @returns {JSX.Element|null} The rendered PieChart component or null if the data array is empty.
 * @throws {Error} If pieData is not an array or if the objects in the array do not have 'name' and 'value' fields.
 */
export const renderBarChart = (barData, width = 300, height = 300) => {
  if (!Array.isArray(barData)) {
    throw new Error("Expected an array of objects");
  } else if (barData.length === 0) {
    return null;
  } else if (barData[0].name === undefined || barData[0].value === undefined) {
    throw new Error("Expected objects with 'name' and 'value' fields");
  }
  return (
    <BarChart width={width} height={height} data={barData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value">
        {barData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color || "#8884d8"} />
        ))}
      </Bar>
    </BarChart>
  );
};

/**
 * Renders a LineChart component with the provided data.
 *
 * @param {Array} lineData - An array of objects representing the line chart data. Each object should have 'x' and 'y' fields.
 * @param {string} xAxisLabel - Label for the X axis
 * @param {string} yAxisLabel - Label for the Y axis
 * @param {number} [width=600] - The width of the LineChart component.
 * @param {number} [height=300] - The height of the LineChart component.
 * @returns {JSX.Element|null} The rendered LineChart component or null if the data array is empty.
 * @throws {Error} If lineData is not an array or if the objects don't have required fields.
 */
export const renderLineChart = (
  lineData,
  xAxisLabel,
  yAxisLabel,
  width = 600,
  height = 300
) => {
  if (!Array.isArray(lineData)) {
    throw new Error("Expected an array of objects");
  } else if (lineData.length === 0) {
    return null;
  } else if (lineData[0].x === undefined || lineData[0].y === undefined) {
    throw new Error("Expected objects with 'x' and 'y' fields");
  }

  return (
    <LineChart
      width={width}
      height={height}
      data={lineData}
      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
    >
      <XAxis
        dataKey="x"
        type="number"
        label={{ value: xAxisLabel, position: "insideBottomRight", offset: -5 }}
      />
      <YAxis
        label={{ value: yAxisLabel, angle: -90, position: "insideLeft" }}
      />
      <Tooltip
        content={({ active, payload }) => {
          if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
              <div
                className="custom-tooltip"
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                <p
                  className="label"
                  style={{ margin: "0 0 5px", fontWeight: "bold" }}
                >
                  {data.label || `Point at x=${data.x}`}
                </p>
                <p style={{ margin: "0" }}>{`${xAxisLabel}: ${data.x}`}</p>
                <p style={{ margin: "0" }}>{`${yAxisLabel}: ${data.y}`}</p>
              </div>
            );
          }
          return null;
        }}
      />
      <Line
        type="monotone"
        dataKey="y"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
        strokeWidth={2}
        dot={{ stroke: "#8884d8", strokeWidth: 2, fill: "white", r: 4 }}
      />
    </LineChart>
  );
};

/**
 * Renders a ScatterChart component with the provided data.
 *
 * @param {Array} scatterData - An array of objects with 'x', 'y', and optional 'label' properties.
 * @param {string} xAxisLabel - Label for the X axis
 * @param {string} yAxisLabel - Label for the Y axis
 * @param {number} [width=600] - The width of the ScatterChart component.
 * @param {number} [height=300] - The height of the ScatterChart component.
 * @returns {JSX.Element|null} The rendered ScatterChart component or null if the data array is empty.
 * @throws {Error} If scatterData is not an array or if the objects in the array do not have 'x' and 'y' fields.
 */
export const renderScatterChart = (
  scatterData,
  xAxisLabel,
  yAxisLabel,
  width = 600,
  height = 300
) => {
  if (!Array.isArray(scatterData)) {
    throw new Error("Expected an array of objects");
  } else if (scatterData.length === 0) {
    return null;
  } else if (scatterData[0].x === undefined || scatterData[0].y === undefined) {
    throw new Error("Expected objects with 'x' and 'y' fields");
  }

  return (
    <ScatterChart
      width={width}
      height={height}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    >
      <XAxis
        type="number"
        dataKey="x"
        name={xAxisLabel}
        label={{ value: xAxisLabel, position: "insideBottomRight", offset: -5 }}
      />
      <YAxis
        type="number"
        dataKey="y"
        name={yAxisLabel}
        label={{ value: yAxisLabel, angle: -90, position: "insideLeft" }}
      />
      <Tooltip
        cursor={{ strokeDasharray: "3 3" }}
        content={({ active, payload }) => {
          if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
              <div
                className="custom-tooltip"
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                <p
                  className="label"
                  style={{ margin: "0 0 5px", fontWeight: "bold" }}
                >
                  {data.label || `Point at x=${data.x}`}
                </p>
                <p style={{ margin: "0" }}>{`${xAxisLabel}: ${data.x}`}</p>
                <p style={{ margin: "0" }}>{`${yAxisLabel}: ${data.y}`}</p>
              </div>
            );
          }
          return null;
        }}
      />
      <Scatter
        name="Data Points"
        data={scatterData}
        fill="#8884d8"
        shape="circle"
      />
    </ScatterChart>
  );
};

const DataTable = ({ fields, data, pageSize = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data.length);
  const currentData = data.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {fields.map((field, index) => (
              <th key={index}>{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "even-row" : "odd-row"}
            >
              {fields.map((field, fieldIndex) => (
                <td key={fieldIndex}>{row[field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            &laquo; Previous
          </button>

          <div className="pagination-info">
            Page {currentPage} of {totalPages}
            <span className="pagination-summary">
              (Showing {startIndex + 1}-{endIndex} of {data.length})
            </span>
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
};

export const renderDataTable = (data, fields, pageSize = 20) => {
  return <DataTable data={data} fields={fields} pageSize={pageSize} />;
};
