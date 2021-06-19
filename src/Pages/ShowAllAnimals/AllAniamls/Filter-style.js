import styled from "styled-components";

const FilterContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  .container {
    position: relative;
    width: 100%;
    .filterBg {
      width: 100%;
    }
    .header {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 48px;
      color: white;
    }
    .sub-header {
      margin-top: 70px;
      margin-left: 40px;
      font-size: 28px;
    }
  }
  .flex {
    width: 100%;
    display: flex;
    flex-direction: row;
    max-width: 1480px;
    margin: 0 auto;
    justify-content: center;
    align-items: baseline;
    .filterBlock {
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .searchBox {
      width: 100%;
      display: flex;
      align-items: center;
      white-space: nowrap;
      .searchimg {
        width: 20px;
        align-self: flex-end;
        padding-bottom: 10px;
      }
    }
    .textBlock {
      margin-left: 40px;
      display: flex;
      width: 30%;
      flex-direction: column;
      justify-content: center;
      color: #5f5c90;
      letter-spacing: 2px;

      .h1 {
        font-size: 28px;
      }
      .pl-30 {
        padding-left: 50px;
      }
      .grey {
        color: #c2c2c2;
      }

      .h3 {
        font-size: 20px;
      }
    }
  }
  @media (max-width: 768px) {
    .container {
      box-sizing: border-box;
      position: relative;
      width: 100%;
      overflow-x: hidden;
      .filterBg {
        width: 100%;
        object-position: center;
      }
      .header {
        position: absolute;
        top: 40%;
        left: 50%;
        font-size: 36px;
        color: white;
      }
      .sub-header {
        margin-top: 50px;
        margin-left: 40px;
        font-size: 18px;
      }
    }
    .flex {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      flex-direction: column-reverse;
      margin: 0 auto;
      padding: 0 30px;
      justify-content: center;
      align-items: flex-start;
      .filterBlock {
        display: flex;
        margin-top: 30px;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        .searchBox {
          width: 100%;
          display: flex;
          align-items: center;
          .searchimg {
            width: 20px;
            align-self: flex-end;
            padding-bottom: 10px;
          }
        }
      }
      .textBlock {
        box-sizing: border-box;
        margin-top: 10px;
        .h1 {
          font-size: 28px;
          white-space: nowrap;
        }
        .h3 {
          font-size: 20px;
          white-space: nowrap;
        }
      }
    }
  }
  @media (max-width: 576px) {
    .container {
      position: relative;
      width: 100%;
      overflow-x: hidden;
      .filterBg {
        width: 120%;
        object-position: center;
      }
      .header {
        position: absolute;
        top: 30%;
        left: 50%;
        font-size: 28px;
        color: white;
      }
      .sub-header {
        margin-top: 40px;
        margin-left: 0px;
        font-size: 16px;
      }
    }
    .flex {
      padding: 20px 20px 0;
      .filterBlock {
        width: 100%;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .searchBox {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .searchimg {
          width: 20px;
          align-self: flex-end;
          padding-bottom: 10px;
          margin-right: 10px;
        }
      }
      .textBlock {
        margin-left: 0px;
        display: flex;
        width: 30%;
        flex-direction: column;
        color: #5f5c90;
        letter-spacing: 2px;
        .h1 {
          font-size: 24px;
        }
        .h3 {
          font-size: 16px;
        }
      }
    }
  }
`;

export { FilterContainer };
