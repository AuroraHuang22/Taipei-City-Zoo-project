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
      <div className="header pd-30">????????????</div>
      <section>
        <div className="block">
          <div className="header-md-orange">??????(??????)??????</div>
          <div className="hide">
            <div className="text">?????? : ????????????????????????????????????</div>
            <div className="text">?????? : ???????????????????????????</div>
          </div>
        </div>
        <div className="block">
          <div className="header-md-orange">??????(??????)??????</div>
          <div className="hide">
            <div className="text">?????? : ?????????????????????</div>
            <div className="text">?????? : 4 ??????450???????????? 600 ???</div>
          </div>
        </div>
        <div className="block">
          <div className="header-md-orange">???????????????</div>
          <div className="hide">
            <div className="text">?????? : ????????????????????????????????????</div>
            <div className="text">?????? : ?????? 50 ???</div>
          </div>
        </div>
        <div className="block">
          <div className="header-md-orange">?????????</div>
          <div className="hide">
            <div className="text">?????? : ?????????????????????????????????</div>
            <div className="text">?????? : 50 ??? / ?????????20 ??? / ??????</div>
          </div>
        </div>
      </section>
    </Container>
  );
}
