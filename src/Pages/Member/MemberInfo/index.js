import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AnimalsJson from "../../../Utils/animals.json";
import * as firestore from "../../../Utils/firebase";
import {
  BrowserRouter as Route,
  Switch,
  Link,
  useRouteMatch,
} from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 150px;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  .button {
    display: flex;
    flex-direction: column;
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
    margin-left: 20px;
    width: 30vw;
    font-size: 18px;

    .level-text {
      font-weight: 600;
      margin-left: 5px;
    }
    .desc {
      color: grey;
      font-size: 14px;
      letter-spacing: 1.8px;
    }
  }
`;
const Photo = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid lightpink;
  background-image: url("https://mir-s3-cdn-cf.behance.net/project_modules/disp/88ab56107374179.5fa563267cac4.gif");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const animalsJson = AnimalsJson;
const set = new Set();
const catalogs = animalsJson
  .filter((item) => (!set.has(item.Location) ? set.add(item.Location) : false))
  .map((item) => item.Location);

function MemberInfo(props) {
  const [getVisited, setGetVisited] = useState("none");
  let uid = props.uid;
  let bar = 0;
  let match = useRouteMatch();

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
      <Photo />
      <div className="level">
        <div>
          等級：
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
              <span
                style={{
                  color: "grey",
                  fontSize: "12px",
                  letterSpacing: "1.8px",
                }}
              >
                不登入，怎麼知道你的實力啦～
              </span>
            </>
          )}
        </div>
        <LevelBar />
      </div>
    </Container>
  );
}

export default MemberInfo;
