import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 80px 10px 0px;
  justify-content: center;
`;

export default function Infomation() {
  const EnteranceFee = () => {
    return (
      <div>
        <h2>購票資訊</h2>
        <p>暫定</p>
      </div>
    );
  };

  const Open = () => {
    return (
      <div>
        <h2>開放時間</h2>
        <p>暫定</p>
      </div>
    );
  };

  const RentalService = () => {
    return (
      <div>
        <h2>租借服務</h2>
        <p>遊客服務中心</p>
        <p>娃娃車租用｜每台租金50元｜押金1000元</p>
        <p>輪椅租用｜押金1000元或證件擇一</p>
      </div>
    );
  };

  const Traffic = () => {
    return (
      <div>
        <h2>交通資訊</h2>
        <h3>搭乘大眾運輸工具</h3>
        <p>捷運</p>
        <p>公車</p>
        <h3>自行開車</h3>
        <p>暫定</p>
      </div>
    );
  };

  return (
    <Container>
      <EnteranceFee />
      <Open />
      <RentalService />
      <Traffic />
    </Container>
  );
}
