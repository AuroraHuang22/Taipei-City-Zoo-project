import React from "react";
import Map from "../map/map";
import Animals from "./animal";
// import { firebaseGetData } from "../../Utils/Firebase";
import AnimalsJson from "../../Utils/animals.json";
import FacilitiesJson from "../../Utils/facilities.json";
import RouteJson from "../../Utils/route.json";

// let FacilitiesData = firebaseGetData("Facilities");

function MapIndex() {
  return (
    <div className="App" style={{ display: "flex", flexDirection: "row" }}>
      <Animals
        facilities={FacilitiesJson}
        animal={AnimalsJson}
        route={RouteJson}
      />
      <Map facilities={FacilitiesJson} />
    </div>
  );
}

export default MapIndex;
