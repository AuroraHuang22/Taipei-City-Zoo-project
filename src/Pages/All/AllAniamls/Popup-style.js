import styled from "styled-components";

const Container = styled.div`
  .main {
    position: relative;
    box-sizing: border-box;
    padding-top: 500px;
    overflow: hidden;
    overflow-y: scroll;
    max-height: 95vh;
    border-radius: 10px;
    width: 100%;
  }
  span {
    display: block;
    letter-spacing: 1.5px;
  }
  .imgBox {
    width: 410px;
    height: 430px;
    border-radius: 50px;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    transform: translate(-10%, -5%) rotate(12deg);
    .img {
      width: 450px;
      height: 480px;
      transform: rotate(-12deg);
      object-fit: cover;
    }
  }

  .bg-svg-01,
  .bg-svg-02,
  .bg-svg-03 {
    position: absolute;
    object-fit: cover;
  }
  .bg-svg-01 {
    top: 120px;
    right: -50px;
    width: 50%;
  }
  .bg-svg-02 {
    top: 400px;
    right: 0px;
    width: 100%;
    opacity: 0.5;
  }
  .bg-svg-03 {
    top: 380px;
    right: 0px;
    width: 15%;
  }
  .title {
    position: absolute;
    top: 220px;
    right: 5%;
    max-width: 220px;
    width: 45%;
    text-align: left;
    font-size: 22px;
    color: #f2f2f2;
    .title-ch {
      font-size: 26px;
    }
  }
  .location {
    padding-left: 30px;
    color: gray;
    font-size: 20px;
  }
  .info {
    box-sizing: border-box;
    padding: 0px 30px;
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 20px;
    .info-class {
      width: 35%;
      span {
        color: gray;
        font-size: 20px;
        line-height: 42px;
      }
    }
    .taiwan {
      font-size: 14px;
      line-height: 16px;
    }
    .info-redlist {
      width: 65%;
      justify-self: flex-start;
      color: gray;
      font-size: 20px;
      line-height: 40px;
      .redlist {
        width: 100%;
        object-fit: cover;
      }
    }
  }
  .clickBar {
    position: absolute;
    top: 0;
    right: -80px;
    .title-md {
      display: none;
    }
    .visitedBox {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      margin-top: 70px;
      transition: all 0.2s;
      .farvrite,
      .visited {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 50px;
        padding-top: 75px;
        .defaultFavorite,
        .defaultVisited {
          cursor: pointer;
          display: block;
          position: absolute;
          top: 50%;
          right: 50%;
          transform: translate(50%, -50%);
          width: 50px;
          height: 50px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          transition: all 0.2s;
        }
      }
      .farvrite::after,
      .visited::after {
        opacity: 0;
        visibility: hidden;
        white-space: nowrap;
        position: absolute;
        top: 50%;
        left: -5px;
        transform: translate(-100%, -50%);
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 12px;
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
        transition: all 0.2s ease;
      }
      .farvrite::after {
        content: "想造訪？加入進收藏清單";
      }
      .visited::after {
        content: "造訪過？搜集探索足跡囉！";
      }

      .farvrite:hover {
        filter: grayscale(30%);
        ::after {
          opacity: 1;
          visibility: visible;
          left: 0;
        }
      }
      .visited:hover {
        filter: grayscale(30%);
        ::after {
          opacity: 1;
          visibility: visible;
          left: 0;
        }
      }

      .text-sm {
        /* position: absolute;
        bottom: -20px; */
        font-size: 12px;
        color: lightgray;
        white-space: nowrap;
      }
    }
  }

  @media (max-width: 800px) {
    .main {
      position: relative;
      box-sizing: border-box;
      padding-top: 600px;
      overflow: hidden;
      overflow-y: scroll;
      max-height: 95vh;
      border-radius: 10px;
      width: 100%;
    }
    .title {
      display: none;
    }
    .clickBar {
      position: absolute;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      background-color: #ea7a60;
      top: 0px;
      right: 0px;
      height: 120px;
      border-radius: 10px 10px 0 0;
      .title-md {
        display: block;
        text-align: left;
        font-size: 22px;
        color: #f2f2f2;
        z-index: 903;
        padding-left: 20px;
        margin-right: auto;
        /* transform: translate(calc(-100% - 45%), 0); */
        .title-ch {
          font-size: 26px;
        }
      }
      .visitedBox {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 20px;
        justify-content: flex-end;
        margin-top: 0px;
        transition: all 0.2s;
        .farvrite,
        .visited {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 50px;
          margin-left: 12px;
          .defaultFavorite,
          .defaultVisited {
            width: 40px;
            height: 40px;
          }
        }
        .farvrite::after,
        .visited::after {
          opacity: 0;
          visibility: hidden;
          white-space: nowrap;
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 5px;
          padding: 5px 10px;
          font-size: 12px;
          box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }
        .farvrite::after {
          content: "想造訪？加入進收藏清單";
        }
        .visited::after {
          content: "造訪過？搜集探索足跡囉！";
        }
        .farvrite:hover {
          filter: grayscale(30%);
          ::after {
            opacity: 1;
            visibility: visible;
            left: 0;
          }
        }
        .visited:hover {
          filter: grayscale(30%);
          ::after {
            opacity: 1;
            visibility: visible;
            left: 0;
          }
        }
        .text-sm {
          display: none;
        }
      }
    }
    .imgBox {
      padding-top: 120px;
      width: 100%;
      height: 430px;
      border-radius: 0 0px 220px 0px;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      transform: translate(0, 0px) rotate(0deg);
      .img {
        width: 100%;
        transform: rotate(0deg);
      }
    }
    .bg-svg-01,
    .bg-svg-02,
    .bg-svg-03 {
      position: absolute;
      object-fit: cover;
    }
    .bg-svg-01 {
      display: none;
    }
    .bg-svg-02 {
      top: 450px;
      right: 0px;
      width: 100%;
      opacity: 0.8;
    }
    .bg-svg-03 {
      top: 420px;
      right: 0px;
      width: 15%;
    }
  }
  @media (max-width: 576px) {
    .main {
      max-height: 85vh;
      padding-top: 500px;
    }
    .location {
      font-size: 18px;
    }
    .info {
      margin-top: 10px;
      .info-class {
        width: 35%;
        span {
          color: gray;
          font-size: 16px;
          line-height: 32px;
        }
      }
      .taiwan {
        font-size: 14px;
        line-height: 14px;
      }
      .info-redlist {
        width: 65%;
        justify-self: flex-start;
        color: gray;
        font-size: 16px;
        line-height: 40px;
        .redlist {
          width: 100%;
          object-fit: cover;
        }
      }
    }
    .clickBar {
      position: absolute;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      background-color: #ea7a60;
      top: 0px;
      right: 0px;
      height: 120px;
      border-radius: 10px 10px 0 0;
      .title-md {
        display: block;
        text-align: left;
        font-size: 14px;
        color: #f2f2f2;
        z-index: 903;
        padding-left: 20px;
        margin-right: auto;
        .title-ch {
          font-size: 18px;
        }
      }
    }
    .imgBox {
      padding-top: 120px;
      width: 100%;
      height: 330px;
      border-radius: 0 0px 220px 0px;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      transform: translate(0, 0px) rotate(0deg);
      .img {
        height: 100%;
        transform: rotate(0deg);
      }
    }
  }
`;

export { Container };
