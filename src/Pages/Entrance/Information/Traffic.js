import React from "react";
import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  /* align-items: center; */
  flex-direction: row;
  position: relative;
  padding: 50px 30px 0px;
  width: 100%;
  justify-content: space-around;
  border-top: 2px solid #fce7e0;
  .block {
    display: flex;
    flex-direction: column;
    width: 40%;
    justify-content: flex-end;
    .header-md-orange {
      margin-top: 30px;
      margin-bottom: 20px;
    }
    .mg-top-0 {
      margin-top: 0px;
    }
    span {
      position: relative;
      display: block;
      font-size: 16px;
      color: #6b6b6b;
      margin-bottom: 12px;
      line-height: 28px;
    }
    span::before {
      content: "";
      width: 8px;
      height: 8px;
      background-color: #e2e2e2;
      position: absolute;
      top: 10px;
      left: -30px;
      border-radius: 50%;
    }
  }
  .pd-30 {
    padding-left: 30px;
  }
`;

export default function Traffic() {
  return (
    <Container>
      <div className="block">
        <div className="header">交通資訊(公共運輸)</div>
        <div className="header-md-orange">台北捷運</div>
        <span>請搭乘文湖線，在動物園站下車</span>
        <span>
          請搭乘板南線，在市政府站下車，再轉乘綠 1、棕 18 或棕 21 公車
        </span>
      </div>

      <div className="block">
        <div className="header-md-orange mg-top-0">公車</div>
        <span>
          搭乘236(含區間車)、237、282(含副 線)、294、295、611、676、679、
          793、933、小12、棕3、棕6、棕11 (含副線)、棕15(含區間車)、棕18、棕
          21、綠1、1501、1503及1558等路 線，在捷運動物園站下車
        </span>
      </div>
    </Container>
  );
}
