import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  position: relative;
  flex-direction: row;
  width: 100%;
  padding: 0px 30px 0 0;
  margin: 20px auto;
  max-width: 1280px;
  justify-content: center;

  .map-container {
    box-sizing: border-box;
    width: 70%;
  }
  .traffic-block {
    padding-top: 50px;
    box-sizing: border-box;
    width: 30%;
    .header {
      font-size: 28px;
      color: #5f73bd;
      font-weight: 500;
    }
    .header-md-orange {
      padding-left: 30px;
      margin-top: 60px;
      margin-bottom: 30px;
      font-size: 24px;
      color: #ea7a60;
      font-weight: 500;
    }
    span {
      position: relative;
      padding-left: 30px;
      display: block;
      font-size: 20px;
      color: #6b6b6b;
      font-weight: 400;
      margin-bottom: 15px;
    }
    .text {
      padding: 30px 20px;
      font-size: 16px;
    }
  }
  .pd-30 {
    padding-left: 30px;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    width: 100%;
    padding: 0px 30px;
    margin: 20px auto;
    align-items: center;
    justify-content: center;
    .map-container {
      box-sizing: border-box;
      width: 100%;
    }
    .traffic-block {
      padding-top: 50px;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .header {
        width: 80%;
        font-size: 24px;
        color: #5f73bd;
        font-weight: 500;
      }
      .header-md-orange {
        font-size: 20px;
        width: 93%;
        margin-top: 20px;
        margin-bottom: 10px;
      }
      span {
        font-size: 18px;
        margin-bottom: 10px;
      }
      .text {
        width: 90%;
        padding: 30px 20px;
        font-size: 16px;
      }
    }
  }
  @media (max-width: 768px) {
    .traffic-block {
      padding-top: 30px;
      .header {
        width: 80%;
        font-size: 20px;
        color: #5f73bd;
        font-weight: 500;
      }
      .header-md-orange {
        font-size: 16px;
        width: 93%;
        margin-top: 20px;
        margin-bottom: 10px;
      }
      span {
        font-size: 14px;
        margin-bottom: 10px;
      }
      .text {
        text-align: center;
        width: 90%;
        padding: 10px 20px 20px;
        font-size: 14px;
      }
    }
  }
  @media (max-width: 576px) {
  }
`;

export { Container };
