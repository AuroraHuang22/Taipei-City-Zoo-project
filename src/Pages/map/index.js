import React from "react";
import Map from "../map/map";
import Animals from "./animal";
import { firebaseGetData } from "../../Utils/Firebase";
import animalsJson from "../../Utils/animals.json";
import facilitiesJson from "../../Utils/facilities.json";

// let FacilitiesData = firebaseGetData("Facilities");
let AnimalsData = animalsJson;
let Facilitiesjson = facilitiesJson;

function MapIndex() {
  return (
    <div className="App" style={{ display: "flex", flexDirection: "row" }}>
      <Animals facilities={Facilitiesjson} animal={AnimalsData} />
      <Map facilities={Facilitiesjson} />
    </div>
  );
}

export default MapIndex;
