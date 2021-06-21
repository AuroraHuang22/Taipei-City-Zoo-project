import React from "react";
import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 80px 20px;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
  .textBlock {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 50%;
    padding: 0 60px;
    a {
      text-decoration: none;
      font-weight: 600;
    }
    .quote {
      display: block;
      width: 100%;
      font-size: 60px;
      color: white;
      -webkit-text-stroke: 1px #ea7a60;
    }
    .quote-2 {
      display: block;
      width: 100%;
      text-align: right;
      font-size: 60px;
      color: white;
      -webkit-text-stroke: 1px #ea7a60;
    }
    .gray {
      color: grey;
    }
    .text {
      display: block;
      width: 100%;
      text-align: center;
      font-size: 24px;
      font-weight: 400;
    }
    .text.small {
      font-size: 18px;
    }
  }
  .imgBlock {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .img {
      height: 80%;
    }
  }
  @media (max-width: 768px) {
    height: 100vh;
    flex-direction: column;
    padding-top: 160px;
  }
`;

export default function PageNotFound() {
  return (
    <Container>
      <div className="textBlock">
        <span className="quote">“</span>
        <div className="text">
          <span className="gray">404...</span> 找不到這個頁面
        </div>
        <span className="quote-2">”</span>
        <div className="text small gray">
          迷失方向了嗎？ <a href="/map">路線規劃</a>可以給你一點靈感
        </div>
      </div>
      <div className="imgBlock">
        <img className="img" src="/imgs/draw-11.svg" alt="draw" />
      </div>
    </Container>
  );
}
