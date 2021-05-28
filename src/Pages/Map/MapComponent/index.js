import React from "react";
import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import { Markers } from "./Markers";
import Routing from "./RouteMaching";
import MapInformation from "./MapInformation";
import styled from "styled-components";

const setBounds = [
  [25.000263, 121.57700905],
  [24.99028, 121.5936458],
];
const position = [24.995737380116395, 121.58388671931453];

const Container = styled.div`
  display: flex;
  overflow: "hidden";
  justify-content: center;
  align-items: center;

  width: 1260px;
  height: 900px;
  position: relative;
`;

const Map = React.forwardRef((props, ref) => {
  const route = useSelector((state) => state.AnimalsReducer.visitRoute);
  const center = useSelector((state) => state.AnimalsReducer.showAnimals);

  function ClickEvent() {
    useMapEvents({
      click: (e) => {
        console.log(e.latlng);
      },
    });
    return null;
  }

  const FitCenter = (animateRef) => {
    const map = useMap();

    if (!route.length && center.geo.length) {
      map.setView(
        [
          center.geo[center.geo.length - 1][0],
          center.geo[center.geo.length - 1][1],
        ],
        16.8
      );
    } else if (route.length && center.geo.length) {
      map.setView([24.995457487742257, 121.58546700607988], 16.5);
    }

    return null;
  };

  return (
    <Container id="mapDD" ref={ref}>
      <MapContainer
        center={position}
        zoom={16}
        minZoom={16.5}
        maxBounds={setBounds}
        scrollWheelZoom={true}
        style={{
          fontSize: "5px",
          height: "90%",
          width: "100%",
        }}
      >
        <ClickEvent />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> , Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url="https://api.mapbox.com/styles/v1/aurorahuang/ckol9o1wg11vf19n1nl0o5x2m/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXVyb3JhaHVhbmciLCJhIjoiY2tva3ZmeXVnMDlhMjJ4cm12enM1OXhycCJ9.kyUwDjf4VLFBZPZrN2nijQ"
        />
        <Routing />
        <FitCenter />
        <MapInformation />
        <Markers facilities={props.facilities} />
      </MapContainer>
    </Container>
  );
});

export default Map;
