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
  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 20px;
    border-bottom: 2px solid #fce7e0;

    section {
      display: flex;
      flex-direction: column;
      padding-top: 60px;
      width: 40%;
      box-sizing: border-box;
    }
    .night {
      width: 40%;
      box-sizing: border-box;
    }
    .text-notice {
      display: block;
      text-align: center;
      background-color: #f2f2f2;
      width: 100%;
      margin: 30px 0;
      font-size: 14px;
      color: #6b6b6b;
    }
    .timeDiv {
      .day {
        font-size: 16px;
      }
      .pl-80 {
        padding-left: 80px;
      }
      .text {
        margin-left: 0px;
        font-size: 14px;
      }
    }
  }
  @media (max-width: 768px) {
    justify-content: center;
    .header {
      width: 80%;
      font-size: 22px;
      padding-left: 30px;
    }
    .header-light {
      font-size: 18px;
      margin: 8px 0 20px;
    }
    .header-bg-orange {
      font-size: 16px;
    }
    .pl-80 {
      padding-left: 30px;
    }
  }
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
    section {
      padding-top: 30px;
      width: 100%;
      align-items: center;
      padding-left: 20%;
    }
    .night {
      width: 100%;
      margin-top: 20px;
      .header-light {
        padding-left: 30px;
      }
      .pl-80 {
        padding-left: 0px;
      }
      .timeDiv {
        padding-left: 20%;
      }
    }
    .timeDiv {
      .day {
        width: 50px;
      }
      .pl-80 {
        padding-left: 0px;
      }
    }
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
      <div className="night">
        <div className="header-light">夜間開放時間(暑期)</div>

        <div className="timeDiv">
          <div className="header-bg-orange pl-80">16:00 - 21:000</div>
        </div>
        <div className="timeDiv">
          <div className="header-bg-orange pl-80 grey">20:00</div>
          <span className="text">停止售票入園</span>
        </div>
      </div>
      <span className="text-notice">夜間開放區域為部分室內館，及主軸步道</span>
    </Container>
  );
}
