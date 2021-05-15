import React, { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
// import { firebaseGetData } from "../../../Utils/Firebase.js";
import svg from "../../../Icons/like-02.svg";

function FacilitiesMarkers(props) {
  const [facilitiesData, setFacilitiesData] = useState([]);
  useEffect(() => {
    props.facilities.then((data) => {
      setFacilitiesData(data);
    });
  }, []);

  if (!facilitiesData.length) {
    return null;
  } else if (facilitiesData.length) {
    return facilitiesData.map((item) => (
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
