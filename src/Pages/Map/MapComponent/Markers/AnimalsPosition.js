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
          zIndexOffset={901}
          icon={
            new L.divIcon({
              className: "my-div-icon",
              iconSize: [0, 0],
              iconAnchor: [10, 30],
              html: `<span style={{color:"black"}}>${center.num[index]}</span>`,
            })
          }
        ></Marker>
      ))}
      {center.geo.map((item) => (
        <Marker
          key={item[0]}
          position={[item[0], item[1]]}
          zIndexOffset={900}
          icon={
            new L.Icon({
              iconUrl: require(`../../../../Icons/position-02.svg`).default,
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            })
          }
        ></Marker>
      ))}
    </>
  );
}

export default AnimalsPosition;
