import React from "react";
import styled from "styled-components";

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
  .highLight {
    color: #ea7a60;
  }
  @media (max-width: 1024px) {
    display: none;
  }
`;

export default function ParkingStatus(props) {
  const { parkId, status, parkName, parks, parkStatus } = props;
  if (!parkId) {
    return <InfoDiv>滑鼠移項該停車場,顯示最新停車位資訊</InfoDiv>;
  }
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
              <span className="highLight">剩餘停車位：{item.availablecar}</span>
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
                <span className="highLight">
                  剩餘機車位：目前暫無提供機車停車位資訊
                </span>
              ) : (
                <span className="highLight">
                  剩餘機車位：{item.availablemotor}
                </span>
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
