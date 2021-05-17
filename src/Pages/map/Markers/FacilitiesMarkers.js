import React, { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

function FacilitiesMarkers(props) {
  const [facilitiesData, setFacilitiesData] = useState([]);
  const [showFacilities, setShowFacilities] = useState([]);

  useEffect(() => {
    props.facilities.then((data) => {
      setFacilitiesData(data);
    });
  }, []);

  let localStorageData = Object.entries(localStorage);

  useEffect(() => {
    setShowFacilities(localStorageData);
  }, []);

  if (!facilitiesData.length) {
    return null;
  }

  return facilitiesData.map((item) =>
    showFacilities.map((fac) => {
      if (item.Item === fac[0]) {
        return (
          <Marker
            key={`fac${item.Index}`}
            position={[item.Geo[1], item.Geo[0]]}
            icon={
              new L.Icon({
                iconUrl: require("../../../Icons/like-02.svg").default,
                iconSize: [5, 5],
                iconAnchor: [2.5, 2.5],
              })
            }
          >
            <Popup>{`${item.Title}+${item.Index}`}</Popup>
          </Marker>
        );
      } else {
        return null;
      }
    })
  );
}

export default FacilitiesMarkers;
