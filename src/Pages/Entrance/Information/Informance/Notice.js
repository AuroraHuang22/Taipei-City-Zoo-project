import React from "react";
import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: row;
  background-color: #c55458;
  width: 100%;
  height: 180px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 900;
  .notice {
    width: 100%;
    position: relative;
    padding-left: 30%;
    span {
      color: #f1f1f1;
      display: block;
      letter-spacing: 2px;
    }
    .bold {
      font-size: 32px;
      font-weight: 500;
    }
    .text {
      font-size: 22px;
    }
    .img-left,
    .img-right {
      height: 200px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .img-left {
      left: 0;
    }
    .img-right {
      right: 0;
    }
  }
  @media (max-width: 1024px) {
    .notice {
      width: 100%;
      position: relative;
      padding-left: 40%;
      span {
        color: #f1f1f1;
        display: block;
        letter-spacing: 2px;
      }
      .bold {
        font-size: 26px;
        font-weight: 500;
      }
      .text {
        font-size: 18px;
        width: 80%;
      }
      .img-left,
      .img-right {
        height: 200px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      .img-left {
        left: -10%;
      }
      .img-right {
        right: -5%;
      }
    }
  }
  @media (max-width: 768px) {
    .notice {
      .bold {
        font-size: 22px;
        font-weight: 500;
      }
      .text {
        font-size: 16px;
        width: 80%;
      }
      .img-left {
        left: 0%;
        transform: translate(-50%, -50%);
      }
      .img-right {
        display: none;
        right: -5%;
      }
    }
  }
  @media (max-width: 576px) {
    .notice {
      padding-left: 50%;
      .bold {
        font-size: 18px;
        font-weight: 500;
      }
      .text {
        font-size: 14px;
        width: 80%;
      }
      .img-left {
        left: 0%;
        transform: translate(-50%, -50%);
      }
      .img-right {
        display: none;
        right: -5%;
      }
    }
  }
`;

export default function Notice() {
  return (
    <Container>
      <div className="notice">
        <img className="img-left" src="/Imgs/leaf-left-21.svg" alt="tiger" />
        <img className="img-right" src="/Imgs/leaf-right-20.svg" alt="tiger" />
        <span className="bold">停展訊息</span>
        <span className="text">疫情期間，台北市立動物園目前停止對外開放</span>
      </div>
    </Container>
  );
}
