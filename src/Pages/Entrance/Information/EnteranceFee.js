import React from "react";
import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 65%;

  section {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border-right: 2px solid #fce7e0;
  }
  .fee-container {
    display: flex;
    flex-direction: column;
    width: 60%;
    padding: 50px 0 20px;

    .fee-block {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 20px;
      border: 2px solid #fce7e0;
      border-radius: 20px;
      min-height: 100px;
      padding-right: 0;
      transition: padding-right 0.3s;
      overflow: hidden;
      .header-md-orange {
        width: 80px;
      }
      .fee-persons {
        position: absolute;
        right: 0;
        opacity: 0;
        visibility: hidden;
        width: 60%;
        transition: width 0.3s;
        .fee-person {
          white-space: pre-wrap;
          color: #6b6b6b;
        }
      }
    }
    .fee-block::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
      width: 5%;
      padding-top: 5%;
      border-radius: 50%;
      background-color: #fce7e0;
      z-index: -1;
      transition: width 0.3s;
    }

    .fee-block:hover {
      padding-right: 30%;
      .price {
        opacity: 0;
        visibility: hidden;
      }
      .fee-persons {
        opacity: 1;
        visibility: visible;
        width: 70%;
        .fee-person {
          white-space: pre-wrap;
        }
      }
      ::before {
        width: 80%;
        padding-top: 80%;
      }
    }
  }
  .notice-container {
    display: flex;
    flex-direction: column;
    width: 30%;
    padding: 0 20px;
    .quote {
      font-size: 60px;
      color: white;
      -webkit-text-stroke: 1px #ea7a60;
    }
    .quote-2 {
      text-align: right;
    }
    .notice-content {
      padding: 0 20px;
      line-height: 32px;
      color: #6b6b6b;
    }
  }
`;

export default function EnteranceFee() {
  return (
    <Container>
      <div className="header">購票資訊</div>
      <section>
        <div className="fee-container">
          <div className="fee-block">
            <div className="header-md-orange">全票</div>
            <div className="header-sm-darkgrey price">60 元</div>
            <div className="fee-persons">
              <li className="fee-person"> 一般民眾</li>
            </div>
          </div>
          <div className="fee-block">
            <div className="header-md-orange">優待票</div>
            <div className="header-sm-darkgrey price">30 元</div>
            <div className="fee-persons">
              <li className="fee-person"> 本國 18 歲以下之民眾</li>
              <li className="fee-person"> 現職軍警消防人員(義警義消)</li>
              <li className="fee-person"> 臺北市低收入戶者</li>
              <li className="fee-person"> 就讀本國各級學校之在校學生</li>
            </div>
          </div>
          <div className="fee-block">
            <div className="header-md-orange">免票</div>
            <div className="header-sm-darkgrey price">免費</div>
            <div className="fee-persons">
              <li className="fee-person">學齡前兒童</li>
              <li className="fee-person"> 身心障礙者，及其陪伴者1人</li>
              <li className="fee-person"> 退休公教人員</li>
              <li className="fee-person"> 本國 65 歲以上長者</li>
            </div>
          </div>
          <div className="fee-block">
            <div className="header-md-orange">團體票</div>
            <div className="header-sm-darkgrey price">7折</div>
            <div className="fee-persons">
              <li className="fee-person">
                購票人數達 30 人以上 7 折 <br />
                (依其購票資格之 7 折費用收費)
              </li>
            </div>
          </div>
        </div>
        <div className="notice-container">
          <span className="quote">“</span>
          <div className="notice-content">
            <span className="header-sm-darkgrey grey border-500">快速入園</span>
            <br />
            以電子票證刷卡入園， 可節省排隊購票時間， 付款前請務必確認餘額
            足夠。
          </div>
          <span className="quote quote-2">”</span>
        </div>
      </section>
    </Container>
  );
}
