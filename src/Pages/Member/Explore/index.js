import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AnimalsJson from "../../../Utils/animals.json";
import { useSelector, useDispatch } from "react-redux";
import * as action from "../../../Redux/Action";
import img from "../../../Icons/stamp-02.svg";
import * as firestore from "../../../Utils/firebase";
import firebase from "firebase";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1480px;
  justify-content: center;
  height: 100%;
  border: 1px solid lightgrey;
  border-radius: 20px;
`;
const Render = styled.div`
  padding: 20px 50px;
`;

const animalsJson = AnimalsJson;
const set = new Set();
const catalogs = animalsJson
  .filter((item) => (!set.has(item.Location) ? set.add(item.Location) : false))
  .map((item) => item.Location);

export default function Explore(props) {
  const disPatch = useDispatch();
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

  return (
    <Container>
      <Render>
        {getVisited.length ? (
          animalsJson.map((item) =>
            getVisited.map((name) =>
              item.Name_Ch === name ? (
                <div
                  key={item.Name_Ch}
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
                      width: "80px",
                      height: "80px",
                      position: "absolute",
                      borderRadius: "50%",
                      lineHeight: "80px",
                      fontSize: "8px",
                      whiteSpace: "normal",
                      textAlign: "center",
                    }}
                  >
                    {item.Name_Ch}
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      borderRadius: "50%",
                      backgroundImage: `url(${item.Pic01_URL})`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      transition: "all 0.1s",
                      filter: "grayscale(0%)",
                    }}
                    onClick={() => {
                      disPatch(action.addVisited(item.Name_Ch));
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.opacity = 0.4;
                    }}
                    onMouseOut={(e) => {
                      e.target.style.opacity = 1;
                    }}
                  ></div>
                  {/* {isVisited.map((name) =>
            name === item.Name_Ch ? (
              <div
                key={`v${item.Name_Ch}`}
                style={{
                  display: "inline-block",
                  width: "130%",
                  height: "120%",
                  transform: "rotate(-15deg)",
                  position: "absolute",
                  top: 0,
                  left: "-5px",
                  backgroundImage: `url(${img})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  opacity: "0.6",
                }}
                onClick={() => {
                  console.log("看過");
                }}
              ></div>
            ) : null
          )} */}
                </div>
              ) : null
            )
          )
        ) : (
          <div>
            糟糕 護照還沒有任何紀錄！
            快到總覽去新增看過的動物,或是現在起身規劃探索旅程吧！
          </div>
        )}
      </Render>
    </Container>
  );
}
