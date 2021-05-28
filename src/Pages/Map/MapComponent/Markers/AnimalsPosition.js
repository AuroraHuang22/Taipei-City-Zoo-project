import React from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { useSelector } from "react-redux";

function AnimalsPosition(props) {
  const center = useSelector((state) => state.AnimalsReducer.showAnimals);
  return (
    <>
      {center.geo.map((item, index) => (
        <Marker
          key={item[0]}
          position={[item[0], item[1]]}
          icon={
            new L.divIcon({
              className: "my-div-icon",
              iconSize: [0, 0],
              iconAnchor: [0, -3],
              html: `<span>${center.num[index]}</span>`,
            })
          }
        ></Marker>
      ))}
      {center.geo.map((item) => (
        <Marker
          key={item[0]}
          position={[item[0], item[1]]}
          icon={
            new L.Icon({
              iconUrl: require(`../../../../Icons/star.svg`).default,
              iconSize: [10, 10],
              iconAnchor: [5, 5],
            })
          }
        ></Marker>
      ))}
    </>
  );
}

export default AnimalsPosition;
