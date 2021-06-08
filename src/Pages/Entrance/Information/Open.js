import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 30px;
  width: 35%;
  section {
    display: flex;
    flex-direction: column;
    padding-top: 60px;
  }
  .timeDiv {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;
    margin-bottom: 8px;
    .day {
      box-sizing: border-box;
      font-size: 18px;
      color: #6b6b6b;
      width: 80px;
    }
    .pl-80 {
      padding-left: 80px;
    }
    .text {
      margin-left: 20px;
      font-size: 16px;
      color: #6b6b6b;
    }
  }
  .header-light {
    font-weight: 500;
    margin-top: 40px;
    margin-bottom: 30px;
    font-size: 24px;
    color: #c0bdd2;
  }
  .text-notice {
    margin-top: 60px;
    margin-left: 20px;
    font-size: 16px;
    color: #6b6b6b;
  }
`;

export default function Open() {
  return (
    <Container>
      <div className="header">開放時間</div>
      <section>
        <div className="timeDiv">
          <span className="day">假日</span>
          <div className="header-bg-orange">08:30 - 17:00</div>
        </div>
        <div className="timeDiv">
          <span className="day">平日</span>
          <div className="header-bg-orange">09:00 - 17:00</div>
        </div>
        <div className="timeDiv">
          <div className="header-bg-orange pl-80 grey">16:00</div>
          <span className="text">停止售票入園</span>
        </div>
      </section>

      <div className="header-light ">夜間開放時間(暑期)</div>

      <div className="timeDiv">
        <div className="header-bg-orange pl-80">16:00 - 21:000</div>
      </div>
      <div className="timeDiv">
        <div className="header-bg-orange pl-80 grey">20:00</div>
        <span className="text">停止售票入園</span>
      </div>

      <span className="text-notice">夜間開放區域為部分室內館，及主軸步道</span>
    </Container>
  );
}
