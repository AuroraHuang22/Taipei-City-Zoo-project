import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 65%;
  .ticket-md {
    display: none;
  }
  section {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border-right: 2px solid #fce7e0;
  }
  .fee-container {
    display: flex;
    flex-direction: column;
    width: 60%;
    padding: 50px 0 20px;

    .fee-block {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 20px;
      border: 2px solid #fce7e0;
      border-radius: 20px;
      min-height: 100px;
      padding-right: 0;
      transition: padding-right 0.3s;
      overflow: hidden;
      .header-md-orange {
        width: 80px;
      }
      .fee-persons {
        position: absolute;
        right: 0;
        opacity: 0;
        visibility: hidden;
        width: 55%;
        transition: width 0.3s;
        .fee-person {
          position: relative;
          white-space: pre-wrap;
          font-size: 14px;
          color: #6b6b6b;
          display: block;
          letter-spacing: 2px;
          ::before {
            content: "";
            width: 8px;
            height: 8px;
            position: absolute;
            background-color: #e2e2e2;
            top: 50%;
            left: -40px;
            transform: translateY(-50%);
            border-radius: 50%;
            transition: left 0.3s;
          }
        }
      }
    }
    .fee-block::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
      width: 5%;
      padding-top: 5%;
      border-radius: 50%;
      background-color: #fce7e0;
      z-index: -1;
      transition: opacity 0.3s;
    }

    .fee-block:hover {
      padding-right: 30%;
      .price {
        opacity: 0;
        visibility: hidden;
      }
      .fee-persons {
        opacity: 1;
        visibility: visible;
        width: 60%;
        .fee-person {
          white-space: pre-wrap;
          ::before {
            left: -30px;
          }
        }
      }
      ::before {
        width: 80%;
        padding-top: 80%;
      }
    }
  }
  .notice-container {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 30%;
    padding: 0 20px;
    .quote {
      font-size: 60px;
      color: white;
      -webkit-text-stroke: 1px #ea7a60;
    }
    .quote-2 {
      text-align: right;
      z-index: 903;
    }
    .notice-content {
      padding: 0 20px;
      line-height: 32px;
      color: #6b6b6b;
    }
    .arrow {
      position: absolute;
      width: 25%;
      top: 45%;
      left: -8px;
      transform: translateY(-50%);
    }
    .ticket {
      position: absolute;
      width: 80%;
      bottom: 0;
      left: 30%;
      transform: translateY(-45%);
    }
  }
  .pd-30 {
    padding-left: 30px;
  }
  @media (max-width: 1024px) {
    width: 100%;
    section {
      border-right: none;
      border-bottom: 2px solid #fce7e0;
    }
  }
  @media (max-width: 768px) {
    padding: 0 30px;
    position: relative;
    .ticket-md {
      display: block;
      position: absolute;
      width: 30%;
      top: 0;
      right: 0;
      transform: translate(-30%, -20%);
      z-index: -1;
    }
    section {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .fee-container {
      width: 100%;
    }
    .notice-container {
      display: flex;
      flex-direction: row;
      position: relative;
      width: 100%;
      padding: 0 20px;
      margin-bottom: 40px;
      justify-content: center;
      .quote {
        font-size: 60px;
        color: white;
        -webkit-text-stroke: 1px #ea7a60;
      }
      .quote-2 {
        text-align: right;
        z-index: 903;
      }
      .notice-content {
        box-sizing: border-box;
        padding: 0 20px;
        line-height: 32px;
        color: #6b6b6b;
        max-width: 300px;
      }
      .arrow {
        display: none;
        position: absolute;
        width: 8%;
        top: 0;
        left: 0px;
        transform: translate(calc(-100% - 8%));
      }
      .ticket {
        display: none;
      }
    }
    .pd-30 {
      padding-left: 30px;
    }
  }
  @media (max-width: 576px) {
    .ticket-md {
      display: none;
    }
    .fee-container {
      .fee-block {
        min-height: 120px;
        .fee-persons {
          .fee-person {
            font-size: 12px;
            ::before {
              content: "";
              width: 8px;
              height: 8px;
              position: absolute;
              background-color: #e2e2e2;
              top: 50%;
              left: 0px;
              transform: translateY(-50%);
              border-radius: 50%;
              transition: left 0.3s;
            }
          }
        }
      }
      .fee-block:hover {
        padding-right: 40%;
        .fee-persons {
          width: 70%;
          .fee-person {
            white-space: pre-wrap;
            ::before {
              left: -10px;
            }
          }
        }
      }
      .notice-container {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 30%;
        padding: 0 20px;
        .quote {
          font-size: 60px;
          color: white;
          -webkit-text-stroke: 1px #ea7a60;
        }
        .quote-2 {
          text-align: right;
          z-index: 903;
        }
        .notice-content {
          padding: 0 20px;
          line-height: 32px;
          color: #6b6b6b;
        }
        .arrow {
          position: absolute;
          width: 25%;
          top: 45%;
          left: -8px;
          transform: translateY(-50%);
        }
        .ticket {
          position: absolute;
          width: 80%;
          bottom: 0;
          left: 30%;
          transform: translateY(-45%);
        }
      }
    }
  }
`;

export { Container };
