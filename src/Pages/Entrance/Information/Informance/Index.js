import React from "react";
import styled from "styled-components";
import Traffic from "./Traffic";
import EnteranceFee from "./EnteranceFee";
import Open from "./Open";
import Notice from "./Notice";
import RentalService from "./RentalService";
import Informance from "./Informance";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 50px auto 0;
  width: 100%;
  max-width: 1280px;
  justify-content: center;
  .container-1 {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    box-sizing: border-box;
    padding: 30px 0px 40px;
  }
  .container-2 {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    box-sizing: border-box;
    padding: 180px 0px 20px;
    border-bottom: 2px solid #fce7e0;
  }
  .inner-container {
    display: flex;
    flex-direction: column;
    width: 65%;
  }
  .header {
    font-size: 28px;
    color: #5f5c90;
    font-weight: 500;
    /* background-color: #acabbe; */
    /* background-color: #c4c4cf; */
  }
  .header-bg-orange {
    font-size: 30px;
    color: #ea7a60;
    font-weight: 500;
  }
  .header-md-orange {
    font-size: 24px;
    color: #ea7a60;
    font-weight: 500;
  }
  .header-sm-darkgrey {
    font-size: 20px;
    color: #6b6b6b;
    font-weight: 400;
  }
  .black {
    color: black;
  }
  .grey {
    color: #929292;
  }
  .border-500 {
    font-weight: 500;
  }
  @media (max-width: 1024px) {
    .container-1 {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 30px 0px 40px;
    }
    .container-2 {
      flex-direction: column;
      flex-wrap: nowrap;
    }
    .inner-container {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .header {
      font-size: 24px;
      color: #5f5c90;
      font-weight: 500;
      /* background-color: #acabbe; */
      /* background-color: #c4c4cf; */
    }
    .header-bg-orange {
      font-size: 24px;
      color: #ea7a60;
      font-weight: 500;
    }
    .header-md-orange {
      font-size: 18px;
      color: #ea7a60;
      font-weight: 500;
    }
    .header-sm-darkgrey {
      font-size: 16px;
      color: #6b6b6b;
      font-weight: 400;
    }
    .black {
      color: black;
    }
    .grey {
      color: #929292;
    }
    .border-500 {
      font-weight: 500;
    }
  }
  @media (max-width: 768px) {
    .container-1 {
      padding: 0px 0px 40px;
    }
    .header {
      width: 100%;
      font-size: 22px;
    }
    .header-light {
      font-size: 18px;
      margin: 8px 0 20px;
    }
    .header-bg-orange {
      font-size: 16px;
    }
  }
  @media (max-width: 576px) {
    margin: 0 auto;
    background-image: url("/Imgs/land-sm-39.svg");
    background-repeat: no-repeat;
    background-position: top;
    overflow: hidden;
    .container-1 {
      width: 100%;
      padding: 220px 5px 40px;
    }
    .border-500 {
      font-weight: 500;
    }
  }
`;

export default function Infomation() {
  return (
    <>
      <Container>
        <div className="container-1">
          <EnteranceFee />
          <Open />
        </div>
        <Notice />
        <div className="container-2">
          <RentalService />
          <div className="inner-container">
            <Informance />
            <Traffic />
          </div>
        </div>
      </Container>
    </>
  );
}
