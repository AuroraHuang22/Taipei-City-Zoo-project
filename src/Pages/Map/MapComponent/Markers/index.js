import React from "react";
import PavilionsMarkers from "./PavilionsMarker.js";
import FacilitiesMarkers from "./FacilitiesMarkers.js";
import AnimalsPosition from "./AnimalsPosition";

function Markers(props) {
  return (
    <>
      <AnimalsPosition />
      <PavilionsMarkers />
      <FacilitiesMarkers facilities={props.facilities} />
    </>
  );
}

export { Markers };
