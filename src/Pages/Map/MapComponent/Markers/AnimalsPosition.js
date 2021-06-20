import React from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { useSelector } from "react-redux";

const ICON_SIZE = [20, 20];
const ICON_ANCHOR = [10, 10];
const DIV_ICON_SIZE = [0, 0];
const DIV_ICON_ANCHOR = [10, 30];

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
              iconSize: DIV_ICON_SIZE,
              iconAnchor: DIV_ICON_ANCHOR,
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
              iconSize: ICON_SIZE,
              iconAnchor: ICON_ANCHOR,
            })
          }
        ></Marker>
      ))}
    </>
  );
}

export default AnimalsPosition;
