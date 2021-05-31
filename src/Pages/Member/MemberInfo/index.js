import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AnimalsJson from "../../../Utils/animals.json";
import * as firestore from "../../../Utils/firebase";

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
`;
const Photo = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid lightpink;
  background-image: url("https://mir-s3-cdn-cf.behance.net/project_modules/disp/88ab56107374179.5fa563267cac4.gif");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
`;
const Level = styled.div`
  width: 30vw;
`;
const LevelText = styled.div`
  padding: 10px 10px 10px 0px;
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

  const LevelBar = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            backgroundColor: "lightgrey",
            height: "8px",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              width: `${bar}%`,
              backgroundColor: "grey",
              height: "8px",
              borderRadius: "10px",
            }}
          ></div>
        </div>
        <span style={{ fontSize: "8px", marginLeft: "8px", color: "grey" }}>
          {bar}%
        </span>
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
      <Level
        style={{
          marginLeft: "20px",
          width: "30vw",
        }}
      >
        <LevelText>
          等級：
          <span
            style={{
              fontWeight: "bold",
              marginRight: "15px",
              marginLeft: "5px",
            }}
          >
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
          <span
            style={{
              color: "grey",
              fontSize: "12px",
              letterSpacing: "1.8px",
            }}
          >
            {bar <= 20 ? (
              <>哪尼？快起身規劃探索旅程吧！</>
            ) : bar > 20 && bar < 40 ? (
              <>還不太知道,非洲象在哪裡</>
            ) : bar > 41 && bar < 60 ? (
              <>去過幾次動物園,身邊朋友偶爾會相信你的方向感</>
            ) : bar > 61 && bar < 80 ? (
              <>有一定的地理知識,專門解救在動物園找不到長頸鹿的民眾</>
            ) : bar > 81 && bar < 90 ? (
              <>已經將動物園地圖熟背在腦海,可以幫著急的家長找到走丟的小孩</>
            ) : bar === 100 ? (
              <>傳說中的動物園達人,只有你可以召喚雲豹的出現</>
            ) : null}
          </span>
        </LevelText>
        <LevelBar />
      </Level>
    </Container>
  );
}

export default MemberInfo;
