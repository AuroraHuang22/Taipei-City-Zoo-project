import React, { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";
import L from "leaflet";

function FacilitiesMarkers(props) {
  const [facilitiesData, setFacilitiesData] = useState([]);
  const store = useSelector((state) => state.showFacilities);

  useEffect(() => {
    props.facilities.then((data) => {
      setFacilitiesData(data);
    });
  }, []);

  if (!facilitiesData.length) {
    return null;
  }

  return facilitiesData.map((item) =>
    store.map((fac) =>
      item.Item === fac ? (
        <Marker
          key={`fac${item.Index}`}
          position={[item.Geo[1], item.Geo[0]]}
          icon={
            new L.Icon({
              iconUrl: require(`../../../Icons/like-02.svg`).default,
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            })
          }
        >
          <Popup>
            {item.Title}
            <br />
            <br />
            {item.Summary}
          </Popup>
        </Marker>
      ) : null
    )
  );
}

export default FacilitiesMarkers;
