import React, { useState, useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { Markers } from "./Markers.js";

const setBounds = [
  [25.000263, 121.57700905],
  [24.99028, 121.5936458],
];

const position = [24.996554, 121.583322];

function ClickEvent() {
  useMapEvents({
    click: (e) => {
      console.log(e.latlng);
    },
  });
  return null;
}

function Map() {
  return (
    <MapContainer
      center={position}
      zoom={16}
      minZoom={16.5}
      maxBounds={setBounds}
      scrollWheelZoom={true}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        height: "100vh",
        width: "60vw",
      }}
    >
      <ClickEvent />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> , Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url="https://api.mapbox.com/styles/v1/aurorahuang/ckol9o1wg11vf19n1nl0o5x2m/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXVyb3JhaHVhbmciLCJhIjoiY2tva3ZmeXVnMDlhMjJ4cm12enM1OXhycCJ9.kyUwDjf4VLFBZPZrN2nijQ"
      />
      <Markers />
    </MapContainer>
  );
}

export default Map;
