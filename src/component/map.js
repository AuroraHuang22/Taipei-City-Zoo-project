import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const setBounds = [
  [25.002, 121.572],
  [24.989, 121.597],
];
const position = [24.996, 121.585];

function Map() {
  const [markers, setMarkers] = useState([]);

  const addMarker = (e) => {
    const newMarker = markers;
    newMarker.push(e.latlng);
    setMarkers.setState(newMarker);
  };

  return (
    <MapContainer
      center={position}
      zoom={16.7}
      minZoom={16.7}
      maxBounds={setBounds}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100vw" }}
      onClick={addMarker}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> , Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url="https://api.mapbox.com/styles/v1/aurorahuang/ckol9o1wg11vf19n1nl0o5x2m/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXVyb3JhaHVhbmciLCJhIjoiY2tva3ZmeXVnMDlhMjJ4cm12enM1OXhycCJ9.kyUwDjf4VLFBZPZrN2nijQ"
      />
      <Marker key={`5`} position={position}></Marker>
    </MapContainer>
  );
}

export default Map;
