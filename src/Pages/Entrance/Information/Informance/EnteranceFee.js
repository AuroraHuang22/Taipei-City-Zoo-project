import React from "react";
import { Container } from "./EnteranceFee-style";

export default function EnteranceFee() {
  return (
    <Container>
      <div className="header pd-30">購票資訊</div>
      <img className="ticket-md" src="/Imgs/ticket-18.svg" alt="arrow" />

      <section>
        <div className="fee-container">
          <div className="fee-block">
            <div className="header-md-orange">全票</div>
            <div className="header-sm-darkgrey price">60 元</div>
            <div className="fee-persons">
              <span className="fee-person"> 一般民眾</span>
            </div>
          </div>
          <div className="fee-block">
            <div className="header-md-orange">優待票</div>
            <div className="header-sm-darkgrey price">30 元</div>
            <div className="fee-persons">
              <span className="fee-person"> 本國 18 歲以下之民眾</span>
              <span className="fee-person"> 現職軍警消防人員(義警義消)</span>
              <span className="fee-person"> 臺北市低收入戶者</span>
              <span className="fee-person"> 就讀本國各級學校之在校學生</span>
            </div>
          </div>
          <div className="fee-block">
            <div className="header-md-orange">免票</div>
            <div className="header-sm-darkgrey price">免費</div>
            <div className="fee-persons">
              <span className="fee-person"> 學齡前兒童</span>
              <span className="fee-person"> 身心障礙者，及其陪伴者1人</span>
              <span className="fee-person"> 退休公教人員</span>
              <span className="fee-person"> 本國 65 歲以上長者</span>
            </div>
          </div>
          <div className="fee-block">
            <div className="header-md-orange">團體票</div>
            <div className="header-sm-darkgrey price">7折</div>
            <div className="fee-persons">
              <span className="fee-person">
                購票人數達 30 人以上 7 折 <br />
                (依其購票資格之 7 折費用收費)
              </span>
            </div>
          </div>
        </div>
        <div className="notice-container">
          <img className="ticket" src="/Imgs/ticket-18.svg" alt="arrow" />
          <span className="quote">“</span>
          <div className="notice-content">
            <span className="header-sm-darkgrey grey border-500">快速入園</span>
            <br />
            以電子票證刷卡入園， 可節省排隊購票時間， 付款前請務必確認餘額
            足夠。
          </div>
          <span className="quote quote-2">”</span>
          <img className="arrow" src="/Imgs/arrow-17.svg" alt="arrow" />
        </div>
      </section>
    </Container>
  );
}
