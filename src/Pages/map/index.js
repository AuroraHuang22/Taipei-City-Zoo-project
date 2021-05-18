import React, { useState, useEffect } from "react";
import Map from "./map";
import Animals from "./animals";
import { firebaseGetData } from "../../Utils/Firebase";

function MapIndex() {
  return (
    <div className="App" style={{ display: "flex", flexDirection: "row" }}>
      <Animals facilities={firebaseGetData("Facilities")} />
      <Map facilities={firebaseGetData("Facilities")} />
    </div>
  );
}

export default MapIndex;
