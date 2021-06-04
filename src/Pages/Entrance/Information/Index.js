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
    color: #5f73bd;
    font-weight: 500;
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
`;

export default function Infomation() {
  return (
    <>
      <Container>
        <div className="container-1">
          <EnteranceFee />
          <Open />
        </div>
        <div>
          <Notice />
        </div>
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
