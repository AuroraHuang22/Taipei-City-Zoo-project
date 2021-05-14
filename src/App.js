import React from "react";
import Map from "./Pages/Map/Map.js";

function App() {
  return (
    <div className="App" style={{ display: "flex", flexDirection: "row" }}>
      <div
        style={{
          width: "40vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        maybe a click button?
      </div>
      <Map />
    </div>
  );
}

export default App;
