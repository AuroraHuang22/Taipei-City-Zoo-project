import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AnimalsJson from "../../../Utils/animals.json";
import * as firestore from "../../../Utils/firebase";
import { BrowserRouter as Switch, Link, useRouteMatch } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  height: 100%;
`;
const Render = styled.div`
  padding: 20px 50px;
`;

const ItemBlock = styled.div`
  font-size: 10px;
  font-weight: bold;
  border: 1px solid lightgray;
  margin: 5px 5px;
  padding: 3px 5px;
  border-radius: 10px;
`;

const animalsJson = AnimalsJson;
const set = new Set();
const catalogs = animalsJson
  .filter((item) => (!set.has(item.Location) ? set.add(item.Location) : false))
  .map((item) => item.Location);

export default function Visited(props) {
  const [getVisited, setGetVisited] = useState("none");
  let uid = props.uid;

  useEffect(() => {
    if (uid) {
      firestore
        .firebaseGetMemberData(uid)
        .then((data) => setGetVisited(data.isVisited));
    } else {
      setGetVisited(false);
    }
  }, []);

  if (getVisited === "none") {
    return null;
  }

  let ablock = [];
  catalogs.forEach((catalogs1) =>
    animalsJson.forEach((animalsJson1) =>
      getVisited.forEach((getVisited1) => {
        if (
          animalsJson1.Name_Ch === getVisited1 &&
          animalsJson1.Location === catalogs1
        ) {
          ablock.push([
            animalsJson1.Name_Ch,
            animalsJson1.Location,
            animalsJson1.Pic01_URL,
          ]);
        }
      })
    )
  );

  let a = ablock.filter((item) => item[1] === "新光特展館(大貓熊館)");

  return (
    <Container>
      <Render>
        {getVisited.length ? (
          catalogs.map((item, index) => (
            <ItemBlock key={`${index}858`}>
              {item}
              {ablock.map((ele) =>
                ele[1] === item ? (
                  <div
                    key={ele[0]}
                    style={{
                      display: "inline-block",
                      width: "80px",
                      position: "relative",
                      height: "80px",
                      borderRadius: "50%",
                      margin: "15px",
                      backgroundColor: "lightgray",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-block",
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        borderRadius: "50%",
                        backgroundImage: `url(${ele[2]})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        transition: "all 0.1s",
                        filter: "grayscale(0%)",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.opacity = 0.4;
                      }}
                      onMouseOut={(e) => {
                        e.target.style.opacity = 1;
                      }}
                    ></div>
                  </div>
                ) : null
              )}
            </ItemBlock>
          ))
        ) : (
          <div>
            糟糕 護照還沒有任何紀錄！
            快到總覽去新增看過的動物,或是現在起身規劃探索旅程吧！
          </div>
        )}
      </Render>
      <div className="explore">
        <Link to={`/member/explore`}>
          <div>回護照</div>
        </Link>
      </div>
    </Container>
  );
}
