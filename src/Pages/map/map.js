import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import { Markers } from "./markers";
import Routing from "./leafletRouteMaching";

const setBounds = [
  [25.000263, 121.57700905],
  [24.99028, 121.5936458],
];
const position = [24.996554, 121.583322];

function Map(props) {
  function ClickEvent() {
    useMapEvents({
      click: (e) => {
        console.log(e.latlng);
      },
    });
    return null;
  }

  function Findme() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click: () => {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });
    return position === null ? null : (
      <Marker
        position={position}
        icon={
          new L.Icon({
            iconUrl: require(`../../icons/like-02.svg`).default,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          })
        }
      >
        <Popup> You are here</Popup>
      </Marker>
    );
  }

  return (
    <MapContainer
      center={position}
      zoom={16}
      minZoom={16.5}
      maxBounds={setBounds}
      scrollWheelZoom={true}
      style={{
        height: "100vh",
        width: "70vw",
        position: "absolute",
        top: 0,
        right: 0,
      }}
    >
      <ClickEvent />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> , Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url="https://api.mapbox.com/styles/v1/aurorahuang/ckol9o1wg11vf19n1nl0o5x2m/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXVyb3JhaHVhbmciLCJhIjoiY2tva3ZmeXVnMDlhMjJ4cm12enM1OXhycCJ9.kyUwDjf4VLFBZPZrN2nijQ"
      />
      <Routing />
      <Markers facilities={props.facilities} />
    </MapContainer>
  );
}

export default Map;
