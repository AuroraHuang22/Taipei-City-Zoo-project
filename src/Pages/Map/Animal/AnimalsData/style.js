import styled from "styled-components";

const ContainerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 160px);
  .searchBox {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .favorite {
    font-size: 10px;
    font-weight: bold;
    border: 1px solid #acabbe;
    margin: 10px 5px 0px;
    padding: 10px 12px;
    border-radius: 10px;
    color: #acabbe;
    font-size: 14px;
  }
  .header {
    font-size: 24px;
    color: #5f5c90;
    font-weight: 500;
    width: 100%;
  }
  .sub-header {
    width: 100%;
    font-size: 18px;
    color: #acabbe;
    font-weight: 500;
    text-align: left;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .draw {
    position: absolute;
    bottom: 20px;
    width: 60%;
    object-fit: contain;
    opacity: 0.1;
    z-index: -1;
  }
  .btn {
    display: block;
    bottom: 0;
    width: 80%;
    padding: 12px;
    margin-top: auto;
    background-color: white;
    position: relative;
    font-size: 16px;
    border: 1px solid #acacac;
    border-radius: 25px;
    color: #acacac;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 18px;
    font-weight: 500;
    ::after {
      content: "→";
      opacity: 0;
      font-size: 18px;
      visibility: hidden;
      position: absolute;
      right: 50%;
      transition: all 0.3s;
    }
    :hover {
      border: 1px solid #ea7a60;
      background-color: white;
      color: #ea7a60;
      padding-right: 32px;
      ::after {
        opacity: 1;
        visibility: visible;
        right: 10%;
      }
    }
  }
  input {
    padding: 6px 18px;
    min-width: 320px;
    outline: none;
    border: none;
    border-radius: 25px;
    margin-right: 15px;
    background-color: inherit;
    border: 2px solid #f2f2f2;
    color: #f2f2f2;
    letter-spacing: 2px;
    font-size: 12px;
    font-weight: 500;
  }
  @media (max-width: 1024px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    height: 100%;
    justify-content: space-between;
    .sub-block {
      width: 80%;
      display: flex;
      flex-direction: column;
    }
    .favorite {
      margin: 0px 5px 0px;
      padding: 10px 12px;
    }
    .btn {
      position: fixed;
      bottom: 25px;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
    }
  }
  @media (max-width: 576px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    height: 100%;
    justify-content: space-between;
    .sub-block {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    .favorite {
      margin: 0px 5px 0px;
      padding: 10px 12px;
    }
    .btn {
      position: fixed;
      bottom: 75px;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
    }
  }
`;
const AnimalsItemBlock = styled.div`
  padding: 3px 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: grey;
  margin-top: 5px;
  .sub-header {
    width: 100%;
    font-size: 16px;
    color: #acabbe;
    font-weight: 500;
    text-align: left;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .mt-0 {
    margin-top: 0;
  }
`;
const AnimalContent = styled.div`
  font-size: 14px;
  font-weight: normal;
  border: 1px solid lightgray;
  margin: 5px 5px;
  padding: 5px 12px;
  border-radius: 25px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s;
  :hover {
    background-color: #d2d2d6;
  }
`;

export { ContainerDiv, AnimalsItemBlock, AnimalContent };
