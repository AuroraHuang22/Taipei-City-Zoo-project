import styled from "styled-components";

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  width: 20%;
  margin-left: auto;
  max-width: 380px;
  padding: 30px 20px;
  height: 100%;
  .draw {
    position: absolute;
    z-index: -1;
    width: 140px;
    object-fit: contain;
  }
  .draw-1 {
    top: 5%;
    right: -20%;
  }
  .draw-2 {
    bottom: 5%;
    left: -20%;
  }
  a {
    text-decoration: none;
    color: #3a4d48;
  }
  .inner-container {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
  }
  .bar-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 12px;
    .bar-bottom {
      width: 100%;
      background-color: lightgrey;
      height: 12px;
      border-radius: 10px;
    }
    .bar-top {
      background-color: grey;
      height: 12px;
      border-radius: 10px;
    }
    .text {
      font-size: 16px;
      margin-left: 8px;
      color: grey;
    }
  }
  .level {
    width: 100%;
    font-size: 18px;
    margin-top: 30px;
    .level-text {
      font-weight: 600;
    }
    .desc {
      display: block;
      margin-top: 10px;
      color: grey;
      font-size: 16px;
      letter-spacing: 1.8px;
    }
  }
  .button-group {
    display: flex;
    flex-direction: column;
    max-width: 80%;
    margin: 10px auto;
    .btn {
      box-sizing: border-box;
      font-size: 14px;
      padding: 5px 20px;
      border-radius: 25px;
      text-align: center;
      border: 2px solid lightgrey;
      margin: 5px;
      background-color: none;
      cursor: pointer;
      transition: all 0.3s;
      :hover {
        background-color: #efe7e4;
      }
    }
    .btn.active {
      background-color: #efe6e3;
      :hover {
        background-color: #ccc2bf;
      }
    }
  }
  @media (max-width: 996px) {
    box-sizing: border-box;
    flex-wrap: nowrap;
    width: 100%;
    margin: 0 auto;
    max-width: 100%;
    padding: 0 20px;
    height: 100%;
    .inner-container {
      display: flex;
      flex-direction: row;
      width: 80%;
      margin: 0 auto;
      justify-content: space-evenly;
      align-items: center;
    }
    .button-group {
      padding: 20px 0px 10px;
      flex-direction: row;
      max-width: 100%;
    }
    .level {
      margin-top: 0px;
      padding-left: 30px;
    }
    .draw {
      display: none;
    }
  }
  @media (max-width: 576px) {
    .inner-container {
      flex-direction: column;
    }
  }
`;
const Photo = styled.img`
  content: url("/Imgs/explore-09.svg");
  width: 100%;
  object-fit: contain;
  @media (max-width: 996px) {
    width: 55%;
  }
`;

export { Container, Photo };
