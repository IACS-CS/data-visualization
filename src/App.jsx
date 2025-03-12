import { useEffect, useState } from "react";
import papa from "papaparse";
import "./App.css";

import { dataSources, dataVisualizations } from "./data";

const App = () => {
  const [dataSets, setDataSets] = useState(dataSources);

  const getData = async (key) => {
    let source = dataSets[key];
    let url = source.url;
    let response = await fetch(url);
    let text = await response.text();
    let parsed = await papa.parse(text, { header: true });
    let newDataSource = { ...source, data: parsed.data };
    setDataSets({ ...dataSets, [key]: newDataSource });
  };
  useEffect(() => console.log("Data:", dataSets), [dataSets]);

  const renderVisualizations = (key) => {
    let data = dataSets[key].data;
    console.log("Got data:", data, "for key", key);
    if (data) {
      let visualizations = [];
      for (let render of dataVisualizations[key]) {
        try {
          visualizations.push(render(data));
        } catch (err) {
          console.error("Error rendering visualization:", err);
          visualizations.push(
            <p style={{ color: "red" }}>
              Error rendering visualization: {err.message}
            </p>
          );
        }
      }
      return visualizations;
    } else {
      return <p>No data yet</p>;
    }
  };

  return (
    <main style={{ maxWidth: 800, margin: "auto" }}>
      <h1>Data Visualization</h1>
      {Object.entries(dataSets).map(([key, source]) => (
        <section key={key}>
          <h2>{source.name}</h2>
          {!source.data && (
            <button onClick={() => getData(key)}>Load Data</button>
          )}
          {renderVisualizations(key)}
        </section>
      ))}
    </main>
  );
};

export default App;
