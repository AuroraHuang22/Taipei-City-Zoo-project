import React, { useState, useEffect } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { firebaseGetData } from "../../../../Utils/Firebase.js";

let pavilionData = firebaseGetData("Pavilion");

function PavilionsMarkers() {
  const [pavilions, setPavilions] = useState([]);
  useEffect(() => {
    pavilionData.then((data) => {
      setPavilions(data);
    });
  }, []);

  if (!pavilions.length) {
    return null;
  } else if (pavilions.length) {
    return pavilions.map((item, index) => (
      <Marker
        style={{ cursor: "none" }}
        key={index}
        position={item.Geo}
        eventHandlers={{
          mouseover: (e) => {},
        }}
        icon={
          new L.Icon({
            iconUrl: require(`../../../../icons/${item.Name}.svg`).default,
            iconSize: [150, 90],
            iconAnchor: [75, 45],
          })
        }
      ></Marker>
    ));
  }
}

export default PavilionsMarkers;
