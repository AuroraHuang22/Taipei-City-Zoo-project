import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import svg from "../../icons/like-02.svg";

const position = [24.996, 121.585];

function Markers() {
  const iconPerson = new L.Icon({
    iconUrl: svg,
    iconSize: [15, 15],
    iconAnchor: [7.5, 7.5],
  });

  return <Marker key={5} position={position} icon={iconPerson}></Marker>;
}

export default Markers;
