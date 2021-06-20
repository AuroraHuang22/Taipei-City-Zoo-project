import React, { useState, useEffect } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { firebaseGetData } from "../../../../Utils/firebase.js";

const pavilionData = firebaseGetData("Pavilion");
const ICON_SIZE = [167, 100];
const ICON_ANCHOR = [83.5, 60];

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
            iconUrl: require(`../../../../Icons/${item.Name}.svg`).default,
            iconSize: ICON_SIZE,
            iconAnchor: ICON_ANCHOR,
          })
        }
      ></Marker>
    ));
  }
}

export default PavilionsMarkers;
