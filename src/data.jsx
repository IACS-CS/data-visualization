import {
  renderBarChart,
  renderPieChart,
  renderDataTable,
  renderScatterChart,
  renderLineChart,
} from "./graphs";

export const dataSources = {
  colorDemo: {
    url: "/data/colorDemo.csv",
    name: "Colors",
  },
  scatterDemo: {
    url: "/data/scatterDemo.csv",
    name: "Fake Scatter Data",
  },
};

const makeColorPie = (data) => {
  let colorCounts = {};
  for (let row of data) {
    if (colorCounts[row["Favorite Color"]]) {
      colorCounts[row["Favorite Color"]] += 1;
    } else {
      colorCounts[row["Favorite Color"]] = 1;
    }
  }
  let pieData = [];
  for (let color in colorCounts) {
    pieData.push({
      name: color,
      value: colorCounts[color],
      color: color.toLowerCase(),
    });
  }
  return pieData;
};

const makeScatterLine = (data) => {
  let scatterData = [];
  for (let row of data) {
    scatterData.push({
      x: row["100 Yard Dash Time"],
      y: row["APCSP Score"],
      label: row.Name,
    });
  }
  return scatterData;
};

export const dataVisualizations = {
  colorDemo: [
    (data) => renderBarChart(makeColorPie(data), 800, 400),
    (data) => renderPieChart(makeColorPie(data), 500, 500),
    (data) =>
      renderDataTable(data, [
        "Name",
        "Age",
        "Favorite Color",
        "Favorite Sport",
      ]),
  ],
  scatterDemo: [
    (data) =>
      renderScatterChart(
        makeScatterLine(data),
        "100 Yard Dash Time",
        "APCSP Score",
        800,
        400
      ),
    (data) =>
      renderDataTable(data, ["Name", "100 Yard Dash Time", "APCSP Score"]),
  ],
  all: [({ scatterDemo, colorDemo }) => <p>Fix me</p>],
};
