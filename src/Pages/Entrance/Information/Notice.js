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
  .notice {
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
  }
`;

export default function Notice() {
  return (
    <Container>
      <div className="notice">
        <span className="bold">停展訊息</span>
        <span className="text">
          疫情期間，台北市立動物園停止對外開放至 6/26 日
        </span>
      </div>
    </Container>
  );
}
