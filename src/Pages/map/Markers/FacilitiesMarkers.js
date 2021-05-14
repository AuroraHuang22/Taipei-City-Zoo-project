import React, { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { firebaseGetData } from "../../../Utils/Firebase.js";
import svg from "../../../Icons/like-02.svg";

function FacilitiesMarkers() {
  const [facilities, setfacilities] = useState([]);
  useEffect(() => {
    firebaseGetData("Facilities").then((data) => {
      setfacilities(data);
    });
  }, []);

  if (!facilities.length) {
    return null;
  } else if (facilities.length) {
    console.log(facilities);
    return facilities.map((item, index) => (
      <Marker
        key={`fac${item.Index}`}
        position={[item.Geo[1], item.Geo[0]]}
        icon={
          new L.Icon({
            iconUrl: svg,
            iconSize: [5, 5],
            iconAnchor: [2.5, 2.5],
          })
        }
      >
        <Popup>{`${item.Title}+${item.Index}`}</Popup>
      </Marker>
    ));
  }
}

export default FacilitiesMarkers;
