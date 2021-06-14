import React from "react";
import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 35%;
  border-right: 2px solid #fce7e0;
  padding: 70px 0px;
  section {
    display: flex;
    flex-direction: column;
    margin-top: 60px;
    padding-left: 5%;
  }
  .block {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 20px;
    border: 2px solid #fce7e0;
    border-radius: 10px;
    padding: 10px 30px;
    width: 60%;
    transition: padding 0.3s;
    overflow: hidden;
    .hide {
      position: absolute;
      bottom: 15px;
      .text {
        opacity: 0;
        visibility: hidden;
        font-size: 16px;
        color: #929292;
        transition: opacity 0.35s;
      }
    }
  }
  .block::before {
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
  .block:hover {
    padding: 10px 30px 80px;
    .text {
      opacity: 1;
      visibility: visible;
    }
    ::before {
      width: 80%;
      padding-top: 80%;
    }
  }
  .pd-30 {
    padding-left: 30px;
  }
  @media (max-width: 1024px) {
    width: 100%;
    border-right: none;
    border-bottom: 2px solid #fce7e0;
    padding: 40px 0;
    section {
      display: flex;
      flex-direction: column;
      margin-top: 30px;
      align-items: center;
    }
  }
  @media (max-width: 768px) {
  }
  @media (max-width: 576px) {
    .block {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      margin-bottom: 20px;
      border: 2px solid #fce7e0;
      border-radius: 10px;
      padding: 10px 30px;
      width: 60%;
      transition: padding 0.3s;
      overflow: hidden;
      .hide {
        position: absolute;
        bottom: 15px;
        .text {
          opacity: 0;
          visibility: hidden;
          font-size: 14px;
          color: #929292;
          transition: opacity 0.35s;
        }
      }
    }
    .block::before {
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
    .block:hover {
      padding: 10px 30px 60px;
      .text {
        opacity: 1;
        visibility: visible;
      }
      ::before {
        width: 80%;
        padding-top: 80%;
      }
    }
  }
`;

export default function RentalService() {
  return (
    <Container>
      <div className="header pd-30">租借服務</div>
      <section>
        <div className="block">
          <div className="header-md-orange">輪椅(手推)租借</div>
          <div className="hide">
            <div className="text">位置 : 旅客服務中心旁、鳥園車站</div>
            <div className="text">費用 : 免費借用，須押證件</div>
          </div>
        </div>
        <div className="block">
          <div className="header-md-orange">輪椅(電動)租借</div>
          <div className="hide">
            <div className="text">位置 : 旅客服務中心旁</div>
            <div className="text">費用 : 4 小時450元，全日 600 元</div>
          </div>
        </div>
        <div className="block">
          <div className="header-md-orange">娃娃車租借</div>
          <div className="hide">
            <div className="text">位置 : 旅客服務中心旁、鳥園車站</div>
            <div className="text">費用 : 每輛 50 元</div>
          </div>
        </div>
        <div className="block">
          <div className="header-md-orange">寄物櫃</div>
          <div className="hide">
            <div className="text">位置 : 大門廣場左右側出入口處</div>
            <div className="text">費用 : 50 元 / 大型，20 元 / 小型</div>
          </div>
        </div>
      </section>
    </Container>
  );
}
