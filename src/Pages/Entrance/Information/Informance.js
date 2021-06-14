import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 70px 0px 20px;
  width: 100%;
  .imgBox {
    position: absolute;
    height: 408px;
    top: 0;
    border-right: 2px solid #fce7e0;
    .img {
      max-width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: left;
    }
  }
  .info {
    padding-left: 360px;
    .content {
      margin-top: 24px;
      padding-left: 20px;
      span {
        position: relative;
        display: block;
        font-size: 16px;
        color: #6b6b6b;
        margin-bottom: 12px;
      }
      span::before {
        content: "";
        width: 8px;
        height: 8px;
        background-color: #e2e2e2;
        position: absolute;
        top: 50%;
        left: -30px;
        transform: translateY(-50%);
        border-radius: 50%;
      }
    }
  }
  @media (max-width: 1024px) {
    padding-top: 40px;
    height: 370px;
    .imgBox {
      height: 370px;
    }
    .info {
      padding-left: 50%;
      .content {
        margin-top: 24px;
        padding-left: 20px;
        span {
          font-size: 14px;
        }
        span::before {
          left: -20px;
        }
      }
    }
  }
  @media (max-width: 768px) {
  }
  @media (max-width: 576px) {
    padding: 40px 30px;
    height: 420px;
    .imgBox {
      display: none;
    }
    .info {
      padding-left: 0;
      .content {
        margin-top: 24px;
        padding-left: 30px;
        span {
          font-size: 16px;
        }
        span::before {
          left: -20px;
        }
      }
    }
  }
`;

export default function Informance() {
  return (
    <Container>
      <div className="imgBox">
        <img className="img" src="/Imgs/ducks-15.svg" alt="informance" />
      </div>
      <div className="info">
        <div className="header">遊園須知</div>
        <div className="content">
          <span>全園禁菸</span>
          <span>禁止寵物及充氣氣球進入園區</span>
          <span>禁止腳踏車、幼兒三輪車、滑板及直排輪</span>
          <span>禁止跨越欄杆進入動物展示場</span>
          <span>禁止餵食動物</span>
          <span>禁止進入作業區及遊客列車車道</span>
          <span>各室內展示館禁止飲食</span>
        </div>
      </div>
    </Container>
  );
}
