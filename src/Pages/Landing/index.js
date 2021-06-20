import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const float = keyframes`
  from {
    transform: translatey(0px);;
  }
  to {
    transform: translatey(-20px);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  max-width: 1480px;
  height: 100vh;
  justify-content: center;
  margin: 0 auto;
  .head {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .bottom-left {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 30%;
  }
  .bottom-right {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
  }
  .hero {
    margin-top: 80px;
    box-sizing: border-box;
    width: 100%;
    max-width: 650px;
    height: 200px;
    margin-left: 180px;
    align-self: flex-start;
    animation: ${float} 3s ease-in-out infinite alternate;
  }
  .text {
    align-self: flex-start;
    margin-left: 330px;
    font-size: 26px;
    color: #8f8fb6;
    font-weight: 400;
    letter-spacing: 6px;
    margin-top: 20px;
  }
  .bold {
    font-weight: 600;
    color: #62628b;
  }
  a {
    text-decoration: none;
  }
  .btn {
    position: relative;
    font-size: 24px;
    color: #ea7a60;
    margin-top: 10px;
    font-weight: 400;
    letter-spacing: 7px;
    transition: all 0.3s;
    cursor: pointer;
    z-index: 902;
    ::after {
      content: "⇢";
      margin-left: 3px;
      margin-right: 10px;
      transition: all 0.3s;
    }
    ::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 1%;
      height: 2px;
      background-color: #fff;
      transition: width 0.3s;
    }
    :hover {
      font-weight: 500;
      ::after {
        margin-left: 13px;
        margin-right: 0px;
      }
      ::before {
        width: 100%;
        background-color: #62628b;
      }
    }
  }
  @media (max-width: 850px) {
    .hero {
      margin: 20px auto 0;
      box-sizing: border-box;
      width: 80%;
      height: 200px;
      align-self: flex-start;
      animation: ${float} 4s ease-in-out infinite;
    }
    .text {
      align-self: flex-start;
      margin: 0 auto;
      font-size: 18px;
      color: #8f8fb6;
      font-weight: 400;
      letter-spacing: 6px;
    }
    .btn {
      position: relative;
      font-size: 16px;
      border-bottom: 1px solid #ea7a60;
    }
  }
  @media (max-width: 576px) {
    .head {
      content: url("/Imgs/land-sm-39.svg");
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
    .bottom-left,
    .bottom-right {
      bottom: 60px;
    }
  }
`;

export default function Landing() {
  return (
    <Container>
      <img className="head" src="/Imgs/land-38.svg" alt="head" />
      <img className="hero" src="/Imgs/hero-02.svg" alt="hero" />
      <div className="text">
        去<span className="bold">動物園</span>...你準備好了嗎？
      </div>
      <Link to="/all">
        <div className="btn">開始探索</div>
      </Link>
      <img className="bottom-left" src="/Imgs/land-35.svg" alt="img" />
      <img className="bottom-right" src="/Imgs/land-01-34.svg" alt="img" />
    </Container>
  );
}
