import React, { useState, useEffect } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { firebaseAddData, firebaseGetData } from "../../../Utils/Firebase.js";

function PavilionsMarkers() {
  const [pavilions, setPavilions] = useState([]);
  useEffect(() => {
    firebaseGetData("Pavilion").then((data) => {
      setPavilions(data);
    });
  }, []);

  if (!pavilions.length) {
    return null;
  } else if (pavilions.length) {
    return pavilions.map((item, index) => (
      <Marker
        key={index}
        position={item.Geo}
        icon={
          new L.Icon({
            iconUrl: require(`../../../Icons/${item.Name}.svg`).default,
            iconSize: [150, 90],
            iconAnchor: [75, 45],
          })
        }
      ></Marker>
    ));
  }
}

export default PavilionsMarkers;
