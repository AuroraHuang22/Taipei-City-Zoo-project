import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  useMapEvent,
  useMap,
  Marker,
} from "react-leaflet";
import { useSelector } from "react-redux";
import { Markers } from "./Markers";
import Routing from "./RouteMaching";
import MapInformation from "./MapInformation";
import styled from "styled-components";
import Popup from "reactjs-popup";

const setBounds = [
  [25.000263, 121.57700905],
  [24.99028, 121.5936458],
];
const position = [24.995737380116395, 121.58511339231346];

const Container = styled.div`
  display: flex;
  overflow: "hidden";
  justify-content: center;
  align-items: center;
  padding: 0 20px 10px;
  width: 65%;
  max-width: 1260px;
  height: calc(100vh - 90px);
  position: relative;
  .findMe {
    position: absolute;
    top: 80px;
    left: 50px;
    width: 34px;
    height: 34px;
    background-color: white;
    border: 1px solid #acacac;
    border-radius: 5px;
    color: #acacac;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 20px;
    font-weight: 500;
    z-index: 1100;
    :hover {
      border: 1px solid #ea7a60;
      background-color: white;
      color: #ea7a60;
    }
  }
  @media (max-width: 1024px) {
    box-sizing: border-box;
    padding: 0px 40px 0;
    width: 100%;
    height: 60vh;
    margin-bottom: 40px;
  }
  @media (max-width: 576px) {
    box-sizing: border-box;
    padding: 0px 10px 0;
    width: 100%;
    height: 40vh;
    margin-bottom: 40px;
    .findMe {
      top: calc(100% - 50px);
      left: calc(100% - 100px);
      transform: translate(-50%, -50%);
    }
    .infoBtn {
      position: absolute;
      top: calc(100% - 50px);
      left: calc(100% - 50px);
      transform: translate(-50%, -50%);
      width: 34px;
      height: 34px;
      background-color: white;
      border: 1px solid #acacac;
      border-radius: 5px;
      color: #acacac;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 20px;
      font-weight: 500;
      z-index: 1100;
    }
  }
`;

const Map = React.forwardRef((props, ref) => {
  const [findMe, setFindMe] = useState(false);
  const [myPosition, setMyPosition] = useState(null);
  const [open, setOpen] = useState(false);
  const [displayDiv, setDisplayDiv] = useState("none");
  const route = useSelector((state) => state.AnimalsReducer.visitRoute);
  const center = useSelector((state) => state.AnimalsReducer.showAnimals);
  const isRowMD = window.matchMedia("(max-width: 1020px)").matches;
  const isRowSM = window.matchMedia("(max-width: 576px)").matches;
  const displayStore = useSelector(
    (state) => state.AnimalsReducer.disPlayforFacility
  );

  function ClickEvent() {
    useMapEvents({
      click: (e) => {
        console.log(e.latlng);
      },
    });
    return null;
  }

  function LocationMarker() {
    const map = useMap();
    map.locate();
    useMapEvent("locationfound", (e) => {
      setMyPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
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
      map.setView([24.99618104901287, 121.58475738017984], 16.5);
    }

    return null;
  };

  useEffect(() => {
    if (displayStore) {
      setDisplayDiv("block");
    }
  }, [displayStore]);

  return (
    <Container id="mapDD" ref={ref}>
      <button
        className="findMe"
        style={{ display: isRowMD ? displayDiv : "none" }}
        onClick={() => {
          setFindMe(true);
        }}
      >
        ⦿
      </button>
      <MapContainer
        center={position}
        zoom={isRowMD ? 16.5 : 16}
        minZoom={isRowMD ? null : 16.5}
        maxBounds={isRowMD ? null : setBounds}
        scrollWheelZoom={isRowMD ? false : true}
        style={{
          fontSize: "5px",
          height: "100%",
          width: "100%",
        }}
      >
        <ClickEvent />
        {findMe ? (
          <>
            <LocationMarker />
            {myPosition === null ? null : <Marker position={myPosition} />}
          </>
        ) : null}
        <FitCenter />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> , Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url="https://api.mapbox.com/styles/v1/aurorahuang/ckol9o1wg11vf19n1nl0o5x2m/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXVyb3JhaHVhbmciLCJhIjoiY2tva3ZmeXVnMDlhMjJ4cm12enM1OXhycCJ9.kyUwDjf4VLFBZPZrN2nijQ"
        />
        <Routing />
        {isRowSM ? (
          <>
            <button
              className="infoBtn"
              style={{ display: isRowMD ? displayDiv : "none" }}
              onClick={() => {
                setOpen(true);
              }}
            >
              💡
            </button>
            <Popup
              open={open}
              closeOnDocumentClick
              onClose={() => {
                setOpen(false);
              }}
              overlayStyle={{
                background: "rgba(255, 255, 255, 0.7)",
                zIndex: 1200,
              }}
              contentStyle={{
                position: "relative",
                margin: "auto",
                boxSizing: "border-box",
                background: "#ececee",
                width: "680px",
                maxWidth: "90vw",
                padding: 0,
                borderRadius: "10px",
                border: "none",
              }}
            >
              <MapInformation />
            </Popup>
          </>
        ) : (
          <MapInformation />
        )}
        <Markers facilities={props.facilities} />
      </MapContainer>
    </Container>
  );
});

export default Map;
