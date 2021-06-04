import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Parks from "../../Utils/tcmsv_park.json";
import * as api from "../../Utils/api";
import L from "leaflet";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  position: relative;
  flex-direction: row;
  width: 100%;
  padding: 0px 30px 0 0;
  margin: 20px auto;
  max-width: 1280px;
  justify-content: center;

  .map-container {
    box-sizing: border-box;
    width: 70%;
  }
  .traffic-block {
    padding-top: 50px;
    box-sizing: border-box;
    width: 30%;

    .header {
      font-size: 28px;
      color: #5f73bd;
      font-weight: 500;
    }
    .header-md-orange {
      padding-left: 30px;
      margin-top: 60px;
      margin-bottom: 30px;
      font-size: 24px;
      color: #ea7a60;
      font-weight: 500;
    }
    span {
      position: relative;
      padding-left: 30px;
      display: block;
      font-size: 20px;
      color: #6b6b6b;
      font-weight: 400;
      margin-bottom: 15px;
    }
    .text {
      padding: 30px 20px;
      font-size: 16px;
    }
  }
`;

const InfoDiv = styled.div`
  box-sizing: border-box;
  padding: 50px 20px;
  max-width: 300px;
  background-color: #fff;
  opacity: 0.8;
  border-radius: 25px;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 500;
  white-space: pre-wrap;
`;

export default function Traffic() {
  const [parkStatus, setParkStatus] = useState(null);
  const [parkName, setParkName] = useState(null);
  const [parkId, setParkId] = useState(null);
  const setBounds = [
    [25.003615970747212, 121.5642151547959],
    [24.991279127890376, 121.5948277740565],
  ];
  const position = [24.99773326108165, 121.5834263898432];
  const parksId = ["115", "046", "101", "202"];
  const parks = Parks.data.park;
  let status = [];

  useEffect(() => {
    api.getParksStatus().then((data) => setParkStatus(data.data));
  }, [parkId]);

  if (!parkStatus) {
    return null;
  }

  parkStatus.park.forEach((element) => {
    parksId.forEach((num) => {
      if (element.id === num) {
        status.push(element);
      }
    });
  });
  function ClickEvent() {
    useMapEvents({
      click: (e) => {
        console.log(e.latlng);
      },
    });
    return null;
  }

  function Infomation() {
    if (parkId) {
      return (
        <InfoDiv>
          {status.map((item) =>
            item.id === parkId ? (
              <div key={`info-${item.id}`}>
                <h3>{parkName}</h3>
                <p>
                  {parks.map((nam) =>
                    nam.id === parkId ? (
                      <>
                        總停車位數：{nam.totalcar}
                        <br />
                      </>
                    ) : null
                  )}
                  剩餘停車位：{item.availablecar}
                  <br />
                  <br />
                  {parks.map((nam) =>
                    nam.id === parkId ? (
                      <>
                        總機車停車位數：{nam.totalmotor}
                        <br />
                      </>
                    ) : null
                  )}
                  {item.availablemotor === -9 ? (
                    <>剩餘機車位：目前暫無提供機車停車位資訊</>
                  ) : (
                    <>剩餘機車位：{item.availablemotor}</>
                  )}
                </p>
                {parks.map((nam) =>
                  nam.id === parkId ? (
                    <>
                      設有無障礙停車位：{nam.Handicap_First}個
                      <br />
                      開放時間：{nam.serviceTime}
                      <br />
                      <br />
                      收費方式：{nam.payex}
                      <br />
                      <br />
                    </>
                  ) : null
                )}
                <p>資料更新時間：{parkStatus.UPDATETIME}</p>
              </div>
            ) : null
          )}
        </InfoDiv>
      );
    }
    return <InfoDiv>滑鼠移項該停車場,顯示最新停車位資訊</InfoDiv>;
  }

  return (
    <Container>
      <div className="traffic-block">
        <div className="header">停車資訊</div>
        <div className="header-md-orange">周邊停車資訊</div>
        <span>河川地停車場</span>
        <span>動物園站地下停車場</span>
        <span>捷運木柵機廠停車場</span>
        <span>木柵站轉乘停車場</span>
        <span className="text">
          以上停車場的即時資訊顯示於右側地圖，
          將滑鼠移向該停車場，查看停車位資訊。
        </span>
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
            height: "60vh",
            width: "100%",
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> , Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
            url="https://api.mapbox.com/styles/v1/aurorahuang/ckp5a6mec228j17nxebx0kcgc/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXVyb3JhaHVhbmciLCJhIjoiY2tva3ZmeXVnMDlhMjJ4cm12enM1OXhycCJ9.kyUwDjf4VLFBZPZrN2nijQ"
          />

          {parks.map((item) => (
            <Marker
              eventHandlers={{
                click: (e) => {
                  setParkId(item.id);
                  setParkName(item.name);
                },
                mouseover: (e) => {
                  setParkId(item.id);
                  setParkName(item.name);
                },
                mouseout: (e) => {
                  setParkId(null);
                  setParkName(null);
                },
              }}
              key={item.id}
              position={item.EntrancecoordInfo}
              icon={
                new L.Icon({
                  iconUrl: require(`../../Icons/park.png`).default,
                  iconSize: [20, 20],
                  iconAnchor: [10, 10],
                })
              }
            ></Marker>
          ))}
          <ClickEvent />
          <Infomation />
        </MapContainer>
      </div>
    </Container>
  );
}
