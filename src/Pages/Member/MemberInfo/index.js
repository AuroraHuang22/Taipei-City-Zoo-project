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

function MemberInfo(props) {
  const [getVisited, setGetVisited] = useState("none");
  let uid = props.uid;

  const LevelBar = () => {
    let bar = ((100 / AnimalsJson.length) * getVisited.length).toFixed(1);
    return (
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
  }, []);

  if (getVisited === "none") {
    return null;
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
            探索菜鳥
          </span>
          <br />
          <span
            style={{
              color: "grey",
              fontSize: "12px",
            }}
          >
            快起身規劃探索行程吧
          </span>
        </LevelText>
        <LevelBar />
      </Level>
      <button>SignIn</button>
    </Container>
  );
}

export default MemberInfo;
