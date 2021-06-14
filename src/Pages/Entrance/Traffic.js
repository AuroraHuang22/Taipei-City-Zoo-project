import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Parks from "../../Utils/tcmsv_park.json";
import * as api from "../../Utils/api";
import L from "leaflet";
import Popup from "reactjs-popup";
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
  .pd-30 {
    padding-left: 30px;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    width: 100%;
    padding: 0px 30px;
    margin: 20px auto;
    align-items: center;
    justify-content: center;
    .map-container {
      box-sizing: border-box;
      width: 100%;
    }
    .traffic-block {
      padding-top: 50px;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .header {
        width: 80%;
        font-size: 24px;
        color: #5f73bd;
        font-weight: 500;
      }
      .header-md-orange {
        font-size: 20px;
        width: 93%;
        margin-top: 20px;
        margin-bottom: 10px;
      }
      span {
        font-size: 18px;
        margin-bottom: 10px;
      }
      .text {
        width: 90%;
        padding: 30px 20px;
        font-size: 16px;
      }
    }
  }
  @media (max-width: 768px) {
    .traffic-block {
      padding-top: 30px;
      .header {
        width: 80%;
        font-size: 20px;
        color: #5f73bd;
        font-weight: 500;
      }
      .header-md-orange {
        font-size: 16px;
        width: 93%;
        margin-top: 20px;
        margin-bottom: 10px;
      }
      span {
        font-size: 14px;
        margin-bottom: 10px;
      }
      .text {
        text-align: center;
        width: 90%;
        padding: 10px 20px 20px;
        font-size: 14px;
      }
    }
  }
  @media (max-width: 576px) {
  }
`;

const InfoDiv = styled.div`
  box-sizing: border-box;
  padding: 20px 20px;
  max-width: 300px;
  max-height: 700px;
  overflow-y: scroll;
  background-color: #fff;
  opacity: 0.8;
  border-radius: 25px;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 500;
  white-space: pre-wrap;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const InfoDivMd = styled.div`
  box-sizing: border-box;
  padding: 10px 20px;
  h3 {
    font-size: 24px;
    color: #5f5c90;
    font-weight: 500;
  }
  p {
    font-size: 16px;
    color: #6b6b6b;
    font-weight: 400;
  }
  .highLight {
    color: #ea7a60;
  }
`;

export default function Traffic() {
  const [parkStatus, setParkStatus] = useState(null);
  const [parkName, setParkName] = useState(null);
  const [parkId, setParkId] = useState(null);
  const [open, setOpen] = useState(false);
  const setBounds = [
    [25.003615970747212, 121.5642151547959],
    [24.991279127890376, 121.5948277740565],
  ];
  const position = [24.99773326108165, 121.5834263898432];
  const parksId = ["115", "046", "101", "202"];
  const parks = Parks.data.park;
  let status = [];
  const isRowBased = window.matchMedia("(max-width: 1020px)").matches;

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
              <div className="content" key={`info-${item.id}`}>
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

  function InfomationPopup() {
    if (parkId) {
      return (
        <InfoDivMd>
          {status.map((item) =>
            item.id === parkId ? (
              <div className="content" key={`info-${item.id}`}>
                <h3>{parkName}</h3>
                <p>
                  {parks.map((nam) =>
                    nam.id === parkId ? (
                      <>
                        總停車位數：
                        <span className="x">{nam.totalcar}</span>
                        <br />
                      </>
                    ) : null
                  )}{" "}
                  剩餘停車位：{" "}
                  <span className="highLight">{item.availablecar}</span>
                  <br />
                  <br />
                  {parks.map((nam) =>
                    nam.id === parkId ? (
                      <>
                        總機車停車位數：
                        <span className="">{nam.totalmotor}</span>
                        <br />
                      </>
                    ) : null
                  )}
                  {item.availablemotor === -9 ? (
                    <>
                      剩餘機車位：
                      <span className="highLight">
                        目前暫無提供機車停車位資訊
                      </span>
                    </>
                  ) : (
                    <>
                      剩餘機車位：
                      <span className="highLight">{item.availablemotor}</span>
                    </>
                  )}
                </p>
                {parks.map((nam) =>
                  nam.id === parkId ? (
                    <p>
                      設有無障礙停車位：{nam.Handicap_First}個
                      <br />
                      開放時間：{nam.serviceTime}
                      <br />
                      <br />
                      收費方式：{nam.payex}
                      <br />
                      <br />
                    </p>
                  ) : null
                )}
                <p className="highLight">
                  資料更新時間：{parkStatus.UPDATETIME}
                </p>
              </div>
            ) : null
          )}
        </InfoDivMd>
      );
    }
    return <InfoDiv>滑鼠移項該停車場,顯示最新停車位資訊</InfoDiv>;
  }

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
                    iconUrl: require(`../../Icons/park.svg`).default,
                    iconSize: [40, 40],
                    iconAnchor: [20, 20],
                  })
                }
              ></Marker>
            ))}
            <ClickEvent />
            <Infomation />
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
        <InfomationPopup />
      </Popup>
    </>
  );
}
