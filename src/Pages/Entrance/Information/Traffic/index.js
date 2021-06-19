import React, { useState, useEffect } from "react";
import Parks from "../../../../Utils/tcmsv_park.json";
import * as api from "../../../../Utils/api";
import Popup from "reactjs-popup";
import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import ParkingStatus from "./ParkingStatus";
import ParkingStatusPopup from "./ParkingStatusPopup";
import { Container } from "./style";

export default function Traffic() {
  const [parkStatus, setParkStatus] = useState(null);
  const [parkName, setParkName] = useState(null);
  const [parkId, setParkId] = useState(null);
  const [open, setOpen] = useState(false);
  const position = [24.99773326108165, 121.5834263898432];
  const parksId = ["115", "046", "101", "202"];
  const parks = Parks.data.park;
  const isRowBased = window.matchMedia("(max-width: 1020px)").matches;
  const getParkingData = () => {
    const stauts = parkStatus.park.filter((parks) =>
      parksId.includes(parks.id)
    );
    return stauts;
  };

  useEffect(() => {
    api.getParksStatus().then((data) => setParkStatus(data.data));
  }, [parkId]);

  if (!parkStatus) {
    return null;
  }

  const status = getParkingData();
  return (
    <>
      <Container>
        <div className="traffic-block">
          <div className="header pd-30">停車資訊</div>
          <div className="header-md-orange">周邊停車資訊</div>
          <span>河川地停車場</span>
          <span>動物園站地下停車場</span>
          <span>捷運木柵機廠停車場</span>
          <span>木柵站轉乘停車場</span>
          <span className="text">點擊地圖中停車場的位置，查看停車位資訊。</span>
        </div>
        <div className="map-container">
          <MapContainer
            center={position}
            zoom={15.2}
            setBounds={
              ([25.003615970747212, 121.5642151547959],
              [24.991279127890376, 121.5948277740565])
            }
            scrollWheelZoom={true}
            style={{
              height: isRowBased ? "50vh" : "70vh",
              width: "100%",
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> , Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
              url="https://api.mapbox.com/styles/v1/aurorahuang/ckp54g8f60ll018n0vc38mv2p/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXVyb3JhaHVhbmciLCJhIjoiY2tva3ZmeXVnMDlhMjJ4cm12enM1OXhycCJ9.kyUwDjf4VLFBZPZrN2nijQ"
            />
            {parks.map((item) => (
              <Marker
                eventHandlers={{
                  click: (e) => {
                    setParkId(item.id);
                    setParkName(item.name);
                    if (isRowBased) {
                      setOpen(true);
                    }
                  },
                }}
                key={item.id}
                position={item.EntrancecoordInfo}
                icon={
                  new L.Icon({
                    iconUrl: require(`../../../../Icons/park.svg`).default,
                    iconSize: [40, 40],
                    iconAnchor: [20, 20],
                  })
                }
              ></Marker>
            ))}
            <ParkingStatus
              parkId={parkId}
              status={status}
              parkName={parkName}
              parks={parks}
              parkStatus={parkStatus}
            />
          </MapContainer>
        </div>
      </Container>
      <Popup
        open={open}
        closeOnDocumentClick
        onClose={() => {
          setOpen(false);
        }}
        overlayStyle={{ background: "rgba(0, 0, 0, 0.8)", zIndex: 1200 }}
        contentStyle={{
          position: "relative",
          margin: "auto",
          boxSizing: "border-box",
          background: "#fff",
          width: "680px",
          maxWidth: isRowBased ? "85vw" : "95vw",
          padding: 0,
          borderRadius: "10px",
          border: "none",
        }}
      >
        <ParkingStatusPopup
          parkId={parkId}
          status={status}
          parkName={parkName}
          parks={parks}
          parkStatus={parkStatus}
        />
      </Popup>
    </>
  );
}
