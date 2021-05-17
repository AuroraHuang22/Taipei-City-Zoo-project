import React, { useState, useEffect } from "react";
import PavilionsMarkers from "./Markers/PavilionsMarker.js";
import FacilitiesMarkers from "./Markers/FacilitiesMarkers.js";
import {
  firebaseAddData,
  firebaseGetData,
  firebaseAddFacilities,
} from "../../Utils/Firebase.js";
import facility from "../../Utils/facilities.json";

function Markers(props) {
  return (
    <>
      <PavilionsMarkers />
      <FacilitiesMarkers facilities={props.facilities} />
    </>
  );
}

export { Markers };
