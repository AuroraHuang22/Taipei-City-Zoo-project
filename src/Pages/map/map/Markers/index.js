import React from "react";
import PavilionsMarkers from "./PavilionsMarker.js";
import FacilitiesMarkers from "./FacilitiesMarkers.js";

function Markers(props) {
  return (
    <>
      <PavilionsMarkers />
      <FacilitiesMarkers facilities={props.facilities} />
    </>
  );
}

export { Markers };
