import React from "react";
import Map from "../map/map";
import Animals from "./animal";
import { firebaseGetData } from "../../Utils/Firebase";

function MapIndex() {
  return (
    <div className="App" style={{ display: "flex", flexDirection: "row" }}>
      <Animals
        facilities={firebaseGetData("Facilities")}
        animal={firebaseGetData("Animals")}
      />
      <Map facilities={firebaseGetData("Facilities")} />
    </div>
  );
}

export default MapIndex;
