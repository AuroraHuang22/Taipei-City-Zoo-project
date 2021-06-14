import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AnimalsJson from "../../../Utils/animals.json";
import * as firestore from "../../../Utils/firebase";
import {
  BrowserRouter as Route,
  Switch,
  Link,
  useRouteMatch,
  useLocation,
} from "react-router-dom";

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
      /* display: flex; */
      flex-direction: column;
      /* width: 80%;
      margin: 0 auto;
      justify-content: space-evenly;
      align-items: center; */
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

const animalsJson = AnimalsJson;
const set = new Set();
const catalogs = animalsJson
  .filter((item) => (!set.has(item.Location) ? set.add(item.Location) : false))
  .map((item) => item.Location);

function MemberInfo(props) {
  const [getVisited, setGetVisited] = useState("none");
  const page = useLocation().pathname;

  let uid = props.uid;
  let bar = 0;

  const LevelBar = () => {
    return (
      <div className="bar-block">
        <div className="bar-bottom">
          <div
            className="bar-top"
            style={{
              width: `${bar}%`,
            }}
          ></div>
        </div>
        <span className="text">{bar}%</span>
      </div>
    );
  };

  useEffect(() => {
    if (uid) {
      firestore
        .firebaseGetMemberData(uid)
        .then((data) => setGetVisited(data.isVisited));
    } else {
      setGetVisited(false);
    }
  }, [uid]);

  if (getVisited === "none") {
    return null;
  }
  let blocksFilter = [];

  if (getVisited) {
    catalogs.forEach((catalogs1) =>
      animalsJson.forEach((animalsJson1) =>
        getVisited.forEach((getVisited1) => {
          if (
            animalsJson1.Name_Ch === getVisited1 &&
            animalsJson1.Location === catalogs1
          ) {
            blocksFilter.push([
              animalsJson1.Name_Ch,
              animalsJson1.Location,
              animalsJson1.Pic01_URL,
            ]);
          }
        })
      )
    );
  }

  let arr = [];
  let arr1 = [];
  let stampPavilions = [];
  catalogs.forEach((catalogs) =>
    blocksFilter.forEach((blocksFilters) => {
      if (blocksFilters[1] === catalogs) {
        arr.push(blocksFilters[1]);
      }
    })
  );
  catalogs.forEach((catalogs) => {
    if (catalogs === "新光特展館(大貓熊館)" || catalogs === "無尾熊館") {
      arr1 = arr.filter((arrs) => arrs === catalogs).length;
      if (arr1 >= 1) {
        stampPavilions.push(catalogs);
      }
    } else if (catalogs === "企鵝館") {
      arr1 = arr.filter((arrs) => arrs === catalogs).length;
      if (arr1 >= 2) {
        stampPavilions.push(catalogs);
      }
    } else {
      arr1 = arr.filter((arrs) => arrs === catalogs).length;
      if (arr1 >= 5) {
        stampPavilions.push(catalogs);
      }
    }
  });

  if (stampPavilions.length) {
    bar = ((100 / catalogs.length) * stampPavilions.length).toFixed(1);
  } else {
    bar = 0;
  }

  return (
    <Container>
      <img className="draw-1 draw" src="/Imgs/draw-13.svg" alt="draw" />
      <img className="draw-2 draw" src="/Imgs/draw-13.svg" alt="draw" />
      <div className="inner-container">
        <Photo />
        <div className="level">
          {uid ? (
            <>
              <span className="level-text">
                {bar <= 20 ? (
                  <>探索菜鳥</>
                ) : bar > 20 && bar < 40 ? (
                  <>探索里民</>
                ) : bar > 41 && bar < 60 ? (
                  <>探索里長</>
                ) : bar > 61 && bar < 80 ? (
                  <>探索村長</>
                ) : bar > 81 && bar < 90 ? (
                  <>探索嚮導</>
                ) : bar === 100 ? (
                  <>動物園達人</>
                ) : null}
              </span>
              <br />
              <span className="desc">
                {bar <= 20 ? (
                  <>甘願只當菜鳥？快起身規劃探索旅程吧！</>
                ) : bar > 20 && bar < 40 ? (
                  <>還不太知道,非洲象在哪裡</>
                ) : bar > 41 && bar < 60 ? (
                  <>去過幾次動物園,身邊朋友偶爾會相信你的方向感</>
                ) : bar > 61 && bar < 80 ? (
                  <>有一定的地理知識,專門解救在動物園找不到長頸鹿的民眾</>
                ) : bar > 81 && bar < 90 ? (
                  <>已經將動物園地圖熟背在腦海,偶爾會去動物園兼差當領隊</>
                ) : bar === 100 ? (
                  <>傳說中的動物園達人,只有你可以召喚雲豹的出現</>
                ) : null}
              </span>
            </>
          ) : (
            <>
              <span
                style={{
                  fontWeight: "bold",
                  marginRight: "15px",
                  marginLeft: "5px",
                }}
              >
                請問你是?
              </span>
              <br />
              <span className="desc">不登入，怎麼知道你的實力啦～</span>
            </>
          )}
          <LevelBar />
        </div>
      </div>

      <div className="button-group">
        <Link to="/member">
          <div className={page === "/member" ? "btn active" : "btn"}>
            我的探索護照
          </div>
        </Link>
        <Link to="/member/saved">
          <div className={page === "/member/saved" ? "btn active" : "btn"}>
            我的行程
          </div>
        </Link>
        <Link to="/member/visited">
          <div className={page === "/member/visited" ? "btn active" : "btn"}>
            我的足跡
          </div>
        </Link>
      </div>
    </Container>
  );
}

export default MemberInfo;
