import React from "react";
import styled from "styled-components";

const InfoDiv = styled.div`
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

export default function ParkingStatusPopup(props) {
  const { parkId, status, parkName, parks, parkStatus } = props;

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
