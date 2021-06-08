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
        content: "想造訪？收藏進路線規劃頁";
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
`;

export { Container };
